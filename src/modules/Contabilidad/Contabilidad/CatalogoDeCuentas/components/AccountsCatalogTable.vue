<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import useAccountCatalog from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalog'
import type { AccountType } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'

const props = defineProps<{
    accounts: AccountType[]
    loading: boolean
}>()

const { openEditView, openDeleteModal, getTypeVariant, getNatureVariant } = useAccountCatalog()

const expandedRows = ref<Set<number>>(new Set([1, 2, 3, 11, 12, 21, 31, 111, 112, 121, 122, 211, 212]))

const toggleRow = (id: number) => {
    const newSet = new Set(expandedRows.value)
    if (newSet.has(id)) {
        newSet.delete(id)
    } else {
        newSet.add(id)
    }
    expandedRows.value = newSet
}

const getLevelPadding = (level: number) => {
    const paddingPerLevel = 1.5
    const maxPadding = 6 
    const padding = Math.min(level * paddingPerLevel, maxPadding)
    return `${padding}rem`
}

interface AccountRow {
    account: AccountType
    level: number
    hasChildren: boolean
    isExpanded: boolean
}

const renderAccountRow = (account: AccountType, level: number = 0): AccountRow[] => {
    return [
        {
            account,
            level,
            hasChildren: Boolean(account.subaccounts && account.subaccounts.length > 0),
            isExpanded: expandedRows.value.has(account.id!)
        },
        ...(account.subaccounts && expandedRows.value.has(account.id!)
            ? account.subaccounts.flatMap((sub: AccountType) => renderAccountRow(sub, level + 1))
            : [])
    ]
}

const flattenedAccounts = computed(() => {
    return props.accounts.flatMap((account: AccountType) => renderAccountRow(account, 0))
})

</script>

<template>
    <div v-if="loading" class="flex justify-center items-center py-20">
        <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else class="rounded-box border border-base-content/5 bg-base-100 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="table">
                <thead class="bg-base-300">
                    <tr>
                        <th class="w-[250px]">Código</th>
                        <th>Nombre</th>
                        <th class="w-[150px]">Tipo</th>
                        <th class="w-[150px]">Naturaleza</th>
                        <th class="w-[150px]">Clasificación</th>
                        <th class="w-[120px]">Código SAT</th>
                        <th class="w-[120px] text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="row in flattenedAccounts" :key="row.account.id">
                        <tr class="hover:bg-base-200">
                            <td class="font-medium" :style="`padding-left: ${getLevelPadding(row.level)}`">
                                <div class="flex items-center gap-2">
                                    <BaseButton
                                        v-if="row.hasChildren"
                                        text=""
                                        :icon="row.isExpanded ? 'expand_more' : 'chevron_right'"
                                        variant="ghost"
                                        size="xs"
                                        class="w-6 h-6 min-w-6 p-0"
                                        @click="toggleRow(row.account.id!)"
                                    />
                                    <span v-else class="w-6"></span>
                                    <span>{{ row.account.code }}</span>
                                </div>
                            </td>
                            <td>
                                <span :class="row.level === 0 ? 'font-semibold' : row.level === 1 ? 'font-medium' : ''">
                                    {{ row.account.name }}
                                </span>
                            </td>
                            <td>
                                <span class="badge" :class="getTypeVariant(row.account.type)">
                                    {{ row.account.type }}
                                </span>
                            </td>
                            <td>
                                <span class="badge" :class="getNatureVariant(row.account.nature)">
                                    {{ row.account.nature }}
                                </span>
                            </td>
                            <td>
                                <span class="badge badge-info">
                                    {{ row.account.clasification }}
                                </span>
                            </td>
                            <td>
                                <span class="font-mono text-sm badge badge-outline">
                                    {{ row.account.SATCode || '-' }}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2 justify-center">
                                    <BaseButton
                                        text=""
                                        icon="edit"
                                        variant="ghost"
                                        size="sm"
                                        title="Editar"
                                        @click="openEditView(row.account)"
                                    />
                                    <BaseButton
                                        text=""
                                        icon="delete"
                                        variant="ghost"
                                        size="sm"
                                        title="Eliminar"
                                        class="text-error"
                                        @click="openDeleteModal(row.account)"
                                    />
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
                <tfoot v-if="accounts.length === 0">
                    <tr>
                        <td colspan="7" class="text-center py-8">
                            No se encontraron cuentas
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<style scoped>
.table tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.02);
}
</style>
