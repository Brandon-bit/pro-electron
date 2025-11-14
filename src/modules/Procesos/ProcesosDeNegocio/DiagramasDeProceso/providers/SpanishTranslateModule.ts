/**
 * Módulo de traducción para BPMN-js en Español de México
 * Proporciona traducciones personalizadas para todos los textos
 */

import SpanishContextPadProvider from './SpanishContextPadProvider';
import SpanishPaletteProvider from './SpanishPaletteProvider';

// Diccionario de traducciones en español de México
const spanishTranslations = {
  // Herramientas generales
  'Activate the hand tool': 'Activar herramienta de desplazamiento',
  'Activate the lasso tool': 'Activar herramienta de selección múltiple', 
  'Activate the create/remove space tool': 'Activar herramienta de espacio',
  'Activate the global connect tool': 'Activar herramienta de conexión global',
  
  // Context Pad - Acciones generales
  'Remove': 'Eliminar',
  'Delete': 'Eliminar',
  'Connect using Sequence/MessageFlow or Association': 'Conectar usando flujo de secuencia',
  'Connect using sequence flow': 'Conectar usando flujo de secuencia',
  'Connect using Sequence Flow': 'Conectar usando flujo de secuencia',
  
  // Context Pad - Agregar elementos
  'Append Task': 'Agregar Tarea',
  'Append Gateway': 'Agregar Enlace', 
  'Append EndEvent': 'Agregar Evento Final',
  'Append StartEvent': 'Agregar Evento de Inicio',
  'Append SubProcess': 'Agregar Subproceso',
  
  // Context Pad específico para Lane
  'Add Lane above': 'Agregar Carril arriba',
  'Add Lane below': 'Agregar Carril abajo',
  'Divide into two Lanes': 'Dividir en dos Carriles',
  
  // Palette - Herramientas principales
  'Create StartEvent': 'Crear Evento de Inicio',
  'Create EndEvent': 'Crear Evento Final', 
  'Create Task': 'Crear Tarea',
  'Create User Task': 'Crear Tarea de Usuario',
  'Create Service Task': 'Crear Tarea de Servicio',
  
  // Palette - Gateways
  'Create Gateway': 'Crear Enlace',
  'Create Exclusive Gateway': 'Crear Enlace Exclusivo',
  'Create Parallel Gateway': 'Crear Enlace Paralelo', 
  
  // Palette - Subprocesos
  'Create SubProcess': 'Crear Subproceso',
  
  // Replace Menu
  'Change type': 'Cambiar tipo',
  'Replace with Task': 'Reemplazar con Tarea',
  
  // Tipos de elementos
  'Task': 'Tarea',
  'User Task': 'Tarea de Usuario',
  'Service Task': 'Tarea de Servicio', 
  'Start Event': 'Evento de Inicio',
  'End Event': 'Evento Final',
  'Exclusive Gateway': 'Enlace Exclusivo',
  'Parallel Gateway': 'Enlace Paralelo',
  'SubProcess': 'Subproceso',
  'Lane': 'Carril',
  
  // Acciones
  'Edit': 'Editar',
  'Copy': 'Copiar',
  'Paste': 'Pegar',
  'Cut': 'Cortar',
  'Undo': 'Deshacer',
  'Redo': 'Rehacer',
  'Zoom in': 'Acercar',
  'Zoom out': 'Alejar'
};

// Función de traducción personalizada
function customTranslate(template: string, replacements?: any) {
  // Buscar traducción directa
  if (spanishTranslations[template as keyof typeof spanishTranslations]) {
    let translated = spanishTranslations[template as keyof typeof spanishTranslations];
    
    // Aplicar reemplazos si existen
    if (replacements) {
      Object.keys(replacements).forEach(key => {
        translated = translated.replace(new RegExp(`\\{${key}\\}`, 'g'), replacements[key]);
      });
    }
    
    return translated;
  }
  
  // Si no hay traducción, devolver el template original
  return template;
}

// Módulo que combina todos los providers de traducción
export default {
  __init__: ['spanishContextPadProvider', 'spanishPaletteProvider', 'translate'],
  spanishContextPadProvider: ['type', SpanishContextPadProvider],
  spanishPaletteProvider: ['type', SpanishPaletteProvider],
  translate: ['value', customTranslate]
};
