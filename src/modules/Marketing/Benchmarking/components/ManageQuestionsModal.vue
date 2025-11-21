<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { Template, Question, QuestionType, ChartType } from '../types/benchmarkingTypes';

// Props y Emits
const props = defineProps<{
  modelValue: boolean;
  template: Template | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'save-questions', templateId: string, questions: Question[]): void;
}>();

// Lógica Interna del Modal
const modalRef = ref<HTMLDialogElement | null>(null);
const questions = ref<Question[]>([]);
const showQuestionForm = ref(false);
const editingQuestionIndex = ref<number | null>(null);

// Formulario de pregunta
const questionForm = ref<Partial<Question>>({
  text: '',
  type: 'short',
  required: false,
  options: [],
  scaleMin: 1,
  scaleMax: 5,
  chartType: 'none',
  helpText: ''
});

// Tipos de preguntas disponibles
const questionTypes = [
  { value: 'short', label: 'Respuesta Corta', icon: '📝' },
  { value: 'long', label: 'Respuesta Larga', icon: '📄' },
  { value: 'multiple', label: 'Opción Múltiple', icon: '🔘' },
  { value: 'checkbox', label: 'Casillas de Verificación', icon: '☑️' },
  { value: 'scale', label: 'Escala Numérica', icon: '📊' },
  { value: 'stars', label: 'Estrellas', icon: '⭐' },
  { value: 'yesno', label: 'Sí/No', icon: '✓✗' },
  { value: 'date', label: 'Fecha', icon: '📅' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'phone', label: 'Teléfono', icon: '📱' }
];

// Tipos de gráficos
const chartTypes = [
  { value: 'none', label: 'Sin Gráfico' },
  { value: 'pie', label: 'Gráfico de Pastel' },
  { value: 'bar', label: 'Gráfico de Barras' },
  { value: 'line', label: 'Gráfico de Líneas' },
  { value: 'table', label: 'Tabla' },
  { value: 'average', label: 'Promedio' }
];

// Opciones para preguntas de opción múltiple
const optionInput = ref('');

// Computed
const needsOptions = computed(() => 
  questionForm.value.type === 'multiple' || questionForm.value.type === 'checkbox'
);

const needsScale = computed(() => 
  questionForm.value.type === 'scale'
);

const isFormValid = computed(() => {
  if (!questionForm.value.text?.trim()) return false;
  if (needsOptions.value && (!questionForm.value.options || questionForm.value.options.length < 2)) return false;
  return true;
});

// Cargar preguntas de la plantilla
const loadQuestions = () => {
  if (props.template && props.template.questions) {
    questions.value = [...props.template.questions];
  } else {
    questions.value = [];
  }
};

// Resetear formulario
const resetQuestionForm = () => {
  questionForm.value = {
    text: '',
    type: 'short',
    required: false,
    options: [],
    scaleMin: 1,
    scaleMax: 5,
    chartType: 'none',
    helpText: ''
  };
  optionInput.value = '';
  editingQuestionIndex.value = null;
};

// Agregar opción
const addOption = () => {
  if (optionInput.value.trim()) {
    if (!questionForm.value.options) {
      questionForm.value.options = [];
    }
    questionForm.value.options.push(optionInput.value.trim());
    optionInput.value = '';
  }
};

// Eliminar opción
const removeOption = (index: number) => {
  questionForm.value.options?.splice(index, 1);
};

// Abrir formulario para nueva pregunta
const openNewQuestionForm = () => {
  resetQuestionForm();
  showQuestionForm.value = true;
};

// Abrir formulario para editar pregunta
const editQuestion = (index: number) => {
  const question = questions.value[index];
  questionForm.value = {
    text: question.text,
    type: question.type,
    required: question.required,
    options: question.options ? [...question.options] : [],
    scaleMin: question.scaleMin || 1,
    scaleMax: question.scaleMax || 5,
    chartType: question.chartType,
    helpText: question.helpText || ''
  };
  editingQuestionIndex.value = index;
  showQuestionForm.value = true;
};

// Guardar pregunta (nueva o editada)
const saveQuestion = () => {
  if (!isFormValid.value) return;

  const newQuestion: Question = {
    id: editingQuestionIndex.value !== null 
      ? questions.value[editingQuestionIndex.value].id 
      : `q_${Date.now()}`,
    text: questionForm.value.text!,
    type: questionForm.value.type as QuestionType,
    required: questionForm.value.required || false,
    chartType: questionForm.value.chartType as ChartType,
    order: editingQuestionIndex.value !== null 
      ? questions.value[editingQuestionIndex.value].order 
      : questions.value.length,
    helpText: questionForm.value.helpText
  };

  // Agregar campos específicos según el tipo
  if (needsOptions.value) {
    newQuestion.options = questionForm.value.options;
  }
  if (needsScale.value) {
    newQuestion.scaleMin = questionForm.value.scaleMin;
    newQuestion.scaleMax = questionForm.value.scaleMax;
  }

  if (editingQuestionIndex.value !== null) {
    // Editar pregunta existente
    questions.value[editingQuestionIndex.value] = newQuestion;
  } else {
    // Agregar nueva pregunta
    questions.value.push(newQuestion);
  }

  showQuestionForm.value = false;
  resetQuestionForm();
};

