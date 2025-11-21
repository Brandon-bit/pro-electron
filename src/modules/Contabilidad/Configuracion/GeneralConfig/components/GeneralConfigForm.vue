<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { showNotification } from '@/utils/toastNotifications'
import { useGeneralConfigActions } from '@contabilidad/Configuracion/GeneralConfig/composables/useGeneralConfigActions'
import useGeneralConfigStore from '@contabilidad/Configuracion/GeneralConfig/store/generalConfigStore'
import type { CompanyType, GeneralConfigFormDTO } from '@contabilidad/Configuracion/GeneralConfig/types/generalConfigTypes'

const { getGeneralConfig, updateGeneralConfig, createGeneralConfig } = useGeneralConfigActions()
const generalConfigStore = useGeneralConfigStore()

const configId = ref<number | null>(null)
const companyType = ref<CompanyType>('tradicional')
const description = ref('')
const ejerciciofiscalinicio = ref('')
const ejerciciofiscalfin = ref('')
const monedabase = ref('MXN')
const decimales = ref(2)
const isLoading = ref(false)
const isSaving = ref(false)
const configExists = ref(false)
const showUpdateConfirmModal = ref(false)

const currencyOptions = [
    { value: 'MXN', label: 'Peso Mexicano (MXN)' },
    { value: 'USD', label: 'Dólar Estadounidense (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' }
]

const decimalOptions = [
    { value: 0, label: '0 decimales' },
    { value: 1, label: '1 decimal' },
    { value: 2, label: '2 decimales' },
    { value: 3, label: '3 decimales' },
    { value: 4, label: '4 decimales' }
]

const loadConfig = async () => {
    isLoading.value = true
    try {
        const config = await getGeneralConfig()
        if (config) {
            configId.value = config.id
            companyType.value = config.companyType
            description.value = config.description
            ejerciciofiscalinicio.value = config.ejerciciofiscalinicio || ''
            ejerciciofiscalfin.value = config.ejerciciofiscalfin || ''
            monedabase.value = config.monedabase
            decimales.value = config.decimales
            configExists.value = true
            generalConfigStore.setConfig(config)
        } else {
            configExists.value = false
        }
    } catch (error) {
        showNotification('Error al cargar la configuración', 'error')
        configExists.value = false
    } finally {
        isLoading.value = false
    }
}

const saveConfig = async () => {
    if (configExists.value && configId.value) {
        showUpdateConfirmModal.value = true
        return
    }
    await executeCreate()
}

const executeCreate = async () => {
    isSaving.value = true
    try {
        console.log('📝 Description value:', description.value)
        
        const formData: GeneralConfigFormDTO = {
            companyType: companyType.value,
            description: description.value,
            ejerciciofiscalinicio: ejerciciofiscalinicio.value || undefined,
            ejerciciofiscalfin: ejerciciofiscalfin.value || undefined,
            monedabase: monedabase.value,
            decimales: decimales.value,
            active: true
        }
        
        console.log('📦 FormData:', formData)
        
        const created = await createGeneralConfig(formData)
        configId.value = created.id
        configExists.value = true
        showNotification('Configuración creada exitosamente', 'success')
        await loadConfig()
    } catch (error) {
        showNotification('Error al guardar la configuración', 'error')
        console.error(error)
    } finally {
        isSaving.value = false
    }
}

const confirmUpdate = async () => {
    showUpdateConfirmModal.value = false
    isSaving.value = true
    try {
        const formData: GeneralConfigFormDTO = {
            companyType: companyType.value,
            description: description.value,
            ejerciciofiscalinicio: ejerciciofiscalinicio.value || undefined,
            ejerciciofiscalfin: ejerciciofiscalfin.value || undefined,
            monedabase: monedabase.value,
            decimales: decimales.value,
            active: true
        }
        await updateGeneralConfig(configId.value!, formData)
        showNotification('Configuración actualizada exitosamente', 'success')
        await loadConfig()
    } catch (error) {
        showNotification('Error al actualizar la configuración', 'error')
        console.error(error)
    } finally {
        isSaving.value = false
    }
}

const cancelUpdate = () => {
    showUpdateConfirmModal.value = false
}

const toggleCompanyType = () => {
    companyType.value = companyType.value === 'tradicional' ? 'financiera' : 'tradicional'
}

const submitButtonText = computed(() => {
    if (isSaving.value) return 'Guardando...'
    return configExists.value ? 'Actualizar Configuración' : 'Crear Configuración'
})

