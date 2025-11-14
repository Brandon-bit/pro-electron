<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import SupportForm from '@/navbar/Soporte/components/SupportForm.vue'
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Soporte" 
            subtitle="Contacta con el equipo de soporte"
        >
            <template #icon>
                <span class="material-symbols-outlined text-4xl">support_agent</span>
            </template>
        </BaseTitle>

        <!-- Support Form -->
        <SupportForm />
    </div>
</template>
