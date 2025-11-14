import { useToast } from 'vue-toastification'
import { useTiemposStore } from '../store/tiemposStore'
import { iniciarCronoService, finalizarCronoService } from '../services/tiemposServices'
import type { IActividad, IDateTime, IDateDiff } from '../types/tiempos.types'

export const useCronometros = () => {
    const toast = useToast()
    const tiemposStore = useTiemposStore()

    // Mapa de intervalos activos
    const intervalos = new Map<number, any>()

    // ============================================
    // INICIAR CRONÓMETRO
    // ============================================

    const iniciarCronometro = async (dniTM: number, dniP: number, dniAct: number) => {
        try {
            const response = await iniciarCronoService({ dniTM, dniP, dniAct })

            if (response.status === 'success' && response.data) {
                // Actualizar en store
                tiemposStore.updateActividad(dniTM, dniP, dniAct, {
                    activa: true,
                    Start: response.data.Start
                })

                // Iniciar intervalo
                iniciarIntervalo(dniTM, dniP, dniAct)

                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al iniciar cronómetro')
                return false
            }
        } catch (error) {
            console.error('[CRONOMETROS] Error iniciando:', error)
            toast.error('Error al iniciar cronómetro')
            return false
        }
    }

    // ============================================
    // FINALIZAR CRONÓMETRO
    // ============================================

    const finalizarCronometro = async (dniTM: number, dniP: number, dniAct: number) => {
        try {
            const response = await finalizarCronoService({ dniTM, dniP, dniAct })

            if (response.status === 'success' && response.data) {
                // Detener intervalo
                detenerIntervalo(dniAct)

                // Calcular diff final
                const tm = tiemposStore.tabla.Lista.find(t => t.dni === dniTM)
                if (tm) {
                    const puesto = tm.Puestos.find(p => p.dni === dniP)
                    if (puesto) {
                        const actividad = puesto.Actividades.find(a => a.dni === dniAct)
                        if (actividad && actividad.Start && response.data.End) {
                            const diff = calcularDiff(actividad.Start, response.data.End)
                            
                            tiemposStore.updateActividad(dniTM, dniP, dniAct, {
                                activa: false,
                                finalizada: true,
                                End: response.data.End,
                                dateDiff: diff
                            })
                        }
                    }
                }

                toast.success(response.message)
                return true
            } else {
                toast.error(response.message || 'Error al finalizar cronómetro')
                return false
            }
        } catch (error) {
            console.error('[CRONOMETROS] Error finalizando:', error)
            toast.error('Error al finalizar cronómetro')
            return false
        }
    }

    // ============================================
    // GESTIÓN DE INTERVALOS
    // ============================================

    const iniciarIntervalo = (dniTM: number, dniP: number, dniAct: number) => {
        // Limpiar intervalo existente
        if (intervalos.has(dniAct)) {
            clearInterval(intervalos.get(dniAct))
        }

        const intervalo = setInterval(() => {
            const tm = tiemposStore.tabla.Lista.find(t => t.dni === dniTM)
            if (!tm) return

            const puesto = tm.Puestos.find(p => p.dni === dniP)
            if (!puesto) return

            const actividad = puesto.Actividades.find(a => a.dni === dniAct)
            if (!actividad || !actividad.Start) return

            // Calcular diff desde Start hasta ahora
            const diff = calcularDiff(actividad.Start)
            
            tiemposStore.updateActividad(dniTM, dniP, dniAct, {
                dateDiff: diff
            })
        }, 1000)

        intervalos.set(dniAct, intervalo)
    }

    const detenerIntervalo = (dniAct: number) => {
        if (intervalos.has(dniAct)) {
            clearInterval(intervalos.get(dniAct))
            intervalos.delete(dniAct)
        }
    }

    const detenerTodosLosIntervalos = () => {
        intervalos.forEach((intervalo) => {
            clearInterval(intervalo)
        })
        intervalos.clear()
    }

    // ============================================
    // RECUPERAR CRONÓMETROS AL MONTAR
    // ============================================

    const recuperarCronometros = () => {
        tiemposStore.tabla.Lista.forEach(tm => {
            tm.Puestos.forEach(puesto => {
                puesto.Actividades.forEach(actividad => {
                    if (actividad.activa && !actividad.finalizada && actividad.Start) {
                        // Reiniciar intervalo para actividades activas
                        iniciarIntervalo(tm.dni, puesto.dni, actividad.dni)
                    } else if (actividad.finalizada && actividad.Start && actividad.End) {
                        // Recalcular diff para actividades finalizadas
                        const diff = calcularDiff(actividad.Start, actividad.End)
                        tiemposStore.updateActividad(tm.dni, puesto.dni, actividad.dni, {
                            dateDiff: diff
                        })
                    }
                })
            })
        })
    }

    // ============================================
    // CÁLCULOS DE TIEMPO
    // ============================================

    const calcularDiff = (start: IDateTime, end?: IDateTime): IDateDiff => {
        const startDate = dateTimeToDate(start)
        const endDate = end ? dateTimeToDate(end) : new Date()

        const diffMs = endDate.getTime() - startDate.getTime()
        const diffSeconds = Math.floor(diffMs / 1000)

        const months = Math.floor(diffSeconds / (30 * 24 * 3600))
        const days = Math.floor((diffSeconds % (30 * 24 * 3600)) / (24 * 3600))
        const hours = Math.floor((diffSeconds % (24 * 3600)) / 3600)
        const minutes = Math.floor((diffSeconds % 3600) / 60)
        const seconds = diffSeconds % 60

        return { months, days, hours, minutes, seconds }
    }

    const dateTimeToDate = (dt: IDateTime): Date => {
        return new Date(dt.year, dt.month - 1, dt.day, dt.hour, dt.minute, dt.second)
    }

    const formatearDiff = (diff?: IDateDiff): string => {
        if (!diff) return '00:00:00'

        const parts: string[] = []

        if (diff.months > 0) {
            parts.push(`${String(diff.months).padStart(2, '0')}m`)
        }
        if (diff.days > 0) {
            parts.push(`${String(diff.days).padStart(2, '0')}d`)
        }
        if (diff.hours > 0 || diff.days > 0 || diff.months > 0) {
            parts.push(`${String(diff.hours).padStart(2, '0')}h`)
        }
        if (diff.minutes > 0 || diff.hours > 0 || diff.days > 0 || diff.months > 0) {
            parts.push(`${String(diff.minutes).padStart(2, '0')}min`)
        }
        parts.push(`${String(Math.round(diff.seconds)).padStart(2, '0')}s`)

        return parts.join(' ')
    }

    return {
        // Acciones
        iniciarCronometro,
        finalizarCronometro,
        recuperarCronometros,
        detenerTodosLosIntervalos,

        // Utilidades
        calcularDiff,
        formatearDiff
    }
}
