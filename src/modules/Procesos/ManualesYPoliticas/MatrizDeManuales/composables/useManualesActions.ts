import { useToast } from 'vue-toastification'
import { useManualesStore } from '../store/manualesStore'
import {
    getCadenasValorService,
    getManualesCVService,
    getManualesService,
    getNiveles1Service,
    getEspaciosService,
    agregarManualService,
    eliminarManualService,
    habilitarManualService,
    subirArchivoService,
    eliminarArchivoService
} from '../services/manualesServices'
import type {
    IAgregarManualPayload,
    ISubirArchivoPayload,
    IEliminarArchivoPayload
} from '../types/manuales.types'

export const useManualesActions = () => {
    const toast = useToast()
    const manualesStore = useManualesStore()

    // ============================================
    // CARGAR DATOS
    // ============================================

    const loadCadenasValor = async () => {
        try {
            manualesStore.setLoading(true)
            const cvs = await getCadenasValorService()
            manualesStore.setCadenasValor(cvs)
        } catch (error) {
            console.error('[MANUALES] Error cargando cadenas:', error)
            toast.error('Error al cargar cadenas de valor')
        } finally {
            manualesStore.setLoading(false)
        }
    }

    const loadDatosCV = async (dniCV: number) => {
        try {
            manualesStore.setLoading(true)

            const [manualesCV, manuales] = await Promise.all([
                getManualesCVService(dniCV),
                getManualesService(dniCV)
            ])

            manualesStore.setManualesCV(manualesCV)
            manualesStore.setManuales(manuales)

            return true
        } catch (error) {
            console.error('[MANUALES] Error cargando datos:', error)
            toast.error('Error al cargar datos')
            return false
        } finally {
            manualesStore.setLoading(false)
        }
    }

    const loadNiveles1 = async () => {
        try {
            const niveles = await getNiveles1Service()
            manualesStore.setNiveles1(niveles)
        } catch (error) {
            console.error('[MANUALES] Error cargando niveles:', error)
            toast.error('Error al cargar niveles')
        }
    }

    const loadEspacios = async (dniCV: number) => {
        try {
            const espacios = await getEspaciosService(dniCV)
            manualesStore.setEspacios(espacios)
        } catch (error) {
            console.error('[MANUALES] Error cargando espacios:', error)
            toast.error('Error al cargar espacios')
        }
    }

    // ============================================
    // CRUD MANUALES
    // ============================================

    const agregarManual = async (payload: IAgregarManualPayload) => {
        try {
            if (!manualesStore.cvSeleccionada) {
                toast.error('Selecciona una cadena de valor')
                return false
            }

            const response = await agregarManualService(
                payload,
                manualesStore.cvSeleccionada.dni
            )

            if (response.tipo === 'success' && response.m) {
                manualesStore.agregarManual(response.m)
                toast.success(response.titulo)
                return true
            } else {
                toast.error(response.titulo)
                return false
            }
        } catch (error) {
            console.error('[MANUALES] Error agregando manual:', error)
            toast.error('Error al agregar manual')
            return false
        }
    }

    const eliminarManual = async (dni: number) => {
        try {
            const response = await eliminarManualService({ dniProc: dni })

            if (response.tipo === 'success') {
                manualesStore.eliminarManual(dni)
                toast.success(response.titulo)
                return true
            } else {
                toast.error(response.titulo)
                return false
            }
        } catch (error) {
            console.error('[MANUALES] Error eliminando manual:', error)
            toast.error('Error al eliminar manual')
            return false
        }
    }

    const toggleHabilitar = async (dni: number, habilitado: boolean) => {
        try {
            const response = await habilitarManualService({
                dniManual: dni,
                habilitado
            })

            if (response.tipo === 'success') {
                manualesStore.toggleHabilitado(dni)
                toast.success(response.titulo)
                return true
            } else {
                toast.error(response.titulo)
                return false
            }
        } catch (error) {
            console.error('[MANUALES] Error habilitando manual:', error)
            toast.error('Error al cambiar estado')
            return false
        }
    }

    // ============================================
    // GESTIÓN DE ARCHIVOS
    // ============================================

    const subirArchivo = async (
        dniManual: number,
        tipo: 'version' | 'soporte',
        archivo: File
    ) => {
        try {
            const payload: ISubirArchivoPayload = {
                dni: dniManual,
                tipo,
                archivo
            }

            const response = await subirArchivoService(payload)

            if (response.tipo === 'success' && response.m) {
                manualesStore.agregarArchivo(dniManual, response.m, tipo)
                toast.success(response.titulo)
                return true
            } else {
                toast.error(response.titulo)
                return false
            }
        } catch (error) {
            console.error('[MANUALES] Error subiendo archivo:', error)
            toast.error('Error al subir archivo')
            return false
        }
    }

    const eliminarArchivo = async (
        dniManual: number,
        dniArchivo: number,
        tipo: 'version' | 'soporte'
    ) => {
        try {
            const payload: IEliminarArchivoPayload = {
                dni: dniManual,
                tipo,
                dniArchivo
            }

            const response = await eliminarArchivoService(payload)

            if (response.tipo === 'success') {
                manualesStore.eliminarArchivo(dniManual, dniArchivo, tipo)
                toast.success(response.titulo)
                return true
            } else {
                toast.error(response.titulo)
                return false
            }
        } catch (error) {
            console.error('[MANUALES] Error eliminando archivo:', error)
            toast.error('Error al eliminar archivo')
            return false
        }
    }

    return {
        // Cargar datos
        loadCadenasValor,
        loadDatosCV,
        loadNiveles1,
        loadEspacios,

        // CRUD manuales
        agregarManual,
        eliminarManual,
        toggleHabilitar,

        // Archivos
        subirArchivo,
        eliminarArchivo
    }
}
