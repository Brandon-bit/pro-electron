<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BenefitCard from '@/modules/DiagramasDeDecision/SeguimientoDeBeneficios/components/BenefitCard.vue'
import CreateBenefitModal from '@/modules/DiagramasDeDecision/SeguimientoDeBeneficios/components/CreateBenefitModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useBenefitStore from '@/modules/DiagramasDeDecision/SeguimientoDeBeneficios/store/benefitStore'

const modalStore = useModalStore()
const benefitStore = useBenefitStore()

const openCreateModal = () => {
    modalStore.open(benefitStore.createModalId, {
        title: 'Agregar Beneficio',
        type: 'CREATE'
    })
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Seguimiento de Beneficios" 
                subtitle="Dashboard de KPIs con línea base y progreso hacia objetivos"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">trending_up</span>
                </template>
            </BaseTitle>
            <button @click="openCreateModal" class="btn btn-primary btn-lg gap-2">
                <span class="material-symbols-outlined">add</span>
                Agregar Beneficio
            </button>
        </div>

        <!-- Benefits Grid -->
        <div class="grid gap-4">
            <BenefitCard
                v-for="benefit in benefitStore.benefits"
                :key="benefit.id"
                :benefit="benefit"
            />
        </div>

        <!-- Modal -->
        <CreateBenefitModal />
    </div>
</template>
