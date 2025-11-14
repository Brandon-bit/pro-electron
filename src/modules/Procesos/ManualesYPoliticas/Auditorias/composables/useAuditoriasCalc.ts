import type { IAuditoria, IDominio, ISubdominio } from '../types/auditorias.types'

export const useAuditoriasCalc = () => {
    // ============================================
    // CÁLCULO MODO NORMAL
    // ============================================

    /**
     * Calcula la calificación de un dominio en modo normal
     * Fórmula: peso_dominio * (promedio_evaluaciones / 100)
     */
    const calcularDominioModoNormal = (dominio: IDominio): number => {
        if (dominio.Subdominios.length === 0) return 0

        // Suma de todas las evaluaciones
        const suma = dominio.Subdominios.reduce((acc, sub) => acc + sub.evaluacion, 0)
        
        // Promedio
        const promedio = suma / dominio.Subdominios.length
        
        // Calificación del dominio
        const calificacion = dominio.peso * (promedio / 100)
        
        return Number(calificacion.toFixed(2))
    }

    // ============================================
    // CÁLCULO MODO MEJOR OPCIÓN
    // ============================================

    /**
     * Calcula la calificación de un dominio en modo mejor opción
     * Fórmula: peso_dominio * (peso_subdominio_seleccionado / 100)
     */
    const calcularDominioMejorOpcion = (dominio: IDominio): number => {
        // Buscar el subdominio seleccionado
        const subdominioSeleccionado = dominio.Subdominios.find(s => s.seleccionado)
        
        if (!subdominioSeleccionado) return 0
        
        // Calificación del dominio
        const calificacion = dominio.peso * ((subdominioSeleccionado.peso || 0) / 100)
        
        return Number(calificacion.toFixed(2))
    }

    // ============================================
    // CÁLCULO COMPLETO DE AUDITORÍA
    // ============================================

    /**
     * Calcula todas las calificaciones de una auditoría
     * @param auditoria Auditoría a calcular
     * @param mejoropcion Si está en modo mejor opción
     */
    const calcularAuditoria = (auditoria: IAuditoria, mejoropcion: boolean): void => {
        let sumCalif = 0

        // Calcular cada dominio
        auditoria.Dominios.forEach(dominio => {
            if (mejoropcion) {
                dominio.calificacion = calcularDominioMejorOpcion(dominio)
            } else {
                dominio.calificacion = calcularDominioModoNormal(dominio)
            }
            
            sumCalif += dominio.calificacion
        })

        // Calificación total de la auditoría
        auditoria.calificacion = Number(sumCalif.toFixed(2))
    }

    /**
     * Calcula todas las auditorías y marca la mejor
     * @param auditorias Lista de auditorías
     * @param mejoropcion Si está en modo mejor opción
     */
    const calcularTodasLasAuditorias = (auditorias: IAuditoria[], mejoropcion: boolean): void => {
        // Calcular cada auditoría
        auditorias.forEach(auditoria => {
            auditoria.mejor = false
            calcularAuditoria(auditoria, mejoropcion)
        })

        // Encontrar la mejor calificación
        if (auditorias.length > 0) {
            const maxCalificacion = Math.max(...auditorias.map(a => a.calificacion))
            const mejorAuditoria = auditorias.find(a => a.calificacion === maxCalificacion)
            
            if (mejorAuditoria) {
                mejorAuditoria.mejor = true
            }
        }
    }

    // ============================================
    // GENERAR LISTA DE CALIFICACIONES
    // ============================================

    /**
     * Genera la lista de calificaciones para enviar al servidor
     * @param auditorias Lista de auditorías
     * @returns Lista con dni, calificación y mejor
     */
    const generarListaCalificaciones = (auditorias: IAuditoria[]) => {
        return auditorias.map(a => ({
            dni: a.dni,
            calificacion: parseFloat(a.calificacion.toString()),
            mejor: a.mejor
        }))
    }

    // ============================================
    // HELPER: FIX DECIMAL
    // ============================================

    /**
     * Redondea un número a N decimales
     */
    const fixDecimal = (num: number, decimals: number = 2): number => {
        return Number(num.toFixed(decimals))
    }

    return {
        // Cálculos
        calcularDominioModoNormal,
        calcularDominioMejorOpcion,
        calcularAuditoria,
        calcularTodasLasAuditorias,
        
        // Helpers
        generarListaCalificaciones,
        fixDecimal
    }
}
