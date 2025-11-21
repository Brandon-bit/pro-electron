<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import CharacterTypeModal from '@contabilidad/Configuracion/CharacterTypes/components/CharacterTypeModal.vue'
import { useCharacterTypesActions } from '@contabilidad/Configuracion/CharacterTypes/composables/useCharacterTypesActions'
import useCharacterTypes from '@contabilidad/Configuracion/CharacterTypes/composables/useCharacterTypes'
import useCharacterTypesStore from '@contabilidad/Configuracion/CharacterTypes/store/characterTypesStore'
import { useModalStore } from '@/shared/stores/modal.store'

const { getCharacterTypes } = useCharacterTypesActions()
const { getTableColumns } = useCharacterTypes()
const characterTypesStore = useCharacterTypesStore()
const modalStore = useModalStore()

const tableRef = ref()
const showModal = ref(false)
const editingCharacterTypeId = ref<number | undefined>(undefined)

// Modal handlers
const openCreateModal = () => {
    editingCharacterTypeId.value = undefined
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingCharacterTypeId.value = undefined
    characterTypesStore.resetCharacterType()
}

const handleModalSuccess = () => {
    tableRef.value?.fetchData()
}

// Watch modalStore for table action triggers
watch(
    () => modalStore.modals[characterTypesStore.modalId],
    (newVal) => {
        if (newVal?.status) {
            const type = newVal.type
            if (type === 'EDIT') {
                editingCharacterTypeId.value = characterTypesStore.currentCharacterType.id
                showModal.value = true
                modalStore.close(characterTypesStore.modalId)
            } else if (type === 'DELETE') {
                // Handle delete confirmation if needed
                modalStore.close(characterTypesStore.modalId)
            }
        }
    },
    { deep: true }
)
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Tipos de Caracteres" 
                subtitle="Gestiona los tipos de caracteres para segmentos de máscara contable"
            />
            <BaseButton 
                text="Nuevo Tipo de Carácter"
                icon="add"
                @click="openCreateModal"
            />
        </div>

        <!-- Info Alert -->
        <div class="alert alert-info shadow-sm">
            <span class="material-symbols-outlined">info</span>
            <div class="flex-1">
                <h4 class="font-semibold">¿Qué son los Tipos de Caracteres?</h4>
                <p class="text-sm mt-1">
                    Los tipos de caracteres definen qué clase de datos puede contener cada segmento de la máscara contable 
                    (numérico, alfabético, alfanumérico). Estos se utilizan al configurar la estructura de códigos de cuenta.
                </p>
            </div>
        </div>

        <!-- Table -->
        <BaseTable
            ref="tableRef"
            :headers="getTableColumns()"
            :fetch-callback="getCharacterTypes"
        />

        <!-- Create/Edit Modal -->
        <CharacterTypeModal
            :show="showModal"
            :character-type-id="editingCharacterTypeId"
            @close="closeModal"
            @success="handleModalSuccess"
        />
    </div>
</template>
