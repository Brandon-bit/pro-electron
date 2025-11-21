# Módulo de Competencias

Catálogo centralizado de competencias organizacionales para evaluaciones de desempeño.

## 📁 Estructura

```
Competencias/
├── components/
│   ├── CompetencyForm.vue          # Formulario crear/editar
│   ├── CompetencyModal.vue         # Modal con BaseModal y modalMap
│   └── DeleteCompetency.vue        # Contenido de confirmación
├── composables/
│   ├── mappingCompetencies.ts      # Mapeo español ↔ inglés
│   ├── useCompetencyActions.ts     # Acciones CRUD (console.log)
│   └── useCompetencies.ts          # Configuración columnas tabla
├── store/
│   └── competencyStore.ts          # Store Pinia
├── types/
│   └── competencyTypes.ts          # Tipos TypeScript
├── validations/
│   └── competencyValidation.ts     # Esquemas Zod
└── views/
    └── CompetenciesListView.vue    # Vista principal
```

## 🎯 ¿Qué es una Competencia?

Una competencia es una **habilidad o capacidad** que se evalúa en los empleados durante las evaluaciones de desempeño.

### Categorías

| Categoría      | Descripción                        | Ejemplos                                           |
| -------------- | ---------------------------------- | -------------------------------------------------- |
| **Técnica**    | Habilidades específicas del puesto | Programación, Excel, Diseño, Análisis de datos     |
| **Conductual** | Soft skills                        | Comunicación, Trabajo en equipo, Adaptabilidad     |
| **Liderazgo**  | Habilidades de gestión             | Toma de decisiones, Delegación, Visión estratégica |

## 🔄 Flujo de Uso

```
1. RRHH crea competencias en el catálogo
   - Nombre: "Liderazgo"
   - Descripción: "Capacidad de guiar equipos..."
   - Categoría: Liderazgo
   ↓
2. Al crear campaña de evaluación
   - RRHH selecciona competencias del catálogo
   - Ej: Liderazgo, Comunicación, Trabajo en Equipo
   ↓
3. Durante evaluación
   - Empleados califican cada competencia (1-5)
   ↓
4. Resultados
   - Score por competencia
   - Promedio general
```

## 📊 Datos Mock Incluidos

6 competencias de ejemplo:

- **Liderazgo** (Liderazgo) - 5 usos
- **Comunicación Efectiva** (Conductual) - 8 usos
- **Trabajo en Equipo** (Conductual) - 7 usos
- **Programación** (Técnica) - 3 usos
- **Toma de Decisiones** (Liderazgo) - 4 usos
- **Análisis de Datos** (Técnica) - 2 usos

## 🔗 Integración

### Con Gestión de Desempeño

El módulo `GestionDeDesempeno` usa este catálogo:

```typescript
// En CreateUpdateCampaignView.vue
import { useCompetencyActions } from '@/modules/RRHH/Competencias/composables/useCompetencyActions'

const { getCompetenciesForSelect } = useCompetencyActions()
const competencies = await getCompetenciesForSelect()
```

### Contador de Uso

Cada competencia muestra cuántas campañas la están usando:

- **Uso alto**: Competencias core de la organización
- **Uso bajo**: Competencias específicas o nuevas

## 🎨 Características UI

### Tabla de Competencias

| Columna       | Descripción                                    |
| ------------- | ---------------------------------------------- |
| **Nombre**    | Nombre y descripción                           |
| **Categoría** | Badge con color (Técnica/Conductual/Liderazgo) |
| **Uso**       | Contador de campañas                           |
| **Estado**    | Activa/Inactiva                                |
| **Acciones**  | Editar, Eliminar                               |

### Badges de Categoría

- 🔵 **Técnica**: `badge-primary`
- 🟣 **Conductual**: `badge-secondary`
- 🟢 **Liderazgo**: `badge-accent`

## 🚀 Funcionalidades

### ✅ Crear Competencia

1. Click en "Nueva Competencia"
2. Llenar formulario:
    - Nombre
    - Descripción (opcional)
    - Categoría
    - Estado (activa/inactiva)
