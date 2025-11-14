<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useManualesStore } from '../store/manualesStore'
import { useManualesActions } from '../composables/useManualesActions'

const props = defineProps<{
    show: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'saved'): void
}>()

const manualesStore = useManualesStore()
const { agregarManual } = useManualesActions()

// Modo manual (modo automático deshabilitado por ahora)
const form = ref({
    lvl1: 0,
    lvl2: '',
    lvls3: '',
    lvl4: 0
})

const isSaving = ref(false)

// Computed para procesos nivel 4 (depende de nivel 1)
const procesoNivel4 = computed(() => {
    if (form.value.lvl1 > 0) {
        const espacio = manualesStore.espacios.find(e => e.id === form.value.lvl1)
        return espacio?.Procesos || []
    }
    return []
})

// Reset form cuando cierra
watch(() => props.show, (newVal) => {
    if (newVal) {
        resetForm()
    }
})

const resetForm = () => {
    form.value = {
        lvl1: 0,
        lvl2: '',
        lvls3: '',
        lvl4: 0
    }
}

const handleClose = () => {
    resetForm()
    emit('close')
}

const validarForm = (): boolean => {
    if (form.value.lvl1 === 0) {
        alert('Selecciona el proceso (nivel 1)')
        return false
    }
    if (!form.value.lvl2.trim()) {
        alert('Ingresa el proceso (nivel 2)')
        return false
    }
    if (!form.value.lvls3.trim()) {
        alert('Ingresa el grupo de procesos (nivel 3)')
        return false
    }
    if (form.value.lvl4 === 0) {
        alert('Selecciona el proceso (nivel 4)')
        return false
    }
    return true
}

const handleGuardar = async () => {
    if (!validarForm()) return

    try {
        isSaving.value = true
        const success = await agregarManual({
            lvl1: form.value.lvl1,
            lvl2: form.value.lvl2,
            lvls3: form.value.lvls3,
            lvl4: form.value.lvl4
        })

        if (success) {
            emit('saved')
            handleClose()
        }
    } finally {
        isSaving.value = false
    }
}
</script>

<template>
    <div v-if="show" class="modal modal-open">
        <div class="modal-box max-w-2xl">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined">add_circle</span>
                Nuevo Manual
            </h3>

            <div class="space-y-4">
                <!-- Nivel 1: Espacio -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Proceso (Nivel 1) *</span>
                    </label>
                    <select 
                        class="select select-bordered"
                        v-model.number="form.lvl1"
                    >
                        <option :value="0" disabled>-- Seleccione una opción --</option>
                        <option 
                            v-for="espacio in manualesStore.espacios" 
                            :key="espacio.id" 
                            :value="espacio.id"
                        >
                            {{ espacio.nombre }}
                        </option>
                    </select>
                </div>

                <!-- Nivel 2: Texto libre -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Proceso (Nivel 2) *</span>
                    </label>
                    <input 
                        type="text" 
                        class="input input-bordered"
                        v-model="form.lvl2"
                        placeholder="Ej: Gestión de Calidad"
                    />
                </div>

                <!-- Nivel 3: Textarea -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Grupo de Procesos (Nivel 3) *</span>
                        <span class="label-text-alt text-xs opacity-60">Separa con saltos de línea</span>
                    </label>
                    <textarea 
                        class="textarea textarea-bordered"
                        rows="4"
                        v-model="form.lvls3"
                        placeholder="Ej:&#10;Control de Calidad&#10;Auditorías Internas&#10;Mejora Continua"
                    ></textarea>
                </div>

                <!-- Nivel 4: Select dependiente -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Proceso (Nivel 4) *</span>
                    </label>
                    <select 
                        class="select select-bordered"
                        v-model.number="form.lvl4"
                        :disabled="form.lvl1 === 0"
                    >
                        <option :value="0" disabled>-- Seleccione una opción --</option>
                        <option 
                            v-for="proceso in procesoNivel4" 
                            :key="proceso.id" 
                            :value="proceso.id"
                        >
                            {{ proceso.nombre }}
                        </option>
                    </select>
                </div>

                <!-- Info -->
                <div class="alert alert-info">
                    <span class="material-symbols-outlined">info</span>
                    <span class="text-sm">
                        Este manual se agregará a la pestaña "Manual" y podrá ser habilitado/deshabilitado.
                    </span>
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
                    @click="handleGuardar"
                    :disabled="isSaving"
                >
                    <span v-if="isSaving" class="loading loading-spinner loading-sm"></span>
                    <span v-else class="material-symbols-outlined">check</span>
                    Agregar Manual
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
