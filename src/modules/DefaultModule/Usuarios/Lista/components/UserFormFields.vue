<script setup lang="ts">
const props = defineProps<{
    modelValue: {
        name: string
        email: string
        phone?: string
        position: string
        area: string
        type: string
        roles: string[]
        password?: string
    }
    isEdit?: boolean
}>()

const emit = defineEmits<{
    'update:modelValue': [value: typeof props.modelValue]
}>()

const updateField = (field: string, value: any) => {
    emit('update:modelValue', { ...props.modelValue, [field]: value })
}

const toggleRole = (role: string) => {
    const roles = [...props.modelValue.roles]
    const index = roles.indexOf(role)
    
    if (index > -1) {
        roles.splice(index, 1)
    } else {
        roles.push(role)
    }
    
    updateField('roles', roles)
}

const availableRoles = ['Admin', 'Líder', 'Manager', 'Sponsor', 'Procesos', 'Auditor', 'TI']
const availableTypes = ['Admin', 'Member', 'Guest']
const availableAreas = ['Marketing', 'Sistemas', 'Recursos Humanos', 'Comercial', 'Finanzas', 'Publicidad']
</script>

<template>
    <div class="space-y-4">
        <!-- Name -->
        <div class="form-control">
            <label class="label">
                <span class="label-text font-semibold">Nombre <span class="text-error">*</span></span>
            </label>
            <input
                :value="modelValue.name"
                @input="updateField('name', ($event.target as HTMLInputElement).value)"
                type="text"
                class="input input-bordered w-full"
                placeholder="Nombre completo del usuario"
                required
            />
        </div>

        <!-- Email -->
        <div class="form-control">
            <label class="label">
                <span class="label-text font-semibold">Correo <span class="text-error">*</span></span>
            </label>
            <input
                :value="modelValue.email"
                @input="updateField('email', ($event.target as HTMLInputElement).value)"
                type="email"
                class="input input-bordered w-full"
                placeholder="usuario@ejemplo.com"
                required
            />
        </div>

        <!-- Phone -->
        <div class="form-control">
            <label class="label">
                <span class="label-text font-semibold">Teléfono</span>
            </label>
            <input
                :value="modelValue.phone"
                @input="updateField('phone', ($event.target as HTMLInputElement).value)"
                type="tel"
                class="input input-bordered w-full"
                placeholder="1234567890"
            />
        </div>

        <!-- Position -->
        <div class="form-control">
            <label class="label">
                <span class="label-text font-semibold">Puesto <span class="text-error">*</span></span>
            </label>
            <input
                :value="modelValue.position"
                @input="updateField('position', ($event.target as HTMLInputElement).value)"
                type="text"
                class="input input-bordered w-full"
                placeholder="Ej. Marketing, TI, RH"
                required
            />
        </div>

        <!-- Area -->
        <div class="form-control">
            <label class="label">
                <span class="label-text font-semibold">Área <span class="text-error">*</span></span>
            </label>
            <select
                :value="modelValue.area"
                @change="updateField('area', ($event.target as HTMLSelectElement).value)"
                class="select select-bordered w-full"
                required
            >
                <option value="">Seleccionar área</option>
                <option v-for="area in availableAreas" :key="area" :value="area">
                    {{ area }}
                </option>
            </select>
        </div>

        <!-- Type -->
        <div class="form-control">
            <label class="label">
                <span class="label-text font-semibold">Tipo <span class="text-error">*</span></span>
            </label>
            <select
                :value="modelValue.type"
                @change="updateField('type', ($event.target as HTMLSelectElement).value)"
                class="select select-bordered w-full"
                required
            >
                <option value="">Seleccionar tipo</option>
                <option v-for="type in availableTypes" :key="type" :value="type">
                    {{ type }}
                </option>
            </select>
        </div>

        <!-- Roles -->
        <div class="form-control">
            <label class="label">
                <span class="label-text font-semibold">Roles <span class="text-error">*</span></span>
            </label>
            <div class="flex flex-wrap gap-2">
                <label
                    v-for="role in availableRoles"
                    :key="role"
                    class="cursor-pointer flex items-center"
                >
                    <input
                        type="checkbox"
                        :checked="modelValue.roles.includes(role)"
                        @change="toggleRole(role)"
                        class="checkbox checkbox-primary checkbox-sm mr-2"
                    />
                    <span class="text-sm">{{ role }}</span>
                </label>
            </div>
        </div>

        <!-- Password (only for create) -->
        <div v-if="!isEdit" class="form-control">
            <label class="label">
                <span class="label-text font-semibold">Contraseña <span class="text-error">*</span></span>
            </label>
            <input
                :value="modelValue.password"
                @input="updateField('password', ($event.target as HTMLInputElement).value)"
                type="password"
                class="input input-bordered w-full"
                placeholder="Mínimo 8 caracteres"
                :required="!isEdit"
            />
        </div>
    </div>
</template>
