import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import InSessionLayout from '@core/InSessionLayout/views/InSessionLayout.vue'
import OutSessionLayout from '@core/OutSessionLayout/views/OutSessionLayout.vue'
import InSessionRoutes from './InSessionRoutes'
import Login from '@core/OutSessionLayout/views/Login.vue'
import NavBarRoutes from './NavBarRoutes'
import DefaultRoutes from './DefaultModuleRoutes'
import InventarioRoutes from './InventarioRoutes'
import ProcesosRoutes from './ProcesosRoutes'
// import MarketingRoutes from './MarketingRoutes'
// import PosRoutes from './POSRoutes'
import ContabilidadRoutes from './ContabilidadRoutes'
// import ComprasRoutes from './ComprasRoutes'
import AdministracionRoutes from './AdministracionRoutes'
// import FacturacionRoutes from './FacturacionRoutes'
// import RRHHRoutes from './RRHHRoutes'
// import NominaRoutes from './NominaRoutes'
// import SalesRoutes from './SalesRoute'
import PlaneacionEstrategicaRoutes from './PlaneacionEstrategicaRoutes'
import MesaDeControlRoutes from './MesaDeControlRoutes'
import FiscalRoutes from './FiscalRoutes'
import InversionesRoutes from './InversionesRoutes'
import GestionDeProyectosRoutes from './GestionDeProyectosRoutes'
import DiagramasDeDecisionRoutes from './DiagramasDeDecisionRoutes'
import AdministracionDelCambioRoutes from './AdministracionDelCambioRoutes'

const routes = [
    {
        path: '/',
        component: InSessionLayout,
        meta: { requiresAuth: true },
        children: [
            ...InSessionRoutes,
            ...DefaultRoutes,
            ...NavBarRoutes,
            ...GestionDeProyectosRoutes,
            ...ProcesosRoutes,
            ...InventarioRoutes,
            ...ContabilidadRoutes,
            // ...MarketingRoutes,
            // ...ComprasRoutes,
            ...AdministracionRoutes,
            // ...FacturacionRoutes,
            // ...PosRoutes,
            // ...RRHHRoutes,
            // ...NominaRoutes,
            // ...SalesRoutes,
            ...PlaneacionEstrategicaRoutes,
            ...MesaDeControlRoutes,
            ...FiscalRoutes,
            ...InversionesRoutes,
            ...DiagramasDeDecisionRoutes,
            ...AdministracionDelCambioRoutes
        ]
    },
    {
        path: '/login',
        component: OutSessionLayout,
        meta: { requiresGuest: true },
        children: [{ path: '', name: 'login', component: Login }]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/shared/views/NotFound.vue')
    }
]

const isElectron = navigator.userAgent.toLowerCase().includes('electron')

const router = createRouter({
    history: isElectron ? createWebHashHistory() : createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    // Evitar múltiples verificaciones si ya está cargando
    if (authStore.isLoading) {
        await authStore.checkAuth()
    }

    const isLoggedIn = authStore.isAuthenticated

    if (to.meta.requiresAuth && !isLoggedIn) {
        // Redirige al login y pasa la ruta original como query
        return next({ path: '/login', query: { redirect: to.fullPath } })
    }

    if (to.meta.requiresGuest && isLoggedIn) {
        // Si el usuario ya está logueado y entra al login, redirígelo al dashboard
        return next('/')
    }

    next()
})

export default router
