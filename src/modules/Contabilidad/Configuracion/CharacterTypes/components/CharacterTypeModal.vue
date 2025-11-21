<script setup lang="ts">
import { watch, computed } from 'vue'
import CharacterTypeForm from '@contabilidad/Configuracion/CharacterTypes/components/CharacterTypeForm.vue'
import useCharacterTypesStore from '@contabilidad/Configuracion/CharacterTypes/store/characterTypesStore'
import { useCharacterTypesActions } from '@contabilidad/Configuracion/CharacterTypes/composables/useCharacterTypesActions'
import { showNotification } from '@/utils/toastNotifications'
import type { CharacterTypeFormDTO } from '@contabilidad/Configuracion/CharacterTypes/types/characterTypesTypes'

interface Props {
    show: boolean
    characterTypeId?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'success'])

const characterTypesStore = useCharacterTypesStore()
const { getCharacterTypeById, createCharacterType, updateCharacterType } = useCharacterTypesActions()

const isEditMode = computed(() => !!props.characterTypeId)
const modalTitle = computed(() => 
    isEditMode.value ? 'Editar Tipo de Carácter' : 'Nuevo Tipo de Carácter'
)

watch(() => props.show, async (show) => {
    if (show) {
        if (props.characterTypeId) {
            try {
                const characterType = await getCharacterTypeById(props.characterTypeId)
                if (characterType) {
                    characterTypesStore.setCharacterType({
                        name: characterType.name,
                        description: characterType.description,
                        active: characterType.active
                    })
                }
            } catch (error) {
                showNotification('Error al cargar el tipo de carácter', 'error')
                closeModal()
            }
        } else {
            characterTypesStore.resetCharacterType()
        }
    }
})

const handleSubmit = async (data: CharacterTypeFormDTO) => {
    try {
        if (isEditMode.value && props.characterTypeId) {
            await updateCharacterType(props.characterTypeId, data)
            showNotification('Tipo de carácter actualizado exitosamente', 'success')
        } else {
            await createCharacterType(data)
            showNotification('Tipo de carácter creado exitosamente', 'success')
        }
        emit('success')
        closeModal()
    } catch (error) {
        showNotification(
            isEditMode.value 
                ? 'Error al actualizar el tipo de carácter' 
                : 'Error al crear el tipo de carácter',
            'error'
        )
    }
}

const closeModal = () => {
    characterTypesStore.resetCharacterType()
    emit('close')
}
</script>

<template>
    <div v-if="show" class="modal modal-open">
        <div class="modal-box w-11/12 max-w-2xl">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold">{{ modalTitle }}</h3>
                <button 
                    class="btn btn-sm btn-circle btn-ghost" 
                    @click="closeModal"
                >
                    ✕
                </button>
            </div>

            <CharacterTypeForm 
                @submit="handleSubmit" 
                @cancel="closeModal" 
            />
        </div>
        <div class="modal-backdrop" @click="closeModal"></div>
    </div>
</template>
