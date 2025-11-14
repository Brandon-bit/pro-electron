import type { IManual, IArchivo, IHistorialVersion, IHistorialAuditoria } from '../types/manuales.types'

export const useManualesUtils = () => {
    // ============================================
    // FORMATEO DE DATOS
    // ============================================

    // Obtener el manual más reciente
    const getManualReciente = (manual: IManual): IArchivo | null => {
        if (manual.Manuales.length === 0) return null
        return manual.Manuales[manual.Manuales.length - 1]
    }

    // Obtener versión actual del historial
    const getVersionActual = (manual: IManual): IHistorialVersion | null => {
        const versionFinal = manual.Historial.find(h => h.final)
        return versionFinal || null
    }

    // Obtener versiones anteriores
    const getVersionesAnteriores = (manual: IManual): IHistorialVersion[] => {
        return manual.Historial.filter(h => !h.final)
    }

    // Formatear tamaño de archivo
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
    }

    // Obtener icono por extensión
    const getIconoPorExtension = (ext: string): string => {
        const iconos: { [key: string]: string } = {
            '.docx': 'description',
            '.doc': 'description',
            '.pdf': 'picture_as_pdf',
            '.xlsx': 'table_chart',
            '.xls': 'table_chart',
            '.pptx': 'slideshow',
            '.ppt': 'slideshow',
            '.png': 'image',
            '.jpg': 'image',
            '.jpeg': 'image',
            '.gif': 'image'
        }
        return iconos[ext.toLowerCase()] || 'insert_drive_file'
    }

    // Obtener color por extensión
    const getColorPorExtension = (ext: string): string => {
        const colores: { [key: string]: string } = {
            '.docx': 'text-blue-600',
            '.doc': 'text-blue-600',
            '.pdf': 'text-red-600',
            '.xlsx': 'text-green-600',
            '.xls': 'text-green-600',
            '.pptx': 'text-orange-600',
            '.ppt': 'text-orange-600',
            '.png': 'text-purple-600',
            '.jpg': 'text-purple-600',
            '.jpeg': 'text-purple-600',
            '.gif': 'text-purple-600'
        }
        return colores[ext.toLowerCase()] || 'text-gray-600'
    }

    // ============================================
    // ESTADÍSTICAS
    // ============================================

    // Contar archivos por tipo
    const contarArchivosPorTipo = (manual: IManual): { [key: string]: number } => {
        const contador: { [key: string]: number } = {}

        const contarEn = (lista: IArchivo[]) => {
            lista.forEach(arch => {
                const ext = arch.ext.toLowerCase()
                contador[ext] = (contador[ext] || 0) + 1
            })
        }

        contarEn(manual.Manuales)
        contarEn(manual.Soporte)

        return contador
    }

    // Calcular color de promedio de auditorías
    const getColorPromedioAuditoria = (promedio: number): string => {
        if (promedio >= 90) return 'text-success'
        if (promedio >= 75) return 'text-warning'
        return 'text-error'
    }

    const getBadgePromedioAuditoria = (promedio: number): string => {
        if (promedio >= 90) return 'badge-success'
        if (promedio >= 75) return 'badge-warning'
        return 'badge-error'
    }

    // ============================================
    // EXPORTACIÓN
    // ============================================

    const exportarCSV = (manuales: IManual[], tipo: 'cv' | 'manual') => {
        let csv = `MANUALES Y POLITICAS - ${tipo === 'cv' ? 'CADENA DE VALOR' : 'MANUALES'}\n\n`

        csv += 'Nro,Macroprocesos,Grupo Procesos,Procesos,Diagrama,Versiones,Auditorias,Promedio,Estado\n'

        manuales.forEach((m, idx) => {
            const procesos = m.isAuto
                ? m.Lvls3.map(l => l.lvl3).join(' | ')
                : m.lvls3

            csv += `${idx + 1},"${m.lvl1}","${m.lvl2}","${procesos}","${m.diagrama}",${m.Historial.length},${m.HistorialAu.length},${m.promedioAuditorias},"${m.habilitado === false ? 'Deshabilitado' : 'Activo'}"\n`
        })

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)

        link.setAttribute('href', url)
        link.setAttribute('download', `manuales_${tipo}_${new Date().getTime()}.csv`)
        link.style.visibility = 'hidden'

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const exportarExcel = (manuales: IManual[], tipo: 'cv' | 'manual') => {
        // Simulado como CSV
        exportarCSV(manuales, tipo)
    }

    const imprimirTabla = () => {
        window.print()
    }

    // ============================================
    // VALIDACIONES
    // ============================================

    const validarExtension = (nombreArchivo: string, tiposPermitidos: string[]): boolean => {
        const ext = '.' + nombreArchivo.split('.').pop()?.toLowerCase()
        return tiposPermitidos.some(tipo => tipo.toLowerCase() === ext)
    }

    const validarTamañoArchivo = (size: number, maxMB: number = 10): boolean => {
        const maxBytes = maxMB * 1024 * 1024
        return size <= maxBytes
    }

    return {
        // Formateo
        getManualReciente,
        getVersionActual,
        getVersionesAnteriores,
        formatFileSize,
        getIconoPorExtension,
        getColorPorExtension,

        // Estadísticas
        contarArchivosPorTipo,
        getColorPromedioAuditoria,
        getBadgePromedioAuditoria,

        // Exportación
        exportarCSV,
        exportarExcel,
        imprimirTabla,

        // Validaciones
        validarExtension,
        validarTamañoArchivo
    }
}
