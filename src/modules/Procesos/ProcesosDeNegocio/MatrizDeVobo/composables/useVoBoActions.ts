import { useToast } from 'vue-toastification'
import { useVoBoStore } from '../store/voboStore'
import {
    getVoBoDataService,
    getEspaciosByCVService,
    createVoBoManualService,
    updateVoBoService,
    sendVoBoEmailService,
    deleteVoBoService,
    attachFileService
} from '../services/voboServices'
import type {
    ICreateVoBoPayload,
    IUpdateVoBoPayload,
    ISendVoBoEmailPayload,
    IDeleteVoBoPayload,
    IAttachFilePayload
} from '../types/vobo.types'

export const useVoBoActions = () => {
    const toast = useToast()
    const voboStore = useVoBoStore()

    // ============================================
    // CARGAR DATOS INICIALES
    // ============================================

    const loadDataInicial = async () => {
        try {
            voboStore.setLoading(true)
            const data = await getVoBoDataService()
            voboStore.setDataInicial(data)
            toast.success('Datos cargados correctamente')
        } catch (error) {
            console.error('[VoBo] Error cargando datos:', error)
            toast.error('Error al cargar datos')
        } finally {
            voboStore.setLoading(false)
        }
    }

    // ============================================
    // FILTROS
    // ============================================

    const selectCadenaValor = async (dniCV: number) => {
        try {
            voboStore.setLoadingEspacios(true)
            voboStore.setFiltroCV(dniCV)
            
            const data = await getEspaciosByCVService(dniCV)
            voboStore.setEspacios(data)
        } catch (error) {
            console.error('[VoBo] Error cargando espacios:', error)
            toast.error('Error al cargar espacios')
        } finally {
            voboStore.setLoadingEspacios(false)
        }
    }

    const selectEspacio = (dniEsp: number) => {
        voboStore.setFiltroEsp(dniEsp)
    }

    const selectProceso = (dniProc: number) => {
        voboStore.setFiltroProc(dniProc)
    }

    // ============================================
    // CRUD VOBOS MANUALES
    // ============================================

    const createVoBoManual = async (payload: ICreateVoBoPayload) => {
        try {
            const response = await createVoBoManualService(payload)

            if (response.status === 'success' && response.data) {
                voboStore.addVoBoManual(response.data)
                toast.success(response.message)
                return response.data
            } else {
                toast.error('Error al crear VoBo')
                return null
            }
        } catch (error) {
            console.error('[VoBo] Error creando VoBo:', error)
            toast.error('Error al crear VoBo')
            return null
        }
    }

    const updateVoBoManual = async (payload: IUpdateVoBoPayload) => {
        try {
            const response = await updateVoBoService(payload)

            if (response.status === 'success') {
                toast.success(response.message)
                return true
            } else {
                toast.error('Error al actualizar VoBo')
                return false
            }
        } catch (error) {
            console.error('[VoBo] Error actualizando VoBo:', error)
            toast.error('Error al actualizar VoBo')
            return false
        }
    }

    const sendVoBoEmail = async (payload: ISendVoBoEmailPayload) => {
        try {
            const response = await sendVoBoEmailService(payload)

            if (response.status === 'success') {
                toast.success(response.message)
                return response.data
            } else {
                toast.error('Error al enviar correo')
                return null
            }
        } catch (error) {
            console.error('[VoBo] Error enviando correo:', error)
            toast.error('Error al enviar correo')
            return null
        }
    }

    const deleteVoBoManual = async (payload: IDeleteVoBoPayload, vobo: any) => {
        try {
            const response = await deleteVoBoService(payload)

            if (response.status === 'success') {
                voboStore.removeVoBoManual(vobo)
                toast.success(response.message)
                return true
            } else {
                toast.error('Error al eliminar VoBo')
                return false
            }
        } catch (error) {
            console.error('[VoBo] Error eliminando VoBo:', error)
            toast.error('Error al eliminar VoBo')
            return false
        }
    }

    // ============================================
    // ARCHIVOS
    // ============================================

    const attachFile = async (payload: IAttachFilePayload) => {
        try {
            const response = await attachFileService(payload)

            if (response.status === 'success' && response.data) {
                toast.success(response.message)
                return response.data
            } else {
                toast.error('Error al adjuntar archivo')
                return null
            }
        } catch (error) {
            console.error('[VoBo] Error adjuntando archivo:', error)
            toast.error('Error al adjuntar archivo')
            return null
        }
    }

    return {
        // Datos iniciales
        loadDataInicial,

        // Filtros
        selectCadenaValor,
        selectEspacio,
        selectProceso,

        // CRUD
        createVoBoManual,
        updateVoBoManual,
        sendVoBoEmail,
        deleteVoBoManual,

        // Archivos
        attachFile
    }
}
