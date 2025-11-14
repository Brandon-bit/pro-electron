<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import useProcessDiagramStore from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/store/processDiagramStore'

const processDiagramStore = useProcessDiagramStore()
</script>

<template>
    <div class="space-y-4">
        <BaseFormInput
            name="code"
            type="text"
            label="Código"
            placeholder="Ej: PRO-001"
            :required="true"
            help-text="Solo letras mayúsculas, números y guiones"
        />

        <BaseFormInput
            name="name"
            type="text"
            label="Nombre del diagrama"
            placeholder="Ej: Proceso de Reclutamiento"
            :required="true"
        />

        <BaseFormInput
            name="description"
            type="textarea"
            label="Descripción"
            placeholder="Describe brevemente el diagrama..."
            :rows="4"
        />

        <BaseFormInput
            name="version"
            type="text"
            label="Versión"
            placeholder="Ej: 1.0, 2.1.3"
            :required="true"
            help-text="Formato: X.Y o X.Y.Z"
        />

        <div class="form-control">
            <label class="label cursor-pointer justify-start gap-4">
                <input
                    type="checkbox"
                    name="active"
                    class="checkbox checkbox-primary"
                    v-model="processDiagramStore.selectedProcessDiagram.active"
                />
                <span class="label-text">Activo</span>
            </label>
        </div>
    </div>
</template>
