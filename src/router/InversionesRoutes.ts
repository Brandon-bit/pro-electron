const routes = [
    {
        path: '/inversiones/prospectos',
        name: 'InversionesProspectos',
        component: () =>
            import('@inversiones/Inversion/Prospectos/views/ProspectsView.vue')
    },
    {
        path: '/inversiones/nuevos-socios',
        name: 'NuevosSocios',
        component: () =>
            import('@inversiones/Inversion/NuevosSocios/views/NewPartnerView.vue')
    },
    {
        path: '/inversiones/matriz-socios',
        name: 'MatrizSocios',
        component: () =>
            import('@inversiones/Inversion/MatrizSocios/views/PartnersMatrixView.vue')
    },
    {
        path: '/inversiones/contratos',
        name: 'Contratos',
        component: () =>
            import('@inversiones/Inversion/Operaciones/views/ContractsOperationView.vue')
    },
    {
        path: '/inversiones/escenarios-de-inversion',
        name: 'EscenariosDeInversion',
        component: () =>
            import('@inversiones/Inversion/EscenariosDeInversion/views/InvestmentScenarioView.vue')
    },
    {
        path: '/inversiones/configuracion/tipos-de-contrato',
        name: 'TiposDeContrato',
        component: () =>
            import('@inversiones/Configuracion/TiposDeContrato/views/ContractTypesView.vue')
    },
    {
        path: '/inversiones/configuracion/metas',
        name: 'Metas',
        component: () =>
            import('@inversiones/Configuracion/Metas/views/GoalsView.vue')
    },
    {
        path: '/inversiones/configuracion/prospectos',
        name: 'Prospectos',
        component: () =>
            import('@inversiones/Configuracion/Prospectos/views/ProspectConfigView.vue')
    },
    {
        path: '/inversiones/configuracion/general',
        name: 'General',
        component: () =>
            import('@inversiones/Configuracion/General/views/GeneralConfigView.vue')
    },
    {
        path: '/inversiones/configuracion/checklist-de-documentos',
        name: 'ChecklistDeDocumentos',
        component: () =>
            import('@inversiones/Configuracion/ChecklistDeDocumentos/views/ChecklistView.vue')
    }
]

export default routes

