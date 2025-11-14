import { defineStore } from 'pinia'
import type { UserType, UserFilterType } from '@/modules/DefaultModule/Usuarios/Lista/types/userTypes'

const useUserStore = defineStore('user-store', {
    state: () => ({
        selectedUser: null as UserType | null,
        modalId: 'user-modal',
        deleteModalId: 'delete-user-modal',
        isSubmitting: false,
        filters: {} as UserFilterType
    }),
    actions: {
        setData(user: UserType) {
            this.selectedUser = user
        },
        clearData() {
            this.selectedUser = null
        },
        setSubmitting(value: boolean) {
            this.isSubmitting = value
        },
        setFilters(filters: UserFilterType) {
            this.filters = filters
        },
        clearFilters() {
            this.filters = {}
        }
    }
})

export default useUserStore
