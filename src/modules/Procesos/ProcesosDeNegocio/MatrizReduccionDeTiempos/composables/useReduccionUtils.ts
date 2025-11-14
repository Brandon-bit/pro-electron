import type { TipoDiagrama, IColorConfig, IActividad, ITiempoTotal } from '../types/reduccion.types'

export const useReduccionUtils = () => {
    // ============================================
    // COLORES POR TIPO
    // ============================================

    const getColorConfig = (tipo: TipoDiagrama): IColorConfig => {
        const colorMap: Record<TipoDiagrama, IColorConfig> = {
            'asis': {
                bg: 'bg-info/10',
                border: 'border-info',
                text: 'text-info',
                badge: 'badge-info'
            },
            'tobe': {
                bg: 'bg-success/10',
                border: 'border-success',
                text: 'text-success',
                badge: 'badge-success'
            }
        }

        return colorMap[tipo]
    }

    // ============================================
    // FORMATEO DE TIEMPOS
    // ============================================

    const formatearTiempo = (dias: number, horas: number, minutos: number): string => {
        const parts: string[] = []
        
        if (dias > 0) parts.push(`${dias}d`)
        if (horas > 0 || dias > 0) parts.push(`${horas}h`)
        parts.push(`${minutos}m`)
        
        return parts.join(' ')
    }

    const formatearTiempoTotal = (tiempo: ITiempoTotal): string => {
        return formatearTiempo(tiempo.ttdias, tiempo.tthrs, tiempo.ttmin)
    }

    // ============================================
    // EXPORTACIÓN (SIMULADA - SOLO FRONTEND)
    // ============================================

    /**
     * Exporta los datos a formato CSV
     * Descarga automáticamente el archivo
     */
    const exportarCSV = (
        actividadesAsis: IActividad[],
        actividadesTobe: IActividad[],
        tiempoTotalAsis: ITiempoTotal,
        tiempoTotalTobe: ITiempoTotal,
        reduccionTiempo: string,
        reduccionActividades: string
    ) => {
        let csv = 'COMPARACIÓN DE PROCESOS - AS-IS vs TO-BE\n\n'
        
        // Resumen
        csv += 'RESUMEN\n'
        csv += `Reducción de Tiempo,${reduccionTiempo}\n`
        csv += `Reducción de Actividades,${reduccionActividades}\n\n`
        
        // Tabla AS-IS
        csv += 'PROCESO AS-IS\n'
        csv += '#,Descripción,Responsable,T.Efectivo (D:H:M),T.Espera (D:H:M),T.Total (D:H:M)\n'
        actividadesAsis.forEach((act, i) => {
            csv += `${i + 1},"${act.descActividad}","${act.responsable}",${act.tEfecDias}:${act.tEfecHrs}:${act.tEfecMin},${act.tEspDia}:${act.tEspHrs}:${act.tEspMin},${act.tTDia}:${act.tTHrs}:${act.tTMin}\n`
        })
        csv += `TOTAL,${actividadesAsis.length},,,,${tiempoTotalAsis.ttdias}:${tiempoTotalAsis.tthrs}:${tiempoTotalAsis.ttmin}\n\n`
        
        // Tabla TO-BE
        csv += 'PROCESO TO-BE\n'
        csv += '#,Descripción,Responsable,T.Efectivo (D:H:M),T.Espera (D:H:M),T.Total (D:H:M)\n'
        actividadesTobe.forEach((act, i) => {
            csv += `${i + 1},"${act.descActividad}","${act.responsable}",${act.tEfecDias}:${act.tEfecHrs}:${act.tEfecMin},${act.tEspDia}:${act.tEspHrs}:${act.tEspMin},${act.tTDia}:${act.tTHrs}:${act.tTMin}\n`
        })
        csv += `TOTAL,${actividadesTobe.length},,,,${tiempoTotalTobe.ttdias}:${tiempoTotalTobe.tthrs}:${tiempoTotalTobe.ttmin}\n`
        
        // Descargar archivo
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        
        link.setAttribute('href', url)
        link.setAttribute('download', `comparacion_procesos_${new Date().getTime()}.csv`)
        link.style.visibility = 'hidden'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    /**
     * Exporta los datos a formato JSON
     * Descarga automáticamente el archivo
     */
    const exportarJSON = (
        actividadesAsis: IActividad[],
        actividadesTobe: IActividad[],
        tiempoTotalAsis: ITiempoTotal,
        tiempoTotalTobe: ITiempoTotal,
        reduccionTiempo: string,
        reduccionActividades: string,
        infoProyecto: any
    ) => {
        const data = {
            fecha: new Date().toISOString(),
            infoProyecto,
            resumen: {
                reduccionTiempo,
                reduccionActividades
            },
            asis: {
                actividades: actividadesAsis,
                total: tiempoTotalAsis
            },
            tobe: {
                actividades: actividadesTobe,
                total: tiempoTotalTobe
            }
        }
        
        const json = JSON.stringify(data, null, 2)
        const blob = new Blob([json], { type: 'application/json' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        
        link.setAttribute('href', url)
        link.setAttribute('download', `comparacion_procesos_${new Date().getTime()}.json`)
        link.style.visibility = 'hidden'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    /**
     * Imprime la comparación (simulado - abre ventana de impresión del navegador)
     */
    const imprimirComparacion = () => {
        window.print()
    }

    // ============================================
    // VALIDACIONES
    // ============================================

    const esNumeroValido = (value: any): boolean => {
        const num = Number(value)
        return !isNaN(num) && num >= 0
    }

    const normalizarNumero = (value: any): number => {
        const num = Number(value)
        return esNumeroValido(value) ? num : 0
    }

    return {
        // Colores
        getColorConfig,
        
        // Formateo
        formatearTiempo,
        formatearTiempoTotal,
        
        // Exportación
        exportarCSV,
        exportarJSON,
        imprimirComparacion,
        
        // Validaciones
        esNumeroValido,
        normalizarNumero
    }
}