// Cancelar edición
const cancelQuestionForm = () => {
  showQuestionForm.value = false;
  resetQuestionForm();
};

// Eliminar pregunta
const deleteQuestion = (index: number) => {
  if (confirm('¿Estás seguro de eliminar esta pregunta?')) {
    questions.value.splice(index, 1);
    // Reordenar
    questions.value.forEach((q, i) => {
      q.order = i;
    });
  }
};

// Mover pregunta arriba
const moveQuestionUp = (index: number) => {
  if (index > 0) {
    const temp = questions.value[index];
    questions.value[index] = questions.value[index - 1];
    questions.value[index - 1] = temp;
    // Actualizar orden
    questions.value.forEach((q, i) => {
      q.order = i;
    });
  }
};

// Mover pregunta abajo
const moveQuestionDown = (index: number) => {
  if (index < questions.value.length - 1) {
    const temp = questions.value[index];
    questions.value[index] = questions.value[index + 1];
    questions.value[index + 1] = temp;
    // Actualizar orden
    questions.value.forEach((q, i) => {
      q.order = i;
    });
  }
};

// Guardar todas las preguntas
const saveAllQuestions = () => {
  if (props.template) {
    emit('save-questions', props.template.id, questions.value);
    closeModal();
  }
};

// Cerrar modal
const closeModal = () => {
  showQuestionForm.value = false;
  resetQuestionForm();
  emit('update:modelValue', false);
};

// Sincronización con <dialog>
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    loadQuestions();
    modalRef.value?.showModal();
  } else {
    modalRef.value?.close();
  }
});

// Watch para limpiar opciones cuando cambia el tipo
watch(() => questionForm.value.type, (newType) => {
  if (newType !== 'multiple' && newType !== 'checkbox') {
    questionForm.value.options = [];
  }
});
</script>

