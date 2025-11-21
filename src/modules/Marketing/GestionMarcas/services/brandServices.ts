// src/modules/Marketing/GestionMarcas/services/brandServices.ts

import axiosApiInstance from '@/api/axiosApiInstance'; // Asegúrate de usar tu instancia de Axios para el backend
import type { Brand, SocialAccount } from '../types/brandTypes';

// Reutiliza tu interfaz genérica para las respuestas
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
interface ApiBrandData {
  items: Brand[]; // El backend devuelve una lista de marcas
  // Podrías tener 'totalItems', 'page', etc. si tu API los devuelve
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
/**
 * Obtiene las marcas del usuario autenticado.
 * El backend obtiene el ID de cuenta desde los claims del token JWT.
 */
export const getBrandsByAccountService = async (): Promise<ApiResponse<ApiBrandData | null>> => {
  try {
    // Llama al endpoint sin parámetros, el backend obtiene la cuenta del token
    const response = await axiosApiInstance.get<ApiResponse<ApiBrandData>>(
      `marketing/marcas`
    );
    
    // Devuelve la respuesta completa del backend
    return response.data; 

  } catch (error) {
    console.error("Error al obtener las marcas por cuenta:", error);
    return { 
      success: false, 
      message: 'No se pudieron cargar las marcas.', 
      data: null 
    };
  }
};

/**
 * Crea una nueva marca.
 * Llama al endpoint del backend que a su vez crea el perfil en Ayrshare.
 * @param brandData - Los datos para la nueva marca.
 * @returns Una promesa con la marca recién creada.
 */
interface BackendCreateResponse {
  mktMarcas: Brand;
  totalItems: number;
}
 export const createBrandService = async (
  formData: FormData
): Promise<ApiResponse<BackendCreateResponse | null>> => {
  try {
    // 1. Pide a Axios el tipo de respuesta CORRECTO del backend
    const response = await axiosApiInstance.post<ApiResponse<BackendCreateResponse>>(
      'marketing/marcas',
      formData
    );

    // 2. Devuelve la 'data' de Axios, que ES la respuesta de tu backend
    return response.data;

  } catch (error) {
    console.error("Error al crear la marca:", error);
    
    // 3. En caso de error, SÍ devuelves un objeto con el formato estándar
    return {
      success: false,
      message: 'No se pudo crear la marca.',
      data: null
    };
  }
};

/**
 * Genera el enlace de conexión de Ayrshare para una marca específica.
 * @param brandId - El ID de la marca.
 * @returns Una promesa con la URL de conexión.
 */
export const generateConnectionLinkService = async (brandId: string): Promise<ApiResponse<{ url: string } | null>> => {
  try {
    const response = await axiosApiInstance.post<{ url: string }>(`/marcas/${brandId}/generate-link`);
    return { success: true, message: 'Enlace generado.', data: response.data };
  } catch (error) {
    console.error("Error al generar el enlace:", error);
    return { success: false, message: 'No se pudo generar el enlace.', data: null };
  }
};

/**
 * Obtiene las redes sociales conectadas para una marca específica.
 * @param brandId - El ID de la marca.
 * @returns Una promesa con la lista de cuentas sociales.
 */
export const getConnectedSocialsService = async (brandId: string): Promise<ApiResponse<SocialAccount[]>> => {
    try {
        const response = await axiosApiInstance.get<SocialAccount[]>(`/marcas/${brandId}/social-accounts`);
        return { success: true, message: 'Cuentas obtenidas.', data: response.data };
    } catch (error) {
        console.error("Error al obtener las cuentas sociales:", error);
        return { success: false, message: 'No se pudieron obtener las cuentas sociales.', data: [] };
    }
};