<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import MatrixChart from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/components/MatrixChart.vue'
import type { InitiativeType } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'
import { useModalStore } from '@/shared/stores/modal.store'
import useInitiativeStore from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/store/initiativeStore'
import useInitiative from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/composables/useInitiative'
import { useInitiativeActions } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/composables/useInitiativeActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh: () => void
}>()

const modalStore = useModalStore()
const initiativeStore = useInitiativeStore()
const { getTableColumns } = useInitiative()
const { getInitiatives, sendToPrioritization, calculateEffortScore, calculateImpactScore, calculateStrategicAlignment } = useInitiativeActions()

const tablaRef = ref()
const selectedInitiatives = ref<InitiativeType[]>([])
const allInitiatives = ref<InitiativeType[]>([])

const selectedCount = computed(() => selectedInitiatives.value.length)

const openCreateModal = () => {
    initiativeStore.setData()
    modalStore.open(initiativeStore.modalId, { type: 'CREATE', title: 'Añadir Proyecto a Evaluar' })
}

const handleToggleSelection = (dni: number) => {
    const index = selectedInitiatives.value.findIndex(init => init.dni === dni)
    if (index > -1) {
        selectedInitiatives.value.splice(index, 1)
    } else {
        const initiative = allInitiatives.value.find(init => init.dni === dni)
        if (initiative) {
            selectedInitiatives.value.push(initiative)
        }
    }
}

const handleSendToPrioritization = async () => {
    if (selectedInitiatives.value.length === 0) {
        showNotification('Selecciona al menos una iniciativa para enviar a priorización', 'error')
        return
    }
    
    const response = await sendToPrioritization(selectedInitiatives.value)
    showNotification(response.message, response.status as 'success' | 'error')
    
    if (response.status === 'success') {
        selectedInitiatives.value = []
        tablaRef.value?.fetchData()
        props.onRefresh()
    }
}

const fetchInitiativesWithScores = async (page: number, pageSize: number) => {
    const response = await getInitiatives(page, pageSize)
    
    // Calcular scores para cada iniciativa
    const itemsWithScores = response.items.map(init => {
        const effortScore = calculateEffortScore(init)
        const impactScore = calculateImpactScore(init)
        const strategicAlignment = calculateStrategicAlignment(effortScore, impactScore)
        
        return {
            ...init,
            effortScore,
            impactScore,
            strategicAlignment
        }
    })
    
    allInitiatives.value = itemsWithScores
    
    // Actualizar iniciativas actuales en el store para la matriz
    initiativeStore.setCurrentPageInitiatives(itemsWithScores)
    
    return {
        items: itemsWithScores,
        total: response.total
    }
}
</script>

<template>
    <div class="space-y-4">
        <!-- Botones de acción -->
        <div class="flex gap-2 justify-between items-center flex-wrap">
            <BaseButton 
                text="Añadir Proyecto a Evaluar" 
                @click="openCreateModal" 
                icon="add" 
            />
            <BaseButton 
                :text="`Enviar a Priorización (${selectedCount})`"
                @click="handleSendToPrioritization"
                :disabled="selectedCount === 0"
                icon="send"
                class="btn-accent"
            />
        </div>

        <!-- Tabla de evaluación -->
        <BaseTable
            ref="tablaRef"
            :headers="getTableColumns(handleToggleSelection)"
            :fetch-callback="fetchInitiativesWithScores"
        />

        <!-- Matriz -->
        <MatrixChart />
    </div>
</template>
