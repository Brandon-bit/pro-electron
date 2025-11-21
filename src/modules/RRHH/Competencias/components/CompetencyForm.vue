<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const categoryOptions = [
    { id: 'technical', label: 'Técnica' },
    { id: 'behavioral', label: 'Conductual' },
    { id: 'leadership', label: 'Liderazgo' }
]
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12">
            <BaseFormInput
                name="name"
                type="text"
                label="Nombre de la competencia"
                placeholder="Ej: Liderazgo"
                :required="true"
            />
        </div>
        <div class="col-span-12">
            <BaseTextArea
                name="description"
                label="Descripción"
                placeholder="Describe en qué consiste esta competencia..."
            />
        </div>
        <div class="col-span-12">
            <BaseFormSelect
                name="category"
                label="Categoría"
                :options="categoryOptions"
                :required="true"
            />
        </div>
        <div class="col-span-12">
            <BaseFormCheckbox name="active" label="Estado" :default="true" />
        </div>
    </div>
</template>
