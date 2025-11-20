<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseUserSelect from '@/shared/components/BaseUserSelect.vue'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import type { AgreedActionType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

const minuteStore = useMinuteStore()

defineProps<{
    selectedAction?: AgreedActionType | null
}>()
</script>

<template>
    <div class="space-y-4">
        <!-- Description -->
        <BaseTextArea
            name="descripcion"
            label="Descripción de la Acción"
            :required="true"
        />

        <!-- Responsible -->
        <BaseUserSelect
            name="dniResponsable"
            label="Responsable"
            :users="minuteStore.participants"
            :required="true"
        />

        <!-- Due Date -->
        <BaseFormInput
            name="fechaLimite"
            type="datetime-local"
            label="Fecha Límite"
            :required="true"
        />
    </div>
</template>
