<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import type { AccountNatureDTO } from '@contabilidad/Configuracion/AccountNature/types/accountNatureTypes'
import useAccountNature from '@contabilidad/Configuracion/AccountNature/composables/useAccountNature'

interface Props {
    accountNatures: AccountNatureDTO[]
    loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['edit', 'delete'])

const { getTableColumns, formatAccountNatureForTable } = useAccountNature()

const columns = getTableColumns()

const formattedData = computed(() => 
    props.accountNatures.map(formatAccountNatureForTable)
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
            <div v-else-if="!accountNatures || accountNatures.length === 0" 
                 class="text-center py-12">
                <p class="text-gray-500 text-lg">No hay naturalezas de cuenta registradas</p>
                <p class="text-gray-400 text-sm mt-2">
                    Crea la primera naturaleza de cuenta para comenzar
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
                        <tr v-for="(item, index) in formattedData" :key="accountNatures[index].id">
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
                                        @click="handleEdit(accountNatures[index].id)"
                                    />
                                    <BaseButton
                                        text="Eliminar"
                                        icon="delete"
                                        variant="danger"
                                        size="sm"
                                        @click="handleDelete(accountNatures[index].id)"
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
