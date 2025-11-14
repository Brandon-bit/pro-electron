import type { UserFormType } from '@/modules/DefaultModule/Usuarios/Lista/types/userTypes'

export const userValidations = {
    validateName(name: string): { valid: boolean; message?: string } {
        if (!name || !name.trim()) {
            return { valid: false, message: 'El nombre es requerido' }
        }
        if (name.trim().length < 3) {
            return { valid: false, message: 'El nombre debe tener al menos 3 caracteres' }
        }
        if (name.trim().length > 100) {
            return { valid: false, message: 'El nombre no puede exceder 100 caracteres' }
        }
        return { valid: true }
    },

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

    validatePhone(phone?: string): { valid: boolean; message?: string } {
        if (!phone || !phone.trim()) {
            return { valid: true } // Phone is optional
        }
        
        const phoneRegex = /^\d{10}$/
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            return { valid: false, message: 'El teléfono debe tener 10 dígitos' }
        }
        
        return { valid: true }
    },

    validatePosition(position: string): { valid: boolean; message?: string } {
        if (!position || !position.trim()) {
            return { valid: false, message: 'El puesto es requerido' }
        }
        if (position.trim().length < 2) {
            return { valid: false, message: 'El puesto debe tener al menos 2 caracteres' }
        }
        return { valid: true }
    },

    validateArea(area: string): { valid: boolean; message?: string } {
        if (!area || !area.trim()) {
            return { valid: false, message: 'El área es requerida' }
        }
        return { valid: true }
    },

    validateType(type: string): { valid: boolean; message?: string } {
        if (!type || !type.trim()) {
            return { valid: false, message: 'El tipo es requerido' }
        }
        const validTypes = ['Admin', 'Member', 'Guest']
        if (!validTypes.includes(type)) {
            return { valid: false, message: 'El tipo no es válido' }
        }
        return { valid: true }
    },

    validateRoles(roles: string[]): { valid: boolean; message?: string } {
        if (!roles || roles.length === 0) {
            return { valid: false, message: 'Debe seleccionar al menos un rol' }
        }
        return { valid: true }
    },

    validatePassword(password?: string, isEdit: boolean = false): { valid: boolean; message?: string } {
        if (isEdit && (!password || !password.trim())) {
            return { valid: true } // Password is optional on edit
        }
        
        if (!isEdit && (!password || !password.trim())) {
            return { valid: false, message: 'La contraseña es requerida' }
        }
        
        if (password && password.length < 8) {
            return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres' }
        }
        
        return { valid: true }
    },

    validateForm(formData: UserFormType, isEdit: boolean = false): { valid: boolean; errors: string[] } {
        const errors: string[] = []

        const nameValidation = this.validateName(formData.name)
        if (!nameValidation.valid && nameValidation.message) {
            errors.push(nameValidation.message)
        }

        const emailValidation = this.validateEmail(formData.email)
        if (!emailValidation.valid && emailValidation.message) {
            errors.push(emailValidation.message)
        }

        const phoneValidation = this.validatePhone(formData.phone)
        if (!phoneValidation.valid && phoneValidation.message) {
            errors.push(phoneValidation.message)
        }

        const positionValidation = this.validatePosition(formData.position)
        if (!positionValidation.valid && positionValidation.message) {
            errors.push(positionValidation.message)
        }

        const areaValidation = this.validateArea(formData.area)
        if (!areaValidation.valid && areaValidation.message) {
            errors.push(areaValidation.message)
        }

        const typeValidation = this.validateType(formData.type)
        if (!typeValidation.valid && typeValidation.message) {
            errors.push(typeValidation.message)
        }

        const rolesValidation = this.validateRoles(formData.roles)
        if (!rolesValidation.valid && rolesValidation.message) {
            errors.push(rolesValidation.message)
        }

        const passwordValidation = this.validatePassword(formData.password, isEdit)
        if (!passwordValidation.valid && passwordValidation.message) {
            errors.push(passwordValidation.message)
        }

        return {
            valid: errors.length === 0,
            errors
        }
    }
}
