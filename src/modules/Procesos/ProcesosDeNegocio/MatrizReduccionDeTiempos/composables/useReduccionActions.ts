import { useToast } from 'vue-toastification'
import { useReduccionStore } from '../store/reduccionStore'
import {
    getReduccionDataService,
    getCadenasValorService,
    getProyectosService,
    compararDiagramasService
} from '../services/reduccionServices'
import type { ProcesoOption, ProcesoNiv4Option } from '../types/reduccion.types'

export const useReduccionActions = () => {
    const toast = useToast()
    const reduccionStore = useReduccionStore()

    // ============================================
    // INICIALIZACIÓN
    // ============================================

    const loadInitialData = async () => {
        try {
            reduccionStore.setLoading(true)

            const [data, cvs, proyectos] = await Promise.all([
                getReduccionDataService(),
                getCadenasValorService(),
                getProyectosService()
            ])

            reduccionStore.setCadenasValor(cvs)
            reduccionStore.setEspacios(data.espacios)
            reduccionStore.setCVEspacios(data.cvEsps)
            reduccionStore.setProyectos(proyectos)
            reduccionStore.setInfoProyecto({
                area: data.area,
                person: data.person,
                strFechaIni: data.strFechaIni
            })

            // Set default CV
            if (cvs.length > 0) {
                reduccionStore.setFiltro('idCV', cvs[0].dni)
            }

        } catch (error) {
            console.error('[REDUCCION] Error cargando datos iniciales:', error)
            toast.error('Error al cargar datos iniciales')
        } finally {
            reduccionStore.setLoading(false)
        }
    }

    // ============================================
    // FILTROS
    // ============================================

    const selectCadenaValor = (idCV: number) => {
        reduccionStore.setFiltro('idCV', idCV)
        // Reset filtros dependientes
        reduccionStore.setFiltro('idP', null)
        reduccionStore.setFiltro('idPr', null)
        reduccionStore.setFiltro('idA', null)
        reduccionStore.setFiltro('idT', null)
        reduccionStore.setProcesoSeleccionado(null)
        reduccionStore.setProcesoNiv4Seleccionado(null)
        reduccionStore.setShowComparacion(false)
    }

    const selectProceso = (proceso: ProcesoOption) => {
        reduccionStore.setProcesoSeleccionado(proceso)
        
        const esCadenaValor = 'CVProcesos' in proceso
        const id = esCadenaValor ? proceso.dni : proceso.id
        
        reduccionStore.setFiltro('idP', id)
        // Reset filtros dependientes
        reduccionStore.setFiltro('idPr', null)
        reduccionStore.setFiltro('idA', null)
        reduccionStore.setFiltro('idT', null)
        reduccionStore.setProcesoNiv4Seleccionado(null)
        reduccionStore.setShowComparacion(false)
    }

    const selectProcesoNiv4 = (proceso: ProcesoNiv4Option) => {
        reduccionStore.setProcesoNiv4Seleccionado(proceso)
        
        const esCadenaValor = 'CVProcesos' in reduccionStore.procesoSeleccionado!
        const id = esCadenaValor ? proceso.dni : proceso.id
        
        reduccionStore.setFiltro('idPr', id)
        // Reset filtros dependientes
        reduccionStore.setFiltro('idA', null)
        reduccionStore.setFiltro('idT', null)
        reduccionStore.setShowComparacion(false)
    }

    const selectDiagramaAsis = (idDiagrama: number) => {
        reduccionStore.setFiltro('idA', idDiagrama)
        reduccionStore.setShowComparacion(false)
    }

    const selectDiagramaTobe = (idDiagrama: number) => {
        reduccionStore.setFiltro('idT', idDiagrama)
        reduccionStore.setShowComparacion(false)
    }

    // ============================================
    // COMPARACIÓN
    // ============================================

    const compararDiagramas = async () => {
        if (!reduccionStore.puedeComparar) {
            toast.error('Selecciona al menos un diagrama ASIS o TOBE')
            return false
        }

        try {
            reduccionStore.setLoading(true)

            const response = await compararDiagramasService({
                idCV: reduccionStore.filtros.idCV!,
                idP: reduccionStore.filtros.idP!,
                idPr: reduccionStore.filtros.idPr!,
                idA: reduccionStore.filtros.idA,
                idT: reduccionStore.filtros.idT
            })

            if (response.status === 'success' && response.data) {
                reduccionStore.setActividadesAsis(response.data.Asis)
                reduccionStore.setActividadesTobe(response.data.Tobes)
                reduccionStore.setShowComparacion(true)
                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al comparar diagramas')
                return false
            }

        } catch (error) {
            console.error('[REDUCCION] Error comparando diagramas:', error)
            toast.error('Error al comparar diagramas')
            return false
        } finally {
            reduccionStore.setLoading(false)
        }
    }

    // ============================================
    // EDICIÓN DE TIEMPOS
    // ============================================

    const updateTiempoEsperaAsis = (index: number, field: 'tEspDia' | 'tEspHrs' | 'tEspMin', value: number) => {
        reduccionStore.updateActividadAsis(index, { [field]: value })
    }

    const updateTiempoEsperaTobe = (index: number, field: 'tEspDia' | 'tEspHrs' | 'tEspMin', value: number) => {
        reduccionStore.updateActividadTobe(index, { [field]: value })
    }

    return {
        // Inicialización
        loadInitialData,

        // Filtros
        selectCadenaValor,
        selectProceso,
        selectProcesoNiv4,
        selectDiagramaAsis,
        selectDiagramaTobe,

        // Comparación
        compararDiagramas,

        // Edición
        updateTiempoEsperaAsis,
        updateTiempoEsperaTobe
    }
}
