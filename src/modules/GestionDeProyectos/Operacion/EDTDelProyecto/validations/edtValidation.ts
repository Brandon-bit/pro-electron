import { z } from 'zod'
import { stringValidator } from '@/shared/validations/globalValidation'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'

// ============================================
// ETAPA SCHEMA
// ============================================
export const etapaSchema = z.object({
    nombre: stringValidator('El nombre es obligatorio', 'El nombre debe tener al menos 3 caracteres', 3),
    psn: z.number({ required_error: 'El PSN es obligatorio' })
        .min(1, 'El PSN debe ser mayor a 0'),
    activo: z.boolean().default(true),
}).superRefine((data, ctx) => {
    const edtStore = useEDTStore()
    
    // Solo validar duplicados si hay datos EDT cargados
    if (!edtStore.edtRawData?.etapas) {
        console.log('Validación PSN Etapa: No hay datos EDT cargados')
        return
    }
    
    console.log('Validación PSN Etapa: Verificando PSN', data.psn, 'contra etapas:', edtStore.edtRawData.etapas.map(e => ({ dni: e.dni, psn: e.psn, nombre: e.nombre })))
    
    // Verificar si el PSN ya existe en otra etapa
    const psnExists = edtStore.edtRawData.etapas.some(etapa => {
        // Si estamos editando, excluir la etapa actual de la validación
        if (edtStore.selectedEtapa && etapa.dni === edtStore.selectedEtapa.dni) {
            console.log('Validación PSN Etapa: Excluyendo etapa actual (edición):', etapa.dni)
            return false
        }
        const matches = etapa.psn === data.psn
        if (matches) {
            console.log('Validación PSN Etapa: PSN DUPLICADO encontrado en etapa:', etapa.nombre, 'dni:', etapa.dni)
        }
        return matches
    })
    
    if (psnExists) {
        console.log('Validación PSN Etapa: ERROR - PSN duplicado')
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El PSN ya existe en otra etapa',
            path: ['psn']
        })
    } else {
        console.log('Validación PSN Etapa: OK - PSN único')
    }
})

// ============================================
// ACTIVIDAD SCHEMA
// ============================================
export const actividadSchema = z.object({
    nombre: stringValidator('El nombre es obligatorio', 'El nombre debe tener al menos 3 caracteres', 3),
    psn: z.number({ required_error: 'El PSN es obligatorio' })
        .min(1, 'El PSN debe ser mayor a 0'),
    dias: z.number({ required_error: 'Los días son obligatorios' })
        .min(1, 'Los días deben ser mayor a 0'),
    activo: z.boolean().default(true),
}).superRefine((data, ctx) => {
    const edtStore = useEDTStore()
    
    // Solo validar duplicados si hay datos EDT cargados
    if (!edtStore.edtRawData?.etapas) {
        console.log('Validación PSN Actividad: No hay datos EDT cargados')
        return
    }
    
    // Obtener el dni de la etapa padre
    let dniEtapaPadre: number | null = null
    
    if (edtStore.selectedActividad) {
        // Modo edición: usar el dniEtapa de la actividad seleccionada
        dniEtapaPadre = edtStore.selectedActividad.dniEtapa
        console.log('Validación PSN Actividad: Modo EDICIÓN, dniEtapa:', dniEtapaPadre)
    } else if (edtStore.parentContext?.type === 'etapa') {
        // Modo creación: usar el dni del contexto padre
        dniEtapaPadre = edtStore.parentContext.dni
        console.log('Validación PSN Actividad: Modo CREACIÓN, dniEtapa:', dniEtapaPadre, 'parentContext:', edtStore.parentContext)
    }
    
    if (!dniEtapaPadre) {
        console.log('Validación PSN Actividad: No se pudo obtener dniEtapaPadre')
        return
    }
    
    // Buscar la etapa padre
    const etapaPadre = edtStore.edtRawData.etapas.find(e => e.dni === dniEtapaPadre)
    if (!etapaPadre) {
        console.log('Validación PSN Actividad: No se encontró la etapa padre con dni:', dniEtapaPadre)
        return
    }
    
    if (!etapaPadre.actividades) {
        console.log('Validación PSN Actividad: La etapa no tiene actividades')
        return
    }
    
    console.log('Validación PSN Actividad: Verificando PSN', data.psn, 'contra actividades:', etapaPadre.actividades.map(a => ({ dni: a.dni, psn: a.psn, nombre: a.nombre })))
    
    // Verificar si el PSN ya existe en otra actividad de esta etapa
    const psnExists = etapaPadre.actividades.some(actividad => {
        // Si estamos editando, excluir la actividad actual de la validación
        if (edtStore.selectedActividad && actividad.dni === edtStore.selectedActividad.dni) {
            console.log('Validación PSN Actividad: Excluyendo actividad actual (edición):', actividad.dni)
            return false
        }
        const matches = actividad.psn === data.psn
        if (matches) {
            console.log('Validación PSN Actividad: PSN DUPLICADO encontrado en actividad:', actividad.nombre, 'dni:', actividad.dni)
        }
        return matches
    })
    
    if (psnExists) {
        console.log('Validación PSN Actividad: ERROR - PSN duplicado')
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El PSN ya existe en otra actividad de esta etapa',
            path: ['psn']
        })
    } else {
        console.log('Validación PSN Actividad: OK - PSN único')
    }
})

// ============================================
// SUB-ACTIVIDAD SCHEMA
// ============================================
export const subActividadSchema = z.object({
    nombre: stringValidator('El nombre es obligatorio', 'El nombre debe tener al menos 3 caracteres', 3),
    activo: z.boolean().default(true),
})
