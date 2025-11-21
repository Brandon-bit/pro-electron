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

const updateVisibility = (visibility: 'public' | 'private' | 'unlisted') => {
  data.value = { ...data.value, youTubeVisibility: visibility };
};

const updateTitle = (event: Event) => {
  const target = event.target as HTMLInputElement;
  data.value = { ...data.value, youTubeTitle: target.value };
};

const toggleShorts = () => {
  data.value = { ...data.value, youTubeShorts: !data.value.youTubeShorts };
};
</script>

<template>
  <div class="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-2xl">▶️</span>
      <h4 class="font-semibold text-red-900">Opciones de YouTube</h4>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium">Título del Video</span>
        <span class="label-text-alt text-error">Requerido</span>
      </label>
      <input
        type="text"
        :value="data.youTubeTitle || ''"
        @input="updateTitle"
        placeholder="Ingresa el título del video"
        class="input input-bordered w-full"
        maxlength="100"
      />
      <label class="label">
        <span class="label-text-alt">Máximo 100 caracteres</span>
      </label>
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
          :class="data.youTubeVisibility === 'public' ? 'btn-primary' : 'btn-outline'"
        >
          Público
        </button>
        <button
          type="button"
          @click="updateVisibility('unlisted')"
          class="btn btn-sm flex-1"
          :class="data.youTubeVisibility === 'unlisted' ? 'btn-primary' : 'btn-outline'"
        >
          No listado
        </button>
        <button
          type="button"
          @click="updateVisibility('private')"
          class="btn btn-sm flex-1"
          :class="data.youTubeVisibility === 'private' ? 'btn-primary' : 'btn-outline'"
        >
          Privado
        </button>
      </div>
    </div>

    <div class="form-control">
      <label class="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          :checked="data.youTubeShorts"
          @change="toggleShorts"
          class="checkbox checkbox-primary"
        />
        <div>
          <span class="label-text font-medium">YouTube Shorts</span>
          <p class="text-xs text-gray-500">Publicar como video corto (máx. 60 segundos)</p>
        </div>
      </label>
    </div>
  </div>
</template>
