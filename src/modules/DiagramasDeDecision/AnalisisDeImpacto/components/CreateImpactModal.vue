<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useImpactStore from '@/modules/DiagramasDeDecision/AnalisisDeImpacto/store/impactStore'
import { useImpactActions } from '@/modules/DiagramasDeDecision/AnalisisDeImpacto/composables/useImpactActions'

const modalStore = useModalStore()
const impactStore = useImpactStore()
const { handleCreateImpact } = useImpactActions()

const role = ref('')
const process = ref('')
const impact = ref<'alto' | 'medio' | 'bajo'>('medio')

const onSubmit = () => {
    const success = handleCreateImpact(role.value, process.value, impact.value)
    if (success) {
        role.value = ''
        process.value = ''
        impact.value = 'medio'
        modalStore.close(impactStore.createModalId)
    }
}

const onClose = () => {
    role.value = ''
    process.value = ''
    impact.value = 'medio'
}
</script>

<template>
    <BaseModal
        :modal-id="impactStore.createModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Role -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Rol</span>
                    </label>
                    <input
                        v-model="role"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej. Gerente Finanzas"
                    />
                </div>

                <!-- Process -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Proceso</span>
                    </label>
                    <input
                        v-model="process"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej. Aprobación Compras"
                    />
                </div>

                <!-- Impact Level -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Nivel de Impacto</span>
                    </label>
                    <select v-model="impact" class="select select-bordered">
                        <option value="alto">Alto</option>
                        <option value="medio">Medio</option>
                        <option value="bajo">Bajo</option>
                    </select>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
