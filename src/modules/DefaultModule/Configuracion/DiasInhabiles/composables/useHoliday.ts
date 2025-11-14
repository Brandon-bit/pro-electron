import type { YearGroupType, HolidayType } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/types/holidayTypes'

const useHoliday = () => {
    
    /**
     * Agrupa días inhábiles por año
     */
    const groupHolidaysByYear = (holidays: HolidayType[]): YearGroupType[] => {
        const grouped = holidays.reduce((acc, holiday) => {
            const year = holiday.year
            if (!acc[year]) {
                acc[year] = []
            }
            acc[year].push(holiday)
            return acc
        }, {} as Record<number, HolidayType[]>)

        return Object.entries(grouped)
            .map(([year, holidays]) => ({
                year: parseInt(year),
                holidays: holidays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            }))
            .sort((a, b) => a.year - b.year)
    }

    /**
     * Formatea una fecha para mostrar
     */
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        groupHolidaysByYear,
        formatDate
    }
}

export default useHoliday
