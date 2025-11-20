import { ref } from 'vue'
import type { UserOption } from '@/shared/components/BaseUserSelect.vue'

export const useUsers = () => {
    const users = ref<UserOption[]>([])
    const isLoading = ref(false)

    const loadUsers = async () => {
        isLoading.value = true
        try {
            // TODO: Reemplazar con llamada real al servicio cuando esté disponible
            // const response = await getUsersService()
            // users.value = response.data.map(user => ({
            //     id: user.id,
            //     name: user.name,
            //     email: user.email
            // }))
            
            // Mock data por ahora
            users.value = [
                { id: 1, name: 'Juan Pérez', email: 'juan.perez@proyectopolis.com' },
                { id: 2, name: 'María García', email: 'maria.garcia@proyectopolis.com' },
                { id: 3, name: 'Carlos López', email: 'carlos.lopez@proyectopolis.com' },
                { id: 4, name: 'Ana Martínez', email: 'ana.martinez@proyectopolis.com' },
                { id: 5, name: 'Roberto Sánchez', email: 'roberto.sanchez@proyectopolis.com' },
                { id: 6, name: 'Laura Rodríguez', email: 'laura.rodriguez@proyectopolis.com' },
                { id: 7, name: 'Pedro Hernández', email: 'pedro.hernandez@proyectopolis.com' },
                { id: 8, name: 'Sofia Torres', email: 'sofia.torres@proyectopolis.com' },
                { id: 9, name: 'Diego Ramírez', email: 'diego.ramirez@proyectopolis.com' },
                { id: 10, name: 'Valentina Castro', email: 'valentina.castro@proyectopolis.com' }
            ]
        } catch (error) {
            console.error('Error al cargar usuarios:', error)
            users.value = []
        } finally {
            isLoading.value = false
        }
    }

    return {
        users,
        isLoading,
        loadUsers
    }
}
