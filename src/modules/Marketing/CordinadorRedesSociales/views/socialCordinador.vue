<script setup lang="ts">
import { onMounted, ref, watch,computed } from 'vue';
import { getBrandsByAccountService } from '@/modules/Marketing/GestionMarcas/services/brandServices';
import type { Brand } from '@/modules/Marketing/GestionMarcas/types/brandTypes';

import useSocialStore from '../store/useSocialPostStore'; 
import { useSocialPostActions } from '../composables/useSocialActions'; 
import { useStatusBadge } from '../composables/useSocialStatus'; 
import { useModalStore } from '@/shared/stores/modal.store';
import BaseModal from '@/shared/components/BaseModal.vue';
import AddEditSocialPostForm from '../components/socialPostForm.vue'; 
import BaseCalendar from '@/shared/components/BaseCalendar.vue';
import type { SocialPost, SocialPostFormType } from '../types/socialPostTypes';
import BaseTitle from '@/shared/components/BaseTitle.vue';

const formRef = ref<{ submitForm: () => void } | null>(null);
const socialStore = useSocialStore();
const modalStore = useModalStore();
const { getPosts, createPost } = useSocialPostActions();
const { getBadgeProps } = useStatusBadge();

// 2. Refs para manejar el estado de la vista
const posts = ref<SocialPost[]>([]);
const brands = ref<Brand[]>([]);
const selectedBrandId = ref<number | null>(null);
const isSubmitting = ref(false);
const selectedDate = ref(new Date());

// 3. Función para cargar los datos
const highlightedDates = computed(() => {
  // Obtiene el inicio del día de hoy (para filtrar fechas pasadas)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return posts.value
    .map(post => {
      // Intenta convertir el scheduleDate a un objeto Date
      try {
        // Devuelve un objeto Date si scheduleDate existe, si no, null
        return post.scheduleDate ? new Date(post.scheduleDate) : null;
      } catch (e) {
        console.error("Error al parsear scheduleDate:", post.scheduleDate, e);
        return null; // Devuelve null si la conversión falla
      }
    })
    .filter(date => {
      // Filtra para mantener solo fechas válidas que sean hoy o futuras
      // - date instanceof Date: Asegura que sea un objeto Date
      // - !isNaN(date.getTime()): Asegura que la fecha sea válida (no "Invalid Date")
      // - date >= today: Asegura que sea hoy o en el futuro
      return date instanceof Date && !isNaN(date.getTime()) && date >= today;
    }) as Date[]; // Asegura que el tipo final sea Date[]
});

const fetchBrands = async () => {
  // El backend obtiene el ID de cuenta desde los claims del token
  const result = await getBrandsByAccountService();
  
  if (result.success && result.data) {
    brands.value = result.data.items;
    // Selecciona la primera marca por defecto
    if (brands.value.length > 0) {
      selectedBrandId.value = brands.value[0].id;
    }
  } else {
    console.error("No se pudieron cargar las marcas:", result.message);
  }
};
const fetchData = async (brandId: number | null) => {
  if (!brandId) {
    posts.value = [];
    return;
  }

  // Asegúrate de que 'getPosts' (de tu composable) llame correctamente
  // al servicio y devuelva el array 'items' de la respuesta de la API.
  const response = await getPosts(brandId, 1,1); // Asumiendo página 1 por ahora

  // Asigna directamente los 'items' si la estructura es la esperada
  posts.value = response.items || [];
};

onMounted(() => {
  fetchBrands(); // Carga las marcas. El 'watch' cargará los posts.
});

watch(selectedBrandId, (newBrandId) => {
  fetchData(newBrandId);
});

const openCreateModal = () => {
  const initialData = { 
    ...socialStore.selectedPost, 
    date: selectedDate.value.toISOString().split('T')[0],
    idMarca: selectedBrandId.value // <-- AÑADIDO: Pasa la marca seleccionada
  };
  socialStore.setData(initialData as SocialPost);
  modalStore.open(socialStore.modalId, {
    type: 'CREATE',
    title: 'Nueva Publicación'
  });
};

const openEditModal = (post: SocialPost) => {
  socialStore.setData(post);
  modalStore.open(socialStore.modalId, {
    type: 'EDIT',
    title: 'Editar Publicación'
  });
};

const openDeleteModal = (post: SocialPost) => {
  socialStore.setData(post);
  modalStore.open(socialStore.modalId, {
    type: 'DELETE',
    title: 'Eliminar Publicación'
  });
};

// 5. El manejador de envío del formulario, ahora más robusto
const savePost = async (formDataFromModal?: SocialPostFormType) => { 
    // Añadimos un console.log para ver si los datos llegan aquí
    console.log("savePost: Datos recibidos:", formDataFromModal);

    // Si BaseModal no pasa datos, necesitamos llamar al submit del form
    if (!formDataFromModal) {
        if (formRef.value) {
            console.log("savePost: Llamando a submitForm del hijo...");
            formRef.value.submitForm(); // Esto hará que el form emita @submit
            return; // Esperamos a que el emit llame de nuevo a savePost CON datos
        } else {
            console.error("savePost: No se encontró la ref del formulario.");
            isSubmitting.value = false;
            return;
        }
    }
    
    // --- Si llegamos aquí, formDataFromModal SÍ tiene datos ---
    console.log("savePost: Procesando datos del formulario:", formDataFromModal);
    isSubmitting.value = true; // Mover el isSubmitting aquí
    try {
        // El backend obtiene el accountId desde los claims del token JWT
        const modalState = modalStore.modals[socialStore.modalId];
        
        if (modalState?.type === 'CREATE') {
             await createPost(
                formDataFromModal,
                selectedBrandId.value!
            );
        }
        // ...
        modalStore.close(socialStore.modalId);
        await fetchData(selectedBrandId.value); 

    } catch (error: any) {
        console.error("Error al procesar la acción:", error);
        // ... (manejo de error) ...
    } finally {
        isSubmitting.value = false;
    }
};

