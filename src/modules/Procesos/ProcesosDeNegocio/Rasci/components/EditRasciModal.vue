<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRasciActions } from '../composables/useRasciActions'
import type { ICheckboxesRasci } from '../types/rasci.types'

interface Props {
    show: boolean
    actividadTitulo: string
    rolTitulo: string
    valorActual: string
    dniActividad: number
    dniRol: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'saved'): void
}>()

const { modificarValor } = useRasciActions()

const checkboxes = ref<ICheckboxesRasci>({
    R: false,
    A: false,
    S: false,
    C: false,
    I: false
})

const isSaving = ref(false)

// Watch para actualizar checkboxes cuando cambia el valor
watch(() => props.valorActual, (nuevoValor) => {
    checkboxes.value = {
        R: nuevoValor.includes('R'),
        A: nuevoValor.includes('A'),
        S: nuevoValor.includes('S'),
        C: nuevoValor.includes('C'),
        I: nuevoValor.includes('I')
    }
}, { immediate: true })

const handleClose = () => {
    emit('close')
}

const handleSave = async () => {
    try {
        isSaving.value = true
        
        const success = await modificarValor(
            props.dniActividad,
            props.dniRol,
            checkboxes.value
        )
        
        if (success) {
            emit('saved')
            emit('close')
        }
    } finally {
        isSaving.value = false
    }
}
</script>

<template>
    <div v-if="show" class="modal modal-open">
        <div class="modal-box">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined">edit</span>
                Editar Valor RASCI
            </h3>
            
            <div class="mb-4 p-4 bg-base-200 rounded-lg">
                <p class="text-sm font-semibold">Actividad:</p>
                <p class="text-base">{{ actividadTitulo }}</p>
                <p class="text-sm font-semibold mt-2">Rol / Puesto:</p>
                <p class="text-base">{{ rolTitulo }}</p>
            </div>

            <div class="divider">Seleccionar Responsabilidades</div>

            <div class="grid grid-cols-1 gap-3 mb-6">
                <!-- R - Responsable -->
                <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                        <input 
                            type="checkbox" 
                            class="checkbox checkbox-primary"
                            v-model="checkboxes.R"
                        />
                        <div class="flex flex-col">
                            <span class="label-text font-bold">
                                <span class="badge badge-primary badge-sm mr-2">R</span>
                                Responsable
                            </span>
                            <span class="label-text-alt">
                                Persona que ejecuta la actividad
                            </span>
                        </div>
                    </label>
                </div>

                <!-- A - Accountable -->
                <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                        <input 
                            type="checkbox" 
                            class="checkbox checkbox-secondary"
                            v-model="checkboxes.A"
                        />
                        <div class="flex flex-col">
                            <span class="label-text font-bold">
                                <span class="badge badge-secondary badge-sm mr-2">A</span>
                                Accountable
                            </span>
                            <span class="label-text-alt">
                                Persona que rinde cuentas del resultado
                            </span>
                        </div>
                    </label>
                </div>

                <!-- S - Soporte -->
                <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                        <input 
                            type="checkbox" 
                            class="checkbox checkbox-accent"
                            v-model="checkboxes.S"
                        />
                        <div class="flex flex-col">
                            <span class="label-text font-bold">
                                <span class="badge badge-accent badge-sm mr-2">S</span>
                                Soporte
                            </span>
                            <span class="label-text-alt">
                                Persona que brinda apoyo para la ejecución
                            </span>
                        </div>
                    </label>
                </div>

                <!-- C - Consultado -->
                <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                        <input 
                            type="checkbox" 
                            class="checkbox checkbox-info"
                            v-model="checkboxes.C"
                        />
                        <div class="flex flex-col">
                            <span class="label-text font-bold">
                                <span class="badge badge-info badge-sm mr-2">C</span>
                                Consultado
                            </span>
                            <span class="label-text-alt">
                                Persona cuya opinión se solicita
                            </span>
                        </div>
                    </label>
                </div>

                <!-- I - Informado -->
                <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                        <input 
                            type="checkbox" 
                            class="checkbox checkbox-neutral"
                            v-model="checkboxes.I"
                        />
                        <div class="flex flex-col">
                            <span class="label-text font-bold">
                                <span class="badge badge-neutral badge-sm mr-2">I</span>
                                Informado
                            </span>
                            <span class="label-text-alt">
                                Persona que debe ser notificada del resultado
                            </span>
                        </div>
                    </label>
                </div>
            </div>

            <div class="modal-action">
                <button 
                    class="btn btn-ghost"
                    @click="handleClose"
                    :disabled="isSaving"
                >
                    <span class="material-symbols-outlined">close</span>
                    Cancelar
                </button>
                <button 
                    class="btn btn-success"
                    @click="handleSave"
                    :disabled="isSaving"
                >
                    <span v-if="isSaving" class="loading loading-spinner loading-sm"></span>
                    <span v-else class="material-symbols-outlined">save</span>
                    Guardar
                </button>
            </div>
        </div>
        <div class="modal-backdrop" @click="handleClose"></div>
    </div>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
}
</style>
