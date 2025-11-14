import { useToast } from 'vue-toastification'
import { useRasciStore } from '../store/rasciStore'
import {
    getProcesosService,
    getMatrizRasciService,
    modificarValorService
} from '../services/rasciServices'
import type { ICheckboxesRasci } from '../types/rasci.types'

export const useRasciActions = () => {
    const toast = useToast()
    const rasciStore = useRasciStore()

    // ============================================
    // CARGAR DATOS
    // ============================================

    const loadProcesos = async () => {
        try {
            rasciStore.setLoading(true)
            const procesos = await getProcesosService()
            rasciStore.setProcesos(procesos)
        } catch (error) {
            console.error('[RASCI] Error cargando procesos:', error)
            toast.error('Error al cargar procesos')
        } finally {
            rasciStore.setLoading(false)
        }
    }

    const loadMatrizRasci = async (dniProceso: number) => {
        try {
            rasciStore.setLoading(true)
            const response = await getMatrizRasciService(dniProceso)

            if (response.status === 'success' && response.data) {
                rasciStore.setMatriz(response.data)
                const proceso = rasciStore.procesos.find(p => p.dni === dniProceso)
                if (proceso) {
                    rasciStore.setProcesoSeleccionado(proceso)
                }
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al cargar matriz RASCI')
                return false
            }
        } catch (error) {
            console.error('[RASCI] Error cargando matriz:', error)
            toast.error('Error al cargar matriz RASCI')
            return false
        } finally {
            rasciStore.setLoading(false)
        }
    }

    // ============================================
    // MODIFICAR VALORES
    // ============================================

    const modificarValor = async (
        dniAct: number,
        rol: number,
        checkboxes: ICheckboxesRasci
    ) => {
        try {
            // Construir string de valor (ej: "R/A/S")
            const lst: string[] = []
            if (checkboxes.R) lst.push('R')
            if (checkboxes.A) lst.push('A')
            if (checkboxes.S) lst.push('S')
            if (checkboxes.C) lst.push('C')
            if (checkboxes.I) lst.push('I')
            
            const valorNuevo = lst.join('/')

            const payload = {
                dniProc: rasciStore.matriz.Proceso.dni,
                dniAct,
                rol,
                valor: valorNuevo
            }

            const response = await modificarValorService(payload)

            if (response.status === 'success' && response.data) {
                // Actualizar actividades en el store
                rasciStore.updateActividades(response.data)
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al modificar valor')
                return false
            }
        } catch (error) {
            console.error('[RASCI] Error modificando valor:', error)
            toast.error('Error al modificar valor')
            return false
        }
    }

    // ============================================
    // SELECCIÓN DE PROCESO
    // ============================================

    const seleccionarProceso = async (dniProceso: number) => {
        return await loadMatrizRasci(dniProceso)
    }

    return {
        // Cargar datos
        loadProcesos,
        loadMatrizRasci,

        // Modificar valores
        modificarValor,

        // Selección
        seleccionarProceso
    }
}
