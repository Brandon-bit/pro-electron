<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import useProspectStore from '@/modules/Inversiones/Inversion/Prospectos/store/prospectStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useProspectActions } from '@/modules/Inversiones/Inversion/Prospectos/composables/useProspectActions'
import { showNotification } from '@/utils/toastNotifications'
import { prospectSchema } from '@/modules/Inversiones/Inversion/Prospectos/validations/prospectValidation'

const props = defineProps<{
    onRefresh?: () => void
}>()

const prospectStore = useProspectStore()
const modalStore = useModalStore()
const { createProspect, updateProspect, deleteProspect } = useProspectActions()

const isSubmitting = ref(false)
const modalType = ref<'CREATE' | 'EDIT' | 'DELETE'>('CREATE')

const statusOptions = [
    { id: 'Nuevo', label: 'Nuevo' },
    { id: 'Contactado', label: 'Contactado' },
    { id: 'Calificado', label: 'Calificado' },
    { id: 'Propuesta', label: 'Propuesta' },
    { id: 'Negociación', label: 'Negociación' },
    { id: 'Ganado', label: 'Ganado' },
    { id: 'Perdido', label: 'Perdido' }
]

const sectorOptions = [
    { id: 'Tecnología', label: 'Tecnología' },
    { id: 'Finanzas', label: 'Finanzas' },
    { id: 'Salud', label: 'Salud' },
    { id: 'Educación', label: 'Educación' },
    { id: 'Retail', label: 'Retail' },
    { id: 'Manufactura', label: 'Manufactura' },
    { id: 'Servicios', label: 'Servicios' },
    { id: 'Otro', label: 'Otro' }
]

const { handleSubmit, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(prospectSchema),
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        cellphone: '',
        sector: undefined,
        status: 'Nuevo',
        needs: ''
    }
})

watch(() => prospectStore.selectedProspect, (prospect) => {
    if (prospect) {
        setValues({
            firstName: prospect.firstName,
            lastName: prospect.lastName,
            email: prospect.email,
            company: prospect.company || '',
            phone: prospect.phone || '',
            cellphone: prospect.cellphone || '',
            sector: prospect.sector,
            status: prospect.status,
            needs: prospect.needs || ''
        })
    }
})

const onSubmit = handleSubmit(async (values) => {
    isSubmitting.value = true
    try {
        let result
        const prospect = prospectStore.selectedProspect

        if (modalType.value === 'DELETE' && prospect) {
            result = await deleteProspect(prospect.id!)
        } else if (modalType.value === 'EDIT' && prospect) {
            result = await updateProspect(prospect.id!, values)
        } else {
            result = await createProspect(values)
        }

        showNotification(result.message, result.status)
        
        if (result.status === 'success') {
            props.onRefresh?.()
            modalStore.close(prospectStore.modalId)
            resetForm()
            prospectStore.setSelectedProspect()
        }
    } catch (error) {
        showNotification('Error al procesar la solicitud', 'error')
    } finally {
        isSubmitting.value = false
    }
})

const onClose = () => {
    resetForm()
    prospectStore.setSelectedProspect()
}

// Watch for modal type changes
watch(() => modalStore.modals[prospectStore.modalId]?.options?.type, (type) => {
    if (type) {
        modalType.value = type as 'CREATE' | 'EDIT' | 'DELETE'
    }
})
</script>

<template>
    <BaseModal
        :modalId="prospectStore.modalId"
        :onClose="onClose"
        :onSubmit="onSubmit"
        :isSubmitting="isSubmitting"
        size="large"
    >
        <template v-slot:modalBody>
            <form @submit.prevent="onSubmit" class="space-y-4">
                <!-- Delete Confirmation -->
                <div v-if="modalType === 'DELETE'" class="alert alert-warning">
                    <span class="material-symbols-outlined">warning</span>
                    <span>
                        ¿Está seguro que desea eliminar el prospecto 
                        <strong>{{ prospectStore.selectedProspect?.firstName }} {{ prospectStore.selectedProspect?.lastName }}</strong>?
                        Esta acción no se puede deshacer.
                    </span>
                </div>

                <!-- Form Fields -->
                <div v-else class="space-y-4">
                    <!-- Row 1: Nombre y Apellido -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BaseFormInput
                            name="firstName"
                            label="Nombre"
                            placeholder="Nombre del prospecto"
                            required
                        />
                        <BaseFormInput
                            name="lastName"
                            label="Apellido"
                            placeholder="Apellido del prospecto"
                            required
                        />
                    </div>

                    <!-- Row 2: Correo y Empresa -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BaseFormInput
                            name="email"
                            label="Correo"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                        <BaseFormInput
                            name="company"
                            label="Empresa"
                            placeholder="Nombre de la empresa"
                        />
                    </div>

                    <!-- Row 3: Teléfono, Celular, Sector y Estatus -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <BaseFormInput
                            name="phone"
                            label="Teléfono"
                            placeholder="5512345678"
                        />
                        <BaseFormInput
                            name="cellphone"
                            label="Celular"
                            placeholder="5512345678"
                        />
                        <BaseFormSelect
                            name="sector"
                            label="Sector"
                            :options="sectorOptions"
                        />
                        <BaseFormSelect
                            name="status"
                            label="Estatus"
                            :options="statusOptions"
                            required
                        />
                    </div>

                    <!-- Necesidades -->
                    <div class="divider">Necesidades</div>
                    <BaseFormInput
                        name="needs"
                        label="Necesidades"
                        type="textarea"
                        placeholder="Describe las necesidades del prospecto..."
                        rows="4"
                    />
                </div>
            </form>
        </template>
    </BaseModal>
</template>
