<script setup lang="ts">
import { onMounted, watch, ref, onUnmounted } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import type { Node, Edge } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { extractDniFromId } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/mappingEDTData'
import type { EDTNodeType } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/types/edtTypes'

const edtStore = useEDTStore()
const modalStore = useModalStore()

const flowNodes = ref<Node[]>([])
const flowEdges = ref<Edge[]>([])
const isDarkMode = ref(false)
let themeObserver: MutationObserver | null = null

const resolveThemeFromStorage = () => {
    if (typeof window === 'undefined') return

    const appTheme = localStorage.getItem('app-theme')
    // corporate -> light, business -> dark
    isDarkMode.value = appTheme === 'business'
}

// ============================================
// HANDLERS PARA ETAPAS
// ============================================

const handleAddEtapa = () => {
    edtStore.setEtapa()
    modalStore.open(edtStore.etapaModalId, { type: 'CREATE', title: 'Agregar Etapa' })
}

const handleEditEtapa = (id: string, data: any) => {
    const dni = extractDniFromId(id)
    edtStore.setEtapa({
        dni,
        nombre: data.label,
        psn: data.psn || 0,
        activo: data.activo ?? true
    })
    modalStore.open(edtStore.etapaModalId, { type: 'EDIT', title: 'Editar Etapa' })
}

const handleDeleteEtapa = (id: string, data: any) => {
    const dni = extractDniFromId(id)
    edtStore.setEtapa({
        dni,
        nombre: data.label,
        psn: data.psn || 0,
        activo: data.activo ?? true
    })
    modalStore.open(edtStore.etapaModalId, { type: 'DELETE', title: 'Eliminar Etapa' })
}

// ============================================
// HANDLERS PARA ACTIVIDADES
// ============================================

const handleAddActividad = (etapaId: string) => {
    const dniEtapa = extractDniFromId(etapaId)
    edtStore.setActividad()
    edtStore.parentContext = { id: etapaId, dni: dniEtapa, type: 'etapa' }
    modalStore.open(edtStore.actividadModalId, { type: 'CREATE', title: 'Agregar Actividad' })
}

const handleEditActividad = (id: string, etapaId: string, data: any) => {
    const dni = extractDniFromId(id)
    const dniEtapa = extractDniFromId(etapaId)
    edtStore.setActividad({
        dni,
        dniEtapa,
        nombre: data.label,
        psn: data.psn || 0,
        dias: data.dias || 1,
        activo: data.activo ?? true
    })
    modalStore.open(edtStore.actividadModalId, { type: 'EDIT', title: 'Editar Actividad' })
}

const handleDeleteActividad = (id: string, etapaId: string, data: any) => {
    const dni = extractDniFromId(id)
    const dniEtapa = extractDniFromId(etapaId)
    edtStore.setActividad({
        dni,
        dniEtapa,
        nombre: data.label,
        psn: data.psn || 0,
        dias: data.dias || 1,
        activo: data.activo ?? true
    })
    modalStore.open(edtStore.actividadModalId, { type: 'DELETE', title: 'Eliminar Actividad' })
}

// ============================================
// HANDLERS PARA SUB-ACTIVIDADES
// ============================================

const handleAddSubActividad = (actividadId: string) => {
    const dniActividad = extractDniFromId(actividadId)
    edtStore.setSubActividad()
    edtStore.parentContext = { id: actividadId, dni: dniActividad, type: 'actividad' }
    modalStore.open(edtStore.subactividadModalId, { type: 'CREATE', title: 'Agregar Sub-actividad' })
}

const handleEditSubActividad = (id: string, actividadId: string, data: any) => {
    const dni = extractDniFromId(id)
    const dniActividad = extractDniFromId(actividadId)
    edtStore.setSubActividad({
        dni,
        dniActividad,
        nombre: data.label,
        activo: data.activo ?? true
    })
    modalStore.open(edtStore.subactividadModalId, { type: 'EDIT', title: 'Editar Sub-actividad' })
}

const handleDeleteSubActividad = (id: string, actividadId: string, data: any) => {
    const dni = extractDniFromId(id)
    const dniActividad = extractDniFromId(actividadId)
    edtStore.setSubActividad({
        dni,
        dniActividad,
        nombre: data.label,
        activo: data.activo ?? true
    })
    modalStore.open(edtStore.subactividadModalId, { type: 'DELETE', title: 'Eliminar Sub-actividad' })
}

