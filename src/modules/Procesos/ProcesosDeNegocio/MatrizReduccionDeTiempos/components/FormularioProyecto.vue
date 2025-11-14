<script setup lang="ts">
import { computed } from 'vue'
import { useReduccionStore } from '../store/reduccionStore'

const reduccionStore = useReduccionStore()

const proyectosNombres = computed(() => {
    return reduccionStore.proyectos.map(p => p.nombre)
})
</script>

<template>
    <div class="card bg-base-100 shadow">
        <div class="card-body">
            <h3 class="card-title">
                <span class="material-symbols-outlined">folder</span>
                Información del Proyecto
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Área -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Área</span>
                    </label>
                    <input 
                        type="text" 
                        class="input input-bordered"
                        v-model="reduccionStore.infoProyecto.area"
                        placeholder="Ej: Operaciones"
                    />
                </div>

                <!-- Proyecto -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Proyecto</span>
                    </label>
                    <input 
                        type="text" 
                        list="proyectos"
                        class="input input-bordered"
                        v-model="reduccionStore.infoProyecto.proyecto"
                        placeholder="Seleccionar proyecto"
                    />
                    <datalist id="proyectos">
                        <option v-for="nombre in proyectosNombres" :key="nombre" :value="nombre"></option>
                    </datalist>
                </div>

                <!-- Realizó el proyecto -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Realizó el proyecto</span>
                    </label>
                    <input 
                        type="text" 
                        class="input input-bordered"
                        v-model="reduccionStore.infoProyecto.person"
                        placeholder="Nombre del responsable"
                    />
                </div>

                <!-- Fecha del proyecto -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Fecha del proyecto</span>
                    </label>
                    <input 
                        type="date" 
                        class="input input-bordered"
                        v-model="reduccionStore.infoProyecto.strFechaIni"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
