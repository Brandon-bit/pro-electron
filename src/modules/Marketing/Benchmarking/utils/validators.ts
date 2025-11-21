import type { Question } from '../types/benchmarkingTypes';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Valida las respuestas de una encuesta contra sus preguntas
 */
export function validateResponses(
  questions: Question[],
  responses: Record<string, any>
): ValidationResult {
  const errors: string[] = [];

  questions.forEach((q) => {
    const value = responses[q.id];

    // Validar campos requeridos
    if (q.required && (value === undefined || value === null || value === '')) {
      errors.push(`La pregunta "${q.text}" es obligatoria`);
      return;
    }

    if (!value) return; // Si no es requerido y está vacío, skip

    // Validar email
    if (q.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push(`"${q.text}" debe ser un email válido`);
      }
    }

    // Validar teléfono
    if (q.type === 'phone') {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        errors.push(`"${q.text}" debe ser un teléfono válido`);
      }
    }

    // Validar rango de escala
    if ((q.type === 'scale' || q.type === 'stars') && q.scaleMin && q.scaleMax) {
      const numValue = Number(value);
      if (numValue < q.scaleMin || numValue > q.scaleMax) {
        errors.push(`"${q.text}" debe estar entre ${q.scaleMin} y ${q.scaleMax}`);
      }
    }

    // Validar checkbox (al menos una opción si es requerido)
    if (q.type === 'checkbox' && q.required) {
      if (!Array.isArray(value) || value.length === 0) {
        errors.push(`Debe seleccionar al menos una opción en "${q.text}"`);
      }
    }
  });

  return { valid: errors.length === 0, errors };
}

/**
 * Copia texto al portapapeles
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para navegadores antiguos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

/**
 * Descarga un archivo Blob
 */
export function downloadFile(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}

/**
 * Formatea una fecha a formato legible
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formatea una fecha con hora
 */
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Obtiene el badge de estado de una encuesta
 */
export function getStatusBadge(status: string) {
  const badges = {
    draft: { color: 'badge-ghost', text: 'Borrador' },
    active: { color: 'badge-success', text: 'Activa' },
    closed: { color: 'badge-error', text: 'Cerrada' },
    archived: { color: 'badge-info', text: 'Archivada' }
  };
  return badges[status as keyof typeof badges] || { color: 'badge-ghost', text: status };
}

/**
 * Obtiene el badge de estado de una ejecución
 */
export function getExecutionStatusBadge(status: string) {
  const badges = {
    pending: { color: 'badge-warning', text: 'Pendiente' },
    in_progress: { color: 'badge-info', text: 'En Progreso' },
    completed: { color: 'badge-success', text: 'Completada' },
    cancelled: { color: 'badge-error', text: 'Cancelada' }
  };
  return badges[status as keyof typeof badges] || { color: 'badge-ghost', text: status };
}

/**
 * Verifica si una fecha está vencida
 */
export function isOverdue(dueDate?: string): boolean {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}

/**
 * Verifica si una fecha está próxima a vencer (dentro de 3 días)
 */
export function isDueSoon(dueDate?: string): boolean {
  if (!dueDate) return false;
  const due = new Date(dueDate);
  const now = new Date();
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  return due > now && due <= threeDaysFromNow;
}
