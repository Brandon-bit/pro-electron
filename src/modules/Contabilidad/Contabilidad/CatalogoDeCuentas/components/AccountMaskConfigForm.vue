<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { showNotification } from '@/utils/toastNotifications'

interface MaskSegment {
    id: string
    name: string
    digits: number
    minDigits: number
    maxDigits: number
    charType: 'numeric' | 'alphanumeric' | 'alpha'
    required: boolean
    description: string
    placeholder: string
}

interface MaskConfiguration {
    format: string
    segments: MaskSegment[]
    separator: string
    maxDepth: number  // Nivel máximo de profundidad permitido
    allowFlexibleLength: boolean
}

interface Props {
    initialConfig?: Partial<MaskConfiguration>
}

// Valores por defecto configurables
const DEFAULT_CONFIG: MaskConfiguration = {
    format: '0000-00-00-00-00-00',
    separator: '-',
    maxDepth: 6,  // 6 niveles por defecto
    allowFlexibleLength: false,
    segments: [
        { id: '1', name: 'Grupo', digits: 4, minDigits: 1, maxDigits: 6, charType: 'numeric', required: true, description: 'Código de grupo principal (Activo, Pasivo, Capital)', placeholder: '1000' },
        { id: '2', name: 'Subgrupo', digits: 2, minDigits: 1, maxDigits: 4, charType: 'numeric', required: true, description: 'Código de subgrupo (Circulante, Fijo)', placeholder: '01' },
        { id: '3', name: 'Mayor', digits: 2, minDigits: 1, maxDigits: 4, charType: 'numeric', required: true, description: 'Código de cuenta mayor (Bancos, Clientes)', placeholder: '01' },
        { id: '4', name: 'Subcuenta', digits: 2, minDigits: 1, maxDigits: 4, charType: 'numeric', required: false, description: 'Código de subcuenta (Banco específico)', placeholder: '01' },
        { id: '5', name: 'Auxiliar', digits: 2, minDigits: 1, maxDigits: 4, charType: 'numeric', required: false, description: 'Código auxiliar (Departamento, Proyecto)', placeholder: '01' },
        { id: '6', name: 'Subauxiliar', digits: 2, minDigits: 1, maxDigits: 4, charType: 'numeric', required: false, description: 'Código subauxiliar (Sub-departamento)', placeholder: '01' }
    ]
}

const props = withDefaults(defineProps<Props>(), {
    initialConfig: () => ({})
})

// Combinar configuración por defecto con configuración proporcionada
const config = {
    ...DEFAULT_CONFIG,
    ...props.initialConfig,
    segments: props.initialConfig?.segments || DEFAULT_CONFIG.segments
}

const emit = defineEmits<{
    (e: 'save', config: { format: string; segments: MaskSegment[] }): void
    (e: 'cancel'): void
}>()

// Estado del formulario
const segments = ref<MaskSegment[]>([...config.segments])
const separator = ref(config.separator)
const maxDepth = ref(config.maxDepth)
const allowFlexibleLength = ref(config.allowFlexibleLength)

// Opciones de separador
const separatorOptions = [
    { id: '-', label: 'Guión (-)', value: '-' },
    { id: '.', label: 'Punto (.)', value: '.' },
    { id: '', label: 'Sin separador', value: '' },
    { id: '/', label: 'Diagonal (/)', value: '/' },
    { id: '_', label: 'Guión bajo (_)', value: '_' }
]

// Opciones de tipo de carácter
const charTypeOptions = [
    { id: 'numeric', label: 'Numérico (0-9)' },
    { id: 'alphanumeric', label: 'Alfanumérico (A-Z, 0-9)' },
    { id: 'alpha', label: 'Alfabético (A-Z)' }
]

