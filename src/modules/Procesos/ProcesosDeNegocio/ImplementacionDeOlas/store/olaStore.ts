import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IOla, IProceso, IOlasGrouped } from '../types/ola.types'

export const useOlaStore = defineStore('olaStore', () => {
    // ============================================
    // STATE
    // ============================================
    
    const procesoSeleccionado = ref<IProceso | null>(null)
    const olas = ref<IOla[]>([])
    const isLoading = ref(false)
    
    // ============================================
    // GETTERS
    // ============================================
    
    // Agrupar olas por número (0, 1, 2, 3)
    const olasAgrupadas = computed<IOlasGrouped>(() => {
        return {
            o1: olas.value.filter(o => o.ola_numero === 0),
            o2: olas.value.filter(o => o.ola_numero === 1),
            o3: olas.value.filter(o => o.ola_numero === 2),
            o4: olas.value.filter(o => o.ola_numero === 3)
        }
    })
    
    // Verificar si hay un proceso seleccionado
    const hasProcesoSeleccionado = computed(() => {
        return procesoSeleccionado.value !== null
    })
    
    // Verificar si el proceso está en revisión
    const enRevision = computed(() => {
        // Mock: siempre false por ahora
        return false
    })
    
    // ============================================
    // ACTIONS
    // ============================================
    
    const setProcesoSeleccionado = (proceso: IProceso | null) => {
        procesoSeleccionado.value = proceso
    }
    
    const setOlas = (newOlas: IOla[]) => {
        olas.value = newOlas
    }
    
    const addOla = (ola: IOla) => {
        olas.value.push(ola)
    }
    
    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }
    
    const resetStore = () => {
        procesoSeleccionado.value = null
        olas.value = []
        isLoading.value = false
    }
    
    return {
        // State
        procesoSeleccionado,
        olas,
        isLoading,
        
        // Getters
        olasAgrupadas,
        hasProcesoSeleccionado,
        enRevision,
        
        // Actions
        setProcesoSeleccionado,
        setOlas,
        addOla,
        setLoading,
        resetStore
    }
})
