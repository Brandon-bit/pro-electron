import type {
    LessonLearnedResponseType,
    LessonLearnedRequestType,
    ProjectOptionResponseType,
    CategoryOptionResponseType,
    AttendeeResponseType,
    AttendeeRequestType
} from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/types/lessonTypes'
import { ApiResponseType } from '@/shared/types/apiResponseType'
import axiosApiInstance from '@/api/axiosApiInstance'

export const lessonService = {
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
     * Get all lessons learned for a specific project
     * 
     * Endpoint: GET /gestion-de-proyectos/lecciones-aprendidas/obtener-lecciones-aprendidas
     * 
     * @param {string} projectDni - The project DNI
     * @returns {Promise<ApiResponseType<LessonLearnedResponseType[]>>}
     * @throws {AxiosError}
     */
    async getLessonsService(projectDni: string): Promise<ApiResponseType<LessonLearnedResponseType[]>> {
        const response = await axiosApiInstance.get('/gestion-de-proyectos/lecciones-aprendidas/obtener-lecciones-aprendidas', {
            params: { dniProyecto: projectDni }
        })
        return response.data
    },

    /**
     * Get category options for the select dropdown
     * 
     * Endpoint: GET /gestion-de-proyectos/leccion-aprendida-categoria/opciones
     * 
     * @returns {Promise<ApiResponseType<CategoryOptionResponseType[]>>}
     * @throws {AxiosError}
     */
    async getCategoryOptionsService(): Promise<ApiResponseType<CategoryOptionResponseType[]>> {
        const response = await axiosApiInstance.get('/gestion-de-proyectos/leccion-aprendida-categoria/opciones')
        return response.data
    },

    /**
     * Create a new lesson learned
     * 
     * Endpoint: POST /gestion-de-proyectos/lecciones-aprendidas
     * 
     * @param {LessonLearnedRequestType} data - The lesson learned data
     * @returns {Promise<ApiResponseType<LessonLearnedResponseType>>}
     * @throws {AxiosError}
     */
    async createLessonService(data: LessonLearnedRequestType): Promise<ApiResponseType<LessonLearnedResponseType>> {
        const response = await axiosApiInstance.post('/gestion-de-proyectos/lecciones-aprendidas', data)
        return response.data
    },

    /**
     * Update an existing lesson learned
     * 
     * Endpoint: PUT /gestion-de-proyectos/lecciones-aprendidas
     * 
     * @param {LessonLearnedRequestType} data - The lesson learned data with dni
     * @returns {Promise<ApiResponseType<boolean>>}
     * @throws {AxiosError}
     */
    async updateLessonService(data: LessonLearnedRequestType): Promise<ApiResponseType<boolean>> {
        const response = await axiosApiInstance.put('/gestion-de-proyectos/lecciones-aprendidas', data)
        return response.data
    },

    /**
     * Delete a lesson learned
     * 
     * Endpoint: DELETE /gestion-de-proyectos/lecciones-aprendidas/{dni}
     * 
     * @param {string} dni - The lesson learned DNI
     * @returns {Promise<ApiResponseType<{ totalItems: number }>>}
     * @throws {AxiosError}
     */
    async deleteLessonService(dni: string): Promise<ApiResponseType<{ totalItems: number }>> {
        const response = await axiosApiInstance.delete(`/gestion-de-proyectos/lecciones-aprendidas/${dni}`)
        return response.data
    },

    /**
     * Get all participants (users) for the select dropdown
     * 
     * Endpoint: GET /gestion-de-proyectos/minutas/participantes
     * 
     * @returns {Promise<ApiResponseType<AttendeeResponseType[]>>}
     * @throws {AxiosError}
     */
    async getParticipantsService(): Promise<ApiResponseType<AttendeeResponseType[]>> {
        const response = await axiosApiInstance.get('/gestion-de-proyectos/minutas/participantes')
        return response.data
    },

    /**
     * Add an attendee to a lesson learned
     * 
     * Endpoint: POST /gestion-de-proyectos/leccion-aprendida-asistente
     * 
     * @param {AttendeeRequestType} data - The attendee data
     * @returns {Promise<ApiResponseType<AttendeeResponseType>>}
     * @throws {AxiosError}
     */
    async addAttendeeService(data: AttendeeRequestType): Promise<ApiResponseType<AttendeeResponseType>> {
        const response = await axiosApiInstance.post('/gestion-de-proyectos/leccion-aprendida-asistente', data)
        return response.data
    },

    /**
     * Remove an attendee from a lesson learned
     * 
     * Endpoint: DELETE /gestion-de-proyectos/leccion-aprendida-asistente
     * 
     * @param {AttendeeRequestType} data - The attendee data
     * @returns {Promise<ApiResponseType<boolean>>}
     * @throws {AxiosError}
     */
    async deleteAttendeeService(data: AttendeeRequestType): Promise<ApiResponseType<boolean>> {
        const response = await axiosApiInstance.delete('/gestion-de-proyectos/leccion-aprendida-asistente', {
            data
        })
        return response.data
    }
}
