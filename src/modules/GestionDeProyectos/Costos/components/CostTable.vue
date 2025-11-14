<script setup lang="ts">
import type { CostItemType, CostCategoryType } from '@/modules/GestionDeProyectos/Costos/types/costTypes'
import { useCostActions } from '@/modules/GestionDeProyectos/Costos/composables/useCostActions'

const props = defineProps<{
    items: CostItemType[]
    category: CostCategoryType
    editable?: boolean
}>()

const { updateCostItem, deleteOtherCost } = useCostActions()

const handleUpdate = (id: string, field: keyof CostItemType, value: any) => {
    updateCostItem(props.category, id, field, value)
}

const handleDelete = (id: string) => {
    deleteOtherCost(id)
}
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
            <thead>
                <tr>
                    <th class="w-[200px]">Concepto</th>
                    <th class="w-[200px]">Descripción</th>
                    <th class="w-[150px]">Gasto Planificado</th>
                    <th class="w-[150px]">Fecha Planificada</th>
                    <th class="w-[150px]">Gasto Real</th>
                    <th class="w-[150px]">Fecha Real</th>
                    <th class="w-[150px]">Gastos Extraordinarios</th>
                    <th v-if="category === 'otherCosts'" class="w-[80px]">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="items.length === 0">
                    <td 
                        :colspan="category === 'otherCosts' ? 8 : 7" 
                        class="text-center py-8 opacity-70"
                    >
                        No hay costos registrados
                    </td>
                </tr>
                <tr v-for="item in items" :key="item.id" class="hover">
                    <td>
                        <input
                            v-if="editable && category === 'otherCosts'"
                            type="text"
                            :value="item.concept"
                            @input="(e) => handleUpdate(item.id, 'concept', (e.target as HTMLInputElement).value)"
                            class="input input-sm input-bordered w-full"
                        />
                        <span v-else class="font-medium">{{ item.concept }}</span>
                    </td>
                    <td>
                        <input
                            type="text"
                            :value="item.description"
                            @input="(e) => handleUpdate(item.id, 'description', (e.target as HTMLInputElement).value)"
                            class="input input-sm input-bordered w-full"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            :value="item.plannedCost || ''"
                            @input="(e) => handleUpdate(item.id, 'plannedCost', parseFloat((e.target as HTMLInputElement).value) || 0)"
                            class="input input-sm input-bordered w-full"
                            placeholder="$0.00"
                        />
                    </td>
                    <td>
                        <input
                            type="date"
                            :value="item.plannedDate"
                            @input="(e) => handleUpdate(item.id, 'plannedDate', (e.target as HTMLInputElement).value)"
                            class="input input-sm input-bordered w-full"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            :value="item.actualCost || ''"
                            @input="(e) => handleUpdate(item.id, 'actualCost', parseFloat((e.target as HTMLInputElement).value) || 0)"
                            class="input input-sm input-bordered w-full"
                            placeholder="$0.00"
                        />
                    </td>
                    <td>
                        <input
                            type="date"
                            :value="item.actualDate"
                            @input="(e) => handleUpdate(item.id, 'actualDate', (e.target as HTMLInputElement).value)"
                            class="input input-sm input-bordered w-full"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            :value="item.extraordinaryCost || ''"
                            @input="(e) => handleUpdate(item.id, 'extraordinaryCost', parseFloat((e.target as HTMLInputElement).value) || 0)"
                            class="input input-sm input-bordered w-full"
                            placeholder="$0.00"
                        />
                    </td>
                    <td v-if="category === 'otherCosts'">
                        <button
                            @click="handleDelete(item.id)"
                            class="btn btn-ghost btn-sm"
                        >
                            <span class="material-symbols-outlined text-error">delete</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
