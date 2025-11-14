<script setup lang="ts">
import { computed } from 'vue'
import type { EDTNodeType } from '@/modules/GestionDeProyectos/EDTDelProyecto/types/edtTypes'
import useEDTStore from '@/modules/GestionDeProyectos/EDTDelProyecto/store/edtStore'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    node: EDTNodeType
}>()

const edtStore = useEDTStore()

const isEditing = computed(() => edtStore.editingNodeId === props.node.id)

const bgColorClass = computed(() => {
    switch (props.node.level) {
        case 0: return 'bg-accent/20 border-accent'
        case 1: return 'bg-primary/10 border-primary/30'
        case 2: return 'bg-secondary/20 border-secondary'
        default: return 'bg-base-300/30 border-base-300'
    }
})

const levelLabel = computed(() => {
    switch (props.node.level) {
        case 0: return 'Proyecto'
        case 1: return 'Etapa'
        case 2: return 'Actividad'
        default: return 'Sub-actividad'
    }
})

const handleDoubleClick = () => {
    edtStore.startEditing(props.node.id, props.node.name)
}

const handleSaveEdit = () => {
    if (edtStore.editingValue.trim()) {
        edtStore.updateNodeName(props.node.id, edtStore.editingValue.trim())
        showNotification('Nodo actualizado', 'success')
    } else {
        edtStore.cancelEditing()
    }
}

const handleAddChild = () => {
    edtStore.addChildNode(props.node)
    showNotification('Nodo agregado', 'success')
}

const handleDelete = () => {
    if (props.node.id === 'root') {
        showNotification('No se puede eliminar el nodo raíz', 'error')
        return
    }
    edtStore.deleteNode(props.node.id)
    showNotification('Nodo eliminado', 'success')
}

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        handleSaveEdit()
    } else if (event.key === 'Escape') {
        edtStore.cancelEditing()
    }
}
</script>

<template>
    <div class="flex flex-col items-center">
        <!-- Nodo -->
        <div 
            :class="[
                'relative group min-w-[200px] max-w-[250px] p-4 rounded-lg border-2 transition-all',
                bgColorClass,
                'hover:shadow-lg cursor-pointer'
            ]"
        >
            <!-- Modo edición -->
            <input
                v-if="isEditing"
                v-model="edtStore.editingValue"
                @blur="handleSaveEdit"
                @keydown="handleKeyDown"
                class="input input-sm input-bordered w-full"
                autofocus
            />
            
            <!-- Modo visualización -->
            <div v-else class="flex items-center justify-between gap-2">
                <span 
                    class="font-medium text-sm flex-1"
                    @dblclick="handleDoubleClick"
                >
                    {{ node.name }}
                </span>
                
                <!-- Botones de acción -->
                <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        v-if="node.level < 3"
                        @click="handleAddChild"
                        class="btn btn-ghost btn-xs"
                        title="Agregar hijo"
                    >
                        <span class="material-symbols-outlined text-accent text-sm">add</span>
                    </button>
                    <button
                        v-if="node.id !== 'root'"
                        @click="handleDelete"
                        class="btn btn-ghost btn-xs"
                        title="Eliminar"
                    >
                        <span class="material-symbols-outlined text-error text-sm">delete</span>
                    </button>
                </div>
            </div>
            
            <!-- Etiqueta de nivel -->
            <div class="text-xs opacity-70 mt-1">
                {{ levelLabel }}
            </div>
        </div>

        <!-- Línea vertical y nodos hijos -->
        <div v-if="node.children.length > 0" class="flex flex-col items-center">
            <div class="w-0.5 h-8 bg-base-300"></div>
            
            <div class="flex gap-8 relative">
                <!-- Línea horizontal conectora -->
                <div 
                    v-if="node.children.length > 1"
                    class="absolute top-0 left-0 right-0 h-0.5 bg-base-300"
                ></div>
                
                <!-- Renderizar hijos -->
                <div 
                    v-for="child in node.children" 
                    :key="child.id"
                    class="relative"
                >
                    <!-- Línea vertical individual -->
                    <div 
                        v-if="node.children.length > 1"
                        class="absolute top-0 left-1/2 w-0.5 h-8 bg-base-300 -translate-x-1/2 -translate-y-8"
                    ></div>
                    
                    <EDTNode :node="child" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.group:hover .opacity-0 {
    opacity: 1;
}
</style>
