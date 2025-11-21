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

const updatePostType = (type: 'regular' | 'reel' | 'story') => {
  data.value = { ...data.value, facebookPostType: type };
};
</script>

<template>
  <div class="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-2xl">📘</span>
      <h4 class="font-semibold text-blue-900">Opciones de Facebook</h4>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium">Tipo de Publicación</span>
      </label>
      <div class="flex gap-2">
        <button
          type="button"
          @click="updatePostType('regular')"
          class="btn btn-sm flex-1"
          :class="data.facebookPostType === 'regular' ? 'btn-primary' : 'btn-outline'"
        >
          Post Regular
        </button>
        <button
          type="button"
          @click="updatePostType('reel')"
          class="btn btn-sm flex-1"
          :class="data.facebookPostType === 'reel' ? 'btn-primary' : 'btn-outline'"
        >
          Reel
        </button>
        <button
          type="button"
          @click="updatePostType('story')"
          class="btn btn-sm flex-1"
          :class="data.facebookPostType === 'story' ? 'btn-primary' : 'btn-outline'"
        >
          Historia
        </button>
      </div>
    </div>
  </div>
</template>
