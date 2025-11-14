<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    status: string
}>()

const badgeClass = computed(() => {
    const statusLower = props.status.toLowerCase()
    
    if (statusLower.includes('tiempo') || statusLower.includes('ontime')) {
        return 'badge-success'
    }
    if (statusLower.includes('atrasado') || statusLower.includes('delayed')) {
        return 'badge-warning'
    }
    if (statusLower.includes('crítico') || statusLower.includes('critical')) {
        return 'badge-error'
    }
    if (statusLower.includes('finalizado') || statusLower.includes('completado')) {
        return 'badge-info'
    }
    
    return 'badge-ghost'
})
</script>

<template>
    <span :class="['badge badge-sm', badgeClass]">
        {{ status }}
    </span>
</template>
