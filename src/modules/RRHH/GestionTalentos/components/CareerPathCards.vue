<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { useTalentActions } from '@/modules/RRHH/GestionTalentos/composables/useTalentActions'
import type { CareerPath } from '@/modules/RRHH/GestionTalentos/types/talentTypes'

const { getCareerPaths } = useTalentActions()

const loading = ref(true)
const careerPaths = ref<CareerPath[]>([])

const loadData = async () => {
    loading.value = true
    try {
        careerPaths.value = await getCareerPaths()
    } catch (error) {
        console.error('Error loading career paths:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadData()
})

const getMoveIcon = (type: 'vertical' | 'lateral') => {
    return type === 'vertical' ? 'trending_up' : 'trending_flat'
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="card-title flex items-center gap-2">
                        <span class="material-symbols-outlined">route</span>
                        Mapas de Carrera (Career Pathing)
                    </h2>
                    <p class="text-sm text-base-content/60">
                        Visualiza rutas de crecimiento y brechas de habilidades
                    </p>
                </div>
            </div>

            <div v-if="loading" class="flex justify-center items-center h-64">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else class="space-y-6">
                <div v-for="path in careerPaths" :key="path.id">
                    <!-- Rol Actual -->
                    <div class="alert alert-info mb-4">
                        <span class="material-symbols-outlined">badge</span>
                        <div>
                            <p class="font-medium">Tu Rol Actual</p>
                            <p class="text-sm">
                                {{ path.currentRole }} - {{ path.currentDepartment }}
                            </p>
                        </div>
                    </div>

                    <!-- Posibles Siguientes Pasos -->
                    <h3 class="font-semibold mb-4">Posibles Siguientes Pasos:</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div
                            v-for="nextRole in path.nextRoles"
                            :key="nextRole.id"
                            class="career-card"
                        >
                            <div class="card-body">
                                <!-- Header con icono y nombre -->
                                <div class="flex items-center gap-3 mb-3">
                                    <div
                                        :class="[
                                            'w-12 h-12 rounded-lg flex items-center justify-center',
                                            nextRole.type === 'vertical'
                                                ? 'bg-primary/10'
                                                : 'bg-secondary/10'
                                        ]"
                                    >
                                        <span
                                            :class="[
                                                'material-symbols-outlined text-2xl',
                                                nextRole.type === 'vertical'
                                                    ? 'text-primary'
                                                    : 'text-secondary'
                                            ]"
                                        >
                                            {{ getMoveIcon(nextRole.type) }}
                                        </span>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-semibold">{{ nextRole.name }}</h4>
                                        <div
                                            :class="[
                                                'badge badge-sm',
                                                nextRole.type === 'vertical'
                                                    ? 'badge-primary'
                                                    : 'badge-secondary'
                                            ]"
                                        >
                                            {{
                                                nextRole.type === 'vertical'
                                                    ? 'Promoción'
                                                    : 'Movimiento Lateral'
                                            }}
                                        </div>
                                    </div>
                                </div>

                                <!-- Tiempo estimado -->
                                <div class="flex items-center gap-2 text-sm text-base-content/60 mb-3">
                                    <span class="material-symbols-outlined text-base">schedule</span>
                                    <span>{{ nextRole.estimatedTime }}</span>
                                </div>

                                <!-- Brechas de Habilidades -->
                                <div class="space-y-2">
                                    <p class="text-xs font-medium text-base-content/70">
                                        Brechas de Habilidades:
                                    </p>
                                    <div class="flex flex-wrap gap-1">
                                        <div
                                            v-for="(skill, index) in nextRole.skillGaps"
                                            :key="index"
                                            class="badge badge-outline badge-sm"
                                        >
                                            {{ skill }}
                                        </div>
                                    </div>
                                </div>

                                <!-- Botón -->
                                <div class="mt-4">
                                    <BaseButton
                                        text="Ver Plan de Desarrollo"
                                        icon="visibility"
                                        variant="outline"
                                        size="sm"
                                        class="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-if="!loading && careerPaths.length === 0"
                    class="text-center py-8"
                >
                    <p class="text-base-content/60">No hay mapas de carrera disponibles</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.career-card {
    position: relative;
    background: hsl(var(--b1));
    border-radius: 0.75rem;
    border: 1px solid hsl(var(--bc) / 0.12);
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04);
    cursor: pointer;
}

.career-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.12);
    border-color: hsl(var(--bc) / 0.2);
}

.career-card::before {
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

.career-card:hover::before {
    opacity: 1;
}
</style>
