<script setup lang="ts">
import { watch, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { useEDTActions } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/useEDTActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { etapaSchema } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/validations/edtValidation'
import AddEtapaForm from './AddEtapaForm.vue'
import EditEtapaForm from './EditEtapaForm.vue'
import DeleteEtapa from './DeleteEtapa.vue'

const modalStore = useModalStore()
const edtStore = useEDTStore()
const { crearEtapa, actualizarEtapa, eliminarEtapa } = useEDTActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(etapaSchema),
    validateOnMount: false,
    initialValues: {
        nombre: '',
        psn: 1,
        activo: true
    }
})

watch(
    () => edtStore.selectedEtapa,
    (etapa) => {
        if (etapa) {
            setValues({
                nombre: etapa.nombre,
                psn: etapa.psn,
                activo: etapa.activo
            })
        } else {
            resetForm({ values: { nombre: '', psn: 1, activo: true } })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddEtapaForm,
        action: crearEtapa
    },
    EDIT: {
        component: EditEtapaForm,
        action: actualizarEtapa
    },
    DELETE: {
        component: DeleteEtapa,
        action: eliminarEtapa
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[edtStore.etapaModalId]?.type
    return modalMap[modalType as keyof typeof modalMap]?.component
})

const onSubmit = async () => {
    const modalType = modalStore.modals[edtStore.etapaModalId]?.type

    // For CREATE and EDIT, use handleSubmit with validation
    if (modalType === 'CREATE') {
        await handleSubmit(async (formValues) => {
            const success = await crearEtapa(formValues)
            if (success) {
                edtStore.clearEtapa()
                modalStore.close(edtStore.etapaModalId)
            }
        })()
        return
    }

    if (modalType === 'EDIT') {
        await handleSubmit(async (formValues) => {
            if (!edtStore.selectedEtapa) return
            const success = await actualizarEtapa(`etapa-${edtStore.selectedEtapa.dni}`, formValues)
            if (success) {
                edtStore.clearEtapa()
                modalStore.close(edtStore.etapaModalId)
            }
        })()
        return
    }

    // For DELETE, no form validation needed
    if (modalType === 'DELETE') {
        if (!edtStore.selectedEtapa) return
        const success = await eliminarEtapa(`etapa-${edtStore.selectedEtapa.dni}`)
        if (success) {
            edtStore.clearEtapa()
            modalStore.close(edtStore.etapaModalId)
        }
    }
}

const onClose = () => {
    resetForm()
    edtStore.clearEtapa()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="edtStore.etapaModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template #modalBody>
            <component :is="currentModalComponent" v-if="currentModalComponent" />
        </template>
    </BaseModal>
</template>
