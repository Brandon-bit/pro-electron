<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import CreateButton from '@/modules/RRHH/Incidencias/components/CreateButton.vue'
import IncidenceModal from '@/modules/RRHH/Incidencias/components/IncidenceModal.vue'
import { useIncidences } from '@/modules/RRHH/Incidencias/composables/useIncidences'
import { useIncidenceActions } from '@/modules/RRHH/Incidencias/composables/useIncidencesActions'

const { getIncidences } = useIncidenceActions()
const { getTableColumns } = useIncidences()
const tableRef = ref()

const handleRefresh = () => {
    tableRef.value?.fetchData()
}
</script>

<template>
    <BaseTitle title="Incidencias de RRHH" subtitle="Gestión de incidencias de empleados" />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable ref="tableRef" :fetchCallback="getIncidences" :headers="getTableColumns()" />
    <IncidenceModal :onRefresh="handleRefresh" />
</template>
