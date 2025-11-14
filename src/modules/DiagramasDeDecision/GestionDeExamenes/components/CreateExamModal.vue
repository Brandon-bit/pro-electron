<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useExamStore from '@/modules/DiagramasDeDecision/GestionDeExamenes/store/examStore'
import { useExamActions } from '@/modules/DiagramasDeDecision/GestionDeExamenes/composables/useExamActions'

const modalStore = useModalStore()
const examStore = useExamStore()
const { handleCreateExam } = useExamActions()

const examName = ref('')
const examCategory = ref('')
const timeLimit = ref(30)
const passingScore = ref(80)
const attempts = ref(3)
const hasPrerequisite = ref(false)

const onSubmit = () => {
    const success = handleCreateExam(
        examName.value,
        examCategory.value,
        timeLimit.value,
        passingScore.value,
        attempts.value
    )
    if (success) {
        examName.value = ''
        examCategory.value = ''
        timeLimit.value = 30
        passingScore.value = 80
        attempts.value = 3
        hasPrerequisite.value = false
        modalStore.close(examStore.createModalId)
    }
}

const onClose = () => {
    examName.value = ''
    examCategory.value = ''
    timeLimit.value = 30
    passingScore.value = 80
    attempts.value = 3
    hasPrerequisite.value = false
}
</script>

<template>
    <BaseModal
        :modal-id="examStore.createModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
        size="large"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Exam Name -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Nombre del Examen</span>
                    </label>
                    <input
                        v-model="examName"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej. Certificación Sistema X"
                    />
                </div>

                <!-- Category and Time Limit -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Categoría</span>
                        </label>
                        <select v-model="examCategory" class="select select-bordered">
                            <option value="">Seleccionar</option>
                            <option value="erp">ERP</option>
                            <option value="portal">Portal</option>
                            <option value="process">Proceso</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Tiempo Límite (minutos)</span>
                        </label>
                        <input
                            v-model.number="timeLimit"
                            type="number"
                            class="input input-bordered"
                            placeholder="30"
                        />
                    </div>
                </div>

                <!-- Passing Score and Attempts -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Puntaje de Aprobación (%)</span>
                        </label>
                        <input
                            v-model.number="passingScore"
                            type="number"
                            class="input input-bordered"
                            placeholder="80"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Número de Intentos</span>
                        </label>
                        <input
                            v-model.number="attempts"
                            type="number"
                            class="input input-bordered"
                            placeholder="3"
                        />
                    </div>
                </div>

                <!-- Prerequisite Toggle -->
                <div class="flex items-center justify-between p-3 border border-base-300 rounded-lg">
                    <div>
                        <label class="label cursor-pointer">
                            <span class="label-text font-semibold">Vincular con Documento Prerrequisito</span>
                        </label>
                        <p class="text-sm opacity-70">Bloquear hasta que se lea un documento específico</p>
                    </div>
                    <input
                        v-model="hasPrerequisite"
                        type="checkbox"
                        class="toggle toggle-primary"
                    />
                </div>
            </div>
        </template>
    </BaseModal>
</template>
