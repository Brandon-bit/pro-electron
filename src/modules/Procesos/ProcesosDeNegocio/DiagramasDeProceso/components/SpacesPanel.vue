<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Edit2, MoreVertical } from 'lucide-vue-next'
import type {
    SpaceType,
    ValueChainSpaceType
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'

const props = defineProps<{
    spaces: SpaceType[]
    cvSpaces: ValueChainSpaceType[]
}>()

const emit = defineEmits<{
    addSpace: []
    editSpace: [space: SpaceType]
    selectSpace: [space: SpaceType | ValueChainSpaceType]
    addProcess: [space: SpaceType]
    addCVProcess: [space: ValueChainSpaceType]
}>()

const editingSpace = ref<number | null>(null)

const hasSpaces = computed(() => {
    return props.spaces.length > 0 || props.cvSpaces.length > 0
})

const handleSpaceClick = (space: SpaceType | ValueChainSpaceType) => {
    emit('selectSpace', space)
}

const handleEditSpace = (space: SpaceType, event: Event) => {
    event.stopPropagation()
    editingSpace.value = space.id
}

const handleSaveSpace = (space: SpaceType) => {
    editingSpace.value = null
    emit('editSpace', space)
}

// Función para cerrar dropdown después de click en una opción
const closeDropdown = (event: Event) => {
    const link = event.currentTarget as HTMLElement
    // Buscar el <ul> padre que tiene el tabindex
    const dropdownContent = link.closest('.dropdown-content') as HTMLElement
    if (dropdownContent) {
        dropdownContent.blur() // Quitar focus del dropdown para cerrarlo
    }
}
</script>

<template>
    <div class="space-y-4">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Espacios activos</h3>
            <button type="button" class="btn btn-sm btn-primary gap-2" @click="emit('addSpace')">
                <Plus :size="16" />
                Crear espacio
            </button>
        </div>

        <!-- Espacios Activos -->
        <div v-if="spaces.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
                v-for="space in spaces"
                :key="space.id"
                class="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow cursor-pointer"
                @click="handleSpaceClick(space)"
            >
                <div class="card-body p-4">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">dataset</span>

                        <!-- Modo lectura -->
                        <div
                            v-if="editingSpace !== space.id"
                            class="flex-1 min-w-0"
                            :title="space.nombre"
                        >
                            <p class="font-semibold truncate">{{ space.nombre }}</p>
                        </div>

                        <!-- Modo edición -->
                        <input
                            v-else
                            v-model="space.nombre"
                            type="text"
                            class="input input-sm input-bordered flex-1"
                            @click.stop
                            @blur="handleSaveSpace(space)"
                            @keyup.enter="handleSaveSpace(space)"
                            @keyup.esc="editingSpace = null"
                            autofocus
                        />

                        <!-- Dropdown de acciones -->
                        <div class="dropdown dropdown-end" @click.stop>
                            <button
                                tabindex="0"
                                class="btn btn-ghost btn-sm btn-circle"
                                type="button"
                            >
                                <MoreVertical :size="16" />
                            </button>
                            <ul
                                tabindex="0"
                                class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
                            >
                                <li>
                                    <a @click="(e) => { emit('addProcess', space); closeDropdown(e); }">
                                        <Plus :size="16" />
                                        Crear Proceso
                                    </a>
                                </li>
                                <li>
                                    <a @click="(e) => { handleEditSpace(space, e); closeDropdown(e); }">
                                        <Edit2 :size="16" />
                                        Renombrar
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Divisor -->
        <div class="divider">Espacios de la cadena de valor</div>

        <!-- Sin espacios CV -->
        <div v-if="cvSpaces.length === 0" class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <div>
                <p class="font-semibold">Sin datos...</p>
                <router-link
                    to="/procesos/procesos-de-negocio/cadenas-de-valor"
                    class="btn btn-sm btn-ghost gap-2 mt-2"
                >
                    Configurar la cadena de valor
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </router-link>
            </div>
        </div>

        <!-- Espacios de Cadena de Valor -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
                v-for="cvSpace in cvSpaces"
                :key="cvSpace.dni"
                class="card bg-primary/5 shadow-sm border border-primary/20 hover:shadow-md transition-shadow cursor-pointer"
                @click="handleSpaceClick(cvSpace)"
            >
                <div class="card-body p-4">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">account_tree</span>

                        <div class="flex-1 min-w-0" :title="cvSpace.titulo">
                            <p class="font-semibold truncate">{{ cvSpace.titulo }}</p>
                            <span class="badge badge-primary badge-xs mt-1">CV</span>
                        </div>

                        <!-- Dropdown de acciones -->
                        <div class="dropdown dropdown-end" @click.stop>
                            <button
                                tabindex="0"
                                class="btn btn-ghost btn-sm btn-circle"
                                type="button"
                            >
                                <MoreVertical :size="16" />
                            </button>
                            <ul
                                tabindex="0"
                                class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
                            >
                                <li>
                                    <a @click="(e) => { emit('addCVProcess', cvSpace); closeDropdown(e); }">
                                        <Plus :size="16" />
                                        Crear Proceso
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
