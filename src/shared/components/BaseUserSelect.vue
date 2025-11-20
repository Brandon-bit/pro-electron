<script setup lang="ts">
import { ref, computed } from 'vue'
import { useField } from 'vee-validate'

interface User {
    dni: string
    name: string
    email: string
}

interface Props {
    name: string
    label: string
    users: User[]
    required?: boolean
    placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    placeholder: 'Buscar usuario...'
})

const searchQuery = ref('')
const isOpen = ref(false)

// vee-validate integration
const { value: selectedValue, errorMessage } = useField<string>(() => props.name)

// Filtered users based on search
const filteredUsers = computed(() => {
    if (!searchQuery.value) return props.users
    
    const query = searchQuery.value.toLowerCase()
    return props.users.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    )
})

// Selected user display
const selectedUser = computed(() => {
    if (!selectedValue.value) return null
    return props.users.find(u => u.dni === selectedValue.value)
})

const selectUser = (user: User) => {
    selectedValue.value = user.dni
    isOpen.value = false
    searchQuery.value = ''
}

const clearSelection = () => {
    selectedValue.value = ''
    searchQuery.value = ''
}

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        searchQuery.value = ''
    }
}
</script>

<template>
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text font-semibold">
                {{ label }}
                <span v-if="required" class="text-error"> *</span>
            </span>
        </label>
        
        <div class="relative">
            <!-- Selected User Display / Trigger -->
            <div
                class="input input-bordered flex items-center justify-between cursor-pointer hover:border-primary transition-colors"
                :class="{ 'input-error': errorMessage }"
                @click="toggleDropdown"
            >
                <div v-if="selectedUser" class="flex items-center gap-2 flex-1 min-w-0">
                    <span class="material-symbols-outlined text-sm">person</span>
                    <div class="flex-1 min-w-0">
                        <p class="font-medium truncate">{{ selectedUser.name }}</p>
                        <p class="text-xs opacity-60 truncate">{{ selectedUser.email }}</p>
                    </div>
                </div>
                <span v-else class="opacity-50">{{ placeholder }}</span>
                
                <div class="flex items-center gap-1">
                    <button
                        v-if="selectedUser"
                        type="button"
                        class="btn btn-ghost btn-xs"
                        @click.stop="clearSelection"
                    >
                        <span class="material-symbols-outlined text-sm">close</span>
                    </button>
                    <span class="material-symbols-outlined text-sm">
                        {{ isOpen ? 'expand_less' : 'expand_more' }}
                    </span>
                </div>
            </div>

            <!-- Dropdown -->
            <div
                v-if="isOpen"
                class="absolute z-50 w-full mt-2 bg-base-100 border border-base-300 rounded-lg shadow-xl max-h-80 overflow-hidden"
            >
                <!-- Search Input -->
                <div class="p-3 border-b border-base-300">
                    <div class="relative">
                        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-50">
                            search
                        </span>
                        <input
                            v-model="searchQuery"
                            type="text"
                            class="input input-sm input-bordered w-full pl-10"
                            placeholder="Buscar por nombre o email..."
                            @click.stop
                        />
                    </div>
                </div>

                <!-- User List -->
                <div class="overflow-y-auto max-h-60">
                    <button
                        v-for="user in filteredUsers"
                        :key="user.dni"
                        type="button"
                        class="w-full px-4 py-3 hover:bg-base-200 transition-colors text-left flex items-center gap-3"
                        :class="{ 'bg-primary/10': selectedValue === user.dni }"
                        @click="selectUser(user)"
                    >
                        <span class="material-symbols-outlined text-primary">person</span>
                        <div class="flex-1 min-w-0">
                            <p class="font-medium truncate">{{ user.name }}</p>
                            <p class="text-xs opacity-60 truncate">{{ user.email }}</p>
                        </div>
                        <span
                            v-if="selectedValue === user.dni"
                            class="material-symbols-outlined text-primary text-sm"
                        >
                            check
                        </span>
                    </button>

                    <!-- Empty State -->
                    <div
                        v-if="filteredUsers.length === 0"
                        class="px-4 py-8 text-center text-sm opacity-50"
                    >
                        <span class="material-symbols-outlined text-3xl mb-2">person_off</span>
                        <p>No se encontraron usuarios</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Error Message -->
        <label v-if="errorMessage" class="label">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </label>

        <!-- Click Outside Handler -->
        <div
            v-if="isOpen"
            class="fixed inset-0 z-40"
            @click="isOpen = false"
        ></div>
    </div>
</template>

<style scoped>
.input {
    min-height: 3rem;
}
</style>
