const routes = [
    {
        path: '/fiscal/facturas-emitidas',
        name: 'FacturasEmitidas',
        component: () =>
            import('@/modules/Fiscal/FacturasEmitidas/views/IssuedInvoicesView.vue')
    },
    {
        path: '/fiscal/facturas-recibidas',
        name: 'FacturasRecibidas',
        component: () =>
            import('@/modules/Fiscal/FacturasRecibidas/views/ReceivedInvoicesView.vue')
    },
    {
        path: '/fiscal/provisionales',
        name: 'Provisionales',
        component: () =>
            import('@/modules/Fiscal/Provisionales/views/ProvisionalPaymentsView.vue')
    },
    {
        path: '/fiscal/anuales',
        name: 'Anuales',
        component: () =>
            import('@/modules/Fiscal/Anuales/views/AnnualDeclarationsView.vue')
    },
    {
        path: '/fiscal/informativas',
        name: 'Informativas',
        component: () =>
            import('@/modules/Fiscal/Informativas/views/InformativeDeclarationsView.vue')
    }
]

export default routes
