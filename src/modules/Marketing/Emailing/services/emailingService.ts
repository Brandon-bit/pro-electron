import axiosApiInstance from '@/api/axiosApiInstance';
import type { 
  Template,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  ApiResponse,
  Lista,
  CreateListaRequest,
  Contacto,
  CreateContactoRequest,
  BulkContactosRequest,
  Campania,
  CreateCampaniaRequest,
  UpdateCampaniaRequest
} from '../types/emailingTypes';

const API_BASE = '/api/emailing';

// ============================================
// PLANTILLAS DE EMAIL
// ============================================

/**
 * Obtiene todas las plantillas de una marca
 * GET /api/emailing/plantillas?marcaId={marcaId}
 */
export const getPlantillasByMarca = async (idMarca: string): Promise<ApiResponse<{ items: Template[]; total: number }>> => {
  try {
    const response = await axiosApiInstance.get<any>(`${API_BASE}/plantillas`, {
      params: { marcaId: idMarca }
    });
    
    // El backend devuelve { success, message, data: [...] }
    // Donde data es un array directo de plantillas
    const apiResponse = response.data;
    
    // Normalizar la respuesta al formato esperado por el store
    return {
      success: apiResponse.success,
      message: apiResponse.message,
      data: {
        items: Array.isArray(apiResponse.data) ? apiResponse.data : [],
        total: Array.isArray(apiResponse.data) ? apiResponse.data.length : 0
      }
    };
  } catch (error) {
    console.error('Error fetching plantillas:', error);
    throw error;
  }
};

/**
 * Obtiene una plantilla por ID
 * GET /api/emailing/plantillas/{id}
 */
export const getPlantillaById = async (id: string): Promise<ApiResponse<Template>> => {
  try {
    const response = await axiosApiInstance.get<ApiResponse<Template>>(`${API_BASE}/plantillas/${id}`);
    // El backend devuelve { success, message, data: {...} }
    return response.data;
  } catch (error) {
    console.error(`Error fetching plantilla ${id}:`, error);
    throw error;
  }
};

/**
 * Crea una nueva plantilla
 * POST /api/emailing/plantillas
 */