// Plantillas predefinidas más completas
const predefinedFormats = [
    { id: 'mexican-standard', label: 'NIF Mexicana Estándar (6 niveles)', format: '0000-00-00-00-00-00', separator: '-' },
    { id: 'mexican-simple', label: 'NIF Mexicana Simplificada (4 niveles)', format: '0000-00-00-00', separator: '-' },
    { id: 'ifrs-basic', label: 'IFRS Básico (3 niveles)', format: '0000-000-000', separator: '-' },
    { id: 'sap-style', label: 'Estilo SAP (Alfanumérico)', format: 'AAAA-AAA-AAA', separator: '-' },
    { id: 'manufacturing', label: 'Manufactura (5 niveles + proyecto)', format: '000-00-00-00-0000', separator: '-' },
    { id: 'services', label: 'Servicios (4 niveles + cliente)', format: '0000-000-000-000', separator: '-' },
    { id: 'retail', label: 'Comercio (tienda-departamento-producto)', format: '000-00-0000', separator: '-' },
    { id: 'construction', label: 'Construcción (proyecto-fase-cuenta)', format: 'AAAA-00-0000', separator: '-' },
    { id: 'no-separator', label: 'Sin separador (código continuo)', format: '000000000', separator: '' },
    { id: 'custom', label: 'Personalizado', format: '', separator: '-' }
]

const selectedFormat = ref('mexican-standard')

// Computed para saber si está en modo personalizado
const isCustomMode = computed(() => selectedFormat.value === 'custom')

// Texto descriptivo del maxDepth
const maxDepthLabel = computed(() => {
    if (isCustomMode.value) {
        return `Nivel máximo de profundidad (Personalizado: ${maxDepth.value} niveles)`
    }
    return 'Nivel máximo de profundidad'
})

// Generar formato basado en segmentos (REACTIVO)
const formatPreview = computed(() => {
    return segments.value
        .filter(segment => segment.digits > 0)
        .map(segment => {
            // Generar placeholder según el tipo de carácter
            switch (segment.charType) {
                case 'numeric':
                    return '0'.repeat(segment.digits)
                case 'alphanumeric':
                    return 'A'.repeat(segment.digits)
                case 'alpha':
                    return 'X'.repeat(segment.digits)
                default:
                    return '0'.repeat(segment.digits)
            }
        })
        .join(separator.value)
})

// Vista previa del formato con X en lugar de 0 (REACTIVO)
const formatPreviewDisplay = computed(() => {
    return formatPreview.value
        .replace(/0/g, 'X')
        .replace(/A/g, 'A')
        .replace(/X/g, 'X')
})

// Ejemplos dinámicos (REACTIVOS)
const example1 = computed(() => {
    return segments.value
        .map((seg, idx) => {
            // Usar el placeholder del segmento o generar uno
            if (seg.placeholder) {
                return seg.placeholder
            }
            // Generar placeholder basado en tipo
            if (seg.charType === 'numeric') {
                return idx === 0 ? '1'.padEnd(seg.digits, '0') : '0'.repeat(seg.digits)
            } else if (seg.charType === 'alpha') {
                return 'A'.repeat(seg.digits)
            } else {
                return 'A' + '0'.repeat(seg.digits - 1)
            }
        })
        .join(separator.value)
})

const example2 = computed(() => {
    return segments.value
        .map((seg, idx) => {
            // Usar el placeholder del segmento o generar uno diferente
            if (seg.placeholder && idx > 0) {
                // Para segmentos después del primero, usar el placeholder
                return seg.placeholder
            }
            // Generar placeholder basado en tipo
            if (seg.charType === 'numeric') {
                if (idx === 0) {
                    return '2'.padEnd(seg.digits, '0')
                } else if (idx === segments.value.length - 1) {
                    return '0'.repeat(seg.digits - 1) + '5' // Último dígito diferente
                } else {
                    return '0'.repeat(seg.digits)
                }
            } else if (seg.charType === 'alpha') {
                return idx === 0 ? 'B'.repeat(seg.digits) : 'X'.repeat(seg.digits)
            } else {
                return 'B' + '0'.repeat(seg.digits - 1)
            }
        })
        .join(separator.value)
})