onMounted(() => {
    loadConfig()
})
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title text-2xl mb-6">Configuración General</h2>

            <div v-if="isLoading" class="flex justify-center items-center py-12">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else class="space-y-6">
                <div v-if="!configExists" class="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                        <h3 class="font-bold">Configuración Inicial</h3>
                        <div class="text-sm">
                            Esta es la primera vez que configuras el sistema contable. Los valores que establezcas aquí determinarán el comportamiento de todo el módulo de contabilidad.
                        </div>
                    </div>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Tipo de Empresa *</span>
                    </label>
                    <div class="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                        <span :class="['text-lg font-medium', companyType === 'tradicional' ? 'text-primary' : 'text-base-content/50']">
                            Tradicional
                        </span>
                        <input 
                            type="checkbox" 
                            class="toggle toggle-primary toggle-lg" 
                            :checked="companyType === 'financiera'"
                            @change="toggleCompanyType"
                        />
                        <span :class="['text-lg font-medium', companyType === 'financiera' ? 'text-primary' : 'text-base-content/50']">
                            Financiera
                        </span>
                    </div>
                </div>

                <div class="alert" :class="companyType === 'tradicional' ? 'alert-info' : 'alert-warning'">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                        <h3 class="font-bold">{{ companyType === 'tradicional' ? 'Empresa Tradicional' : 'Empresa Financiera' }}</h3>
                        <div class="text-xs">
                            {{ companyType === 'tradicional' 
                                ? 'El catálogo de cuentas se adaptará a empresas comerciales, industriales o de servicios con estructura contable estándar.' 
                                : 'El catálogo de cuentas se adaptará a instituciones financieras con cuentas especiales como captación, colocación, instrumentos financieros, etc.' }}
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Inicio Ejercicio Fiscal</span>
                        </label>
                        <input 
                            v-model="ejerciciofiscalinicio"
                            type="date" 
                            class="input input-bordered w-full" 
                        />
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Fin Ejercicio Fiscal</span>
                        </label>
                        <input 
                            v-model="ejerciciofiscalfin"
                            type="date" 
                            class="input input-bordered w-full" 
                        />
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Moneda Base *</span>
                        </label>
                        <select v-model="monedabase" class="select select-bordered w-full">
                            <option v-for="currency in currencyOptions" :key="currency.value" :value="currency.value">
                                {{ currency.label }}
                            </option>
                        </select>
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Decimales *</span>
                        </label>
                        <select v-model.number="decimales" class="select select-bordered w-full">
                            <option v-for="option in decimalOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- CAMPO DESCRIPCIÓN CON TEXTAREA NATIVO -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Descripción (Opcional)</span>
                    </label>
                    <textarea 
                        v-model="description"
                        class="textarea textarea-bordered w-full" 
                        rows="3"
                        placeholder="Agregue notas o comentarios sobre esta configuración..."
                    ></textarea>
                </div>

                <div class="card-actions justify-end pt-4">
                    <BaseButton
                        type="button"
                        :text="submitButtonText"
                        variant="primary"
                        @click="saveConfig"
                        :disabled="isSaving"
                        icon="save"
                    />
                </div>
            </div>
        </div>
    </div>

    <dialog :class="['modal', { 'modal-open': showUpdateConfirmModal }]">
        <div class="modal-box">
            <h3 class="font-bold text-lg text-warning">⚠️ Confirmar Actualización</h3>
            <p class="py-4">
                Estás a punto de actualizar la configuración general del sistema contable.<br><br>
                <strong class="text-error">Esta acción puede tener afectaciones en:</strong>
            </p>
            <ul class="list-disc list-inside space-y-2 text-sm">
                <li>Catálogo de cuentas existente</li>
                <li>Pólizas contables registradas</li>
                <li>Reportes y balances generados</li>
                <li>Cálculos de depreciación</li>
            </ul>
            <p class="mt-4 text-sm opacity-75">
                Esta actualización se realiza bajo tu responsabilidad. Asegúrate de que los nuevos valores sean correctos.
            </p>
            <div class="modal-action">
                <button @click="cancelUpdate" class="btn btn-ghost">Cancelar</button>
                <button @click="confirmUpdate" class="btn btn-warning">
                    Confirmar Actualización
                </button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop" @click="cancelUpdate">
            <button>close</button>
        </form>
    </dialog>
</template>
