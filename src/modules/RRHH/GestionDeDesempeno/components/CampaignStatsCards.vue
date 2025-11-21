<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCampaignActions } from '@/modules/RRHH/GestionDeDesempeno/composables/useCampaignActions'

const { getCampaigns } = useCampaignActions()

const activeCampaigns = ref<any[]>([])
const selectedCampaign = ref<number | null>(null)

const loadActiveCampaigns = async () => {
    try {
        const result = await getCampaigns(1, 10)
        activeCampaigns.value = result.items.filter((c: any) => c.active)
        if (activeCampaigns.value.length > 0) {
            selectedCampaign.value = activeCampaigns.value[0].id
        }
    } catch (error) {
        console.error('Error loading campaigns:', error)
    }
}

const handleDownloadReport = () => {
    console.log('Descargando reporte de campaña:', selectedCampaign.value)
    // Implementar descarga de reporte
}

onMounted(() => {
    loadActiveCampaigns()
})
</script>

<template>
    <div class="card shadow-base bg-base-100">
        <div class="card-body">
            <!-- Header -->
            <h2 class="card-title flex items-center gap-2">
                <span class="material-symbols-outlined">bar_chart</span>
                Dashboard de Resultados
            </h2>
            <p class="text-base-content/60 mb-6">
                Análisis individual y por equipo de evaluaciones completadas
            </p>

            <!-- Sección 1: Selector de campañas y botón de descarga -->
            <div class="flex flex-col md:flex-row gap-4 mb-6">
                <div class="flex-1">
                    <label class="label">
                        <span class="label-text font-semibold">Seleccionar Campaña Activa</span>
                    </label>
                    <select
                        v-model="selectedCampaign"
                        class="select select-bordered w-full"
                    >
                        <option
                            v-for="campaign in activeCampaigns"
                            :key="campaign.id"
                            :value="campaign.id"
                        >
                            {{ campaign.name }}
                        </option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button
                        class="btn btn-primary gap-2"
                        @click="handleDownloadReport"
                    >
                        <span class="material-symbols-outlined">download</span>
                        Descargar Reporte
                    </button>
                </div>
            </div>

            <!-- Sección 2: Cards de métricas -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="stat-card group">
                    <div class="stat-icon-wrapper bg-primary/10">
                        <span class="material-symbols-outlined text-primary text-2xl">analytics</span>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-label">Promedio General</h3>
                        <div class="stat-value text-primary">4.2</div>
                        <p class="stat-description">De 5.0</p>
                    </div>
                    <div class="stat-decoration bg-primary/5"></div>
                </div>
                <div class="stat-card group">
                    <div class="stat-icon-wrapper bg-secondary/10">
                        <span class="material-symbols-outlined text-secondary text-2xl">emoji_events</span>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-label">Top Performers</h3>
                        <div class="stat-value text-secondary">124</div>
                        <p class="stat-description">Score > 4.5</p>
                    </div>
                    <div class="stat-decoration bg-secondary/5"></div>
                </div>
                <div class="stat-card group">
                    <div class="stat-icon-wrapper bg-success/10">
                        <span class="material-symbols-outlined text-success text-2xl">trending_up</span>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-label">Mejora vs Año Anterior</h3>
                        <div class="stat-value text-success">+12%</div>
                        <p class="stat-description">Tendencia positiva</p>
                    </div>
                    <div class="stat-decoration bg-success/5"></div>
                </div>
            </div>

            <!-- Sección 3: Gráfico de resultados interactivos -->
            <div class="flex items-center justify-center h-64 border border-dashed border-base-300 rounded-lg">
                <div class="text-center space-y-3">
                    <span class="material-symbols-outlined text-6xl text-base-content/40">bar_chart</span>
                    <p class="text-base-content/60">Gráficos de resultados interactivos</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.stat-card {
    position: relative;
    overflow: hidden;
    background: hsl(var(--b1));
    border-radius: 1rem;
    border: 1px solid hsl(var(--bc) / 0.1);
    box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    transition: all 0.3s ease-in-out;
    padding: 1.5rem;
    cursor: pointer;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow:
        0 20px 25px -5px rgb(0 0 0 / 0.1),
        0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-color: hsl(var(--p) / 0.3);
}

.stat-icon-wrapper {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon-wrapper {
    transform: scale(1.1);
}

.stat-content {
    position: relative;
    z-index: 10;
}

.stat-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(var(--bc) / 0.6);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    transition: transform 0.3s ease;
}

.stat-card:hover .stat-value {
    transform: scale(1.05);
}

.stat-description {
    font-size: 0.75rem;
    color: hsl(var(--bc) / 0.5);
    font-weight: 500;
}

.stat-decoration {
    position: absolute;
    bottom: -1rem;
    right: -1rem;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    opacity: 0.2;
    transition: all 0.5s ease;
}

.stat-card:hover .stat-decoration {
    transform: scale(1.5);
    opacity: 0.3;
}

.stat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, hsl(var(--b2) / 0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.stat-card:hover::before {
    opacity: 1;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.stat-card {
    animation: slideInUp 0.5s ease-out;
}
</style>
