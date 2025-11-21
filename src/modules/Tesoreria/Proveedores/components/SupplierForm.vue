<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="name"
                type="text"
                label="Nombre del Proveedor"
                placeholder="Ej: Distribuidora Nacional S.A."
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="rfc"
                type="text"
                label="RFC"
                placeholder="Ej: DNA850420XYZ"
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="email"
                type="email"
                label="Email"
                placeholder="Ej: ventas@proveedor.com"
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="phone"
                type="text"
                label="Teléfono"
                placeholder="Ej: 5556789012"
                :required="true"
                maxlength="10"
            />
        </div>

        <div class="col-span-12">
            <BaseTextArea
                name="street"
                label="Calle y Número"
                placeholder="Ej: Av. Insurgentes Sur 2345"
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-4">
            <BaseFormInput
                name="city"
                type="text"
                label="Ciudad"
                placeholder="Ej: Ciudad de México"
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-4">
            <BaseFormInput
                name="state"
                type="text"
                label="Estado"
                placeholder="Ej: CDMX"
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-4">
            <BaseFormInput
                name="postalCode"
                type="text"
                label="Código Postal"
                placeholder="Ej: 03100"
                :required="true"
                maxlength="5"
            />
        </div>

        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="creditDays"
                type="number"
                label="Días de Crédito"
                placeholder="30"
                :required="true"
            />
        </div>

        <div class="col-span-12">
            <BaseTextArea
                name="notes"
                label="Notas"
                placeholder="Observaciones sobre el proveedor"
            />
        </div>

        <div class="col-span-12">
            <BaseFormCheckbox name="active" label="Estado" :default="true" />
        </div>
    </div>
</template>
