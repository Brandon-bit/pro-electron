<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useField } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'
import { useLessonActions } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/composables/useLessonActions'

const lessonStore = useLessonStore()
const { loadCategoryOptions } = useLessonActions()

// Tag input logic
const tagInput = ref('')
const { value: tags, setValue: setTags } = useField<string[]>('etiquetas')

const handleAddTag = () => {
    if (tagInput.value.trim() && !tags.value?.includes(tagInput.value.trim())) {
        const currentTags = tags.value || []
        setTags([...currentTags, tagInput.value.trim()])
        tagInput.value = ''
    }
}

const handleRemoveTag = (index: number) => {
    const currentTags = tags.value || []
    setTags(currentTags.filter((_, i) => i !== index))
}

const projectPhaseOptions = [
    { id: 'Inicio', label: 'Inicio' },
    { id: 'Planificacion', label: 'Planificación' },
    { id: 'Ejecucion', label: 'Ejecución' },
    { id: 'Monitoreo y Control', label: 'Monitoreo y Control' },
    { id: 'Cierre', label: 'Cierre' }
]

const lessonTypeOptions = [
    { id: 'Positiva', label: 'Positiva' },
    { id: 'Negativa', label: 'Negativa' }
]

onMounted(() => {
    loadCategoryOptions()
})
</script>

<template>
    <div class="space-y-4">
        <!-- Category -->
        <BaseFormSelect
            name="dniCategoria"
            label="Categoría"
            :options="lessonStore.categoryOptions"
            :required="true"
        />

        <!-- Project Phase -->
        <BaseFormSelect
            name="faseProyecto"
            label="Fase del Proyecto"
            :options="projectPhaseOptions"
            :required="true"
        />

        <!-- Description -->
        <BaseTextArea
            name="descripcion"
            label="Descripción de la Situación"
            :required="true"
            placeholder="Describe la situación que generó esta lección..."
        />

        <!-- Causes -->
        <BaseTextArea
            name="causas"
            label="Causas"
            :required="false"
            placeholder="¿Qué causó esta situación?"
        />

        <!-- Impact -->
        <BaseTextArea
            name="impacto"
            label="Impacto"
            :required="false"
            placeholder="¿Cuál fue el impacto en el proyecto?"
        />

        <!-- Lesson Learned -->
        <BaseTextArea
            name="leccionAprendida"
            label="Lección Aprendida"
            :required="false"
            placeholder="¿Qué aprendimos de esta experiencia?"
        />

        <!-- Recommendation -->
        <BaseTextArea
            name="recomendacion"
            label="Recomendación"
            :required="false"
            placeholder="¿Qué recomendamos para futuros proyectos?"
        />

        <!-- Type -->
        <BaseFormSelect
            name="tipo"
            label="Tipo de Lección"
            :options="lessonTypeOptions"
            :required="true"
        />

        <!-- Tags -->
        <div class="form-control">
            <label class="label">
                <span class="label-text">Etiquetas</span>
            </label>
            <div class="flex gap-2 mb-2">
                <input
                    v-model="tagInput"
                    type="text"
                    class="input input-bordered flex-1"
                    placeholder="Agregar etiqueta..."
                    @keypress.enter.prevent="handleAddTag"
                />
                <button 
                    @click.prevent="handleAddTag" 
                    type="button" 
                    class="btn btn-outline"
                >
                    <span class="material-symbols-outlined">add</span>
                </button>
            </div>
            <div class="flex flex-wrap gap-2">
                <div 
                    v-for="(tag, idx) in (tags || [])" 
                    :key="idx" 
                    class="badge badge-secondary gap-2"
                >
                    {{ tag }}
                    <button 
                        @click.prevent="handleRemoveTag(idx)" 
                        type="button"
                        class="btn btn-ghost btn-xs"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>

        <!-- Author -->
        <BaseFormInput
            name="autor"
            type="text"
            label="Autor"
            :required="true"
        />
    </div>
</template>
