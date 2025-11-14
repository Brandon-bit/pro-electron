import type { YearGroupResponseType, HolidayResponseType, HolidayRequestType} from '@/modules/DefaultModule/Configuracion/DiasInhabiles/types/holidayTypes'
import { ApiResponseType } from '@/shared/types/apiResponseType'
import axiosApiInstance from '@/api/axiosApiInstance'

export const holidayService = {
    /**
     * Get all holidays of the account from the API.
     *
     * Endpoint: GET /configuracion/dias-inhabiles
     *
     * @returns {Promise<ApiResponseType<YearGroupResponseType[]>>}
     *   Response with an array of holidays.
     *
     * @example
     * const { data } = await getHolidaysService();
     * console.log(data); 
     *
     * @throws {AxiosError} If there is a network error or if the API returns an error.
     */
    async getHolidaysService(): Promise<ApiResponseType<YearGroupResponseType[]>> {
        const response = await axiosApiInstance.get('/configuracion/dias-inhabiles')
        return response.data
    },

    /**
     * Creates a new holiday calendar for a specific year by sending the year value
     * to the corresponding API endpoint.
     *
     * Endpoint: POST /configuracion/dias-inhabiles/agregar-anio
     *
     * @param {number} year  
     *   The year for which the holiday calendar should be generated.
     *
     * @returns {Promise<ApiResponseType<YearGroupResponseType>>}
     *   A promise resolving with the API response containing the generated
     *   holiday calendar details for the specified year.
     *
     * @example
     * const response = await createYearHolidayService(2026);
     * console.log(response.data);
     *
     * @throws {AxiosError}
     *   Throws an error if the request fails or the API returns an error.
     */
    async createYearHolidayService(year: number): Promise<ApiResponseType<YearGroupResponseType>> {
        const response = await axiosApiInstance.post(
            '/configuracion/dias-inhabiles/agregar-anio',
            {}, 
            { params: { anio: year } }
        );
        return response.data
    },

    /**
     * Creates a new holiday (non-working day) by sending the provided data
     * to the API endpoint responsible for handling holiday creation.
     *
     * Endpoint: POST /configuracion/dias-inhabiles/agregar-dia
     *
     * @param {HolidayRequestType} data
     *   The payload containing the holiday information to be created.
     *
     * @returns {Promise<ApiResponseType<HolidayResponseType>>}
     *   A promise resolving with the API response containing the created holiday details.
     *
     * @example
     * const payload = {
     *      dni: 1,
     *      fecha: "2025-01-01",
     *      descripcion: "New Year's Day",
     *      activo: true,
     * };
     *
     * const response = await createHolidayService(payload);
     * console.log(response.data);
     *
     * @throws {AxiosError}
     *   Throws an error if the request fails or the API returns an error response.
     */
    async createHolidayService(data: HolidayRequestType): Promise<ApiResponseType<HolidayResponseType>> {
        const response = await axiosApiInstance.post('/configuracion/dias-inhabiles/agregar-dia', data)
        return response.data
    },

    /**
     * Deletes a holiday calendar for a specific year.  
     * Supports both logical deletion (default) and physical deletion
     * depending on the value of `borradoLogico`.
     *
     * Endpoint: DELETE /configuracion/dias-inhabiles/eliminar-anio/{anio}
     *
     * @param {number} anio  
     *   The year whose holiday calendar should be deleted.
     *
     * @param {boolean} [borradoLogico=true]  
     *   Defines the deletion behavior:
     *   - `true` (default): performs a logical (soft) delete  
     *   - `false`: performs a physical (hard) delete
     *
     * @returns {Promise<boolean>}  
     *   A promise resolving to `true` if the deletion succeeded, otherwise `false`.
     *
     * @example
     * // Logical delete
     * const success = await deleteYearHolidayService(2025);
     *
     * // Physical delete
     * const success = await deleteYearHolidayService(2025, false);
     *
     * @throws {AxiosError}
     *   Throws an error if the request fails or the API returns an error response.
     */
    async deleteYearHolidayService(anio: number, borradoLogico : boolean = true): Promise<boolean> {
        const response = await axiosApiInstance.delete(`/configuracion/dias-inhabiles/eliminar-anio/${anio}`, {
            params: { borradoLogico }
        })
        return response.data
    },

    /**
     * Deletes a holiday (non-working day) by its ID.  
     * Supports both logical deletion (default) and physical deletion
     * depending on the value of `borradoLogico`.
     *
     * Endpoint: DELETE /configuracion/dias-inhabiles/eliminar-dia/{id}
     *
     * @param {number} id  
     *   The unique identifier of the holiday to be deleted.
     *
     * @param {boolean} [borradoLogico=true]  
     *   Determines whether the deletion should be logical (soft delete) or physical (hard delete).
     *   - `true` (default): the record is marked as deleted  
     *   - `false`: the record is permanently removed
     *
     * @returns {Promise<boolean>}  
     *   A promise that resolves to `true` if the deletion was successful, otherwise `false`.
     *
     * @example
     * // Logical delete (soft delete)
     * const success = await deleteHolidayService(10);
     *
     * // Physical delete (hard delete)
     * const success = await deleteHolidayService(10, false);
     *
     * @throws {AxiosError}  
     *   Throws an error if the request fails or the API returns an error response.
     */
    async deleteHolidayService(id: number, borradoLogico : boolean = true): Promise<boolean> {
        const response = await axiosApiInstance.delete(`/configuracion/dias-inhabiles/eliminar-dia/${id}`, {
        params: { borradoLogico }
    })
    return response.data
    }
}
