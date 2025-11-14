<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import RatingGuide from '@/modules/DiagramasDeDecision/FMEA/components/RatingGuide.vue'
import AddFailureForm from '@/modules/DiagramasDeDecision/FMEA/components/AddFailureForm.vue'
import FMEATable from '@/modules/DiagramasDeDecision/FMEA/components/FMEATable.vue'
import { useFMEAActions } from '@/modules/DiagramasDeDecision/FMEA/composables/useFMEAActions'

const { loadData, saveData } = useFMEAActions()

onMounted(() => {
    loadData()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Análisis FMEA" 
                subtitle="Failure Mode and Effects Analysis - Evaluación de Riesgos"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">analytics</span>
                </template>
            </BaseTitle>
            <button @click="saveData" class="btn btn-outline gap-2">
                <span class="material-symbols-outlined">save</span>
                Guardar
            </button>
        </div>

        <!-- Rating Guide -->
        <RatingGuide />

        <!-- Add Failure Form -->
        <AddFailureForm />

        <!-- FMEA Table -->
        <FMEATable />
    </div>
</template>
