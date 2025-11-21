import axios from 'axios';
import axiosApiInstance from '@/api/axiosApiInstance';
import type { 
  Survey, 
  Template, 
  Execution, 
  PublicResponse,
  CreateSurveyRequest,
  CreateTemplateRequest,
  CreateExecutionRequest,
  UpdateExecutionRequest,
  SurveyStatistics,
  ApiResponse,
  PaginatedResponse,
  PublicUrlResponse,
  SurveyResponsesData,
  PublicSurveyData
} from '../types/benchmarkingTypes';

const API_BASE = '/api/benchmarking';

// Crear instancia de axios para rutas públicas (sin interceptores de auth)
const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7108',
  headers: {
    'Content-Type': 'application/json'
  }
});

// ============================================
// TEMPLATES (Plantillas)
// ============================================

/**
 * Obtiene todas las plantillas de una marca
 * GET /api/benchmarking/templates?brandId={brandId}
 */ 
export const getTemplatesByAccountService = async (brandId: string): Promise<ApiResponse<{ items: Template[]; total: number }>> => {
  try {
    const response = await axiosApiInstance.get<ApiResponse<{ items: Template[]; total: number }>>(`${API_BASE}/templates`, {
      params: { brandId }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
};

/**
 * Obtiene una plantilla por ID
 * GET /api/benchmarking/templates/{id}
 */
export const getTemplateByIdService = async (id: string): Promise<Template> => {
  try {
    const response = await axiosApiInstance.get<Template>(`${API_BASE}/templates/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching template ${id}:`, error);
    throw error;
  }
};

/**
 * Crea una nueva plantilla
 * POST /api/benchmarking/templates
 */
export const createTemplateService = async (data: CreateTemplateRequest): Promise<Template> => {
  try {
    const response = await axiosApiInstance.post<Template>(`${API_BASE}/templates`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating template:", error);
    throw error;
  }
};

/**
 * Actualiza una plantilla existente
 * PUT /api/benchmarking/templates/{id}
 */
export const updateTemplateService = async (id: string, data: Partial<Template>): Promise<Template> => {
  try {
    const response = await axiosApiInstance.put<Template>(`${API_BASE}/templates/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating template ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina una plantilla
 * DELETE /api/benchmarking/templates/{id}
 */
export const deleteTemplateService = async (id: string): Promise<void> => {
  try {
    await axiosApiInstance.delete(`${API_BASE}/templates/${id}`);
  } catch (error) {
    console.error(`Error deleting template ${id}:`, error);
    throw error;
  }
};

/**
 * Obtiene plantillas públicas (básicas)
 * GET /api/benchmarking/templates/public
 */
export const getPublicTemplatesService = async (): Promise<Template[]> => {
  try {
    const response = await axiosApiInstance.get<Template[]>(`${API_BASE}/templates/public`);
    return response.data;
  } catch (error) {
    console.error("Error fetching public templates:", error);
    throw error;
  }
};

// ============================================
// SURVEYS (Encuestas/Estudios)
// ============================================

/**
 * Obtiene todas las encuestas de una marca
 * GET /api/benchmarking/surveys?brandId={brandId}
 */
export const getSurveysByAccountService = async (brandId: string): Promise<ApiResponse<{ items: Survey[]; total: number }>> => {
  try {
    const response = await axiosApiInstance.get<ApiResponse<{ items: Survey[]; total: number }>>(`${API_BASE}/surveys`, {
      params: { brandId }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching surveys:", error);
    throw error;
  }
};

/**
 * Obtiene una encuesta por ID
 * GET /api/benchmarking/surveys/{id}
 */
export const getSurveyByIdService = async (id: string): Promise<Survey> => {
  try {
    const response = await axiosApiInstance.get<Survey>(`${API_BASE}/surveys/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching survey ${id}:`, error);
    throw error;
  }
};

/**
 * Crea una nueva encuesta
 * POST /api/benchmarking/surveys
 */
export const createSurveyService = async (data: CreateSurveyRequest): Promise<Survey> => {
  try {
    const response = await axiosApiInstance.post<Survey>(`${API_BASE}/surveys`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating survey:", error);
    throw error;
  }
};

/**
 * Actualiza una encuesta existente
 * PUT /api/benchmarking/surveys/{id}
 */
export const updateSurveyService = async (id: string, data: Partial<Survey>): Promise<Survey> => {
  try {
    const response = await axiosApiInstance.put<Survey>(`${API_BASE}/surveys/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating survey ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina una encuesta
 * DELETE /api/benchmarking/surveys/{id}
 */
export const deleteSurveyService = async (id: string): Promise<void> => {
  try {
    await axiosApiInstance.delete(`${API_BASE}/surveys/${id}`);
  } catch (error) {
    console.error(`Error deleting survey ${id}:`, error);
    throw error;
  }
};

/**
 * Cambia el estado de una encuesta
 * PATCH /api/benchmarking/surveys/{id}/status
 */
export const changeSurveyStatusService = async (id: string, status: string): Promise<Survey> => {
  try {
    const response = await axiosApiInstance.patch<Survey>(`${API_BASE}/surveys/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error changing survey status ${id}:`, error);
    throw error;
  }
};

/**
 * Genera URL pública para una encuesta
 * POST /api/benchmarking/surveys/{id}/generate-public-url
 */
export const generatePublicUrlService = async (id: string): Promise<PublicUrlResponse> => {
  try {
    const response = await axiosApiInstance.post<ApiResponse<PublicUrlResponse>>(`${API_BASE}/surveys/${id}/generate-public-url`);
    return response.data.data!;
  } catch (error) {
    console.error(`Error generating public URL for survey ${id}:`, error);
    throw error;
  }
};

/**
 * Obtiene todas las respuestas de una encuesta (ejecuciones + públicas)
 * GET /api/benchmarking/surveys/{id}/responses
 */
export const getSurveyAllResponsesService = async (surveyId: string): Promise<SurveyResponsesData> => {
  try {
    const response = await axiosApiInstance.get<ApiResponse<SurveyResponsesData>>(`${API_BASE}/surveys/${surveyId}/responses`);
    return response.data.data!;
  } catch (error) {
    console.error(`Error fetching all responses for survey ${surveyId}:`, error);
    throw error;
  }
};

// ============================================
// EXECUTIONS (Ejecuciones/Asignaciones)
// ============================================

/**
 * Obtiene ejecuciones de una encuesta con paginación
 * GET /api/benchmarking/executions?surveyId={surveyId}&page={page}&pageSize={pageSize}
 */
export const getExecutionsBySurveyService = async (
  surveyId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ items: Execution[]; total: number }> => {
  try {
    const response = await axiosApiInstance.get<ApiResponse<{ items: Execution[]; total: number }>>(
      `${API_BASE}/executions`,
      {
        params: { surveyId, page, pageSize }
      }
    );
    return response.data.data || { items: [], total: 0 };
  } catch (error) {
    console.error(`Error fetching executions for survey ${surveyId}:`, error);
    throw error;
  }
};

/**
 * Obtiene una ejecución por ID
 * GET /api/benchmarking/executions/{id}
 */
export const getExecutionByIdService = async (id: string): Promise<Execution> => {
  try {
    const response = await axiosApiInstance.get<Execution>(`${API_BASE}/executions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching execution ${id}:`, error);
    throw error;
  }
};

/**
 * Crea una nueva ejecución (asignación)
 * POST /api/benchmarking/executions
 */
export const createExecutionService = async (data: CreateExecutionRequest): Promise<Execution> => {
  try {
    const response = await axiosApiInstance.post<Execution>(`${API_BASE}/executions`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating execution:", error);
    throw error;
  }
};

/**
 * Actualiza una ejecución
 * PUT /api/benchmarking/executions/{id}
 */
export const updateExecutionService = async (id: string, data: UpdateExecutionRequest): Promise<Execution> => {
  try {
    const response = await axiosApiInstance.put<Execution>(`${API_BASE}/executions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating execution ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina una ejecución
 * DELETE /api/benchmarking/executions/{id}
 */
export const deleteExecutionService = async (id: string): Promise<void> => {
  try {
    await axiosApiInstance.delete(`${API_BASE}/executions/${id}`);
  } catch (error) {
    console.error(`Error deleting execution ${id}:`, error);
    throw error;
  }
};

/**
 * Completa una ejecución con respuestas
 * POST /api/benchmarking/executions/{id}/complete
 */
export const completeExecutionService = async (
  id: string, 
  responses: Record<string, any>
): Promise<Execution> => {
  try {
    const response = await axiosApiInstance.post<Execution>(`${API_BASE}/executions/${id}/complete`, { responses });
    return response.data;
  } catch (error) {
    console.error(`Error completing execution ${id}:`, error);
    throw error;
  }
};

// ============================================
// PUBLIC RESPONSES (Respuestas Públicas)
// ============================================

/**
 * Obtiene una encuesta pública por token/URL (SIN AUTENTICACIÓN)
 * GET /api/benchmarking/public/survey/{token}
 */
export const getPublicSurveyService = async (token: string): Promise<PublicSurveyData> => {
  try {
    // Usar publicAxios que apunta al backend sin interceptores de auth
    const response = await publicAxios.get<ApiResponse<PublicSurveyData>>(`${API_BASE}/public/survey/${token}`);
    return response.data.data!;
  } catch (error) {
    console.error(`Error fetching public survey ${token}:`, error);
    throw error;
  }
};

/**
 * Envía una respuesta pública
 * POST /api/benchmarking/public/survey/{token}/submit
 */
export const submitPublicResponseService = async (
  token: string,
  responses: Record<string, any>
): Promise<PublicResponse> => {
  try {
    // Usar publicAxios que apunta al backend sin interceptores de auth
    const response = await publicAxios.post<PublicResponse>(
      `${API_BASE}/public/survey/${token}/submit`,
      { responses }
    );
    return response.data;
  } catch (error) {
    console.error(`Error submitting public response for ${token}:`, error);
    throw error;
  }
};

// ============================================
// RESULTS & STATISTICS (Resultados y Estadísticas)
// ============================================

/**
 * Obtiene todas las respuestas de una encuesta
 * GET /api/benchmarking/surveys/{id}/responses
 */
export const getSurveyResponsesService = async (surveyId: string): Promise<Execution[] | PublicResponse[]> => {
  try {
    // 1. Esperar el tipo de respuesta correcto (ApiResponse que contiene 'items')
    const response = await axiosApiInstance.get<ApiResponse<{ items: (Execution[] | PublicResponse[]) }>>(`${API_BASE}/surveys/${surveyId}/responses`);
    
    // 2. Devolver solo el array 'data.items'
    if (response.data && response.data.success && Array.isArray(response.data.data.items)) {
      return response.data.data.items;
    }
    
    // 3. Devolver un array vacío si la respuesta no es válida
    return [];
  } catch (error) {
    console.error(`Error fetching responses for survey ${surveyId}:`, error);
    throw error;
  }
};

/**
 * Obtiene estadísticas de una marca
 * GET /api/benchmarking/statistics?brandId={brandId}
 */
export const getAccountStatisticsService = async (brandId: string): Promise<SurveyStatistics> => {
  try {
    const response = await axiosApiInstance.get<SurveyStatistics>(`${API_BASE}/statistics`, {
      params: { brandId }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};

/**
 * Exporta resultados de una encuesta a Excel/CSV
 * GET /api/benchmarking/surveys/{id}/export?format={format}
 */
export const exportSurveyResultsService = async (
  surveyId: string,
  format: 'excel' | 'csv' = 'excel'
): Promise<Blob> => {
  try {
    const response = await axiosApiInstance.get(`${API_BASE}/surveys/${surveyId}/export`, {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error(`Error exporting survey ${surveyId}:`, error);
    throw error;
  }
};
