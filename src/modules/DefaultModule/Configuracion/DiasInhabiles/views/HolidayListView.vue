<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import YearCard from '@/modules/DefaultModule/Configuracion/DiasInhabiles/components/YearCard.vue'
import HolidayModal from '@/modules/DefaultModule/Configuracion/DiasInhabiles/components/HolidayModal.vue'
import YearHolidayModal from '@/modules/DefaultModule/Configuracion/DiasInhabiles/components/YearHolidayModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useHolidayStore from '@/modules/DefaultModule/Configuracion/DiasInhabiles/store/holidayStore'
import { useHolidayActions } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/composables/useHolidayActions'

const modalStore = useModalStore()
const holidayStore = useHolidayStore()
const { getHolidays } = useHolidayActions()

const openAddYearModal = () => {
    holidayStore.clearYear()
    modalStore.open(holidayStore.yearModalId, {
        type: 'CREATE',
        title: 'Nuevo año'
    })
}

onMounted(() => {
    getHolidays()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle title="Días Inhábiles" />

        <!-- New Year Button -->
        <div>
            <BaseButton
                text="Nuevo año"
                @click="openAddYearModal"
                variant="primary"
                icon="add"
            />
        </div>

        <!-- Loading -->
        <div v-if="holidayStore.isLoading" class="flex justify-center py-12">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <!-- Year Cards Grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <YearCard
                v-for="yearGroup in holidayStore.yearHolidays"
                :key="yearGroup.year"
                :year-group="yearGroup"
            />
        </div>

        <!-- Empty State -->
        <div v-if="!holidayStore.isLoading && holidayStore.yearHolidays.length === 0" class="text-center py-12">
            <span class="material-symbols-outlined text-6xl opacity-30">event_busy</span>
            <p class="text-lg opacity-60 mt-4">No hay días inhábiles registrados</p>
        </div>

        <!-- Modals -->
        <HolidayModal />
        <YearHolidayModal />
    </div>
</template>
