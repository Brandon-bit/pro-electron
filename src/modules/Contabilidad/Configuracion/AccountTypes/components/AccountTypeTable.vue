<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import type { AccountTypeDTO } from '@contabilidad/Configuracion/AccountTypes/types/accountTypesTypes'
import useAccountTypes from '@contabilidad/Configuracion/AccountTypes/composables/useAccountTypes'

interface Props {
    accountTypes: AccountTypeDTO[]
    loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['edit', 'delete'])

const { getTableColumns, formatAccountTypeForTable } = useAccountTypes()

const columns = getTableColumns()

const formattedData = computed(() => 
    props.accountTypes.map(formatAccountTypeForTable)
)

const handleEdit = (id: number) => {
    emit('edit', id)
}

const handleDelete = (id: number) => {
    emit('delete', id)
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center py-12">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <!-- Empty State -->
            <div v-else-if="!accountTypes || accountTypes.length === 0" 
                 class="text-center py-12">
                <p class="text-gray-500 text-lg">No hay tipos de cuenta registrados</p>
                <p class="text-gray-400 text-sm mt-2">
                    Crea el primer tipo de cuenta para comenzar
                </p>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <!-- Head -->
                    <thead>
                        <tr>
                            <th v-for="column in columns" :key="column.key">
                                {{ column.label }}
                            </th>
                        </tr>
                    </thead>

                    <!-- Body -->
                    <tbody>
                        <tr v-for="(item, index) in formattedData" :key="accountTypes[index].id">
                            <td>{{ item.id }}</td>
                            <td class="font-semibold">{{ item.name }}</td>
                            <td>{{ item.description }}</td>
                            <td>
                                <span 
                                    class="badge" 
                                    :class="item.statusClass"
                                >
                                    {{ item.active }}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <BaseButton
                                        text="Editar"
                                        icon="edit"
                                        variant="secondary"
                                        size="sm"
                                        @click="handleEdit(accountTypes[index].id)"
                                    />
                                    <BaseButton
                                        text="Eliminar"
                                        icon="delete"
                                        variant="danger"
                                        size="sm"
                                        @click="handleDelete(accountTypes[index].id)"
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
