<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useStakeholderStore from '@/modules/DiagramasDeDecision/MapaDeStakeholders/store/stakeholderStore'
import { useStakeholderActions } from '@/modules/DiagramasDeDecision/MapaDeStakeholders/composables/useStakeholderActions'

const modalStore = useModalStore()
const stakeholderStore = useStakeholderStore()
const { handleCreateStakeholder } = useStakeholderActions()

const name = ref('')
const role = ref('')
const power = ref<'high' | 'low'>('high')
const interest = ref<'high' | 'low'>('high')
const engagement = ref('Neutral')

const onSubmit = () => {
    const success = handleCreateStakeholder(
        name.value,
        role.value,
        power.value,
        interest.value,
        engagement.value
    )
    if (success) {
        name.value = ''
        role.value = ''
        power.value = 'high'
        interest.value = 'high'
        engagement.value = 'Neutral'
        modalStore.close(stakeholderStore.createModalId)
    }
}

const onClose = () => {
    name.value = ''
    role.value = ''
    power.value = 'high'
    interest.value = 'high'
    engagement.value = 'Neutral'
}
</script>

<template>
    <BaseModal
        :modal-id="stakeholderStore.createModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Name -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Nombre</span>
                    </label>
                    <input
                        v-model="name"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej. CEO, Director TI"
                    />
                </div>

                <!-- Role -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Rol</span>
                    </label>
                    <input
                        v-model="role"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej. Executive, Leadership"
                    />
                </div>

                <!-- Power -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Poder</span>
                    </label>
                    <select v-model="power" class="select select-bordered">
                        <option value="high">Alto</option>
                        <option value="low">Bajo</option>
                    </select>
                </div>

                <!-- Interest -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Interés</span>
                    </label>
                    <select v-model="interest" class="select select-bordered">
                        <option value="high">Alto</option>
                        <option value="low">Bajo</option>
                    </select>
                </div>

                <!-- Engagement -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Nivel de Compromiso</span>
                    </label>
                    <select v-model="engagement" class="select select-bordered">
                        <option value="Champion">Champion</option>
                        <option value="Supporter">Supporter</option>
                        <option value="Neutral">Neutral</option>
                        <option value="Resistant">Resistant</option>
                    </select>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
