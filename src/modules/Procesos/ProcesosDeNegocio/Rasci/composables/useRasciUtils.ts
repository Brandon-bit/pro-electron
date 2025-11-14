import type {
    IColorAccountable,
    IColorTotal,
    EstadoAccountable,
    EstadoTotal,
    IActividad,
    ITotalRasci,
    IEstadisticasRasci,
    IRol
} from '../types/rasci.types'

export const useRasciUtils = () => {
    // ============================================
    // COLORES
    // ============================================

    // Determinar estado de accountable (1=óptimo, 2=aceptable, 3+=problema)
    const getEstadoAccountable = (numAccountables: number): EstadoAccountable => {
        if (numAccountables === 1) return 'optimo'
        if (numAccountables === 2) return 'aceptable'
        return 'problema'
    }

    // Colores para columna de Accountables
    const getColorAccountable = (numAccountables: number): IColorAccountable => {
        const estado = getEstadoAccountable(numAccountables)
        
        const colorMap: Record<EstadoAccountable, IColorAccountable> = {
            'optimo': {
                bg: 'bg-success',
                text: 'text-success',
                badge: 'badge-success'
            },
            'aceptable': {
                bg: 'bg-warning',
                text: 'text-warning',
                badge: 'badge-warning'
            },
            'problema': {
                bg: 'bg-error',
                text: 'text-error',
                badge: 'badge-error'
            }
        }
        
        return colorMap[estado]
    }

    // Determinar estado de total (0=ninguno, 1-8=bajo, 9+=alto)
    const getEstadoTotal = (total: number): EstadoTotal => {
        if (total === 0) return 'ninguno'
        if (total >= 1 && total <= 8) return 'bajo'
        return 'alto'
    }

    // Colores para fila de totales
    const getColorTotal = (total: number): IColorTotal => {
        const estado = getEstadoTotal(total)
        
        const colorMap: Record<EstadoTotal, IColorTotal> = {
            'ninguno': {
                bg: 'bg-error',
                text: 'text-error'
            },
            'bajo': {
                bg: 'bg-warning',
                text: 'text-warning'
            },
            'alto': {
                bg: 'bg-success',
                text: 'text-success'
            }
        }
        
        return colorMap[estado]
    }

    // ============================================
    // FORMATEO
    // ============================================

    // Parsear valor RASCI a checkboxes
    const parseValorToCheckboxes = (valor: string) => {
        return {
            R: valor.includes('R'),
            A: valor.includes('A'),
            S: valor.includes('S'),
            C: valor.includes('C'),
            I: valor.includes('I')
        }
    }

    // Formatear valor para mostrar con badges
    const formatearValorRasci = (valor: string): string[] => {
        if (!valor || valor.trim() === '') return []
        return valor.split('/').filter(v => v.trim() !== '')
    }

    // ============================================
    // EXPORTACIÓN (SIMULADA - SOLO FRONTEND)
    // ============================================

    /**
     * Exporta a CSV
     */
    const exportarCSV = (
        roles: IRol[],
        actividades: IActividad[],
        totales: ITotalRasci[],
        nombreProceso: string,
        incluirEstadisticas: boolean = true,
        estadisticas?: IEstadisticasRasci
    ) => {
        let csv = `MATRIZ RASCI - ${nombreProceso}\n\n`
        
        // Estadísticas (opcional)
        if (incluirEstadisticas && estadisticas) {
            csv += 'ESTADÍSTICAS\n'
            csv += `Total de Actividades,${estadisticas.totalActividades}\n`
            csv += `Total de Roles,${estadisticas.totalRoles}\n`
            csv += `Total de Asignaciones,${estadisticas.totalAsignaciones}\n`
            csv += `Promedio Asignaciones por Rol,${estadisticas.promedioAsignacionesPorRol}\n`
            csv += `Actividades sin Accountable,${estadisticas.actividadesSinAccountable}\n`
            csv += `Actividades con Múltiples Accountables,${estadisticas.actividadesConMultiplesAccountables}\n`
            csv += `Roles sin Asignaciones,${estadisticas.rolesSinAsignaciones}\n\n`
        }
        
        // Leyenda
        csv += 'LEYENDA\n'
        csv += 'R - Responsable\n'
        csv += 'A - Accountable\n'
        csv += 'S - Soporte\n'
        csv += 'C - Consultado\n'
        csv += 'I - Informado\n\n'
        
        // Encabezados
        csv += 'Actividad'
        roles.forEach(rol => {
            csv += `,${rol.titulo}`
        })
        csv += ',No. Accountable\n'
        
        // Actividades
        actividades.forEach(act => {
            csv += `"${act.titulo}"`
            act.Valores.forEach(v => {
                csv += `,${v.valor || '-'}`
            })
            csv += `,${act.acc || 0}\n`
        })
        
        // Totales
        csv += '\nTOTALES\n'
        totales.forEach(t => {
            csv += t.name
            t.val.forEach(v => {
                csv += `,${v}`
            })
            csv += '\n'
        })
        
        // Descargar
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        
        link.setAttribute('href', url)
        link.setAttribute('download', `matriz_rasci_${nombreProceso.replace(/\s/g, '_')}_${new Date().getTime()}.csv`)
        link.style.visibility = 'hidden'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    /**
     * Exporta a Excel (simulado como CSV mejorado)
     */
    const exportarExcel = (
        roles: IRol[],
        actividades: IActividad[],
        totales: ITotalRasci[],
        nombreProceso: string,
        incluirEstadisticas: boolean = true,
        estadisticas?: IEstadisticasRasci
    ) => {
        // Por ahora, exportar como CSV con extensión .xls
        // En producción, se usaría una librería como xlsx
        exportarCSV(roles, actividades, totales, nombreProceso, incluirEstadisticas, estadisticas)
    }

    /**
     * Exporta a PDF (simulado - abre ventana de impresión)
     */
    const exportarPDF = () => {
        window.print()
    }

    // ============================================
    // VALIDACIONES
    // ============================================

    // Validar si hay al menos un A en cada actividad
    const validarAccountables = (actividades: IActividad[]): boolean => {
        return actividades.every(act => (act.acc || 0) >= 1)
    }

    return {
        // Colores
        getEstadoAccountable,
        getColorAccountable,
        getEstadoTotal,
        getColorTotal,
        
        // Formateo
        parseValorToCheckboxes,
        formatearValorRasci,
        
        // Exportación
        exportarCSV,
        exportarExcel,
        exportarPDF,
        
        // Validaciones
        validarAccountables
    }
}
