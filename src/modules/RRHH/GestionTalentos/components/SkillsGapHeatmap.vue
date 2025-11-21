<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTalentActions } from '@/modules/RRHH/GestionTalentos/composables/useTalentActions'
import type { SkillGap } from '@/modules/RRHH/GestionTalentos/types/talentTypes'

const { getSkillGaps } = useTalentActions()

const loading = ref(true)
const skillGaps = ref<SkillGap[]>([])

const loadData = async () => {
    loading.value = true
    try {
        skillGaps.value = await getSkillGaps()
    } catch (error) {
        console.error('Error loading skill gaps:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadData()
})

const getSkillColor = (level: string) => {
    const colors = {
        excellent: 'success',
        good: 'primary',
        warning: 'warning',
        critical: 'error'
    }
    return colors[level as keyof typeof colors] || 'base-300'
}

const getSkillBgClass = (level: string) => {
    const classes = {
        excellent: 'bg-success/10 border-success/30',
        good: 'bg-primary/10 border-primary/30',
        warning: 'bg-warning/10 border-warning/30',
        critical: 'bg-error/10 border-error/30'
    }
    return classes[level as keyof typeof classes] || 'bg-base-200 border-base-300'
}

const getSkillTextClass = (level: string) => {
    const classes = {
        excellent: 'text-success',
        good: 'text-primary',
        warning: 'text-warning',
        critical: 'text-error'
    }
    return classes[level as keyof typeof classes] || 'text-base-content'
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="card-title flex items-center gap-2">
                        <span class="material-symbols-outlined">warning</span>
                        Mapa de Calor: Brechas de Habilidades
                    </h2>
                    <p class="text-sm text-base-content/60">
                        Habilidades más fuertes y más débiles a nivel organización
                    </p>
                </div>
            </div>

            <div v-if="loading" class="flex justify-center items-center h-64">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                        v-for="skill in skillGaps"
                        :key="skill.id"
                        :class="[
                            'card border transition-all hover:scale-105',
                            getSkillBgClass(skill.level)
                        ]"
                    >
                        <div class="card-body p-4">
                            <h3 class="text-sm font-semibold mb-2">{{ skill.skill }}</h3>
                            <div class="flex items-baseline gap-1 mb-2">
                                <span :class="['text-3xl font-bold', getSkillTextClass(skill.level)]">
                                    {{ skill.coverage }}%
                                </span>
                                <span class="text-xs text-base-content/60">cobertura</span>
                            </div>
                            <div class="text-xs text-base-content/60">
                                {{ skill.employeesWithSkill }} de {{ skill.totalEmployees }}
                                empleados
                            </div>
                            <div class="mt-2">
                                <div class="badge badge-sm" :class="`badge-${getSkillColor(skill.level)}`">
                                    {{
                                        skill.level === 'excellent'
                                            ? 'Excelente'
                                            : skill.level === 'good'
                                              ? 'Bueno'
                                              : skill.level === 'warning'
                                                ? 'Atención'
                                                : 'Crítico'
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-if="!loading && skillGaps.length === 0"
                    class="text-center py-8"
                >
                    <p class="text-base-content/60">No hay datos de brechas de habilidades</p>
                </div>
            </div>
        </div>
    </div>
</template>
