<script setup lang="ts">
import { computed } from 'vue';
import type { Question } from '../types/benchmarkingTypes';

interface Props {
  questions: Question[];
  modelValue: Record<string, any>;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false
});

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>];
}>();

const responses = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Ordenar preguntas por orden
const sortedQuestions = computed(() => {
  return [...props.questions].sort((a, b) => a.order - b.order);
});

// Funciones helper
function updateResponse(questionId: string, value: any) {
  responses.value = {
    ...responses.value,
    [questionId]: value
  };
}

function toggleCheckbox(questionId: string, option: string) {
  if (!responses.value[questionId]) {
    responses.value[questionId] = [];
  }
  
  const currentValues = [...(responses.value[questionId] || [])];
  const index = currentValues.indexOf(option);
  
  if (index > -1) {
    currentValues.splice(index, 1);
  } else {
    currentValues.push(option);
  }
  
  updateResponse(questionId, currentValues);
}

function isChecked(questionId: string, option: string): boolean {
  return responses.value[questionId]?.includes(option) || false;
}
</script>

<template>
  <div class="space-y-6">
    <div 
      v-for="question in sortedQuestions" 
      :key="question.id" 
      class="question-item p-4 bg-base-200 rounded-lg"
    >
      <!-- Question Label -->
      <label class="block mb-3">
        <span class="text-lg font-medium">
          {{ question.text }}
          <span v-if="question.required" class="text-error ml-1">*</span>
        </span>
        <p v-if="question.helpText" class="text-sm text-gray-500 mt-1">
          {{ question.helpText }}
        </p>
      </label>
      
      <!-- Short Text Input -->
      <input 
        v-if="question.type === 'short'"
        :value="responses[question.id] || ''"
        @input="updateResponse(question.id, ($event.target as HTMLInputElement).value)"
        type="text"
        class="input input-bordered w-full"
        :required="question.required"
        :readonly="readonly"
        placeholder="Escribe tu respuesta..."
      />
      
      <!-- Long Text (Textarea) -->
      <textarea 
        v-else-if="question.type === 'long'"
        :value="responses[question.id] || ''"
        @input="updateResponse(question.id, ($event.target as HTMLTextAreaElement).value)"
        class="textarea textarea-bordered w-full"
        :required="question.required"
        :readonly="readonly"
        rows="4"
        placeholder="Escribe tu respuesta detallada..."
      />
      
      <!-- Stars Rating -->
      <div v-else-if="question.type === 'stars'" class="flex items-center gap-2">
        <div class="rating rating-lg">
          <input 
            v-for="star in (question.scaleMax || 5)" 
            :key="star"
            type="radio" 
            :name="`rating-${question.id}`" 
            class="mask mask-star-2 bg-orange-400"
            :checked="responses[question.id] === star"
            @change="updateResponse(question.id, star)"
            :disabled="readonly"
          />
        </div>
        <span v-if="responses[question.id]" class="text-sm text-gray-600">
          {{ responses[question.id] }} / {{ question.scaleMax || 5 }}
        </span>
      </div>
      
      <!-- Numeric Scale (Slider) -->
      <div v-else-if="question.type === 'scale'" class="space-y-2">
        <input 
          type="range"
          :value="responses[question.id] || question.scaleMin || 1"
          @input="updateResponse(question.id, Number(($event.target as HTMLInputElement).value))"
          :min="question.scaleMin || 1"
          :max="question.scaleMax || 10"
          class="range range-primary"
          :disabled="readonly"
        />
        <div class="flex justify-between text-xs text-gray-600">
          <span>{{ question.scaleMin || 1 }}</span>
          <span class="font-bold text-lg">{{ responses[question.id] || question.scaleMin || 1 }}</span>
          <span>{{ question.scaleMax || 10 }}</span>
        </div>
      </div>
      
      <!-- Yes/No Radio -->
      <div v-else-if="question.type === 'yesno'" class="flex gap-4">
        <label class="cursor-pointer label">
          <input 
            type="radio" 
            :name="`yesno-${question.id}`"
            class="radio radio-primary mr-2"
            :checked="responses[question.id] === true"
            @change="updateResponse(question.id, true)"
            :disabled="readonly"
          />
          <span class="label-text">Sí</span>
        </label>
        <label class="cursor-pointer label">
          <input 
            type="radio" 
            :name="`yesno-${question.id}`"
            class="radio radio-primary mr-2"
            :checked="responses[question.id] === false"
            @change="updateResponse(question.id, false)"
            :disabled="readonly"
          />
          <span class="label-text">No</span>
        </label>
      </div>
      
      <!-- Multiple Choice (Select/Radio) -->
      <select 
        v-else-if="question.type === 'multiple'"
        :value="responses[question.id] || ''"
        @change="updateResponse(question.id, ($event.target as HTMLSelectElement).value)"
        class="select select-bordered w-full"
        :required="question.required"
        :disabled="readonly"
      >
        <option value="">Selecciona una opción</option>
        <option 
          v-for="option in question.options" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      
      <!-- Checkbox (Multiple Selection) -->
      <div v-else-if="question.type === 'checkbox'" class="space-y-2">
        <label 
          v-for="option in question.options" 
          :key="option"
          class="cursor-pointer label justify-start gap-2"
        >
          <input 
            type="checkbox"
            class="checkbox checkbox-primary"
            :checked="isChecked(question.id, option)"
            @change="toggleCheckbox(question.id, option)"
            :disabled="readonly"
          />
          <span class="label-text">{{ option }}</span>
        </label>
      </div>
      
      <!-- Email Input -->
      <input 
        v-else-if="question.type === 'email'"
        :value="responses[question.id] || ''"
        @input="updateResponse(question.id, ($event.target as HTMLInputElement).value)"
        type="email"
        class="input input-bordered w-full"
        :required="question.required"
        :readonly="readonly"
        placeholder="correo@ejemplo.com"
      />
      
      <!-- Phone Input -->
      <input 
        v-else-if="question.type === 'phone'"
        :value="responses[question.id] || ''"
        @input="updateResponse(question.id, ($event.target as HTMLInputElement).value)"
        type="tel"
        class="input input-bordered w-full"
        :required="question.required"
        :readonly="readonly"
        placeholder="+52 123 456 7890"
      />
      
      <!-- Date Input -->
      <input 
        v-else-if="question.type === 'date'"
        :value="responses[question.id] || ''"
        @input="updateResponse(question.id, ($event.target as HTMLInputElement).value)"
        type="date"
        class="input input-bordered w-full"
        :required="question.required"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<style scoped>
.question-item {
  transition: all 0.2s ease;
}

.question-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
</style>
