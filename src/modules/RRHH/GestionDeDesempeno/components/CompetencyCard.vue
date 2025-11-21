<script setup lang="ts">
const props = defineProps<{
    competency: {
        id: number
        name: string
        description?: string
        category: 'technical' | 'behavioral' | 'leadership'
    }
}>()

const getCategoryBadgeClass = (category: string) => {
    const badges: Record<string, string> = {
        technical: 'badge-primary',
        behavioral: 'badge-secondary',
        leadership: 'badge-accent'
    }
    return badges[category] || 'badge-ghost'
}

const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
        technical: 'Técnica',
        behavioral: 'Conductual',
        leadership: 'Liderazgo'
    }
    return labels[category] || category
}
</script>

<template>
    <div class="stat-card group">
        <div class="stat-content">
            <div class="flex items-start justify-between mb-2">
                <h3 class="stat-label flex-1">{{ competency.name }}</h3>
                <span :class="['badge badge-sm', getCategoryBadgeClass(competency.category)]">
                    {{ getCategoryLabel(competency.category) }}
                </span>
            </div>
            <p v-if="competency.description" class="stat-description">
                {{ competency.description }}
            </p>
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

.stat-content {
    position: relative;
    z-index: 10;
}

.stat-label {
    font-size: 1rem;
    font-weight: 600;
    color: hsl(var(--bc));
    margin-bottom: 0.5rem;
}

.stat-description {
    font-size: 0.75rem;
    color: hsl(var(--bc) / 0.6);
    font-weight: 400;
    line-height: 1.5;
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
