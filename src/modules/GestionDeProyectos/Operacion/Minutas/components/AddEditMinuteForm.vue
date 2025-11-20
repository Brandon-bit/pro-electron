<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
</script>

<template>
    <div class="space-y-4">
        <!-- Name -->
        <BaseFormInput
            name="nombre"
            type="text"
            label="Nombre de la Reunión"
            :required="true"
        />

        <!-- Date -->
        <BaseFormInput
            name="fecha"
            type="datetime-local"
            label="Fecha y Hora"
            :required="true"
        />

        <!-- Agenda -->
        <BaseTextArea
            name="agenda"
            label="Agenda"
            :required="true"
        />

        <!-- Discussion Points -->
        <BaseTextArea
            name="puntosDiscutidos"
            label="Puntos Discutidos"
            :required="true"
        />

        <!-- Decisions Made -->
        <BaseTextArea
            name="decisionesTomadas"
            label="Decisiones Tomadas"
            :required="true"
        />
    </div>
</template>
