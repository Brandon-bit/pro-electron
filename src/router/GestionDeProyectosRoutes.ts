const routes = [
    {
        path: '/gestion-de-proyectos/analisis-de-iniciativas',
        name: 'AnalisisDeIniciativas',
        component: () => import('@/modules/GestionDeProyectos/AnalisisDeIniciativas/views/InitiativeView.vue')
    },
    {
        path: '/gestion-de-proyectos/priorizacion',
        name: 'Priorizacion',
        component: () => import('@/modules/GestionDeProyectos/Priorizacion/views/PrioritizationView.vue')
    },
    {
        path: '/gestion-de-proyectos/edt-del-proyecto',
        name: 'EDTDelProyecto',
        component: () => import('@/modules/GestionDeProyectos/EDTDelProyecto/views/EDTView.vue')
    },
    {
        path: '/gestion-de-proyectos/sow-del-proyecto',
        name: 'SOWDelProyecto',
        component: () => import('@/modules/GestionDeProyectos/SOWDelProyecto/views/SOWView.vue')
    },
    {
        path: '/gestion-de-proyectos/alta-de-proyectos',
        name: 'AltaDeProyectos',
        component: () => import('@/modules/GestionDeProyectos/AltaDeProyectos/views/ProjectRegistrationView.vue')
    },
    {
        path: '/gestion-de-proyectos/gantt',
        name: 'Gantt',
        component: () => import('@/modules/GestionDeProyectos/Gantt/views/GanttMatrixView.vue')
    },
    {
        path: '/gestion-de-proyectos/costos',
        name: 'Costos',
        component: () => import('@/modules/GestionDeProyectos/Costos/views/CostsView.vue')
    },
    {
        path: '/gestion-de-proyectos/estatus-financiero',
        name: 'EstatusFinanciero',
        component: () => import('@/modules/GestionDeProyectos/EstatusFinanciero/views/FinancialStatusView.vue')
    },
    {
        path: '/gestion-de-proyectos/matriz-de-evidencias',
        name: 'MatrizDeEvidencias',
        component: () => import('@/modules/GestionDeProyectos/MatrizDeEvidencias/views/EvidenceMatrixView.vue')
    },
    {
        path: '/gestion-de-proyectos/resumen-de-proyectos',
        name: 'ResumenDeProyectos',
        component: () => import('@/modules/GestionDeProyectos/ResumenDeProyectos/views/ProjectsSummaryView.vue')
    },
    {
        path: '/gestion-de-proyectos/caso-de-negocio',
        name: 'CasoDeNegocio',
        component: () => import('@/modules/GestionDeProyectos/CasoDeNegocio/views/BusinessCaseView.vue')
    },
    {
        path: '/gestion-de-proyectos/control-de-riesgos',
        name: 'ControlDeRiesgos',
        component: () => import('@/modules/GestionDeProyectos/ControlDeRiesgos/views/RiskControlView.vue')
    },
    {
        path: '/gestion-de-proyectos/control-de-cambios',
        name: 'ControlDeCambios',
        component: () => import('@/modules/GestionDeProyectos/ControlDeCambios/views/ChangeControlView.vue')
    },
    {
        path: '/gestion-de-proyectos/charter-de-proyectos',
        name: 'CharterDeProyectos',
        component: () => import('@/modules/GestionDeProyectos/CharterDeProyectos/views/CharterView.vue')
    },
    {
        path: '/gestion-de-proyectos/minutas',
        name: 'Minutas',
        component: () => import('@/modules/GestionDeProyectos/Minutas/views/MinutesView.vue')
    },
    {
        path: '/gestion-de-proyectos/lecciones-aprendidas',
        name: 'LeccionesAprendidas',
        component: () => import('@/modules/GestionDeProyectos/LeccionesAprendidas/views/LessonsView.vue')
    }
]

export default routes