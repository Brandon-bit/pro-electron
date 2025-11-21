<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
</script>

<template>
    <div class="grid grid-cols-12 gap-4">
        <BaseFormInput
            class="col-span-6"
            name="minScore"
            label="Score Mínimo"
            type="number"
            step="0.1"
            min="0"
            max="5"
            :required="true"
        />

        <BaseFormInput
            class="col-span-6"
            name="maxScore"
            label="Score Máximo"
            type="number"
            step="0.1"
            min="0"
            max="5"
            :required="true"
        />

        <BaseFormInput
            class="col-span-12"
            name="benefits"
            label="Beneficios Asociados"
            type="text"
            placeholder="Ej: Días libres, Bono wellness"
            :required="true"
        />
    </div>
</template>
