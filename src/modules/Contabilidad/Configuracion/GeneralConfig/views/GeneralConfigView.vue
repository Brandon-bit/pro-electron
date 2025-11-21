<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import GeneralConfigForm from '@contabilidad/Configuracion/GeneralConfig/components/GeneralConfigForm.vue'
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Configuración General" 
            subtitle="Configura el tipo de empresa y parámetros generales del sistema contable"
        />

        <!-- Formulario de configuración -->
        <GeneralConfigForm />

        <!-- Información adicional -->
        <div class="alert alert-info shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
                <h3 class="font-bold">Impacto de la configuración</h3>
                <div class="text-sm">
                    El tipo de empresa seleccionado afectará:
                    <ul class="list-disc list-inside mt-2 ml-4">
                        <li>La estructura del catálogo de cuentas</li>
                        <li>Las opciones disponibles en el manejo de pólizas</li>
                        <li>Los reportes financieros y contables</li>
                        <li>Las validaciones y reglas de negocio</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
