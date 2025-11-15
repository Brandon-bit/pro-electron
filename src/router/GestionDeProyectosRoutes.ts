const routes = [
    {
        path: '/gestion-de-proyectos/analisis-de-iniciativas',
        name: 'AnalisisDeIniciativas',
        component: () => import('@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/views/InitiativeView.vue')
    },
    {
        path: '/gestion-de-proyectos/priorizacion',
        name: 'Priorizacion',
        component: () => import('@/modules/GestionDeProyectos/Operacion/Priorizacion/views/PrioritizationView.vue')
    },
    {
        path: '/gestion-de-proyectos/edt-del-proyecto',
        name: 'EDTDelProyecto',
        component: () => import('@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/views/EDTView.vue')
    },
    {
        path: '/gestion-de-proyectos/sow-del-proyecto',
        name: 'SOWDelProyecto',
        component: () => import('@/modules/GestionDeProyectos/Operacion/SOWDelProyecto/views/SOWView.vue')
    },
    {
        path: '/gestion-de-proyectos/alta-de-proyectos',
        name: 'AltaDeProyectos',
        component: () => import('@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/views/ProjectRegistrationView.vue')
    },
    {
        path: '/gestion-de-proyectos/portafolio-de-proyectos',
        name: 'PortafolioDeProyectos',
        component: () => import('@/modules/GestionDeProyectos/Operacion/PortafolioDeProyectos/views/PortafolioDeProyectos.vue')
    },
    {
        path: '/gestion-de-proyectos/gantt',
        name: 'Gantt',
        component: () => import('@/modules/GestionDeProyectos/Operacion/Gantt/views/GanttMatrixView.vue')
    },
    {
        path: '/gestion-de-proyectos/costos',
        name: 'Costos',
        component: () => import('@/modules/GestionDeProyectos/Operacion/Costos/views/CostsView.vue')
    },
    {
        path: '/gestion-de-proyectos/estatus-financiero',
        name: 'EstatusFinanciero',
        component: () => import('@/modules/GestionDeProyectos/Operacion/EstatusFinanciero/views/FinancialStatusView.vue')
    },
    {
        path: '/gestion-de-proyectos/matriz-de-evidencias',
        name: 'MatrizDeEvidencias',
        component: () => import('@/modules/GestionDeProyectos/Operacion/MatrizDeEvidencias/views/EvidenceMatrixView.vue')
    },
    {
        path: '/gestion-de-proyectos/resumen-de-proyectos',
        name: 'ResumenDeProyectos',
        component: () => import('@/modules/GestionDeProyectos/Operacion/ResumenDeProyectos/views/ProjectsSummaryView.vue')
    },
    {
        path: '/gestion-de-proyectos/caso-de-negocio',
        name: 'CasoDeNegocio',
        component: () => import('@/modules/GestionDeProyectos/Operacion/CasoDeNegocio/views/BusinessCaseView.vue')
    },
    {
        path: '/gestion-de-proyectos/control-de-riesgos',
        name: 'ControlDeRiesgos',
        component: () => import('@/modules/GestionDeProyectos/Operacion/ControlDeRiesgos/views/RiskControlView.vue')
    },
    {
        path: '/gestion-de-proyectos/control-de-cambios',
        name: 'ControlDeCambios',
        component: () => import('@/modules/GestionDeProyectos/Operacion/ControlDeCambios/views/ChangeControlView.vue')
    },
    {
        path: '/gestion-de-proyectos/charter-de-proyectos',
        name: 'CharterDeProyectos',
        component: () => import('@/modules/GestionDeProyectos/Operacion/CharterDeProyectos/views/CharterView.vue')
    },
    {
        path: '/gestion-de-proyectos/minutas',
        name: 'Minutas',
        component: () => import('@/modules/GestionDeProyectos/Operacion/Minutas/views/MinutesView.vue')
    },
    {
        path: '/gestion-de-proyectos/lecciones-aprendidas',
        name: 'LeccionesAprendidas',
        component: () => import('@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/views/LessonsView.vue')
    }
]

export default routes