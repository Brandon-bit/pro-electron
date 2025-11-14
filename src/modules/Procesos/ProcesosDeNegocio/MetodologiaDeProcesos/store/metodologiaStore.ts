import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IProceso, IFase } from '../types/metodologia.types'

export const useMetodologiaStore = defineStore('metodologiaStore', () => {
    // ============================================
    // STATE
    // ============================================
    
    const procesoSeleccionado = ref<IProceso | null>(null)
    const fases = ref<IFase[]>([])
    const isLoading = ref(false)
    
    // ============================================
    // GETTERS
    // ============================================
    
    const hasProcesoSeleccionado = computed(() => {
        return procesoSeleccionado.value !== null
    })
    
    // Calcular progreso total (% de actividades completadas en todas las fases)
    const progresoTotal = computed(() => {
        if (fases.value.length === 0) return 0
        
        let totalActividades = 0
        let actividadesCompletadas = 0
        
        fases.value.forEach(fase => {
            totalActividades += fase.Actividades.length
            actividadesCompletadas += fase.Actividades.filter(a => a.finalizada).length
        })
        
        if (totalActividades === 0) return 0
        return Math.round((actividadesCompletadas / totalActividades) * 100)
    })
    
    // Obtener fase por ID
    const getFaseById = computed(() => {
        return (dni: number) => fases.value.find(f => f.dni === dni)
    })
    
    // Contar fases por estado
    const contadorEstados = computed(() => {
        return {
            noIniciadas: fases.value.filter(f => !f.activa && !f.finalizada).length,
            activas: fases.value.filter(f => f.activa && !f.finalizada).length,
            finalizadas: fases.value.filter(f => f.finalizada).length
        }
    })
    
    // ============================================
    // ACTIONS
    // ============================================
    
    const setProcesoSeleccionado = (proceso: IProceso | null) => {
        procesoSeleccionado.value = proceso
    }
    
    const setFases = (newFases: IFase[]) => {
        fases.value = newFases
    }
    
    const addActividad = (dniFase: number, actividad: any) => {
        const faseIndex = fases.value.findIndex(f => f.dni === dniFase)
        if (faseIndex !== -1) {
            const fase = fases.value[faseIndex]
            // Crear nuevo array con la actividad agregada
            fases.value[faseIndex] = {
                ...fase,
                Actividades: [...fase.Actividades, actividad]
            }
            console.log('[Store] Actividad agregada:', actividad.nombre)
        }
    }
    
    const updateActividad = (dniFase: number, dniActividad: number, updates: any) => {
        const faseIndex = fases.value.findIndex(f => f.dni === dniFase)
        if (faseIndex !== -1) {
            const fase = fases.value[faseIndex]
            const actIndex = fase.Actividades.findIndex(a => a.dni === dniActividad)
            if (actIndex !== -1) {
                // Crear nuevo array de actividades con la actividad actualizada
                const newActividades = [...fase.Actividades]
                newActividades[actIndex] = { ...newActividades[actIndex], ...updates }
                
                // Actualizar la fase con el nuevo array para forzar reactividad
                fases.value[faseIndex] = {
                    ...fase,
                    Actividades: newActividades
                }
                console.log('[Store] Actividad actualizada:', newActividades[actIndex].nombre, updates)
            }
        }
    }
    
    const removeActividad = (dniFase: number, dniActividad: number) => {
        const faseIndex = fases.value.findIndex(f => f.dni === dniFase)
        if (faseIndex !== -1) {
            const fase = fases.value[faseIndex]
            // Crear nuevo array sin la actividad eliminada
            fases.value[faseIndex] = {
                ...fase,
                Actividades: fase.Actividades.filter(a => a.dni !== dniActividad)
            }
            console.log('[Store] Actividad eliminada, quedan:', fases.value[faseIndex].Actividades.length)
        }
    }
    
    const updateFase = (dniFase: number, updates: Partial<IFase>) => {
        const index = fases.value.findIndex(f => f.dni === dniFase)
        if (index !== -1) {
            const oldFase = fases.value[index]
            // Crear un nuevo objeto para forzar reactividad
            fases.value[index] = { 
                ...oldFase, 
                ...updates,
                // Mantener la referencia del array de Actividades si no se actualiza
                Actividades: updates.Actividades || [...oldFase.Actividades]
            }
            console.log('[Store] Fase actualizada:', fases.value[index].nombre, updates)
            console.log('[Store] Fase completa:', fases.value[index])
        }
    }
    
    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }
    
    const resetStore = () => {
        procesoSeleccionado.value = null
        fases.value = []
        isLoading.value = false
    }
    
    return {
        // State
        procesoSeleccionado,
        fases,
        isLoading,
        
        // Getters
        hasProcesoSeleccionado,
        progresoTotal,
        getFaseById,
        contadorEstados,
        
        // Actions
        setProcesoSeleccionado,
        setFases,
        addActividad,
        updateActividad,
        removeActividad,
        updateFase,
        setLoading,
        resetStore
    }
})
