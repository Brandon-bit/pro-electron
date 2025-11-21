/**
 * Servicio para consumir los endpoints del backend .NET 8
 * - Estrategia de Campañas
 * - Gestión de Proyectos (Kanban)
 */

import axiosApiInstance from '@/api/axiosApiInstance';
import type {
  Campania,
  CreateCampaniaRequest,
  UpdateCampaniaRequest,
  MetricasCampania,
  KanbanResponse,
  CreateTareaRequest,
  UpdateTareaRequest,
  Tarea,
  ApiResponse
} from '../types/estrategiaTypes';

// ========== BASE URLS ==========
const CAMPANIAS_BASE = 'marketing/campanias-estrategia';
const PROYECTOS_BASE = 'marketing/proyectos-gestion';

// ========== CAMPAÑAS ESTRATÉGICAS ==========

/**
 * Obtiene todas las campañas de una marca
 * GET /api/marketing/campanias-estrategia/marca/{idMarca}
 */
export const getCampaniasByMarca = async (marcaId: string): Promise<ApiResponse<Campania[]>> => {
  try {
    const response = await axiosApiInstance.get<any>(`${CAMPANIAS_BASE}/marca/${marcaId}`);
    
    const apiResponse = response.data;
    
    // Normalizar respuesta
    return {
      success: apiResponse.success,
      message: apiResponse.message,
      data: Array.isArray(apiResponse.data) ? apiResponse.data : []
    };
  } catch (error) {
    console.error('Error fetching campañas:', error);
    throw error;
  }
};

/**
 * Crea una nueva campaña
 * POST /api/marketing/campanias-estrategia/
 */
export const createCampania = async (data: CreateCampaniaRequest): Promise<ApiResponse<Campania>> => {
  try {
    const response = await axiosApiInstance.post<ApiResponse<Campania>>(`${CAMPANIAS_BASE}`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating campaña:', error);
    throw error;
  }
};

/**
 * Obtiene una campaña específica
 * GET /api/marketing/campanias-estrategia/{id}
 */
export const getCampaniaById = async (id: string): Promise<ApiResponse<Campania>> => {
  try {
    const response = await axiosApiInstance.get<ApiResponse<Campania>>(`${CAMPANIAS_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching campaña ${id}:`, error);
    throw error;
  }
};

/**
 * Actualiza una campaña existente
 * PUT /api/marketing/campanias-estrategia/{id}
 */
export const updateCampania = async (id: string, data: UpdateCampaniaRequest): Promise<ApiResponse<Campania>> => {
  try {
    const response = await axiosApiInstance.put<ApiResponse<Campania>>(`${CAMPANIAS_BASE}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating campaña ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina una campaña
 * DELETE /api/marketing/campanias-estrategia/{id}
 */
export const deleteCampania = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await axiosApiInstance.delete<ApiResponse<void>>(`${CAMPANIAS_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting campaña ${id}:`, error);
    throw error;
  }
};

/**
 * Obtiene las métricas de una campaña
 * GET /api/marketing/campanias-estrategia/{id}/metricas
 */
export const getMetricasCampania = async (id: string): Promise<ApiResponse<MetricasCampania>> => {
  try {
    const response = await axiosApiInstance.get<ApiResponse<MetricasCampania>>(`${CAMPANIAS_BASE}/${id}/metricas`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching métricas for campaña ${id}:`, error);
    throw error;
  }
};

// ========== PROYECTOS Y KANBAN ==========

/**
 * Obtiene todos los proyectos de una marca
 * GET /api/marketing/proyectos-gestion/marca/{idMarca}
 */
export const getProyectosByMarca = async (marcaId: string): Promise<ApiResponse<any[]>> => {
  try {
    const response = await axiosApiInstance.get<any>(`${PROYECTOS_BASE}/marca/${marcaId}`);
    
    const apiResponse = response.data;
    
    // Normalizar respuesta
    return {
      success: apiResponse.success,
      message: apiResponse.message,
      data: Array.isArray(apiResponse.data) ? apiResponse.data : []
    };
  } catch (error) {
    console.error('Error fetching proyectos:', error);
    throw error;
  }
};

/**
 * Obtiene el tablero Kanban de un proyecto
 * GET /api/marketing/proyectos-gestion/{idProyecto}/kanban
 */
export const getKanbanBoard = async (proyectoId: string): Promise<ApiResponse<KanbanResponse>> => {
  try {
    const response = await axiosApiInstance.get<ApiResponse<KanbanResponse>>(`${PROYECTOS_BASE}/${proyectoId}/kanban`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching kanban for proyecto ${proyectoId}:`, error);
    throw error;
  }
};

/**
 * Crea una nueva tarea en un proyecto
 * POST /api/marketing/proyectos-gestion/{idProyecto}/tareas
 */
export const createTarea = async (proyectoId: string, data: CreateTareaRequest): Promise<ApiResponse<Tarea>> => {
  try {
    const response = await axiosApiInstance.post<ApiResponse<Tarea>>(`${PROYECTOS_BASE}/${proyectoId}/tareas`, data);
    return response.data;
  } catch (error) {
    console.error(`Error creating tarea in proyecto ${proyectoId}:`, error);
    throw error;
  }
};

/**
 * Actualiza una tarea existente (drag & drop, cambios de estado)
 * PUT /api/marketing/proyectos-gestion/tareas/{idTarea}
 */
export const updateTarea = async (tareaId: string, data: UpdateTareaRequest): Promise<ApiResponse<Tarea>> => {
  try {
    const response = await axiosApiInstance.put<ApiResponse<Tarea>>(`${PROYECTOS_BASE}/tareas/${tareaId}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating tarea ${tareaId}:`, error);
    throw error;
  }
};

/**
 * Elimina una tarea
 * DELETE /api/marketing/proyectos-gestion/tareas/{idTarea}
 */
export const deleteTarea = async (tareaId: string): Promise<ApiResponse<void>> => {
  try {
    const response = await axiosApiInstance.delete<ApiResponse<void>>(`${PROYECTOS_BASE}/tareas/${tareaId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting tarea ${tareaId}:`, error);
    throw error;
  }
};

/**
 * Obtiene un proyecto específico
 * GET /api/marketing/proyectos-gestion/{id}
 */
export const getProyectoById = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosApiInstance.get<ApiResponse<any>>(`${PROYECTOS_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching proyecto ${id}:`, error);
    throw error;
  }
};
