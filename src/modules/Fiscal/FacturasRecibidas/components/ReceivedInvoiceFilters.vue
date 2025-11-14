<script setup lang="ts">
import { ref } from 'vue'
import type { ReceivedInvoiceFilterType } from '@/modules/Fiscal/FacturasRecibidas/types/receivedInvoiceTypes'

const emit = defineEmits<{
    (e: 'filter', filters: ReceivedInvoiceFilterType): void
    (e: 'export'): void
}>()

const search = ref('')
const dateFrom = ref('')
const dateTo = ref('')

const handleFilter = () => {
    emit('filter', {
        search: search.value,
        dateFrom: dateFrom.value,
        dateTo: dateTo.value
    })
}

const handleExport = () => {
    emit('export')
}
</script>

<template>
    <div class="card bg-base-100 shadow">
        <div class="card-body p-4">
            <div class="flex items-center justify-between mb-4">
                <h3 class="card-title text-base">Búsqueda y Filtros</h3>
                <div class="flex gap-2">
                    <button 
                        class="btn btn-outline btn-sm"
                        @click="handleExport"
                    >
                        <span class="material-symbols-outlined text-base">download</span>
                        Exportar
                    </button>
                    <button 
                        class="btn btn-outline btn-sm"
                        @click="handleFilter"
                    >
                        <span class="material-symbols-outlined text-base">filter_alt</span>
                        Filtros
                    </button>
                </div>
            </div>
            
            <div class="flex gap-2 flex-wrap">
                <div class="flex-1 min-w-[250px] relative">
                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">
                        search
                    </span>
                    <input 
                        v-model="search"
                        type="text"
                        placeholder="Buscar por folio, proveedor o UUID..."
                        class="input input-bordered w-full pl-10"
                        @keyup.enter="handleFilter"
                    />
                </div>
                <input 
                    v-model="dateFrom"
                    type="date"
                    placeholder="Fecha inicio"
                    class="input input-bordered w-40"
                />
                <input 
                    v-model="dateTo"
                    type="date"
                    placeholder="Fecha fin"
                    class="input input-bordered w-40"
                />
            </div>
        </div>
    </div>
</template>
