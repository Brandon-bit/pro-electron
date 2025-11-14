import type {
    IProceso,
    IArea,
    ITablaMovimientos,
    ITiempoMovimiento,
    IActividad,
    IPuesto,
    IMovimientosResponse,
    INuevoAreaPayload,
    IAgregarPuestoPayload,
    INuevaActividadPayload,
    IIniciarCronoPayload,
    IFinalizarCronoPayload,
    IEditarActividadPayload,
    IEditarHRTPayload,
    IEliminarPayload,
    INuevaAreaAdminPayload,
    INuevoPuestoAdminPayload,
    IModificarAreaPayload,
    IModificarPuestoPayload
} from '../types/tiempos.types'

// ============================================
// STORAGE KEY
// ============================================
const STORAGE_KEY = 'tiempos_movimientos_data'

// ============================================
// DATA MOCK INICIAL
// ============================================

export const mockProcesos: IProceso[] = [
    { id: 1, nombre: 'Proceso de Producción' },
    { id: 2, nombre: 'Proceso de Ventas' },
    { id: 3, nombre: 'Proceso de Logística' }
]

// Simplificamos el tipo para el catálogo de áreas
interface IPuestoCatalogo {
    dni: number
    nombre: string
}

interface IAreaCatalogo {
    dni: number
    nombre: string
    Puestos: IPuestoCatalogo[]
}

const initialAreas: IAreaCatalogo[] = [
    {
        dni: 1,
        nombre: 'Producción',
        Puestos: [
            { dni: 101, nombre: 'Operario de Línea' },
            { dni: 102, nombre: 'Supervisor de Producción' },
            { dni: 103, nombre: 'Control de Calidad' }
        ]
    },
    {
        dni: 2,
        nombre: 'Ventas',
        Puestos: [
            { dni: 201, nombre: 'Ejecutivo de Ventas' },
            { dni: 202, nombre: 'Gerente Comercial' }
        ]
    },
    {
        dni: 3,
        nombre: 'Logística',
        Puestos: [
            { dni: 301, nombre: 'Almacenista' },
            { dni: 302, nombre: 'Chofer' },
            { dni: 303, nombre: 'Coordinador de Envíos' }
        ]
    }
]

const initialLista: ITiempoMovimiento[] = [
    {
        dni: 1001,
        nombre: 'Producción',
        dniArea: 1,
        Puestos: [
            {
                dni: 101,
                nombre: 'Operario de Línea',
                horasTrabajo: '08:00',
                horaInicio: '08:00',
                horaFin: '16:00',
                tiempoMuerto: '00:00:00',
                Actividades: [
                    {
                        dni: 10001,
                        nombre: 'Ensamble de piezas',
                        dias: 5,
                        strTiempoMuerto: '00:15:00',
                        frecuencia: 'diario',
                        personas: 2,
                        recomendaciones: 'Revisar proceso de ensamble',
                        activa: false,
                        finalizada: false
                    },
                    {
                        dni: 10002,
                        nombre: 'Inspección visual',
                        dias: 5,
                        strTiempoMuerto: '00:10:00',
                        frecuencia: 'por evento',
                        personas: 1,
                        recomendaciones: 'Capacitación en nuevos estándares',
                        activa: false,
                        finalizada: false
                    }
                ]
            }
        ]
    }
]

// ============================================
// HELPERS
// ============================================

// Cargar datos desde localStorage
function loadFromStorage(): ITablaMovimientos | null {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
        try {
            return JSON.parse(stored)
        } catch (e) {
            console.error('Error parsing stored data:', e)
            return null
        }
    }
    return null
}

// Guardar datos en localStorage
function saveToStorage(data: ITablaMovimientos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Obtener o inicializar datos
function getData(procesoId?: number): any {
    const stored = loadFromStorage()
    
    if (stored && (!procesoId || stored.Proceso.id === procesoId)) {
        return stored
    }
    
    // Datos iniciales
    const proceso = procesoId ? mockProcesos.find(p => p.id === procesoId) : mockProcesos[0]
    
    return {
        Proceso: proceso || mockProcesos[0],
        Areas: JSON.parse(JSON.stringify(initialAreas)),
        Lista: JSON.parse(JSON.stringify(initialLista))
    }
}

// Generar nuevo DNI
let nextDni = 10000
function generateDni(): number {
    return nextDni++
}

// ============================================
// SERVICIOS
// ============================================

// Obtener lista de procesos
export const getProcesosService = async (): Promise<IProceso[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProcesos)
        }, 200)
    })
}

// Obtener tabla de movimientos
export const getTablaMovimientosService = async (procesoId: number): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData(procesoId)
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Datos cargados exitosamente',
                data
            })
        }, 300)
    })
}

// ============================================
// CRUD TIEMPOS MOVIMIENTOS
// ============================================

