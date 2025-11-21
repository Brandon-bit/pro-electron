<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import RecognitionCard from '@/modules/RRHH/GestionBeneficios/components/RecognitionCard.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import type { Recognition } from '@/modules/RRHH/GestionBeneficios/types/benefitsTypes'

const props = defineProps<{
    recognitionModalId: string
    loadRecognitions: () => Promise<void>
}>()

const modalStore = useModalStore()
const recognitions = ref<Recognition[]>([])
const loading = ref(false)

const handleNewRecognition = () => {
    modalStore.open(props.recognitionModalId, {
        type: 'CREATE',
        title: 'Nuevo Reconocimiento',
        data: null
    })
}

onMounted(() => {
    props.loadRecognitions()
})

defineExpose({ recognitions, loading })
</script>

<template>
    <div class="card bg-base-100 shadow-md">
        <div class="card-body">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h2 class="card-title flex items-center gap-2">
                        <span class="material-symbols-outlined">workspace_premium</span>
                        Reconocimiento Peer-to-Peer
                    </h2>
                    <p class="text-base-content/70 mt-1">
                        Reconoce el trabajo excepcional de tus compañeros
                    </p>
                </div>
                <BaseButton text="Nuevo Reconocimiento" icon="add" @click="handleNewRecognition" />
            </div>

            <div v-if="loading" class="text-center py-8">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RecognitionCard
                    v-for="recognition in recognitions"
                    :key="recognition.id"
                    :recognition="recognition"
                />
            </div>
        </div>
    </div>
</template>
