import { holidayService } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/services/holidayService'
import { showNotification } from '@/utils/toastNotifications'
import type { HolidayFormType } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/types/holidayTypes'

export const useHolidayActions = () => {
    
    /**
     * Obtiene todos los días inhábiles
     */
    const getHolidays = async () => {
        try {
            const holidays = await holidayService.getHolidays()
            return holidays
        } catch (error) {
            showNotification('Error al cargar los días inhábiles', 'error')
            throw error
        }
    }

    /**
     * Crea un nuevo día inhábil
     */
    const handleCreateHoliday = async (data: HolidayFormType): Promise<boolean> => {
        try {
            await holidayService.createHoliday(data)
            showNotification('Día inhábil agregado exitosamente', 'success')
            return true
        } catch (error) {
            showNotification('Error al agregar el día inhábil', 'error')
            return false
        }
    }

    /**
     * Elimina un día inhábil
     */
    const handleDeleteHoliday = async (id: string): Promise<boolean> => {
        try {
            await holidayService.deleteHoliday(id)
            showNotification('Día inhábil eliminado exitosamente', 'success')
            return true
        } catch (error) {
            showNotification('Error al eliminar el día inhábil', 'error')
            return false
        }
    }

    return {
        getHolidays,
        handleCreateHoliday,
        handleDeleteHoliday
    }
}
