import type { IKPIsPuesto, IColorKPI } from '../types/tiempos.types'

export const useTiemposUtils = () => {
    // ============================================
    // VALIDACIONES
    // ============================================

    const validarFormatoTiempo = (str: string): boolean => {
        const regex = /^(0[0-9]|[1-9][0-9]):(0[0-9]|[1-9][0-9]):(0[0-9]|[1-9][0-9])$/
        return regex.test(str)
    }

    const validarFormatoHora = (str: string): boolean => {
        const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/
        return regex.test(str)
    }

    // ============================================
    // COLORES POR KPI
    // ============================================

    const getColorOperacionLaboral = (valor: number): IColorKPI => {
        if (valor >= 80) {
            return {
                bg: 'bg-success/10',
                text: 'text-success',
                border: 'border-success'
            }
        } else if (valor >= 50) {
            return {
                bg: 'bg-warning/10',
                text: 'text-warning',
                border: 'border-warning'
            }
        } else {
            return {
                bg: 'bg-error/10',
                text: 'text-error',
                border: 'border-error'
            }
        }
    }

    const getColorEfectividad = (valor: number): IColorKPI => {
        // Menor es mejor
        if (valor <= 15) {
            return {
                bg: 'bg-success/10',
                text: 'text-success',
                border: 'border-success'
            }
        } else if (valor <= 30) {
            return {
                bg: 'bg-warning/10',
                text: 'text-warning',
                border: 'border-warning'
            }
        } else {
            return {
                bg: 'bg-error/10',
                text: 'text-error',
                border: 'border-error'
            }
        }
    }

    // ============================================
    // FORMATEO
    // ============================================

    const formatearNumero = (num: number, decimales: number = 2): string => {
        return num.toFixed(decimales)
    }

    const formatearPorcentaje = (num: number): string => {
        return `${formatearNumero(num)}%`
    }

    // ============================================
    // EXPORTACIÓN (SIMULADA - FRONTEND ONLY)
    // ============================================

    const exportarCSV = (
        tabla: any,
        kpis: any,
        nombreProceso: string
    ) => {
        let csv = `TIEMPOS Y MOVIMIENTOS - ${nombreProceso}\n\n`

        // KPIs Globales
        csv += 'KPIS GLOBALES\n'
        csv += `Total Áreas,${kpis.totalAreas}\n`
        csv += `Total Puestos,${kpis.totalPuestos}\n`
        csv += `Total Actividades,${kpis.totalActividades}\n`
        csv += `Actividades Activas,${kpis.actividadesActivas}\n`
        csv += `Promedio Efectividad,${kpis.promedioEfectividad}%\n`
        csv += `Mayor Efectividad,${kpis.mayorEfectividad.nombre} (${kpis.mayorEfectividad.valor}%)\n`
        csv += `Menor Efectividad,${kpis.menorEfectividad.nombre} (${kpis.menorEfectividad.valor}%)\n\n`

        // Datos por área
        tabla.Lista.forEach((tm: any) => {
            csv += `\nÁREA: ${tm.nombre}\n`
            csv += '=' .repeat(60) + '\n\n'

            tm.Puestos.forEach((puesto: any) => {
                csv += `PUESTO: ${puesto.nombre}\n`
                csv += `Tiempo Acumulado,${puesto.strTiempoAcumulado || '0d:00:00:00'}\n`
                csv += `Tiempos Muertos,${puesto.strTiemposMuertos || '00:00:00'}\n`
                csv += `Horas Trabajo,${puesto.horasTrabajo}\n`
                csv += `% Operación Laboral,${puesto.operacionLaboral || 0}%\n`
                csv += `% Efectividad,${puesto.efectividadOperacional || 0}%\n\n`

                csv += 'Actividades:\n'
                csv += 'Nombre,Días,Tiempo Muerto,Frecuencia,Personas,Recomendaciones\n'

                puesto.Actividades.forEach((act: any) => {
                    csv += `"${act.nombre}",${act.dias},${act.strTiempoMuerto},${act.frecuencia},${act.personas},"${act.recomendaciones}"\n`
                })

                csv += '\n'
            })
        })

        // Descargar
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)

        link.setAttribute('href', url)
        link.setAttribute('download', `tiempos_movimientos_${nombreProceso.replace(/\s/g, '_')}_${new Date().getTime()}.csv`)
        link.style.visibility = 'hidden'

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const exportarExcel = (tabla: any, kpis: any, nombreProceso: string) => {
        // Simulado como CSV con extensión .xls
        exportarCSV(tabla, kpis, nombreProceso)
    }

    const exportarPDF = () => {
        window.print()
    }

    return {
        // Validaciones
        validarFormatoTiempo,
        validarFormatoHora,

        // Colores
        getColorOperacionLaboral,
        getColorEfectividad,

        // Formateo
        formatearNumero,
        formatearPorcentaje,

        // Exportación
        exportarCSV,
        exportarExcel,
        exportarPDF
    }
}
