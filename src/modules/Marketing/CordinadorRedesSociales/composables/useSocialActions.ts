import type { SocialPostFormType, PostPlatform } from '../types/socialPostTypes'
import useSocialStore from '@/modules/Marketing/CordinadorRedesSociales/store/useSocialPostStore'
import { createPostService, deletePostService, updatePostService, getPostsService } from '../services/socialPostService'

/**
 * Mapea los datos del formulario al formato que espera el backend
 */
const mapPostRequest = (
  data: SocialPostFormType,
  idMarca: number
): FormData => {
  const formData = new FormData();
  
  console.log("Datos recibidos por mapPostRequest:", data);
  
  // --- Campos básicos ---
  formData.append('idMarca', idMarca.toString());
  // El backend obtiene idCuenta e idUsuario desde los claims del token JWT
  formData.append('postContent', data.postContent);
  formData.append('status', data.status);
  formData.append('shortenLinks', data.shortenLinks.toString());
  
  // Fecha programada
  if (data.scheduleDate) {
    try {
      const dateString = data.scheduleDate.includes('T') 
        ? data.scheduleDate 
        : `${data.scheduleDate}T12:00:00`;
      const scheduleDateTime = new Date(dateString);
      if (!isNaN(scheduleDateTime.getTime())) {
        formData.append('scheduleDate', scheduleDateTime.toISOString());
      }
    } catch (e) {
      console.error("Error al procesar la fecha:", data.scheduleDate, e);
    }
  }
  
  // --- Construir mktPostPlatforms ---
  const platforms: PostPlatform[] = data.selectedPlatforms.map(platformName => ({
    platformName,
    // El backend obtiene idUsuario e idCuenta desde los claims del token JWT
    platformSpecificData: data.platformData[platformName] || {}
  }));
  
  // Opción A: Enviar como JSON string (requiere deserialización manual en backend)
  formData.append('mktPostPlatforms', JSON.stringify(platforms));
  
  // Opción B: Enviar en formato que ASP.NET entienda automáticamente
  // Descomenta esto y comenta la línea de arriba si prefieres esta opción
  /*
  platforms.forEach((platform, index) => {
    formData.append(`mktPostPlatforms[${index}].platformName`, platform.platformName);
    formData.append(`mktPostPlatforms[${index}].idUsuario`, platform.idUsuario);
    formData.append(`mktPostPlatforms[${index}].idCuenta`, platform.idCuenta);
    
    // Serializar platformSpecificData como JSON para esta plataforma específica
    if (platform.platformSpecificData) {
      formData.append(
        `mktPostPlatforms[${index}].platformSpecificDataJson`, 
        JSON.stringify(platform.platformSpecificData)
      );
    }
  });
  */
  
  // --- Archivos multimedia ---
  if (data.mediaFiles && data.mediaFiles.length > 0) {
    data.mediaFiles.forEach((file) => {
      formData.append('mediaFiles', file);
    });
  }
  
  // --- Depuración ---
  console.log("FormData a enviar:");
  console.log("- Plataformas:", platforms);
  console.log("- Archivos multimedia:", data.mediaFiles?.length || 0)
  
  return formData;
}


export const useSocialPostActions = () => {
  const socialStore = useSocialStore();

  const getPosts = async (brandId: number | null, page?: number, pageSize?: number) => {
    const response = await getPostsService(brandId); 
    
    if (response.success) {
      return response.data;
    }
    return { items: [], totalItems: 0 };
  };

  const createPost = async (
    data: SocialPostFormType, 
    idMarca: number
  ) => {
    try {
      // Validaciones básicas
      if (!data.postContent || data.postContent.trim() === '') {
        throw new Error('El contenido del post es requerido');
      }
      
      if (!data.selectedPlatforms || data.selectedPlatforms.length === 0) {
        throw new Error('Debes seleccionar al menos una red social');
      }
      
      // Mapear y enviar
      const formData = mapPostRequest(data, idMarca);
      const response = await createPostService(formData);
      
      return {
        message: response.message,
        status: response.success ? "success" : "error",
        data: response.data
      };
    } catch (error: any) {
      console.error('Error en createPost:', error);
      return {
        message: error.message || 'Error al crear la publicación',
        status: "error"
      };
    }
  };

  const editPost = async (
    data: SocialPostFormType,
    idMarca: number
  ) => {
    try {
      const id = socialStore.selectedPost.id?.toString() ?? '';
      if (!id) {
        throw new Error('ID de post no válido');
      }
      
      const formData = mapPostRequest(data, idMarca);
      const response = await updatePostService(id, formData);
      
      return {
        message: response.message,
        status: response.success ? "success" : "error",
        data: response.data
      };
    } catch (error: any) {
      console.error('Error en editPost:', error);
      return {
        message: error.message || 'Error al actualizar la publicación',
        status: "error"
      };
    }
  };

  const deletePost = async () => {
    try {
      const id = socialStore.selectedPost.id?.toString() ?? '';
      if (!id) {
        throw new Error('ID de post no válido');
      }
      
      const response = await deletePostService(id);
      return {
        message: response.message,
        status: response.success ? "success" : "error"
      };
    } catch (error: any) {
      console.error('Error en deletePost:', error);
      return {
        message: error.message || 'Error al eliminar la publicación',
        status: "error"
      };
    }
  };

  return { createPost, editPost, deletePost, getPosts };
};