3. Guardar

### ✅ Editar Competencia

1. Click en ✏️ en la tabla
2. Modificar datos
3. Guardar

### ✅ Eliminar Competencia

1. Click en 🗑️ en la tabla
2. Confirmar eliminación
3. **Nota**: Las campañas existentes no se afectan

### ✅ Activar/Desactivar

- **Activa**: Disponible para usar en nuevas campañas
- **Inactiva**: No aparece en selector de campañas

## 📝 Validaciones

```typescript
{
    name: string (mín 3 caracteres) - Requerido
    description: string (mín 10 caracteres) - Opcional
    category: 'technical' | 'behavioral' | 'leadership' - Requerido
    active: boolean
}
```

## 🔌 Backend (Preparado)

### Endpoints Necesarios

```typescript
GET    /api/competencies          // Listar con paginación
POST   /api/competencies          // Crear
PUT    /api/competencies/:id      // Actualizar
DELETE /api/competencies/:id      // Eliminar
GET    /api/competencies/select   // Para dropdowns
```

### Estructura Backend (español)

```typescript
{
    id: number
    nombre: string
    descripcion: string
    categoria: 'tecnica' | 'conductual' | 'liderazgo'
    activo: boolean
}
```

El mapeo español ↔ inglés ya está implementado en `mappingCompetencies.ts`.

## 🎯 Ruta

```
/rrhh/competencias
```

## 💡 Mejores Prácticas

### Al Crear Competencias

✅ **Nombres claros y concisos**

- ✅ "Liderazgo"
- ✅ "Comunicación Efectiva"
- ❌ "La capacidad de liderar equipos de trabajo"

✅ **Descripciones específicas**

- Explica qué implica la competencia
- Ayuda a evaluadores a entender qué calificar

✅ **Categorización correcta**

- Técnica: Conocimientos específicos
- Conductual: Comportamientos y actitudes
- Liderazgo: Habilidades de gestión

### Gestión del Catálogo

- **Revisar periódicamente**: Eliminar competencias obsoletas
- **Consolidar duplicados**: Evitar "Liderazgo" y "Habilidades de Liderazgo"
- **Mantener activas solo las relevantes**: Facilita selección en campañas

## 🔄 Ciclo de Vida

```
1. Crear competencia → Estado: Activa
2. Usar en campañas → Contador aumenta
3. Si ya no es relevante → Desactivar (no eliminar)
4. Competencias desactivadas → No aparecen en nuevas campañas
5. Campañas antiguas → Siguen mostrando competencias desactivadas
```

## ⚠️ Consideraciones

### Al Eliminar

- **Cuidado**: Eliminar una competencia puede afectar reportes históricos
- **Recomendación**: Mejor desactivar que eliminar
- **Alternativa**: Implementar "soft delete" en backend

### Contador de Uso

- Actualmente es mock (fijo)
- En producción: Calcular dinámicamente desde BD
- Query: `COUNT(campaign_competencies WHERE competency_id = X)`

## 📚 Uso en Código

```typescript
// Obtener competencias activas para selector
const { getCompetenciesForSelect } = useCompetencyActions()
const options = await getCompetenciesForSelect()
// Retorna: [{ id: 1, label: "Liderazgo" }, ...]

// Obtener todas con paginación
const { getCompetencies } = useCompetencyActions()
const { items, total } = await getCompetencies(page, pageSize)

// Crear
const { createCompetency } = useCompetencyActions()
await createCompetency({
    name: 'Nueva Competencia',
    description: 'Descripción...',
    category: 'technical',
    active: true
})
```

## ✅ Resumen

**El módulo Competencias proporciona:**

- ✅ Catálogo centralizado de habilidades
- ✅ CRUD completo
- ✅ Categorización (Técnica/Conductual/Liderazgo)
- ✅ Contador de uso en campañas
- ✅ Activar/desactivar
- ✅ Integración con Gestión de Desempeño
- ✅ Listo para backend (console.log)

**Acceso:** `/rrhh/competencias`
