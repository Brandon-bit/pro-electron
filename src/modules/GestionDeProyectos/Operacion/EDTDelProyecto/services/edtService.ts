import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type {
    EDTResponseType,
    IniciativaOpcionType,
    EtapaResponseType,
    EtapaRequestType,
    ActividadResponseType,
    ActividadRequestType,
    SubActividadResponseType,
    SubActividadRequestType
} from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/types/edtTypes'

export const edtService = {
    // ============================================
    // INICIATIVAS
    // ============================================
    
    /**
     * Get all available iniciativas (projects in prioritization)
     * 
     * Endpoint: GET /gestion-de-proyectos/edt/iniciativas-opciones
     */
    async getIniciativasOpciones(): Promise<ApiResponseType<IniciativaOpcionType[]>> {
        const response = await axiosApiInstance.get('/gestion-de-proyectos/edt/iniciativas-opciones')
        return response.data
    },

    /**
     * Get complete EDT structure for a specific iniciativa
     * 
     * Endpoint: GET /gestion-de-proyectos/edt/{dniIniciativa}
     */
    async getEDT(dniIniciativa: number): Promise<ApiResponseType<EDTResponseType>> {
        const response = await axiosApiInstance.get(`/gestion-de-proyectos/edt/${dniIniciativa}`)
        return response.data
    },

    // ============================================
    // ETAPAS
    // ============================================

    /**
     * Create a new stage (etapa)
     * 
     * Endpoint: POST /gestion-de-proyectos/edt/agregar-etapa
     */
    async agregarEtapa(data: EtapaRequestType): Promise<ApiResponseType<EtapaResponseType>> {
        const response = await axiosApiInstance.post('/gestion-de-proyectos/edt/agregar-etapa', data)
        return response.data
    },

    /**
     * Update an existing stage (etapa)
     * 
     * Endpoint: PUT /gestion-de-proyectos/edt/actualizar-etapa
     */
    async actualizarEtapa(data: EtapaRequestType): Promise<ApiResponseType<boolean>> {
        const response = await axiosApiInstance.put('/gestion-de-proyectos/edt/actualizar-etapa', data)
        return response.data
    },

    /**
     * Delete a stage (etapa)
     * 
     * Endpoint: DELETE /gestion-de-proyectos/edt/eliminar-etapa/{dni}
     */
    async eliminarEtapa(dni: number): Promise<ApiResponseType<{ totalItems: number }>> {
        const response = await axiosApiInstance.delete(`/gestion-de-proyectos/edt/eliminar-etapa/${dni}`)
        return response.data
    },

    // ============================================
    // ACTIVIDADES
    // ============================================

    /**
     * Create a new activity (actividad)
     * 
     * Endpoint: POST /gestion-de-proyectos/edt/agregar-actividad
     */
    async agregarActividad(data: ActividadRequestType): Promise<ApiResponseType<ActividadResponseType>> {
        const response = await axiosApiInstance.post('/gestion-de-proyectos/edt/agregar-actividad', data)
        return response.data
    },

    /**
     * Update an existing activity (actividad)
     * 
     * Endpoint: PUT /gestion-de-proyectos/edt/actualizar-actividad
     */
    async actualizarActividad(data: ActividadRequestType): Promise<ApiResponseType<boolean>> {
        const response = await axiosApiInstance.put('/gestion-de-proyectos/edt/actualizar-actividad', data)
        return response.data
    },

    /**
     * Delete an activity (actividad)
     * 
     * Endpoint: DELETE /gestion-de-proyectos/edt/eliminar-actividad/{dni}
     */
    async eliminarActividad(dni: number): Promise<ApiResponseType<{ totalItems: number }>> {
        const response = await axiosApiInstance.delete(`/gestion-de-proyectos/edt/eliminar-actividad/${dni}`)
        return response.data
    },

    // ============================================
    // SUB-ACTIVIDADES
    // ============================================

    /**
     * Create a new sub-activity (sub-actividad)
     * 
     * Endpoint: POST /gestion-de-proyectos/edt/agregar-sub-actividad
     */
    async agregarSubActividad(data: SubActividadRequestType): Promise<ApiResponseType<SubActividadResponseType>> {
        const response = await axiosApiInstance.post('/gestion-de-proyectos/edt/agregar-sub-actividad', data)
        return response.data
    },

    /**
     * Update an existing sub-activity (sub-actividad)
     * 
     * Endpoint: PUT /gestion-de-proyectos/edt/actualizar-sub-actividad
     */
    async actualizarSubActividad(data: SubActividadRequestType): Promise<ApiResponseType<boolean>> {
        const response = await axiosApiInstance.put('/gestion-de-proyectos/edt/actualizar-sub-actividad', data)
        return response.data
    },

    /**
     * Delete a sub-activity (sub-actividad)
     * 
     * Endpoint: DELETE /gestion-de-proyectos/edt/eliminar-sub-actividad/{dni}
     */
    async eliminarSubActividad(dni: number): Promise<ApiResponseType<{ totalItems: number }>> {
        const response = await axiosApiInstance.delete(`/gestion-de-proyectos/edt/eliminar-sub-actividad/${dni}`)
        return response.data
    }
}
