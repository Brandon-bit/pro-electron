import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/administracion-del-cambio/gestion-de-encuestas',
        name: 'GestionDeEncuestas',
        component: () => import('@/modules/DiagramasDeDecision/GestionDeEncuestas/views/SurveyView.vue')
    },
    {
        path: '/administracion-del-cambio/documentos',
        name: 'Documentos',
        component: () => import('@/modules/DiagramasDeDecision/Documentos/views/DocumentView.vue')
    },
    {
        path: '/administracion-del-cambio/gestion-de-examenes',
        name: 'GestionDeExamenes',
        component: () => import('@/modules/DiagramasDeDecision/GestionDeExamenes/views/ExamView.vue')
    },
    {
        path: '/administracion-del-cambio/mapa-de-stakeholders',
        name: 'MapaDeStakeholders',
        component: () => import('@/modules/DiagramasDeDecision/MapaDeStakeholders/views/StakeholderView.vue')
    },
    {
        path: '/administracion-del-cambio/gestion-de-formacion',
        name: 'GestionDeFormacion',
        component: () => import('@/modules/DiagramasDeDecision/GestionDeFormacion/views/TrainingView.vue')
    },
    {
        path: '/administracion-del-cambio/monitoreo-de-adopcion',
        name: 'MonitoreoDeAdopcion',
        component: () => import('@/modules/DiagramasDeDecision/MonitoreoDeAdopcion/views/AdoptionView.vue')
    },
    {
        path: '/administracion-del-cambio/analisis-de-impacto',
        name: 'AnalisisDeImpacto',
        component: () => import('@/modules/DiagramasDeDecision/AnalisisDeImpacto/views/ImpactView.vue')
    },
    {
        path: '/administracion-del-cambio/seguimiento-de-beneficios',
        name: 'SeguimientoDeBeneficios',
        component: () => import('@/modules/DiagramasDeDecision/SeguimientoDeBeneficios/views/BenefitView.vue')
    },
    {
        path: '/administracion-del-cambio/centro-de-feedback',
        name: 'CentroDeFeedback',
        component: () => import('@/modules/DiagramasDeDecision/CentroDeFeedback/views/FeedbackView.vue')
    }
]

export default routes