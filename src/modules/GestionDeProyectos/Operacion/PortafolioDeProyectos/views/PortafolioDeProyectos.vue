<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import usePortfolioColumns, { type PortfolioProjectRow } from '../composables/usePortfolioColumns'
import IndicatorsTabs from '../components/IndicatorsTabs.vue'
import BaseButton from '@/shared/components/BaseButton.vue'

const tableTabs = ['Proyectos en Ejecución', 'Proyectos Finalizados', 'Proyectos Eliminados'] as const
type TableTab = (typeof tableTabs)[number]

const activeTableTab = ref<TableTab>('Proyectos en Ejecución')



const { getTableColumns } = usePortfolioColumns()
const tableColumns = computed(() => getTableColumns())

const mockProjects: PortfolioProjectRow[] = [
  {
    id: 1,
    status: 'En ejecución',
    progress: 73,
    externalId: 'PRJ-2024-001',
    implementationType: 'Gastos',
    classification: 'Transformación',
    folio: '2408001',
    name: 'Proyecto demo 1',
    type: 'Estratégico',
    startDate: '2024-01-15',
    endDate: '2024-11-30',
    currentStage: 'Ejecución',
    leader: 'Líder A',
    category: 'Gastos',
    plannedBudget: 2310003,
    realBudget: 2100000,
  },
  {
    id: 2,
    status: 'Finalizado',
    progress: 100,
    externalId: 'PRJ-2023-010',
    implementationType: 'Gastos',
    classification: 'Gastos',
    folio: '2402003',
    name: 'Proyecto finalizado',
    type: 'Operativo',
    startDate: '2023-01-01',
    endDate: '2023-11-20',
    currentStage: 'Cierre',
    leader: 'Líder B',
    category: 'Gastos',
    plannedBudget: 1500000,
    realBudget: 1480000,
  },
]

const filterProjectsByTab = (tab: TableTab): PortfolioProjectRow[] => {
  if (tab === 'Proyectos en Ejecución') return mockProjects.filter((p) => p.status === 'En ejecución')
  if (tab === 'Proyectos Finalizados') return mockProjects.filter((p) => p.status === 'Finalizado')
  if (tab === 'Proyectos Eliminados') return mockProjects.filter((p) => p.status === 'Eliminado')
  return mockProjects
}

const fetchProjects = async (page: number, pageSize: number) => {
  const all = filterProjectsByTab(activeTableTab.value)
  const start = (page - 1) * pageSize
  const items = all.slice(start, start + pageSize)
  return { items, total: all.length }
}



</script>

<template>
  <div class="space-y-6">
    <BaseTitle title="Portafolio de Proyectos" subtitle="Gestiona tus proyectos" />

    <IndicatorsTabs />
    

    <section class="card bg-base-100 shadow-sm">
      <div class="card-body space-y-4">
        <div role="tablist" class="tabs tabs-bordered">
          <button
            v-for="tab in tableTabs"
            :key="tab"
            role="tab"
            class="tab"
            :class="{ 'tab-active': activeTableTab === tab }"
            @click="activeTableTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div class="space-y-3">
          <div class="flex gap-2" v-if="activeTableTab === 'Proyectos en Ejecución'">
            <BaseButton text="Nuevo Proyecto" variant="secondary" />
            <BaseButton text="Tablero Ejecutivo" variant="secondary" />
            <BaseButton text="Presentacion Ejecutiva" variant="secondary" />
          </div>
          <BaseButton text="Reasignación de Responsables" variant="secondary" />
          <BaseTable
            :headers="tableColumns as any"
            :fetchCallback="fetchProjects"
          />
        </div>
      </div>
    </section>
  </div>
</template>
