import { ref, onUnmounted } from 'vue'
import type { IFase, ITimeDiff, FaseEstado, IFaseColorConfig } from '../types/metodologia.types'

export const useMetodologiaUtils = () => {
    // ============================================
    // ESTADO DE FASE
    // ============================================

    const getFaseEstado = (fase: IFase): FaseEstado => {
        if (fase.finalizada) return 'finalizada'
        if (fase.activa) return 'activa'
        return 'no-iniciada'
    }

    // ============================================
    // COLORES POR ESTADO
    // ============================================

    const getFaseColors = (estado: FaseEstado): IFaseColorConfig => {
        const colorMap: Record<FaseEstado, IFaseColorConfig> = {
            'no-iniciada': {
                bg: 'bg-base-200',
                border: 'border-base-300',
                text: 'text-base-content',
                badge: 'badge-ghost'
            },
            'activa': {
                bg: 'bg-info/10',
                border: 'border-info',
                text: 'text-info',
                badge: 'badge-info'
            },
            'finalizada': {
                bg: 'bg-success/10',
                border: 'border-success',
                text: 'text-success',
                badge: 'badge-success'
            }
        }

        return colorMap[estado]
    }

    // ============================================
    // PROGRESO DE FASE
    // ============================================

    const calcularProgreso = (fase: IFase): number => {
        if (fase.Actividades.length === 0) return 0
        
        const completadas = fase.Actividades.filter(a => a.finalizada).length
        return Math.round((completadas / fase.Actividades.length) * 100)
    }

    // ============================================
    // CRONÓMETRO
    // ============================================

    /**
     * Calcula la diferencia de tiempo entre dos fechas
     */
    const calculateTimeDiff = (startDate: string, endDate?: string): ITimeDiff => {
        const start = new Date(startDate)
        const end = endDate ? new Date(endDate) : new Date()
        
        const diffMs = end.getTime() - start.getTime()
        
        // Calcular cada componente
        const seconds = Math.floor(diffMs / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const months = Math.floor(days / 30) // Aproximado
        
        return {
            months: months,
            days: days % 30,
            hours: hours % 24,
            minutes: minutes % 60,
            seconds: seconds % 60
        }
    }

    /**
     * Formatea el tiempo para mostrar
     */
    const formatTimeDiff = (timeDiff: ITimeDiff): string => {
        const parts: string[] = []
        
        if (timeDiff.months > 0) {
            parts.push(`${timeDiff.months}m`)
        }
        if (timeDiff.days > 0 || timeDiff.months > 0) {
            parts.push(`${timeDiff.days}d`)
        }
        
        const hours = String(timeDiff.hours).padStart(2, '0')
        const minutes = String(timeDiff.minutes).padStart(2, '0')
        const seconds = String(Math.floor(timeDiff.seconds)).padStart(2, '0')
        
        parts.push(`${hours}:${minutes}:${seconds}`)
        
        return parts.join(' ')
    }

    /**
     * Hook para cronómetro en tiempo real
     */
    const useCronometro = (fase: IFase) => {
        const timeDiff = ref<ITimeDiff>({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })
        let intervalId: number | null = null

        const start = () => {
            if (!fase.Start) return
            
            // Calcular inmediatamente
            timeDiff.value = calculateTimeDiff(fase.Start, fase.End)
            
            // Si la fase está finalizada, no iniciar intervalo
            if (fase.finalizada) return
            
            // Actualizar cada segundo
            intervalId = window.setInterval(() => {
                if (fase.Start) {
                    timeDiff.value = calculateTimeDiff(fase.Start, fase.End)
                }
            }, 1000)
        }

        const stop = () => {
            if (intervalId !== null) {
                clearInterval(intervalId)
                intervalId = null
            }
        }

        // Limpiar al desmontar
        onUnmounted(() => {
            stop()
        })

        return {
            timeDiff,
            start,
            stop
        }
    }

    // ============================================
    // VALIDACIONES
    // ============================================

    const puedeAgregarActividad = (fase: IFase): boolean => {
        return !fase.finalizada
    }

    const puedeEliminarActividad = (fase: IFase): boolean => {
        return !fase.finalizada
    }

    const puedeMarcarActividad = (fase: IFase, actividadFinalizada: boolean): boolean => {
        return !fase.finalizada && !actividadFinalizada
    }

    // ============================================
    // ICONOS
    // ============================================

    const getFaseIcon = (estado: FaseEstado): string => {
        const iconMap: Record<FaseEstado, string> = {
            'no-iniciada': 'radio_button_unchecked',
            'activa': 'pending',
            'finalizada': 'check_circle'
        }
        return iconMap[estado]
    }

    return {
        // Estado
        getFaseEstado,
        getFaseColors,
        
        // Progreso
        calcularProgreso,
        
        // Cronómetro
        calculateTimeDiff,
        formatTimeDiff,
        useCronometro,
        
        // Validaciones
        puedeAgregarActividad,
        puedeEliminarActividad,
        puedeMarcarActividad,
        
        // UI
        getFaseIcon
    }
}
