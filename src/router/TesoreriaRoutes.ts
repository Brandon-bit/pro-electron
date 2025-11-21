const routes = [
    {
        path: '/tesoreria/bancos',
        name: 'Bancos',
        component: () => import('@/modules/Tesoreria/Bancos/views/BanksListView.vue')
    },
    {
        path: '/tesoreria/tipos-cuenta',
        name: 'Tipos de cuenta',
        component: () => import('@/modules/Tesoreria/TiposCuenta/views/AccountTypesListView.vue')
    },
    {
        path: '/tesoreria/cuentas-bancarias',
        name: 'Cuentas bancarias',
        component: () =>
            import('@/modules/Tesoreria/CuentasBancarias/views/BankAccountsListView.vue')
    },
    {
        path: '/tesoreria/movimientos-bancarios',
        name: 'Movimientos bancarios',
        component: () =>
            import('@/modules/Tesoreria/MovimientosBancarios/views/BankMovementsListView.vue')
    },
    {
        path: '/tesoreria/conciliacion-bancaria',
        name: 'Conciliación bancaria',
        component: () =>
            import('@/modules/Tesoreria/ConciliacionBancaria/views/BankReconciliationsListView.vue')
    },
    {
        path: '/tesoreria/dashboard',
        name: 'Dashboard de tesoreria',
        component: () => import('@/modules/Tesoreria/Dashboard/views/TreasuryDashboardView.vue')
    },
    {
        path: '/tesoreria/clientes',
        name: 'Clientes',
        component: () => import('@/modules/Tesoreria/Clientes/views/ClientsListView.vue'),
        meta: { requiresPermission: 'projects.initiatives.view' }
    },
    {
        path: '/tesoreria/cuentas-por-cobrar',
        name: 'Cuentas por cobrar',
        component: () =>
            import('@/modules/Tesoreria/CuentasPorCobrar/views/AccountsReceivableListView.vue')
    },
    {
        path: '/tesoreria/crear-cuenta-por-cobrar',
        name: 'Crear cuenta por cobrar',
        component: () =>
            import(
                '@/modules/Tesoreria/CuentasPorCobrar/views/CreateUpdateAccountReceivableView.vue'
            )
    },
    {
        path: '/tesoreria/actualizar-cuenta-por-cobrar/:id',
        name: 'Actualizar cuenta por cobrar',
        component: () =>
            import(
                '@/modules/Tesoreria/CuentasPorCobrar/views/CreateUpdateAccountReceivableView.vue'
            )
    },
    {
        path: '/tesoreria/proveedores',
        name: 'Proveedores',
        component: () => import('@/modules/Tesoreria/Proveedores/views/SuppliersListView.vue')
    },
    {
        path: '/tesoreria/cuentas-por-pagar',
        name: 'Cuentas por pagar',
        component: () =>
            import('@/modules/Tesoreria/CuentasPorPagar/views/AccountsPayableListView.vue')
    },
    {
        path: '/tesoreria/crear-cuenta-por-pagar',
        name: 'Crear cuenta por pagar',
        component: () =>
            import('@/modules/Tesoreria/CuentasPorPagar/views/CreateUpdateAccountPayableView.vue')
    },
    {
        path: '/tesoreria/actualizar-cuenta-por-pagar/:id',
        name: 'Actualizar cuenta por pagar',
        component: () =>
            import('@/modules/Tesoreria/CuentasPorPagar/views/CreateUpdateAccountPayableView.vue')
    }
]

export default routes