// Validar configuración antes de guardar
const validateConfig = (): { valid: boolean; message: string } => {
    if (segments.value.length === 0) {
        return { valid: false, message: 'Debe configurar al menos un segmento' }
    }
    
    const hasRequiredSegment = segments.value.some(s => s.required)
    if (!hasRequiredSegment) {
        return { valid: false, message: 'Debe tener al menos un segmento obligatorio' }
    }
    
    // Validar que los nombres sean únicos
    const names = segments.value.map(s => s.name.toLowerCase())
    const uniqueNames = new Set(names)
    if (names.length !== uniqueNames.size) {
        return { valid: false, message: 'Los nombres de los segmentos deben ser únicos' }
    }
    
    // Validar rangos de longitud
    if (allowFlexibleLength.value) {
        for (const segment of segments.value) {
            if (segment.minDigits > segment.maxDigits) {
                return { 
                    valid: false, 
                    message: `El mínimo no puede ser mayor que el máximo en el segmento "${segment.name}"` 
                }
            }
        }
    }
    
    return { valid: true, message: 'Configuración válida' }
}

// Agregar nuevo segmento
const addSegment = () => {
    // Validar que no se exceda el máximo de profundidad
    if (segments.value.length >= maxDepth.value) {
        showNotification(`No puede agregar más de ${maxDepth.value} niveles de profundidad`, 'warning')
        return
    }
    
    const newSegment: MaskSegment = {
        id: Date.now().toString(),
        name: `Nivel ${segments.value.length + 1}`,
        digits: 2,
        minDigits: 1,
        maxDigits: 4,
        charType: 'numeric',
        required: false,
        description: `Descripción del nivel ${segments.value.length + 1}`,
        placeholder: '00'
    }
    segments.value.push(newSegment)
}

// Eliminar segmento
const removeSegment = (id: string) => {
    if (segments.value.length > 1) {
        segments.value = segments.value.filter(s => s.id !== id)
        // Renombrar los segmentos restantes
        segments.value.forEach((segment, index) => {
            segment.name = `Nivel ${index + 1}`
        })
    } else {
        showNotification('Debe haber al menos un segmento', 'warning')
    }
}

// Actualizar segmento
const updateSegment = (id: string, field: keyof MaskSegment, value: any) => {
    const segment = segments.value.find(s => s.id === id)
    if (segment) {
        // Type assertion para permitir la asignación dinámica
        (segment as any)[field] = value
    }
}

// Aplicar formato predefinido
const applyPredefinedFormat = (formatId: string) => {
    // Si es personalizado, establecer maxDepth ilimitado y limpiar
    if (formatId === 'custom') {
        maxDepth.value = 20 // Nivel máximo muy alto para personalizado
        showNotification('Modo personalizado activado: puedes agregar hasta 20 niveles', 'info')
        return
    }
    
    const selected = predefinedFormats.find(f => f.id === formatId)
    if (!selected || !selected.format) {
        return
    }
    
    // Actualizar separador primero
    separator.value = selected.separator
    
    // Dividir formato en grupos
    let digitGroups: string[]
    if (selected.separator) {
        // Con separador: dividir por el separador
        digitGroups = selected.format.split(selected.separator).filter(g => g.length > 0)
    } else {
        // Sin separador: detectar cambios de tipo de carácter
        // Por ejemplo: "000000000" -> ["000000000"]
        // O "0000AA00" -> ["0000", "AA", "00"]
        digitGroups = []
        let currentGroup = ''
        let currentType = ''
        
        for (const char of selected.format) {
            const charType = /[0-9]/.test(char) ? 'numeric' : /[A-Z]/i.test(char) ? 'alpha' : 'other'
            
            if (currentType === '' || currentType === charType) {
                currentGroup += char
                currentType = charType
            } else {
                if (currentGroup) digitGroups.push(currentGroup)
                currentGroup = char
                currentType = charType
            }
        }
        if (currentGroup) digitGroups.push(currentGroup)
    }
    
    // Crear nuevos segmentos basados en los grupos
    const newSegments: MaskSegment[] = digitGroups.map((group, index) => {
        // Detectar tipo de carácter basado en el contenido del grupo
        let charType: 'numeric' | 'alphanumeric' | 'alpha' = 'numeric'
        if (group.match(/^[A-Z]+$/i)) {
            charType = 'alpha'
        } else if (group.match(/[A-Z]/i) && group.match(/[0-9]/)) {
            charType = 'alphanumeric'
        }
        
        // Generar placeholder de ejemplo
        let placeholder = ''
        if (charType === 'numeric') {
            placeholder = index === 0 ? '1'.padEnd(group.length, '0') : '0'.repeat(group.length)
        } else if (charType === 'alpha') {
            placeholder = 'A'.repeat(group.length)
        } else {
            placeholder = 'A' + '0'.repeat(group.length - 1)
        }
        
        return {
            id: (index + 1).toString(),
            name: `Nivel ${index + 1}`,
            digits: group.length,
            minDigits: 1,
            maxDigits: group.length + 2,
            charType,
            required: index < 2,
            description: `Nivel ${index + 1} - ${charType === 'numeric' ? 'Numérico' : charType === 'alpha' ? 'Alfabético' : 'Alfanumérico'}`,
            placeholder
        }
    })
    
    segments.value = newSegments
    
    // Ajustar maxDepth según el número de segmentos de la plantilla
    maxDepth.value = Math.max(newSegments.length, 6)
}

