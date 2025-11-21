// ============================================
// TIPOS PARA MÓDULO DE E-MAILING
// ============================================

// Plantilla de Email (basada en mkt_email_plantillas)
export interface Template {
  id: string | number;
  nombrePlantilla: string;
  asunto: string;
  contenidoHTML?: string; // Opcional porque el backend no siempre lo devuelve
  idMarca: string | number;
  fechaCreacion: string;
  fechaActualizacion: string;
  createdBy?: string; // Usuario que creó la plantilla
}

// Request para crear plantilla
export interface CreateTemplateRequest {
  nombrePlantilla: string;
  asunto: string;
  contenidoHTML: string;
  idMarca: string;
}

// Request para actualizar plantilla
export interface UpdateTemplateRequest {
  nombrePlantilla?: string;
  asunto?: string;
  contenidoHTML?: string;
}

// Wrapper genérico de respuestas del API
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// Response de lista paginada
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

// ============================================
// LISTAS DE AUDIENCIA
// ============================================

export interface Lista {
  id: string | number;
  idMarca: string | number;
  nombreLista: string;
  descripcion?: string;
  totalContactos?: number;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CreateListaRequest {
  NombreLista: string;
  Descripcion?: string;
  IdMarca: string;
}

// ============================================
// CONTACTOS
// ============================================

export interface Contacto {
  id: string | number;
  idLista: string | number;
  email: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  empresa?: string;
  cargo?: string;
  activo?: boolean;
  fechaCreacion: string;
}

export interface CreateContactoRequest {
  email: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  empresa?: string;
  cargo?: string;
}

export interface BulkContactosRequest {
  contactos: CreateContactoRequest[];
}

// ============================================
// CAMPAÑAS
// ============================================

export interface Campania {
  id: string | number;
  idMarca: string | number;
  idPlantilla: string | number;
  idLista?: string | number;
  idListaAsociada?: string | number;  // Campo del backend
  titulo?: string;  // Para compatibilidad
  nombreCampania?: string;  // Campo del backend
  asunto?: string;
  estado?: 'borrador' | 'programada' | 'enviada' | 'pausada';  // Para compatibilidad
  estadoCampania?: 'borrador' | 'programada' | 'enviada' | 'pausada';  // Campo del backend
  fechaProgramada?: string;
  fechaEnvio?: string;
  totalEnviados?: number;
  totalAbiertos?: number;
  totalClicks?: number;
  totalClics?: number;  // Campo del backend
  totalRebotes?: number;  // Campo del backend
  fechaCreacion: string;
  fechaActualizacion: string;
  nombreListaAsociada?: string;  // Campo del backend
}

export interface CreateCampaniaRequest {
  Titulo: string;
  Asunto: string;
  IdPlantilla: string | number;
  IdLista: string | number;
  IdMarca: string;
  EsBorrador: boolean;
  FechaProgramada?: string;
}

export interface UpdateCampaniaRequest {
  Titulo: string;
  Asunto: string;
  IdPlantilla: string | number;
  IdLista: string | number;
}
