import type { PrioridadType, OlaDescripcionType, TipoImplementacionType } from '../types/ola.types'

export const useOlaUtils = () => {
    // ============================================
    // CLASES CSS POR PRIORIDAD
    // ============================================

    const getPrioridadClass = (prioridad: PrioridadType): string => {
        const classMap: Record<PrioridadType, string> = {
            'Baja': 'bg-baja',
            'Media': 'bg-media',
            'Alta': 'bg-alta',
            'Muy Alta': 'bg-muy-alta'
        }
        return classMap[prioridad] || ''
    }

    // ============================================
    // LISTAS DE OPCIONES
    // ============================================

    const listaPrioridades: PrioridadType[] = ['Baja', 'Media', 'Alta', 'Muy Alta']
    
    const listaTiposImplementacion: TipoImplementacionType[] = [
        'Quick Hits',
        'Desarrollo de Sistema',
        'Proyecto de Inversión'
    ]
    
    const listaOlas: OlaDescripcionType[] = [
        'Inmediato',
        'Corto Plazo',
        'Mediano Plazo',
        'Largo Plazo'
    ]

    // ============================================
    // TÍTULOS DE COLUMNAS
    // ============================================

    const titulosColumnas = ['0', '1', '2', '3']
    
    const descripcionesColumnas: OlaDescripcionType[] = [
        'Inmediato',
        'Corto Plazo',
        'Mediano Plazo',
        'Largo Plazo'
    ]

    return {
        // Utils
        getPrioridadClass,
        
        // Listas
        listaPrioridades,
        listaTiposImplementacion,
        listaOlas,
        
        // Columnas
        titulosColumnas,
        descripcionesColumnas
    }
}
