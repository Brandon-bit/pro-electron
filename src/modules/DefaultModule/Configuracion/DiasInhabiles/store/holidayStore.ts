import { defineStore } from 'pinia'
import type { HolidayType } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/types/holidayTypes'

const useHolidayStore = defineStore('holiday-store', {
    state: () => ({
        selectedHoliday: null as HolidayType | null,
        modalId: 'holiday-modal',
        deleteModalId: 'delete-holiday-modal',
        isSubmitting: false
    }),
    actions: {
        setData(holiday: HolidayType) {
            this.selectedHoliday = holiday
        },
        clearData() {
            this.selectedHoliday = null
        },
        setSubmitting(value: boolean) {
            this.isSubmitting = value
        }
    }
})

export default useHolidayStore
