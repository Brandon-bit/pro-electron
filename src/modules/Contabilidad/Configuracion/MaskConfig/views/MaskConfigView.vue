<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import MaskConfigForm from '@contabilidad/Configuracion/MaskConfig/components/MaskConfigForm.vue'
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Configuración de Máscara Contable" 
            subtitle="Define la estructura y formato del catálogo de cuentas"
        />

        <!-- Formulario de configuración -->
        <MaskConfigForm />

        <!-- Información adicional -->
        <div class="alert alert-warning shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <div>
                <h3 class="font-bold">⚠️ Impacto de la configuración</h3>
                <div class="text-sm">
                    Modificar la máscara contable afectará:
                    <ul class="list-disc list-inside mt-2 ml-4">
                        <li>La estructura jerárquica de todas las cuentas contables</li>
                        <li>El formato y validación de códigos de cuenta</li>
                        <li>Los reportes financieros agrupados por nivel</li>
                        <li>Las búsquedas y filtros en el catálogo de cuentas</li>
                    </ul>
                    <p class="mt-2 font-semibold">
                        Se recomienda hacer un respaldo antes de realizar cambios mayores.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
