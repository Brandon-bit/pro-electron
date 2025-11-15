<script setup lang="ts">
import { onMounted, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import useFinancialStatusStore from '@/modules/GestionDeProyectos/Operacion/EstatusFinanciero/store/financialStatusStore'
import { useFinancialActions } from '@/modules/GestionDeProyectos/Operacion/EstatusFinanciero/composables/useFinancialActions'

const financialStore = useFinancialStatusStore()
const { loadData, globalSummary, formatCurrency, updateProjectDetail, exportToExcel } = useFinancialActions()

const selectedArea = computed({
    get: () => financialStore.selectedArea,
    set: (value: string) => financialStore.setSelectedArea(value)
})

const projectTypeFilter = computed({
    get: () => financialStore.projectTypeFilter,
    set: (value: string) => financialStore.setProjectTypeFilter(value)
})

const stageFilter = computed({
    get: () => financialStore.stageFilter,
    set: (value: string) => financialStore.setStageFilter(value)
})

onMounted(() => {
    loadData()
})

const formatDate = (date: Date | null): string => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('es-MX')
}

const handleDateChange = (projectId: string, field: string, event: Event) => {
    const value = (event.target as HTMLInputElement).value
    const date = value ? new Date(value) : null
    updateProjectDetail(projectId, field, date)
}
</script>

