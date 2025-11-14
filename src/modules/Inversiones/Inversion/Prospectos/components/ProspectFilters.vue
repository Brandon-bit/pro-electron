<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import type { ProspectFilterType } from '@/modules/Inversiones/Inversion/Prospectos/types/prospectTypes'

const emit = defineEmits<{
    filter: [filters: ProspectFilterType]
    export: []
}>()

const search = ref('')
const status = ref('')
const sector = ref('')
const showAdvancedFilters = ref(false)

const statusOptions = [
    { value: '', label: 'Todos los estatus' },
    { value: 'Nuevo', label: 'Nuevo' },
    { value: 'Contactado', label: 'Contactado' },
    { value: 'Calificado', label: 'Calificado' },
    { value: 'Propuesta', label: 'Propuesta' },
    { value: 'Negociación', label: 'Negociación' },
    { value: 'Ganado', label: 'Ganado' },
    { value: 'Perdido', label: 'Perdido' }
]

const sectorOptions = [
    { value: '', label: 'Todos los sectores' },
    { value: 'Tecnología', label: 'Tecnología' },
    { value: 'Finanzas', label: 'Finanzas' },
    { value: 'Salud', label: 'Salud' },
    { value: 'Educación', label: 'Educación' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Manufactura', label: 'Manufactura' },
    { value: 'Servicios', label: 'Servicios' },
    { value: 'Otro', label: 'Otro' }
]

const applyFilters = () => {
    const filters: ProspectFilterType = {
        search: search.value || undefined,
        status: status.value || undefined,
        sector: sector.value || undefined
    }
    emit('filter', filters)
}

const clearFilters = () => {
    search.value = ''
    status.value = ''
    sector.value = ''
    emit('filter', {})
}

const handleExport = () => {
    emit('export')
}
</script>

<template>
    <div class="card bg-base-100 shadow">
        <div class="card-body p-4">
            <div class="flex flex-col gap-4">
                <!-- Search Bar -->
                <div class="flex flex-col md:flex-row gap-2">
                    <div class="flex-1">
                        <div class="input-group">
                            <span class="bg-base-200">
                                <span class="material-symbols-outlined">search</span>
                            </span>
                            <input 
                                v-model="search"
                                type="text" 
                                placeholder="Buscar por nombre, email, empresa..." 
                                class="input input-bordered w-full"
                                @keyup.enter="applyFilters"
                            />
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <BaseButton 
                            text="Exportar" 
                            icon="download"
                            variant="outline"
                            @click="handleExport"
                        />
                        <BaseButton 
                            :text="showAdvancedFilters ? 'Ocultar Filtros' : 'Filtros'"
                            icon="filter_alt"
                            variant="outline"
                            @click="showAdvancedFilters = !showAdvancedFilters"
                        />
                    </div>
                </div>

                <!-- Advanced Filters -->
                <div v-if="showAdvancedFilters" class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                        <label class="label">
                            <span class="label-text">Estatus</span>
                        </label>
                        <select v-model="status" class="select select-bordered w-full">
                            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="label">
                            <span class="label-text">Sector</span>
                        </label>
                        <select v-model="sector" class="select select-bordered w-full">
                            <option v-for="option in sectorOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <div class="md:col-span-2 flex gap-2 justify-end">
                        <BaseButton 
                            text="Limpiar" 
                            variant="ghost"
                            @click="clearFilters"
                        />
                        <BaseButton 
                            text="Aplicar Filtros" 
                            icon="check"
                            @click="applyFilters"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
