<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import useSocialStore from '@/modules/Marketing/CordinadorRedesSociales/store/useSocialPostStore';
import type { SocialPostFormType, PlatformSpecificData } from '../types/socialPostTypes';
import SocialNetworkSelector from './SocialNetworkSelector.vue';
import FacebookOptions from './platforms/FacebookOptions.vue';
import InstagramOptions from './platforms/InstagramOptions.vue';
import TikTokOptions from './platforms/TikTokOptions.vue';
import YouTubeOptions from './platforms/YouTubeOptions.vue';
import TwitterOptions from './platforms/TwitterOptions.vue';
import LinkedInOptions from './platforms/LinkedInOptions.vue';

const socialStore = useSocialStore();

const emit = defineEmits<{
  (e: 'submit', values: SocialPostFormType): void;
}>();

// Estado del formulario
const formData = ref<SocialPostFormType>({
  postContent: '',
  scheduleDate: new Date().toISOString().split('T')[0],
  status: 'draft',
  shortenLinks: false,
  selectedPlatforms: [],
  mediaFiles: [],
  platformData: {}
});

const mediaPreview = ref<string[]>([]);

// Inicializar datos de plataforma cuando se selecciona una red
watch(() => formData.value.selectedPlatforms, (newPlatforms, oldPlatforms) => {
  // Agregar configuración por defecto para nuevas plataformas
  newPlatforms.forEach(platform => {
    if (!formData.value.platformData[platform]) {
      formData.value.platformData[platform] = getDefaultPlatformData(platform);
    }
  });
  
  // Remover configuración de plataformas deseleccionadas
  if (oldPlatforms) {
    oldPlatforms.forEach(platform => {
      if (!newPlatforms.includes(platform)) {
        delete formData.value.platformData[platform];
      }
    });
  }
}, { deep: true });

const getDefaultPlatformData = (platform: string): PlatformSpecificData => {
  const defaults: { [key: string]: PlatformSpecificData } = {
    facebook: { facebookPostType: 'regular' },
    instagram: { instagramPostType: 'feed', instagramReelShareToFeed: false },
    tiktok: { tikTokPrivacyLevel: 'public', tikTokCommentDisabled: false, tikTokDuetDisabled: false, tikTokStitchDisabled: false },
    youtube: { youTubeVisibility: 'public', youTubeShorts: false, youTubeTitle: '' },
    twitter: {},
    linkedin: { linkedInVisibility: 'public' },
    telegram: { telegramSilentNotification: false, telegramParseMode: 'Markdown' },
    reddit: {},
    gmb: { googleTopicType: 'standard' }
  };
  return defaults[platform] || {};
};

// Manejo de archivos multimedia
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const filesArray = Array.from(target.files);
    formData.value.mediaFiles = filesArray;
    
    // Generar previews
    mediaPreview.value = [];
    filesArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          mediaPreview.value.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }
};

const removeMedia = (index: number) => {
  formData.value.mediaFiles.splice(index, 1);
  mediaPreview.value.splice(index, 1);
};

// Validación
const isFormValid = computed(() => {
  return (
    formData.value.postContent.trim() !== '' &&
    formData.value.selectedPlatforms.length > 0 &&
    formData.value.scheduleDate !== ''
  );
});

// Submit
const onSubmit = () => {
  if (!isFormValid.value) {
    alert('Por favor completa todos los campos requeridos');
    return;
  }
  
  console.log('Datos del formulario:', formData.value);
  emit('submit', formData.value);
};

// Observar cambios en el post seleccionado (para edición)
watch(() => socialStore.selectedPost, (currentPost) => {
  if (currentPost && currentPost.id) {
    // Modo edición
    formData.value = {
      postContent: currentPost.postContent || '',
      scheduleDate: currentPost.scheduleDate 
        ? new Date(currentPost.scheduleDate).toISOString().split('T')[0] 
        : new Date().toISOString().split('T')[0],
      status: (currentPost.status as any) || 'draft',
      shortenLinks: currentPost.shortenLinks || false,
      selectedPlatforms: currentPost.mktPostPlatforms?.map(p => p.platformName) || [],
      mediaFiles: [],
      mediaUrls: currentPost.mktPostMedias?.map(m => m.mediaUrl) || [],
      platformData: {}
    };
    
    // Reconstruir platformData desde mktPostPlatforms
    currentPost.mktPostPlatforms?.forEach(platform => {
      if (platform.platformSpecificData) {
        formData.value.platformData[platform.platformName] = platform.platformSpecificData;
      }
    });
  } else {
    // Modo creación - resetear
    formData.value = {
      postContent: '',
      scheduleDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      shortenLinks: false,
      selectedPlatforms: [],
      mediaFiles: [],
      platformData: {}
    };
    mediaPreview.value = [];
  }
}, { deep: true, immediate: true });

