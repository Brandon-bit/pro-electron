<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import YearCard from '@/modules/DefaultModule/Configuracion/DiasInhabiles/components/YearCard.vue'
import HolidayModal from '@/modules/DefaultModule/Configuracion/DiasInhabiles/components/HolidayModal.vue'
import DeleteHolidayModal from '@/modules/DefaultModule/Configuracion/DiasInhabiles/components/DeleteHolidayModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useHolidayStore from '@/modules/DefaultModule/Configuracion/DiasInhabiles/store/holidayStore'
import useHoliday from '@/modules/DefaultModule/Configuracion/DiasInhabiles/composables/useHoliday'
import { useHolidayActions } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/composables/useHolidayActions'
import type { HolidayType } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/types/holidayTypes'

const modalStore = useModalStore()
const holidayStore = useHolidayStore()
const { groupHolidaysByYear } = useHoliday()
const { getHolidays } = useHolidayActions()

const holidays = ref<HolidayType[]>([])
const loading = ref(true)

const yearGroups = computed(() => {
    return groupHolidaysByYear(holidays.value)
})

const loadHolidays = async () => {
    loading.value = true
    try {
        holidays.value = await getHolidays()
    } finally {
        loading.value = false
    }
}

const openCreateModal = () => {
    holidayStore.clearData()
    modalStore.open(holidayStore.modalId, {
        type: 'CREATE',
        title: 'Nuevo año'
    })
}

onMounted(() => {
    loadHolidays()
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
                @click="openCreateModal"
                variant="primary"
                icon="add"
            />
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-12">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <!-- Year Cards Grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <YearCard
                v-for="yearGroup in yearGroups"
                :key="yearGroup.year"
                :year-group="yearGroup"
            />
        </div>

        <!-- Empty State -->
        <div v-if="!loading && yearGroups.length === 0" class="text-center py-12">
            <span class="material-symbols-outlined text-6xl opacity-30">event_busy</span>
            <p class="text-lg opacity-60 mt-4">No hay días inhábiles registrados</p>
        </div>

        <!-- Modals -->
        <HolidayModal :on-refresh="loadHolidays" />
        <DeleteHolidayModal :on-refresh="loadHolidays" />
    </div>
</template>
