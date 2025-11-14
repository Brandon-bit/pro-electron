<script setup lang="ts">
defineProps<{
    count: number
}>()

const emit = defineEmits<{
    click: []
}>()
</script>

<template>
    <button
        @click="emit('click')"
        class="btn btn-sm btn-ghost gap-2 hover:bg-primary/10"
    >
        <span class="material-symbols-outlined text-lg">folder_open</span>
        <span class="font-semibold">{{ count }}</span>
    </button>
</template>
