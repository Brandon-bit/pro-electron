<script setup lang="ts">
import { STATUS_CONFIG } from '@/modules/GestionDeProyectos/Gantt/types/ganttTypes'
import type { StatusType } from '@/modules/GestionDeProyectos/Gantt/types/ganttTypes'

const statusKeys = Object.keys(STATUS_CONFIG) as StatusType[]
</script>

<template>
    <div class="flex flex-wrap gap-3 justify-center p-4 bg-base-200 rounded-lg">
        <div 
            v-for="key in statusKeys" 
            :key="key"
            class="flex items-center gap-2"
        >
            <div :class="['w-3 h-3 rounded-full', STATUS_CONFIG[key].bgColor]"></div>
            <span class="text-sm">{{ STATUS_CONFIG[key].label }}</span>
        </div>
    </div>
</template>
