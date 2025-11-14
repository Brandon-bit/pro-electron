<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import ModuleSelector from '@/modules/DefaultModule/Usuarios/Nuevo/components/ModuleSelector.vue'
import RoleSelector from '@/modules/DefaultModule/Usuarios/Nuevo/components/RoleSelector.vue'
import useNewUserStore from '@/modules/DefaultModule/Usuarios/Nuevo/store/newUserStore'
import useNewUser from '@/modules/DefaultModule/Usuarios/Nuevo/composables/useNewUser'

const userStore = useNewUserStore()
const { availableModules, availableRoles, availablePositions, availableAreas } = useNewUser()

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleSubmit = () => {
    // Simulación - solo console.log
    console.log('Form data:', userStore.formData)
}

const handleModuleToggle = (moduleId: string) => {
    userStore.toggleModule(moduleId)
}

const handleRoleToggle = (roleId: string) => {
    userStore.toggleRole(roleId)
}
</script>

<template>
    <div class="max-w-4xl mx-auto space-y-6">
        <!-- Header -->
        <BaseTitle title="Nuevo usuario" />

        <!-- Account Info -->
        <div class="bg-base-200 p-4 rounded-lg">
            <p class="text-sm">
                <span class="font-semibold">Cuenta:</span> 
                <span class="ml-2">{{ userStore.accountName }}</span>
            </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Module Selector -->
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body">
                    <ModuleSelector
                        :modules="availableModules"
                        :selected-modules="userStore.formData.modules"
                        @toggle-module="handleModuleToggle"
                    />
                </div>
            </div>

            <!-- Admin Toggle -->
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label cursor-pointer justify-start gap-3">
                            <input
                                type="checkbox"
                                class="toggle toggle-primary"
                                :checked="userStore.formData.isAdmin"
                                @change="userStore.updateField('isAdmin', ($event.target as HTMLInputElement).checked)"
                            />
                            <span class="label-text font-semibold">¿Agregar como administrador?</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Personal Information -->
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body space-y-4">
                    <!-- Name and Last Name -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Nombre</span>
                            </label>
                            <input
                                type="text"
                                :value="userStore.formData.firstName"
                                @input="userStore.updateField('firstName', ($event.target as HTMLInputElement).value)"
                                class="input input-bordered w-full"
                                placeholder="Ingresa el nombre"
                            />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Apellidos</span>
                            </label>
                            <input
                                type="text"
                                :value="userStore.formData.lastName"
                                @input="userStore.updateField('lastName', ($event.target as HTMLInputElement).value)"
                                class="input input-bordered w-full"
                                placeholder="Ingresa los apellidos"
                            />
                        </div>
                    </div>

                    <!-- Position and Roles -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Puesto</span>
                            </label>
                            <select
                                :value="userStore.formData.position"
                                @change="userStore.updateField('position', ($event.target as HTMLSelectElement).value)"
                                class="select select-bordered w-full"
                            >
                                <option value="">-- Seleccione una opción --</option>
                                <option v-for="position in availablePositions" :key="position" :value="position">
                                    {{ position }}
                                </option>
                            </select>
                        </div>

                        <RoleSelector
                            :roles="availableRoles"
                            :selected-roles="userStore.formData.roles"
                            @toggle-role="handleRoleToggle"
                        />
                    </div>

                    <!-- Area and Phone -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Área</span>
                            </label>
                            <select
                                :value="userStore.formData.area"
                                @change="userStore.updateField('area', ($event.target as HTMLSelectElement).value)"
                                class="select select-bordered w-full"
                            >
                                <option value="">-- Seleccione una opción --</option>
                                <option v-for="area in availableAreas" :key="area" :value="area">
                                    {{ area }}
                                </option>
                            </select>
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Teléfono/Celular</span>
                                <span class="label-text-alt text-xs opacity-60">(a 10 dígitos con clave lada)</span>
                            </label>
                            <input
                                type="tel"
                                :value="userStore.formData.phone"
                                @input="userStore.updateField('phone', ($event.target as HTMLInputElement).value)"
                                class="input input-bordered w-full"
                                placeholder="1234567890"
                                maxlength="10"
                            />
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Correo electrónico</span>
                        </label>
                        <input
                            type="email"
                            :value="userStore.formData.email"
                            @input="userStore.updateField('email', ($event.target as HTMLInputElement).value)"
                            class="input input-bordered w-full"
                            placeholder="usuario@ejemplo.com"
                        />
                    </div>

                    <!-- Passwords -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Contraseña</span>
                            </label>
                            <div class="relative">
                                <input
                                    :type="showPassword ? 'text' : 'password'"
                                    :value="userStore.formData.password"
                                    @input="userStore.updateField('password', ($event.target as HTMLInputElement).value)"
                                    class="input input-bordered w-full pr-10"
                                    placeholder="••••••"
                                />
                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <span class="material-symbols-outlined text-base opacity-60">
                                        {{ showPassword ? 'visibility_off' : 'visibility' }}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Confirmar contraseña</span>
                            </label>
                            <div class="relative">
                                <input
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    :value="userStore.formData.confirmPassword"
                                    @input="userStore.updateField('confirmPassword', ($event.target as HTMLInputElement).value)"
                                    class="input input-bordered w-full pr-10"
                                    placeholder="••••••"
                                />
                                <button
                                    type="button"
                                    @click="showConfirmPassword = !showConfirmPassword"
                                    class="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <span class="material-symbols-outlined text-base opacity-60">
                                        {{ showConfirmPassword ? 'visibility_off' : 'visibility' }}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
                <BaseButton
                    text="Agregar usuario"
                    type="submit"
                    variant="success"
                    icon="add"
                    className="btn-lg px-8"
                />
            </div>
        </form>
    </div>
</template>
