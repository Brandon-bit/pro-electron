// Tipos de preguntas disponibles
export type QuestionType = 'short' | 'long' | 'multiple' | 'checkbox' | 'scale' | 'stars' | 'yesno' | 'date' | 'email' | 'phone';

// Tipos de gráficos para visualización
export type ChartType = 'pie' | 'bar' | 'line' | 'table' | 'average' | 'none';

// Tipos de encuestas
export type SurveyType = 'mystery' | 'benchmarking' | 'satisfaction' | 'other';

// Estados de encuestas
export type SurveyStatus = 'draft' | 'active' | 'closed' | 'archived';

// Estados de ejecuciones
export type ExecutionStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

// Pregunta individual
export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  options?: string[]; // Para multiple choice y checkbox
  scaleMin?: number; // Para scale
  scaleMax?: number; // Para scale
  chartType: ChartType;
  order: number; // Orden de la pregunta
  helpText?: string; // Texto de ayuda opcional
}

// Plantilla de preguntas
export interface Template {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  accountId: string; // ID de la empresa/cuenta
  brandId?: string; // ID de la marca asociada
  isPublic: boolean; // Si es plantilla pública o privada
  category?: string; // Categoría de la plantilla
  createdAt: string;
  updatedAt: string;
  createdBy?: string; // Usuario que creó la plantilla
}

// Encuesta/Estudio
export interface Survey {
  id: string;
  title: string;
  description: string;
  type: SurveyType;
  templateId?: string | null;
  accountId: string; // ID de la empresa/cuenta
  brandId?: string; // ID de la marca (opcional)
  responses: number; // Contador de respuestas
  status: SurveyStatus;
  isPublic: boolean; // Si acepta respuestas públicas
  publicUrl?: string; // URL pública completa
  publicToken?: string; // Token único para URL pública
  startDate?: string; // Fecha de inicio
  endDate?: string; // Fecha de fin
  createdAt: string;
  updatedAt: string;
  createdBy?: string; // Usuario que creó la encuesta
}

// Ejecución de encuesta (asignación a evaluador)
export interface Execution {
  id: string;
  surveyId: string;
  accountId: string; // ID de la empresa/cuenta
  assignedTo?: string; // Email o nombre del evaluador
  assignedDate: string;
  dueDate?: string;
  status: ExecutionStatus;
  responses?: Record<string, any>; // Respuestas del formulario
  completedAt?: string;
  completedBy?: string; // Quien completó la ejecución
  location?: string; // Ubicación del mystery shopper
  notes?: string; // Notas adicionales
}

// Respuesta pública (cuando alguien llena el formulario público)
export interface PublicResponse {
  id: string;
  surveyId: string;
  responses: Record<string, any>;
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
}

// Resultado agregado para visualización
export interface AggregatedResult {
  question: Question;
  data: any[] | Record<string, number> | string[]; 
  average?: number;
  total?: number; // Total de respuestas
  percentages?: Record<string, number>; // Porcentajes para opciones múltiples
}

// Request para crear plantilla
export interface CreateTemplateRequest {
  name: string;
  description: string;
  accountId: string;
  brandId?: string;
  isPublic: boolean;
  category?: string;
  questions: Omit<Question, 'id'>[];
}

// Request para crear encuesta
export interface CreateSurveyRequest {
  title: string;
  description: string;
  type: SurveyType;
  templateId?: string;
  accountId: string;
  brandId?: string;
  isPublic: boolean;
  startDate?: string;
  endDate?: string;
}

// Request para crear ejecución
export interface CreateExecutionRequest {
  surveyId: string;
  accountId: string;
  assignedTo: string;
  dueDate?: string;
  location?: string;
  notes?: string;
}

// Request para actualizar ejecución
export interface UpdateExecutionRequest {
  status?: ExecutionStatus;
  responses?: Record<string, any>;
  notes?: string;
}

// Response de estadísticas
export interface SurveyStatistics {
  totalTemplates: number;
  totalSurveys: number;
  totalExecutions: number;
  totalPublicResponses: number;
  responsesByMonth: Array<{ month: string; count: number }>;
  surveysByType: Array<{ type: string; count: number }>;
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

// Response de generación de URL pública
export interface PublicUrlResponse {
  publicUrl: string;
  publicToken: string;
}

// Response de respuestas de encuesta
export interface SurveyResponsesData {
  executions: Execution[];
  publicResponses: PublicResponse[];
}

// Response de encuesta pública
export interface PublicSurveyData {
  survey: Survey;
  template: Template;
}