// Nuevo área en Lista
export const nuevoAreaService = async (payload: INuevoAreaPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const area = data.Areas.find(a => a.dni === payload.area)
            
            if (!area) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const puestosSeleccionados = area.Puestos.filter(p => payload.puestos.includes(p.dni))
                .map(p => ({
                    ...p,
                    horasTrabajo: '08:00',
                    horaInicio: '08:00',
                    horaFin: '16:00',
                    tiempoMuerto: '00:00:00',
                    Actividades: []
                }))
            
            const nuevoTM: ITiempoMovimiento = {
                dni: generateDni(),
                nombre: area.nombre,
                dniArea: area.dni,
                Puestos: puestosSeleccionados
            }
            
            data.Lista.push(nuevoTM)
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Área agregada exitosamente',
                data: nuevoTM
            })
        }, 300)
    })
}

// Eliminar área de Lista
export const eliminarAreaService = async (payload: IEliminarPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const index = data.Lista.findIndex(tm => tm.dni === payload.dniTM)
            
            if (index === -1) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            data.Lista.splice(index, 1)
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Área eliminada exitosamente'
            })
        }, 300)
    })
}

// Agregar puesto a un área
export const agregarPuestoService = async (payload: IAgregarPuestoPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const tm = data.Lista.find(t => t.dni === payload.dniTM)
            
            if (!tm) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const area = data.Areas.find(a => a.dni === tm.dniArea)
            if (!area) {
                resolve({ status: 'error', message: 'Área no encontrada en catálogo' })
                return
            }
            
            const puesto = area.Puestos.find(p => p.dni === payload.dniP)
            if (!puesto) {
                resolve({ status: 'error', message: 'Puesto no encontrado' })
                return
            }
            
            const nuevoPuesto: IPuesto = {
                ...puesto,
                horasTrabajo: '08:00',
                horaInicio: '08:00',
                horaFin: '16:00',
                tiempoMuerto: '00:00:00',
                Actividades: []
            }
            
            tm.Puestos.push(nuevoPuesto)
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Puesto agregado exitosamente',
                data: nuevoPuesto
            })
        }, 300)
    })
}

// Quitar puesto
export const quitarPuestoService = async (payload: IEliminarPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const tm = data.Lista.find(t => t.dni === payload.dniTM)
            
            if (!tm) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const index = tm.Puestos.findIndex(p => p.dni === payload.dniP)
            if (index === -1) {
                resolve({ status: 'error', message: 'Puesto no encontrado' })
                return
            }
            
            tm.Puestos.splice(index, 1)
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Puesto eliminado exitosamente'
            })
        }, 300)
    })
}

// Nueva actividad
export const nuevaActividadService = async (payload: INuevaActividadPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const tm = data.Lista.find(t => t.dni === payload.dniTM)
            
            if (!tm) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const puesto = tm.Puestos.find(p => p.dni === payload.dniP)
            if (!puesto) {
                resolve({ status: 'error', message: 'Puesto no encontrado' })
                return
            }
            
            const nuevaActividad: IActividad = {
                dni: generateDni(),
                nombre: payload.nombre,
                dias: 1,
                strTiempoMuerto: '00:00:00',
                frecuencia: 'diario',
                personas: payload.personas,
                recomendaciones: payload.recomendaciones,
                activa: false,
                finalizada: false
            }
            
            puesto.Actividades.push(nuevaActividad)
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Actividad agregada exitosamente',
                data: nuevaActividad
            })
        }, 300)
    })
}

// Quitar actividad
export const quitarActividadService = async (payload: IEliminarPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const tm = data.Lista.find(t => t.dni === payload.dniTM)
            
            if (!tm) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const puesto = tm.Puestos.find(p => p.dni === payload.dniP)
            if (!puesto) {
                resolve({ status: 'error', message: 'Puesto no encontrado' })
                return
            }
            
            const index = puesto.Actividades.findIndex(a => a.dni === payload.dniAct)
            if (index === -1) {
                resolve({ status: 'error', message: 'Actividad no encontrada' })
                return
            }
            
            puesto.Actividades.splice(index, 1)
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Actividad eliminada exitosamente'
            })
        }, 300)
    })
}

// Iniciar cronómetro
export const iniciarCronoService = async (payload: IIniciarCronoPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const tm = data.Lista.find(t => t.dni === payload.dniTM)
            
            if (!tm) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const puesto = tm.Puestos.find(p => p.dni === payload.dniP)
            if (!puesto) {
                resolve({ status: 'error', message: 'Puesto no encontrado' })
                return
            }
            
            const actividad = puesto.Actividades.find(a => a.dni === payload.dniAct)
            if (!actividad) {
                resolve({ status: 'error', message: 'Actividad no encontrada' })
                return
            }
            
            // Iniciar cronómetro
            actividad.activa = true
            actividad.Start = {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: new Date().getDate(),
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                second: new Date().getSeconds()
            }
            
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Cronómetro iniciado',
                data: { activa: true, Start: actividad.Start }
            })
        }, 300)
    })
}

