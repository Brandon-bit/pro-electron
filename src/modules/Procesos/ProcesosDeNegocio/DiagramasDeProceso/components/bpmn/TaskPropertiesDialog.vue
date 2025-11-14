<script setup lang="ts">
import { computed } from 'vue'
import type { TaskFormData, VisibleFields } from '../../types/bpmn.types'

interface Props {
  isOpen: boolean
  formData: TaskFormData
  visibleFields: VisibleFields
  raciList: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'save': []
  'show-field': [field: keyof VisibleFields]
  'hide-field': [field: keyof VisibleFields]
  'update-field': [field: keyof TaskFormData, value: any]
  'add-rule': []
  'remove-rule': [index: number]
  'add-indicator': []
  'remove-indicator': [index: number]
  'add-definition': []
  'remove-definition': [index: number]
}>()

const colorOptions = [
  { color: 'pink', bg: '#ffc0cb', name: 'Rosa Pastel' },
  { color: 'yellow', bg: '#ffeb3b', name: 'Amarillo' },
  { color: 'orange', bg: '#ff9800', name: 'Naranja' },
  { color: 'red', bg: '#f44336', name: 'Rojo' }
]

const backgroundColorOptions = [
  { color: 'lightblue', bg: '#add8e6', name: 'Azul Claro' },
  { color: 'lightgreen', bg: '#90ee90', name: 'Verde Claro' },
  { color: 'lightcyan', bg: '#e0ffff', name: 'Cyan Claro' },
  { color: 'lightyellow', bg: '#ffffe0', name: 'Amarillo Claro' },
  { color: 'lightpink', bg: '#ffb6c1', name: 'Rosa Claro' },
  { color: 'lavender', bg: '#e6e6fa', name: 'Lavanda' }
]

const fieldLabels: Record<string, string> = {
  tiempos: "Tiempos de ejecución",
  RACI: "Matriz RACI",
  docs: "Documentos",
  formatos: "Formatos",
  entradas: "Entradas/Salidas",
  resultante: "Resultante de actividad",
  riesgos: "Riesgos y controles",
  tablas: "Tablas de información"
}
</script>

