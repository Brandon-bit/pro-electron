import axiosApiInstance from '@/api/axiosApiInstance';
import type { SocialPost } from '../types/socialPostTypes';

 
interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
interface BackendPostResponse {
  items: SocialPost[];
}
interface PaginatedData<T> {
    items: T[];
    totalItems: number;
}

/**
 * Obtiene una lista paginada de publicaciones.
 * @param page - El número de página a solicitar.
 * @param pageSize - El número de elementos por página.
 * @returns Una promesa que resuelve a un objeto con los items y el total.
 */
export const getPostsService = async (
  brandId: number | null
): Promise<ApiResponse<PaginatedData<SocialPost>>> => {
  
  // 2. Si no hay marca seleccionada, no llames a la API
  if (!brandId) {
    return {
      success: true,
      message: 'No hay marca seleccionada.',
      data: { items: [], totalItems: 0 }
    };
  }

  try {
    // 3. Llama a tu endpoint REAL (reemplazando la llamada a axiosApiInstance)
    // El backend ignora 'page' y 'pageSize', pero los dejamos por compatibilidad
    const response = await axiosApiInstance.get<ApiResponse<BackendPostResponse>>(
      `/marketing/posts/marca/${brandId}`
    );

    // 4. Simula la paginación para que coincida con lo que el componente espera
    const items = response.data.data?.items || [];
    
    return {
      success: true,
      message: 'Publicaciones obtenidas exitosamente.',
      data: {
        items: items,
        totalItems: items.length // Usamos 'items.length' como total
      }
    };

  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
    return {
      success: false,
      message: 'No se pudieron obtener las publicaciones.',
      data: { items: [], totalItems: 0 }
    };
  }
};

/**
 * Crea una nueva publicación.
 * @param postData - FormData con los datos de la nueva publicación.
 * @returns Una promesa que resuelve a la respuesta de la API.
 */


export const createPostService = async (
    postData: FormData
): Promise<ApiResponse<SocialPost>> => {
    try {
        const response = await axiosApiInstance.post<SocialPost>('/marketing/posts', postData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Importante para el envío de archivos
            }
        });
        return {
            success: true,
            message: 'Publicación creada exitosamente.',
            data: response.data
        };
    } catch (error) {
        console.error("Error al crear la publicación:", error);
        throw error; // Lanza el error para que sea manejado por el composable
    }
};

/**
 * Actualiza una publicación existente.
 * @param id - El ID de la publicación a actualizar.
 * @param postData - FormData con los datos actualizados.
 * @returns Una promesa que resuelve a la respuesta de la API.
 */
export const updatePostService = async (
    id: string, 
    postData: FormData
): Promise<ApiResponse<SocialPost>> => {
    try {
       
        const response = await axiosApiInstance.put<SocialPost>(`/socialPosts/${id}`, postData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return {
            success: true,
            message: 'Publicación actualizada exitosamente.',
            data: response.data
        };
    } catch (error) {
        console.error(`Error al actualizar la publicación con ID ${id}:`, error);
        throw error;
    }
};

/**
 * Elimina una publicación.
 * @param id - El ID de la publicación a eliminar.
 * @returns Una promesa que resuelve a la respuesta de la API.
 */
export const deletePostService = async (id: string): Promise<ApiResponse<null>> => {
    try {
        await axiosApiInstance.delete(`/socialPosts/${id}`);
        return {
            success: true,
            message: 'Publicación eliminada exitosamente.',
            data: null
        };
    } catch (error) {
        console.error(`Error al eliminar la publicación con ID ${id}:`, error);
        throw error;
    }
};