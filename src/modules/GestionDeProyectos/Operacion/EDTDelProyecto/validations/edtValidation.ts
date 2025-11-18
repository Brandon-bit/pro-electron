import { z } from 'zod'
import { stringValidator } from '@/shared/validations/globalValidation'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'

// ============================================
// STAGE SCHEMA
// ============================================
export const stageSchema = z.object({
    name: stringValidator('El nombre es obligatorio', 'El nombre debe tener al menos 3 caracteres', 3),
    psn: z.number({ required_error: 'El PSN es obligatorio' })
        .min(1, 'El PSN debe ser mayor a 0'),
    active: z.boolean().default(true),
}).superRefine((data, ctx) => {
    const edtStore = useEDTStore()
    
    // Only validate duplicateds if there is EDT data loaded
    if (!edtStore.edtRawData?.etapas) return
        
    // Check if the PSN already exists in another stage
    const psnExists = edtStore.edtRawData.etapas.some(etapa => {
        // If we are editing, exclude the stage currently being edited from the validation
        if (edtStore.selectedStage && etapa.dni === edtStore.selectedStage.dni) return false
        const matches = etapa.psn === data.psn
        return matches
    })
    
    if (psnExists) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El PSN ya existe en otra etapa',
            path: ['psn']
        })
    }
})

// ============================================
// ACTIVITY SCHEMA
// ============================================
export const activitySchema = z.object({
    name: stringValidator('El nombre es obligatorio', 'El nombre debe tener al menos 3 caracteres', 3),
    psn: z.number({ required_error: 'El PSN es obligatorio' })
        .min(1, 'El PSN debe ser mayor a 0'),
    days: z.number({ required_error: 'Los días son obligatorios' })
        .min(1, 'Los días deben ser mayor a 0'),
    active: z.boolean().default(true),
}).superRefine((data, ctx) => {
    const edtStore = useEDTStore()
    
    // Only validate duplicateds if there is EDT data loaded
    if (!edtStore.edtRawData?.etapas) return
    
    // Get the dni from parent stage
    let dniParentStage: number | null = null
    
    if (edtStore.selectedActivity) {
        // Modo edición: usar el dniEtapa de la actividad seleccionada
        dniParentStage = edtStore.selectedActivity.dniStage
    } else if (edtStore.parentContext?.type === 'stage') {
        // Modo creación: usar el dni del contexto padre
        dniParentStage = edtStore.parentContext.dni
    }
    
    if (!dniParentStage) {
        return
    }
    // Buscar la etapa padre
    const parentStage = edtStore.edtRawData.etapas.find(e => e.dni === dniParentStage)

    if (!parentStage) {
        return
    }
    
    if (!parentStage.actividades) {
        return
    }
    // Check if the psn already exists in other activity from the same stage
    const psnExists = parentStage.actividades.some(activity => {
        // If we are editing, exclude the current activity from validation
        if (edtStore.selectedActivity && activity.dni === edtStore.selectedActivity.dni) {
            return false
        }
        const matches = activity.psn === data.psn
        return matches
    })
    
    if (psnExists) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El PSN ya existe en otra actividad de esta etapa',
            path: ['psn']
        })
    }
})

// ============================================
// SUB-ACTIVITY SCHEMA
// ============================================
export const subActivitySchema = z.object({
    name: stringValidator('El nombre es obligatorio', 'El nombre debe tener al menos 3 caracteres', 3),
    active: z.boolean().default(true),
})
