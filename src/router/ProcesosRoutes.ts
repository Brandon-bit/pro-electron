const routes = [
    // Dashboard
    {
        path: '/procesos',
        name: 'Procesos',
        component: () =>
            import('@/modules/Procesos/Dashboard/views/ProcesosDashboardView.vue')
    },
    // Procesos de Negocio
    {
        path: '/procesos/procesos-de-negocio/cadenas-de-valor',
        name: 'Cadenas de valor',
        component: () =>
            import('@/modules/Procesos/ProcesosDeNegocio/CadenasDeValor/views/CadenasDeValorView.vue')
    },
    {
        path: '/procesos/procesos-de-negocio/cadenas-de-valor/:id',
        name: 'Editar Cadena de valor',
        component: () =>
            import('@/modules/Procesos/ProcesosDeNegocio/CadenasDeValor/views/ValueChainDetailView.vue')
    },
    {
        path: '/procesos/procesos-de-negocio/diagrama-de-procesos',
        name: 'Diagrama de Procesos',
        component: () =>
            import('@/modules/Procesos/ProcesosDeNegocio/DiagramasDeProceso/views/ProcessDiagramsView.vue')
    },
    {
        path: '/procesos/procesos-de-negocio/diagrama-de-procesos/editor/:processId/:diagramId',
        name: 'EditarDiagrama',
        component: () =>
            import('@/modules/Procesos/ProcesosDeNegocio/DiagramasDeProceso/views/DiagramEditorView.vue')
    },
    {
        path: '/procesos/procesos-de-negocio/implementacion-de-olas',
        name: 'Implementación de Olas',
        component: () =>
            import('@/modules/Procesos/ProcesosDeNegocio/ImplementacionDeOlas/views/General.vue')
    },
    {
        path: '/procesos/procesos-de-negocio/matriz-de-vobo',
        name: 'Matriz de VoBo',
        component: () =>
            import('@/modules/Procesos/ProcesosDeNegocio/MatrizDeVobo/views/General.vue')
    },
    {
        path: '/procesos/procesos-de-negocio/metodologia-de-procesos',
        name: 'Metodología de Procesos',
        component: () =>
            import('@/modules/Procesos/ProcesosDeNegocio/MetodologiaDeProcesos/views/General.vue')
    },
    {
        path: '/procesos/procesos-de-negocio/matriz-reduccion-de-tiempos',
        name: 'Matriz Reducción de Tiempos',
        component: () =>
            import('@/modules/Procesos/ProcesosDeNegocio/MatrizReduccionDeTiempos/views/General.vue')
    },
    {
        path: '/procesos/procesos-de-negocio/rasci',
        name: 'RASCI',
        component: () =>
            import('@/modules/Procesos/ProcesosDeNegocio/Rasci/views/General.vue')
    },
    {
        path: '/procesos/procesos-de-negocio/tiempos-y-movimientos',
        name: 'Tiempos y Movimientos',
        component: () =>
            import('@/modules/Procesos/ProcesosDeNegocio/TiemposYMovimientos/views/General.vue')
    },
    // Manuales y Políticas
    {
        path: '/procesos/manuales-y-politicas/matriz-de-manuales',
        name: 'Matriz de Manuales',
        component: () =>
            import('@/modules/Procesos/ManualesYPoliticas/MatrizDeManuales/views/General.vue')
    },
    {
        path: '/procesos/manuales-y-politicas/auditorias',
        name: 'Auditorías',
        component: () =>
            import('@/modules/Procesos/ManualesYPoliticas/Auditorias/views/General.vue')
    }
]

export default routes
