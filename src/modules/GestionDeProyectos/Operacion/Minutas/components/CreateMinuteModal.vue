<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import type { NewMinuteType, ActionItemType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

const modalStore = useModalStore()
const minuteStore = useMinuteStore()

const MODAL_ID = 'create-minute-modal'

const formData = ref<NewMinuteType>({
    title: '',
    date: '',
    time: '',
    attendees: [],
    absentees: [],
    agenda: '',
    discussion: '',
    decisions: '',
    actionItems: [],
    distributed: false
})

const attendeeInput = ref('')
const absenteeInput = ref('')
const actionInput = ref({
    description: '',
    responsible: '',
    dueDate: ''
})

const isSubmitting = ref(false)

watch(() => minuteStore.isModalOpen, (isOpen) => {
    if (isOpen) {
        modalStore.open(MODAL_ID, {
            title: 'Nueva Minuta de Reunión'
        })
    } else {
        modalStore.close(MODAL_ID)
    }
})

const handleAddAttendee = () => {
    if (attendeeInput.value.trim()) {
        formData.value.attendees.push(attendeeInput.value.trim())
        attendeeInput.value = ''
    }
}

const handleRemoveAttendee = (index: number) => {
    formData.value.attendees.splice(index, 1)
}

const handleAddAbsentee = () => {
    if (absenteeInput.value.trim()) {
        formData.value.absentees.push(absenteeInput.value.trim())
        absenteeInput.value = ''
    }
}

const handleRemoveAbsentee = (index: number) => {
    formData.value.absentees.splice(index, 1)
}

const handleAddAction = () => {
    if (actionInput.value.description && actionInput.value.responsible && actionInput.value.dueDate) {
        const action: ActionItemType = {
            id: `AI${String(formData.value.actionItems.length + 1).padStart(3, '0')}`,
            ...actionInput.value,
            status: 'Pendiente'
        }
        formData.value.actionItems.push(action)
        actionInput.value = {
            description: '',
            responsible: '',
            dueDate: ''
        }
    }
}

const handleRemoveAction = (index: number) => {
    formData.value.actionItems.splice(index, 1)
}

const handleSubmit = () => {
    isSubmitting.value = true
    
    minuteStore.addMinute(formData.value)
    
    // Reset form
    formData.value = {
        title: '',
        date: '',
        time: '',
        attendees: [],
        absentees: [],
        agenda: '',
        discussion: '',
        decisions: '',
        actionItems: [],
        distributed: false
    }
    
    isSubmitting.value = false
    minuteStore.closeModal()
}

const handleClose = () => {
    minuteStore.closeModal()
}
</script>

<template>
    <BaseModal
        :modal-id="MODAL_ID"
        :on-submit="handleSubmit"
        :on-close="handleClose"
        :is-submitting="isSubmitting"
        submit-text="Guardar Minuta"
    >
        <template #modalBody>
            <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                <!-- Título -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Título / Tema de la Reunión</span>
                    </label>
                    <input
                        v-model="formData.title"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej: Reunión de Seguimiento Semanal - Proyecto X"
                    />
                </div>

                <!-- Fecha y Hora -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Fecha</span>
                        </label>
                        <input
                            v-model="formData.date"
                            type="date"
                            class="input input-bordered"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Hora</span>
                        </label>
                        <input
                            v-model="formData.time"
                            type="text"
                            class="input input-bordered"
                            placeholder="Ej: 10:00 - 11:00"
                        />
                    </div>
                </div>

                <!-- Asistentes -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Asistentes Presentes</span>
                    </label>
                    <div class="flex gap-2 mb-2">
                        <input
                            v-model="attendeeInput"
                            type="text"
                            class="input input-bordered flex-1"
                            placeholder="Nombre del asistente"
                            @keypress.enter="handleAddAttendee"
                        />
                        <button @click="handleAddAttendee" type="button" class="btn btn-primary">
                            Añadir
                        </button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <div 
                            v-for="(att, idx) in formData.attendees" 
                            :key="idx" 
                            class="badge badge-secondary gap-2"
                        >
                            {{ att }}
                            <button @click="handleRemoveAttendee(idx)" class="btn btn-ghost btn-xs">✕</button>
                        </div>
                    </div>
                </div>

                <!-- Ausentes -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Ausentes</span>
                    </label>
                    <div class="flex gap-2 mb-2">
                        <input
                            v-model="absenteeInput"
                            type="text"
                            class="input input-bordered flex-1"
                            placeholder="Nombre del ausente"
                            @keypress.enter="handleAddAbsentee"
                        />
                        <button @click="handleAddAbsentee" type="button" class="btn btn-primary">
                            Añadir
                        </button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <div 
                            v-for="(abs, idx) in formData.absentees" 
                            :key="idx" 
                            class="badge badge-outline gap-2"
                        >
                            {{ abs }}
                            <button @click="handleRemoveAbsentee(idx)" class="btn btn-ghost btn-xs">✕</button>
                        </div>
                    </div>
                </div>

                <!-- Agenda -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Agenda</span>
                    </label>
                    <textarea
                        v-model="formData.agenda"
                        class="textarea textarea-bordered"
                        placeholder="Liste los temas a tratar..."
                        rows="3"
                    ></textarea>
                </div>

                <!-- Puntos Discutidos -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Puntos Discutidos</span>
                    </label>
                    <textarea
                        v-model="formData.discussion"
                        class="textarea textarea-bordered"
                        placeholder="Resuma las discusiones principales..."
                        rows="4"
                    ></textarea>
                </div>

                <!-- Decisiones -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Decisiones Tomadas</span>
                    </label>
                    <textarea
                        v-model="formData.decisions"
                        class="textarea textarea-bordered"
                        placeholder="Liste las decisiones importantes..."
                        rows="3"
                    ></textarea>
                </div>

                <!-- Acciones Acordadas -->
                <div class="border-t pt-4">
                    <label class="label">
                        <span class="label-text text-lg">Acciones Acordadas</span>
                    </label>
                    
                    <div class="space-y-3 mt-3">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text text-sm">Descripción de la Acción</span>
                            </label>
                            <input
                                v-model="actionInput.description"
                                type="text"
                                class="input input-bordered"
                                placeholder="¿Qué se debe hacer?"
                            />
                        </div>
                        
                        <div class="grid grid-cols-2 gap-2">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text text-sm">Responsable</span>
                                </label>
                                <input
                                    v-model="actionInput.responsible"
                                    type="text"
                                    class="input input-bordered"
                                    placeholder="@nombre"
                                />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text text-sm">Fecha Límite</span>
                                </label>
                                <input
                                    v-model="actionInput.dueDate"
                                    type="date"
                                    class="input input-bordered"
                                />
                            </div>
                        </div>
                        
                        <button @click="handleAddAction" type="button" class="btn btn-outline w-full gap-2">
                            <span class="material-symbols-outlined">check_box</span>
                            Añadir Acción
                        </button>
                    </div>

                    <!-- Lista de Acciones Agregadas -->
                    <div v-if="formData.actionItems.length > 0" class="mt-4 space-y-2">
                        <p class="text-sm font-semibold">Acciones agregadas:</p>
                        <div 
                            v-for="(action, idx) in formData.actionItems" 
                            :key="action.id" 
                            class="p-3 border rounded-lg bg-base-200"
                        >
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <p class="font-medium">{{ action.description }}</p>
                                    <div class="flex gap-4 text-sm opacity-70 mt-1">
                                        <span>Responsable: {{ action.responsible }}</span>
                                        <span>Fecha límite: {{ action.dueDate }}</span>
                                    </div>
                                </div>
                                <button @click="handleRemoveAction(idx)" class="btn btn-ghost btn-sm">
                                    <span class="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
