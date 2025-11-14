<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useLessonStore from '@/modules/GestionDeProyectos/LeccionesAprendidas/store/lessonStore'
import type { NewLessonType, LessonCategory, ProjectPhase } from '@/modules/GestionDeProyectos/LeccionesAprendidas/types/lessonTypes'

const modalStore = useModalStore()
const lessonStore = useLessonStore()

const MODAL_ID = 'create-lesson-modal'

const categories: LessonCategory[] = ['Alcance', 'Cronograma', 'Costo', 'Calidad', 'Recursos', 'Comunicación', 'Riesgos', 'Stakeholders', 'Integración']
const phases: ProjectPhase[] = ['Inicio', 'Planificación', 'Ejecución', 'Monitoreo y Control', 'Cierre']

const formData = ref<NewLessonType>({
    project: '',
    phase: 'Planificación',
    situation: '',
    cause: '',
    impact: '',
    lesson: '',
    recommendation: '',
    category: 'Alcance',
    type: 'Positiva',
    tags: [],
    author: ''
})

const tagInput = ref('')
const isSubmitting = ref(false)

watch(() => lessonStore.isModalOpen, (isOpen) => {
    if (isOpen) {
        modalStore.open(MODAL_ID, {
            title: 'Nueva Lección Aprendida'
        })
    } else {
        modalStore.close(MODAL_ID)
    }
})

const handleAddTag = () => {
    if (tagInput.value.trim() && !formData.value.tags.includes(tagInput.value.trim())) {
        formData.value.tags.push(tagInput.value.trim())
        tagInput.value = ''
    }
}

const handleRemoveTag = (index: number) => {
    formData.value.tags.splice(index, 1)
}

const handleSubmit = () => {
    isSubmitting.value = true
    
    lessonStore.addLesson(formData.value)
    
    // Reset form
    formData.value = {
        project: '',
        phase: 'Planificación',
        situation: '',
        cause: '',
        impact: '',
        lesson: '',
        recommendation: '',
        category: 'Alcance',
        type: 'Positiva',
        tags: [],
        author: ''
    }
    
    isSubmitting.value = false
    lessonStore.closeModal()
}

const handleClose = () => {
    lessonStore.closeModal()
}
</script>

<template>
    <BaseModal
        :modal-id="MODAL_ID"
        :on-submit="handleSubmit"
        :on-close="handleClose"
        :is-submitting="isSubmitting"
        submit-text="Guardar Lección"
    >
        <template #modalBody>
            <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                <!-- Proyecto y Fase -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Proyecto</span>
                        </label>
                        <input
                            v-model="formData.project"
                            type="text"
                            class="input input-bordered"
                            placeholder="Nombre del proyecto"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Fase del Proyecto</span>
                        </label>
                        <select v-model="formData.phase" class="select select-bordered">
                            <option v-for="phase in phases" :key="phase" :value="phase">
                                {{ phase }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Situación -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Descripción de la Situación</span>
                    </label>
                    <textarea
                        v-model="formData.situation"
                        class="textarea textarea-bordered"
                        placeholder="¿Qué sucedió?"
                        rows="3"
                    ></textarea>
                </div>

                <!-- Causa -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Causa(s)</span>
                    </label>
                    <textarea
                        v-model="formData.cause"
                        class="textarea textarea-bordered"
                        placeholder="¿Por qué sucedió?"
                        rows="2"
                    ></textarea>
                </div>

                <!-- Impacto -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Impacto</span>
                    </label>
                    <textarea
                        v-model="formData.impact"
                        class="textarea textarea-bordered"
                        placeholder="¿Cuál fue el efecto en el proyecto?"
                        rows="2"
                    ></textarea>
                </div>

                <!-- Lección Aprendida -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Lección Aprendida</span>
                    </label>
                    <textarea
                        v-model="formData.lesson"
                        class="textarea textarea-bordered"
                        placeholder="¿Qué aprendimos? ¿Qué funcionó o no funcionó?"
                        rows="3"
                    ></textarea>
                </div>

                <!-- Recomendación -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Recomendación para el Futuro</span>
                    </label>
                    <textarea
                        v-model="formData.recommendation"
                        class="textarea textarea-bordered"
                        placeholder="¿Qué se debería hacer diferente la próxima vez?"
                        rows="3"
                    ></textarea>
                </div>

                <!-- Categoría y Tipo -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Categoría</span>
                        </label>
                        <select v-model="formData.category" class="select select-bordered">
                            <option v-for="cat in categories" :key="cat" :value="cat">
                                {{ cat }}
                            </option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Tipo</span>
                        </label>
                        <select v-model="formData.type" class="select select-bordered">
                            <option value="Positiva">Positiva (Éxito)</option>
                            <option value="Negativa">Negativa (Problema)</option>
                        </select>
                    </div>
                </div>

                <!-- Tags -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Etiquetas (Tags)</span>
                    </label>
                    <div class="flex gap-2 mb-2">
                        <input
                            v-model="tagInput"
                            type="text"
                            class="input input-bordered flex-1"
                            placeholder="Añadir etiqueta"
                            @keypress.enter="handleAddTag"
                        />
                        <button @click="handleAddTag" type="button" class="btn btn-outline">
                            Añadir
                        </button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <div 
                            v-for="(tag, idx) in formData.tags" 
                            :key="idx" 
                            class="badge badge-secondary gap-2"
                        >
                            {{ tag }}
                            <button @click="handleRemoveTag(idx)" class="btn btn-ghost btn-xs">✕</button>
                        </div>
                    </div>
                </div>

                <!-- Autor -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Autor</span>
                    </label>
                    <input
                        v-model="formData.author"
                        type="text"
                        class="input input-bordered"
                        placeholder="Tu nombre"
                    />
                </div>
            </div>
        </template>
    </BaseModal>
</template>
