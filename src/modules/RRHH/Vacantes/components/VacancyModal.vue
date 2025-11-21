<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useVacancyActions } from '@/modules/RRHH/Vacantes/composables/useVacancyActions'
import DetailVacancyContent from '@/modules/RRHH/Vacantes/components/DetailVacancyContent.vue'
import DeleteVacancyContent from '@/modules/RRHH/Vacantes/components/DeleteVacancyContent.vue'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    modalId: string
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const { deleteVacancy } = useVacancyActions()

const isSubmitting = computed(() => false)

const modalData = computed(() => {
    return modalStore.modals[props.modalId] || {}
})

const modalType = computed(() => modalData.value.type || '')

const vacancyData = computed(() => {
    return modalData.value.data || {}
})

// Modal map configuration
const modalMap: Record<string, any> = {
    DELETE: {
        component: DeleteVacancyContent
    },
    DETAIL: {
        component: DetailVacancyContent
    }
}

const currentModalComponent = computed(() => {
    return modalMap[modalType.value]?.component
})

const onSubmit = async () => {
    if (modalType.value === 'DELETE') {
        try {
            const result = await deleteVacancy(vacancyData.value.id)
            showNotification(result.message, result.status)
            
            if (result.status === 'success') {
                modalStore.close(props.modalId)
                if (props.onRefresh) {
                    props.onRefresh()
                }
            }
        } catch (error) {
            console.error('Error deleting vacancy:', error)
            showNotification('Error al eliminar la vacante', 'error')
        }
    } else {
        modalStore.close(props.modalId)
    }
}

const onClose = () => {
    modalStore.close(props.modalId)
}
</script>

<template>
    <BaseModal
        :modal-id="modalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="isSubmitting"
    >
        <template #modalBody>
            <component :is="currentModalComponent" :modal-id="modalId" v-if="currentModalComponent" />
        </template>
    </BaseModal>
</template>
