<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToCreate = () => {
    router.push('/tesoreria/crear-cuenta-por-pagar')
}
</script>

<template>
    <BaseButton text="Nueva cuenta por pagar" icon="add" @click="goToCreate" />
</template>
