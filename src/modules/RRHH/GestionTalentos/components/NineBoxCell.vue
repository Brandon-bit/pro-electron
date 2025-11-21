<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'

interface Employee {
    id: number
    name: string
    position: string
    score: number
}

interface Props {
    modelValue: Employee[]
    title: string
    subtitle: string
    bgColor: string
    borderColor: string
    avatarColor: string
    textColor?: string
}

defineProps<Props>()

const emit = defineEmits<{
    'update:modelValue': [value: Employee[]]
}>()

const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}
</script>

<template>
    <div :class="['card flex flex-col', bgColor, borderColor, 'border']">
        <div class="p-3 pb-2">
            <h3 :class="['text-sm font-semibold', textColor]">{{ title }}</h3>
            <p class="text-xs text-base-content/60">{{ subtitle }}</p>
        </div>
        <div class="px-3 pb-3 flex-1 overflow-auto">
            <VueDraggable
                :model-value="modelValue"
                @update:model-value="emit('update:modelValue', $event)"
                group="nine-box"
                :animation="200"
                class="space-y-2 min-h-[100px]"
            >
                <div
                    v-for="emp in modelValue"
                    :key="emp.id"
                    class="p-2 bg-base-100 rounded-lg border border-base-300 cursor-move hover:shadow-md transition-shadow"
                >
                    <div class="flex items-center gap-2 mb-1">
                        <div class="avatar placeholder">
                            <div :class="['rounded-full w-6 h-6 text-xs', avatarColor]">
                                <span>{{ getInitials(emp.name) }}</span>
                            </div>
                        </div>
                        <p class="text-xs font-semibold flex-1 truncate">
                            {{ emp.name }}
                        </p>
                    </div>
                    <p class="text-xs text-base-content/60 truncate">
                        {{ emp.position }}
                    </p>
                    <p class="text-xs text-base-content/60">Score: {{ emp.score }}</p>
                </div>
            </VueDraggable>
        </div>
    </div>
</template>