const handleClose = () => {
  socialStore.setData(); 
};

const handleSubmit = async () => {
  await savePost();
};
// --- FIN DE CAMBIOS ---

const formatDate = (dateString: string | null): string => {
  // 1. Maneja el caso 'null' explícitamente
  if (!dateString) {
    return "Fecha no programada"; // O el texto que prefieras para fechas nulas
  }

  try {
    // 2. Crea un objeto Date desde el string ISO
    const date = new Date(dateString);

    // 3. Verifica si la fecha es válida después de crearla
    if (isNaN(date.getTime())) {
        return "Fecha inválida"; // Maneja casos donde la conversión pueda fallar
    }

    // 4. Formatea la fecha válida
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // Opcional: Añade la hora si la necesitas
      // hour: '2-digit',
      // minute: '2-digit'
    });
  } catch (error) {
    console.error("Error formateando fecha:", dateString, error);
    return "Error de fecha"; // Mensaje alternativo para errores inesperados
  }
};
</script>

<template>
  <div class="">
   <BaseTitle title="Coordinador de Redes Sociales" subtitle="Planifica, programa y gestiona publicaciones en todas tus redes sociales." />
   
   <div class="card bg-base-100 shadow-md mb-6">
     <div class="card-body p-4">
       <label class="label">
         <span class="label-text font-medium">Selecciona una Marca</span>
       </label>
       <select 
         class="select select-bordered w-full" 
         v-model="selectedBrandId"
         :disabled="brands.length === 0"
       >
         <option v-if="brands.length === 0" disabled selected>Cargando marcas...</option>
         <option v-for="brand in brands" :key="brand.id" :value="brand.id">
           {{ brand.nombreMarca }}
         </option>
       </select>
     </div>
   </div>

   <div class="flex justify-end items-center">
     <button class="btn btn-primary" @click="openCreateModal" :disabled="!selectedBrandId">
       <span class="material-symbols-outlined">add</span>
       Nueva Publicación
     </button>
   </div>

   <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"> 
     
     <div class="card bg-base-100 shadow-xl lg:col-span-1">
       <div class="card-body">
         <h2 class="card-title">Calendario</h2>
         <BaseCalendar 
            v-model="selectedDate" 
            :highlighted-dates="highlightedDates" 
         />  
         <p class="mt-4 text-sm text-center">
  Fecha seleccionada: {{ selectedDate ? selectedDate.toLocaleDateString('es-MX') : 'Ninguna' }}
</p>
       </div>
     </div>

     <div class="card bg-base-100 shadow-xl lg:col-span-2">
       <div class="card-body">
         <h2 class="card-title">Publicaciones Programadas</h2>
         <div class="space-y-4 mt-4">
           
           <p v-if="!selectedBrandId" class="text-center text-gray-500 py-8">
             Por favor, selecciona una marca para ver sus publicaciones.
           </p>
           <p v-else-if="posts.length === 0" class="text-center text-gray-500 py-8">
             No hay publicaciones programadas para esta marca.
           </p>
 
           <div v-else v-for="post in posts" :key="post.id" class="card card-compact bg-base-100 border border-base-300 shadow-sm">  
             
              
             <div class="card-body"> 
             
               <div class="flex justify-between items-start">
                 <div>
                   
                   <p class="font-medium">{{ formatDate(post.scheduleDate) }}</p> 
                   <div class="flex gap-2 mt-2">
                     <span v-if="post.networks?.facebook" class="font-bold text-blue-600 text-xs">FB</span>
                     <span v-if="post.networks?.instagram" class="font-bold text-pink-500 text-xs">IG</span>
                     <span v-if="post.networks?.twitter" class="font-bold text-sky-500 text-xs">TW</span>
                   </div>
                 </div>
                  
                 <div class="badge badge-sm" :class="getBadgeProps(post.status).class"> 
                   {{ getBadgeProps(post.status).label }}
                 </div>
               </div>
               <p class="text-sm text-gray-600 line-clamp-2 mt-2">
                 {{ post.caption || post.postContent }}  
               </p>
               <div class="card-actions justify-end mt-4">
                 <button @click="openEditModal(post)" class="btn btn-xs btn-ghost">Editar</button>
                 <button @click="openDeleteModal(post)" class="btn btn-xs btn-ghost text-error">Eliminar</button>
               </div>
             </div>  
           </div>  
         </div>  
       </div>  
     </div>  
   </div>  

   <BaseModal
     :modal-id="socialStore.modalId"
     :is-submitting="isSubmitting"
     :on-submit="handleSubmit"
     :on-close="handleClose"
   >
     <template #modalBody>
       <div v-if="modalStore.modals[socialStore.modalId]?.type === 'DELETE'">
         <p class="text-center">¿Estás seguro de que quieres eliminar esta publicación?</p>
         <p class="text-center font-bold mt-2">{{ socialStore.selectedPost.caption || socialStore.selectedPost.postContent }}</p>
       </div>
       <AddEditSocialPostForm v-else 
        ref="formRef" 
        @submit="savePost" />
     </template>
   </BaseModal> 
 </div>
</template>