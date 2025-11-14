const routes = [
    {
        path: '/mesa-de-control/pipeline-de-operaciones',
        name: 'Pipeline de Operaciones',
        component: () => import('@mesa-de-control/PipelineDeOperaciones/views/PipelineView.vue')
    }
]

export default routes
