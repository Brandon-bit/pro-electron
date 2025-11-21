<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import AccountsCatalogSearch from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/components/AccountsCatalogSearch.vue'
import AccountsCatalogTable from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/components/AccountsCatalogTable.vue'
import AccountImportModal from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/components/AccountImportModal.vue'
import useAccountCatalog from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalog'
import { useAccountCatalogActions } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalogActions'
import type { AccountType } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useRouter } from 'vue-router'
import { showNotification } from '@/utils/toastNotifications'
import useGeneralConfigStore from '@contabilidad/Configuracion/GeneralConfig/store/generalConfigStore'

const router = useRouter()
const { filterAccounts } = useAccountCatalog()
const { getAccountsCatalog, importAccountsFromExcel } = useAccountCatalogActions()
const generalConfigStore = useGeneralConfigStore()

const accounts = ref<AccountType[]>([])
const searchTerm = ref('')
const loading = ref(true)
const showImportModal = ref(false)

// Computed para mostrar el tipo de empresa
const companyTypeDisplay = computed(() => {
    const type = generalConfigStore.getCompanyType
    return type === 'financiera' ? 'Financiera' : 'Tradicional'
})

// Función para cambiar tipo de empresa (para testing)
const toggleCompanyType = () => {
    const currentType = generalConfigStore.getCompanyType
    const newType = currentType === 'financiera' ? 'tradicional' : 'financiera'
    generalConfigStore.setCompanyType(newType)
    console.log(`🔄 Tipo de empresa cambiado a: ${newType}`)
}

const goToMaskConfig = () => {
    router.push('/contabilidad/configuracion/mascara')
}

const openImportModal = () => {
    showImportModal.value = true
}

const closeImportModal = () => {
    showImportModal.value = false
}

const handleImport = async (importedData: any[]) => {
    try {
        const result = await importAccountsFromExcel(importedData)
        
        if (result.success) {
            showNotification(
                `${result.message} (${result.imported} importadas, ${result.errors} errores)`,
                'success'
            )
            // Recargar catálogo después de importar
            await fetchAccounts()
        } else {
            showNotification('Error al importar cuentas', 'error')
        }
    } catch (error) {
        console.error('Error importing accounts:', error)
        showNotification('Error al procesar la importación', 'error')
    }
}

const fetchAccounts = async () => {
    loading.value = true
    try {
        console.log(`🔄 Cargando catálogo para empresa ${companyTypeDisplay.value}...`)
        accounts.value = await getAccountsCatalog()
        console.log(`✅ Catálogo cargado: ${accounts.value.length} cuentas principales`)
    } catch (error) {
        console.error('Error fetching accounts:', error)
        showNotification('Error al cargar el catálogo de cuentas', 'error')
    } finally {
        loading.value = false
    }
}

const filteredAccounts = computed(() => {
    return filterAccounts(accounts.value, searchTerm.value)
})

// Watcher para recargar cuentas cuando cambie el tipo de empresa
watch(
    () => generalConfigStore.getCompanyType,
    (newType, oldType) => {
        if (newType !== oldType) {
            console.log(`🔄 Tipo de empresa cambió de ${oldType} a ${newType}. Recargando catálogo...`)
            fetchAccounts()
        }
    }
)

onMounted(() => {
    fetchAccounts()
})
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <BaseTitle title="Catálogo de Cuentas" subtitle="Registro y gestión de cuentas contables" />
                <div class="flex items-center gap-3 text-xs text-gray-500 mt-1 ml-1">
                    <div>
                        <span class="font-medium">Tipo de empresa:</span> 
                        <span class="font-semibold text-primary">({{ companyTypeDisplay }})</span>
                    </div>
                    <!-- Botón temporal para testing -->
                    <button 
                        @click="toggleCompanyType"
                        class="btn btn-xs btn-outline btn-secondary"
                        title="Cambiar tipo de empresa (solo para testing)"
                    >
                        🔄 Cambiar a {{ companyTypeDisplay === 'Financiera' ? 'Tradicional' : 'Financiera' }}
                    </button>
                </div>
            </div>
            <div class="flex gap-2">
                <button 
                    @click="openImportModal"
                    class="btn btn-primary btn-sm"
                    title="Importar cuentas desde Excel"
                >
                    <span class="material-symbols-outlined">upload_file</span>
                    Importar
                </button>
                <button 
                    @click="goToMaskConfig"
                    class="btn btn-outline btn-sm"
                    title="Configurar formato de códigos"
                >
                    <span class="material-symbols-outlined">settings</span>
                    Configurar Máscara
                </button>
            </div>
        </div>

        <AccountsCatalogSearch v-model="searchTerm" />

        <AccountsCatalogTable :accounts="filteredAccounts" :loading="loading" />

        <!-- Modal de importación -->
        <AccountImportModal 
            :show="showImportModal" 
            @close="closeImportModal"
            @import="handleImport"
        />
    </div>
</template>
