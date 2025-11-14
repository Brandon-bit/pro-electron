import type { HolidayType, HolidayFormType } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/types/holidayTypes'

// Mock data para desarrollo
const mockHolidays: HolidayType[] = [
    // 2023
    { id: '1', date: '2023-01-01', day: 'enero/01', description: 'Año Nuevo', year: 2023 },
    { id: '2', date: '2023-02-06', day: 'febrero/06', description: 'Día de la Constitución', year: 2023 },
    { id: '3', date: '2023-03-20', day: 'marzo/20', description: 'Natalicio de Benito Juárez', year: 2023 },
    { id: '4', date: '2023-05-01', day: 'mayo/01', description: 'Día del Trabajo', year: 2023 },
    { id: '5', date: '2023-09-15', day: 'septiembre/15', description: 'Día de la Independencia', year: 2023 },
    { id: '6', date: '2023-11-20', day: 'noviembre/20', description: 'Día de la Revolución', year: 2023 },
    { id: '7', date: '2023-11-21', day: 'noviembre/21', description: 'Pruebas JAMAS', year: 2023 },
    { id: '8', date: '2023-12-25', day: 'diciembre/25', description: 'Navidad', year: 2023 },
    
    // 2024
    { id: '9', date: '2024-01-01', day: 'enero/01', description: 'Año Nuevo', year: 2024 },
    { id: '10', date: '2024-02-05', day: 'febrero/05', description: 'Día de la Constitución', year: 2024 },
    { id: '11', date: '2024-03-18', day: 'marzo/18', description: 'Natalicio de Benito Juárez', year: 2024 },
    { id: '12', date: '2024-05-01', day: 'mayo/01', description: 'Día del Trabajo', year: 2024 },
    { id: '13', date: '2024-09-16', day: 'septiembre/16', description: 'Día de la Independencia', year: 2024 },
    { id: '14', date: '2024-11-18', day: 'noviembre/18', description: 'Día de la Revolución', year: 2024 },
    { id: '15', date: '2024-12-01', day: 'diciembre/01', description: 'Transmisión del Poder Ejecutivo Federal', year: 2024 },
    { id: '16', date: '2024-12-25', day: 'diciembre/25', description: 'Navidad', year: 2024 },
    
    // 2025
    { id: '17', date: '2025-01-01', day: 'enero/01', description: 'Año Nuevo', year: 2025 },
    { id: '18', date: '2025-02-03', day: 'febrero/03', description: 'Día de la Constitución', year: 2025 },
    { id: '19', date: '2025-03-17', day: 'marzo/17', description: 'Natalicio de Benito Juárez', year: 2025 },
    { id: '20', date: '2025-05-01', day: 'mayo/01', description: 'Día del Trabajo', year: 2025 },
    { id: '21', date: '2025-09-16', day: 'septiembre/16', description: 'Día de la Independencia', year: 2025 },
    { id: '22', date: '2025-11-17', day: 'noviembre/17', description: 'Día de la Revolución', year: 2025 },
    { id: '23', date: '2025-12-25', day: 'diciembre/25', description: 'Navidad', year: 2025 }
]

export const holidayService = {
    /**
     * Obtiene todos los días inhábiles
     */
    async getHolidays(): Promise<HolidayType[]> {
        await new Promise(resolve => setTimeout(resolve, 300))
        return [...mockHolidays]
    },

    /**
     * Obtiene días inhábiles por año
     */
    async getHolidaysByYear(year: number): Promise<HolidayType[]> {
        await new Promise(resolve => setTimeout(resolve, 300))
        return mockHolidays.filter(h => h.year === year)
    },

    /**
     * Crea un nuevo día inhábil
     */
    async createHoliday(data: HolidayFormType): Promise<HolidayType> {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const date = new Date(data.date)
        const year = date.getFullYear()
        const month = date.toLocaleDateString('es-ES', { month: 'long' })
        const day = date.getDate()
        
        const newHoliday: HolidayType = {
            id: Date.now().toString(),
            date: data.date,
            day: `${month}/${day.toString().padStart(2, '0')}`,
            description: data.description,
            year
        }
        
        mockHolidays.push(newHoliday)
        return newHoliday
    },

    /**
     * Elimina un día inhábil
     */
    async deleteHoliday(id: string): Promise<boolean> {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const index = mockHolidays.findIndex(h => h.id === id)
        if (index === -1) {
            throw new Error('Día inhábil no encontrado')
        }
        
        mockHolidays.splice(index, 1)
        return true
    }
}
