import useOperationStore from '@/modules/MesaDeControl/PipelineDeOperaciones/store/operationStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { StageType, IncidentTemplateType } from '@/modules/MesaDeControl/PipelineDeOperaciones/types/operationTypes'

const useOperation = () => {
    
    
    const operationStore = useOperationStore()
    const modalStore = useModalStore()

    const stages: StageType[] = [
        { id: "Recepción", title: "Recepción", color: "bg-base-200" },
        { id: "Validación Automática", title: "Validación Automática", color: "bg-blue-50" },
        { id: "Revisión Manual", title: "Revisión Manual", color: "bg-amber-50" },
        { id: "Pendiente de Aprobación", title: "Pendiente de Aprobación", color: "bg-purple-50" },
        { id: "Aprobado", title: "Aprobado", color: "bg-green-50" },
        { id: "Rechazado", title: "Rechazado", color: "bg-red-50" },
        { id: "Pendiente de Corrección", title: "Pendiente de Corrección", color: "bg-orange-50" }
    ]

    const incidentTemplates: IncidentTemplateType[] = [
        { 
            id: "doc_ilegible", 
            title: "Documento Ilegible", 
            message: "El documento que nos proporcionaste no es legible. Por favor, envía una nueva versión con mejor calidad." 
        },
        { 
            id: "doc_vencido", 
            title: "Documento Vencido", 
            message: "El documento que enviaste ha vencido. Por favor, proporciona uno vigente." 
        },
        { 
            id: "datos_inconsistentes", 
            title: "Datos Inconsistentes", 
            message: "Hemos detectado inconsistencias en los datos proporcionados. Por favor, verifica la información." 
        },
        { 
            id: "doc_faltante", 
            title: "Documento Faltante", 
            message: "Falta documentación requerida para continuar con tu solicitud. Por favor, completa tu expediente." 
        }
    ]

    const getSLAColor = (timeInStage: number, slaLimit: number): string => {
        const percentage = (timeInStage / slaLimit) * 100
        if (percentage < 50) return "text-success"
        if (percentage < 80) return "text-warning"
        return "text-error"
    }

    const getPriorityColor = (priority: string): string => {
        switch (priority) {
            case "Alta": return "badge-error"
            case "Media": return "badge-warning"
            case "Baja": return "badge-info"
            default: return "badge-neutral"
        }
    }

    const getStatusBadgeClass = (status: string): string => {
        switch (status) {
            case "verified":
            case "passed":
                return "badge-success"
            case "pending":
                return "badge-warning"
            case "rejected":
            case "failed":
                return "badge-error"
            default:
                return "badge-neutral"
        }
    }

    return { 
        stages, 
        incidentTemplates, 
        getSLAColor, 
        getPriorityColor,
        getStatusBadgeClass
    }
}

export default useOperation
