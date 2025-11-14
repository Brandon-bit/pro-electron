<script setup lang="ts">
import { computed } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import CreateButton from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/components/CreateButton.vue'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const searchTerm = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value)
})
</script>

<template>
    <div class="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div class="w-full md:w-96">
            <BaseFormInput
                v-model="searchTerm"
                name="searchTerm"
                label=""
                placeholder="Buscar por código o nombre..."
                icon="search"
            />
        </div>
        <CreateButton />
    </div>
</template>
