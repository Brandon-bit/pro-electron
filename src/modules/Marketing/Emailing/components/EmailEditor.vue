<script setup lang="ts">
import { ref } from 'vue';
import Editor from '@tinymce/tinymce-vue';

// Props
const props = defineProps<{
  modelValue: string;
  apiKey: string;
}>();

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// Configuración del editor
const editorConfig = ref({
  height: 400,
  menubar: true,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
  ],
  toolbar: 'undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});

// Handler para cambios en el editor
const handleEditorChange = (content: string) => {
  emit('update:modelValue', content);
};
</script>

<template>
  <!-- Componente dedicado para el Editor TinyMCE -->
  <div class="email-editor-wrapper">
    <Editor
      :api-key="apiKey"
      :model-value="modelValue"
      :init="editorConfig"
      @update:model-value="handleEditorChange"
    />
  </div>
</template>

<style scoped>
.email-editor-wrapper {
  width: 100%;
  margin: 1rem 0;
}
</style>
