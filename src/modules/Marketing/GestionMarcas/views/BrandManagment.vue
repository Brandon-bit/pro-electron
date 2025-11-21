<script setup lang="ts">
import { 
  createBrandService, 
  generateConnectionLinkService,
  getBrandsByAccountService,
  // ... importa las otras si las necesitas aquí
} from '../services/brandServices';
import { ref, onMounted } from 'vue'; // MODIFICADO: Añadido onMounted
import { useForm } from 'vee-validate';
import BaseModal from '@/shared/components/BaseModal.vue';
import BaseFormInput from '@/shared/components/BaseFormInput.vue';
import { useModalStore } from '@/shared/stores/modal.store';
import { Plus, Link, Mail } from 'lucide-vue-next'; // MODIFICADO: Icono de enlace
// NUEVO: Importa los iconos de redes sociales que usarás dinámicamente
import FacebookIcon from '@/assets/icons/icons8-facebook.svg';
import InstagramIcon from '@/assets/icons/icons8-instagram.svg';
import TwitterIcon from '@/assets/icons/icons8-x.svg';
import LinkedinIcon from '@/assets/icons/icons8-linkedin.svg';
import YoutubeIcon from '@/assets/icons/icons8-youtube.svg';
import TiktokIcon from '@/assets/icons/icons8-tiktok.svg';
import BaseTitle from '@/shared/components/BaseTitle.vue';
import type { Brand } from '../types/brandTypes';
// --- Tipos de Datos (MODIFICADOS para reflejar la API de Ayrshare) ---

// NUEVO: Define la estructura de una cuenta social conectada
interface SocialAccount {
  platform: string; // 'facebook', 'instagram', etc.
  username: string;
  profileImage?: string; // La imagen de perfil de la red social
}
 
// --- Estado de la Vista ---
const brands = ref<Brand[]>([]);
const isLoading = ref(true);

// --- Lógica de la API ---

// MODIFICADO: fetchBrands obtiene marcas del usuario autenticado (backend lo obtiene del token)
const fetchBrands = async () => {
  isLoading.value = true;
  
  // El backend obtiene el ID de cuenta desde los claims del token
  const result = await getBrandsByAccountService();

  if (result.success && result.data) {
    // Asigna la lista de 'items' (que son tus marcas) al ref
    brands.value = result.data.items;
  } else {
    // Manejar el error de carga
    console.error("Error al cargar marcas:", result.message);
    brands.value = []; // Asigna un array vacío en caso de error
  }
  
  isLoading.value = false;
};

// Se ejecuta cuando el componente se monta en la página
onMounted(() => {
  fetchBrands();
});


// --- Lógica del Modal y Formulario ---
const modalStore = useModalStore();
const modalId = 'add-brand-modal';

// NUEVO: Ref para guardar el archivo del logo
const logoUrl = ref<File | null>(null);

// MODIFICADO: 'logo' ya no es parte del formulario de vee-validate
const { handleSubmit, isSubmitting, resetForm } = useForm({
   initialValues: {
     name: "",
     // logo: "", // <-- Eliminado de aquí
    dominioEmail: "",
  }
});
// NUEVO: Handler para el input de archivo
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    logoUrl.value = target.files[0];
  } else {
    logoUrl.value = null;
  }
};

// MODIFICADO: handleAddBrand construye FormData sin accountId (backend lo obtiene del token)
const handleAddBrand = handleSubmit(async (values) => {
  // Validación simple para el archivo
  if (!logoUrl.value) {
    alert("Por favor, selecciona un archivo de logotipo.");
    return; // Detiene el envío
  }
  
  // 1. Construir el FormData solo con datos necesarios
  const formData = new FormData();
  formData.append('nombreMarca', values.name);
  formData.append('dominioEmail', values.dominioEmail);
  // 'logoUrl' debe coincidir con el nombre de la propiedad IFormFile en tu C#
  formData.append('logoUrl', logoUrl.value);
  // El backend obtiene idCuenta desde los claims del token JWT
  
  // 2. Llamar al servicio (que ahora debe aceptar FormData)
  const result = await createBrandService(formData);

  if (result.success && result.data) {
   brands.value.push(result.data.mktMarcas); 
    
    modalStore.close(modalId);
    // resetForm() se llama en @on-close
  } else {
    alert(result.message);
  }
});

