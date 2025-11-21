<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useAccountCatalog from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalog'

const { openCreateView } = useAccountCatalog()
</script>

<template>
    <BaseButton text="Nueva cuenta" @click="openCreateView" icon="add" />
</template>
