const routes = [
    {
        path: '/contabilidad',
        name: 'Contabilidad',
        component: () =>
            import('@contabilidad/Contabilidad/Dashboard/views/AccountingDashboardView.vue')
    },
    {
        path: '/contabilidad/activos',
        name: 'Activos',
        component: () =>
            import('@contabilidad/Contabilidad/ActivosFijos/views/FixedAssetsView.vue')
    },
    {
        path: '/contabilidad/activos-fijos/create',
        name: 'CreateFixedAsset',
        component: () =>
            import('@contabilidad/Contabilidad/ActivosFijos/views/CreateUpdateFixedAssetView.vue')
    },
    {
        path: '/contabilidad/activos-fijos/edit/:id',
        name: 'EditFixedAsset',
        component: () =>
            import('@contabilidad/Contabilidad/ActivosFijos/views/CreateUpdateFixedAssetView.vue')
    },
    {
        path: '/contabilidad/activos-fijos/view/:id',
        name: 'ViewFixedAsset',
        component: () =>
            import('@contabilidad/Contabilidad/ActivosFijos/views/CreateUpdateFixedAssetView.vue')
    },
    {
        path: '/contabilidad/catalogo-de-cuentas',
        name: 'CatalogoDeCuentas',
        component: () =>
            import('@contabilidad/Contabilidad/CatalogoDeCuentas/views/AccountsCatalogView.vue')
    },
    {
        path: '/contabilidad/catalogo-de-cuentas/create',
        name: 'CreateAccount',
        component: () =>
            import('@contabilidad/Contabilidad/CatalogoDeCuentas/views/CreateUpdateAccountView.vue')
    },
    {
        path: '/contabilidad/catalogo-de-cuentas/edit/:id',
        name: 'EditAccount',
        component: () =>
            import('@contabilidad/Contabilidad/CatalogoDeCuentas/views/CreateUpdateAccountView.vue')
    },
    {
        path: '/contabilidad/catalogo-de-cuentas/view/:id',
        name: 'ViewAccount',
        component: () =>
            import('@contabilidad/Contabilidad/CatalogoDeCuentas/views/CreateUpdateAccountView.vue')
    },
    {
        path: '/contabilidad/libros-de-diario',
        name: 'LibrosDiario',
        component: () =>
            import('@contabilidad/Contabilidad/LibrosDeDiario/views/JournalBooksView.vue')
    },
    {
        path: '/contabilidad/polizas-de-diario',
        name: 'PolizasDeDiario',
        component: () =>
            import('@contabilidad/Contabilidad/PolizasDeDiario/views/JournalPoliciesView.vue')
    },
    {
        path: '/contabilidad/polizas-de-ingresos',
        name: 'PolizasDeIngresos',
        component: () =>
            import('@contabilidad/Contabilidad/PolizasDeIngresos/views/IncomePoliciesView.vue')
    },
    {
        path: '/contabilidad/polizas-de-gastos',
        name: 'PolizasDeGastos',
        component: () =>
            import('@contabilidad/Contabilidad/PolizasDeGastos/views/ExpensePoliciesView.vue')
    },
    {
        path: '/contabilidad/depreciacion',
        name: 'Depreciacion',
        component: () =>
            import('@contabilidad/Contabilidad/Depreciacion/views/DepreciationView.vue')
    },
    {
        path: '/contabilidad/polizas-contables',
        name: 'PolizasContables',
        component: () =>
            import('@contabilidad/Contabilidad/PolizasContables/views/AccountingPoliciesView.vue')
    },
    {
        path: '/contabilidad/polizas-contables/create',
        name: 'CreateAccountingPolicy',
        component: () =>
            import('@contabilidad/Contabilidad/PolizasContables/views/CreateAccountingPolicyView.vue')
    },
    {
        path: '/contabilidad/polizas-contables/edit/:id',
        name: 'EditAccountingPolicy',
        component: () =>
            import('@contabilidad/Contabilidad/PolizasContables/views/EditAccountingPolicyView.vue')
    },
    {
        path: '/contabilidad/operacion-de-movimientos',
        name: 'OperacionDeMovimientos',
        component: () =>
            import('@contabilidad/Contabilidad/OperacionDeMovimientos/views/AccountingMovementsView.vue')
    },

    // Configuración
    {
        path: '/contabilidad/configuracion/general',
        name: 'ConfiguracionGeneral',
        component: () =>
            import('@contabilidad/Configuracion/GeneralConfig/views/GeneralConfigView.vue')
    },
    {
        path: '/contabilidad/configuracion/mascara',
        name: 'ConfiguracionMascara',
        component: () =>
            import('@contabilidad/Configuracion/MaskConfig/views/MaskConfigView.vue')
    },
    {
        path: '/contabilidad/configuracion/account-types',
        name: 'TiposCuenta',
        component: () =>
            import('@contabilidad/Configuracion/AccountTypes/views/AccountTypesView.vue')
    },
    {
        path: '/contabilidad/configuracion/account-nature',
        name: 'NaturalezaCuenta',
        component: () =>
            import('@contabilidad/Configuracion/AccountNature/views/AccountNatureView.vue')
    },
    {
        path: '/contabilidad/configuracion/account-clasification',
        name: 'ClasificacionCuenta',
        component: () =>
            import('@contabilidad/Configuracion/AccountClasification/views/AccountClasificationView.vue')
    }
]

export default routes