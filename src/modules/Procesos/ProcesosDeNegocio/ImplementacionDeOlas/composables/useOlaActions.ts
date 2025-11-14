import { useToast } from 'vue-toastification'
import { useOlaStore } from '../store/olaStore'
import {
    getProcesosService,
    getOlasByProcesoService,
    createOlaService,
    getUsuariosVoBoService,
    sendVoBoService,
    getProcesoByIdService
} from '../services/olaServices'
import type { ICreateOlaPayload, ISendVoBoPayload, IProceso } from '../types/ola.types'

export const useOlaActions = () => {
    const toast = useToast()
    const olaStore = useOlaStore()

    // ============================================
    // PROCESOS
    // ============================================

    const loadProcesos = async () => {
        try {
            const procesos = await getProcesosService()
            return procesos
        } catch (error) {
            console.error('[OLA] Error cargando procesos:', error)
            toast.error('Error al cargar procesos')
            return []
        }
    }

    const selectProceso = async (proceso: IProceso) => {
        try {
            olaStore.setLoading(true)
            olaStore.setProcesoSeleccionado(proceso)

            // Cargar olas del proceso
            const olas = await getOlasByProcesoService(proceso.id)
            olaStore.setOlas(olas)

            toast.success(`Proceso "${proceso.nombre}" cargado`)
        } catch (error) {
            console.error('[OLA] Error seleccionando proceso:', error)
            toast.error('Error al cargar proceso')
        } finally {
            olaStore.setLoading(false)
        }
    }

    const loadProcesoById = async (id: number) => {
        try {
            olaStore.setLoading(true)
            const proceso = await getProcesoByIdService(id)
            
            if (proceso) {
                await selectProceso(proceso)
            } else {
                toast.error('Proceso no encontrado')
            }
        } catch (error) {
            console.error('[OLA] Error cargando proceso:', error)
            toast.error('Error al cargar proceso')
        } finally {
            olaStore.setLoading(false)
        }
    }

    // ============================================
    // OLAS
    // ============================================

    const createOla = async (payload: ICreateOlaPayload) => {
        try {
            const response = await createOlaService(payload)

            if (response.status === 'success' && response.data) {
                olaStore.addOla(response.data)
                toast.success(response.message)
                return response.data
            } else {
                toast.error('Error al crear ola')
                return null
            }
        } catch (error) {
            console.error('[OLA] Error creando ola:', error)
            toast.error('Error al crear ola')
            return null
        }
    }

    // ============================================
    // VOBO
    // ============================================

    const getUsuariosVoBo = async () => {
        try {
            const usuarios = await getUsuariosVoBoService()
            return usuarios
        } catch (error) {
            console.error('[OLA] Error cargando usuarios:', error)
            toast.error('Error al cargar usuarios')
            return []
        }
    }

    const sendVoBo = async (payload: ISendVoBoPayload) => {
        try {
            if (payload.correos.length === 0) {
                toast.warning('Debes seleccionar al menos un usuario')
                return false
            }

            const response = await sendVoBoService(payload)

            if (response.status === 'success') {
                toast.success(response.message)
                return true
            } else {
                toast.error('Error al enviar VoBo')
                return false
            }
        } catch (error) {
            console.error('[OLA] Error enviando VoBo:', error)
            toast.error('Error al enviar VoBo')
            return false
        }
    }

    return {
        // Procesos
        loadProcesos,
        selectProceso,
        loadProcesoById,

        // Olas
        createOla,

        // VoBo
        getUsuariosVoBo,
        sendVoBo
    }
}
