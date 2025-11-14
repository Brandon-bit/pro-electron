import { holidayService } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/services/holidayService'
import { showNotification } from '@/utils/toastNotifications'
import type { HolidayFormType, YearGroupType, HolidayType } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/types/holidayTypes'
import { mapYearGroup, mapHolidayRequest, mapHoliday } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/composables/mappingHolidayData'
import useHolidayStore from '@/modules/DefaultModule/Configuracion/DiasInhabiles/store/holidayStore'

export const useHolidayActions = () => {
    const holidayStore = useHolidayStore()
    
    /**
     * Retrieves the list of holidays from the API and maps the response
     * to the application's internal `YearGroupType` structure.
     *
     * The function calls `getHolidaysService`, applies the `mapYearGroup` mapper
     * to each returned year, and handles any potential errors.
     *
     * @async
     * @returns {Promise<YearGroupType[]>} A promise resolving to a list of year groups,
     * each containing its corresponding holidays. Returns an empty array if an error occurs.
     *
     * @throws This function does not throw; instead, it displays a notification
     * and returns an empty array in case of failure.
     */
    const getHolidays = async () => {
        try {
            holidayStore.isLoading = true
            const holidays = await holidayService.getHolidaysService()
            holidayStore.yearHolidays = holidays.data.map(mapYearGroup)
        } catch (error) {
            console.log(error)
            showNotification('Error al cargar los días inhábiles', 'error')
        } finally {
            holidayStore.isLoading = false
        }
    }

    /**
     * Creates a new holiday year entry and returns the mapped result.
     *
     * This function sends a request to the API to create a new year in the
     * holiday calendar. If the operation is successful, the API response is
     * mapped to the application's `YearGroupType` format and returned along
     * with a status indicator and message. In case of an error, an error
     * notification is displayed and a failure response is returned.
     *
     * @async
     * @param {number} year
     *   The year to be created in the holiday calendar.
     *
     * @returns {Promise<{ message: string, status: string, data: YearGroupType | null }>}
     *   An object containing:
     *   - `message`: The API message or an error message.
     *   - `status`: `"success"` if the operation was successful, otherwise `"error"`.
     *   - `data`: The mapped year group data when successful, or `null` on failure.
     *
     * @example
     * const result = await createYearHoliday(2026);
     * if (result.status === "success") {
     *     console.log("Created year:", result.data);
     * }
     *
     * @throws This function does not throw; instead, it returns an error response
     *   and displays a notification if the request fails.
     */
    const createYearHoliday = async (year: number): Promise<{ message : string, status : string , data : YearGroupType | null }> => {
        try {
            const response = await holidayService.createYearHolidayService(year)
            showNotification('Año agregado exitosamente', 'success')
            holidayStore.yearHolidays.push(mapYearGroup(response.data))
            return {
                message: response.message,
                status: response.success ? "success" : "error",
                data: mapYearGroup(response.data)
            }
        } catch (error) {
            showNotification('Error al crear el año', 'error')
            return {
                message: "Error al crear el año",
                status: "error",
                data: null
            }
        }
    }

    /**
     * Creates a new holiday by sending the mapped form data to the API.
     *
     * This function calls `createHolidayService`, shows a success notification
     * when the operation completes successfully, and formats the response into a
     * consistent structure for the application. If the request fails, it displays
     * an error notification and returns a fallback error result.
     *
     * @async
     * @param {HolidayFormType} data
     *   The raw form data entered by the user. This data is mapped before
     *   being sent to the API.
     *
     * @returns {Promise<{ message: string; status: string; data: HolidayResponseType | null }>}
     *   An object indicating whether the operation succeeded, a message describing
     *   the result, and the created holiday data if successful.
     *
     * @example
     * const result = await createHoliday(formValues);
     * if (result.status === "success") {
     *     console.log("New holiday:", result.data);
     * }
     *
     * @throws This function does not throw; instead, it returns a formatted error object
     *   and shows a notification if the request fails.
     */
    const createHoliday = async (data: HolidayFormType): Promise<{ message : string, status : string , data : HolidayType | null }> => {
        try {
            const response = await holidayService.createHolidayService(mapHolidayRequest(data))
            showNotification('Día inhábil agregado exitosamente', 'success')
            holidayStore.yearHolidays.find(year => year.year === holidayStore.selectedYear)?.holidays.push(mapHoliday(response.data))
            return {
                message: response.message,
                status: response.success ? "success" : "error",
                data: mapHoliday(response.data) 
            }
        } catch (error) {
            showNotification('Error al agregar el día inhábil', 'error')
            return {
                message: "Error al agregar el día inhábil",
                status: "error",
                data: null
            }
        }
    }

    /**
     * Deletes a holiday by its identifier.
     *
     * This function calls the API service responsible for deleting a holiday,
     * optionally performing a logical delete instead of a physical one.
     * If the operation succeeds, a success notification is shown and the function
     * returns `true`. If an error occurs, an error notification is displayed
     * and the function returns `false`.
     *
     * @async
     * @param {number} id
     *   The unique identifier of the holiday to delete.
     *
     * @param {boolean} [borradoLogico=true]
     *   Indicates whether the deletion should be logical (soft delete).
     *   Defaults to `true`.
     *
     * @returns {Promise<boolean>}
     *   `true` if the holiday was deleted successfully, otherwise `false`.
     *
     * @example
     * const success = await deleteHoliday(12);
     * if (success) {
     *     console.log("Holiday removed.");
     * }
     *
     * @throws This function does not throw; instead, it returns `false`
     *   and displays a notification if the request fails.
     */
    const deleteHoliday = async (): Promise<boolean> => {
        try {
            const holiday = holidayStore.selectedHoliday
            if (!holiday) return false

            const deletedId = holiday.id

            await holidayService.deleteHolidayService(deletedId, true)
            showNotification('Día inhábil eliminado exitosamente', 'success')

            const yearGroup = holidayStore.yearHolidays.find(y => y.year === holidayStore.selectedYear)
            if (yearGroup) {
                yearGroup.holidays = yearGroup.holidays.filter(h => h.id !== deletedId)
            }

            return true
        } catch (error) {
            showNotification('Error al eliminar el día inhábil', 'error')
            return false
        }
    }

    /**
     * Deletes a holiday year from the system.
     *
     * This function calls the API to delete a specific year from the holiday calendar.
     * The deletion can be logical or physical depending on the `borradoLogico` flag.
     * If the operation is successful, a success notification is displayed and the
     * function returns `true`. If an error occurs, an error notification is displayed
     * and the function returns `false`.
     *
     * @async
     * @param {number} anio
     *   The year to be deleted from the holiday calendar.
     *
     * @param {boolean} [borradoLogico=true]
     *   When `true`, performs a logical (soft) delete. When `false`, performs a physical delete.
     *
     * @returns {Promise<boolean>}
     *   Returns `true` if the delete operation was successful, otherwise `false`.
     *
     * @example
     * const success = await deleteYearHoliday(2025);
     * if (success) {
     *     console.log("Year deleted.");
     * }
     *
     * @throws This function does not throw; instead it returns `false` and
     *   displays an error notification if the request fails.
     */
    const deleteYearHoliday = async (anio: number, borradoLogico : boolean = true): Promise<boolean> => {
        try {
            await holidayService.deleteYearHolidayService(anio, borradoLogico)
            showNotification('Año eliminado exitosamente', 'success')
            return true
        } catch (error) {
            showNotification('Error al eliminar el año', 'error')
            return false
        }
    }

    return {
        getHolidays,
        createHoliday,
        deleteHoliday,
        createYearHoliday,
        deleteYearHoliday
    }
}
