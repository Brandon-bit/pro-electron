<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useTrainingStore from '@/modules/DiagramasDeDecision/GestionDeFormacion/store/trainingStore'
import { useTrainingActions } from '@/modules/DiagramasDeDecision/GestionDeFormacion/composables/useTrainingActions'

const modalStore = useModalStore()
const trainingStore = useTrainingStore()
const { handleCreateCourse } = useTrainingActions()

const title = ref('')
const type = ref<'video' | 'presencial'>('video')
const duration = ref('')
const capacity = ref(30)

const onSubmit = () => {
    const success = handleCreateCourse(
        title.value,
        type.value,
        duration.value,
        capacity.value
    )
    if (success) {
        title.value = ''
        type.value = 'video'
        duration.value = ''
        capacity.value = 30
        modalStore.close(trainingStore.createModalId)
    }
}

const onClose = () => {
    title.value = ''
    type.value = 'video'
    duration.value = ''
    capacity.value = 30
}
</script>

<template>
    <BaseModal
        :modal-id="trainingStore.createModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Title -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Título del Curso</span>
                    </label>
                    <input
                        v-model="title"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej. Fundamentos ERP"
                    />
                </div>

                <!-- Type -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Tipo de Curso</span>
                    </label>
                    <select v-model="type" class="select select-bordered">
                        <option value="video">Video</option>
                        <option value="presencial">Presencial</option>
                    </select>
                </div>

                <!-- Duration -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Duración</span>
                    </label>
                    <input
                        v-model="duration"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej. 2 horas, 4 horas"
                    />
                </div>

                <!-- Capacity -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Capacidad</span>
                    </label>
                    <input
                        v-model.number="capacity"
                        type="number"
                        class="input input-bordered"
                        placeholder="30"
                    />
                </div>
            </div>
        </template>
    </BaseModal>
</template>
