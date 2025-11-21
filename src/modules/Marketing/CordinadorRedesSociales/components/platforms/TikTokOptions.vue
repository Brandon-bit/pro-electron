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

const updatePrivacyLevel = (level: 'public' | 'friends' | 'private') => {
  data.value = { ...data.value, tikTokPrivacyLevel: level };
};

const toggleOption = (option: keyof PlatformSpecificData) => {
  data.value = { ...data.value, [option]: !data.value[option] };
};
</script>

<template>
  <div class="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-300">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-2xl">🎵</span>
      <h4 class="font-semibold text-gray-900">Opciones de TikTok</h4>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium">Nivel de Privacidad</span>
      </label>
      <div class="flex gap-2">
        <button
          type="button"
          @click="updatePrivacyLevel('public')"
          class="btn btn-sm flex-1"
          :class="data.tikTokPrivacyLevel === 'public' ? 'btn-primary' : 'btn-outline'"
        >
          Público
        </button>
        <button
          type="button"
          @click="updatePrivacyLevel('friends')"
          class="btn btn-sm flex-1"
          :class="data.tikTokPrivacyLevel === 'friends' ? 'btn-primary' : 'btn-outline'"
        >
          Amigos
        </button>
        <button
          type="button"
          @click="updatePrivacyLevel('private')"
          class="btn btn-sm flex-1"
          :class="data.tikTokPrivacyLevel === 'private' ? 'btn-primary' : 'btn-outline'"
        >
          Privado
        </button>
      </div>
    </div>

    <div class="divider">Configuración de Interacciones</div>

    <div class="space-y-2">
      <label class="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          :checked="data.tikTokCommentDisabled"
          @change="toggleOption('tikTokCommentDisabled')"
          class="checkbox checkbox-sm"
        />
        <span class="label-text">Desactivar comentarios</span>
      </label>

      <label class="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          :checked="data.tikTokDuetDisabled"
          @change="toggleOption('tikTokDuetDisabled')"
          class="checkbox checkbox-sm"
        />
        <span class="label-text">Desactivar duetos</span>
      </label>

      <label class="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          :checked="data.tikTokStitchDisabled"
          @change="toggleOption('tikTokStitchDisabled')"
          class="checkbox checkbox-sm"
        />
        <span class="label-text">Desactivar stitch</span>
      </label>

      <label class="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          :checked="data.tikTokBrandContentToggle"
          @change="toggleOption('tikTokBrandContentToggle')"
          class="checkbox checkbox-sm"
        />
        <span class="label-text">Contenido de marca</span>
      </label>

      <label class="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          :checked="data.tikTokBrandOrganicToggle"
          @change="toggleOption('tikTokBrandOrganicToggle')"
          class="checkbox checkbox-sm"
        />
        <span class="label-text">Marca orgánica</span>
      </label>
    </div>
  </div>
</template>
