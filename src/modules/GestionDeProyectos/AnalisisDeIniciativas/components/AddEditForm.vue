<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'

const levelOptions = [
    { id: 'Bajo', label: 'Bajo' },
    { id: 'Medio', label: 'Medio' },
    { id: 'Alto', label: 'Alto' }
]

const timeHorizonOptions = [
    { id: 'Corto', label: 'Corto' },
    { id: 'Medio', label: 'Medio' },
    { id: 'Largo', label: 'Largo' }
]
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
            <BaseFormInput 
                name="name" 
                type="text" 
                label="Nombre de la Iniciativa" 
                :required="true" 
                placeholder="Ej: Sistema CRM"
            />
        </div>

        <BaseFormInput 
            name="classification" 
            type="text" 
            label="Clasificación" 
            :required="true"
            placeholder="Ej: Estratégico, Operacional"
        />

        <div class="md:col-span-2">
            <h3 class="text-lg font-semibold mb-3">Criterios de Esfuerzo</h3>
        </div>

        <BaseFormSelect 
            name="investment" 
            label="Inversión" 
            :options="levelOptions"
            :required="true"
        />

        <BaseFormSelect 
            name="scope" 
            label="Alcance" 
            :options="levelOptions"
            :required="true"
        />

        <BaseFormSelect 
            name="timeHorizon" 
            label="Horizonte de Tiempo" 
            :options="timeHorizonOptions"
            :required="true"
        />

        <div class="md:col-span-2">
            <h3 class="text-lg font-semibold mb-3 mt-4">Criterios de Impacto</h3>
        </div>

        <BaseFormSelect 
            name="savings" 
            label="Ahorro/Ingresos" 
            :options="levelOptions"
            :required="true"
        />

        <BaseFormSelect 
            name="benefits" 
            label="Beneficios" 
            :options="levelOptions"
            :required="true"
        />

        <BaseFormSelect 
            name="satisfaction" 
            label="Satisfacción al Cliente" 
            :options="levelOptions"
            :required="true"
        />

        <div class="md:col-span-2 mt-4">
            <BaseFormCheckbox 
                name="active" 
                label="Activo" 
            />
        </div>
    </div>
</template>
