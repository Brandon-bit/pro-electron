<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import MatrixCard from '@/modules/RRHH/GestionBeneficios/components/MatrixCard.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import type { BenefitMatrix } from '@/modules/RRHH/GestionBeneficios/types/benefitsTypes'

const props = defineProps<{
    matrixModalId: string
    onEditMatrix: (matrixId: number) => void
    loadBenefitMatrix: () => Promise<void>
}>()

const modalStore = useModalStore()
const benefitMatrix = ref<BenefitMatrix[]>([])
const loading = ref(false)

const handleNewMatrix = () => {
    modalStore.open(props.matrixModalId, {
        type: 'CREATE',
        title: 'Nueva Matriz de Beneficios',
        data: null
    })
}

onMounted(() => {
    props.loadBenefitMatrix()
})

defineExpose({ benefitMatrix, loading })
</script>

<template>
    <div class="card bg-base-100 shadow-md">
        <div class="card-body">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h2 class="card-title flex items-center gap-2">
                        <span class="material-symbols-outlined">table_chart</span>
                        Matriz de Beneficios
                    </h2>
                    <p class="text-base-content/70 mt-1">
                        Configura umbrales y beneficios por nivel de desempeño
                    </p>
                </div>
                <BaseButton text="Nueva Matriz" icon="add" @click="handleNewMatrix" />
            </div>

            <div v-if="loading" class="text-center py-8">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MatrixCard
                    v-for="matrix in benefitMatrix"
                    :key="matrix.id"
                    :matrix="matrix"
                    @edit="onEditMatrix"
                />
            </div>
        </div>
    </div>
</template>
