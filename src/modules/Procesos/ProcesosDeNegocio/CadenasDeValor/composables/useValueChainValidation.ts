import type {
    AreaType,
    Level1ProcessType,
    Level2ProcessType,
    Level3ProcessType
} from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'

export function useValueChainValidation() {
    /**
     * Verifica si un área puede ser eliminada (no tiene procesos nivel 1)
     */
    const canDeleteArea = (area: AreaType): { canDelete: boolean; message: string } => {
        if (area.level1Processes.length > 0) {
            return {
                canDelete: false,
                message: `El área "${area.title}" contiene ${area.level1Processes.length} proceso(s). Elimina todos los procesos antes de eliminar el área.`
            }
        }
        return { canDelete: true, message: '' }
    }

    /**
     * Verifica si un proceso nivel 1 puede ser eliminado (no tiene procesos nivel 2)
     */
    const canDeleteLevel1 = (
        process: Level1ProcessType
    ): { canDelete: boolean; message: string } => {
        if (process.level2Processes.length > 0) {
            return {
                canDelete: false,
                message: `El proceso "${process.title}" contiene ${process.level2Processes.length} grupo(s) de procesos (Nivel 2). Elimina todos los grupos antes de eliminar este proceso.`
            }
        }
        return { canDelete: true, message: '' }
    }

    /**
     * Verifica si un proceso nivel 2 puede ser eliminado (no tiene procesos nivel 3)
     */
    const canDeleteLevel2 = (
        process: Level2ProcessType
    ): { canDelete: boolean; message: string } => {
        if (process.level3Processes.length > 0) {
            return {
                canDelete: false,
                message: `El grupo "${process.title}" contiene ${process.level3Processes.length} proceso(s) detallado(s) (Nivel 3). Elimina todos los procesos antes de eliminar este grupo.`
            }
        }
        return { canDelete: true, message: '' }
    }

    /**
     * Los procesos nivel 3 siempre se pueden eliminar
     */
    const canDeleteLevel3 = (
        process: Level3ProcessType
    ): { canDelete: boolean; message: string } => {
        return { canDelete: true, message: '' }
    }

    return {
        canDeleteArea,
        canDeleteLevel1,
        canDeleteLevel2,
        canDeleteLevel3
    }
}
