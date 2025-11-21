<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import CompetencyModal from '@/modules/RRHH/Competencias/components/CompetencyModal.vue'
import useCompetencyStore from '@/modules/RRHH/Competencias/store/competencyStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useCompetencies } from '@/modules/RRHH/Competencias/composables/useCompetencies'
import { useCompetencyActions } from '@/modules/RRHH/Competencias/composables/useCompetencyActions'

const competencyStore = useCompetencyStore()
const modalStore = useModalStore()
const { getCompetencies } = useCompetencyActions()

const tablaRef = ref()

const handleNewCompetency = () => {
    competencyStore.clearData()
    modalStore.open(competencyStore.modalId, {
        type: 'CREATE',
        title: 'Nueva Competencia'
    })
}
</script>

<template>
    <div>
        <BaseTitle
            title="Gestión de Competencias"
            subtitle="Catálogo de competencias organizacionales para evaluaciones"
        />

        <div class="mb-6 flex gap-4 justify-end">
            <BaseButton text="Nueva Competencia" icon="add" @click="handleNewCompetency" />
        </div>

        <BaseTable
            ref="tablaRef"
            :headers="useCompetencies()"
            :fetch-callback="getCompetencies"
        />

        <!-- Modal -->
        <CompetencyModal :on-refresh="tablaRef?.fetchData" />
    </div>
</template>
