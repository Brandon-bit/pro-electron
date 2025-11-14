import { useToast } from 'vue-toastification'
import { useMetodologiaStore } from '../store/metodologiaStore'
import {
    getMetodologiaDataService,
    getProcesosService,
    createActividadService,
    finalizarActividadService,
    deleteActividadService
} from '../services/metodologiaServices'
import type {
    IProceso,
    ICreateActividadPayload,
    IFinalizarActividadPayload,
    IDeleteActividadPayload
} from '../types/metodologia.types'

export const useMetodologiaActions = () => {
    const toast = useToast()
    const metodologiaStore = useMetodologiaStore()

    // ============================================
    // PROCESOS
    // ============================================

    const loadProcesos = async () => {
        try {
            const procesos = await getProcesosService()
            return procesos
        } catch (error) {
            console.error('[METODOLOGIA] Error cargando procesos:', error)
            toast.error('Error al cargar procesos')
            return []
        }
    }

    const selectProceso = async (proceso: IProceso) => {
        try {
            metodologiaStore.setLoading(true)
            metodologiaStore.setProcesoSeleccionado(proceso)

            const data = await getMetodologiaDataService(proceso.id)
            metodologiaStore.setFases(data.Metodologias)

            toast.success(`Proceso "${proceso.nombre}" cargado`)
        } catch (error) {
            console.error('[METODOLOGIA] Error seleccionando proceso:', error)
            toast.error('Error al cargar proceso')
        } finally {
            metodologiaStore.setLoading(false)
        }
    }

    const loadProcesoById = async (id: number) => {
        try {
            metodologiaStore.setLoading(true)
            
            const procesos = await loadProcesos()
            const proceso = procesos.find(p => p.id === id)
            
            if (proceso) {
                await selectProceso(proceso)
            } else {
                toast.error('Proceso no encontrado')
            }
        } catch (error) {
            console.error('[METODOLOGIA] Error cargando proceso:', error)
            toast.error('Error al cargar proceso')
        } finally {
            metodologiaStore.setLoading(false)
        }
    }

    // ============================================
    // ACTIVIDADES
    // ============================================

    const createActividad = async (payload: ICreateActividadPayload) => {
        try {
            const response = await createActividadService(payload)

            if (response.status === 'success' && response.data) {
                metodologiaStore.addActividad(payload.dniFase, response.data)
                toast.success(response.message)
                return response.data
            } else {
                toast.error(response.message || 'Error al crear actividad')
                return null
            }
        } catch (error) {
            console.error('[METODOLOGIA] Error creando actividad:', error)
            toast.error('Error al crear actividad')
            return null
        }
    }

    const finalizarActividad = async (payload: IFinalizarActividadPayload) => {
        try {
            console.log('[useMetodologiaActions] Finalizando actividad:', payload)
            const response = await finalizarActividadService(payload)
            console.log('[useMetodologiaActions] Response:', response)

            if (response.status === 'success') {
                // Actualizar actividad
                metodologiaStore.updateActividad(payload.dniFase, payload.dni, {
                    finalizada: true,
                    fechaFinalizacion: new Date().toISOString()
                })

                // Actualizar fase si es necesario
                if (response.data) {
                    const updates: any = {}
                    
                    // Solo actualizar Start si es la primera vez que se activa
                    if (response.data.justActivated) {
                        updates.activa = true
                        updates.Start = response.data.Start
                        console.log('[useMetodologiaActions] ✅ Fase RECIÉN ACTIVADA, Start:', updates.Start)
                    }
                    
                    if (response.data.finalizada) {
                        updates.finalizada = true
                        updates.End = response.data.End
                        console.log('[useMetodologiaActions] ✅ Fase FINALIZADA, End:', updates.End)
                    }
                    
                    if (Object.keys(updates).length > 0) {
                        console.log('[useMetodologiaActions] 🔄 Actualizando fase con:', updates)
                        metodologiaStore.updateFase(payload.dniFase, updates)
                        console.log('[useMetodologiaActions] ✅ Fase actualizada en store')
                    } else {
                        console.log('[useMetodologiaActions] ℹ️ No hay cambios de estado en la fase')
                    }
                }

                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al finalizar actividad')
                return false
            }
        } catch (error) {
            console.error('[METODOLOGIA] Error finalizando actividad:', error)
            toast.error('Error al finalizar actividad')
            return false
        }
    }

    const deleteActividad = async (payload: IDeleteActividadPayload) => {
        try {
            const response = await deleteActividadService(payload)

            if (response.status === 'success') {
                metodologiaStore.removeActividad(payload.dniFase, payload.dni)

                // Actualizar estado de fase si es necesario
                if (response.data) {
                    const fase = metodologiaStore.getFaseById(payload.dniFase)
                    
                    if (fase && fase.Actividades.length === 0) {
                        metodologiaStore.updateFase(payload.dniFase, {
                            activa: false,
                            finalizada: false,
                            Start: undefined,
                            End: undefined
                        })
                    } else if (response.data.finalizada !== undefined) {
                        metodologiaStore.updateFase(payload.dniFase, {
                            finalizada: response.data.finalizada
                        })
                    }
                }

                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al eliminar actividad')
                return false
            }
        } catch (error) {
            console.error('[METODOLOGIA] Error eliminando actividad:', error)
            toast.error('Error al eliminar actividad')
            return false
        }
    }

    return {
        // Procesos
        loadProcesos,
        selectProceso,
        loadProcesoById,

        // Actividades
        createActividad,
        finalizarActividad,
        deleteActividad
    }
}
