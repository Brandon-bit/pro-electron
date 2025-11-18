import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { showNotification } from '@/utils/toastNotifications'
import { extractDniFromId } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/mappingEDTData'
import type {
    StageFormType,
    ActivityFormType,
    SubActivityFormType
} from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/types/edtTypes'

export const useEDTActions = () => {
    const edtStore = useEDTStore()

    // ============================================
    // LOAD DATA
    // ============================================
    const loadInitiatives = async () => {
        try {
            await edtStore.loadInitiativeOptions()
        } catch (error) {
            console.error('Error al cargar iniciativas:', error)
            showNotification('Error al cargar las iniciativas', 'error')
        }
    }

    const loadEDT = async (dniInitiative: number) => {
        try {
            await edtStore.loadEDT(dniInitiative)
        } catch (error) {
            console.error('Error al cargar EDT:', error)
            showNotification('Error al cargar el EDT', 'error')
        }
    }

    // ============================================
    // ETAPAS
    // ============================================
    const createStage = async (form: StageFormType): Promise<boolean> => {
        try {
            const success = await edtStore.addStage(form)
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

    const updateStage = async (id: string, form: StageFormType): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.putStage(dni, form)
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

    const deleteStage = async (id: string): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.deleteStage(dni)
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
    // ACTIVITIES
    // ============================================
    const createActivity = async (dniStage: number, form: ActivityFormType): Promise<boolean> => {
        try {
            const success = await edtStore.addActivity(dniStage, form)
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

    const updateActivity = async (id: string, dniEtapa: number, form: ActivityFormType): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.putActivity(dni, dniEtapa, form)
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

    const deleteActivity = async (id: string): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.deleteActivity(dni)
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
    // SUB-ACTIVITIES
    // ============================================
    const createSubActivity = async (dniActivity: number, form: SubActivityFormType): Promise<boolean> => {
        try {
            const success = await edtStore.addSubActivity(dniActivity, form)
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

    const updateSubActivity = async (id: string, dniActivity: number, form: SubActivityFormType): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.putSubActivity(dni, dniActivity, form)
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

    const deleteSubActivity = async (id: string): Promise<boolean> => {
        try {
            const dni = extractDniFromId(id)
            const success = await edtStore.deleteSubActivity(dni)
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
        loadInitiatives,
        loadEDT,
        createStage,
        updateStage,
        deleteStage,
        createActivity,
        updateActivity,
        deleteActivity,
        createSubActivity,
        updateSubActivity,
        deleteSubActivity
    }
}
