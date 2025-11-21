<script setup lang="ts">
const props = defineProps<{
    item: {
        id: number
        author: string
        date: string
        type: string
        message: string
    }
}>()
</script>

<template>
    <div class="stat-card group">
        <div class="stat-content space-y-2">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="avatar placeholder">
                        <div class="bg-secondary text-secondary-content rounded-full w-10">
                            <span class="text-lg font-semibold">{{ item.author[0] }}</span>
                        </div>
                    </div>
                    <div>
                        <p class="font-semibold">{{ item.author }}</p>
                        <p class="text-xs text-base-content/60">{{ item.date }}</p>
                    </div>
                </div>
                <span class="badge badge-secondary gap-1">
                    <span class="material-symbols-outlined text-sm">workspace_premium</span>
                    {{ item.type }}
                </span>
            </div>
            <p class="text-sm text-base-content/70">
                "{{ item.message }}"
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
