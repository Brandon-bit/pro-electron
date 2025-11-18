import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type {
    EDTResponseType,
    InitiativeOptionType,
    StageResponseType,
    StageRequestType,
    ActivityResponseType,
    ActivityRequestType,
    SubActivityResponseType,
    SubActivityRequestType
} from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/types/edtTypes'

export const edtService = {
    // ============================================
    // INITIATIVES
    // ============================================
    
    /**
     * Get all available iniciativas (projects in prioritization)
     * 
     * Endpoint: GET /gestion-de-proyectos/edt/iniciativas-opciones
     */
    async getInitiativesOptionsService(): Promise<ApiResponseType<InitiativeOptionType[]>> {
        const response = await axiosApiInstance.get('/gestion-de-proyectos/edt/iniciativas-opciones')
        return response.data
    },

    /**
     * Get complete EDT structure for a specific iniciativa
     * 
     * Endpoint: GET /gestion-de-proyectos/edt/{dniIniciativa}
     */
    async getEDTService(dniIniciativa: number): Promise<ApiResponseType<EDTResponseType>> {
        const response = await axiosApiInstance.get(`/gestion-de-proyectos/edt/${dniIniciativa}`)
        return response.data
    },

    // ============================================
    // STAGES
    // ============================================

    /**
     * Create a new stage (etapa)
     * 
     * Endpoint: POST /gestion-de-proyectos/edt/agregar-etapa
     */
    async addStageService(data: StageRequestType): Promise<ApiResponseType<StageResponseType>> {
        const response = await axiosApiInstance.post('/gestion-de-proyectos/edt/agregar-etapa', data)
        return response.data
    },

    /**
     * Update an existing stage (etapa)
     * 
     * Endpoint: PUT /gestion-de-proyectos/edt/actualizar-etapa
     */
    async putStageService(data: StageRequestType): Promise<ApiResponseType<boolean>> {
        const response = await axiosApiInstance.put('/gestion-de-proyectos/edt/actualizar-etapa', data)
        return response.data
    },

    /**
     * Delete a stage (etapa)
     * 
     * Endpoint: DELETE /gestion-de-proyectos/edt/eliminar-etapa/{dni}
     */
    async deleteStageService(dni: number): Promise<ApiResponseType<{ totalItems: number }>> {
        const response = await axiosApiInstance.delete(`/gestion-de-proyectos/edt/eliminar-etapa/${dni}`)
        return response.data
    },

    // ============================================
    // ACTIVITIES
    // ============================================

    /**
     * Create a new activity (actividad)
     * 
     * Endpoint: POST /gestion-de-proyectos/edt/agregar-actividad
     */
    async addActivityService(data: ActivityRequestType): Promise<ApiResponseType<ActivityResponseType>> {
        const response = await axiosApiInstance.post('/gestion-de-proyectos/edt/agregar-actividad', data)
        return response.data
    },

    /**
     * Update an existing activity (actividad)
     * 
     * Endpoint: PUT /gestion-de-proyectos/edt/actualizar-actividad
     */
    async putActivityService(data: ActivityRequestType): Promise<ApiResponseType<boolean>> {
        const response = await axiosApiInstance.put('/gestion-de-proyectos/edt/actualizar-actividad', data)
        return response.data
    },

    /**
     * Delete an activity (actividad)
     * 
     * Endpoint: DELETE /gestion-de-proyectos/edt/eliminar-actividad/{dni}
     */
    async deleteActivityService(dni: number): Promise<ApiResponseType<{ totalItems: number }>> {
        const response = await axiosApiInstance.delete(`/gestion-de-proyectos/edt/eliminar-actividad/${dni}`)
        return response.data
    },

    // ============================================
    // SUB-ACTIVITIES
    // ============================================

    /**
     * Create a new sub-activity (sub-actividad)
     * 
     * Endpoint: POST /gestion-de-proyectos/edt/agregar-sub-actividad
     */
    async addSubActivityService(data: SubActivityRequestType): Promise<ApiResponseType<SubActivityResponseType>> {
        const response = await axiosApiInstance.post('/gestion-de-proyectos/edt/agregar-sub-actividad', data)
        return response.data
    },

    /**
     * Update an existing sub-activity (sub-actividad)
     * 
     * Endpoint: PUT /gestion-de-proyectos/edt/actualizar-sub-actividad
     */
    async putSubActivityService(data: SubActivityRequestType): Promise<ApiResponseType<boolean>> {
        const response = await axiosApiInstance.put('/gestion-de-proyectos/edt/actualizar-sub-actividad', data)
        return response.data
    },

    /**
     * Delete a sub-activity (sub-actividad)
     * 
     * Endpoint: DELETE /gestion-de-proyectos/edt/eliminar-sub-actividad/{dni}
     */
    async deleteSubActivityService(dni: number): Promise<ApiResponseType<{ totalItems: number }>> {
        const response = await axiosApiInstance.delete(`/gestion-de-proyectos/edt/eliminar-sub-actividad/${dni}`)
        return response.data
    }
}
