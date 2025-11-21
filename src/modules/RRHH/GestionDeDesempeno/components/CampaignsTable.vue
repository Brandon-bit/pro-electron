<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useCampaigns } from '@/modules/RRHH/GestionDeDesempeno/composables/useCampaigns'
import { useCampaignActions } from '@/modules/RRHH/GestionDeDesempeno/composables/useCampaignActions'

const { getCampaigns } = useCampaignActions()
const tablaRef = ref()
</script>

<template>
    <BaseTable
        ref="tablaRef"
        :headers="useCampaigns()"
        :fetch-callback="getCampaigns"
    />
</template>
