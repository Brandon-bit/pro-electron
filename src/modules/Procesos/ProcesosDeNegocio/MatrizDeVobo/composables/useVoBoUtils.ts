import type { VoBoEstatusType } from '../types/vobo.types'

export const useVoBoUtils = () => {
    // ============================================
    // COLORES POR ESTATUS
    // ============================================

    /**
     * Obtiene las clases CSS según el estatus
     * @param estatus - ID del estatus (1-5)
     * @param tipo - Tipo de clase ('alert', 'badge', 'text')
     * @param clasesBase - Clases adicionales base
     */
    const getColorClass = (estatus: VoBoEstatusType, tipo: string = 'alert', clasesBase: string = ''): string => {
        const colorMap: Record<VoBoEstatusType, string> = {
            1: `${tipo}-warning`,   // Pendiente - Amarillo
            2: `${tipo}-success`,   // Aprobado - Verde
            3: `${tipo}-error`,     // Rechazado - Rojo
            4: `${tipo}-info`,      // En Revisión - Azul
            5: `${tipo}-secondary`  // Cancelado - Gris
        }

        const colorClass = colorMap[estatus] || `${tipo}-secondary`
        return `${clasesBase} ${colorClass}`.trim()
    }

    /**
     * Obtiene badge clase según estatus para DaisyUI
     */
    const getBadgeClass = (estatus: VoBoEstatusType): string => {
        const badgeMap: Record<VoBoEstatusType, string> = {
            1: 'badge-warning',
            2: 'badge-success',
            3: 'badge-error',
            4: 'badge-info',
            5: 'badge-ghost'
        }

        return `badge ${badgeMap[estatus] || 'badge-ghost'}`
    }

    // ============================================
    // FORMATO DE FECHAS
    // ============================================

    /**
     * Verifica si una fecha es válida (no es la fecha por defecto)
     */
    const isFechaValida = (fecha: string): boolean => {
        return fecha !== '01/01/0001' && fecha !== '' && fecha !== null
    }

    /**
     * Formatea una fecha para mostrar
     */
    const formatFecha = (fecha: string): string => {
        if (!isFechaValida(fecha)) {
            return '-'
        }
        return fecha
    }

    // ============================================
    // ARCHIVOS
    // ============================================

    /**
     * Obtiene el icono según la extensión del archivo
     */
    const getFileIcon = (ext: string): string => {
        const iconMap: Record<string, string> = {
            '.pdf': 'picture_as_pdf',
            '.doc': 'description',
            '.docx': 'description',
            '.xls': 'table_chart',
            '.xlsx': 'table_chart',
            '.ppt': 'slideshow',
            '.pptx': 'slideshow',
            '.txt': 'article',
            '.zip': 'folder_zip',
            '.rar': 'folder_zip'
        }

        return iconMap[ext.toLowerCase()] || 'insert_drive_file'
    }

    /**
     * Formatea el tamaño del archivo
     */
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    // ============================================
    // VALIDACIONES
    // ============================================

    /**
     * Verifica si un VoBo puede ser enviado
     */
    const canSendVoBo = (vobo: any): boolean => {
        return (
            !isFechaValida(vobo.strFechaEnvio) &&
            vobo.dniAutoriza !== null &&
            vobo.dniAutoriza !== ''
        )
    }

    /**
     * Verifica si un VoBo puede ser eliminado
     */
    const canDeleteVoBo = (vobo: any): boolean => {
        return !isFechaValida(vobo.strFechaEnvio)
    }

    return {
        // Colores
        getColorClass,
        getBadgeClass,

        // Fechas
        isFechaValida,
        formatFecha,

        // Archivos
        getFileIcon,
        formatFileSize,

        // Validaciones
        canSendVoBo,
        canDeleteVoBo
    }
}
