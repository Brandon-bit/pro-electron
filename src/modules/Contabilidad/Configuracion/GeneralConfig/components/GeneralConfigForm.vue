<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { showNotification } from '@/utils/toastNotifications'
import { useGeneralConfigActions } from '@contabilidad/Configuracion/GeneralConfig/composables/useGeneralConfigActions'
import useGeneralConfigStore from '@contabilidad/Configuracion/GeneralConfig/store/generalConfigStore'
import type { CompanyType } from '@contabilidad/Configuracion/GeneralConfig/types/generalConfigTypes'

const { getGeneralConfig, updateGeneralConfig } = useGeneralConfigActions()
const generalConfigStore = useGeneralConfigStore()

// Estado del formulario
const companyType = ref<CompanyType>('tradicional')
const description = ref('')
const isLoading = ref(false)
const isSaving = ref(false)

// Cargar configuración actual
const loadConfig = async () => {
    isLoading.value = true
    try {
        const config = await getGeneralConfig()
        companyType.value = config.companyType
        description.value = config.description
        
        // Actualizar store global
        generalConfigStore.setCompanyType(config.companyType)
        generalConfigStore.setConfig({
            companyType: config.companyType,
            description: config.description,
            active: config.active
        })
    } catch (error) {
        showNotification('Error al cargar la configuración', 'error')
    } finally {
        isLoading.value = false
    }
}

// Guardar configuración
const saveConfig = async () => {
    isSaving.value = true
    try {
        const updatedConfig = await updateGeneralConfig({
            companyType: companyType.value,
            description: description.value,
            active: true
        })
        
        // Actualizar store global
        generalConfigStore.setCompanyType(updatedConfig.companyType)
        generalConfigStore.setConfig({
            companyType: updatedConfig.companyType,
            description: updatedConfig.description,
            active: updatedConfig.active
        })
        
        showNotification('Configuración guardada exitosamente', 'success')
    } catch (error) {
        showNotification('Error al guardar la configuración', 'error')
    } finally {
        isSaving.value = false
    }
}

// Cambiar tipo de empresa (toggle switch)
const toggleCompanyType = () => {
    companyType.value = companyType.value === 'tradicional' ? 'financiera' : 'tradicional'
}

onMounted(() => {
    loadConfig()
})
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title text-2xl mb-6">Configuración General</h2>

            <!-- Indicador de carga -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <!-- Formulario -->
            <div v-else class="space-y-6">
                <!-- Tipo de Empresa con Switch -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Tipo de Empresa</span>
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
                    <label class="label">
                        <span class="label-text-alt text-info">
                            {{ companyType === 'tradicional' 
                                ? 'Empresa con estructura contable estándar' 
                                : 'Institución financiera con requerimientos especiales' }}
                        </span>
                    </label>
                </div>

                <!-- Descripción Detallada -->
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

                <!-- Descripción personalizada -->
                <BaseTextArea
                    v-model="description"
                    name="description"
                    label="Descripción (Opcional)"
                    placeholder="Agregue notas o comentarios sobre esta configuración..."
                    :rows="3"
                />

                <!-- Botones de acción -->
                <div class="card-actions justify-end pt-4">
                    <BaseButton
                        type="button"
                        text="Guardar Configuración"
                        variant="primary"
                        @click="saveConfig"
                        :disabled="isSaving"
                        icon="save"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
