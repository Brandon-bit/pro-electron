<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useOlaStore } from '../store/olaStore'
import { useOlaActions } from '../composables/useOlaActions'
import type { IUsuarioVoBo } from '../types/ola.types'

interface Props {
    isOpen: boolean
}

interface Emits {
    (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const olaStore = useOlaStore()
const { getUsuariosVoBo, sendVoBo } = useOlaActions()

const usuarios = ref<IUsuarioVoBo[]>([])
const usuariosExternos = ref<string[]>([])
const correoExterno = ref('')
const isLoading = ref(false)
const isSubmitting = ref(false)

// Cargar usuarios cuando se abre el modal
watch(() => props.isOpen, async (newVal) => {
    if (newVal) {
        await cargarUsuarios()
    } else {
        resetModal()
    }
})

const cargarUsuarios = async () => {
    isLoading.value = true
    usuarios.value = await getUsuariosVoBo()
    isLoading.value = false
}

const resetModal = () => {
    usuarios.value = []
    usuariosExternos.value = []
    correoExterno.value = ''
}

const toggleUsuario = (index: number) => {
    usuarios.value[index].selected = !usuarios.value[index].selected
}

const agregarCorreoExterno = () => {
    const correo = correoExterno.value.trim()

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo)) {
        return
    }

    // Evitar duplicados
    if (usuariosExternos.value.includes(correo)) {
        correoExterno.value = ''
        return
    }

    usuariosExternos.value.push(correo)
    correoExterno.value = ''
}

const eliminarCorreoExterno = (index: number) => {
    usuariosExternos.value.splice(index, 1)
}

const handleSubmit = async () => {
    if (!olaStore.procesoSeleccionado) {
        return
    }

    // Obtener correos seleccionados
    const correosInternos = usuarios.value
        .filter(u => u.selected)
        .map(u => u.correo)

    const todosLosCorreos = [...correosInternos, ...usuariosExternos.value]

    if (todosLosCorreos.length === 0) {
        return
    }

    isSubmitting.value = true

    const success = await sendVoBo({
        dniProceso: olaStore.procesoSeleccionado.id,
        correos: todosLosCorreos
    })

    isSubmitting.value = false

    if (success) {
        emit('close')
    }
}

const handleClose = () => {
    emit('close')
}

onMounted(() => {
    if (props.isOpen) {
        cargarUsuarios()
    }
})
</script>

<template>
    <div v-if="isOpen" class="modal modal-open">
        <div class="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 class="text-2xl font-bold mb-2">Envío a Visto Bueno</h2>
            <p class="alert alert-info mb-4">
                <span class="material-symbols-outlined">info</span>
                Selecciona a los usuarios que deben dar el visto bueno.
            </p>

            <!-- Usuarios Internos -->
            <div class="mb-6">
                <h3 class="text-lg font-semibold mb-3">Usuarios del sistema</h3>
                
                <div v-if="isLoading" class="flex justify-center py-8">
                    <span class="loading loading-spinner loading-lg"></span>
                </div>

                <div v-else class="overflow-x-auto">
                    <table class="table table-sm table-zebra">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th class="text-center">Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
                                <td>{{ usuario.nombre }} {{ usuario.apellidos }}</td>
                                <td>{{ usuario.correo }}</td>
                                <td class="text-center">
                                    <input
                                        type="checkbox"
                                        :checked="usuario.selected"
                                        @change="toggleUsuario(index)"
                                        class="checkbox checkbox-primary"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="divider"></div>

            <!-- Usuarios Externos -->
            <div class="mb-6">
                <h3 class="text-lg font-semibold mb-3">Usuarios externos</h3>
                
                <div class="form-control mb-4">
                    <label class="label">
                        <span class="label-text">Correo electrónico</span>
                    </label>
                    <div class="flex gap-2">
                        <input
                            v-model="correoExterno"
                            type="email"
                            class="input input-bordered flex-1"
                            placeholder="ejemplo@correo.com"
                            @keyup.enter="agregarCorreoExterno"
                        />
                        <button
                            type="button"
                            @click="agregarCorreoExterno"
                            class="btn btn-primary"
                        >
                            <span class="material-symbols-outlined">add</span>
                            Agregar
                        </button>
                    </div>
                </div>

                <div v-if="usuariosExternos.length > 0" class="overflow-x-auto">
                    <table class="table table-sm table-zebra">
                        <thead>
                            <tr>
                                <th>Correo</th>
                                <th class="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(correo, index) in usuariosExternos" :key="index">
                                <td>{{ correo }}</td>
                                <td class="text-center">
                                    <button
                                        type="button"
                                        @click="eliminarCorreoExterno(index)"
                                        class="btn btn-ghost btn-sm text-error"
                                    >
                                        <span class="material-symbols-outlined">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="text-center text-base-content/50 py-4">
                    No se han agregado correos externos
                </div>
            </div>

            <!-- Botones -->
            <div class="modal-action">
                <button
                    type="button"
                    @click="handleClose"
                    class="btn btn-error"
                    :disabled="isSubmitting"
                >
                    <span class="material-symbols-outlined">close</span>
                    Cerrar
                </button>
                <button
                    type="button"
                    @click="handleSubmit"
                    class="btn btn-success"
                    :disabled="isSubmitting"
                >
                    <span class="material-symbols-outlined">check</span>
                    {{ isSubmitting ? 'Enviando...' : 'Enviar VoBo' }}
                </button>
            </div>
        </div>
        <div class="modal-backdrop" @click="handleClose"></div>
    </div>
</template>
