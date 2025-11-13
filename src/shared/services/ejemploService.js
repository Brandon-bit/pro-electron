import axios from '../api/axiosInstance';
export const getProcesos = async (page = 1, pageSize = 10, nombre = "", cadenaArea = "", cadena1 = "", cadena2 = "", cadena3 = "") => {
    const response = await axios.get('/proceso', { params: { page, pageSize, nombre, cadenaArea, cadena1, cadena2, cadena3 } });
    return response.data;
};
/**
 * Crea un nuevo proceso en el sistema
 * @param nuevoProceso Datos del nuevo proceso a crear
 * @returns Respuesta de la API con el resultado de la operación
 */
export const crearNuevoProceso = async (nuevoProceso) => {
    const response = await axios.post('/proceso/agregar', nuevoProceso);
    return response.data;
};
/**
 * Crea un nuevo proceso en el sistema
 * @param nuevoProceso Datos del nuevo proceso a crear
 * @returns Respuesta de la API con el resultado de la operación
 */
export const crearNuevoProcesoCV = async (nuevoProceso) => {
    const response = await axios.post('/proceso/agregar-cv', nuevoProceso);
    return response.data;
};
/**
 * Obtiene los grupos de procesos nivel 2 para un nivel 1 específico
 * @param idNivel1 ID del nivel 1 para el cual se requieren los grupos de nivel 2
 * @returns Respuesta de la API con el listado de grupos de nivel 2
 */
export const getNiveles2 = async (idNivel1) => {
    const response = await axios.get(`/proceso/niveles2/${idNivel1}`);
    return response.data;
};
// La función getNiveles3 no es necesaria ya que los niveles 3 vienen incluidos
// en la respuesta de la consulta de niveles 2 dentro de la propiedad lvls3
//# sourceMappingURL=ejemploService.js.map