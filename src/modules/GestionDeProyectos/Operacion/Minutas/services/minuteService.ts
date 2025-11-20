import type {
    MinuteResponseType,
    MinuteRequestType,
    ProjectOptionResponseType,
    ParticipantResponseType,
    AgreedActionResponseType,
    AgreedActionRequestType,
    AttendeeRequestType
} from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'
import { ApiResponseType } from '@/shared/types/apiResponseType'
import axiosApiInstance from '@/api/axiosApiInstance'

export const minuteService = {
    /**
     * Get project options for the select dropdown
     * 
     * Endpoint: GET /gestion-de-proyectos/alta-de-proyecto/proyectos-opciones
     * 
     * @returns {Promise<ApiResponseType<ProjectOptionResponseType[]>>}
     * @throws {AxiosError}
     */
    async getProjectOptionsService(): Promise<ApiResponseType<ProjectOptionResponseType[]>> {
        const response = await axiosApiInstance.get('/gestion-de-proyectos/alta-de-proyecto/proyectos-opciones')
        return response.data
    },

    /**
     * Get all minutes for a specific project
     * 
     * Endpoint: GET /gestion-de-proyectos/minutas/obtener-minutas
     * 
     * @param {string} projectDni - The project DNI
     * @returns {Promise<ApiResponseType<MinuteResponseType[]>>}
     * @throws {AxiosError}
     */
    async getMinutesService(projectDni: string): Promise<ApiResponseType<MinuteResponseType[]>> {
        const response = await axiosApiInstance.get('/gestion-de-proyectos/minutas/obtener-minutas', {
            params: { dniProyecto: projectDni }
        })
        return response.data
    },

    /**
     * Create a new minute
     * 
     * Endpoint: POST /gestion-de-proyectos/minutas
     * 
     * @param {MinuteRequestType} data - The minute data
     * @returns {Promise<ApiResponseType<MinuteResponseType>>}
     * @throws {AxiosError}
     */
    async createMinuteService(data: MinuteRequestType): Promise<ApiResponseType<MinuteResponseType>> {
        const response = await axiosApiInstance.post('/gestion-de-proyectos/minutas', data)
        return response.data
    },

    /**
     * Update an existing minute
     * 
     * Endpoint: PUT /gestion-de-proyectos/minutas
     * 
     * @param {MinuteRequestType} data - The minute data with dni
     * @returns {Promise<ApiResponseType<boolean>>}
     * @throws {AxiosError}
     */
    async updateMinuteService(data: MinuteRequestType): Promise<ApiResponseType<boolean>> {
        const response = await axiosApiInstance.put('/gestion-de-proyectos/minutas', data)
        return response.data
    },

    /**
     * Delete a minute
     * 
     * Endpoint: DELETE /gestion-de-proyectos/minutas/{dni}
     * 
     * @param {string} dni - The minute DNI
     * @returns {Promise<ApiResponseType<{ totalItems: number }>>}
     * @throws {AxiosError}
     */
    async deleteMinuteService(dni: string): Promise<ApiResponseType<{ totalItems: number }>> {
        const response = await axiosApiInstance.delete(`/gestion-de-proyectos/minutas/${dni}`)
        return response.data
    },

    /**
     * Get all participants (users) for the select dropdown
     * 
     * Endpoint: GET /gestion-de-proyectos/minutas/participantes
     * 
     * @returns {Promise<ApiResponseType<ParticipantResponseType[]>>}
     * @throws {AxiosError}
     */
    async getParticipantsService(): Promise<ApiResponseType<ParticipantResponseType[]>> {
        const response = await axiosApiInstance.get('/gestion-de-proyectos/minutas/participantes')
        return response.data
    },

    /**
     * Add an attendee to a minute
     * 
     * Endpoint: POST /gestion-de-proyectos/minuta-asistente
     * 
     * @param {AttendeeRequestType} data - The attendee data
     * @returns {Promise<ApiResponseType<ParticipantResponseType>>}
     * @throws {AxiosError}
     */
    async addAttendeeService(data: AttendeeRequestType): Promise<ApiResponseType<ParticipantResponseType>> {
        const response = await axiosApiInstance.post('/gestion-de-proyectos/minuta-asistente', data)
        return response.data
    },

    /**
     * Remove an attendee from a minute
     * 
     * Endpoint: DELETE /gestion-de-proyectos/minuta-asistente
     * 
     * @param {AttendeeRequestType} data - The attendee data
     * @returns {Promise<ApiResponseType<boolean>>}
     * @throws {AxiosError}
     */
    async deleteAttendeeService(data: AttendeeRequestType): Promise<ApiResponseType<boolean>> {
        const response = await axiosApiInstance.delete('/gestion-de-proyectos/minuta-asistente', {
            data
        })
        return response.data
    },

    /**
     * Create a new agreed action
     * 
     * Endpoint: POST /gestion-de-proyectos/accion-acordada
     * 
     * @param {AgreedActionRequestType} data - The agreed action data
     * @returns {Promise<ApiResponseType<AgreedActionResponseType>>}
     * @throws {AxiosError}
     */
    async createAgreedActionService(data: AgreedActionRequestType): Promise<ApiResponseType<AgreedActionResponseType>> {
        const response = await axiosApiInstance.post('/gestion-de-proyectos/accion-acordada', data)
        return response.data
    },

    /**
     * Update an existing agreed action
     * 
     * Endpoint: PUT /gestion-de-proyectos/accion-acordada
     * 
     * @param {AgreedActionRequestType} data - The agreed action data with dni
     * @returns {Promise<ApiResponseType<boolean>>}
     * @throws {AxiosError}
     */
    async updateAgreedActionService(data: AgreedActionRequestType): Promise<ApiResponseType<boolean>> {
        const response = await axiosApiInstance.put('/gestion-de-proyectos/accion-acordada', data)
        return response.data
    },

    /**
     * Delete an agreed action
     * 
     * Endpoint: DELETE /gestion-de-proyectos/accion-acordada/{dni}
     * 
     * @param {number} dni - The agreed action DNI
     * @returns {Promise<ApiResponseType<{ totalItems: number }>>}
     * @throws {AxiosError}
     */
    async deleteAgreedActionService(dni: number): Promise<ApiResponseType<{ totalItems: number }>> {
        const response = await axiosApiInstance.delete(`/gestion-de-proyectos/accion-acordada/${dni}`)
        return response.data
    }
}
