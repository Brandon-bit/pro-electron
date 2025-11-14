import { defineStore } from 'pinia'
import type { ProcessDiagramType } from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/processDiagramType'

const useProcessDiagramStore = defineStore('processDiagram', {
    state: () => ({
        selectedProcessDiagram: {} as ProcessDiagramType,
        modalId: 'process-diagram-modal'
    }),
    actions: {
        setData(data?: ProcessDiagramType) {
            if (data) {
                this.selectedProcessDiagram = data
            } else {
                this.selectedProcessDiagram = {} as ProcessDiagramType
            }
        }
    }
})

export default useProcessDiagramStore
