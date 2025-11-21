<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { showNotification } from '@/utils/toastNotifications'
import * as XLSX from 'xlsx'
import useGeneralConfigStore from '@contabilidad/Configuracion/GeneralConfig/store/generalConfigStore'

interface ImportedAccount {
    code: string
    name: string
    accountType: string
    parentAccount: string
    nature: string
    classification: string
    satCode: string
    acceptsMovements: boolean
    currency?: string
}

interface ValidationError {
    row: number
    field: string
    value: any
    message: string
}

interface Props {
    show: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'close'): void
    (e: 'import', data: ImportedAccount[]): void
}>()

const generalConfigStore = useGeneralConfigStore()
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const isProcessing = ref(false)
const importedData = ref<ImportedAccount[]>([])
const previewData = ref<ImportedAccount[]>([])
const validationErrors = ref<ValidationError[]>([])

const isFinancialCompany = computed(() => generalConfigStore.isFinancialCompany)
const hasValidationErrors = computed(() => validationErrors.value.length > 0)

// Descargar plantilla de Excel
const downloadTemplate = () => {
    // Crear datos de ejemplo según tipo de empresa
    let templateData: any[] = []
    
    if (isFinancialCompany.value) {
        // Plantilla para empresa financiera (sin columna de moneda, todas serán MXN)
        templateData = [
            {
                'Código': '0000-00-00-00-01',
                'Nombre': 'Activo',
                'Tipo Cuenta': 'Titulo',
                'Cuenta Padre': '',
                'EsAfectable': '0',
                'Naturaleza': 'Deudora',
                'Clasificación': 'Balance',
                'Clave SAT': ''
            },
            {
                'Código': '1101-00-00-00-01',
                'Nombre': 'CAJA',
                'Tipo Cuenta': 'Mayor',
                'Cuenta Padre': '1100-0000-0000',
                'EsAfectable': '0',
                'Naturaleza': 'Deudora',
                'Clasificación': 'Balance',
                'Clave SAT': '101'
            },
            {
                'Código': '1101-01-00-00-02',
                'Nombre': 'Caja Corporativo',
                'Tipo Cuenta': 'Detalle',
                'Cuenta Padre': '1101-0000-0000',
                'EsAfectable': '1',
                'Naturaleza': 'Deudora',
                'Clasificación': 'Balance',
                'Clave SAT': '101.01'
            }
        ]
    } else {
        // Plantilla para empresa tradicional (con columna de moneda)
        templateData = [
            {
                'Código': '1000-00-00-00-00-00',
                'Nombre': 'Activo',
                'Tipo Cuenta': 'Titulo',
                'Cuenta Padre': '',
                'EsAfectable': '0',
                'Moneda': 'Peso Mexicano',
                'Naturaleza': 'Deudora',
                'Clasificación': 'Balance',
                'Clave SAT': ''
            },
            {
                'Código': '1001-00-00-00-00-00',
                'Nombre': 'Caja',
                'Tipo Cuenta': 'Mayor',
                'Cuenta Padre': '1000-00-00-00-00-00',
                'EsAfectable': '0',
                'Moneda': 'Peso Mexicano',
                'Naturaleza': 'Deudora',
                'Clasificación': 'Balance',
                'Clave SAT': '101'
            },
            {
                'Código': '1001-01-00-00-00-00',
                'Nombre': 'Caja y Efectivo',
                'Tipo Cuenta': 'Detalle',
                'Cuenta Padre': '1001-00-00-00-00-00',
                'EsAfectable': '1',
                'Moneda': 'Peso Mexicano',
                'Naturaleza': 'Deudora',
                'Clasificación': 'Balance',
                'Clave SAT': '101.01'
            }
        ]
    }

    // Crear workbook y worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(templateData)

    // Agregar nota en la columna EsAfectable
    const noteCell = 'E1' // Columna EsAfectable
    if (!ws[noteCell]) ws[noteCell] = {}
    ws[noteCell].c = ws[noteCell].c || []
    ws[noteCell].c.push({
        a: 'Sistema',
        t: 'IMPORTANTE: Esta columna solo acepta valores 1 (Afectable) o 0 (No Afectable)'
    })

    // Ajustar ancho de columnas según tipo de empresa
    if (isFinancialCompany.value) {
        ws['!cols'] = [
            { wch: 20 },  // Código
            { wch: 35 },  // Nombre
            { wch: 20 },  // Tipo Cuenta
            { wch: 20 },  // Cuenta Padre
            { wch: 15 },  // EsAfectable
            { wch: 15 },  // Naturaleza
            { wch: 15 },  // Clasificación
            { wch: 15 }   // Clave SAT
        ]
    } else {
        ws['!cols'] = [
            { wch: 20 },  // Código
            { wch: 35 },  // Nombre
            { wch: 20 },  // Tipo Cuenta
            { wch: 20 },  // Cuenta Padre
            { wch: 15 },  // EsAfectable
            { wch: 20 },  // Moneda
            { wch: 15 },  // Naturaleza
            { wch: 15 },  // Clasificación
            { wch: 15 }   // Clave SAT
        ]
    }

    // Agregar hoja al workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Cuentas')

    // Descargar archivo con nombre según tipo de empresa
    const fileName = isFinancialCompany.value 
        ? 'Plantilla_Catalogo_Cuentas_Financiera.xlsx'
        : 'Plantilla_Catalogo_Cuentas_Tradicional.xlsx'
    
    XLSX.writeFile(wb, fileName)
    showNotification('Plantilla descargada exitosamente', 'success')
}

