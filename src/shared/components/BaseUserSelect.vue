<script setup lang="ts">
import { ref, computed } from 'vue'

export type UserOption = {
    id: number | string
    name: string
    email?: string
}

const props = withDefaults(defineProps<{
    modelValue: string
    users: UserOption[]
    placeholder?: string
    label?: string
    required?: boolean
    disabled?: boolean
}>(), {
    placeholder: 'Seleccionar usuario...',
    disabled: false
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const searchTerm = ref('')
const isOpen = ref(false)

// Filtrar usuarios basado en el término de búsqueda
const filteredUsers = computed(() => {
    if (!searchTerm.value.trim()) {
        return props.users
    }
    
    const term = searchTerm.value.toLowerCase()
    return props.users.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email?.toLowerCase().includes(term)
    )
})

// Usuario seleccionado actual
const selectedUser = computed(() => {
    return props.users.find(u => u.name === props.modelValue)
})

const selectUser = (user: UserOption) => {
    emit('update:modelValue', user.name)
    searchTerm.value = ''
    isOpen.value = false
}

const clearSelection = () => {
    emit('update:modelValue', '')
    searchTerm.value = ''
}

const handleFocus = () => {
    if (!props.disabled) {
        isOpen.value = true
    }
}

const handleBlur = () => {
    // Delay para permitir click en opciones
    setTimeout(() => {
        isOpen.value = false
        searchTerm.value = ''
    }, 200)
}
</script>

<template>
    <div class="form-control relative">
        <label v-if="label" class="label">
            <span class="label-text font-semibold">
                {{ label }}
                <span v-if="required" class="text-error"> *</span>
            </span>
        </label>
        
        <!-- Display del usuario seleccionado o input de búsqueda -->
        <div class="relative">
            <div v-if="selectedUser && !isOpen" class="flex items-center gap-2">
                <div class="input input-bordered flex items-center gap-2 flex-1">
                    <span class="material-symbols-outlined text-primary">person</span>
                    <span class="flex-1">{{ selectedUser.name }}</span>
                    <button
                        v-if="!disabled"
                        type="button"
                        @click="clearSelection"
                        class="btn btn-ghost btn-xs btn-circle"
                    >
                        <span class="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>
                <button
                    v-if="!disabled"
                    type="button"
                    @click="isOpen = true"
                    class="btn btn-outline btn-sm"
                >
                    Cambiar
                </button>
            </div>
            
            <input
                v-else
                v-model="searchTerm"
                type="text"
                :placeholder="placeholder"
                :disabled="disabled"
                class="input input-bordered w-full"
                @focus="handleFocus"
                @blur="handleBlur"
                autocomplete="off"
            />
            
            <!-- Dropdown de opciones -->
            <div
                v-if="isOpen && !disabled"
                class="absolute top-full left-0 right-0 z-50 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1"
            >
                <div v-if="filteredUsers.length === 0" class="px-4 py-3 text-sm opacity-70 text-center">
                    No se encontraron usuarios
                </div>
                
                <button
                    v-for="user in filteredUsers"
                    :key="user.id"
                    type="button"
                    @click="selectUser(user)"
                    class="w-full px-4 py-3 hover:bg-base-200 cursor-pointer text-left flex items-center gap-3 transition-colors"
                >
                    <span class="material-symbols-outlined text-primary">person</span>
                    <div class="flex-1">
                        <div class="font-medium">{{ user.name }}</div>
                        <div v-if="user.email" class="text-xs opacity-70">{{ user.email }}</div>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: hsl(var(--b2));
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: hsl(var(--bc) / 0.3);
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--bc) / 0.5);
}
</style>
