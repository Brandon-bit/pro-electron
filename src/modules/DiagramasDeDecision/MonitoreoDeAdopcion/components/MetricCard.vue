<script setup lang="ts">
import type { MetricType } from '@/modules/DiagramasDeDecision/MonitoreoDeAdopcion/types/adoptionTypes'

const props = defineProps<{
    metric: MetricType
}>()

const getTrendIcon = (type?: string) => {
    switch (type) {
        case 'positive': return 'trending_up'
        case 'negative': return 'trending_down'
        case 'neutral': return 'warning'
        default: return 'check_circle'
    }
}

const getTrendColor = (type?: string) => {
    switch (type) {
        case 'positive': return 'text-success'
        case 'negative': return 'text-error'
        case 'neutral': return 'text-warning'
        default: return 'text-success'
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <!-- Title -->
            <p class="text-sm opacity-70">{{ metric.title }}</p>
            
            <!-- Value -->
            <h3 class="text-3xl font-bold">{{ metric.value }}</h3>

            <!-- Progress Bar -->
            <progress 
                v-if="metric.progress"
                class="progress progress-primary w-full mt-2" 
                :value="metric.progress" 
                max="100"
            ></progress>

            <!-- Trend or Description -->
            <div v-if="metric.trend || metric.description" class="flex items-center text-sm mt-2" :class="getTrendColor(metric.trendType)">
                <span class="material-symbols-outlined text-sm mr-1">
                    {{ getTrendIcon(metric.trendType) }}
                </span>
                <span>{{ metric.trend || metric.description }}</span>
            </div>
        </div>
    </div>
</template>
