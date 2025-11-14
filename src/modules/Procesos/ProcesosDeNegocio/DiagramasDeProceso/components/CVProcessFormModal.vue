<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { getLevel2And3Service } from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/services/businessProcessServices'
import type {
    ValueChainSpaceType,
    Level2Type,
    Level3Type
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'

const props = defineProps<{
    isOpen: boolean
    cvSpace: ValueChainSpaceType | null
    dniCV: number
}>()

const emit = defineEmits<{
    close: []
    submit: [data: { nombre: string; asis: boolean; dniLvl2: number; selectedLvl3Ids: number[] }]
}>()

const modalRef = ref<HTMLDialogElement | null>(null)
const selectedType = ref<'asis' | 'tobe'>('asis')
const selectedLvl2 = ref<number>(0)
const level2Options = ref<Level2Type[]>([])
const isLoadingLevels = ref(false)

const schema = z.object({
    nombre: z
        .string({ required_error: 'El nombre es requerido' })
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(150, 'El nombre no puede exceder 150 caracteres')
})

const { handleSubmit, resetForm, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: {
        nombre: ''
    }
})

// Computed para obtener los niveles 3 del nivel 2 seleccionado
const level3Options = computed(() => {
    if (selectedLvl2.value === 0) return []
    const level2 = level2Options.value.find((l) => l.dni === selectedLvl2.value)
    return level2?.lvls3 || []
})

watch(
    () => props.isOpen,
    async (newValue) => {
        if (newValue) {
            resetForm()
            selectedType.value = 'asis'
            selectedLvl2.value = 0
            await loadLevel2And3()
            modalRef.value?.showModal()
        } else {
            modalRef.value?.close()
        }
    }
)

const loadLevel2And3 = async () => {
    if (!props.cvSpace) return

    try {
        isLoadingLevels.value = true
        const response = await getLevel2And3Service(props.cvSpace.dni)
        if (response.success) {
            level2Options.value = response.data
        }
    } catch (error) {
        console.error('Error al cargar niveles:', error)
    } finally {
        isLoadingLevels.value = false
    }
}

const onSubmit = handleSubmit(async (values) => {
    // Obtener los niveles 3 seleccionados
    const selectedLvl3s = level3Options.value
        .filter((l3) => l3.selected)
        .map((l3) => l3.id)

    emit('submit', {
        nombre: values.nombre,
        asis: selectedType.value === 'asis',
        dniLvl2: selectedLvl2.value,
        selectedLvl3Ids: selectedLvl3s
    })
})

const handleClose = () => {
    resetForm()
    emit('close')
}
</script>

<template>
    <dialog ref="modalRef" class="modal" @close="handleClose">
        <div class="modal-box max-w-2xl">
            <h3 class="font-bold text-lg mb-4">
                Crear Proceso CV en: <span class="text-primary">{{ cvSpace?.titulo }}</span>
            </h3>

            <form @submit.prevent="onSubmit">
                <div class="space-y-4">
                    <BaseFormInput
                        name="nombre"
                        type="text"
                        label="Nombre del proceso"
                        placeholder="Ej: Desarrollo de Producto"
                        :required="true"
                    />

                    <!-- Radio buttons para tipo de proceso -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Tipo de proceso</span>
                        </label>
                        <div class="flex gap-4">
                            <label
                                class="label cursor-pointer gap-2 border rounded-lg p-3 flex-1"
                                :class="
                                    selectedType === 'asis'
                                        ? 'border-warning bg-warning/10'
                                        : 'border-base-300'
                                "
                            >
                                <input
                                    type="radio"
                                    name="tipo"
                                    value="asis"
                                    v-model="selectedType"
                                    class="radio radio-warning"
                                />
                                <span class="label-text font-medium">AS-IS</span>
                            </label>
                            <label
                                class="label cursor-pointer gap-2 border rounded-lg p-3 flex-1"
                                :class="
                                    selectedType === 'tobe'
                                        ? 'border-info bg-info/10'
                                        : 'border-base-300'
                                "
                            >
                                <input
                                    type="radio"
                                    name="tipo"
                                    value="tobe"
                                    v-model="selectedType"
                                    class="radio radio-info"
                                />
                                <span class="label-text font-medium">TO-BE</span>
                            </label>
                        </div>
                    </div>

                    <!-- Selector de Nivel 2 -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Grupo de procesos (Nivel 2)</span>
                        </label>
                        <select
                            v-model="selectedLvl2"
                            class="select select-bordered w-full"
                            :disabled="isLoadingLevels"
                        >
                            <option :value="0" disabled>-- Seleccione una opción --</option>
                            <option
                                v-for="lvl2 in level2Options"
                                :key="lvl2.dni"
                                :value="lvl2.dni"
                                :disabled="lvl2.lvls3.length === 0"
                            >
                                {{ lvl2.titulo }}
                            </option>
                        </select>
                    </div>

                    <!-- Tabla de Nivel 3 -->
                    <div v-if="level3Options.length > 0" class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Procesos (Nivel 3)</span>
                        </label>
                        <div class="overflow-x-auto border border-base-300 rounded-lg">
                            <table class="table table-sm">
                                <thead>
                                    <tr class="bg-base-200">
                                        <th>Proceso</th>
                                        <th class="w-20 text-center">Seleccionar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(lvl3, index) in level3Options"
                                        :key="lvl3.id"
                                        :class="{ 'opacity-50': lvl3.inuse }"
                                    >
                                        <td :class="{ 'text-base-content/40': lvl3.inuse }">
                                            {{ lvl3.titulo }}
                                            <span v-if="lvl3.inuse" class="badge badge-xs badge-warning ml-2">
                                                En uso
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <input
                                                type="checkbox"
                                                class="checkbox checkbox-primary checkbox-sm"
                                                v-model="lvl3.selected"
                                                :disabled="lvl3.inuse"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="modal-action">
                    <button type="button" class="btn btn-ghost" @click="handleClose">
                        Cancelar
                    </button>
                    <BaseButton
                        text="Agregar"
                        type="submit"
                        color="btn-primary"
                        :loading="isSubmitting"
                        :disabled="selectedLvl2 === 0"
                    />
                </div>
            </form>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button type="button" @click="handleClose">close</button>
        </form>
    </dialog>
</template>
