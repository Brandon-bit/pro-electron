<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useHolidayStore from '@/modules/DefaultModule/Configuracion/DiasInhabiles/store/holidayStore'

const props = defineProps<{
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const holidayStore = useHolidayStore()

const onSubmit = async () => {
    // Simulación - solo console.log
    console.log('Eliminar día inhábil:', holidayStore.selectedHoliday)
    modalStore.close(holidayStore.deleteModalId)
    holidayStore.clearData()
    
    if (props.onRefresh) {
        props.onRefresh()
    }
}

const onClose = () => {
    holidayStore.clearData()
}
</script>

<template>
    <BaseModal
        :modal-id="holidayStore.deleteModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="holidayStore.isSubmitting"
    >
        <template #modalBody>
            <div v-if="holidayStore.selectedHoliday" class="space-y-4">
                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">warning</span>
                    <span>Esta acción no se puede deshacer</span>
                </div>
                
                <p class="text-base">
                    ¿Estás seguro de que deseas eliminar el día inhábil 
                    <strong>{{ holidayStore.selectedHoliday.description }}</strong>?
                </p>
                
                <div class="bg-base-200 p-4 rounded-lg space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="opacity-70">Fecha:</span>
                        <span class="font-medium">{{ holidayStore.selectedHoliday.day }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="opacity-70">Año:</span>
                        <span class="font-medium">{{ holidayStore.selectedHoliday.year }}</span>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
