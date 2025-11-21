<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const props = defineProps<{
    modalId: string
}>()

const modalStore = useModalStore()

const employeeData = computed(() => modalStore.modals[props.modalId]?.data)

const onSubmit = () => {
    // Close modal on submit (OK button)
    modalStore.close(props.modalId)
}

const onClose = () => {
    // No need to reset anything
}
</script>

<template>
    <BaseModal
        :modal-id="modalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
        :hide-submit="true"
    >
        <template v-slot:modalBody>
            <div v-if="employeeData" class="space-y-6">
                <!-- Información del empleado -->
                <div class="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg">
                    <div class="flex items-center gap-4">
                        <div class="avatar placeholder">
                            <div class="bg-primary text-primary-content rounded-full w-16">
                                <span class="text-2xl">{{ employeeData.employeeName?.charAt(0) }}</span>
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-xl font-bold text-base-content">{{ employeeData.employeeName }}</h3>
                            <p class="text-base-content/70">{{ employeeData.employeePosition }}</p>
                            <div class="flex items-center gap-4 mt-2">
                                <div class="badge badge-primary gap-1">
                                    <span class="material-symbols-outlined text-xs">grade</span>
                                    Score: {{ employeeData.score?.toFixed(1) }}
                                </div>
                                <div class="badge badge-secondary gap-1">
                                    <span class="material-symbols-outlined text-xs">stars</span>
                                    {{ employeeData.totalPoints }} puntos
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Beneficios elegibles -->
                <div>
                    <h4 class="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span class="material-symbols-outlined text-success">check_circle</span>
                        Beneficios Disponibles
                    </h4>
                    
                    <div v-if="employeeData.eligibleBenefits && employeeData.eligibleBenefits.length > 0" class="space-y-3">
                        <div
                            v-for="(benefit, index) in employeeData.eligibleBenefits"
                            :key="index"
                            class="flex items-center gap-3 p-4 bg-success/5 border border-success/20 rounded-lg hover:bg-success/10 transition-colors"
                        >
                            <span class="material-symbols-outlined text-success text-2xl">
                                card_giftcard
                            </span>
                            <div class="flex-1">
                                <p class="font-semibold text-base-content">{{ benefit }}</p>
                            </div>
                            <span class="material-symbols-outlined text-success">
                                check
                            </span>
                        </div>
                    </div>

                    <div v-else class="text-center py-8 text-base-content/60">
                        <span class="material-symbols-outlined text-4xl mb-2 block">
                            sentiment_dissatisfied
                        </span>
                        <p>No hay beneficios disponibles para este empleado</p>
                    </div>
                </div>

                <!-- Información adicional -->
                <div class="bg-info/10 p-4 rounded-lg">
                    <div class="flex gap-2">
                        <span class="material-symbols-outlined text-info text-sm">info</span>
                        <div class="text-xs text-base-content/70">
                            <p class="font-semibold mb-1">Elegibilidad:</p>
                            <p>Los beneficios mostrados son aquellos para los cuales el empleado cumple con los requisitos de score y puntos disponibles.</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
