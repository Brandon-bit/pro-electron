<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useVacancies } from '@/modules/RRHH/Vacantes/composables/useVacancies'
import { useVacancyActions } from '@/modules/RRHH/Vacantes/composables/useVacancyActions'
import VacancyModal from '@/modules/RRHH/Vacantes/components/VacancyModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const router = useRouter()
const { getTableColumns, MODAL_ID } = useVacancies()
const { getVacancies } = useVacancyActions()

const tablaRef = ref()

const handleNewVacancy = () => {
    router.push('/rrhh/vacantes/crear')
}
</script>

<template>
    <div>
        <BaseTitle title="Vacantes" subtitle="Gestión de vacantes" />
        <div class="mb-10 flex gap-4 justify-end">
            <BaseButton text="Nueva vacante" icon="add" @click="handleNewVacancy" />
        </div>

        <!-- Table -->
        <BaseTable ref="tablaRef" :headers="getTableColumns()" :fetch-callback="getVacancies" />

        <VacancyModal :modal-id="MODAL_ID" :on-refresh="tablaRef?.fetchData" />
    </div>
</template>
