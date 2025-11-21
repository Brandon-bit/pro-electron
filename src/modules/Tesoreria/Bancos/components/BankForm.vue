<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12">
            <BaseFormInput
                name="name"
                type="text"
                label="Nombre del banco"
                placeholder="Ej: BBVA México"
                :required="true"
            />
        </div>
        <div class="col-span-12">
            <BaseFormInput
                name="code"
                type="text"
                label="Código del banco"
                placeholder="Ej: 012"
            />
        </div>
        <div class="col-span-12">
            <BaseFormCheckbox name="active" label="Estado" :default="true" />
        </div>
    </div>
</template>
