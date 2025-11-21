<script setup lang="ts">
import { computed } from 'vue';

interface SocialNetwork {
  id: string;
  name: string;
  icon: string;
  color: string;
  enabled: boolean;
}

const props = defineProps<{
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const networks: SocialNetwork[] = [
  { id: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-600', enabled: true },
  { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-pink-500', enabled: true },
  { id: 'twitter', name: 'X/Twitter', icon: '🐦', color: 'bg-sky-500', enabled: true },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-black', enabled: true },
  { id: 'youtube', name: 'YouTube', icon: '▶️', color: 'bg-red-600', enabled: true },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-700', enabled: true },
  { id: 'telegram', name: 'Telegram', icon: '✈️', color: 'bg-sky-400', enabled: true },
  { id: 'reddit', name: 'Reddit', icon: '🤖', color: 'bg-orange-600', enabled: true },
  { id: 'gmb', name: 'Google Business', icon: '🏢', color: 'bg-green-600', enabled: true },
];

const selectedNetworks = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const toggleNetwork = (networkId: string) => {
  const index = selectedNetworks.value.indexOf(networkId);
  if (index > -1) {
    selectedNetworks.value = selectedNetworks.value.filter(id => id !== networkId);
  } else {
    selectedNetworks.value = [...selectedNetworks.value, networkId];
  }
};

const isSelected = (networkId: string) => {
  return selectedNetworks.value.includes(networkId);
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Redes Sociales</h3>
      <span class="text-sm text-gray-500">
        {{ selectedNetworks.length }} seleccionada{{ selectedNetworks.length !== 1 ? 's' : '' }}
      </span>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <div
        v-for="network in networks"
        :key="network.id"
        @click="toggleNetwork(network.id)"
        class="relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md"
        :class="[
          isSelected(network.id) 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ network.icon }}</span>
            <span class="font-medium text-sm">{{ network.name }}</span>
          </div>
          <input
            type="checkbox"
            :checked="isSelected(network.id)"
            class="toggle toggle-primary toggle-sm"
            @click.stop="toggleNetwork(network.id)"
          />
        </div>
      </div>
    </div>

    <div v-if="selectedNetworks.length === 0" class="alert alert-warning">
      <span class="material-symbols-outlined">warning</span>
      <span>Debes seleccionar al menos una red social para publicar</span>
    </div>
  </div>
</template>
