import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { showNotification } from '@/utils/toastNotifications'
import { extractDniFromId } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/mappingEDTData'
import type {
    EtapaFormType,
    ActividadFormType,
    SubActividadFormType
} from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/types/edtTypes'

export const useEDTActions = () => {
    const edtStore = useEDTStore()

    // ============================================
    // LOAD DATA
    // ============================================
    const cargarIniciativas = async () => {
        try {
            await edtStore.cargarIniciativasOpciones()
        } catch (error) {
            console.error('Error al cargar iniciativas:', error)
            showNotification('Error al cargar las iniciativas', 'error')
        }
    }

    const cargarEDT = async (dniIniciativa: number) => {
        try {
            await edtStore.cargarEDT(dniIniciativa)
        } catch (error) {
            console.error('Error al cargar EDT:', error)
            showNotification('Error al cargar el EDT', 'error')
        }
    }

    // ============================================
    // ETAPAS
    // ============================================
    const crearEtapa = async (form: EtapaFormType): Promise<boolean> => {
        try {
            const success = await edtStore.agregarEtapa(form)
            if (success) {
                showNotification('Etapa creada exitosamente', 'success')
                return true
            }
            showNotification('Error al crear la etapa', 'error')
            return false
        } catch (error) {
            console.error('Error al crear etapa:', error)
            showNotification('Error al crear la etapa', 'error')
            return false
        }
    }

    const actualizarEtapa = async (id: string, form: EtapaFormType): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.actualizarEtapa(dni, form)
            if (success) {
                showNotification('Etapa actualizada exitosamente', 'success')
                return true
            }
            showNotification('Error al actualizar la etapa', 'error')
            return false
        } catch (error) {
            console.error('Error al actualizar etapa:', error)
            showNotification('Error al actualizar la etapa', 'error')
            return false
        }
    }

    const eliminarEtapa = async (id: string): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.eliminarEtapa(dni)
            if (success) {
                showNotification('Etapa eliminada exitosamente', 'success')
                return true
            }
            showNotification('Error al eliminar la etapa', 'error')
            return false
        } catch (error) {
            console.error('Error al eliminar etapa:', error)
            showNotification('Error al eliminar la etapa', 'error')
            return false
        }
    }

    // ============================================
    // ACTIVIDADES
    // ============================================
    const crearActividad = async (dniEtapa: number, form: ActividadFormType): Promise<boolean> => {
        try {
            const success = await edtStore.agregarActividad(dniEtapa, form)
            if (success) {
                showNotification('Actividad creada exitosamente', 'success')
                return true
            }
            showNotification('Error al crear la actividad', 'error')
            return false
        } catch (error) {
            console.error('Error al crear actividad:', error)
            showNotification('Error al crear la actividad', 'error')
            return false
        }
    }

    const actualizarActividad = async (id: string, dniEtapa: number, form: ActividadFormType): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.actualizarActividad(dni, dniEtapa, form)
            if (success) {
                showNotification('Actividad actualizada exitosamente', 'success')
                return true
            }
            showNotification('Error al actualizar la actividad', 'error')
            return false
        } catch (error) {
            console.error('Error al actualizar actividad:', error)
            showNotification('Error al actualizar la actividad', 'error')
            return false
        }
    }

    const eliminarActividad = async (id: string): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.eliminarActividad(dni)
            if (success) {
                showNotification('Actividad eliminada exitosamente', 'success')
                return true
            }
            showNotification('Error al eliminar la actividad', 'error')
            return false
        } catch (error) {
            console.error('Error al eliminar actividad:', error)
            showNotification('Error al eliminar la actividad', 'error')
            return false
        }
    }

    // ============================================
    // SUB-ACTIVIDADES
    // ============================================
    const crearSubActividad = async (dniActividad: number, form: SubActividadFormType): Promise<boolean> => {
        try {
            const success = await edtStore.agregarSubActividad(dniActividad, form)
            if (success) {
                showNotification('Sub-actividad creada exitosamente', 'success')
                return true
            }
            showNotification('Error al crear la sub-actividad', 'error')
            return false
        } catch (error) {
            console.error('Error al crear sub-actividad:', error)
            showNotification('Error al crear la sub-actividad', 'error')
            return false
        }
    }

    const actualizarSubActividad = async (id: string, dniActividad: number, form: SubActividadFormType): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.actualizarSubActividad(dni, dniActividad, form)
            if (success) {
                showNotification('Sub-actividad actualizada exitosamente', 'success')
                return true
            }
            showNotification('Error al actualizar la sub-actividad', 'error')
            return false
        } catch (error) {
            console.error('Error al actualizar sub-actividad:', error)
            showNotification('Error al actualizar la sub-actividad', 'error')
            return false
        }
    }

    const eliminarSubActividad = async (id: string): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.eliminarSubActividad(dni)
            if (success) {
                showNotification('Sub-actividad eliminada exitosamente', 'success')
                return true
            }
            showNotification('Error al eliminar la sub-actividad', 'error')
            return false
        } catch (error) {
            console.error('Error al eliminar sub-actividad:', error)
            showNotification('Error al eliminar la sub-actividad', 'error')
            return false
        }
    }

    return {
        cargarIniciativas,
        cargarEDT,
        crearEtapa,
        actualizarEtapa,
        eliminarEtapa,
        crearActividad,
        actualizarActividad,
        eliminarActividad,
        crearSubActividad,
        actualizarSubActividad,
        eliminarSubActividad
    }
}
