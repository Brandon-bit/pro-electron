<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import UserFormFields from '@/modules/DefaultModule/Usuarios/Lista/components/UserFormFields.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useUserStore from '@/modules/DefaultModule/Usuarios/Lista/store/userStore'

const props = defineProps<{
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const userStore = useUserStore()

const formData = ref({
    name: '',
    email: '',
    phone: '',
    position: '',
    area: '',
    type: '',
    roles: [] as string[],
    password: ''
})

const isEdit = computed(() => !!userStore.selectedUser)

const onSubmit = async () => {
    // Simulación - no hace nada por ahora
    console.log('Form data:', formData.value)
    modalStore.close(userStore.modalId)
}

const onClose = () => {
    formData.value = {
        name: '',
        email: '',
        phone: '',
        position: '',
        area: '',
        type: '',
        roles: [],
        password: ''
    }
    userStore.clearData()
}
</script>

<template>
    <BaseModal
        :modal-id="userStore.modalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="userStore.isSubmitting"
        size="large"
    >
        <template #modalBody>
            <UserFormFields
                v-model="formData"
                :is-edit="isEdit"
            />
        </template>
    </BaseModal>
</template>
