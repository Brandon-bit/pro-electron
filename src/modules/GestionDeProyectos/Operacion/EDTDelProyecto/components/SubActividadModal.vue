<script setup lang="ts">
import { watch, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { useEDTActions } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/useEDTActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { subActividadSchema } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/validations/edtValidation'
import AddSubActividadForm from './AddSubActividadForm.vue'
import EditSubActividadForm from './EditSubActividadForm.vue'
import DeleteSubActividad from './DeleteSubActividad.vue'

const modalStore = useModalStore()
const edtStore = useEDTStore()
const { crearSubActividad, actualizarSubActividad, eliminarSubActividad } = useEDTActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(subActividadSchema),
    validateOnMount: false,
    initialValues: {
        nombre: '',
        activo: true
    }
})

watch(
    () => edtStore.selectedSubActividad,
    (subActividad) => {
        if (subActividad) {
            setValues({
                nombre: subActividad.nombre,
                activo: subActividad.activo
            })
        } else {
            resetForm({ values: { nombre: '', activo: true } })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddSubActividadForm,
        action: crearSubActividad
    },
    EDIT: {
        component: EditSubActividadForm,
        action: actualizarSubActividad
    },
    DELETE: {
        component: DeleteSubActividad,
        action: eliminarSubActividad
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[edtStore.subactividadModalId]?.type
    return modalMap[modalType as keyof typeof modalMap]?.component
})

const onSubmit = async () => {
    const modalType = modalStore.modals[edtStore.subactividadModalId]?.type

    if (modalType === 'CREATE') {
        await handleSubmit(async (formValues) => {
            if (!edtStore.parentContext) return
            const success = await crearSubActividad(edtStore.parentContext.dni, formValues)
            if (success) {
                edtStore.clearSubActividad()
                modalStore.close(edtStore.subactividadModalId)
            }
        })()
        return
    }

    if (modalType === 'EDIT') {
        await handleSubmit(async (formValues) => {
            if (!edtStore.selectedSubActividad) return
            const success = await actualizarSubActividad(
                `subactividad-${edtStore.selectedSubActividad.dni}`,
                edtStore.selectedSubActividad.dniActividad,
                formValues
            )
            if (success) {
                edtStore.clearSubActividad()
                modalStore.close(edtStore.subactividadModalId)
            }
        })()
        return
    }

    if (modalType === 'DELETE') {
        if (!edtStore.selectedSubActividad) return
        const success = await eliminarSubActividad(`subactividad-${edtStore.selectedSubActividad.dni}`)
        if (success) {
            edtStore.clearSubActividad()
            modalStore.close(edtStore.subactividadModalId)
        }
    }
}

const onClose = () => {
    resetForm()
    edtStore.clearSubActividad()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="edtStore.subactividadModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template #modalBody>
            <component :is="currentModalComponent" v-if="currentModalComponent" />
        </template>
    </BaseModal>
</template>