// Seleccionar archivo
const selectFile = () => {
    fileInput.value?.click()
}

// Manejar selección de archivo
const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    
    if (file) {
        if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
            showNotification('Por favor selecciona un archivo Excel (.xlsx o .xls)', 'error')
            return
        }
        selectedFile.value = file
        processFile(file)
    }
}

// Procesar archivo Excel
const processFile = async (file: File) => {
    isProcessing.value = true
    
    try {
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data, { type: 'array' })
        
        // Obtener la primera hoja
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        
        // Convertir a JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[]
        
        if (jsonData.length === 0) {
            showNotification('El archivo está vacío', 'warning')
            return
        }

        // Mapear datos y validar EsAfectable
        const accounts: ImportedAccount[] = []
        const errors: ValidationError[] = []
        
        jsonData.forEach((row, index) => {
            const esAfectableValue = String(row['EsAfectable'] || '').trim()
            
            // Validar que EsAfectable sea 1 o 0
            if (esAfectableValue !== '1' && esAfectableValue !== '0' && esAfectableValue !== '') {
                errors.push({
                    row: index + 2, // +2 porque Excel empieza en 1 y tiene header
                    field: 'EsAfectable',
                    value: esAfectableValue,
                    message: `Valor inválido "${esAfectableValue}". Solo se acepta 1 o 0`
                })
            }
            
            const account: ImportedAccount = {
                code: String(row['Código'] || row['Codigo'] || '').trim(),
                name: String(row['Nombre'] || '').trim(),
                accountType: String(row['Tipo Cuenta'] || row['Tipo de Cuenta'] || '').trim(),
                parentAccount: String(row['Cuenta Padre'] || '').trim(),
                nature: String(row['Naturaleza'] || '').trim(),
                classification: String(row['Clasificación'] || row['Clasificacion'] || '').trim(),
                satCode: String(row['Clave SAT'] || '').trim(),
                acceptsMovements: esAfectableValue === '1'
            }
            
            // Solo agregar moneda si es empresa tradicional
            if (!isFinancialCompany.value) {
                account.currency = String(row['Moneda'] || 'Peso Mexicano').trim()
            }
            
            accounts.push(account)
        })
        
        validationErrors.value = errors

        // Filtrar filas vacías
        const validAccounts = accounts.filter(acc => acc.code && acc.name)

        if (validAccounts.length === 0) {
            showNotification('No se encontraron datos válidos en el archivo', 'warning')
            return
        }

        importedData.value = validAccounts
        previewData.value = validAccounts.slice(0, 5) // Mostrar primeras 5
        
        if (errors.length > 0) {
            showNotification(
                `Se encontraron ${errors.length} errores de validación en la columna EsAfectable`,
                'error'
            )
        } else {
            showNotification(
                `Se cargaron ${validAccounts.length} cuentas correctamente`,
                'success'
            )
        }
    } catch (error) {
        console.error('Error al procesar archivo:', error)
        showNotification('Error al procesar el archivo Excel', 'error')
    } finally {
        isProcessing.value = false
    }
}