// Construir nodos y edges de vue-flow a partir del árbol EDT usando un layout jerárquico centrado
const buildFlowFromEDT = (root: EDTNodeType | null | undefined) => {
    const nodes: Node[] = []
    const edges: Edge[] = []

    if (!root) {
        flowNodes.value = []
        flowEdges.value = []
        return
    }

    const horizontalGap = 260
    const verticalGap = 150

    // Primer paso: calcular posiciones X/Y en una pasada recursiva estilo "tree layout"
    let nextX = 0
    const positions = new Map<string, { x: number; y: number }>()

    const layout = (node: EDTNodeType, depth: number): { minX: number; maxX: number } => {
        const id = String(node.id)

        if (!node.children || node.children.length === 0) {
            const x = nextX
            nextX += 1
            const y = depth
            positions.set(id, { x, y })
            return { minX: x, maxX: x }
        }

        let minX = Number.POSITIVE_INFINITY
        let maxX = Number.NEGATIVE_INFINITY

        node.children.forEach(child => {
            const childSpan = layout(child, depth + 1)
            minX = Math.min(minX, childSpan.minX)
            maxX = Math.max(maxX, childSpan.maxX)
        })

        const x = (minX + maxX) / 2
        const y = depth
        positions.set(id, { x, y })
        return { minX, maxX }
    }

    layout(root, 0)

    // Segundo paso: construir nodos y edges usando las posiciones calculadas
    const buildNodesAndEdges = (node: EDTNodeType, parentId?: string) => {
        const id = String(node.id)
        const pos = positions.get(id)
        if (!pos) return

        const levelClasses = ['level-proyecto', 'level-etapa', 'level-actividad', 'level-subactividad']
        const nodeClass = levelClasses[node.level] || 'level-default'

        nodes.push({
            id,
            position: {
                x: pos.x * horizontalGap,
                y: pos.y * verticalGap
            },
            data: {
                label: node.name,
                level: node.level,
                psn: node.psn,
                dias: node.dias,
                activo: node.activo,
                childrenCount: node.childrenCount || 0,
                parentId: parentId || null
            },
            // El nodo raíz usa un tipo personalizado con botón flotante
            // Etapas (nivel 1), actividades (nivel 2) y subactividades (nivel 3) usan tipos personalizados con acciones
            type:
                node.level === 0
                    ? 'rootNode'
                    : node.level === 1
                        ? 'stageNode'
                        : node.level === 2
                            ? 'activityNode'
                            : node.level === 3
                                ? 'subactivityNode'
                                : 'default',
            class: nodeClass
        })

        if (parentId) {
            edges.push({
                id: `${parentId}-${id}`,
                source: parentId,
                target: id,
                animated: false,
                style: { strokeWidth: 2.5 }
            })
        }

        if (node.children && node.children.length > 0) {
            node.children.forEach(child => buildNodesAndEdges(child, id))
        }
    }

    buildNodesAndEdges(root)

    flowNodes.value = nodes
    flowEdges.value = edges
}

onMounted(() => {
    resolveThemeFromStorage()
    buildFlowFromEDT(edtStore.edtRoot)

    // Observar cambios de tema a través de data-theme en el elemento html
    if (typeof window !== 'undefined') {
        themeObserver = new MutationObserver(() => {
            resolveThemeFromStorage()
        })

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        })
    }
})

onUnmounted(() => {
    if (themeObserver) {
        themeObserver.disconnect()
        themeObserver = null
    }
})

