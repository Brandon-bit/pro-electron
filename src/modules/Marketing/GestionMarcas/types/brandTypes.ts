// src/modules/Marketing/GestionMarcas/types/brandTypes.ts

// Define cómo se ve una cuenta social conectada que viene de tu backend
export interface SocialAccount {
  platform: string; // ej: 'facebook', 'instagram'
  username: string;
  profileImage?: string;
}

// Define cómo se ve una Marca en tu sistema
export interface Brand {
  id: number;
  nombreMarca: string;
  logoUrl: string | null;
  dominioEmail: string | null;
  sitioWeb: string | null;
  facebookUser: string | null;
  instagramUser: string | null;
  twitterUser: string | null;
  linkedinUser: string | null;
  idUsuario: string | null;
  fechaCreacion: string;
  fechaActualizacion: string;
  activo: boolean;
  eliminado: boolean;
  idCuenta: string;
  mktArchivos: any[]; // Puedes definir tipos más estrictos si quieres
  mktCampanias: any[];
  // ... etc.
}


// Define los datos necesarios para crear una nueva marca
export interface BrandCreationRequest {
  nombreMarca: string;
  logoFile?: File; // <-- Esta es la propiedad para el archivo
  dominioEmail?: string; 
  sitioWeb?: string;
  facebookUser?: string;
  // ... todas las demás propiedades simples
}