<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box w-11/12 max-w-5xl max-h-[90vh] flex flex-col">
      <h3 class="font-bold text-2xl mb-2">Gestionar Preguntas</h3>
      <p class="text-sm text-base-content/70 mb-4">
        Plantilla: <span class="font-semibold">{{ template?.name }}</span>
      </p>

      <!-- Lista de Preguntas -->
      <div v-if="!showQuestionForm" class="flex-1 overflow-y-auto space-y-4">
        <!-- Sin preguntas -->
        <div v-if="questions.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">❓</div>
          <h4 class="text-lg font-semibold mb-2">No hay preguntas</h4>
          <p class="text-sm text-gray-500 mb-6">
            Agrega preguntas para completar tu plantilla de benchmarking
          </p>
        </div>

        <!-- Lista de preguntas -->
        <div v-else class="space-y-3">
          <div 
            v-for="(question, index) in questions" 
            :key="question.id"
            class="card bg-base-200 shadow-sm"
          >
            <div class="card-body p-4">
              <div class="flex items-start gap-3">
                <!-- Número de pregunta -->
                <div class="badge badge-primary badge-lg">{{ index + 1 }}</div>
                
                <!-- Contenido de la pregunta -->
                <div class="flex-1">
                  <h5 class="font-semibold text-base mb-1">{{ question.text }}</h5>
                  <div class="flex flex-wrap gap-2 text-xs">
                    <span class="badge badge-outline">{{ questionTypes.find(t => t.value === question.type)?.label }}</span>
                    <span v-if="question.required" class="badge badge-error badge-outline">Obligatoria</span>
                    <span v-if="question.options && question.options.length > 0" class="badge badge-info badge-outline">
                      {{ question.options.length }} opciones
                    </span>
                    <span v-if="question.chartType !== 'none'" class="badge badge-success badge-outline">
                      {{ chartTypes.find(c => c.value === question.chartType)?.label }}
                    </span>
                  </div>
                  <p v-if="question.helpText" class="text-xs text-gray-500 mt-2">
                    💡 {{ question.helpText }}
                  </p>
                </div>

                <!-- Acciones -->
                <div class="flex gap-1">
                  <button 
                    class="btn btn-xs btn-ghost"
                    @click="moveQuestionUp(index)"
                    :disabled="index === 0"
                    title="Mover arriba"
                  >
                    ↑
                  </button>
                  <button 
                    class="btn btn-xs btn-ghost"
                    @click="moveQuestionDown(index)"
                    :disabled="index === questions.length - 1"
                    title="Mover abajo"
                  >
                    ↓
                  </button>
                  <button 
                    class="btn btn-xs btn-primary"
                    @click="editQuestion(index)"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button 
                    class="btn btn-xs btn-error"
                    @click="deleteQuestion(index)"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón agregar pregunta -->
        <button 
          class="btn btn-outline btn-primary w-full gap-2"
          @click="openNewQuestionForm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Agregar Pregunta
        </button>
      </div>

      <!-- Formulario de Pregunta -->
      <div v-else class="flex-1 overflow-y-auto space-y-4">
        <div class="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ editingQuestionIndex !== null ? 'Editando pregunta' : 'Nueva pregunta' }}</span>
        </div>

        <!-- Texto de la pregunta -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Pregunta *</span>
          </label>
          <textarea
            v-model="questionForm.text"
            placeholder="Escribe tu pregunta aquí..."
            class="textarea textarea-bordered"
            rows="2"
          ></textarea>
        </div>

        <!-- Tipo de pregunta -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Tipo de Pregunta *</span>
          </label>
          <select v-model="questionForm.type" class="select select-bordered">
            <option v-for="type in questionTypes" :key="type.value" :value="type.value">
              {{ type.icon }} {{ type.label }}
            </option>
          </select>
        </div>

        <!-- Opciones (para multiple/checkbox) -->
        <div v-if="needsOptions" class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Opciones * (mínimo 2)</span>
          </label>
          <div class="join mb-2">
            <input
              v-model="optionInput"
              type="text"
              placeholder="Escribe una opción"
              class="input input-bordered join-item flex-1"
              @keyup.enter="addOption"
            />
            <button class="btn btn-primary join-item" @click="addOption">
              Agregar
            </button>
          </div>
          <div v-if="questionForm.options && questionForm.options.length > 0" class="space-y-2">
            <div 
              v-for="(option, index) in questionForm.options" 
              :key="index"
              class="flex items-center gap-2 bg-base-200 p-2 rounded"
            >
              <span class="badge">{{ index + 1 }}</span>
              <span class="flex-1">{{ option }}</span>
              <button class="btn btn-xs btn-error" @click="removeOption(index)">✕</button>
            </div>
          </div>
        </div>

        <!-- Escala (para scale) -->
        <div v-if="needsScale" class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Valor Mínimo</span>
            </label>
            <input
              v-model.number="questionForm.scaleMin"
              type="number"
              class="input input-bordered"
              min="0"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Valor Máximo</span>
            </label>
            <input
              v-model.number="questionForm.scaleMax"
              type="number"
              class="input input-bordered"
              min="1"
            />
          </div>
        </div>

        <!-- Tipo de gráfico -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Tipo de Gráfico</span>
          </label>
          <select v-model="questionForm.chartType" class="select select-bordered">
            <option v-for="chart in chartTypes" :key="chart.value" :value="chart.value">
              {{ chart.label }}
            </option>
          </select>
        </div>

        <!-- Texto de ayuda -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Texto de Ayuda (Opcional)</span>
          </label>
          <input
            v-model="questionForm.helpText"
            type="text"
            placeholder="Texto adicional para ayudar al usuario"
            class="input input-bordered"
          />
        </div>

        <!-- Obligatoria -->
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-3">
            <input
              v-model="questionForm.required"
              type="checkbox"
              class="checkbox checkbox-primary"
            />
            <span class="label-text font-semibold">Pregunta Obligatoria</span>
          </label>
        </div>

        <!-- Botones del formulario -->
        <div class="flex gap-2">
          <button class="btn btn-ghost flex-1" @click="cancelQuestionForm">
            Cancelar
          </button>
          <button 
            class="btn btn-primary flex-1" 
            @click="saveQuestion"
            :disabled="!isFormValid"
          >
            {{ editingQuestionIndex !== null ? 'Actualizar' : 'Agregar' }} Pregunta
          </button>
        </div>
      </div>

      <!-- Acciones del modal -->
      <div class="modal-action mt-4">
        <button class="btn btn-ghost" @click="closeModal">Cancelar</button>
        <button 
          v-if="!showQuestionForm"
          class="btn btn-primary gap-2" 
          @click="saveAllQuestions"
          :disabled="questions.length === 0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
          </svg>
          Guardar Preguntas ({{ questions.length }})
        </button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>

<style scoped>
.modal-box {
  max-height: 90vh;
}
</style>
