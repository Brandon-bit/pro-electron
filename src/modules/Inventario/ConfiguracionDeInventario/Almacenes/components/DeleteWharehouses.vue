<script setup lang="ts">
import useSupplierStore from '../store/Wharehouses.store';
const supplierStore = useSupplierStore()
</script>

<template>
    <p class="text-center">
        ¿Estás seguro que deseas eliminar la categoría
        <span class="!font-semibold"> "{{ supplierStore.selectedSupplier.comercialName }}" ? </span>
    </p>
</template>