defineExpose({
  submitForm: onSubmit
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Contenido del Post -->
    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium">Contenido de la Publicación</span>
        <span class="label-text-alt text-error">*Requerido</span>
      </label>
      <textarea
        v-model="formData.postContent"
        class="textarea textarea-bordered h-32"
        placeholder="¿Qué quieres compartir?"
        maxlength="5000"
      ></textarea>
      <label class="label">
        <span class="label-text-alt">{{ formData.postContent.length }}/5000 caracteres</span>
      </label>
    </div>

    <!-- Selector de Redes Sociales -->
    <SocialNetworkSelector v-model="formData.selectedPlatforms" />

    <!-- Opciones Específicas por Plataforma -->
    <div v-if="formData.selectedPlatforms.length > 0" class="space-y-4">
      <div class="divider">Opciones Adicionales</div>
      
      <FacebookOptions
        v-if="formData.selectedPlatforms.includes('facebook')"
        v-model="formData.platformData.facebook"
      />
      
      <InstagramOptions
        v-if="formData.selectedPlatforms.includes('instagram')"
        v-model="formData.platformData.instagram"
      />
      
      <TikTokOptions
        v-if="formData.selectedPlatforms.includes('tiktok')"
        v-model="formData.platformData.tiktok"
      />
      
      <YouTubeOptions
        v-if="formData.selectedPlatforms.includes('youtube')"
        v-model="formData.platformData.youtube"
      />
      
      <TwitterOptions
        v-if="formData.selectedPlatforms.includes('twitter')"
        v-model="formData.platformData.twitter"
      />
      
      <LinkedInOptions
        v-if="formData.selectedPlatforms.includes('linkedin')"
        v-model="formData.platformData.linkedin"
      />
    </div>

    <!-- Archivos Multimedia -->
    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium">Imágenes o Videos</span>
      </label>
      <input
        type="file"
        @change="handleFileChange"
        accept="image/*,video/*"
        multiple
        class="file-input file-input-bordered w-full"
      />
      <label class="label">
        <span class="label-text-alt">Puedes seleccionar múltiples archivos</span>
      </label>
      
      <!-- Preview de medios -->
      <div v-if="mediaPreview.length > 0" class="grid grid-cols-3 gap-2 mt-4">
        <div v-for="(preview, index) in mediaPreview" :key="index" class="relative">
          <img :src="preview" class="w-full h-24 object-cover rounded" />
          <button
            type="button"
            @click="removeMedia(index)"
            class="btn btn-circle btn-xs btn-error absolute -top-2 -right-2"
          >
            ✕
          </button>
        </div>
      </div>
      
      <!-- Mostrar URLs existentes en modo edición -->
      <div v-if="formData.mediaUrls && formData.mediaUrls.length > 0" class="grid grid-cols-3 gap-2 mt-4">
        <div v-for="(url, index) in formData.mediaUrls" :key="index" class="relative">
          <img :src="url" class="w-full h-24 object-cover rounded" />
          <div class="badge badge-sm badge-info absolute top-1 left-1">Existente</div>
        </div>
      </div>
    </div>

    <!-- Fecha de Programación -->
    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium">Fecha de Publicación</span>
        <span class="label-text-alt text-error">*Requerido</span>
      </label>
      <input
        v-model="formData.scheduleDate"
        type="datetime-local"
        class="input input-bordered w-full"
      />
    </div>

    <!-- Estado -->
    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium">Estado</span>
      </label>
      <select v-model="formData.status" class="select select-bordered w-full">
        <option value="draft">Borrador</option>
        <option value="scheduled">Programado</option>
        <option value="published">Publicado</option>
        <option value="archived">Archivado</option>
      </select>
    </div>

    <!-- Opciones Adicionales -->
    <div class="form-control">
      <label class="label cursor-pointer justify-start gap-3">
        <input
          v-model="formData.shortenLinks"
          type="checkbox"
          class="checkbox checkbox-primary"
        />
        <div>
          <span class="label-text font-medium">Acortar enlaces automáticamente</span>
          <p class="text-xs text-gray-500">Los enlaces en el contenido se acortarán usando un servicio de URL corta</p>
        </div>
      </label>
    </div>

    <!-- Botón de Submit -->
    <div class="flex justify-end gap-2 pt-4 border-t">
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!isFormValid"
      >
        <span class="material-symbols-outlined">save</span>
        Guardar Publicación
      </button>
    </div>
  </form>
</template>