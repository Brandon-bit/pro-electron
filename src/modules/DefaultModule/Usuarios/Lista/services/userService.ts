import type { UserType, UserFormType, UserFilterType } from '@/modules/DefaultModule/Usuarios/Lista/types/userTypes'

// Mock data para desarrollo
const mockUsers: UserType[] = [
    {
        id: '1',
        name: 'Veronica Vizcaya',
        email: 'marketing@proyectopolis.com',
        phone: '',
        position: 'Marketing',
        area: 'Marketing',
        type: 'Admin',
        roles: ['Líder', 'Manager'],
        status: 'active',
        createdAt: '2024-01-15'
    },
    {
        id: '2',
        name: 'Usuario prueba Prueba 2',
        email: 'prueba2@proyectopolis.com',
        phone: '',
        position: 'TI',
        area: 'Sistemas',
        type: 'Member',
        roles: ['Sponsor', 'Procesos', 'Líder', 'Manager'],
        status: 'active',
        createdAt: '2024-02-10'
    },
    {
        id: '3',
        name: 'Sandra Palomo',
        email: 'sandra.palomo@xpertal.com',
        phone: '',
        position: 'RH',
        area: 'Recursos Humanos',
        type: 'Member',
        roles: ['Líder', 'Manager'],
        status: 'active',
        createdAt: '2024-03-05'
    },
    {
        id: '4',
        name: 'Rosa Vizcaya',
        email: 'veronicavizcaya2006@gmail.com',
        phone: '8127324548',
        position: 'Marketing',
        area: 'Marketing',
        type: 'Member',
        roles: ['Líder'],
        status: 'active',
        createdAt: '2024-01-20'
    },
    {
        id: '5',
        name: 'Rolando Rodriguez',
        email: 'rolando.rodriguez@adcvent.com',
        phone: '',
        position: 'comercial',
        area: 'Comercial',
        type: 'Admin',
        roles: ['Procesos', 'Líder', 'Manager', 'Auditor'],
        status: 'active',
        createdAt: '2024-02-15'
    }
]

export const userService = {
    /**
     * Obtiene la lista de usuarios con paginación y filtros
     */
    async getUsers(params: {
        page: number
        limit: number
        filters?: UserFilterType
    }): Promise<{ data: UserType[]; total: number }> {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500))

        let filteredUsers = [...mockUsers]

        // Aplicar filtros
        if (params.filters?.search) {
            const search = params.filters.search.toLowerCase()
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(search) ||
                user.email.toLowerCase().includes(search) ||
                user.position.toLowerCase().includes(search)
            )
        }

        if (params.filters?.area) {
            filteredUsers = filteredUsers.filter(user => user.area === params.filters?.area)
        }

        if (params.filters?.type) {
            filteredUsers = filteredUsers.filter(user => user.type === params.filters?.type)
        }

        if (params.filters?.role) {
            filteredUsers = filteredUsers.filter(user => user.roles.includes(params.filters?.role!))
        }

        if (params.filters?.status) {
            filteredUsers = filteredUsers.filter(user => user.status === params.filters?.status)
        }

        // Paginación
        const start = (params.page - 1) * params.limit
        const end = start + params.limit
        const paginatedUsers = filteredUsers.slice(start, end)

        return {
            data: paginatedUsers,
            total: filteredUsers.length
        }
    },

    /**
     * Obtiene un usuario por ID
     */
    async getUserById(id: string): Promise<UserType | null> {
        await new Promise(resolve => setTimeout(resolve, 300))
        return mockUsers.find(user => user.id === id) || null
    },

    /**
     * Crea un nuevo usuario
     */
    async createUser(userData: UserFormType): Promise<UserType> {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newUser: UserType = {
            id: Date.now().toString(),
            ...userData,
            status: 'active',
            createdAt: new Date().toISOString()
        }
        
        mockUsers.push(newUser)
        return newUser
    },

    /**
     * Actualiza un usuario existente
     */
    async updateUser(id: string, userData: Partial<UserFormType>): Promise<UserType> {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const index = mockUsers.findIndex(user => user.id === id)
        if (index === -1) {
            throw new Error('Usuario no encontrado')
        }
        
        mockUsers[index] = {
            ...mockUsers[index],
            ...userData,
            updatedAt: new Date().toISOString()
        }
        
        return mockUsers[index]
    },

    /**
     * Elimina un usuario
     */
    async deleteUser(id: string): Promise<boolean> {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const index = mockUsers.findIndex(user => user.id === id)
        if (index === -1) {
            throw new Error('Usuario no encontrado')
        }
        
        mockUsers.splice(index, 1)
        return true
    },

    /**
     * Exporta usuarios a Excel
     */
    async exportToExcel(filters?: UserFilterType): Promise<Blob> {
        await new Promise(resolve => setTimeout(resolve, 300))
        // TODO: Implementar exportación real
        return new Blob([''], { type: 'application/vnd.ms-excel' })
    },

    /**
     * Exporta usuarios a PDF
     */
    async exportToPDF(filters?: UserFilterType): Promise<Blob> {
        await new Promise(resolve => setTimeout(resolve, 300))
        // TODO: Implementar exportación real
        return new Blob([''], { type: 'application/pdf' })
    }
}
