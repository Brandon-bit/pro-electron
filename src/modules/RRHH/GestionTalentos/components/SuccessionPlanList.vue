<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTalentActions } from '@/modules/RRHH/GestionTalentos/composables/useTalentActions'
import type { SuccessionPlan } from '@/modules/RRHH/GestionTalentos/types/talentTypes'

const { getSuccessionPlans } = useTalentActions()

const loading = ref(true)
const successionPlans = ref<SuccessionPlan[]>([])

const loadData = async () => {
    loading.value = true
    try {
        successionPlans.value = await getSuccessionPlans()
    } catch (error) {
        console.error('Error loading succession plans:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadData()
})

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="card-title flex items-center gap-2">
                        <span class="material-symbols-outlined">account_tree</span>
                        Planificador de Sucesión
                    </h2>
                    <p class="text-sm text-base-content/60">
                        Identifica sucesores para roles críticos
                    </p>
                </div>
            </div>

            <div v-if="loading" class="flex justify-center items-center h-64">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else class="space-y-6">
                <div
                    v-for="plan in successionPlans"
                    :key="plan.id"
                    class="succession-card"
                >
                    <div class="card-body">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-semibold text-lg">{{ plan.role }}</h3>
                                <p class="text-sm text-base-content/60">
                                    Titular: {{ plan.currentHolder }}
                                </p>
                            </div>
                            <div v-if="plan.isCritical" class="badge badge-primary gap-2">
                                <span class="material-symbols-outlined text-sm">priority_high</span>
                                Rol Crítico
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Listos Ahora -->
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium text-base-content/70"
                                        >Listos Ahora</span
                                    >
                                    <div class="badge badge-success gap-1">
                                        {{ plan.readyNow.length }}
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <div
                                        v-for="successor in plan.readyNow"
                                        :key="successor.id"
                                        class="p-3 border border-success/30 rounded-lg bg-success/5 hover:bg-success/10 transition-colors"
                                    >
                                        <div class="flex items-center gap-2 mb-1">
                                            <div class="avatar placeholder">
                                                <div
                                                    class="bg-success text-success-content rounded-full w-8 h-8 text-xs"
                                                >
                                                    <span>{{ getInitials(successor.name) }}</span>
                                                </div>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-semibold">
                                                    {{ successor.name }}
                                                </p>
                                                <p class="text-xs text-base-content/60">
                                                    {{ successor.position }}
                                                </p>
                                            </div>
                                            <div
                                                v-if="successor.isHighPotential"
                                                class="tooltip"
                                                data-tip="High Potential"
                                            >
                                                <span
                                                    class="material-symbols-outlined text-warning text-base"
                                                >
                                                    star
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-2 text-xs">
                                            <span class="text-base-content/60">Score:</span>
                                            <span class="font-semibold text-success">{{
                                                successor.score
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- En Desarrollo (1-2 años) -->
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium text-base-content/70"
                                        >En 1-2 Años</span
                                    >
                                    <div class="badge badge-warning gap-1">
                                        {{ plan.inDevelopment.length }}
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <div
                                        v-for="successor in plan.inDevelopment"
                                        :key="successor.id"
                                        class="p-3 border border-warning/30 rounded-lg bg-warning/5 hover:bg-warning/10 transition-colors"
                                    >
                                        <div class="flex items-center gap-2 mb-1">
                                            <div class="avatar placeholder">
                                                <div
                                                    class="bg-warning text-warning-content rounded-full w-8 h-8 text-xs"
                                                >
                                                    <span>{{ getInitials(successor.name) }}</span>
                                                </div>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-semibold">
                                                    {{ successor.name }}
                                                </p>
                                                <p class="text-xs text-base-content/60">
                                                    {{ successor.position }}
                                                </p>
                                            </div>
                                            <div
                                                v-if="successor.isHighPotential"
                                                class="tooltip"
                                                data-tip="High Potential"
                                            >
                                                <span
                                                    class="material-symbols-outlined text-warning text-base"
                                                >
                                                    star
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-2 text-xs">
                                            <span class="text-base-content/60">Score:</span>
                                            <span class="font-semibold">{{ successor.score }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-if="!loading && successionPlans.length === 0"
                    class="text-center py-8"
                >
                    <p class="text-base-content/60">No hay planes de sucesión disponibles</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.succession-card {
    position: relative;
    background: hsl(var(--b1));
    border-radius: 0.75rem;
    border: 1px solid hsl(var(--bc) / 0.12);
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04);
}

.succession-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.12);
    border-color: hsl(var(--bc) / 0.2);
}

.succession-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, hsl(var(--p)), hsl(var(--s)));
    border-radius: 0.75rem 0 0 0.75rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.succession-card:hover::before {
    opacity: 1;
}
</style>
