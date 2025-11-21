<script setup lang="ts">
import { computed } from 'vue';
import type { PlatformSpecificData } from '../../types/socialPostTypes';

const props = defineProps<{
  modelValue: PlatformSpecificData;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: PlatformSpecificData): void;
}>();

const data = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const updateVisibility = (visibility: 'public' | 'connections') => {
  data.value = { ...data.value, linkedInVisibility: visibility };
};
</script>

<template>
  <div class="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-300">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-2xl">💼</span>
      <h4 class="font-semibold text-blue-900">Opciones de LinkedIn</h4>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium">Visibilidad</span>
      </label>
      <div class="flex gap-2">
        <button
          type="button"
          @click="updateVisibility('public')"
          class="btn btn-sm flex-1"
          :class="data.linkedInVisibility === 'public' ? 'btn-primary' : 'btn-outline'"
        >
          Público
        </button>
        <button
          type="button"
          @click="updateVisibility('connections')"
          class="btn btn-sm flex-1"
          :class="data.linkedInVisibility === 'connections' ? 'btn-primary' : 'btn-outline'"
        >
          Solo Conexiones
        </button>
      </div>
    </div>
  </div>
</template>