watch(
    () => edtStore.edtRoot,
    (newRoot) => {
        resolveThemeFromStorage()
        buildFlowFromEDT(newRoot)
    },
    { deep: true }
)
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-6">
            <h2 class="card-title mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined">account_tree</span>
                Diagrama EDT
            </h2>

            <div class="edt-flow-wrapper" :class="isDarkMode ? 'edt-flow-dark' : 'edt-flow-light'">
                <VueFlow
                    v-if="flowNodes.length"
                    v-model:nodes="flowNodes"
                    v-model:edges="flowEdges"
                    fit-view
                    :min-zoom="0.25"
                    :max-zoom="1.5"
                    class="edt-flow"
                >
                    <Background :pattern-color="isDarkMode ? '#4b5563' : '#e5e7eb'" :gap="32" />

                    <!-- Nodo raíz personalizado con botón flotante para agregar etapas -->
                    <template #node-rootNode="{ data }">
                        <div class="vue-flow__node level-proyecto node-root">
                            <div class="node-root-content">
                                <div class="node-root-title">INICIATIVA</div>
                                <div class="node-root-name">{{ data.label }}</div>
                                <div v-if="data.childrenCount !== undefined" class="node-info">
                                    <span class="badge badge-sm badge-ghost">{{ data.childrenCount }} etapas</span>
                                </div>
                            </div>
                            <BaseButton
                                icon="add"
                                text=""
                                class-name="btn-root-add btn-xs btn-success"
                                title="Agregar etapa"
                                @click.stop="handleAddEtapa"
                            />
                        </div>
                    </template>

                    <!-- Nodo de etapa con botones de acciones -->
                    <template #node-stageNode="{ id, data }">
                        <div class="vue-flow__node level-etapa node-stage">
                            <div class="node-stage-content">
                                <div class="node-stage-name">{{ data.label }}</div>
                                <div class="node-info-row">
                                    <span v-if="data.psn !== undefined" class="badge badge-xs badge-ghost">PSN: {{ data.psn }}</span>
                                    <span v-if="data.childrenCount !== undefined" class="badge badge-xs badge-ghost">{{ data.childrenCount }} actividades</span>
                                </div>
                            </div>
                            <div class="stage-actions">
                                <BaseButton
                                    icon="edit"
                                    text=""
                                    class-name="btn-stage-action btn-xs btn-secondary"
                                    title="Editar etapa"
                                    @click.stop="handleEditEtapa(id, data)"
                                />
                                <BaseButton
                                    icon="delete"
                                    text=""
                                    class-name="btn-stage-action btn-xs btn-warning"
                                    title="Eliminar etapa"
                                    @click.stop="handleDeleteEtapa(id, data)"
                                />
                                <BaseButton
                                    icon="add"
                                    text=""
                                    class-name="btn-stage-action btn-xs btn-success"
                                    title="Agregar actividad"
                                    @click.stop="handleAddActividad(id)"
                                />
                            </div>
                        </div>
                    </template>

                    <!-- Nodo de actividad con botones de acciones (mismo estilo que etapa, titles distintos) -->
                    <template #node-activityNode="{ id, data }">
                        <div class="vue-flow__node level-actividad node-stage">
                            <div class="node-stage-content">
                                <div class="node-stage-name">{{ data.label }}</div>
                                <div class="node-info-row">
                                    <span v-if="data.psn !== undefined" class="badge badge-xs badge-ghost">PSN: {{ data.psn }}</span>
                                    <span v-if="data.dias !== undefined" class="badge badge-xs badge-ghost">{{ data.dias }} días</span>
                                    <span v-if="data.childrenCount !== undefined" class="badge badge-xs badge-ghost">{{ data.childrenCount }} sub-act.</span>
                                </div>
                            </div>
                            <div class="stage-actions">
                                <BaseButton
                                    icon="edit"
                                    text=""
                                    class-name="btn-stage-action btn-xs btn-secondary"
                                    title="Editar actividad"
                                    @click.stop="handleEditActividad(id, data.parentId, data)"
                                />
                                <BaseButton
                                    icon="delete"
                                    text=""
                                    class-name="btn-stage-action btn-xs btn-warning"
                                    title="Eliminar actividad"
                                    @click.stop="handleDeleteActividad(id, data.parentId, data)"
                                />
                                <BaseButton
                                    icon="add"
                                    text=""
                                    class-name="btn-stage-action btn-xs btn-success"
                                    title="Agregar subactividad"
                                    @click.stop="handleAddSubActividad(id)"
                                />
                            </div>
                        </div>
                    </template>

                    <!-- Nodo de subactividad con botones de acciones (solo editar y eliminar) -->
                    <template #node-subactivityNode="{ id, data }">
                        <div class="vue-flow__node level-subactividad node-stage">
                            <div class="node-stage-content">
                                <div class="node-stage-name">{{ data.label }}</div>
                            </div>
                            <div class="stage-actions">
                                <BaseButton
                                    icon="edit"
                                    text=""
                                    class-name="btn-stage-action btn-xs btn-secondary"
                                    title="Editar subactividad"
                                    @click.stop="handleEditSubActividad(id, data.parentId, data)"
                                />
                                <BaseButton
                                    icon="delete"
                                    text=""
                                    class-name="btn-stage-action btn-xs btn-warning"
                                    title="Eliminar subactividad"
                                    @click.stop="handleDeleteSubActividad(id, data.parentId, data)"
                                />
                            </div>
                        </div>
                    </template>
                </VueFlow>
                <div v-else class="flex items-center justify-center h-[600px] text-sm opacity-60">
                    No hay datos de EDT para mostrar.
                </div>
            </div>

            <!-- Instrucciones -->
            <div class="mt-6 p-4 bg-base-200 rounded-lg border border-base-300">
                <h3 class="font-semibold text-sm mb-2 flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">lightbulb</span>
                    Instrucciones:
                </h3>
                <ul class="text-sm opacity-70 space-y-1">
                    <li>• Usa el <strong>scroll</strong> para hacer zoom</li>
                    <li>• Arrastra para mover el diagrama</li>
                    <li>• Los colores representan niveles: Proyecto, Etapa, Actividad, Sub-actividad</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style>
