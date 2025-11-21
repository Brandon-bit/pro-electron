<script setup lang="ts">
import { computed } from 'vue'
import { useModalStore } from '@/shared/stores/modal.store'

const props = defineProps<{
    modalId: string
}>()

const modalStore = useModalStore()

const vacancyData = computed(() => {
    return modalStore.modals[props.modalId]?.data || {}
})
</script>

<template>
    <div class="space-y-4">
        <div class="text-center">
            <p class="text-lg mb-4">¿Estás seguro de que deseas eliminar esta vacante?</p>
            <div class="bg-base-200 p-4 rounded-lg">
                <p class="font-bold text-xl">
                    {{ vacancyData.title }}
                </p>
                <p class="text-sm text-base-content/70">
                    Salario: ${{ vacancyData.offeredSalary?.toLocaleString('es-MX') }}
                </p>
                <p class="text-sm text-base-content/70">
                    Candidatos: {{ vacancyData.candidatesCount || 0 }}
                </p>
            </div>
        </div>
    </div>
</template>
