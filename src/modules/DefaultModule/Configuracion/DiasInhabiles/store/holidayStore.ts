import { defineStore } from 'pinia'
import type { HolidayType, YearGroupType } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/types/holidayTypes'

const initialHoliday: HolidayType = {
    id: 0,
    date: '',
    description: '',
    active: true
}

const useHolidayStore = defineStore('holiday-store', {
    state: () => ({
        yearHolidays: [] as YearGroupType[],
        selectedHoliday: null as HolidayType | null,
        selectedYear: 0 as number,
        holidayModalId: 'holiday-modal',
        yearModalId: 'year-modal',
        isLoading: false,
    }),
    actions: {
        setData(holiday: HolidayType = initialHoliday) {
            this.selectedHoliday = holiday
        },
        clearData() {
            this.selectedHoliday = null
        },
        setYear(year: number) {
            this.selectedYear = year
        },
        clearYear() {
            this.selectedYear = 0
        }
    }
})

export default useHolidayStore
