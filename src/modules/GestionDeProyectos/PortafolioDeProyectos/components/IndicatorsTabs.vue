<script setup lang="ts">
import { ref } from 'vue'
import IndicatorsMainTab from './IndicatorsMainTab.vue'
import ProjectStagesTab from './ProjectStagesTab.vue'
import PortfolioStatusTab from './PortfolioStatusTab.vue'

const indicatorTabs = ['Indicadores', 'Etapas por proyecto', 'Estatus de Portafolio'] as const
type IndicatorTab = (typeof indicatorTabs)[number]

const activeIndicatorTab = ref<IndicatorTab>('Indicadores')
</script>

<template>
  <section class="card bg-base-100 shadow-sm">
    <div class="card-body space-y-4">
      <div role="tablist" class="tabs tabs-bordered">
        <button
          v-for="tab in indicatorTabs"
          :key="tab"
          role="tab"
          class="tab"
          :class="{ 'tab-active': activeIndicatorTab === tab }"
          @click="activeIndicatorTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <IndicatorsMainTab v-if="activeIndicatorTab === 'Indicadores'" />
      <ProjectStagesTab v-else-if="activeIndicatorTab === 'Etapas por proyecto'" />
      <PortfolioStatusTab v-else />
    </div>
  </section>
</template>