// Importar datos
const importData = () => {
    if (importedData.value.length === 0) {
        showNotification('No hay datos para importar', 'warning')
        return
    }

    emit('import', importedData.value)
    closeModal()
}

// Cerrar modal
const closeModal = () => {
    selectedFile.value = null
    importedData.value = []
    previewData.value = []
    emit('close')
}

// Cancelar importación
const cancelImport = () => {
    selectedFile.value = null
    importedData.value = []
    previewData.value = []
    validationErrors.value = []
}
</script>

<template>
    <div v-if="props.show" class="modal modal-open">
        <div class="modal-box max-w-5xl">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-xl flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">upload_file</span>
                    Importar Catálogo de Cuentas
                </h3>
                <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>

            <!-- Instrucciones -->
            <div class="alert alert-info mb-4">
                <span class="material-symbols-outlined">info</span>
                <div>
                    <h4 class="font-semibold">Instrucciones:</h4>
                    <ol class="list-decimal list-inside text-sm mt-2">
                        <li>Descarga la plantilla de Excel haciendo clic en el botón "Descargar Plantilla"</li>
                        <li>Llena la plantilla con los datos de tus cuentas contables</li>
                        <li><strong>IMPORTANTE:</strong> La columna "EsAfectable" solo acepta valores <code class="bg-base-300 px-1 rounded">1</code> (Afectable) o <code class="bg-base-300 px-1 rounded">0</code> (No Afectable)</li>
                        <li v-if="isFinancialCompany">Las cuentas se crearán con moneda <strong>Peso Mexicano (MXN)</strong> por defecto</li>
                        <li v-else>Especifica la moneda para cada cuenta en la columna correspondiente</li>
                        <li>Guarda el archivo y selecciónalo usando el botón "Seleccionar Archivo"</li>
                        <li>Revisa la vista previa y confirma la importación</li>
                    </ol>
                </div>
            </div>

            <!-- Botones de acción -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <!-- Descargar plantilla -->
                <div class="card bg-base-200">
                    <div class="card-body items-center text-center">
                        <span class="material-symbols-outlined text-success text-5xl mb-2">download</span>
                        <h4 class="card-title text-sm">Paso 1: Descargar Plantilla</h4>
                        <p class="text-xs text-gray-500">Descarga el archivo Excel con el formato correcto</p>
                        <BaseButton
                            text="Descargar Plantilla"
                            icon="download"
                            variant="success"
                            class="mt-2"
                            @click="downloadTemplate"
                        />
                    </div>
                </div>

                <!-- Seleccionar archivo -->
                <div class="card bg-base-200">
                    <div class="card-body items-center text-center">
                        <span class="material-symbols-outlined text-primary text-5xl mb-2">
                            {{ selectedFile ? 'check_circle' : 'upload_file' }}
                        </span>
                        <h4 class="card-title text-sm">Paso 2: Cargar Archivo</h4>
                        <p class="text-xs text-gray-500">
                            {{ selectedFile ? selectedFile.name : 'Selecciona el archivo Excel con los datos' }}
                        </p>
                        <div class="flex gap-2 mt-2">
                            <BaseButton
                                text="Seleccionar Archivo"
                                icon="folder_open"
                                variant="primary"
                                @click="selectFile"
                            />
                            <BaseButton
                                v-if="selectedFile"
                                text="Cancelar"
                                icon="close"
                                variant="ghost"
                                @click="cancelImport"
                            />
                        </div>
                        <input
                            ref="fileInput"
                            type="file"
                            accept=".xlsx,.xls"
                            class="hidden"
                            @change="handleFileSelect"
                        />
                    </div>
                </div>
            </div>

            <!-- Errores de validación -->
            <div v-if="hasValidationErrors && !isProcessing" class="alert alert-error mb-4">
                <span class="material-symbols-outlined">error</span>
                <div class="flex-1">
                    <h4 class="font-semibold">Errores de validación encontrados:</h4>
                    <div class="text-sm mt-2 max-h-40 overflow-y-auto">
                        <ul class="list-disc list-inside">
                            <li v-for="error in validationErrors" :key="`${error.row}-${error.field}`">
                                <strong>Fila {{ error.row }}</strong> - {{ error.field }}: {{ error.message }}
                            </li>
                        </ul>
                    </div>
                    <p class="text-sm mt-2">
                        <strong>Solución:</strong> Corrige los valores en el archivo Excel y vuelve a cargarlo.
                    </p>
                </div>
            </div>

            <!-- Loading -->
            <div v-if="isProcessing" class="flex justify-center items-center py-8">
                <span class="loading loading-spinner loading-lg text-primary"></span>
                <span class="ml-3">Procesando archivo...</span>
            </div>

            <!-- Vista previa de datos -->
            <div v-if="importedData.length > 0 && !isProcessing" class="mb-6">
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-semibold flex items-center gap-2">
                        <span class="material-symbols-outlined text-info">preview</span>
                        Vista Previa ({{ importedData.length }} cuentas)
                    </h4>
                    <span class="text-xs text-gray-500">Mostrando las primeras 5 filas</span>
                </div>
                
                <div class="overflow-x-auto border border-base-300 rounded-lg">
                    <table class="table table-zebra table-sm">
                        <thead>
                            <tr class="bg-base-200">
                                <th class="text-xs">Código</th>
                                <th class="text-xs">Nombre</th>
                                <th class="text-xs">Tipo</th>
                                <th class="text-xs">Padre</th>
                                <th class="text-xs">Afectable</th>
                                <th v-if="!isFinancialCompany" class="text-xs">Moneda</th>
                                <th class="text-xs">Naturaleza</th>
                                <th class="text-xs">Clasificación</th>
                                <th class="text-xs">SAT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(account, index) in previewData" :key="index">
                                <td class="font-mono text-xs">{{ account.code }}</td>
                                <td class="text-xs">{{ account.name }}</td>
                                <td class="text-xs">{{ account.accountType }}</td>
                                <td class="font-mono text-xs">{{ account.parentAccount || '-' }}</td>
                                <td class="text-xs">
                                    <span :class="account.acceptsMovements ? 'badge badge-success badge-xs' : 'badge badge-ghost badge-xs'">
                                        {{ account.acceptsMovements ? 'Sí' : 'No' }}
                                    </span>
                                </td>
                                <td v-if="!isFinancialCompany" class="text-xs">{{ account.currency || 'MXN' }}</td>
                                <td class="text-xs">{{ account.nature }}</td>
                                <td class="text-xs">{{ account.classification }}</td>
                                <td class="font-mono text-xs">{{ account.satCode || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div v-if="importedData.length > 5" class="text-xs text-center text-gray-500 mt-2">
                    ... y {{ importedData.length - 5 }} cuentas más
                </div>
            </div>

            <!-- Botones de acción final -->
            <div class="modal-action">
                <BaseButton
                    text="Cancelar"
                    icon="close"
                    variant="ghost"
                    @click="closeModal"
                />
                <BaseButton
                    text="Importar Cuentas"
                    icon="upload"
                    variant="primary"
                    :disabled="importedData.length === 0 || isProcessing || hasValidationErrors"
                    @click="importData"
                />
            </div>
        </div>
        <div class="modal-backdrop" @click="closeModal"></div>
    </div>
</template>
