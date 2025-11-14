export type UserType = {
    id: string
    name: string
    email: string
    phone?: string
    position: string
    area: string
    type: string
    roles: string[]
    status: 'active' | 'inactive'
    createdAt?: string
    updatedAt?: string
}

export type UserFormType = {
    name: string
    email: string
    phone?: string
    position: string
    area: string
    type: string
    roles: string[]
    password?: string
}

export type UserFilterType = {
    search?: string
    area?: string
    type?: string
    role?: string
    status?: 'active' | 'inactive'
}
