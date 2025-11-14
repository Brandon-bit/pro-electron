import { useToast } from 'vue-toastification'
import { useTiemposStore } from '../store/tiemposStore'
import {
    getProcesosService,
    getTablaMovimientosService,
    nuevoAreaService,
    eliminarAreaService,
    agregarPuestoService,
    quitarPuestoService,
    nuevaActividadService,
    quitarActividadService,
    editarActividadService,
    editarHRTService,
    nuevaAreaAdminService,
    nuevoPuestoAdminService,
    modificarAreaAdminService,
    modificarPuestoAdminService,
    eliminarAreaAdminService,
    eliminarPuestoAdminService
} from '../services/tiemposServices'

export const useTiemposActions = () => {
    const toast = useToast()
    const tiemposStore = useTiemposStore()

    // ============================================
    // CARGAR DATOS
    // ============================================

    const loadProcesos = async () => {
        try {
            tiemposStore.setLoading(true)
            const procesos = await getProcesosService()
            tiemposStore.setProcesos(procesos)
        } catch (error) {
            console.error('[TIEMPOS] Error cargando procesos:', error)
            toast.error('Error al cargar procesos')
        } finally {
            tiemposStore.setLoading(false)
        }
    }

    const loadTabla = async (procesoId: number) => {
        try {
            tiemposStore.setLoading(true)
            const response = await getTablaMovimientosService(procesoId)

            if (response.status === 'success' && response.data) {
                tiemposStore.setTabla(response.data)
                const proceso = tiemposStore.procesos.find(p => p.id === procesoId)
                if (proceso) {
                    tiemposStore.setProcesoSeleccionado(proceso)
                }
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al cargar datos')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error cargando tabla:', error)
            toast.error('Error al cargar datos')
            return false
        } finally {
            tiemposStore.setLoading(false)
        }
    }

    // ============================================
    // CRUD ÁREAS EN PROCESO
    // ============================================

    const agregarArea = async (area: number, puestos: number[]) => {
        try {
            const response = await nuevoAreaService({ area, puestos })

            if (response.status === 'success' && response.data) {
                tiemposStore.agregarTM(response.data)
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al agregar área')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error agregando área:', error)
            toast.error('Error al agregar área')
            return false
        }
    }

    const eliminarAreaDeProceso = async (dniTM: number) => {
        try {
            const response = await eliminarAreaService({ dniTM })

            if (response.status === 'success') {
                tiemposStore.eliminarTM(dniTM)
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al eliminar área')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error eliminando área:', error)
            toast.error('Error al eliminar área')
            return false
        }
    }

    // ============================================
    // CRUD PUESTOS EN ÁREA
    // ============================================

    const agregarPuesto = async (dniTM: number, dniP: number) => {
        try {
            const response = await agregarPuestoService({ dniTM, dniP })

            if (response.status === 'success' && response.data) {
                tiemposStore.agregarPuestoATM(dniTM, response.data)
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al agregar puesto')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error agregando puesto:', error)
            toast.error('Error al agregar puesto')
            return false
        }
    }

    const quitarPuesto = async (dniTM: number, dniP: number) => {
        try {
            const response = await quitarPuestoService({ dniTM, dniP })

            if (response.status === 'success') {
                tiemposStore.quitarPuestoDeTM(dniTM, dniP)
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al quitar puesto')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error quitando puesto:', error)
            toast.error('Error al quitar puesto')
            return false
        }
    }

    // ============================================
    // CRUD ACTIVIDADES
    // ============================================

    const agregarActividad = async (
        dniTM: number,
        dniP: number,
        data: { nombre: string; personas: number; recomendaciones: string }
    ) => {
        try {
            const response = await nuevaActividadService({
                dniTM,
                dniP,
                ...data
            })

            if (response.status === 'success' && response.data) {
                tiemposStore.agregarActividadAPuesto(dniTM, dniP, response.data)
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al agregar actividad')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error agregando actividad:', error)
            toast.error('Error al agregar actividad')
            return false
        }
    }

    const quitarActividad = async (dniTM: number, dniP: number, dniAct: number) => {
        try {
            const response = await quitarActividadService({ dniTM, dniP, dniAct })

            if (response.status === 'success') {
                tiemposStore.quitarActividadDePuesto(dniTM, dniP, dniAct)
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al eliminar actividad')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error eliminando actividad:', error)
            toast.error('Error al eliminar actividad')
            return false
        }
    }

    const editarActividad = async (
        dniTM: number,
        dniP: number,
        dniAct: number,
        dias: number,
        strTiempoM: string,
        frecuencia: string
    ) => {
        try {
            const response = await editarActividadService({
                dniTM,
                dniP,
                dniAct,
                dias,
                strTiempoM,
                frecuencia
            })

            if (response.status === 'success') {
                tiemposStore.updateActividad(dniTM, dniP, dniAct, {
                    dias,
                    strTiempoMuerto: strTiempoM,
                    frecuencia: frecuencia as any
                })
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al editar actividad')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error editando actividad:', error)
            toast.error('Error al editar actividad')
            return false
        }
    }

    // ============================================
    // EDITAR HORAS DE TRABAJO
    // ============================================

    const editarHorasTrabajo = async (
        dniTM: number,
        dniP: number,
        tiempoInicio: string,
        tiempoFin: string
    ) => {
        try {
            const response = await editarHRTService({
                dniTM,
                dniP,
                tiempoInicio,
                tiempoFin
            })

            if (response.status === 'success' && response.data) {
                tiemposStore.updatePuesto(dniTM, dniP, {
                    horaInicio: tiempoInicio,
                    horaFin: tiempoFin,
                    horasTrabajo: response.data.horasTrabajo
                })
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al editar horas')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error editando horas:', error)
            toast.error('Error al editar horas')
            return false
        }
    }

    // ============================================
    // ADMIN CATÁLOGO (Áreas y Puestos)
    // ============================================

    const nuevaAreaAdmin = async (nombre?: string) => {
        try {
            const response = await nuevaAreaAdminService({ nombre })

            if (response.status === 'success' && response.data) {
                tiemposStore.agregarArea(response.data)
                toast.success(response.message)
                return response.data
            } else {
                toast.error(response.message || 'Error al crear área')
                return null
            }
        } catch (error) {
            console.error('[TIEMPOS] Error creando área:', error)
            toast.error('Error al crear área')
            return null
        }
    }

    const nuevoPuestoAdmin = async (dniArea: number, nombre?: string) => {
        try {
            const response = await nuevoPuestoAdminService({ dni: dniArea, nombre })

            if (response.status === 'success' && response.data) {
                toast.success(response.message)
                return response.data
            } else {
                toast.error(response.message || 'Error al crear puesto')
                return null
            }
        } catch (error) {
            console.error('[TIEMPOS] Error creando puesto:', error)
            toast.error('Error al crear puesto')
            return null
        }
    }

    const modificarAreaAdmin = async (dni: number, nombre: string) => {
        try {
            const response = await modificarAreaAdminService({ dni, nombre })

            if (response.status === 'success') {
                tiemposStore.updateArea(dni, { nombre })
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al modificar área')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error modificando área:', error)
            toast.error('Error al modificar área')
            return false
        }
    }

    const modificarPuestoAdmin = async (dniArea: number, dniP: number, nombre: string) => {
        try {
            const response = await modificarPuestoAdminService({ dni: dniArea, dniP, nombre })

            if (response.status === 'success') {
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al modificar puesto')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error modificando puesto:', error)
            toast.error('Error al modificar puesto')
            return false
        }
    }

    const eliminarAreaAdmin = async (dni: number) => {
        try {
            const response = await eliminarAreaAdminService(dni)

            if (response.status === 'success') {
                tiemposStore.eliminarArea(dni)
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al eliminar área')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error eliminando área:', error)
            toast.error('Error al eliminar área')
            return false
        }
    }

    const eliminarPuestoAdmin = async (dniArea: number, dniP: number) => {
        try {
            const response = await eliminarPuestoAdminService(dniArea, dniP)

            if (response.status === 'success') {
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al eliminar puesto')
                return false
            }
        } catch (error) {
            console.error('[TIEMPOS] Error eliminando puesto:', error)
            toast.error('Error al eliminar puesto')
            return false
        }
    }

    return {
        // Cargar
        loadProcesos,
        loadTabla,

        // CRUD Áreas
        agregarArea,
        eliminarAreaDeProceso,

        // CRUD Puestos
        agregarPuesto,
        quitarPuesto,

        // CRUD Actividades
        agregarActividad,
        quitarActividad,
        editarActividad,

        // Editar horas
        editarHorasTrabajo,

        // Admin
        nuevaAreaAdmin,
        nuevoPuestoAdmin,
        modificarAreaAdmin,
        modificarPuestoAdmin,
        eliminarAreaAdmin,
        eliminarPuestoAdmin
    }
}
