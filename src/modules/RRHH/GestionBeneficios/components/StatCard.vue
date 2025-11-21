<script setup lang="ts">
defineProps<{
    icon: string
    color: 'primary' | 'success' | 'secondary' | 'warning' | 'error' | 'info'
    label: string
    value: number | string
    description: string
}>()
</script>

<template>
    <div class="stat-card">
        <div :class="['stat-icon-wrapper', `bg-${color}/10`]">
            <span :class="['material-symbols-outlined', `text-${color}`, 'text-2xl']">
                {{ icon }}
            </span>
        </div>
        <div class="stat-content">
            <h3 class="stat-label">{{ label }}</h3>
            <div :class="['stat-value', `text-${color}`]">{{ value }}</div>
            <p class="stat-description">{{ description }}</p>
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
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    transition: all 0.3s ease-in-out;
    padding: 1.5rem;
    cursor: pointer;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
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
</style>
