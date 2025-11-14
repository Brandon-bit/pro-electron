<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SOWType } from '@/modules/GestionDeProyectos/SOWDelProyecto/types/sowTypes'
import useSOWStore from '@/modules/GestionDeProyectos/SOWDelProyecto/store/sowStore'
import { useSOWActions } from '@/modules/GestionDeProyectos/SOWDelProyecto/composables/useSOWActions'
import { showNotification } from '@/utils/toastNotifications'

const sowStore = useSOWStore()
const { getSOWs, exportSOW } = useSOWActions()

const isLoading = ref(false)
const sows = ref<SOWType[]>([])

const statusColors = {
    draft: 'badge-ghost',
    review: 'badge-info',
    approved: 'badge-success',
    rejected: 'badge-error'
}

const statusLabels = {
    draft: 'Borrador',
    review: 'En Revisión',
    approved: 'Aprobado',
    rejected: 'Rechazado'
}

const loadSOWs = async () => {
    isLoading.value = true
    try {
        const result = await getSOWs(1, 100)
        sows.value = result.items
        sowStore.setSOWs(result.items)
    } catch (error: any) {
        showNotification(error.message || 'Error al cargar los SOWs', 'error')
    } finally {
        isLoading.value = false
    }
}

const handleEdit = (sow: SOWType) => {
    sowStore.setData(sow)
    sowStore.setCurrentTab('editor')
    showNotification('SOW cargado para edición', 'info')
}

const handleView = (sow: SOWType) => {
    sowStore.setData(sow)
    showNotification('Visualizando SOW', 'info')
}

const handleExport = async (sow: SOWType) => {
    if (!sow.id) return
    
    try {
        const blob = await exportSOW(sow.id)
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `SOW_${sow.projectCode}_v${sow.version}.pdf`
        link.click()
        window.URL.revokeObjectURL(url)
        showNotification('SOW exportado exitosamente', 'success')
    } catch (error: any) {
        showNotification(error.message || 'Error al exportar el SOW', 'error')
    }
}

const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('es-ES')
}

onMounted(() => {
    loadSOWs()
})
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex items-center justify-between mb-4">
                <h2 class="card-title flex items-center gap-2">
                    <span class="material-symbols-outlined">library_books</span>
                    Biblioteca de SOWs
                </h2>
                
                <button
                    class="btn btn-primary btn-sm"
                    @click="loadSOWs"
                    :disabled="isLoading"
                >
                    <span v-if="isLoading" class="loading loading-spinner loading-xs"></span>
                    <span v-else class="material-symbols-outlined text-sm">refresh</span>
                    Actualizar
                </button>
            </div>

            <!-- Estado de carga -->
            <div v-if="isLoading" class="flex justify-center py-12">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <!-- Estado vacío -->
            <div v-else-if="sows.length === 0" class="flex flex-col items-center justify-center py-12">
                <span class="material-symbols-outlined text-6xl opacity-30 mb-4">description</span>
                <p class="text-center opacity-70">
                    No hay SOWs registrados. Crea uno nuevo en la pestaña "Editor SOW".
                </p>
            </div>

            <!-- Lista de SOWs -->
            <div v-else class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Proyecto</th>
                            <th>Cliente</th>
                            <th>Versión</th>
                            <th>Estado</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Creado Por</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sow in sows" :key="sow.id" class="hover">
                            <td class="font-mono text-sm">{{ sow.projectCode }}</td>
                            <td class="font-medium">{{ sow.projectName }}</td>
                            <td>{{ sow.client }}</td>
                            <td>
                                <span class="badge badge-outline badge-sm">v{{ sow.version }}</span>
                            </td>
                            <td>
                                <span :class="['badge badge-sm', statusColors[sow.status]]">
                                    {{ statusLabels[sow.status] }}
                                </span>
                            </td>
                            <td class="text-sm">{{ formatDate(sow.startDate) }}</td>
                            <td class="text-sm">{{ formatDate(sow.endDate) }}</td>
                            <td class="text-sm">{{ sow.createdBy }}</td>
                            <td>
                                <div class="flex gap-2">
                                    <button
                                        class="btn btn-ghost btn-xs"
                                        @click="handleView(sow)"
                                        title="Ver"
                                    >
                                        <span class="material-symbols-outlined text-sm">visibility</span>
                                    </button>
                                    <button
                                        class="btn btn-ghost btn-xs"
                                        @click="handleEdit(sow)"
                                        title="Editar"
                                    >
                                        <span class="material-symbols-outlined text-sm">edit</span>
                                    </button>
                                    <button
                                        class="btn btn-ghost btn-xs"
                                        @click="handleExport(sow)"
                                        title="Exportar"
                                    >
                                        <span class="material-symbols-outlined text-sm">download</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Resumen -->
            <div v-if="sows.length > 0" class="mt-4 p-4 bg-base-200 rounded-lg">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p class="text-2xl font-bold">{{ sows.length }}</p>
                        <p class="text-sm opacity-70">Total SOWs</p>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-info">
                            {{ sows.filter(s => s.status === 'draft').length }}
                        </p>
                        <p class="text-sm opacity-70">Borradores</p>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-warning">
                            {{ sows.filter(s => s.status === 'review').length }}
                        </p>
                        <p class="text-sm opacity-70">En Revisión</p>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-success">
                            {{ sows.filter(s => s.status === 'approved').length }}
                        </p>
                        <p class="text-sm opacity-70">Aprobados</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