<template>
  <div v-if="isOpen" class="modal modal-open">
    <div class="modal-backdrop" @click="emit('update:isOpen', false)"></div>
    
    <div class="modal-box max-w-5xl max-h-[90vh] overflow-y-auto" style="z-index: 10000 !important;">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">edit_square</span>
          Propiedades de la Tarea
        </h3>
        <button @click.stop="emit('update:isOpen', false)" class="btn btn-sm btn-circle btn-ghost">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="divider my-2"></div>

      <!-- Formulario -->
      <div class="space-y-4">
        <!-- Número de Actividad (siempre visible) -->
        <div>
          <label class="label">
            <span class="label-text font-medium">Número de Actividad</span>
          </label>
          <input
            type="text"
            :value="formData.NumAct"
            @input="emit('update-field', 'NumAct', ($event.target as HTMLInputElement).value)"
            class="input input-bordered w-full"
            placeholder="Ej: 1.1, 2.3, etc."
          />
        </div>

        <!-- Descripción (siempre visible) -->
        <div>
          <label class="label">
            <span class="label-text font-medium">Descripción de la Actividad</span>
          </label>
          <textarea
            :value="formData.DescAct"
            @input="emit('update-field', 'DescAct', ($event.target as HTMLTextAreaElement).value)"
            class="textarea textarea-bordered w-full"
            rows="3"
            placeholder="Descripción detallada de la tarea..."
          ></textarea>
        </div>

        <!-- Tiempos (ocultable) -->
        <div v-if="visibleFields.tiempos" class="border border-base-300 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <label class="label-text font-medium">⏱️ Tiempos de Ejecución</label>
            <button @click.stop="emit('hide-field', 'tiempos')" class="btn btn-xs btn-ghost">
              <span class="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="label"><span class="label-text text-xs">Días</span></label>
              <input
                type="number"
                :value="formData.Dia"
                @input="emit('update-field', 'Dia', ($event.target as HTMLInputElement).value)"
                class="input input-bordered input-sm w-full"
                placeholder="0"
              />
            </div>
            <div>
              <label class="label"><span class="label-text text-xs">Horas</span></label>
              <input
                type="number"
                :value="formData.Hrs"
                @input="emit('update-field', 'Hrs', ($event.target as HTMLInputElement).value)"
                class="input input-bordered input-sm w-full"
                placeholder="0"
              />
            </div>
            <div>
              <label class="label"><span class="label-text text-xs">Minutos</span></label>
              <input
                type="number"
                :value="formData.Min"
                @input="emit('update-field', 'Min', ($event.target as HTMLInputElement).value)"
                class="input input-bordered input-sm w-full"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <!-- RACI (ocultable) -->
        <div v-if="visibleFields.RACI" class="border border-base-300 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <label class="label-text font-medium">👥 Matriz RACI</label>
            <button @click.stop="emit('hide-field', 'RACI')" class="btn btn-xs btn-ghost">
              <span class="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          <div class="grid grid-cols-4 gap-2">
            <div>
              <label class="label"><span class="label-text text-xs">Responsable</span></label>
              <select
                :value="formData.R"
                @change="emit('update-field', 'R', ($event.target as HTMLSelectElement).value)"
                class="select select-bordered select-sm w-full"
              >
                <option value="">Seleccionar...</option>
                <option v-for="role in raciList" :key="role" :value="role">{{ role }}</option>
              </select>
            </div>
            <div>
              <label class="label"><span class="label-text text-xs">Aprobador</span></label>
              <select
                :value="formData.A"
                @change="emit('update-field', 'A', ($event.target as HTMLSelectElement).value)"
                class="select select-bordered select-sm w-full"
              >
                <option value="">Seleccionar...</option>
                <option v-for="role in raciList" :key="role" :value="role">{{ role }}</option>
              </select>
            </div>
            <div>
              <label class="label"><span class="label-text text-xs">Consultado</span></label>
              <select
                :value="formData.C"
                @change="emit('update-field', 'C', ($event.target as HTMLSelectElement).value)"
                class="select select-bordered select-sm w-full"
              >
                <option value="">Seleccionar...</option>
                <option v-for="role in raciList" :key="role" :value="role">{{ role }}</option>
              </select>
            </div>
            <div>
              <label class="label"><span class="label-text text-xs">Informado</span></label>
              <select
                :value="formData.I"
                @change="emit('update-field', 'I', ($event.target as HTMLSelectElement).value)"
                class="select select-bordered select-sm w-full"
              >
                <option value="">Seleccionar...</option>
                <option v-for="role in raciList" :key="role" :value="role">{{ role }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Riesgos (ocultable) -->
        <div v-if="visibleFields.riesgos" class="border border-base-300 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <label class="label-text font-medium">⚠️ Riesgos y Controles</label>
            <button @click.stop="emit('hide-field', 'riesgos')" class="btn btn-xs btn-ghost">
              <span class="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          
          <!-- Selector de color de borde -->
          <div class="flex items-center gap-2 mb-3">
            <span class="text-sm font-medium">Color del borde:</span>
            <button
              v-for="option in colorOptions"
              :key="option.color"
              type="button"
              @click.stop="emit('update-field', 'RiesgoColor', option.color)"
              :class="[
                'w-7 h-7 rounded-full border-2 transition-all duration-200 hover:scale-110',
                formData.RiesgoColor === option.color
                  ? 'border-gray-800 shadow-lg ring-2 ring-primary'
                  : 'border-gray-300 hover:border-gray-500'
              ]"
              :style="{ backgroundColor: option.bg }"
              :title="option.name"
            />
            <button
              v-if="formData.RiesgoColor"
              @click.stop="emit('update-field', 'RiesgoColor', '')"
              class="btn btn-xs btn-ghost ml-2"
              title="Quitar color"
            >
              <span class="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          
          <!-- Selector de color de fondo -->
          <div class="flex items-center gap-2 mb-4">
            <span class="text-sm font-medium">Color de fondo:</span>
            <button
              v-for="option in backgroundColorOptions"
              :key="option.color"
              type="button"
              @click.stop="emit('update-field', 'BackgroundColor', option.color)"
              :class="[
                'w-7 h-7 rounded-full border-2 transition-all duration-200 hover:scale-110',
                formData.BackgroundColor === option.color
                  ? 'border-gray-800 shadow-lg ring-2 ring-primary'
                  : 'border-gray-300 hover:border-gray-500'
              ]"
              :style="{ backgroundColor: option.bg }"
              :title="option.name"
            />
            <button
              v-if="formData.BackgroundColor"
              @click.stop="emit('update-field', 'BackgroundColor', '')"
              class="btn btn-xs btn-ghost ml-2"
              title="Quitar color"
            >
              <span class="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="label"><span class="label-text">Riesgos</span></label>
              <textarea
                :value="formData.Riesgos"
                @input="emit('update-field', 'Riesgos', ($event.target as HTMLTextAreaElement).value)"
                class="textarea textarea-bordered w-full"
                rows="3"
                placeholder="Descripción de riesgos..."
              ></textarea>
            </div>
            <div>
              <label class="label"><span class="label-text">Controles</span></label>
              <textarea
                :value="formData.Controller"
                @input="emit('update-field', 'Controller', ($event.target as HTMLTextAreaElement).value)"
                class="textarea textarea-bordered w-full"
                rows="3"
                placeholder="Controles aplicados..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Botones para mostrar campos ocultos -->
        <div class="divider">Agregar más campos</div>
        <div class="flex flex-wrap gap-2">
          <button
            v-if="!visibleFields.tiempos"
            @click.stop="emit('show-field', 'tiempos')"
            class="btn btn-sm btn-outline gap-2"
          >
            <span class="material-symbols-outlined text-sm">schedule</span>
            {{ fieldLabels.tiempos }}
          </button>
          <button
            v-if="!visibleFields.RACI"
            @click.stop="emit('show-field', 'RACI')"
            class="btn btn-sm btn-outline gap-2"
          >
            <span class="material-symbols-outlined text-sm">groups</span>
            {{ fieldLabels.RACI }}
          </button>
          <button
            v-if="!visibleFields.riesgos"
            @click.stop="emit('show-field', 'riesgos')"
            class="btn btn-sm btn-outline gap-2"
          >
            <span class="material-symbols-outlined text-sm">warning</span>
            {{ fieldLabels.riesgos }}
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-action mt-6">
        <button @click.stop="emit('update:isOpen', false)" class="btn btn-ghost gap-2">
          <span class="material-symbols-outlined">close</span>
          Cancelar
        </button>
        <button @click.stop="emit('save')" class="btn btn-primary gap-2">
          <span class="material-symbols-outlined">save</span>
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
