<script setup lang="ts">
import type { Recognition } from '@/modules/RRHH/GestionBeneficios/types/benefitsTypes'

defineProps<{
    recognition: Recognition
}>()

const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
        teamwork: 'Trabajo en Equipo',
        innovation: 'Innovación',
        leadership: 'Liderazgo',
        excellence: 'Excelencia',
        values: 'Valores'
    }
    return labels[category] || category
}

const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Hace menos de 1 hora'
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`
    if (diffDays === 1) return 'Hace 1 día'
    return `Hace ${diffDays} días`
}
</script>

<template>
    <div class="recognition-card">
        <div class="recognition-header">
            <div class="flex items-center gap-3">
                <div class="avatar-wrapper">
                    <span class="avatar-initial">
                        {{ recognition.fromEmployeeName.charAt(0) }}
                    </span>
                </div>
                <div>
                    <p class="font-semibold text-base-content">
                        {{ recognition.fromEmployeeName }}
                    </p>
                    <p class="text-xs text-base-content/60">
                        reconoció a
                        <span class="font-semibold">{{ recognition.toEmployeeName }}</span>
                    </p>
                </div>
            </div>
            <div class="badge badge-warning gap-1">
                <span class="material-symbols-outlined text-xs">workspace_premium</span>
                {{ getCategoryLabel(recognition.category) }}
            </div>
        </div>

        <p class="recognition-message">"{{ recognition.message }}"</p>

        <div class="recognition-footer">
            <span class="text-xs text-base-content/60">{{
                getTimeAgo(recognition.createdAt)
            }}</span>
            <span class="flex items-center gap-1 text-warning font-semibold">
                <span class="material-symbols-outlined text-sm">stars</span>
                +{{ recognition.points }} puntos
            </span>
        </div>
    </div>
</template>

<style scoped>
.recognition-card {
    background: hsl(var(--b1));
    border-radius: 0.75rem;
    border: 1px solid hsl(var(--bc) / 0.12);
    padding: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.04);
}

.recognition-card:hover {
    box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.12);
    transform: translateY(-2px);
}

.recognition-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.avatar-wrapper {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: linear-gradient(135deg, hsl(var(--p)), hsl(var(--s)));
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-initial {
    color: hsl(var(--pc));
    font-weight: 700;
    font-size: 1rem;
}

.recognition-message {
    font-size: 0.875rem;
    font-style: italic;
    border-left: 2px solid hsl(var(--p));
    padding-left: 0.75rem;
    margin-bottom: 1rem;
    color: hsl(var(--bc) / 0.8);
    line-height: 1.5;
}

.recognition-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
