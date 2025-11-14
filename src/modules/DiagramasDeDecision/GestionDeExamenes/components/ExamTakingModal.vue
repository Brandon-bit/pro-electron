<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useExamStore from '@/modules/DiagramasDeDecision/GestionDeExamenes/store/examStore'
import { useExamActions } from '@/modules/DiagramasDeDecision/GestionDeExamenes/composables/useExamActions'

const examStore = useExamStore()
const { handleFinishExam } = useExamActions()

const onSubmit = () => {
    if (examStore.isExamStarted) {
        handleFinishExam()
    }
}

const onClose = () => {
    examStore.clearExam()
}
</script>

<template>
    <BaseModal
        :modal-id="examStore.examModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
        :show-submit="false"
        size="large"
    >
        <template #modalBody>
            <!-- Instructions View -->
            <div v-if="!examStore.isExamStarted && examStore.selectedExam" class="space-y-4">
                <div class="card bg-base-100 shadow-md">
                    <div class="card-body">
                        <h3 class="font-semibold text-lg mb-4">Instrucciones</h3>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-start gap-2">
                                <span class="material-symbols-outlined text-sm text-primary">check_circle</span>
                                <span>Tienes {{ examStore.selectedExam.timeLimit }} minutos para completar el examen</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <span class="material-symbols-outlined text-sm text-primary">check_circle</span>
                                <span>Necesitas obtener al menos {{ examStore.selectedExam.passingScore }}% para aprobar</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <span class="material-symbols-outlined text-sm text-primary">check_circle</span>
                                <span>Tienes {{ examStore.selectedExam.attempts }} intentos disponibles</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <span class="material-symbols-outlined text-sm text-primary">check_circle</span>
                                <span>El progreso se guarda automáticamente</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="examStore.startExam" class="btn btn-primary btn-lg w-full">
                    Comenzar Examen
                </button>
            </div>

            <!-- Exam Taking View -->
            <div v-if="examStore.isExamStarted && examStore.selectedExam" class="space-y-6">
                <!-- Header -->
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-semibold text-lg">{{ examStore.selectedExam.name }}</h3>
                        <p class="text-sm opacity-70">
                            Pregunta {{ examStore.currentQuestion + 1 }} de {{ examStore.sampleQuestions.length }}
                        </p>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="material-symbols-outlined text-sm">schedule</span>
                        <span class="font-medium">25:30</span>
                    </div>
                </div>

                <!-- Progress Bar -->
                <progress 
                    class="progress progress-primary w-full" 
                    :value="examStore.progress" 
                    max="100"
                ></progress>

                <!-- Question Card -->
                <div v-if="examStore.currentQuestionData" class="card bg-base-100 shadow-md">
                    <div class="card-body">
                        <h4 class="font-semibold text-lg mb-4">{{ examStore.currentQuestionData.text }}</h4>

                        <!-- Multiple Choice -->
                        <div v-if="examStore.currentQuestionData.type === 'multiple'" class="space-y-2">
                            <div
                                v-for="(option, idx) in examStore.currentQuestionData.options"
                                :key="idx"
                                class="form-control"
                            >
                                <label class="label cursor-pointer justify-start gap-3 p-3 border border-base-300 rounded-lg hover:bg-base-200">
                                    <input
                                        type="radio"
                                        :name="`question-${examStore.currentQuestionData.id}`"
                                        :value="option"
                                        :checked="examStore.answers[examStore.currentQuestionData.id] === option"
                                        @change="examStore.setAnswer(examStore.currentQuestionData.id, option)"
                                        class="radio radio-primary"
                                    />
                                    <span class="label-text flex-1">{{ option }}</span>
                                </label>
                            </div>
                        </div>

                        <!-- True/False -->
                        <div v-if="examStore.currentQuestionData.type === 'true_false'" class="space-y-2">
                            <div
                                v-for="(option, idx) in examStore.currentQuestionData.options"
                                :key="idx"
                                class="form-control"
                            >
                                <label class="label cursor-pointer justify-start gap-3 p-3 border border-base-300 rounded-lg hover:bg-base-200">
                                    <input
                                        type="radio"
                                        :name="`question-${examStore.currentQuestionData.id}`"
                                        :value="option"
                                        :checked="examStore.answers[examStore.currentQuestionData.id] === option"
                                        @change="examStore.setAnswer(examStore.currentQuestionData.id, option)"
                                        class="radio radio-primary"
                                    />
                                    <span class="label-text flex-1">{{ option }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="flex justify-between">
                    <button
                        @click="examStore.previousQuestion"
                        :disabled="examStore.currentQuestion === 0"
                        class="btn btn-outline"
                    >
                        Anterior
                    </button>
                    <button
                        v-if="!examStore.isLastQuestion"
                        @click="examStore.nextQuestion"
                        class="btn btn-primary"
                    >
                        Siguiente
                    </button>
                    <button
                        v-else
                        @click="handleFinishExam"
                        class="btn btn-primary"
                    >
                        Finalizar Examen
                    </button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
