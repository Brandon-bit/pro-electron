<script setup lang="ts">
import EDTNode from '@/modules/GestionDeProyectos/EDTDelProyecto/components/EDTNode.vue'
import useEDTStore from '@/modules/GestionDeProyectos/EDTDelProyecto/store/edtStore'

const edtStore = useEDTStore()
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-8">
            <div class="overflow-x-auto">
                <div class="inline-flex flex-col items-center min-w-full p-8">
                    <EDTNode v-if="edtStore.edtRoot" :node="edtStore.edtRoot" />
                </div>
            </div>
            
            <!-- Instrucciones -->
            <div class="mt-8 p-4 bg-base-200 rounded-lg border border-base-300">
                <h3 class="font-semibold text-sm mb-2 flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">lightbulb</span>
                    Instrucciones:
                </h3>
                <ul class="text-sm opacity-70 space-y-1">
                    <li>• Haz <strong>doble clic</strong> en cualquier nodo para editar su nombre</li>
                    <li>• Pasa el mouse sobre un nodo y usa el botón <strong>+</strong> para agregar hijos</li>
                    <li>• Usa el ícono <strong>🗑️</strong> para eliminar nodos (excepto el raíz)</li>
                    <li>• Los niveles son: Proyecto → Etapas → Actividades → Sub-actividades</li>
                </ul>
            </div>
        </div>
    </div>
</template>
