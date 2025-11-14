import { useToast } from 'vue-toastification'
import { useAuditoriasStore } from '../store/auditoriasStore'
import { useAuditoriasCalc } from './useAuditoriasCalc'
import {
    getFormulariosService,
    getAuditoriasService,
    nuevaAuditoriaService,
    terminarAuditoriaService,
    modificarRespuestaService,
    modificarSubdominioService,
    cambiarModoCalculoService
} from '../services/auditoriasServices'
import type { IAuditoria, IDominio, ISubdominio } from '../types/auditorias.types'

export const useAuditoriasActions = () => {
    const toast = useToast()
    const store = useAuditoriasStore()
    const { calcularTodasLasAuditorias, generarListaCalificaciones } = useAuditoriasCalc()

    // Cargar formularios
    const loadFormularios = async (dniProc: number) => {
        try {
            store.setLoading(true)
            const forms = await getFormulariosService(dniProc)
            store.setFormularios(forms)
            return forms
        } catch (error) {
            console.error('[AUDITORIAS] Error cargando formularios:', error)
            toast.error('Error al cargar formularios')
            return []
        } finally {
            store.setLoading(false)
        }
    }

    // Cargar auditorías
    const loadAuditorias = async (dniProc: number, dniForm: number) => {
        try {
            store.setLoading(true)
            const { propuestas, mejoropcion } = await getAuditoriasService(dniProc, dniForm)
            
            // Calcular calificaciones
            calcularTodasLasAuditorias(propuestas, mejoropcion)
            
            store.setAuditorias(propuestas)
            store.setMejoropcion(mejoropcion)
            
            // Abrir auditoría específica si existe
            if (store.dniAu) {
                store.abrirAuditoria(store.dniAu)
            }
            
            return true
        } catch (error) {
            console.error('[AUDITORIAS] Error cargando auditorías:', error)
            toast.error('Error al cargar auditorías')
            return false
        } finally {
            store.setLoading(false)
        }
    }

    // Nueva auditoría
    const nuevaAuditoria = async (descripcion: string) => {
        if (!store.dniProc || !store.dniForm) {
            toast.error('Datos incompletos')
            return false
        }

        try {
            const response = await nuevaAuditoriaService({
                dni: store.dniForm,
                dniProc: store.dniProc,
                descripcion
            })

            if (response.tipo === 'success' && response.m) {
                store.agregarAuditoria(response.m)
                calcularTodasLasAuditorias(store.auditorias, store.mejoropcion)
                toast.success(response.titulo)
                return true
            }
            
            toast.error(response.titulo)
            return false
        } catch (error) {
            console.error('[AUDITORIAS] Error creando auditoría:', error)
            toast.error('Error al crear auditoría')
            return false
        }
    }

    // Terminar auditoría
    const terminarAuditoria = async (auditoria: IAuditoria) => {
        if (!store.dniForm) return false

        try {
            const response = await terminarAuditoriaService(
                { dni: auditoria.dni },
                store.dniForm
            )

            if (response.tipo === 'success' && response.m) {
                store.updateAuditoria(auditoria.dni, {
                    fechaFin: response.m.auditoria.fechaFin,
                    strFechaFin: response.m.auditoria.strFechaFin
                })
                toast.success(response.titulo)
                return true
            }
            
            toast.error(response.titulo)
            return false
        } catch (error) {
            console.error('[AUDITORIAS] Error terminando auditoría:', error)
            toast.error('Error al terminar auditoría')
            return false
        }
    }

    // Modificar evaluación
    const modificarEvaluacion = async (
        auditoria: IAuditoria,
        dominio: IDominio,
        subdominio: ISubdominio
    ) => {
        if (!store.dniForm) return false

        try {
            // Recalcular todas las auditorías
            calcularTodasLasAuditorias(store.auditorias, store.mejoropcion)

            // Generar lista de calificaciones
            const lista = generarListaCalificaciones(store.auditorias)

            const response = await modificarRespuestaService({
                dni: store.dniForm,
                dniProp: auditoria.dni,
                dniDom: dominio.dni,
                dniSub: subdominio.dni,
                evaluacion: subdominio.evaluacion,
                observaciones: subdominio.observaciones,
                lista
            })

            if (response.tipo === 'success') {
                return true
            }
            
            return false
        } catch (error) {
            console.error('[AUDITORIAS] Error modificando evaluación:', error)
            return false
        }
    }

    // Modificar subdominio (mejor opción)
    const modificarSubdominio = async (
        auditoria: IAuditoria,
        dominio: IDominio,
        subdominio: ISubdominio,
        seleccionado: boolean
    ) => {
        if (!store.dniForm) return false

        try {
            // Desmarcar todos los subdominios del dominio
            dominio.Subdominios.forEach(s => {
                s.seleccionado = false
            })
            
            // Marcar el seleccionado
            subdominio.seleccionado = seleccionado

            // Recalcular
            calcularTodasLasAuditorias(store.auditorias, store.mejoropcion)

            const response = await modificarSubdominioService(
                {
                    dniPropuesta: auditoria.dni,
                    dniDominio: dominio.dni,
                    dniSubdominio: subdominio.dni,
                    opcion: seleccionado
                },
                store.dniForm
            )

            return response.tipo === 'success'
        } catch (error) {
            console.error('[AUDITORIAS] Error modificando subdominio:', error)
            return false
        }
    }

    // Cambiar modo de cálculo
    const cambiarModoCalculo = async (mejoropcion: boolean) => {
        if (!store.dniForm) return false

        try {
            const response = await cambiarModoCalculoService(store.dniForm, mejoropcion)
            
            if (response.tipo === 'success') {
                store.setMejoropcion(mejoropcion)
                calcularTodasLasAuditorias(store.auditorias, mejoropcion)
                toast.success(response.titulo)
                return true
            }
            
            toast.error(response.titulo)
            return false
        } catch (error) {
            console.error('[AUDITORIAS] Error cambiando modo:', error)
            toast.error('Error al cambiar modo')
            return false
        }
    }

    return {
        loadFormularios,
        loadAuditorias,
        nuevaAuditoria,
        terminarAuditoria,
        modificarEvaluacion,
        modificarSubdominio,
        cambiarModoCalculo
    }
}
