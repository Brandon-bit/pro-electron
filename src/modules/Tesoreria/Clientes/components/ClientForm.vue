<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <!-- Información General -->
        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="name"
                type="text"
                label="Nombre del Cliente"
                placeholder="Ej: Comercializadora del Norte S.A."
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="rfc"
                type="text"
                label="RFC"
                placeholder="Ej: CDN850315ABC"
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="email"
                type="email"
                label="Email"
                placeholder="Ej: contacto@empresa.com"
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="phone"
                type="text"
                label="Teléfono"
                placeholder="Ej: 8123456789"
                :required="true"
                maxlength="10"
            />
        </div>
        <div class="col-span-12">
            <BaseTextArea
                name="street"
                label="Calle y Número"
                placeholder="Ej: Av. Constitución 1234"
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-4">
            <BaseFormInput
                name="city"
                type="text"
                label="Ciudad"
                placeholder="Ej: Monterrey"
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-4">
            <BaseFormInput
                name="state"
                type="text"
                label="Estado"
                placeholder="Ej: Nuevo León"
                :required="true"
            />
        </div>

        <div class="col-span-12 md:col-span-4">
            <BaseFormInput
                name="postalCode"
                type="text"
                label="Código Postal"
                placeholder="Ej: 64000"
                :required="true"
                maxlength="5"
            />
        </div>
        <!-- Información de Crédito -->
        <div class="col-span-6">
            <BaseFormInput
                name="creditLimit"
                type="number"
                label="Límite de Crédito"
                placeholder="0.00"
                :required="true"
                step="0.01"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="creditDays"
                type="number"
                label="Días de Crédito"
                placeholder="30"
                :required="true"
            />
        </div>

        <div class="col-span-12">
            <BaseTextArea name="notes" label="Notas" placeholder="Observaciones sobre el cliente" />
        </div>

        <div class="col-span-12">
            <BaseFormCheckbox name="active" label="Estado" :default="true" />
        </div>
    </div>
</template>
