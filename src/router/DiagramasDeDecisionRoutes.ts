import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/diagramas-de-decision/analisis-de-pareto',
        name: 'AnalisisDePareto',
        component: () => import('@/modules/DiagramasDeDecision/AnalisisDePareto/views/ParetoView.vue')
    },
    {
        path: '/diagramas-de-decision/matriz-causa-y-efecto',
        name: 'MatrizCausaYEfecto',
        component: () => import('@/modules/DiagramasDeDecision/MatrizCausaYEfecto/views/IshikawaView.vue')
    },
    {
        path: '/diagramas-de-decision/5-por-que',
        name: '5PorQue',
        component: () => import('@/modules/DiagramasDeDecision/5PorQue/views/FiveWhysView.vue')
    },
    {
        path: '/diagramas-de-decision/fmea',
        name: 'FMEA',
        component: () => import('@/modules/DiagramasDeDecision/FMEA/views/FMEAView.vue')
    },
    {
        path: '/diagramas-de-decision/spc',
        name: 'SPC',
        component: () => import('@/modules/DiagramasDeDecision/SPC/views/SPCView.vue')
    },
    {
        path: '/diagramas-de-decision/analisis-de-relaciones',
        name: 'AnalisisDeRelaciones',
        component: () => import('@/modules/DiagramasDeDecision/AnalisisDeRelaciones/views/RelationshipView.vue')
    },
    {
        path: '/diagramas-de-decision/lluvia-de-ideas',
        name: 'LluviaDeIdeas',
        component: () => import('@/modules/DiagramasDeDecision/LluviaDeIdeas/views/BrainstormingView.vue')
    },
    {
        path: '/diagramas-de-decision/documentos',
        name: 'Documentos',
        component: () => import('@/modules/DiagramasDeDecision/Documentos/views/DocumentView.vue')
    }
]

export default routes