// Finalizar cronómetro
export const finalizarCronoService = async (payload: IFinalizarCronoPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const tm = data.Lista.find(t => t.dni === payload.dniTM)
            
            if (!tm) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const puesto = tm.Puestos.find(p => p.dni === payload.dniP)
            if (!puesto) {
                resolve({ status: 'error', message: 'Puesto no encontrado' })
                return
            }
            
            const actividad = puesto.Actividades.find(a => a.dni === payload.dniAct)
            if (!actividad) {
                resolve({ status: 'error', message: 'Actividad no encontrada' })
                return
            }
            
            // Finalizar cronómetro
            actividad.activa = false
            actividad.finalizada = true
            actividad.End = {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: new Date().getDate(),
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                second: new Date().getSeconds()
            }
            
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Cronómetro finalizado',
                data: { activa: false, finalizada: true, End: actividad.End }
            })
        }, 300)
    })
}

// Editar actividad
export const editarActividadService = async (payload: IEditarActividadPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const tm = data.Lista.find(t => t.dni === payload.dniTM)
            
            if (!tm) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const puesto = tm.Puestos.find(p => p.dni === payload.dniP)
            if (!puesto) {
                resolve({ status: 'error', message: 'Puesto no encontrado' })
                return
            }
            
            const actividad = puesto.Actividades.find(a => a.dni === payload.dniAct)
            if (!actividad) {
                resolve({ status: 'error', message: 'Actividad no encontrada' })
                return
            }
            
            actividad.dias = payload.dias
            actividad.strTiempoMuerto = payload.strTiempoM
            actividad.frecuencia = payload.frecuencia as any
            
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Actividad actualizada'
            })
        }, 300)
    })
}

// Editar horas de trabajo
export const editarHRTService = async (payload: IEditarHRTPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const tm = data.Lista.find(t => t.dni === payload.dniTM)
            
            if (!tm) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const puesto = tm.Puestos.find(p => p.dni === payload.dniP)
            if (!puesto) {
                resolve({ status: 'error', message: 'Puesto no encontrado' })
                return
            }
            
            puesto.horaInicio = payload.tiempoInicio
            puesto.horaFin = payload.tiempoFin
            
            // Calcular horas trabajo
            const [h1, m1] = payload.tiempoInicio.split(':').map(Number)
            const [h2, m2] = payload.tiempoFin.split(':').map(Number)
            const totalMinutes = (h2 * 60 + m2) - (h1 * 60 + m1)
            const hours = Math.floor(totalMinutes / 60)
            const minutes = totalMinutes % 60
            puesto.horasTrabajo = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
            
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Horas de trabajo actualizadas',
                data: { horasTrabajo: puesto.horasTrabajo }
            })
        }, 300)
    })
}

// ============================================
// ADMIN ÁREAS Y PUESTOS
// ============================================

// Nueva área
export const nuevaAreaAdminService = async (payload: INuevaAreaAdminPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            
            const nuevaArea: IArea = {
                dni: generateDni(),
                nombre: payload.nombre || 'Nueva Área',
                Puestos: []
            }
            
            data.Areas.push(nuevaArea)
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Área creada exitosamente',
                data: nuevaArea
            })
        }, 300)
    })
}

// Nuevo puesto en área
export const nuevoPuestoAdminService = async (payload: INuevoPuestoAdminPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const area = data.Areas.find(a => a.dni === payload.dni)
            
            if (!area) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const nuevoPuesto = {
                dni: generateDni(),
                nombre: payload.nombre || 'Nuevo Puesto'
            }
            
            area.Puestos.push(nuevoPuesto)
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Puesto creado exitosamente',
                data: nuevoPuesto
            })
        }, 300)
    })
}

// Modificar área
export const modificarAreaAdminService = async (payload: IModificarAreaPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const area = data.Areas.find(a => a.dni === payload.dni)
            
            if (!area) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            area.nombre = payload.nombre
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Área actualizada'
            })
        }, 300)
    })
}

// Modificar puesto
export const modificarPuestoAdminService = async (payload: IModificarPuestoPayload): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const area = data.Areas.find(a => a.dni === payload.dni)
            
            if (!area) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const puesto = area.Puestos.find(p => p.dni === payload.dniP)
            if (!puesto) {
                resolve({ status: 'error', message: 'Puesto no encontrado' })
                return
            }
            
            puesto.nombre = payload.nombre
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Puesto actualizado'
            })
        }, 300)
    })
}

// Eliminar área
export const eliminarAreaAdminService = async (dni: number): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const index = data.Areas.findIndex(a => a.dni === dni)
            
            if (index === -1) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            data.Areas.splice(index, 1)
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Área eliminada'
            })
        }, 300)
    })
}

// Eliminar puesto
export const eliminarPuestoAdminService = async (dniArea: number, dniPuesto: number): Promise<IMovimientosResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getData()
            const area = data.Areas.find(a => a.dni === dniArea)
            
            if (!area) {
                resolve({ status: 'error', message: 'Área no encontrada' })
                return
            }
            
            const index = area.Puestos.findIndex(p => p.dni === dniPuesto)
            if (index === -1) {
                resolve({ status: 'error', message: 'Puesto no encontrado' })
                return
            }
            
            area.Puestos.splice(index, 1)
            saveToStorage(data)
            
            resolve({
                status: 'success',
                message: 'Puesto eliminado'
            })
        }, 300)
    })
}
