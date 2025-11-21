/**
 * Tipos y interfaces para el módulo de Estrategia de Campañas y Gestión de Proyectos
 */

// ========== CAMPAÑA ESTRATÉGICA ==========

export interface Campania {
  id: string | number;
  nombre: string;
  descripcion?: string;
  presupuesto: number;
  fechaInicio: string;
  fechaFin: string;
  estado: 'planificacion' | 'activa' | 'pausada' | 'finalizada';
  idMarca: string | number;
  idProyecto?: string | number;
  proyectoAsociado?: ProyectoResumen;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProyectoResumen {
  id: string | number;
  nombre: string;
  estado: string;
}

// DTO para crear campaña (PascalCase para backend .NET)
export interface CreateCampaniaRequest {
  Nombre: string;
  Descripcion?: string;
  Presupuesto: number;
  FechaInicio: string;
  FechaFin: string;
  IdMarca: string;
}

// DTO para actualizar campaña
export interface UpdateCampaniaRequest {
  Nombre?: string;
  Descripcion?: string;
  Presupuesto?: number;
  FechaInicio?: string;
  FechaFin?: string;
  Estado?: string;
}

// ========== MÉTRICAS DE CAMPAÑA ==========

export interface MetricasCampania {
  campaniaId: string | number;
  totalInversiones: number;
  totalGastos: number;
  roi: number;
  alcance: number;
  conversiones: number;
  tasaConversion: number;
  metricas: MetricaDetalle[];
}

export interface MetricaDetalle {
  nombre: string;
  valor: number;
  unidad: string;
  tipo: 'positivo' | 'negativo' | 'neutral';
}

// ========== PROYECTO Y KANBAN ==========

export interface Proyecto {
  id: string | number;
  nombre: string;
  descripcion?: string;
  estado: 'planificacion' | 'en_progreso' | 'pausado' | 'completado';
  idCampania: string | number;
  idMarca: string | number;
  fechaCreacion: string;
  fechaActualizacion?: string;
}

export interface KanbanResponse {
  proyecto: Proyecto;
  columnas: KanbanColumna[];
}

export interface KanbanColumna {
  estado: string;
  titulo: string;
  orden: number;
  tareas: Tarea[];
}

export interface Tarea {
  id: string | number;
  titulo: string;
  descripcion?: string;
  estado: string;
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  asignadoA?: string;
  fechaVencimiento?: string;
  fechaCreacion: string;
  orden: number;
  idProyecto: string | number;
  etiquetas?: string[];
}

// DTO para crear tarea (PascalCase para backend .NET)
export interface CreateTareaRequest {
  Titulo: string;
  Descripcion?: string;
  Estado: string;
  Prioridad: string;
  AsignadoA?: string;
  FechaVencimiento?: string;
  Etiquetas?: string[];
}

// DTO para actualizar tarea (usado principalmente en drag & drop)
export interface UpdateTareaRequest {
  Titulo?: string;
  Descripcion?: string;
  Estado?: string;
  Prioridad?: string;
  AsignadoA?: string;
  FechaVencimiento?: string;
  Orden?: number;
}

// ========== RESPUESTAS API ==========

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ========== STATE DEL STORE ==========

export interface MarketingEstrategiaState {
  campanias: Campania[];
  currentCampania: Campania | null;
  proyectos: any[];
  currentProyecto: Proyecto | null;
  kanbanBoard: KanbanResponse | null;
  metricas: MetricasCampania | null;
  isLoading: boolean;
  currentError: string | null;
  currentAccountId: string;
}
