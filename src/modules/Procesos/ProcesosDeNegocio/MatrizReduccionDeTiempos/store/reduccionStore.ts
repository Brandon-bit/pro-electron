import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    ICadenaValor,
    IEspacio,
    ICVEspacio,
    IProyecto,
    IActividad,
    IFiltrosSeleccionados,
    ProcesoOption,
    ProcesoNiv4Option,
    ITiempoTotal,
    IReduccion
} from '../types/reduccion.types'

export const useReduccionStore = defineStore('reduccionStore', () => {
    // ============================================
    // STATE
    // ============================================
    
    const cadenasValor = ref<ICadenaValor[]>([])
    const espacios = ref<IEspacio[]>([])
    const cvEspacios = ref<ICVEspacio[]>([])
    const proyectos = ref<IProyecto[]>([])
    
    const filtros = ref<IFiltrosSeleccionados>({
        idCV: null,
        idP: null,
        idPr: null,
        idA: null,
        idT: null
    })
    
    const procesoSeleccionado = ref<ProcesoOption | null>(null)
    const procesoNiv4Seleccionado = ref<ProcesoNiv4Option | null>(null)
    
    const actividadesAsis = ref<IActividad[]>([])
    const actividadesTobe = ref<IActividad[]>([])
    
    const infoProyecto = ref({
        area: '',
        proyecto: '',
        person: '',
        strFechaIni: new Date().toISOString().split('T')[0]
    })
    
    const showComparacion = ref(false)
    const isLoading = ref(false)
    
    // ============================================
    // GETTERS
    // ============================================
    
    // Opciones para selectores
    const opcionesProcesosNiv4Asis = computed(() => {
        if (!procesoSeleccionado.value) return []
        
        const esCadenaValor = 'CVProcesos' in procesoSeleccionado.value
        
        if (esCadenaValor) {
            return (procesoSeleccionado.value as ICVEspacio).CVProcesos.filter(p => p.asis)
        } else {
            return (procesoSeleccionado.value as IEspacio).Procesos.filter(p => p.asis)
        }
    })
    
    const opcionesProcesosNiv4Tobe = computed(() => {
        if (!procesoSeleccionado.value) return []
        
        const esCadenaValor = 'CVProcesos' in procesoSeleccionado.value
        
        if (esCadenaValor) {
            return (procesoSeleccionado.value as ICVEspacio).CVProcesos.filter(p => !p.asis)
        } else {
            return (procesoSeleccionado.value as IEspacio).Procesos.filter(p => !p.asis)
        }
    })
    
    const opcionesDiagramasAsis = computed(() => {
        if (!procesoNiv4Seleccionado.value) return []
        
        return procesoNiv4Seleccionado.value.Diagramas
            .filter(d => !d.tobe)
            .map(d => ({
                ...d,
                nombreDiag: `${procesoNiv4Seleccionado.value!.nombre}_v${d.version}`
            }))
    })
    
    const opcionesDiagramasTobe = computed(() => {
        if (!procesoNiv4Seleccionado.value) return []
        
        return procesoNiv4Seleccionado.value.Diagramas
            .filter(d => d.tobe)
            .map(d => ({
                ...d,
                nombreDiag: `${procesoNiv4Seleccionado.value!.nombre}_v${d.version}`
            }))
    })
    
    // Cálculos de tiempos totales
    const tiempoTotalAsis = computed((): ITiempoTotal => {
        return {
            ttdias: actividadesAsis.value.reduce((sum, act) => sum + (act.tTDia || 0), 0),
            tthrs: actividadesAsis.value.reduce((sum, act) => sum + (act.tTHrs || 0), 0),
            ttmin: actividadesAsis.value.reduce((sum, act) => sum + (act.tTMin || 0), 0)
        }
    })
    
    const tiempoTotalTobe = computed((): ITiempoTotal => {
        return {
            ttdias: actividadesTobe.value.reduce((sum, act) => sum + (act.tTDia || 0), 0),
            tthrs: actividadesTobe.value.reduce((sum, act) => sum + (act.tTHrs || 0), 0),
            ttmin: actividadesTobe.value.reduce((sum, act) => sum + (act.tTMin || 0), 0)
        }
    })
    
    // Cálculo de reducciones
    const reduccion = computed((): IReduccion => {
        // Convertir tiempos a segundos
        const segAsis = (tiempoTotalAsis.value.ttdias * 24 * 3600) + 
                       (tiempoTotalAsis.value.tthrs * 3600) + 
                       (tiempoTotalAsis.value.ttmin * 60)
        
        const segTobe = (tiempoTotalTobe.value.ttdias * 24 * 3600) + 
                       (tiempoTotalTobe.value.tthrs * 3600) + 
                       (tiempoTotalTobe.value.ttmin * 60)
        
        const mayorTt = Math.max(segAsis, segTobe)
        const menorTt = Math.min(segAsis, segTobe)
        
        const mayorAct = Math.max(actividadesAsis.value.length, actividadesTobe.value.length)
        const menorAct = Math.min(actividadesAsis.value.length, actividadesTobe.value.length)
        
        let reduccionTiempo = '0%'
        let reduccionActividades = '0%'
        
        if (mayorTt > 0) {
            const pct = Math.round(((mayorTt - menorTt) / mayorTt) * 100)
            reduccionTiempo = !isNaN(pct) ? `${pct}%` : '0%'
        }
        
        if (mayorAct > 0) {
            const pct = Math.round(((mayorAct - menorAct) / mayorAct) * 100)
            reduccionActividades = !isNaN(pct) ? `${pct}%` : '0%'
        }
        
        return {
            reduccionTiempo,
            reduccionActividades
        }
    })
    
    // Validaciones
    const puedeComparar = computed(() => {
        return filtros.value.idCV !== null &&
               filtros.value.idP !== null &&
               filtros.value.idPr !== null &&
               (filtros.value.idA !== null || filtros.value.idT !== null)
    })
    
    // ============================================
    // ACTIONS
    // ============================================
    
    const setCadenasValor = (cvs: ICadenaValor[]) => {
        cadenasValor.value = cvs
    }
    
    const setEspacios = (esps: IEspacio[]) => {
        espacios.value = esps
    }
    
    const setCVEspacios = (cvEsps: ICVEspacio[]) => {
        cvEspacios.value = cvEsps
    }
    
    const setProyectos = (proys: IProyecto[]) => {
        proyectos.value = proys
    }
    
    const setFiltro = (key: keyof IFiltrosSeleccionados, value: number | null) => {
        filtros.value[key] = value
    }
    
    const setProcesoSeleccionado = (proceso: ProcesoOption | null) => {
        procesoSeleccionado.value = proceso
    }
    
    const setProcesoNiv4Seleccionado = (proceso: ProcesoNiv4Option | null) => {
        procesoNiv4Seleccionado.value = proceso
    }
    
    const setActividadesAsis = (actividades: IActividad[]) => {
        actividadesAsis.value = actividades.map(act => ({
            ...act,
            tTDia: act.tEfecDias + act.tEspDia,
            tTHrs: act.tEfecHrs + act.tEspHrs,
            tTMin: act.tEfecMin + act.tEspMin
        }))
    }
    
    const setActividadesTobe = (actividades: IActividad[]) => {
        actividadesTobe.value = actividades.map(act => ({
            ...act,
            tTDia: act.tEfecDias + act.tEspDia,
            tTHrs: act.tEfecHrs + act.tEspHrs,
            tTMin: act.tEfecMin + act.tEspMin
        }))
    }
    
    const updateActividadAsis = (index: number, updates: Partial<IActividad>) => {
        if (index >= 0 && index < actividadesAsis.value.length) {
            const actividad = { ...actividadesAsis.value[index], ...updates }
            actividad.tTDia = actividad.tEfecDias + actividad.tEspDia
            actividad.tTHrs = actividad.tEfecHrs + actividad.tEspHrs
            actividad.tTMin = actividad.tEfecMin + actividad.tEspMin
            actividadesAsis.value[index] = actividad
        }
    }
    
    const updateActividadTobe = (index: number, updates: Partial<IActividad>) => {
        if (index >= 0 && index < actividadesTobe.value.length) {
            const actividad = { ...actividadesTobe.value[index], ...updates }
            actividad.tTDia = actividad.tEfecDias + actividad.tEspDia
            actividad.tTHrs = actividad.tEfecHrs + actividad.tEspHrs
            actividad.tTMin = actividad.tEfecMin + actividad.tEspMin
            actividadesTobe.value[index] = actividad
        }
    }
    
    const setInfoProyecto = (info: Partial<typeof infoProyecto.value>) => {
        infoProyecto.value = { ...infoProyecto.value, ...info }
    }
    
    const setShowComparacion = (show: boolean) => {
        showComparacion.value = show
    }
    
    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }
    
    const resetFiltros = () => {
        filtros.value = {
            idCV: null,
            idP: null,
            idPr: null,
            idA: null,
            idT: null
        }
        procesoSeleccionado.value = null
        procesoNiv4Seleccionado.value = null
        actividadesAsis.value = []
        actividadesTobe.value = []
        showComparacion.value = false
    }
    
    return {
        // State
        cadenasValor,
        espacios,
        cvEspacios,
        proyectos,
        filtros,
        procesoSeleccionado,
        procesoNiv4Seleccionado,
        actividadesAsis,
        actividadesTobe,
        infoProyecto,
        showComparacion,
        isLoading,
        
        // Getters
        opcionesProcesosNiv4Asis,
        opcionesProcesosNiv4Tobe,
        opcionesDiagramasAsis,
        opcionesDiagramasTobe,
        tiempoTotalAsis,
        tiempoTotalTobe,
        reduccion,
        puedeComparar,
        
        // Actions
        setCadenasValor,
        setEspacios,
        setCVEspacios,
        setProyectos,
        setFiltro,
        setProcesoSeleccionado,
        setProcesoNiv4Seleccionado,
        setActividadesAsis,
        setActividadesTobe,
        updateActividadAsis,
        updateActividadTobe,
        setInfoProyecto,
        setShowComparacion,
        setLoading,
        resetFiltros
    }
})
