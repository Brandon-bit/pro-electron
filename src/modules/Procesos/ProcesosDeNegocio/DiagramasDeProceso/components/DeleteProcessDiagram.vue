<script setup lang="ts">
import useProcessDiagramStore from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/store/processDiagramStore'

const processDiagramStore = useProcessDiagramStore()
</script>

<template>
    <div>
        <div class="alert alert-warning mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
            <span>¿Estás seguro de eliminar este diagrama de proceso?</span>
        </div>

        <div class="card bg-base-200">
            <div class="card-body">
                <div class="flex items-start gap-4">
                    <div class="flex-1">
                        <h3 class="font-bold text-lg">
                            {{ processDiagramStore.selectedProcessDiagram.name }}
                        </h3>
                        <p class="text-sm text-base-content/60 mt-1">
                            Código: <span class="font-mono">{{ processDiagramStore.selectedProcessDiagram.code }}</span>
                        </p>
                        <p class="text-sm text-base-content/60">
                            Versión: {{ processDiagramStore.selectedProcessDiagram.version }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <p class="text-sm text-base-content/70 mt-4">
            Esta acción no se puede deshacer. El diagrama será eliminado permanentemente.
        </p>
    </div>
</template>
