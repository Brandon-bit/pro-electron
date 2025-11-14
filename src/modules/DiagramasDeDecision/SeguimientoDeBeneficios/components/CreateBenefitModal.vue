<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useBenefitStore from '@/modules/DiagramasDeDecision/SeguimientoDeBeneficios/store/benefitStore'
import { useBenefitActions } from '@/modules/DiagramasDeDecision/SeguimientoDeBeneficios/composables/useBenefitActions'

const modalStore = useModalStore()
const benefitStore = useBenefitStore()
const { handleCreateBenefit } = useBenefitActions()

const name = ref('')
const baseline = ref(0)
const target = ref(0)
const current = ref(0)
const unit = ref('')

const onSubmit = () => {
    const success = handleCreateBenefit(
        name.value,
        baseline.value,
        target.value,
        current.value,
        unit.value
    )
    if (success) {
        name.value = ''
        baseline.value = 0
        target.value = 0
        current.value = 0
        unit.value = ''
        modalStore.close(benefitStore.createModalId)
    }
}

const onClose = () => {
    name.value = ''
    baseline.value = 0
    target.value = 0
    current.value = 0
    unit.value = ''
}
</script>

<template>
    <BaseModal
        :modal-id="benefitStore.createModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Name -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Nombre del Beneficio</span>
                    </label>
                    <input
                        v-model="name"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej. Reducción Tiempo Proceso Aprobación"
                    />
                </div>

                <!-- Baseline -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Línea Base (Baseline)</span>
                    </label>
                    <input
                        v-model.number="baseline"
                        type="number"
                        step="0.1"
                        class="input input-bordered"
                        placeholder="48"
                    />
                </div>

                <!-- Target -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Objetivo (Target)</span>
                    </label>
                    <input
                        v-model.number="target"
                        type="number"
                        step="0.1"
                        class="input input-bordered"
                        placeholder="24"
                    />
                </div>

                <!-- Current -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Valor Actual</span>
                    </label>
                    <input
                        v-model.number="current"
                        type="number"
                        step="0.1"
                        class="input input-bordered"
                        placeholder="32"
                    />
                </div>

                <!-- Unit -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Unidad</span>
                    </label>
                    <input
                        v-model="unit"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej. horas, /10, %"
                    />
                </div>
            </div>
        </template>
    </BaseModal>
</template>
