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
    holidayStore.selectedYear = props.yearGroup.year
    holidayStore.clearData()
    modalStore.open(holidayStore.holidayModalId, {
        type: 'CREATE',
        title: `Agregar día - Año ${props.yearGroup.year}`
    })
}

const openDeleteModal = (holiday: HolidayType) => {
    holidayStore.selectedYear = props.yearGroup.year
    holidayStore.setData(holiday)
    modalStore.open(holidayStore.holidayModalId, {
        type: 'DELETE',
        title: 'Eliminar día inhábil'
    })
}
</script>

<template>
    <div class="card bg-base-100 border border-base-200/70 shadow-sm hover:shadow-md transition-shadow duration-150">
        <div class="card-body p-4 space-y-4">
            <!-- Header minimalista -->
            <div class="flex items-center justify-between gap-2">
                <div>
                    <p class="text-xs uppercase tracking-wide text-base-content/60">Año</p>
                    <h3 class="text-lg font-semibold text-base-content">{{ yearGroup.year }}</h3>
                </div>
                <span class="badge badge-outline text-xs px-3 py-2 rounded-full">
                    Días {{ yearGroup.holidays.length }}
                </span>
            </div>

            <!-- Botón agregar día -->
            <div>
                <button
                    @click="openAddModal"
                    class="btn btn-primary btn-sm w-full gap-2 justify-center"
                >
                    <span class="material-symbols-outlined text-sm">add</span>
                    Agregar día inhábil
                </button>
            </div>

            <!-- Tabla de días -->
            <div class="overflow-x-auto rounded-xl border border-base-200/70 bg-base-100/80">
                <table class="table table-sm">
                    <thead>
                        <tr class="bg-base-200/70 text-base-content/80">
                            <th class="font-medium">Día</th>
                            <th class="font-medium">Descripción</th>
                            <th class="w-12 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="holiday in yearGroup.holidays"
                            :key="holiday.id"
                            class="hover:bg-base-200/60 transition-colors"
                        >
                            <td class="font-medium whitespace-nowrap">{{ holiday.date }}</td>
                            <td class="text-sm">{{ holiday.description }}</td>
                            <td class="text-center">
                                <button
                                    @click="openDeleteModal(holiday)"
                                    class="btn btn-ghost btn-xs btn-circle text-error"
                                    title="Eliminar día inhábil"
                                >
                                    <span class="material-symbols-outlined text-sm">close</span>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="yearGroup.holidays.length === 0">
                            <td colspan="3" class="text-center py-6 text-sm text-base-content/60">
                                No hay días inhábiles registrados para este año
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
