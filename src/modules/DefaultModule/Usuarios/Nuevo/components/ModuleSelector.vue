<script setup lang="ts">
import { computed } from 'vue'
import type { ModuleType } from '@/modules/DefaultModule/Usuarios/Nuevo/types/newUserTypes'

const props = defineProps<{
    modules: ModuleType[]
    selectedModules: string[]
}>()

const emit = defineEmits<{
    'toggle-module': [moduleId: string]
}>()

const isModuleSelected = (moduleId: string) => {
    return props.selectedModules.includes(moduleId)
}

const handleToggle = (moduleId: string) => {
    emit('toggle-module', moduleId)
}
</script>

<template>
    <div class="space-y-3">
        <div class="flex items-center gap-2">
            <label class="label">
                <span class="label-text font-semibold">Módulos</span>
            </label>
            <span class="badge badge-info badge-sm">Selecciona un módulo</span>
        </div>
        
        <div class="flex flex-wrap gap-3">
            <label
                v-for="module in modules"
                :key="module.id"
                class="flex items-center gap-2 cursor-pointer"
            >
                <input
                    type="checkbox"
                    :checked="isModuleSelected(module.id)"
                    @change="handleToggle(module.id)"
                    class="checkbox checkbox-primary"
                />
                <span class="text-sm">{{ module.label }}</span>
            </label>
        </div>
    </div>
</template>
