import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    ICadenaValor,
    IEspacio,
    ICVEspacio,
    IUsuario,
    IVoBoProceso,
    IVoBoOla,
    IVoBoManual,
    IVoBoFiltro,
    IProceso
} from '../types/vobo.types'

export const useVoBoStore = defineStore('voboStore', () => {
    // ============================================
    // STATE
    // ============================================
    
    // Datos maestros
    const cadenasValor = ref<ICadenaValor[]>([])
    const usuarios = ref<IUsuario[]>([])
    
    // Datos completos (sin filtrar)
    const allVoBosProcesos = ref<IVoBoProceso[]>([])
    const allVoBosOlas = ref<IVoBoOla[]>([])
    const allVoBosManuales = ref<IVoBoManual[]>([])
    
    // Datos filtrados (mostrados en las tablas)
    const vobosProcesos = ref<IVoBoProceso[]>([])
    const vobosOlas = ref<IVoBoOla[]>([])
    const vobosManuales = ref<IVoBoManual[]>([])
    
    // Espacios y procesos (dependientes de filtros)
    const espacios = ref<IEspacio[]>([])
    const cvEspacios = ref<ICVEspacio[]>([])
    const procesosAsIs = ref<IProceso[]>([])
    const procesosToBe = ref<IProceso[]>([])
    
    // Filtros
    const filtro = ref<IVoBoFiltro>({
        dniCV: 0,
        dniEsp: 0,
        dniProc: 0
    })
    
    // Loading states
    const isLoading = ref(false)
    const isLoadingEspacios = ref(false)
    
    // ============================================
    // GETTERS
    // ============================================
    
    const hasFiltroCV = computed(() => filtro.value.dniCV > 0)
    const hasFiltroEsp = computed(() => filtro.value.dniEsp > 0)
    const hasFiltroProc = computed(() => filtro.value.dniProc > 0)
    
    // ============================================
    // ACTIONS
    // ============================================
    
    const setDataInicial = (data: {
        cvs: ICadenaValor[]
        usuarios: IUsuario[]
        procesos: IVoBoProceso[]
        olas: IVoBoOla[]
        manuales: IVoBoManual[]
    }) => {
        cadenasValor.value = data.cvs
        usuarios.value = data.usuarios
        allVoBosProcesos.value = data.procesos
        allVoBosOlas.value = data.olas
        allVoBosManuales.value = data.manuales
    }
    
    const setEspacios = (data: { espacios: IEspacio[], cvEsps: ICVEspacio[] }) => {
        espacios.value = data.espacios
        cvEspacios.value = data.cvEsps
    }
    
    const setFiltroCV = (dniCV: number) => {
        filtro.value.dniCV = dniCV
        // Resetear filtros dependientes
        filtro.value.dniEsp = 0
        filtro.value.dniProc = 0
        procesosAsIs.value = []
        procesosToBe.value = []
    }
    
    const setFiltroEsp = (dniEsp: number) => {
        filtro.value.dniEsp = dniEsp
        // Resetear filtro de proceso
        filtro.value.dniProc = 0
        
        // Buscar procesos del espacio seleccionado
        procesosAsIs.value = []
        procesosToBe.value = []
        
        // Buscar en espacios normales
        const espacio = espacios.value.find(e => e.id === dniEsp)
        if (espacio) {
            espacio.Procesos.forEach(p => {
                if (p.asis) {
                    procesosAsIs.value.push(p)
                } else {
                    procesosToBe.value.push(p)
                }
            })
        }
        
        // Buscar en espacios de CV
        const cvEsp = cvEspacios.value.find(e => e.dni === dniEsp)
        if (cvEsp) {
            cvEsp.CVProcesos.forEach(p => {
                if (p.asis) {
                    procesosAsIs.value.push(p)
                } else {
                    procesosToBe.value.push(p)
                }
            })
        }
    }
    
    const setFiltroProc = (dniProc: number) => {
        filtro.value.dniProc = dniProc
        
        // Filtrar VoBos por proceso
        vobosProcesos.value = allVoBosProcesos.value.filter(v => v.Proceso.id === dniProc)
        vobosOlas.value = allVoBosOlas.value.filter(v => v.Proceso.id === dniProc)
        vobosManuales.value = allVoBosManuales.value.filter(v => v.Proceso.id === dniProc)
    }
    
    const addVoBoManual = (vobo: IVoBoManual) => {
        allVoBosManuales.value.push(vobo)
        vobosManuales.value.push(vobo)
    }
    
    const removeVoBoManual = (vobo: IVoBoManual) => {
        const allIndex = allVoBosManuales.value.findIndex(v => v.dni === vobo.dni)
        if (allIndex !== -1) {
            allVoBosManuales.value.splice(allIndex, 1)
        }
        
        const filteredIndex = vobosManuales.value.findIndex(v => v.dni === vobo.dni)
        if (filteredIndex !== -1) {
            vobosManuales.value.splice(filteredIndex, 1)
        }
    }
    
    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }
    
    const setLoadingEspacios = (loading: boolean) => {
        isLoadingEspacios.value = loading
    }
    
    const resetStore = () => {
        cadenasValor.value = []
        usuarios.value = []
        allVoBosProcesos.value = []
        allVoBosOlas.value = []
        allVoBosManuales.value = []
        vobosProcesos.value = []
        vobosOlas.value = []
        vobosManuales.value = []
        espacios.value = []
        cvEspacios.value = []
        procesosAsIs.value = []
        procesosToBe.value = []
        filtro.value = { dniCV: 0, dniEsp: 0, dniProc: 0 }
    }
    
    return {
        // State
        cadenasValor,
        usuarios,
        allVoBosProcesos,
        allVoBosOlas,
        allVoBosManuales,
        vobosProcesos,
        vobosOlas,
        vobosManuales,
        espacios,
        cvEspacios,
        procesosAsIs,
        procesosToBe,
        filtro,
        isLoading,
        isLoadingEspacios,
        
        // Getters
        hasFiltroCV,
        hasFiltroEsp,
        hasFiltroProc,
        
        // Actions
        setDataInicial,
        setEspacios,
        setFiltroCV,
        setFiltroEsp,
        setFiltroProc,
        addVoBoManual,
        removeVoBoManual,
        setLoading,
        setLoadingEspacios,
        resetStore
    }
})
