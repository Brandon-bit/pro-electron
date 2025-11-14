<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
</script>

<template>
    <div class="col-span-12">
        <div class="alert alert-warning shadow-lg">
            <div class="flex items-start gap-4">
                <AlertCircle :size="32" class="flex-shrink-0" />
                <div class="flex-1">
                    <h3 class="font-bold text-lg mb-2">No hay cadena de valor seleccionada</h3>
                    <p class="text-sm">
                        Por favor, selecciona una cadena de valor del selector superior para poder
                        trabajar con los espacios y procesos.
                    </p>
                    <div class="mt-4">
                        <router-link
                            to="/procesos/procesos-de-negocio/cadenas-de-valor"
                            class="btn btn-sm btn-info gap-2"
                        >
                            Configurar Cadenas de Valor
                            <span class="material-symbols-outlined text-lg">arrow_forward</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
