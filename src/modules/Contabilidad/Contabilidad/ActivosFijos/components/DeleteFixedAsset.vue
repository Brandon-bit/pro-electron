<script setup lang="ts">
import useFixedAssetsStore from '@/modules/Contabilidad/Contabilidad/ActivosFijos/store/fixedAssetsStore'

const fixedAssetsStore = useFixedAssetsStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar el activo fijo
        <span class="!font-semibold"> "{{ fixedAssetsStore.selectedFixedAsset?.id }}" </span>
        con descripción
        <span class="!font-semibold"> "{{ fixedAssetsStore.selectedFixedAsset?.description }}" </span>?
    </p>
    <p class="text-sm text-error mt-2">
        Esta acción no se puede deshacer y eliminará permanentemente el registro del activo.
    </p>
</template>
