<script setup lang="ts">
import type { PDI } from '@/modules/RRHH/GestionTalentos/types/talentTypes'

const props = defineProps<{
    pdi: PDI
}>()

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'success'
    if (progress >= 50) return 'primary'
    if (progress >= 25) return 'warning'
    return 'error'
}
</script>

<template>
    <div class="pdi-card">
        <div class="card-body">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="avatar placeholder">
                        <div class="bg-primary text-primary-content rounded-full w-12 h-12">
                            <span class="text-sm">{{ getInitials(pdi.employeeName) }}</span>
                        </div>
                    </div>
                    <div>
                        <p class="font-semibold">{{ pdi.employeeName }}</p>
                        <p class="text-sm text-base-content/60">
                            {{ pdi.employeePosition }}
                        </p>
                    </div>
                </div>
                <div class="badge badge-lg" :class="`badge-${getProgressColor(pdi.progress)}`">
                    {{ pdi.progress }}% completado
                </div>
            </div>

            <!-- Información en fila -->
            <div class="flex flex-wrap gap-6 mb-4">
                <!-- Brecha -->
                <div class="space-y-1 min-w-fit">
                    <p class="text-xs text-base-content/60 font-semibold">Brecha Identificada:</p>
                    <p class="font-medium">{{ pdi.competency }}</p>
                </div>

                <!-- Acción -->
                <div class="space-y-1 min-w-fit flex-1">
                    <p class="text-xs text-base-content/60 font-semibold">Acción de Desarrollo:</p>
                    <p class="text-sm">{{ pdi.action }}</p>
                </div>

                <!-- Fechas -->
                <div class="space-y-1 min-w-fit">
                    <p class="text-xs text-base-content/60 font-semibold">Periodo:</p>
                    <div class="flex items-center gap-3 text-xs">
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-sm">event</span>
                            <span>{{ pdi.startDate }}</span>
                        </div>
                        <span class="text-base-content/40">→</span>
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-sm">event</span>
                            <span>{{ pdi.endDate }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="space-y-1">
                <div class="flex justify-between text-xs">
                    <span class="text-base-content/60">Progreso</span>
                    <span class="font-semibold">{{ pdi.progress }}%</span>
                </div>
                <div class="h-2 bg-base-200 rounded-full overflow-hidden">
                    <div
                        :class="[
                            'h-full transition-all duration-300',
                            `bg-${getProgressColor(pdi.progress)}`
                        ]"
                        :style="{ width: `${pdi.progress}%` }"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pdi-card {
    position: relative;
    background: hsl(var(--b1));
    border-radius: 0.75rem;
    border: 1px solid hsl(var(--bc) / 0.12);
    padding: 1.25rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04);
}

.pdi-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.12);
    border-color: hsl(var(--bc) / 0.2);
}

.pdi-card::before {
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

.pdi-card:hover::before {
    opacity: 1;
}
</style>
