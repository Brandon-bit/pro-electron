<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useHolidayStore from '@/modules/DefaultModule/Configuracion/DiasInhabiles/store/holidayStore'
import { useHolidayActions } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/composables/useHolidayActions'

const props = defineProps<{
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const holidayStore = useHolidayStore()
const { handleCreateHoliday } = useHolidayActions()

const formData = ref({
    date: '',
    description: ''
})

const onSubmit = async () => {
    // Simulación - solo console.log
    console.log('Form data:', formData.value)
    modalStore.close(holidayStore.modalId)
    
    if (props.onRefresh) {
        props.onRefresh()
    }
}

const onClose = () => {
    formData.value = {
        date: '',
        description: ''
    }
    holidayStore.clearData()
}
</script>

<template>
    <BaseModal
        :modal-id="holidayStore.modalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="holidayStore.isSubmitting"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Date -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Fecha <span class="text-error">*</span></span>
                    </label>
                    <input
                        v-model="formData.date"
                        type="date"
                        class="input input-bordered w-full"
                        required
                    />
                </div>

                <!-- Description -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Descripción <span class="text-error">*</span></span>
                    </label>
                    <input
                        v-model="formData.description"
                        type="text"
                        class="input input-bordered w-full"
                        placeholder="Ej. Día de la Independencia"
                        required
                    />
                </div>
            </div>
        </template>
    </BaseModal>
</template>
