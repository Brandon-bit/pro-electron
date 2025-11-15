<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import EditorTab from '@/modules/GestionDeProyectos/Operacion/SOWDelProyecto/components/EditorTab.vue'
import LibraryTab from '@/modules/GestionDeProyectos/Operacion/SOWDelProyecto/components/LibraryTab.vue'
import useSOWStore from '@/modules/GestionDeProyectos/Operacion/SOWDelProyecto/store/sowStore'

const sowStore = useSOWStore()
const activeTab = ref<'editor' | 'library'>('editor')

const handleTabChange = (tab: 'editor' | 'library') => {
    activeTab.value = tab
    sowStore.setCurrentTab(tab)
}
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Statement of Work (SOW)" 
            subtitle="Crea y gestiona documentos SOW para tus proyectos"
        />

        <!-- Tabs -->
        <div class="tabs tabs-boxed bg-base-200 w-fit">
            <button 
                :class="['tab', { 'tab-active': activeTab === 'editor' }]"
                @click="handleTabChange('editor')"
            >
                <span class="material-symbols-outlined text-sm mr-2">edit_document</span>
                Editor SOW
            </button>
            <button 
                :class="['tab', { 'tab-active': activeTab === 'library' }]"
                @click="handleTabChange('library')"
            >
                <span class="material-symbols-outlined text-sm mr-2">library_books</span>
                Biblioteca SOW
            </button>
        </div>

        <!-- Tab Content -->
        <div class="mt-6">
            <EditorTab v-if="activeTab === 'editor'" />
            <LibraryTab v-if="activeTab === 'library'" />
        </div>
    </div>
</template>

<style scoped>
.tab {
    display: flex;
    align-items: center;
}
</style>
