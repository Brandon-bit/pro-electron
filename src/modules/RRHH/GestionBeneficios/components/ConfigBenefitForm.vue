<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
</script>

<template>
    <div class="grid grid-cols-12 gap-4">
        <!-- Nombre -->
        <BaseFormInput
            class="col-span-12"
            name="name"
            label="Nombre del Beneficio"
            type="text"
            placeholder="Ej: Días libres extra, Curso de idiomas"
            :required="true"
        />

        <!-- Descripción -->
        <BaseTextArea
            class="col-span-12"
            name="description"
            label="Descripción"
            placeholder="Describe el beneficio en detalle..."
            :required="true"
            rows="3"
        />

        <!-- Stock Disponible -->
        <BaseFormInput
            class="col-span-6"
            name="availableQuantity"
            label="Stock Disponible"
            type="number"
            placeholder="10"
            min="0"
            :required="true"
        />

        <!-- Score Mínimo -->
        <BaseFormInput
            class="col-span-6"
            name="minScore"
            label="Score Mínimo"
            type="number"
            placeholder="4.0"
            step="0.1"
            min="0"
            max="5"
            :required="true"
        />

        <!-- Información adicional -->
        <div class="col-span-12 bg-info/10 p-4 rounded-lg">
            <div class="flex gap-2">
                <span class="material-symbols-outlined text-info text-sm">info</span>
                <div class="text-xs text-base-content/70">
                    <p class="font-semibold mb-1">Criterios de Elegibilidad:</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>El beneficio estará disponible para empleados con score igual o mayor al mínimo</li>
                        <li>El stock se reducirá automáticamente cuando se canjee</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
