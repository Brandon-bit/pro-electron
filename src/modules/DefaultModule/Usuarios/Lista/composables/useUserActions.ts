import { userService } from '@/modules/DefaultModule/Usuarios/Lista/services/userService'
import { showNotification } from '@/utils/toastNotifications'
import type { UserFormType, UserFilterType } from '@/modules/DefaultModule/Usuarios/Lista/types/userTypes'

export const useUserActions = () => {
    
    /**
     * Obtiene la lista de usuarios con paginación
     */
    const getUsers = async (page: number, limit: number) => {
        try {
            const response = await userService.getUsers({ page, limit })
            return {
                items: response.data,
                total: response.total
            }
        } catch (error) {
            showNotification('Error al cargar los usuarios', 'error')
            throw error
        }
    }

    /**
     * Crea un nuevo usuario
     */
    const handleCreateUser = async (userData: UserFormType): Promise<boolean> => {
        try {
            await userService.createUser(userData)
            showNotification('Usuario creado exitosamente', 'success')
            return true
        } catch (error) {
            showNotification('Error al crear el usuario', 'error')
            return false
        }
    }

    /**
     * Actualiza un usuario existente
     */
    const handleUpdateUser = async (id: string, userData: Partial<UserFormType>): Promise<boolean> => {
        try {
            await userService.updateUser(id, userData)
            showNotification('Usuario actualizado exitosamente', 'success')
            return true
        } catch (error) {
            showNotification('Error al actualizar el usuario', 'error')
            return false
        }
    }

    /**
     * Elimina un usuario
     */
    const handleDeleteUser = async (id: string): Promise<boolean> => {
        try {
            await userService.deleteUser(id)
            showNotification('Usuario eliminado exitosamente', 'success')
            return true
        } catch (error) {
            showNotification('Error al eliminar el usuario', 'error')
            return false
        }
    }

    /**
     * Exporta usuarios a Excel
     */
    const handleExportExcel = async (filters?: UserFilterType) => {
        try {
            const blob = await userService.exportToExcel(filters)
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `usuarios_${new Date().getTime()}.xlsx`
            a.click()
            window.URL.revokeObjectURL(url)
            showNotification('Exportación a Excel exitosa', 'success')
        } catch (error) {
            showNotification('Error al exportar a Excel', 'error')
        }
    }

    /**
     * Exporta usuarios a PDF
     */
    const handleExportPDF = async (filters?: UserFilterType) => {
        try {
            const blob = await userService.exportToPDF(filters)
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `usuarios_${new Date().getTime()}.pdf`
            a.click()
            window.URL.revokeObjectURL(url)
            showNotification('Exportación a PDF exitosa', 'success')
        } catch (error) {
            showNotification('Error al exportar a PDF', 'error')
        }
    }

    return {
        getUsers,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser,
        handleExportExcel,
        handleExportPDF
    }
}
