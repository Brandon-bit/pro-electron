const routes = [
    // Empresas
    {
        path: '/rrhh/empresas',
        name: 'Empresas',
        component: () => import('@rrhh/Empresas/views/CompaniesListView.vue')
    },
    {
        path: '/rrhh/empresas/crear',
        name: 'Crear empresa',
        component: () => import('@rrhh/Empresas/views/CreateUpdateCompanyView.vue')
    },
    {
        path: '/rrhh/empresas/editar/:id',
        name: 'Actualizar empresa',
        component: () => import('@rrhh/Empresas/views/CreateUpdateCompanyView.vue')
    },
    // Sucursales
    {
        path: '/rrhh/sucursales',
        name: 'Sucursales',
        component: () => import('@rrhh/Sucursales/views/BranchesListView.vue')
    },
    // Departamentos
    {
        path: '/rrhh/departamentos',
        name: 'Departamentos',
        component: () => import('@/modules/RRHH/Departamentos/views/DepartmentsListView.vue')
    },
    // Puestos
    {
        path: '/rrhh/puestos',
        name: 'Puestos',
        component: () => import('@/modules/RRHH/Puestos/views/PositionsListView.vue')
    },
    // Empleados
    {
        path: '/rrhh/empleados',
        name: 'Empleados',
        component: () => import('@/modules/RRHH/Empleados/views/EmployeesListView.vue')
    },
    {
        path: '/rrhh/empleados/crear',
        name: 'Crear empleado',
        component: () => import('@/modules/RRHH/Empleados/views/CreateUpdateEmployeeView.vue')
    },
    {
        path: '/rrhh/empleados/editar/:id',
        name: 'Actualizar empleado',
        component: () => import('@/modules/RRHH/Empleados/views/CreateUpdateEmployeeView.vue')
    },
    // Vacaciones
    {
        path: '/rrhh/vacaciones',
        name: 'Vacaciones',
        component: () => import('@/modules/RRHH/Vacaciones/views/VacationsListView.vue')
    },
    {
        path: '/rrhh/dashboard-de-vacaciones',
        name: 'Dashboard de vacaciones',
        component: () =>
            import('@/modules/RRHH/VacacionesDashboard/views/VacationsDashboardView.vue')
    },
    // Comunicaciones Organizacionales
    {
        path: '/rrhh/comunicaciones-organizacionales',
        name: 'Comunicaciones Organizacionales',
        component: () =>
            import('@/modules/RRHH/ComunicacionesOrganizacionales/views/CommunicationsListView.vue')
    },
    {
        path: '/rrhh/comunicaciones-organizacionales/crear',
        name: 'Crear comunicado',
        component: () =>
            import(
                '@/modules/RRHH/ComunicacionesOrganizacionales/views/CreateUpdateCommunicationView.vue'
            )
    },
    {
        path: '/rrhh/comunicaciones-organizacionales/editar/:id',
        name: 'Actualizar comunicado',
        component: () =>
            import(
                '@/modules/RRHH/ComunicacionesOrganizacionales/views/CreateUpdateCommunicationView.vue'
            )
    },
    // Incidencias
    {
        path: '/rrhh/categoria-incidencias',
        name: 'Categoria de Incidencias',
        component: () => import('@/modules/RRHH/CategoriaIncidencias/views/CategoriesView.vue')
    },
    {
        path: '/rrhh/tipo-incidencias',
        name: 'Tipo de Incidencias',
        component: () => import('@/modules/RRHH/TipoIncidencias/views/IncidenceTypesView.vue')
    },
    {
        path: '/rrhh/incidencias',
        name: 'Incidencias',
        component: () => import('@/modules/RRHH/Incidencias/views/IncidencesListView.vue')
    },
    // Vacantes
    {
        path: '/rrhh/vacantes',
        name: 'Vacantes',
        component: () => import('@/modules/RRHH/Vacantes/views/VacanciesListView.vue')
    },
    {
        path: '/rrhh/vacantes/crear',
        name: 'Crear vacante',
        component: () => import('@/modules/RRHH/Vacantes/views/CreateUpdateVacancyView.vue')
    },
    {
        path: '/rrhh/vacantes/editar/:id',
        name: 'Actualizar vacante',
        component: () => import('@/modules/RRHH/Vacantes/views/CreateUpdateVacancyView.vue')
    },
    // Competencias
    {
        path: '/rrhh/competencias',
        name: 'Competencias',
        component: () => import('@/modules/RRHH/Competencias/views/CompetenciesListView.vue')
    },
    // Gestión de Desempeño
    {
        path: '/rrhh/gestion-desempeno',
        name: 'Gestión de Desempeño',
        component: () =>
            import('@/modules/RRHH/GestionDeDesempeno/views/PerformanceManagementView.vue')
    },
    {
        path: '/rrhh/gestion-desempeno/crear',
        name: 'Crear Campaña',
        component: () =>
            import('@/modules/RRHH/GestionDeDesempeno/views/CreateUpdateCampaignView.vue')
    },
    {
        path: '/rrhh/gestion-desempeno/editar/:id',
        name: 'Actualizar Campaña',
        component: () =>
            import('@/modules/RRHH/GestionDeDesempeno/views/CreateUpdateCampaignView.vue')
    },
    // Gestión de Talentos
    {
        path: '/rrhh/gestion-talentos',
        name: 'Gestión de Talentos',
        component: () => import('@/modules/RRHH/GestionTalentos/views/TalentManagementView.vue')
    },
    // Gestión de Beneficios
    {
        path: '/rrhh/gestion-beneficios',
        name: 'Gestión de Beneficios',
        component: () => import('@/modules/RRHH/GestionBeneficios/views/BenefitsView.vue')
    }
]

export default routes
