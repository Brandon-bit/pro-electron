<script setup lang="ts">
import { watch, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { useEDTActions } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/useEDTActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { actividadSchema } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/validations/edtValidation'
import AddActividadForm from './AddActividadForm.vue'
import EditActividadForm from './EditActividadForm.vue'
import DeleteActividad from './DeleteActividad.vue'

const modalStore = useModalStore()
const edtStore = useEDTStore()
const { crearActividad, actualizarActividad, eliminarActividad } = useEDTActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(actividadSchema),
    validateOnMount: false,
    initialValues: {
        nombre: '',
        psn: 0,
        dias: 1,
        activo: true
    }
})

watch(
    () => edtStore.selectedActividad,
    (actividad) => {
        if (actividad) {
            setValues({
                nombre: actividad.nombre,
                psn: actividad.psn,
                dias: actividad.dias,
                activo: actividad.activo
            })
        } else {
            resetForm({ values: { nombre: '', psn: 0, dias: 1, activo: true } })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddActividadForm,
        action: crearActividad
    },
    EDIT: {
        component: EditActividadForm,
        action: actualizarActividad
    },
    DELETE: {
        component: DeleteActividad,
        action: eliminarActividad
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[edtStore.actividadModalId]?.type
    return modalMap[modalType as keyof typeof modalMap]?.component
})

const onSubmit = async () => {
    const modalType = modalStore.modals[edtStore.actividadModalId]?.type

    if (modalType === 'CREATE') {
        await handleSubmit(async (formValues) => {
            if (!edtStore.parentContext) return
            const success = await crearActividad(edtStore.parentContext.dni, formValues)
            if (success) {
                edtStore.clearActividad()
                modalStore.close(edtStore.actividadModalId)
            }
        })()
        return
    }

    if (modalType === 'EDIT') {
        await handleSubmit(async (formValues) => {
            if (!edtStore.selectedActividad) return
            const success = await actualizarActividad(
                `actividad-${edtStore.selectedActividad.dni}`,
                edtStore.selectedActividad.dniEtapa,
                formValues
            )
            if (success) {
                edtStore.clearActividad()
                modalStore.close(edtStore.actividadModalId)
            }
        })()
        return
    }

    if (modalType === 'DELETE') {
        if (!edtStore.selectedActividad) return
        const success = await eliminarActividad(`actividad-${edtStore.selectedActividad.dni}`)
        if (success) {
            edtStore.clearActividad()
            modalStore.close(edtStore.actividadModalId)
        }
    }
}

const onClose = () => {
    resetForm()
    edtStore.clearActividad()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="edtStore.actividadModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template #modalBody>
            <component :is="currentModalComponent" v-if="currentModalComponent" />
        </template>
    </BaseModal>
</template>
