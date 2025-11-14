import type { HolidayFormType } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/types/holidayTypes'

export const holidayValidations = {
    validateDate(date: string): { valid: boolean; message?: string } {
        if (!date || !date.trim()) {
            return { valid: false, message: 'La fecha es requerida' }
        }
        
        const dateObj = new Date(date)
        if (isNaN(dateObj.getTime())) {
            return { valid: false, message: 'La fecha no es válida' }
        }
        
        return { valid: true }
    },

    validateDescription(description: string): { valid: boolean; message?: string } {
        if (!description || !description.trim()) {
            return { valid: false, message: 'La descripción es requerida' }
        }
        
        if (description.trim().length < 3) {
            return { valid: false, message: 'La descripción debe tener al menos 3 caracteres' }
        }
        
        if (description.trim().length > 100) {
            return { valid: false, message: 'La descripción no puede exceder 100 caracteres' }
        }
        
        return { valid: true }
    },

    validateForm(formData: HolidayFormType): { valid: boolean; errors: string[] } {
        const errors: string[] = []

        const dateValidation = this.validateDate(formData.date)
        if (!dateValidation.valid && dateValidation.message) {
            errors.push(dateValidation.message)
        }

        const descriptionValidation = this.validateDescription(formData.description)
        if (!descriptionValidation.valid && descriptionValidation.message) {
            errors.push(descriptionValidation.message)
        }

        return {
            valid: errors.length === 0,
            errors
        }
    }
}