<template>
    <div class="flex flex-col h-full space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-start gap-4 flex-wrap">
            <BaseTitle 
                title="Estatus Financiero" 
                subtitle="Seguimiento financiero de proyectos por área"
            />
        </div>

        <!-- Area Selector and Export -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">Seleccionar Área</label>
                <select 
                    v-model="selectedArea" 
                    class="select select-bordered w-full max-w-xs"
                >
                    <option value="" disabled>Seleccione un área</option>
                    <option 
                        v-for="area in financialStore.areas" 
                        :key="area.id" 
                        :value="area.id"
                    >
                        {{ area.name }}
                    </option>
                </select>
            </div>
            
            <button 
                @click="exportToExcel" 
                :disabled="!selectedArea"
                class="btn btn-primary gap-2"
            >
                <span class="material-symbols-outlined">description</span>
                Exportar a Excel
            </button>
        </div>

        <!-- Empty State -->
        <div v-if="!selectedArea" class="card bg-base-100 shadow-xl">
            <div class="card-body items-center justify-center h-96">
                <p class="text-lg font-medium opacity-70">
                    Seleccione un área para ver el estatus financiero
                </p>
            </div>
        </div>

        <!-- Tabs Content -->
        <div v-else class="flex-1">
            <div role="tablist" class="tabs tabs-bordered">
                <!-- Tab 1: Resumen Global -->
                <input 
                    type="radio" 
                    name="financial_tabs" 
                    role="tab" 
                    class="tab" 
                    aria-label="Resumen Global"
                    checked 
                />
                <div role="tabpanel" class="tab-content p-6">
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body p-6">
                            <div class="overflow-x-auto">
                                <table class="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th class="min-w-[150px]">Categoría</th>
                                            <th class="text-center min-w-[120px]">No. Proyectos</th>
                                            <th class="min-w-[200px]">Etapas</th>
                                            <th class="text-right min-w-[150px]">Inversión Total</th>
                                            <th class="text-right min-w-[150px]">Monto Contratado</th>
                                            <th class="text-right min-w-[150px]">Monto Ejercido</th>
                                            <th class="text-right min-w-[150px]">Monto por Contratar</th>
                                            <th class="text-right min-w-[150px]">Monto por Ejercer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="globalSummary.length === 0">
                                            <td colspan="8" class="text-center py-8 opacity-70">
                                                No hay datos disponibles para esta área
                                            </td>
                                        </tr>
                                        <tr v-for="(row, index) in globalSummary" :key="index" class="hover">
                                            <td class="font-medium">{{ row.category }}</td>
                                            <td class="text-center">{{ row.projectCount }}</td>
                                            <td>
                                                <div class="space-y-1">
                                                    <div v-for="(stage, idx) in row.stages" :key="idx" class="text-sm">
                                                        <span class="font-medium">{{ stage.name }}:</span> {{ stage.count }}
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="text-right">{{ formatCurrency(row.totalInvestment) }}</td>
                                            <td class="text-right">{{ formatCurrency(row.contractedAmount) }}</td>
                                            <td class="text-right">{{ formatCurrency(row.exercisedAmount) }}</td>
                                            <td class="text-right">{{ formatCurrency(row.toContract) }}</td>
                                            <td class="text-right">{{ formatCurrency(row.toExercise) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tab 2: Detalle de la inversión -->
                <input 
                    type="radio" 
                    name="financial_tabs" 
                    role="tab" 
                    class="tab" 
                    aria-label="Detalle de la inversión" 
                />
                <div role="tabpanel" class="tab-content p-6">
                    <div class="space-y-4">
                        <!-- Filters -->
                        <div class="flex gap-4">
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium">Tipo de Proyecto</label>
                                <select v-model="projectTypeFilter" class="select select-bordered w-[200px]">
                                    <option value="General">General</option>
                                    <option value="Inversión">Inversión</option>
                                    <option value="Gasto">Gasto</option>
                                </select>
                            </div>
                            
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium">Etapa</label>
                                <select v-model="stageFilter" class="select select-bordered w-[200px]">
                                    <option v-for="stage in financialStore.uniqueStages" :key="stage" :value="stage">
                                        {{ stage }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body p-6">
                                <div class="overflow-x-auto">
                                    <table class="table table-zebra w-full">
                                        <thead>
                                            <tr>
                                                <th class="min-w-[100px]">Oficio</th>
                                                <th class="min-w-[120px]">ID Proyecto</th>
                                                <th class="min-w-[200px]">Nombre</th>
                                                <th class="min-w-[100px]">Tipo</th>
                                                <th class="min-w-[150px]">Clasificación</th>
                                                <th class="min-w-[150px]">Fecha Recepción</th>
                                                <th class="min-w-[120px]">Etapa</th>
                                                <th class="min-w-[120px]">Estatus</th>
                                                <th class="min-w-[150px]">Fecha Estatus</th>
                                                <th class="text-right min-w-[180px]">Importe Est. Por Adjudicar</th>
                                                <th class="text-right min-w-[160px]">Importe Adjudicado</th>
                                                <th class="min-w-[150px]">Fecha Fallo Adjudicado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="financialStore.activeProjects.length === 0">
                                                <td colspan="12" class="text-center py-8 opacity-70">
                                                    No hay proyectos activos
                                                </td>
                                            </tr>
                                            <tr v-for="project in financialStore.activeProjects" :key="project.projectId" class="hover">
                                                <td>{{ project.oficio }}</td>
                                                <td>{{ project.projectId }}</td>
                                                <td class="font-medium">{{ project.name }}</td>
                                                <td>{{ project.type }}</td>
                                                <td>{{ project.classification }}</td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        :value="project.receptionDate ? project.receptionDate.toISOString().split('T')[0] : ''"
                                                        @change="(e) => handleDateChange(project.projectId, 'receptionDate', e)"
                                                        class="input input-sm input-bordered w-full"
                                                    />
                                                </td>
                                                <td>{{ project.stage }}</td>
                                                <td>{{ project.status }}</td>
                                                <td>{{ formatDate(project.statusDate) }}</td>
                                                <td class="text-right">{{ formatCurrency(project.estimatedAmountToAward) }}</td>
                                                <td class="text-right">{{ formatCurrency(project.awardedAmount) }}</td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        :value="project.awardNoticeDate ? project.awardNoticeDate.toISOString().split('T')[0] : ''"
                                                        @change="(e) => handleDateChange(project.projectId, 'awardNoticeDate', e)"
                                                        class="input input-sm input-bordered w-full"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tab 3: Histórico -->
                <input 
                    type="radio" 
                    name="financial_tabs" 
                    role="tab" 
                    class="tab" 
                    aria-label="Histórico" 
                />
                <div role="tabpanel" class="tab-content p-6">
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body p-6">
                            <div class="alert alert-info mb-4">
                                <span class="material-symbols-outlined">info</span>
                                <p class="text-sm">
                                    Esta vista muestra únicamente proyectos completados y es de solo lectura.
                                </p>
                            </div>
                            
                            <div class="overflow-x-auto">
                                <table class="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th class="min-w-[100px]">Oficio</th>
                                            <th class="min-w-[120px]">ID Proyecto</th>
                                            <th class="min-w-[200px]">Nombre</th>
                                            <th class="min-w-[100px]">Tipo</th>
                                            <th class="min-w-[150px]">Clasificación</th>
                                            <th class="min-w-[150px]">Fecha Recepción</th>
                                            <th class="min-w-[120px]">Etapa</th>
                                            <th class="min-w-[120px]">Estatus</th>
                                            <th class="min-w-[150px]">Fecha Estatus</th>
                                            <th class="text-right min-w-[180px]">Importe Est. Por Adjudicar</th>
                                            <th class="text-right min-w-[160px]">Importe Adjudicado</th>
                                            <th class="min-w-[150px]">Fecha Fallo Adjudicado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="financialStore.completedProjects.length === 0">
                                            <td colspan="12" class="text-center py-8 opacity-70">
                                                No hay proyectos completados
                                            </td>
                                        </tr>
                                        <tr v-for="project in financialStore.completedProjects" :key="project.projectId" class="opacity-75">
                                            <td>{{ project.oficio }}</td>
                                            <td>{{ project.projectId }}</td>
                                            <td class="font-medium">{{ project.name }}</td>
                                            <td>{{ project.type }}</td>
                                            <td>{{ project.classification }}</td>
                                            <td>{{ formatDate(project.receptionDate) }}</td>
                                            <td>{{ project.stage }}</td>
                                            <td>{{ project.status }}</td>
                                            <td>{{ formatDate(project.statusDate) }}</td>
                                            <td class="text-right">{{ formatCurrency(project.estimatedAmountToAward) }}</td>
                                            <td class="text-right">{{ formatCurrency(project.awardedAmount) }}</td>
                                            <td>{{ formatDate(project.awardNoticeDate) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
