<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import AccountMaskConfigForm from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/components/AccountMaskConfigForm.vue'
import { useAccountCatalogActions } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalogActions'
import type { AccountMaskConfig } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'
import { showNotification } from '@/utils/toastNotifications'
import { useRouter } from 'vue-router'

const router = useRouter()
const { getAccountMaskConfig, saveAccountMaskConfig } = useAccountCatalogActions()

const initialConfig = ref<AccountMaskConfig | null>(null)
const loading = ref(true)

onMounted(async () => {
    try {
        initialConfig.value = await getAccountMaskConfig()
    } catch (error) {
        console.error('Error loading mask configuration:', error)
        showNotification('Error al cargar configuración de máscara', 'error')
    } finally {
        loading.value = false
    }
})

const handleSaveConfig = async (config: { format: string; segments: any[] }) => {
    try {
        const result = await saveAccountMaskConfig({
            format: config.format,
            segments: config.segments
        })
        
        showNotification(result.message, result.status as 'success' | 'error')
        
        // Redirigir después de guardar
        setTimeout(() => {
            router.push('/contabilidad/catalogo-de-cuentas')
        }, 1500)
    } catch (error) {
        console.error('Error saving mask configuration:', error)
        showNotification('Error al guardar configuración', 'error')
    }
}

const handleCancel = () => {
    router.push('/contabilidad/catalogo-de-cuentas')
}
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Configuración de Máscara de Cuentas" 
            subtitle="Personalice el formato de códigos para el catálogo de cuentas de su empresa" 
        />

        <div v-if="loading" class="flex justify-center items-center py-20">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <AccountMaskConfigForm
            v-else-if="initialConfig"
            :initial-config="initialConfig"
            @save="handleSaveConfig"
            @cancel="handleCancel"
        />

        <div v-else class="card bg-base-100 border border-base-content/10">
            <div class="card-body text-center py-10">
                <h3 class="text-lg font-medium text-gray-500 mb-2">
                    No se pudo cargar la configuración
                </h3>
                <p class="text-sm text-gray-400 mb-4">
                    Por favor, intente recargar la página
                </p>
                <button class="btn btn-primary" @click="$router.go(0)">
                    Recargar
                </button>
            </div>
        </div>
    </div>
</template>
