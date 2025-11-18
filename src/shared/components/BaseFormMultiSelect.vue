<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = withDefaults(
    defineProps<{
        label: string
        name: string
        options: { id: number | string; label: string }[]
        required?: boolean
        class?: string
        disabled?: boolean
        placeholder?: string
        maxSelections?: number
    }>(),
    {
        disabled: false,
        placeholder: 'No hay opciones disponibles',
        maxSelections: undefined
    }
)

const { value, errorMessage, setValue, setErrors } = useField<(number | string)[]>(props.name, undefined, {
    initialValue: []
})

// Verificar si una opción está seleccionada
const isSelected = (optionId: number | string) => {
    return value.value?.includes(optionId.toString()) || false
}

// Manejar toggle de checkbox
const handleToggle = (optionId: number | string) => {
    if (props.disabled) return
    
    const currentValue = value.value || []
    const optionIdStr = optionId.toString()
    const isCurrentlySelected = currentValue.includes(optionIdStr)
    
    if (isCurrentlySelected) {
        // Remover
        const newValue = currentValue.filter(id => id !== optionIdStr)
        setValue(newValue)
        setErrors(undefined)
    } else {
        // Agregar - validar límite
        if (props.maxSelections && currentValue.length >= props.maxSelections) {
            setErrors(`Solo puedes seleccionar hasta ${props.maxSelections} opciones`)
            return
        }
        const newValue = [...currentValue, optionIdStr]
        setValue(newValue)
        setErrors(undefined)
    }
}
</script>

<template>
    <div class="flex flex-col space-y-2 mb-4" :class="props.class || ''">
        <label :for="name" class="font-semibold">
            {{ label }}
            <span v-if="props.required" class="text-error"> *</span>
        </label>
        
        <!-- Lista con checkboxes y scroll -->
        <div 
            class="border rounded-lg max-h-[200px] overflow-y-auto"
            :class="{ 'border-error': errorMessage, 'border-base-300': !errorMessage, 'opacity-50': props.disabled }"
        >
            <!-- Empty state -->
            <div v-if="!props.options || props.options.length === 0" class="p-4 text-center text-base-content/50 text-sm">
                {{ placeholder }}
            </div>
            
            <!-- Lista de opciones -->
            <div v-else class="divide-y divide-base-200">
                <label
                    v-for="option in props.options"
                    :key="option.id"
                    class="flex items-center gap-3 p-3 hover:bg-base-200 cursor-pointer transition-colors"
                    :class="{ 
                        'bg-base-200': isSelected(option.id),
                        'cursor-not-allowed': props.disabled
                    }"
                >
                    <input
                        type="checkbox"
                        :checked="isSelected(option.id)"
                        :disabled="props.disabled"
                        class="checkbox checkbox-primary checkbox-sm"
                        @change="() => handleToggle(option.id)"
                    />
                    <span class="flex-1 text-sm">{{ option.label }}</span>
                </label>
            </div>
        </div>
        
        <!-- Error message -->
        <div v-if="errorMessage" class="text-error text-sm">{{ errorMessage }}</div>
        
        <!-- Selected items count -->
        <div v-if="value && value.length > 0" class="text-sm" :class="maxSelections && value.length >= maxSelections ? 'text-warning font-semibold' : 'opacity-70'">
            {{ value.length }}{{ maxSelections ? `/${maxSelections}` : '' }} {{ value.length === 1 ? 'opción seleccionada' : 'opciones seleccionadas' }}
        </div>
    </div>
</template>

<style scoped>
/* Estilos personalizados para el scroll */
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
