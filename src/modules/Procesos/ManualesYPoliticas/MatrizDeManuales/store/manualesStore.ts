import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    ICadenaValor,
    IManual,
    INivel1,
    IEspacio,
    IManualesState
} from '../types/manuales.types'

export const useManualesStore = defineStore('manualesStore', () => {
    // ============================================
    // STATE
    // ============================================

    const cadenasValor = ref<ICadenaValor[]>([])
    const cvSeleccionada = ref<ICadenaValor | null>(null)
    const manualesCV = ref<IManual[]>([])
    const manuales = ref<IManual[]>([])
    const niveles1 = ref<INivel1[]>([])
    const espacios = ref<IEspacio[]>([])
    const isLoading = ref(false)
    
    const currentUser = ref({
        isOwner: false, // Simular rol
        canEdit: true
    })

    // ============================================
    // GETTERS
    // ============================================

    const hayDatos = computed(() => {
        return cvSeleccionada.value !== null
    })

    const totalManualesCV = computed(() => {
        return manualesCV.value.length
    })

    const totalManuales = computed(() => {
        return manuales.value.length
    })

    const manualesHabilitados = computed(() => {
        return manuales.value.filter(m => m.habilitado === true).length
    })

    const manualesDeshabilitados = computed(() => {
        return manuales.value.filter(m => m.habilitado === false).length
    })

    const totalArchivos = computed(() => {
        let count = 0
        manualesCV.value.forEach(m => {
            count += m.Manuales.length + m.Soporte.length
        })
        manuales.value.forEach(m => {
            count += m.Manuales.length + m.Soporte.length
        })
        return count
    })

    const totalAuditorias = computed(() => {
        let count = 0
        manualesCV.value.forEach(m => {
            count += m.HistorialAu.length
        })
        manuales.value.forEach(m => {
            count += m.HistorialAu.length
        })
        return count
    })

    const promedioGlobalAuditorias = computed(() => {
        const todos = [...manualesCV.value, ...manuales.value]
        const conAuditorias = todos.filter(m => m.HistorialAu.length > 0)
        
        if (conAuditorias.length === 0) return 0
        
        const suma = conAuditorias.reduce((acc, m) => acc + m.promedioAuditorias, 0)
        return Math.round((suma / conAuditorias.length) * 100) / 100
    })

    // ============================================
    // ACTIONS
    // ============================================

    const setCadenasValor = (cvs: ICadenaValor[]) => {
        cadenasValor.value = cvs
    }

    const setCV = (cv: ICadenaValor | null) => {
        cvSeleccionada.value = cv
    }

    const setManualesCV = (lista: IManual[]) => {
        manualesCV.value = lista
    }

    const setManuales = (lista: IManual[]) => {
        manuales.value = lista
    }

    const setNiveles1 = (lista: INivel1[]) => {
        niveles1.value = JSON.parse(JSON.stringify(lista))
    }

    const setEspacios = (lista: IEspacio[]) => {
        espacios.value = JSON.parse(JSON.stringify(lista))
    }

    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }

    const setUserRole = (isOwner: boolean, canEdit: boolean = true) => {
        currentUser.value = { isOwner, canEdit }
    }

    const agregarManual = (manual: IManual) => {
        manuales.value.push(manual)
    }

    const eliminarManual = (dni: number) => {
        const index = manuales.value.findIndex(m => m.dni === dni)
        if (index !== -1) {
            manuales.value.splice(index, 1)
        }
    }

    const toggleHabilitado = (dni: number) => {
        const manual = manuales.value.find(m => m.dni === dni)
        if (manual) {
            manual.habilitado = !manual.habilitado
        }
    }

    const agregarArchivo = (dniManual: number, archivo: any, tipo: 'version' | 'soporte') => {
        // Buscar en manualesCV
        let manual = manualesCV.value.find(m => m.dni === dniManual)
        if (!manual) {
            manual = manuales.value.find(m => m.dni === dniManual)
        }

        if (manual) {
            if (tipo === 'version') {
                manual.Manuales.push(archivo)
            } else {
                manual.Soporte.push(archivo)
            }
        }
    }

    const eliminarArchivo = (dniManual: number, dniArchivo: number, tipo: 'version' | 'soporte') => {
        // Buscar en manualesCV
        let manual = manualesCV.value.find(m => m.dni === dniManual)
        if (!manual) {
            manual = manuales.value.find(m => m.dni === dniManual)
        }

        if (manual) {
            const lista = tipo === 'version' ? manual.Manuales : manual.Soporte
            const index = lista.findIndex(a => a.dni === dniArchivo)
            if (index !== -1) {
                lista.splice(index, 1)
            }
        }
    }

    const reset = () => {
        cvSeleccionada.value = null
        manualesCV.value = []
        manuales.value = []
    }

    return {
        // State
        cadenasValor,
        cvSeleccionada,
        manualesCV,
        manuales,
        niveles1,
        espacios,
        isLoading,
        currentUser,

        // Getters
        hayDatos,
        totalManualesCV,
        totalManuales,
        manualesHabilitados,
        manualesDeshabilitados,
        totalArchivos,
        totalAuditorias,
        promedioGlobalAuditorias,

        // Actions
        setCadenasValor,
        setCV,
        setManualesCV,
        setManuales,
        setNiveles1,
        setEspacios,
        setLoading,
        setUserRole,
        agregarManual,
        eliminarManual,
        toggleHabilitado,
        agregarArchivo,
        eliminarArchivo,
        reset
    }
})
