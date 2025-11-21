<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
  statusLabel?: string;
  statusClass?: string;
}>();
</script>

<template>
  <div class="card bg-base-100 border border-gray-300 shadow-lg hover:shadow-xl transition-shadow cursor-pointer rounded-2xl">
    <div class="card-body p-4">
      <div class="flex justify-between items-start gap-2 mb-2">
        <h2 class="card-title text-base font-semibold line-clamp-2 flex-1">{{ title }}</h2>
        <span v-if="statusLabel" :class="['badge badge-sm', statusClass]">{{ statusLabel }}</span>
      </div>
      <p v-if="description" class="text-xs text-gray-500 line-clamp-2">{{ description }}</p>

      <div class="mt-3 space-y-1 text-xs">
        <slot name="details"></slot>
      </div>

      <div class="card-actions justify-start mt-3 gap-2">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-body {
  padding: 1rem; /* Asegura un padding consistente */
}
</style>