// Guardar configuración
const saveConfig = () => {
    // Validar configuración
    const validation = validateConfig()
    if (!validation.valid) {
        showNotification(validation.message, 'warning')
        return
    }
    
    const configToSave = {
        format: formatPreview.value,
        segments: segments.value.filter(s => s.digits > 0),
        separator: separator.value,
        maxDepth: maxDepth.value,
        allowFlexibleLength: allowFlexibleLength.value
    }
    
    emit('save', configToSave)
    showNotification('Configuración de máscara guardada exitosamente', 'success')
}
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Configuración de Máscara de Cuentas" 
            subtitle="Defina el formato para los códigos de cuentas contables de su empresa" 
        />

        <!-- Información y Ayuda -->
        <div class="alert alert-info shadow-sm">
            <span class="material-symbols-outlined">info</span>
            <div class="flex-1">
                <h4 class="font-semibold">Acerca de las máscaras de cuenta</h4>
                <p class="text-sm mt-1">
                    Configure la estructura de sus códigos contables según las necesidades de su empresa. 
                    Puede elegir plantillas predefinidas o crear una configuración personalizada con 
                    separadores, tipos de caracteres y longitudes variables.
                </p>
            </div>
        </div>

        <!-- Formatos Predefinidos -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title text-lg mb-4">
                    <span class="material-symbols-outlined text-primary">menu_book</span>
                    Plantillas Predefinidas
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Plantillas predefinidas (usando select nativo para reactividad directa) -->
                    <div class="flex flex-col space-y-2">
                        <label class="font-semibold">Seleccionar plantilla</label>
                        <select
                            v-model="selectedFormat"
                            class="select select-bordered w-full"
                            @change="applyPredefinedFormat(selectedFormat)"
                        >
                            <option value="">Elige una plantilla</option>
                            <option 
                                v-for="format in predefinedFormats" 
                                :key="format.id"
                                :value="format.id"
                            >
                                {{ format.label }}
                            </option>
                        </select>
                    </div>
                    
                    <!-- Separador (usando select nativo para reactividad directa) -->
                    <div class="flex flex-col space-y-2">
                        <label class="font-semibold">Separador de segmentos</label>
                        <select
                            v-model="separator"
                            class="select select-bordered w-full"
                        >
                            <option 
                                v-for="option in separatorOptions" 
                                :key="option.id"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                </div>
                
                <div class="mt-4 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="material-symbols-outlined text-primary text-sm">visibility</span>
                        <span class="text-sm font-medium">Vista previa del formato:</span>
                    </div>
                    <div class="font-mono text-2xl text-primary font-bold">{{ formatPreviewDisplay }}</div>
                    <div class="text-xs text-gray-500 mt-2">
                        Ejemplo: <span class="font-mono">{{ formatPreview }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Configuración Personalizada -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="card-title text-lg">
                            <span class="material-symbols-outlined text-secondary">settings</span>
                            Segmentos del Código
                        </h3>
                        <p class="text-sm text-gray-500 mt-1">Configure cada segmento de forma individual</p>
                    </div>
                    <BaseButton 
                        text="Agregar Segmento"
                        icon="add"
                        variant="outline"
                        @click="addSegment"
                    />
                </div>

                <!-- Configuraciones Globales -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-base-200 rounded-lg">
                    <!-- Nivel máximo de profundidad -->
                    <div>
                        <BaseFormInput
                            :model-value="maxDepth.toString()"
                            name="maxDepth"
                            :label="maxDepthLabel"
                            type="number"
                            min="1"
                            :max="isCustomMode ? 20 : 10"
                            @update:model-value="maxDepth = parseInt($event) || 6"
                        />
                        <p class="text-xs mt-1" :class="isCustomMode ? 'text-success font-semibold' : 'text-gray-500'">
                            <span v-if="isCustomMode">
                                ✨ Modo personalizado activo - Hasta {{ maxDepth }} niveles jerárquicos
                            </span>
                            <span v-else>
                                Número máximo de niveles jerárquicos permitidos (actual: {{ segments.length }})
                            </span>
                        </p>
                    </div>
                    
                    <!-- Opción de longitud flexible -->
                    <div class="form-control">
                        <label class="label cursor-pointer justify-start gap-3">
                            <input 
                                v-model="allowFlexibleLength" 
                                type="checkbox" 
                                class="checkbox checkbox-primary checkbox-sm"
                            />
                            <div>
                                <span class="label-text font-medium">Permitir longitud variable</span>
                                <p class="text-xs text-gray-500 mt-1">
                                    Los segmentos podrán tener longitud entre el mínimo y máximo configurado
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="space-y-4">
                    <div 
                        v-for="(segment, index) in segments" 
                        :key="segment.id"
                        class="p-5 border-2 rounded-lg bg-gradient-to-r from-base-100 to-base-50 hover:shadow-md transition-shadow"
                    >
                        <div class="flex items-center gap-2 mb-3">
                            <span class="badge badge-primary badge-sm">Nivel {{ index + 1 }}</span>
                            <span v-if="segment.required" class="badge badge-error badge-sm">Obligatorio</span>
                            <span v-else class="badge badge-ghost badge-sm">Opcional</span>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <!-- Nombre -->
                            <BaseFormInput
                                :model-value="segment.name"
                                name="segmentName"
                                label="Nombre del segmento"
                                placeholder="Ej: Grupo, Subgrupo, Mayor..."
                                @update:model-value="updateSegment(segment.id, 'name', $event)"
                            />
                            
                            <!-- Tipo de caracteres -->
                            <BaseFormSelect
                                :model-value="segment.charType"
                                name="segmentCharType"
                                label="Tipo de caracteres"
                                :options="charTypeOptions"
                                @update:model-value="updateSegment(segment.id, 'charType', $event)"
                            />
                            
                            <!-- Dígitos fijos o rango -->
                            <div v-if="!allowFlexibleLength">
                                <BaseFormInput
                                    :model-value="segment.digits.toString()"
                                    name="segmentDigits"
                                    label="Número de caracteres"
                                    type="number"
                                    min="1"
                                    max="10"
                                    @update:model-value="updateSegment(segment.id, 'digits', parseInt($event) || 1)"
                                />
                            </div>
                            <div v-else class="grid grid-cols-2 gap-2">
                                <BaseFormInput
                                    :model-value="segment.minDigits.toString()"
                                    name="segmentMinDigits"
                                    label="Mínimo"
                                    type="number"
                                    min="1"
                                    max="10"
                                    @update:model-value="updateSegment(segment.id, 'minDigits', parseInt($event) || 1)"
                                />
                                <BaseFormInput
                                    :model-value="segment.maxDigits.toString()"
                                    name="segmentMaxDigits"
                                    label="Máximo"
                                    type="number"
                                    min="1"
                                    max="10"
                                    @update:model-value="updateSegment(segment.id, 'maxDigits', parseInt($event) || 1)"
                                />
                            </div>
                            
                            <!-- Descripción -->
                            <BaseFormInput
                                :model-value="segment.description"
                                name="segmentDescription"
                                label="Descripción"
                                placeholder="¿Qué representa este segmento?"
                                @update:model-value="updateSegment(segment.id, 'description', $event)"
                            />
                            
                            <!-- Placeholder -->
                            <BaseFormInput
                                :model-value="segment.placeholder"
                                name="segmentPlaceholder"
                                label="Ejemplo"
                                placeholder="Ej: 1000, A001..."
                                @update:model-value="updateSegment(segment.id, 'placeholder', $event)"
                            />
                            
                            <!-- Checkbox obligatorio + eliminar -->
                            <div class="flex items-end gap-2">
                                <label class="label cursor-pointer gap-2 flex-1">
                                    <input 
                                        :checked="segment.required"
                                        type="checkbox" 
                                        class="checkbox checkbox-sm"
                                        @change="updateSegment(segment.id, 'required', ($event.target as HTMLInputElement).checked)"
                                    />
                                    <span class="label-text text-sm">Obligatorio</span>
                                </label>
                                <BaseButton 
                                    text=""
                                    icon="delete"
                                    variant="ghost"
                                    size="sm"
                                    class="text-error"
                                    title="Eliminar segmento"
                                    @click="removeSegment(segment.id)"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Vista previa en tiempo real -->
                <div class="mt-6 p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-xl shadow-inner">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="material-symbols-outlined text-primary">preview</span>
                        <span class="text-sm font-bold text-primary">Formato Generado</span>
                    </div>
                    <div class="font-mono text-3xl text-primary font-black tracking-wider mb-4">
                        {{ formatPreviewDisplay }}
                    </div>
                    <div class="divider divider-primary my-3"></div>
                    <div class="space-y-2">
                        <div class="text-xs font-semibold text-gray-600 mb-2">Ejemplos de códigos válidos:</div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="p-2 bg-base-100 rounded border border-base-300">
                                <span class="text-xs text-gray-500">Activo Circulante - Bancos:</span>
                                <div class="font-mono text-sm font-bold">{{ example1 }}</div>
                            </div>
                            <div class="p-2 bg-base-100 rounded border border-base-300">
                                <span class="text-xs text-gray-500">Pasivo - Proveedores:</span>
                                <div class="font-mono text-sm font-bold">{{ example2 }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Resumen de Configuración -->
        <div class="card bg-gradient-to-r from-success/5 to-info/5 border border-success/20">
            <div class="card-body">
                <h3 class="card-title text-md mb-3">
                    <span class="material-symbols-outlined text-success">check_circle</span>
                    Resumen de Configuración
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                    <div class="stat bg-base-100 rounded-lg shadow-sm">
                        <div class="stat-title text-xs">Niveles Actuales</div>
                        <div class="stat-value text-2xl text-primary">{{ segments.length }}</div>
                        <div class="stat-desc text-xs" :class="isCustomMode ? 'text-success font-semibold' : ''">
                            <span v-if="isCustomMode">✨ hasta {{ maxDepth }}</span>
                            <span v-else>de {{ maxDepth }} máx</span>
                        </div>
                    </div>
                    <div class="stat bg-base-100 rounded-lg shadow-sm">
                        <div class="stat-title text-xs">Obligatorios</div>
                        <div class="stat-value text-2xl text-error">{{ segments.filter(s => s.required).length }}</div>
                    </div>
                    <div class="stat bg-base-100 rounded-lg shadow-sm">
                        <div class="stat-title text-xs">Opcionales</div>
                        <div class="stat-value text-2xl text-warning">{{ segments.filter(s => !s.required).length }}</div>
                    </div>
                    <div class="stat bg-base-100 rounded-lg shadow-sm">
                        <div class="stat-title text-xs">Separador</div>
                        <div class="stat-value text-2xl text-secondary">{{ separator || 'Ninguno' }}</div>
                    </div>
                    <div class="stat bg-base-100 rounded-lg shadow-sm">
                        <div class="stat-title text-xs">Longitud Total</div>
                        <div class="stat-value text-2xl text-accent">
                            {{ segments.reduce((sum, s) => sum + s.digits, 0) + (separator ? segments.length - 1 : 0) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-base-200 rounded-lg">
            <div class="text-sm text-gray-600">
                <span class="material-symbols-outlined text-xs align-middle">info</span>
                Los cambios afectarán la validación de nuevos códigos de cuenta
            </div>
            <div class="flex gap-3">
                <BaseButton 
                    text="Cancelar"
                    icon="close"
                    variant="outline"
                    @click="$emit('cancel')"
                />
                <BaseButton 
                    text="Guardar Configuración"
                    icon="save"
                    class="btn-primary"
                    @click="saveConfig"
                />
            </div>
        </div>
    </div>
</template>