.edt-flow-wrapper {
    width: 100%;
    height: 650px;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    overflow: hidden;
}

.edt-flow-wrapper.edt-flow-light {
    background: #ffffff;
    border-color: #e5e7eb;
}

.edt-flow-wrapper.edt-flow-dark {
    background: #020617;
    border-color: #1f293b;
}

.edt-flow {
    width: 100%;
    height: 100%;
}

/* Colores por nivel */
.vue-flow__node.level-proyecto {
    background: #8b5cf6;
    color: #ffffff;
    border: 2px solid #6d28d9;
}

.vue-flow__node.level-etapa {
    background: #ec4899;
    color: #ffffff;
    border: 0;
}

.vue-flow__node.level-actividad {
    background: #3b82f6;
    color: #ffffff;
    border: 0;
}

.vue-flow__node.level-subactividad {
    background: #10b981;
    color: #ffffff;
    border: 0;
}

.vue-flow__node {
    border-radius: 0.5rem;
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 600;
    box-shadow: none; /* sin sombreado para evitar doble recuadro */
}

.edt-flow-light .vue-flow__edge-path {
    stroke: #64748b;
}

.edt-flow-dark .vue-flow__edge-path {
    stroke: #9ca3af;
}

/* Nodo raíz con botón flotante */
.node-root {
    position: relative;
    border-width: 0 !important; /* sin borde extra en el nodo raíz */
    box-shadow: none !important; /* sin sombreado para el nodo raíz */
}

.node-root-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.node-root-title {
    font-size: 11px;
    text-transform: uppercase;
    opacity: 0.9;
}

.node-root-name {
    font-size: 14px;
}

.node-info {
    margin-top: 4px;
    display: flex;
    gap: 4px;
    justify-content: center;
}

.btn-root-add {
    position: absolute;
    right: -8px;  /* ligeramente fuera del borde derecho */
    top: -20px;   /* más arriba del borde superior, como en el ajuste manual */
    transform: none;
    padding: 0; /* deja que DaisyUI controle el tamaño */
}

.btn-root-add:hover {
    transform: none;
}

/* Etapas: nodo y botones de acción */
.node-stage {
    position: relative;
    box-shadow: none !important; /* sin sombreado para etapas */
}

.node-stage-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
}

.node-stage-name {
    font-size: 13px;
    font-weight: 600;
}

.node-info-row {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: center;
}

.stage-actions {
    position: absolute;
    top: -24px; /* más arriba sobre el borde */
    right: -4px;
    display: flex;
    gap: 3px; /* un poco más de separación entre botones */
}

.btn-stage-action {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    border: none;
    cursor: pointer;
}

.btn-stage-action:hover {
    transform: none;
}
</style>
