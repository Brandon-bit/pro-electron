import { defineStore } from 'pinia'
import type { NewUserFormType } from '@/modules/DefaultModule/Usuarios/Nuevo/types/newUserTypes'

const useNewUserStore = defineStore('new-user-store', {
    state: () => ({
        formData: {
            firstName: '',
            lastName: '',
            position: '',
            area: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            modules: [] as string[],
            roles: [] as string[],
            isAdmin: false
        } as NewUserFormType,
        isSubmitting: false,
        accountName: 'Corporativa'
    }),
    actions: {
        setFormData(data: Partial<NewUserFormType>) {
            this.formData = { ...this.formData, ...data }
        },
        updateField(field: keyof NewUserFormType, value: any) {
            this.formData[field] = value as never
        },
        toggleModule(moduleId: string) {
            const index = this.formData.modules.indexOf(moduleId)
            if (index > -1) {
                this.formData.modules.splice(index, 1)
            } else {
                this.formData.modules.push(moduleId)
            }
        },
        toggleRole(roleId: string) {
            const index = this.formData.roles.indexOf(roleId)
            if (index > -1) {
                this.formData.roles.splice(index, 1)
            } else {
                this.formData.roles.push(roleId)
            }
        },
        setSubmitting(value: boolean) {
            this.isSubmitting = value
        },
        resetForm() {
            this.formData = {
                firstName: '',
                lastName: '',
                position: '',
                area: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: '',
                modules: [],
                roles: [],
                isAdmin: false
            }
        }
    }
})

export default useNewUserStore
