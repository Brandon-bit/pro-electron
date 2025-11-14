import type { IColorCalificacion } from '../types/auditorias.types'

export const useAuditoriasUtils = () => {
    // ============================================
    // COLORES POR CALIFICACIÓN
    // ============================================

    const getColorCalificacion = (calificacion: number): IColorCalificacion => {
        if (calificacion >= 90) {
            return {
                badge: 'badge-success',
                border: 'border-success',
                text: 'text-success',
                bg: 'bg-success/10'
            }
        } else if (calificacion >= 70) {
            return {
                badge: 'badge-warning',
                border: 'border-warning',
                text: 'text-warning',
                bg: 'bg-warning/10'
            }
        } else {
            return {
                badge: 'badge-error',
                border: 'border-error',
                text: 'text-error',
                bg: 'bg-error/10'
            }
        }
    }

    // ============================================
    // FORMATEO
    // ============================================

    const formatearCalificacion = (calificacion: number): string => {
        return calificacion.toFixed(2)
    }

    const formatearFecha = (fechaISO: string): string => {
        const fecha = new Date(fechaISO)
        return fecha.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // ============================================
    // VALIDACIONES
    // ============================================

    const esAuditoriaFinalizada = (fechaFin: string | null): boolean => {
        return fechaFin !== null
    }

    const puedeEditarAuditoria = (fechaFin: string | null): boolean => {
        return fechaFin === null
    }

    return {
        getColorCalificacion,
        formatearCalificacion,
        formatearFecha,
        esAuditoriaFinalizada,
        puedeEditarAuditoria
    }
}
