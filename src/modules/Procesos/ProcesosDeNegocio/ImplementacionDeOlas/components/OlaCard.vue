<script setup lang="ts">
import { computed } from 'vue'
import type { IOla } from '../types/ola.types'
import { useOlaUtils } from '../composables/useOlaUtils'

interface Props {
    ola: IOla
}

const props = defineProps<Props>()

const { getPrioridadClass } = useOlaUtils()

const cardClass = computed(() => getPrioridadClass(props.ola.prioridad))
</script>

<template>
    <div class="cuadro-ola" :class="cardClass">
        <div class="ola-content">
            <div class="mb-2">
                <strong class="text-sm">Concepto:</strong>
                <textarea 
                    :value="ola.concepto" 
                    rows="3" 
                    disabled 
                    class="w-full text-sm resize-none bg-transparent border border-current rounded px-2 py-1 mt-1"
                ></textarea>
            </div>
            
            <div>
                <strong class="text-sm">Tipo de implementación:</strong>
                <p class="text-sm mt-1 px-2 py-1 border border-current rounded">
                    {{ ola.tipoImplementacion }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cuadro-ola {
    display: inline-block;
    margin: 12px 0;
    height: 140px;
    width: 210px;
    border-radius: 8px;
    box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.4);
    text-align: left;
    padding: 8px;
}

.ola-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

textarea,
strong,
p {
    font-size: 13px !important;
    margin: 0 !important;
}

textarea {
    resize: none;
}

/* Prioridad Baja - Verde */
.bg-baja {
    background-color: #65b552;
    color: white;
}

.bg-baja > .ola-content textarea,
.bg-baja > .ola-content p,
.bg-baja textarea,
.bg-baja p {
    color: white;
    border-color: rgb(230, 230, 230);
}

/* Prioridad Media - Amarillo */
.bg-media {
    background-color: #ffbc37;
    color: black;
}

.bg-media > .ola-content textarea,
.bg-media > .ola-content p,
.bg-media textarea,
.bg-media p {
    color: black;
    border-color: rgb(128, 128, 128);
}

/* Prioridad Alta - Naranja */
.bg-alta {
    background-color: #ef7d4a;
    color: white;
}

.bg-alta > .ola-content textarea,
.bg-alta > .ola-content p,
.bg-alta textarea,
.bg-alta p {
    color: white;
    border-color: rgb(230, 230, 230);
}

/* Prioridad Muy Alta - Rojo */
.bg-muy-alta {
    background-color: #e82754;
    color: white;
}

.bg-muy-alta > .ola-content textarea,
.bg-muy-alta > .ola-content p,
.bg-muy-alta textarea,
.bg-muy-alta p {
    color: white;
    border-color: rgb(230, 230, 230);
}
</style>
