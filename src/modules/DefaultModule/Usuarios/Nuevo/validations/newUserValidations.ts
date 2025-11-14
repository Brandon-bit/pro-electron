import type { NewUserFormType } from '@/modules/DefaultModule/Usuarios/Nuevo/types/newUserTypes'

export const newUserValidations = {
    validateFirstName(firstName: string): { valid: boolean; message?: string } {
        if (!firstName || !firstName.trim()) {
            return { valid: false, message: 'El nombre es requerido' }
        }
        if (firstName.trim().length < 2) {
            return { valid: false, message: 'El nombre debe tener al menos 2 caracteres' }
        }
        return { valid: true }
    },

    validateLastName(lastName: string): { valid: boolean; message?: string } {
        if (!lastName || !lastName.trim()) {
            return { valid: false, message: 'Los apellidos son requeridos' }
        }
        if (lastName.trim().length < 2) {
            return { valid: false, message: 'Los apellidos deben tener al menos 2 caracteres' }
        }
        return { valid: true }
    },

    validateEmail(email: string): { valid: boolean; message?: string } {
        if (!email || !email.trim()) {
            return { valid: false, message: 'El correo electrónico es requerido' }
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return { valid: false, message: 'El correo electrónico no tiene un formato válido' }
        }
        
        return { valid: true }
    },

    validatePhone(phone: string): { valid: boolean; message?: string } {
        if (!phone || !phone.trim()) {
            return { valid: true } // Phone is optional
        }
        
        const phoneRegex = /^\d{10}$/
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            return { valid: false, message: 'El teléfono debe tener 10 dígitos' }
        }
        
        return { valid: true }
    },

    validatePassword(password: string): { valid: boolean; message?: string } {
        if (!password || !password.trim()) {
            return { valid: false, message: 'La contraseña es requerida' }
        }
        
        if (password.length < 6) {
            return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres' }
        }
        
        return { valid: true }
    },

    validateConfirmPassword(password: string, confirmPassword: string): { valid: boolean; message?: string } {
        if (!confirmPassword || !confirmPassword.trim()) {
            return { valid: false, message: 'Debe confirmar la contraseña' }
        }
        
        if (password !== confirmPassword) {
            return { valid: false, message: 'Las contraseñas no coinciden' }
        }
        
        return { valid: true }
    },

    validatePosition(position: string): { valid: boolean; message?: string } {
        if (!position || !position.trim()) {
            return { valid: false, message: 'El puesto es requerido' }
        }
        return { valid: true }
    },

    validateArea(area: string): { valid: boolean; message?: string } {
        if (!area || !area.trim()) {
            return { valid: false, message: 'El área es requerida' }
        }
        return { valid: true }
    },

    validateModules(modules: string[]): { valid: boolean; message?: string } {
        if (!modules || modules.length === 0) {
            return { valid: false, message: 'Debe seleccionar al menos un módulo' }
        }
        return { valid: true }
    },

    validateForm(formData: NewUserFormType): { valid: boolean; errors: string[] } {
        const errors: string[] = []

        const firstNameValidation = this.validateFirstName(formData.firstName)
        if (!firstNameValidation.valid && firstNameValidation.message) {
            errors.push(firstNameValidation.message)
        }

        const lastNameValidation = this.validateLastName(formData.lastName)
        if (!lastNameValidation.valid && lastNameValidation.message) {
            errors.push(lastNameValidation.message)
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

        const passwordValidation = this.validatePassword(formData.password)
        if (!passwordValidation.valid && passwordValidation.message) {
            errors.push(passwordValidation.message)
        }

        const confirmPasswordValidation = this.validateConfirmPassword(formData.password, formData.confirmPassword)
        if (!confirmPasswordValidation.valid && confirmPasswordValidation.message) {
            errors.push(confirmPasswordValidation.message)
        }

        const modulesValidation = this.validateModules(formData.modules)
        if (!modulesValidation.valid && modulesValidation.message) {
            errors.push(modulesValidation.message)
        }

        return {
            valid: errors.length === 0,
            errors
        }
    }
}
