import type { ModuleType, RoleType } from '@/modules/DefaultModule/Usuarios/Nuevo/types/newUserTypes'

const useNewUser = () => {
    
    const availableModules: ModuleType[] = [
        { id: 'proyectos', name: 'Proyectos', label: 'Proyectos', enabled: true },
        { id: 'procesos', name: 'Procesos', label: 'Procesos', enabled: true },
        { id: 'marketing', name: 'Marketing', label: 'Marketing', enabled: true },
        { id: 'ventas', name: 'Ventas', label: 'Ventas', enabled: true },
        { id: 'mantenimiento', name: 'Mantenimiento', label: 'Mantenimiento', enabled: true }
    ]

    const availableRoles: RoleType[] = [
        { id: 'auditor', name: 'Auditor', label: 'Auditor' },
        { id: 'lider', name: 'Líder', label: 'Líder' },
        { id: 'manager', name: 'Manager', label: 'Manager' },
        { id: 'procesos', name: 'Procesos', label: 'Procesos' },
        { id: 'sponsor', name: 'Sponsor', label: 'Sponsor' }
    ]

    const availablePositions = [
        'Marketing',
        'TI',
        'RH',
        'Comercial',
        'Finanzas',
        'Operaciones'
    ]

    const availableAreas = [
        'Marketing',
        'Sistemas',
        'Recursos Humanos',
        'Comercial',
        'Finanzas',
        'Publicidad',
        'Operaciones'
    ]

    return {
        availableModules,
        availableRoles,
        availablePositions,
        availableAreas
    }
}

export default useNewUser
