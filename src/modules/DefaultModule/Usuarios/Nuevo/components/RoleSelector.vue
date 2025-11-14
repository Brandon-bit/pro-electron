<script setup lang="ts">
import { ref, computed } from 'vue'
import type { RoleType } from '@/modules/DefaultModule/Usuarios/Nuevo/types/newUserTypes'

const props = defineProps<{
    roles: RoleType[]
    selectedRoles: string[]
}>()

const emit = defineEmits<{
    'toggle-role': [roleId: string]
}>()

const isOpen = ref(false)
const searchQuery = ref('')

const filteredRoles = computed(() => {
    if (!searchQuery.value) return props.roles
    return props.roles.filter(role => 
        role.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const selectedRoleLabels = computed(() => {
    return props.roles
        .filter(role => props.selectedRoles.includes(role.id))
        .map(role => role.label)
        .join(', ')
})

const isRoleSelected = (roleId: string) => {
    return props.selectedRoles.includes(roleId)
}

const handleToggle = (roleId: string) => {
    emit('toggle-role', roleId)
}
</script>

<template>
    <div class="form-control">
        <label class="label">
            <span class="label-text font-semibold">Roles mejora continua</span>
            <span class="label-text-alt text-xs opacity-60">(Selección múltiple Ctrl + clic)</span>
        </label>
        
        <div class="dropdown w-full" :class="{ 'dropdown-open': isOpen }">
            <div 
                tabindex="0" 
                class="input input-bordered w-full flex items-center justify-between cursor-pointer"
                @click="isOpen = !isOpen"
            >
                <span class="text-sm truncate" :class="{ 'opacity-50': !selectedRoleLabels }">
                    {{ selectedRoleLabels || '-- Seleccione los roles --' }}
                </span>
                <span class="material-symbols-outlined text-sm">
                    {{ isOpen ? 'expand_less' : 'expand_more' }}
                </span>
            </div>
            
            <div 
                v-if="isOpen"
                class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-full mt-1 border border-base-300 max-h-60 overflow-y-auto"
            >
                <div class="p-2 sticky top-0 bg-base-100">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Buscar roles..."
                        class="input input-bordered input-sm w-full"
                        @click.stop
                    />
                </div>
                
                <ul class="space-y-1">
                    <li 
                        v-for="role in filteredRoles" 
                        :key="role.id"
                        @click.stop="handleToggle(role.id)"
                    >
                        <label class="flex items-center gap-2 cursor-pointer hover:bg-base-200 p-2 rounded">
                            <input
                                type="checkbox"
                                :checked="isRoleSelected(role.id)"
                                class="checkbox checkbox-primary checkbox-sm"
                                @click.stop
                            />
                            <span class="text-sm">{{ role.label }}</span>
                        </label>
                    </li>
                </ul>
                
                <div v-if="filteredRoles.length === 0" class="p-4 text-center text-sm opacity-60">
                    No se encontraron roles
                </div>
            </div>
        </div>
    </div>
</template>
