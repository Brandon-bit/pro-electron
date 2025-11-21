<script setup lang="ts">
import { ref } from 'vue';
import { useEmailingStore } from '@/store/emailing';
import type { CreateContactoRequest } from '@/modules/Marketing/Emailing/types/emailingTypes';

const props = defineProps<{
  modelValue: boolean;
  idLista: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'imported'): void;
}>();

const emailStore = useEmailingStore();
const csvText = ref('');
const contactosParsed = ref<CreateContactoRequest[]>([]);
const showPreview = ref(false);
const parseError = ref('');

// Parsear CSV
const parseCSV = () => {
  try {
    parseError.value = '';
    const lines = csvText.value.trim().split('\n');
    
    if (lines.length < 2) {
      parseError.value = 'El archivo CSV debe tener al menos un encabezado y una fila de datos';
      return;
    }
    
    const contacts: CreateContactoRequest[] = [];
    
    // Saltar la primera línea (encabezado)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Saltar líneas vacías
      
      const parts = line.split(',').map(part => part.trim());
      const [email, nombre, apellido, telefono, empresa, cargo] = parts;
      
      if (email) {
        contacts.push({
          email,
          nombre: nombre || undefined,
          apellido: apellido || undefined,
          telefono: telefono || undefined,
          empresa: empresa || undefined,
          cargo: cargo || undefined
        });
      }
    }
    
    if (contacts.length === 0) {
      parseError.value = 'No se encontraron contactos válidos en el CSV';
      return;
    }
    
    contactosParsed.value = contacts;
    showPreview.value = true;
  } catch (error) {
    parseError.value = 'Error al parsear el CSV. Verifica el formato.';
    console.error('Error parsing CSV:', error);
  }
};

const handleImport = async () => {
  if (!props.idLista) {
    alert('No se ha seleccionado una lista');
    return;
  }

  try {
    const result = await emailStore.importContactos(props.idLista, contactosParsed.value);
    
    if (result && result.data) {
      alert(`Importación completada:\n${result.data.insertados || 0} contactos insertados\n${result.data.duplicados || 0} duplicados omitidos`);
    } else {
      alert('Contactos importados exitosamente');
    }
    
    // Emitir evento de importación exitosa
    emit('imported');
    closeModal();
  } catch (error) {
    console.error('Error al importar contactos:', error);
    alert('Error al importar contactos. Por favor, intenta de nuevo.');
  }
};

const closeModal = () => {
  csvText.value = '';
  contactosParsed.value = [];
  showPreview.value = false;
  parseError.value = '';
  emit('update:modelValue', false);
};

const volver = () => {
  showPreview.value = false;
  parseError.value = '';
};
</script>

<template>
  <div class="modal" :class="{'modal-open': modelValue}">
    <div class="modal-box w-11/12 max-w-5xl">
      <h3 class="font-bold text-lg">Importar Contactos desde CSV</h3>

      <div v-if="!showPreview" class="space-y-4 mt-4">
        <div class="alert alert-info">
          <span class="text-sm">
            <strong>Formato esperado (CSV):</strong><br>
            email,nombre,apellido,telefono,empresa,cargo<br>
            <small class="text-xs">La primera línea debe ser el encabezado y será ignorada.</small>
          </span>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Pega o escribe tu CSV aquí:</span>
          </label>
          <textarea
            v-model="csvText"
            class="textarea textarea-bordered w-full h-64 font-mono text-xs"
            placeholder="email,nombre,apellido,telefono,empresa,cargo
juan@example.com,Juan,Pérez,555-1234,Acme Inc,Gerente
maria@example.com,María,López,555-5678,Tech Corp,Directora"
          ></textarea>
          
          <div v-if="parseError" class="alert alert-error mt-2">
            <span class="text-sm">{{ parseError }}</span>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn btn-ghost" @click="closeModal">Cancelar</button>
          <button 
            class="btn btn-primary" 
            @click="parseCSV"
            :disabled="!csvText.trim()"
          >
            Parsear y Previsualizar
          </button>
        </div>
      </div>

      <div v-else class="space-y-4 mt-4">
        <div class="alert alert-success">
          <span>Se importarán {{ contactosParsed.length }} contactos</span>
        </div>

        <div class="overflow-x-auto max-h-96">
          <table class="table table-sm table-zebra">
            <thead class="sticky top-0 bg-base-200 z-10">
              <tr>
                <th class="w-8">#</th>
                <th>Email</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Empresa</th>
                <th>Cargo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(contacto, idx) in contactosParsed" :key="idx">
                <td>{{ idx + 1 }}</td>
                <td class="font-mono text-xs">{{ contacto.email }}</td>
                <td>{{ contacto.nombre }}</td>
                <td>{{ contacto.apellido }}</td>
                <td>{{ contacto.telefono }}</td>
                <td>{{ contacto.empresa }}</td>
                <td>{{ contacto.cargo }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal-action">
          <button class="btn btn-ghost" @click="volver">← Volver</button>
          <button class="btn btn-primary" @click="handleImport">
            Confirmar Importación
          </button>
        </div>
      </div>
    </div>

    <!-- Backdrop clickeable para cerrar -->
    <div class="modal-backdrop" @click="closeModal"></div>
  </div>
</template>
