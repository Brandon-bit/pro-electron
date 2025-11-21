<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BenefitCard from '@/modules/RRHH/GestionBeneficios/components/BenefitCard.vue'
import type { Benefit, BenefitsStats } from '@/modules/RRHH/GestionBeneficios/types/benefitsTypes'

const props = defineProps<{
    stats: BenefitsStats
    onRedeem: (benefitId: number) => void
    loadBenefits: () => Promise<void>
}>()

const benefits = ref<Benefit[]>([])
const loading = ref(false)

onMounted(() => {
    props.loadBenefits()
})

defineExpose({ benefits, loading })
</script>

<template>
    <div class="card bg-base-100 shadow-md">
        <div class="card-body">
            <h2 class="card-title flex items-center gap-2">
                <span class="material-symbols-outlined">shopping_cart</span>
                Marketplace de Beneficios
            </h2>
            <p class="text-base-content/70 mb-4">
                Canjea tus puntos de desempeño por beneficios personalizados
            </p>

            <div class="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-lg mb-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-base-content/70">Tus Puntos Disponibles</p>
                        <p class="text-3xl font-bold text-primary">{{ stats.availablePoints }}</p>
                    </div>
                    <span class="material-symbols-outlined text-primary" style="font-size: 3rem">
                        emoji_events
                    </span>
                </div>
            </div>

            <div v-if="loading" class="text-center py-8">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BenefitCard
                    v-for="benefit in benefits"
                    :key="benefit.id"
                    :benefit="benefit"
                    @redeem="onRedeem"
                />
            </div>
        </div>
    </div>
</template>
