<script setup lang="ts">
import type { YearGroupType, HolidayType } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/types/holidayTypes'
import { useModalStore } from '@/shared/stores/modal.store'
import useHolidayStore from '@/modules/DefaultModule/Configuracion/DiasInhabiles/store/holidayStore'

const props = defineProps<{
    yearGroup: YearGroupType
}>()

const modalStore = useModalStore()
const holidayStore = useHolidayStore()

const openAddModal = () => {
    holidayStore.clearData()
    modalStore.open(holidayStore.modalId, {
        type: 'CREATE',
        title: `Agregar día - Año ${props.yearGroup.year}`
    })
}

const openDeleteModal = (holiday: HolidayType) => {
    holidayStore.setData(holiday)
    modalStore.open(holidayStore.deleteModalId, {
        type: 'DELETE',
        title: 'Eliminar día inhábil'
    })
}
</script>

<template>
    <div class="card bg-base-100 shadow-lg">
        <!-- Header -->
        <div class="card-body p-0">
            <div class="bg-neutral text-neutral-content p-4 rounded-t-2xl">
                <h3 class="text-xl font-bold text-center">Año {{ yearGroup.year }}</h3>
            </div>

            <!-- Add Button -->
            <div class="px-4 pt-4">
                <button
                    @click="openAddModal"
                    class="btn btn-primary btn-sm w-full gap-2"
                >
                    <span class="material-symbols-outlined text-sm">add</span>
                    Agregar día
                </button>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto px-4 pb-4">
                <table class="table table-sm">
                    <thead>
                        <tr class="bg-neutral text-neutral-content">
                            <th class="rounded-tl-lg">Día</th>
                            <th>Descripción</th>
                            <th class="rounded-tr-lg w-16"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="holiday in yearGroup.holidays"
                            :key="holiday.id"
                            class="hover:bg-base-200"
                        >
                            <td class="font-medium">{{ holiday.day }}</td>
                            <td>{{ holiday.description }}</td>
                            <td class="text-center">
                                <button
                                    @click="openDeleteModal(holiday)"
                                    class="btn btn-ghost btn-xs btn-circle text-error"
                                    title="Eliminar"
                                >
                                    <span class="material-symbols-outlined text-sm">close</span>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="yearGroup.holidays.length === 0">
                            <td colspan="3" class="text-center opacity-60 py-8">
                                No hay días inhábiles registrados
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
