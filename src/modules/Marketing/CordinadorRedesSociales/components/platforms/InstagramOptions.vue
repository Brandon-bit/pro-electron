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

const updatePostType = (type: 'feed' | 'reel' | 'story') => {
  data.value = { ...data.value, instagramPostType: type };
};

const toggleShareToFeed = () => {
  data.value = { 
    ...data.value, 
    instagramReelShareToFeed: !data.value.instagramReelShareToFeed 
  };
};
</script>

<template>
  <div class="space-y-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-pink-200">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-2xl">📷</span>
      <h4 class="font-semibold text-pink-900">Opciones de Instagram</h4>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium">Tipo de Publicación</span>
      </label>
      <div class="flex gap-2">
        <button
          type="button"
          @click="updatePostType('feed')"
          class="btn btn-sm flex-1"
          :class="data.instagramPostType === 'feed' ? 'btn-primary' : 'btn-outline'"
        >
          Feed
        </button>
        <button
          type="button"
          @click="updatePostType('reel')"
          class="btn btn-sm flex-1"
          :class="data.instagramPostType === 'reel' ? 'btn-primary' : 'btn-outline'"
        >
          Reel
        </button>
        <button
          type="button"
          @click="updatePostType('story')"
          class="btn btn-sm flex-1"
          :class="data.instagramPostType === 'story' ? 'btn-primary' : 'btn-outline'"
        >
          Historia
        </button>
      </div>
    </div>

    <div v-if="data.instagramPostType === 'reel'" class="form-control">
      <label class="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          :checked="data.instagramReelShareToFeed"
          @change="toggleShareToFeed"
          class="checkbox checkbox-primary"
        />
        <span class="label-text">Compartir Reel en el Feed</span>
      </label>
    </div>
  </div>
</template>
