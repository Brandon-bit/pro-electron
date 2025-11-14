/**
 * Validaciones para el formulario de soporte
 */

export const supportValidations = {
    /**
     * Valida que el nombre no esté vacío y tenga al menos 3 caracteres
     */
    validateName(name: string): { valid: boolean; message?: string } {
        if (!name || !name.trim()) {
            return { valid: false, message: 'El nombre es requerido' }
        }
        if (name.trim().length < 3) {
            return { valid: false, message: 'El nombre debe tener al menos 3 caracteres' }
        }
        return { valid: true }
    },

    /**
     * Valida el formato del email
     */
    validateEmail(email: string): { valid: boolean; message?: string } {
        if (!email || !email.trim()) {
            return { valid: false, message: 'El email es requerido' }
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return { valid: false, message: 'El email no tiene un formato válido' }
        }
        
        return { valid: true }
    },

    /**
     * Valida que la descripción tenga contenido suficiente
     */
    validateDescription(description: string): { valid: boolean; message?: string } {
        if (!description || !description.trim()) {
            return { valid: false, message: 'La descripción es requerida' }
        }
        if (description.trim().length < 10) {
            return { valid: false, message: 'La descripción debe tener al menos 10 caracteres' }
        }
        if (description.trim().length > 1000) {
            return { valid: false, message: 'La descripción no puede exceder 1000 caracteres' }
        }
        return { valid: true }
    },

    /**
     * Valida los archivos adjuntos
     */
    validateAttachments(files: File[]): { valid: boolean; message?: string } {
        const maxFiles = 5
        const maxSizePerFile = 10 * 1024 * 1024 // 10MB
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]

        if (files.length > maxFiles) {
            return { valid: false, message: `No puedes subir más de ${maxFiles} archivos` }
        }

        for (const file of files) {
            if (file.size > maxSizePerFile) {
                return { valid: false, message: `El archivo ${file.name} excede el tamaño máximo de 10MB` }
            }
            if (!allowedTypes.includes(file.type)) {
                return { valid: false, message: `El tipo de archivo ${file.name} no está permitido` }
            }
        }

        return { valid: true }
    },

    /**
     * Valida todo el formulario de soporte
     */
    validateForm(name: string, email: string, description: string, attachments: File[]): { valid: boolean; errors: string[] } {
        const errors: string[] = []

        const nameValidation = this.validateName(name)
        if (!nameValidation.valid && nameValidation.message) {
            errors.push(nameValidation.message)
        }

        const emailValidation = this.validateEmail(email)
        if (!emailValidation.valid && emailValidation.message) {
            errors.push(emailValidation.message)
        }

        const descriptionValidation = this.validateDescription(description)
        if (!descriptionValidation.valid && descriptionValidation.message) {
            errors.push(descriptionValidation.message)
        }

        if (attachments.length > 0) {
            const attachmentsValidation = this.validateAttachments(attachments)
            if (!attachmentsValidation.valid && attachmentsValidation.message) {
                errors.push(attachmentsValidation.message)
            }
        }

        return {
            valid: errors.length === 0,
            errors
        }
    }
}