// NUEVO: Función para iniciar la conexión de redes sociales
// Ejemplo de cómo usar el servicio para conectar redes
const handleConnectSocials = async (brand: Brand) => {
  const result = await generateConnectionLinkService("brand.id");

  if (result.success && result.data) {
    window.location.href = result.data.url;
  } else {
    alert(result.message);
  }
};

const openModal = () => {
  modalStore.open(modalId, { title: 'Agregar Nueva Marca' });
};

// NUEVO: Objeto para mapear nombres de plataforma a componentes de íconos
const socialIcons: Record<string, any> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
};

</script>

<template>
  <div class="">
    <BaseTitle title="Gestión de Marcas" subtitle="Configura y administra las marcas que gestionarás en el módulo de Marketing" />

    <div class="flex justify-end items-center">
      <button class="btn btn-primary" @click="openModal">
        <Plus class="mr-2 h-4 w-4" />
        Nueva Marca
      </button>
    </div>

    <div v-if="isLoading">Cargando marcas...</div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    <div v-for="brand in brands" :key="brand.id" class="card bg-base-100 shadow-xl flex flex-col">
      <div class="card-body">
        <div class="flex items-center gap-4">
          
          <img 
            :src="brand.logoUrl || 'https://via.placeholder.com/150'" 
            :alt="brand.nombreMarca" 
            class="w-16 h-16 rounded-lg object-cover" 
          />
          <div>
            <h2 class="card-title">{{ brand.nombreMarca }}</h2>
            
            <p v-if="brand.dominioEmail" class="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <Mail class="h-3 w-3" />
              {{ brand.dominioEmail }}
            </p>
          </div>
        </div>
        <div class="divider my-2"></div>

        <div class="space-y-3">
          <p class="text-sm font-medium">Redes Sociales ConfigURAdas:</p>
          
          <div v-if="brand.facebookUser" class="flex items-center gap-1.5 text-xs bg-base-200 px-2 py-1 rounded">
            <component :is="socialIcons['facebook']" class="h-3.5 w-3.5" />
            <span>{{ brand.facebookUser }}</span>
          </div>
          <div v-if="brand.instagramUser" class="flex items-center gap-1.5 text-xs bg-base-200 px-2 py-1 rounded">
            <component :is="socialIcons['instagram']" class="h-3.5 w-3.5" />
            <span>{{ brand.instagramUser }}</span>
          </div>
          <p v-if="!brand.facebookUser && !brand.instagramUser" class="text-xs text-gray-400">
            No hay redes sociales configuradas.
          </p>
        </div>
      </div>
      <div class="card-actions justify-end p-4 mt-auto border-t border-base-200">
        <button class="btn btn-ghost btn-sm" @click="handleConnectSocials(brand)">
          <Link class="h-4 w-4 mr-1" />
          Conectar / Gestionar Redes
        </button>
      </div>  
      </div>
    </div>
  </div>

  <BaseModal
    :modal-id="modalId"
    :is-submitting="isSubmitting"
    :on-submit="handleAddBrand"
    @on-close="resetForm"
  >
    <template #modalBody>
      <div class="space-y-4">
              <p class="text-sm text-gray-500">
                Crea una nueva marca. Podrás conectar sus redes sociales en el siguiente paso.
              </p>
              <BaseFormInput name="name" label="Nombre de la Marca *" placeholder="Ej: Mi Empresa" />
              
                      <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Logotipo (Archivo) *</span>
                </label>
                <input 
                  type="file" 
                  @change="handleFileChange" 
                  class="file-input file-input-bordered w-full" 
                  accept="image/png, image/jpeg, image/webp"
                />
              </div>
      
              <BaseFormInput name="dominioEmail" label="Dominio de E-mail" placeholder="miempresa.com" />
            </div>
    </template>
  </BaseModal>
</template>