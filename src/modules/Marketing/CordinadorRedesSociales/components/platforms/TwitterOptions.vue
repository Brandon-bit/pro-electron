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

const updateField = (field: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  data.value = { ...data.value, [field]: target.value };
};
</script>

<template>
  <div class="space-y-4 p-4 bg-sky-50 rounded-lg border border-sky-200">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-2xl">🐦</span>
      <h4 class="font-semibold text-sky-900">Opciones de X/Twitter</h4>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Responder a Tweet (ID)</span>
      </label>
      <input
        type="text"
        :value="data.twitterReplyToTweetId || ''"
        @input="(e) => updateField('twitterReplyToTweetId', e)"
        placeholder="ID del tweet a responder"
        class="input input-bordered input-sm w-full"
      />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Citar Tweet (ID)</span>
      </label>
      <input
        type="text"
        :value="data.twitterQuoteTweetId || ''"
        @input="(e) => updateField('twitterQuoteTweetId', e)"
        placeholder="ID del tweet a citar"
        class="input input-bordered input-sm w-full"
      />
    </div>
  </div>
</template>
