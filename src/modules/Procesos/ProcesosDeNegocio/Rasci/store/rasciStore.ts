import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    IProceso,
    IMatrizRasci,
    IActividad,
    ITotalRasci,
    IEstadisticasRasci
} from '../types/rasci.types'

export const useRasciStore = defineStore('rasciStore', () => {
    // ============================================
    // STATE
    // ============================================
    
    const procesos = ref<IProceso[]>([])
    const procesoSeleccionado = ref<IProceso | null>(null)
    const matriz = ref<IMatrizRasci>({
        Proceso: { dni: 0, nombre: '' },
        Roles: [],
        Actividades: []
    })
    const isLoading = ref(false)
    
    // ============================================
    // GETTERS - CÁLCULOS
    // ============================================
    
    // Calcular accountables por actividad y totales RASCI
    const actividadesConAccountables = computed((): IActividad[] => {
        return matriz.value.Actividades.map(actividad => {
            let acc = 0
            actividad.Valores.forEach(v => {
                if (v.valor.includes('A')) acc++
            })
            return { ...actividad, acc }
        })
    })
    
    // Totales por tipo RASCI (R, A, S, C, I, Total)
    const totalesRasci = computed((): ITotalRasci[] => {
        const length = matriz.value.Actividades.length > 0 
            ? matriz.value.Actividades[0].Valores.length 
            : 0
        
        const R: number[] = Array(length).fill(0)
        const A: number[] = Array(length).fill(0)
        const S: number[] = Array(length).fill(0)
        const C: number[] = Array(length).fill(0)
        const I: number[] = Array(length).fill(0)
        const T: number[] = Array(length).fill(0)
        
        matriz.value.Actividades.forEach(actividad => {
            actividad.Valores.forEach((valor, idx) => {
                if (valor.valor.includes('R')) { R[idx]++; T[idx]++ }
                if (valor.valor.includes('A')) { A[idx]++; T[idx]++ }
                if (valor.valor.includes('S')) { S[idx]++; T[idx]++ }
                if (valor.valor.includes('C')) { C[idx]++; T[idx]++ }
                if (valor.valor.includes('I')) { I[idx]++; T[idx]++ }
            })
        })
        
        return [
            { name: 'R', val: R },
            { name: 'A', val: A },
            { name: 'S', val: S },
            { name: 'C', val: C },
            { name: 'I', val: I },
            { name: 'Total:', val: T }
        ]
    })
    
    // Estadísticas globales para KPIs
    const estadisticas = computed((): IEstadisticasRasci => {
        const totalActividades = matriz.value.Actividades.length
        const totalRoles = matriz.value.Roles.length
        
        let totalAsignaciones = 0
        let actividadesSinAccountable = 0
        let actividadesConMultiplesAccountables = 0
        
        actividadesConAccountables.value.forEach(act => {
            const acc = act.acc || 0
            
            if (acc === 0) actividadesSinAccountable++
            if (acc > 1) actividadesConMultiplesAccountables++
            
            act.Valores.forEach(v => {
                // Contar cada letra como una asignación
                const letras = v.valor.split('/').filter(l => l.trim() !== '')
                totalAsignaciones += letras.length
            })
        })
        
        // Roles sin asignaciones
        let rolesSinAsignaciones = 0
        if (totalActividades > 0) {
            totalesRasci.value[5].val.forEach(total => {
                if (total === 0) rolesSinAsignaciones++
            })
        }
        
        const promedioAsignacionesPorRol = totalRoles > 0 
            ? Math.round((totalAsignaciones / totalRoles) * 10) / 10 
            : 0
        
        return {
            totalActividades,
            totalRoles,
            totalAsignaciones,
            promedioAsignacionesPorRol,
            actividadesSinAccountable,
            actividadesConMultiplesAccountables,
            rolesSinAsignaciones
        }
    })
    
    // Validar si hay datos cargados
    const hayDatosCargados = computed(() => {
        return matriz.value.Proceso.dni !== 0
    })
    
    // ============================================
    // ACTIONS
    // ============================================
    
    const setProcesos = (procs: IProceso[]) => {
        procesos.value = procs
    }
    
    const setProcesoSeleccionado = (proceso: IProceso | null) => {
        procesoSeleccionado.value = proceso
    }
    
    const setMatriz = (mat: IMatrizRasci) => {
        matriz.value = JSON.parse(JSON.stringify(mat)) // Deep clone
    }
    
    const updateActividades = (actividades: IActividad[]) => {
        matriz.value = {
            ...matriz.value,
            Actividades: JSON.parse(JSON.stringify(actividades)) // Deep clone
        }
    }
    
    const updateValor = (dniAct: number, rol: number, nuevoValor: string) => {
        const actividadIndex = matriz.value.Actividades.findIndex(a => a.dni === dniAct)
        
        if (actividadIndex !== -1) {
            const actividad = matriz.value.Actividades[actividadIndex]
            const valorIndex = actividad.Valores.findIndex(v => v.rol === rol)
            
            if (valorIndex !== -1) {
                // Crear nueva actividad con valor actualizado
                const nuevaActividad = {
                    ...actividad,
                    Valores: actividad.Valores.map((v, idx) => 
                        idx === valorIndex ? { ...v, valor: nuevoValor } : v
                    )
                }
                
                // Actualizar matriz
                matriz.value.Actividades[actividadIndex] = nuevaActividad
            }
        }
    }
    
    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }
    
    const resetMatriz = () => {
        matriz.value = {
            Proceso: { dni: 0, nombre: '' },
            Roles: [],
            Actividades: []
        }
        procesoSeleccionado.value = null
    }
    
    return {
        // State
        procesos,
        procesoSeleccionado,
        matriz,
        isLoading,
        
        // Getters
        actividadesConAccountables,
        totalesRasci,
        estadisticas,
        hayDatosCargados,
        
        // Actions
        setProcesos,
        setProcesoSeleccionado,
        setMatriz,
        updateActividades,
        updateValor,
        setLoading,
        resetMatriz
    }
})