export const createPlantillaService = async (data: CreateTemplateRequest): Promise<Template> => {
  try {
    const response = await axiosApiInstance.post<Template>(`${API_BASE}/plantillas`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating plantilla:', error);
    throw error;
  }
};

/**
 * Actualiza una plantilla existente
 * PUT /api/emailing/plantillas/{id}
 */
export const updatePlantillaService = async (id: string, data: UpdateTemplateRequest): Promise<Template> => {
  try {
    const response = await axiosApiInstance.put<Template>(`${API_BASE}/plantillas/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating plantilla ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina una plantilla
 * DELETE /api/emailing/plantillas/{id}
 */
export const deletePlantillaService = async (id: string): Promise<void> => {
  try {
    await axiosApiInstance.delete(`${API_BASE}/plantillas/${id}`);
  } catch (error) {
    console.error(`Error deleting plantilla ${id}:`, error);
    throw error;
  }
};

// ============================================
// LISTAS DE AUDIENCIA
// ============================================

/**
 * Obtiene todas las listas de una marca
 * GET /api/marketing/emaillistas/marca/{idMarca}
 */
export const getListasByMarca = async (idMarca: string): Promise<ApiResponse<{ items: Lista[]; total: number }>> => {
  try {
    const response = await axiosApiInstance.get<any>(`marketing/emaillistas/marca/${idMarca}`);
    
    const apiResponse = response.data;
    
    return {
      success: apiResponse.success,
      message: apiResponse.message,
      data: {
        items: Array.isArray(apiResponse.data) ? apiResponse.data : [],
        total: Array.isArray(apiResponse.data) ? apiResponse.data.length : 0
      }
    };
  } catch (error) {
    console.error('Error fetching listas:', error);
    throw error;
  }
};

/**
 * Crea una nueva lista de audiencia
 * POST /api/marketing/emaillistas/crear
 */
export const createListaService = async (data: CreateListaRequest): Promise<Lista> => {
  try {
    const response = await axiosApiInstance.post<Lista>(`marketing/emaillistas/crear`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating lista:', error);
    throw error;
  }
};

/**
 * Elimina una lista
 * DELETE /api/marketing/emaillistas/{id}
 */
export const deleteListaService = async (id: string): Promise<void> => {
  try {
    await axiosApiInstance.delete(`marketing/emaillistas/${id}`);
  } catch (error) {
    console.error(`Error deleting lista ${id}:`, error);
    throw error;
  }
};

// ============================================
// CONTACTOS
// ============================================

/**
 * Obtiene todos los contactos de una lista con paginación
 * GET /api/marketing/emaillistas/{idLista}/contactos?page={page}&pageSize={pageSize}
 */
export const getContactosByLista = async (
  idLista: string, 
  page: number = 1, 
  pageSize: number = 50
): Promise<ApiResponse<{ items: Contacto[]; total: number }>> => {
  try {
    const response = await axiosApiInstance.get<any>(
      `marketing/emaillistas/${idLista}/contactos`,
      {
        params: { page, pageSize }
      }
    );
    
    const apiResponse = response.data;
    
    // El backend devuelve { success, message, data: { items: [...], totalItems: N } }
    const items = apiResponse.data?.items || [];
    const total = apiResponse.data?.totalItems || items.length;
    
    return {
      success: apiResponse.success,
      message: apiResponse.message,
      data: {
        items: Array.isArray(items) ? items : [],
        total: total
      }
    };
  } catch (error) {
    console.error(`Error fetching contactos for lista ${idLista}:`, error);
    throw error;
  }
};

/**
 * Agrega un contacto a una lista
 * POST /api/marketing/emaillistas/{idLista}/contactos
 */
export const addContactoService = async (idLista: string, data: CreateContactoRequest): Promise<Contacto> => {
  try {
    const response = await axiosApiInstance.post<Contacto>(
      `marketing/emaillistas/${idLista}/contactos`, 
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error adding contacto to lista ${idLista}:`, error);
    throw error;
  }
};

/**
 * Importación masiva de contactos a una lista
 * POST /api/marketing/emaillistas/{idLista}/contactos/bulk
 */
export const addContactosBulkService = async (idLista: string, data: BulkContactosRequest): Promise<ApiResponse<{ insertados: number; duplicados: number }>> => {
  try {
    const response = await axiosApiInstance.post<ApiResponse<{ insertados: number; duplicados: number }>>(
      `marketing/emaillistas/${idLista}/contactos/bulk`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error bulk importing contactos to lista ${idLista}:`, error);
    throw error;
  }
};

/**
 * Elimina un contacto de una lista específica
 * DELETE /api/marketing/emaillistas/{idLista}/contactos/{idContacto}
 */
export const deleteContactoService = async (idLista: string, idContacto: string): Promise<void> => {
  try {
    await axiosApiInstance.delete(`marketing/emaillistas/${idLista}/contactos/${idContacto}`);
  } catch (error) {
    console.error(`Error deleting contacto ${idContacto} from lista ${idLista}:`, error);
    throw error;
  }
};

// ============================================
// CAMPAÑAS
// ============================================

/**
 * Obtiene todas las campañas de una marca
 * GET /api/marketing/emailcampanias/marca/{idMarca}
 */
export const getCampaniasByMarca = async (idMarca: string): Promise<ApiResponse<{ items: Campania[]; total: number }>> => {
  try {
    const response = await axiosApiInstance.get<any>(`marketing/emailcampanias/marca/${idMarca}`);
    
    const apiResponse = response.data;
    
    return {
      success: apiResponse.success,
      message: apiResponse.message,
      data: {
        items: Array.isArray(apiResponse.data) ? apiResponse.data : [],
        total: Array.isArray(apiResponse.data) ? apiResponse.data.length : 0
      }
    };
  } catch (error) {
    console.error('Error fetching campanias:', error);
    throw error;
  }
};

/**
 * Crea una nueva campaña
 * POST /api/marketing/emailcampanias/crear
 */
export const createCampaniaService = async (data: CreateCampaniaRequest): Promise<Campania> => {
  try {
    const response = await axiosApiInstance.post<Campania>(`marketing/emailcampanias/crear`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating campania:', error);
    throw error;
  }
};

/**
 * Envía una campaña inmediatamente
 * POST /api/marketing/emailcampanias/{id}/send
 */
export const enviarCampaniaNowService = async (id: string): Promise<Campania> => {
  try {
    const response = await axiosApiInstance.post<Campania>(`marketing/emailcampanias/${id}/send`);
    return response.data;
  } catch (error) {
    console.error(`Error sending campania ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina una campaña
 * DELETE /api/marketing/emailcampanias/{id}
 */
export const deleteCampaniaService = async (id: string): Promise<void> => {
  try {
    await axiosApiInstance.delete(`marketing/emailcampanias/${id}`);
  } catch (error) {
    console.error(`Error deleting campania ${id}:`, error);
    throw error;
  }
};

/**
 * Actualiza una campaña existente
 * PUT /api/marketing/emailcampanias/{id}
 */
export const updateCampaniaService = async (id: string, data: UpdateCampaniaRequest): Promise<Campania> => {
  try {
    const response = await axiosApiInstance.put<Campania>(`marketing/emailcampanias/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating campania ${id}:`, error);
    throw error;
  }
};

/**
 * Envía una campaña inmediatamente
 * POST /api/marketing/emailcampanias/{id}/enviar
 */
export const sendCampaniaService = async (id: string): Promise<Campania> => {
  try {
    const response = await axiosApiInstance.post<Campania>(`marketing/emailcampanias/${id}/enviar`);
    return response.data;
  } catch (error) {
    console.error(`Error sending campania ${id}:`, error);
    throw error;
  }
};
