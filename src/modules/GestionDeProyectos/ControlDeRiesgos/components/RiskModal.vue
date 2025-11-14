<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useRiskStore from '@/modules/GestionDeProyectos/ControlDeRiesgos/store/riskStore'
import { useRiskActions } from '@/modules/GestionDeProyectos/ControlDeRiesgos/composables/useRiskActions'
import type { NewRiskType } from '@/modules/GestionDeProyectos/ControlDeRiesgos/types/riskTypes'

const modalStore = useModalStore()
const riskStore = useRiskStore()
const { getRiskColor, getRiskLevel } = useRiskActions()

const MODAL_ID = 'risk-modal'

const formData = ref<NewRiskType>({
    description: '',
    cause: '',
    effect: '',
    probability: 3,
    impact: 3,
    strategy: '',
    actions: '',
    responsible: '',
    category: 'Cronograma'
})

const isSubmitting = ref(false)

const calculatedScore = computed(() => formData.value.probability * formData.value.impact)

watch(() => riskStore.isModalOpen, (isOpen) => {
    if (isOpen) {
        modalStore.open(MODAL_ID, {
            title: 'Registrar Nuevo Riesgo'
        })
    } else {
        modalStore.close(MODAL_ID)
    }
})

const handleSubmit = () => {
    isSubmitting.value = true
    
    riskStore.addRisk(formData.value)
    
    // Reset form
    formData.value = {
        description: '',
        cause: '',
        effect: '',
        probability: 3,
        impact: 3,
        strategy: '',
        actions: '',
        responsible: '',
        category: 'Cronograma'
    }
    
    isSubmitting.value = false
    riskStore.closeModal()
}

const handleClose = () => {
    riskStore.closeModal()
}
</script>

<template>
    <BaseModal
        :modal-id="MODAL_ID"
        :on-submit="handleSubmit"
        :on-close="handleClose"
        :is-submitting="isSubmitting"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Descripción -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Descripción del Riesgo</span>
                    </label>
                    <textarea
                        v-model="formData.description"
                        class="textarea textarea-bordered"
                        placeholder="Describe el riesgo identificado..."
                        rows="3"
                    ></textarea>
                </div>

                <!-- Causa y Efecto -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Causa Potencial</span>
                        </label>
                        <textarea
                            v-model="formData.cause"
                            class="textarea textarea-bordered"
                            placeholder="¿Qué lo causa?"
                            rows="2"
                        ></textarea>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Efecto Potencial</span>
                        </label>
                        <textarea
                            v-model="formData.effect"
                            class="textarea textarea-bordered"
                            placeholder="¿Qué impacto tendría?"
                            rows="2"
                        ></textarea>
                    </div>
                </div>

                <!-- Probabilidad e Impacto -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Probabilidad (1-5)</span>
                        </label>
                        <select v-model.number="formData.probability" class="select select-bordered">
                            <option :value="1">1</option>
                            <option :value="2">2</option>
                            <option :value="3">3</option>
                            <option :value="4">4</option>
                            <option :value="5">5</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Impacto (1-5)</span>
                        </label>
                        <select v-model.number="formData.impact" class="select select-bordered">
                            <option :value="1">1</option>
                            <option :value="2">2</option>
                            <option :value="3">3</option>
                            <option :value="4">4</option>
                            <option :value="5">5</option>
                        </select>
                    </div>
                </div>

                <!-- Score calculado -->
                <div class="p-4 bg-base-200 rounded-lg">
                    <p class="text-sm font-semibold mb-2">Puntuación de Riesgo: {{ calculatedScore }}</p>
                    <span :class="['badge', getRiskColor(calculatedScore)]">
                        {{ getRiskLevel(calculatedScore) }}
                    </span>
                </div>

                <!-- Categoría -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Categoría</span>
                    </label>
                    <select v-model="formData.category" class="select select-bordered">
                        <option value="Cronograma">Cronograma</option>
                        <option value="Costo">Costo</option>
                        <option value="Alcance">Alcance</option>
                        <option value="Calidad">Calidad</option>
                        <option value="Recursos">Recursos</option>
                        <option value="Técnico">Técnico</option>
                    </select>
                </div>

                <!-- Estrategia -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Estrategia de Respuesta</span>
                    </label>
                    <select v-model="formData.strategy" class="select select-bordered">
                        <option value="">Selecciona estrategia...</option>
                        <option value="Evitar">Evitar</option>
                        <option value="Mitigar">Mitigar</option>
                        <option value="Transferir">Transferir</option>
                        <option value="Aceptar">Aceptar</option>
                        <option value="Explotar">Explotar (Oportunidad)</option>
                        <option value="Mejorar">Mejorar (Oportunidad)</option>
                    </select>
                </div>

                <!-- Acciones -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Acciones de Respuesta</span>
                    </label>
                    <textarea
                        v-model="formData.actions"
                        class="textarea textarea-bordered"
                        placeholder="Detalla las acciones específicas..."
                        rows="3"
                    ></textarea>
                </div>

                <!-- Responsable -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Responsable</span>
                    </label>
                    <input
                        v-model="formData.responsible"
                        type="text"
                        class="input input-bordered"
                        placeholder="Nombre del responsable"
                    />
                </div>
            </div>
        </template>
    </BaseModal>
</template>
