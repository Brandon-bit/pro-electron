export type NewUserFormType = {
    firstName: string
    lastName: string
    position: string
    area: string
    phone: string
    email: string
    password: string
    confirmPassword: string
    modules: string[]
    roles: string[]
    isAdmin: boolean
}

export type ModuleType = {
    id: string
    name: string
    label: string
    enabled: boolean
}

export type RoleType = {
    id: string
    name: string
    label: string
}
