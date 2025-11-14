# Análisis de Iniciativas

Módulo para la evaluación y priorización de iniciativas estratégicas mediante la matriz Esfuerzo vs Impacto.

## Estructura del Módulo

```
AnalisisDeIniciativas/
├── components/          # Componentes Vue del módulo
│   ├── AddEditForm.vue          # Formulario para crear/editar iniciativas
│   ├── ConfigurationTab.vue     # Tab de configuración de criterios de matriz
│   ├── DeleteInitiative.vue     # Componente de confirmación de eliminación
│   ├── EvaluationTab.vue        # Tab de evaluación con tabla de iniciativas
│   ├── InitiativeModal.vue      # Modal principal que maneja las acciones
│   └── MatrixChart.vue          # Visualización gráfica de matriz Esfuerzo vs Impacto
├── composables/         # Lógica reutilizable
│   ├── useInitiativeActions.ts  # Acciones CRUD y cálculos de scores
│   └── mappingInitiativeData.ts # Mapeo de datos API ↔ Frontend
├── services/            # Servicios de API
│   └── initiativeService.ts     # Llamadas HTTP al backend
├── store/               # Estado global con Pinia
│   └── initiativeStore.ts       # Store de iniciativas y criterios de matriz
├── types/               # Definiciones de TypeScript
│   └── initiativeTypes.ts       # Tipos e interfaces
├── validations/         # Esquemas de validación
│   └── initiativeValidation.ts  # Validación con Zod
└── views/               # Vistas principales
    └── InitiativeView.vue       # Vista principal con tabs
```

## Características Principales

### 1. Sistema de Tabs
- **Configuración de Matriz**: Ajusta los pesos de los criterios de evaluación
- **Evaluación de Iniciativas**: Tabla con todas las iniciativas y matriz visual

### 2. Criterios de Evaluación

#### Esfuerzo (configurable)
- **Inversión** (peso por defecto: 40%)
- **Alcance** (peso por defecto: 30%)
- **Horizonte de Tiempo** (peso por defecto: 30%)

#### Impacto (configurable)
- **Ahorro/Ingresos** (peso por defecto: 40%)
- **Beneficios** (peso por defecto: 35%)
- **Satisfacción al Cliente** (peso por defecto: 25%)

### 3. Campos de Iniciativa
- **Clasificación**: Tipo de iniciativa (Estratégico, Operacional, etc.)
- **Nombre**: Identificador de la iniciativa
- **Inversión**: Bajo, Medio, Alto
- **Alcance**: Bajo, Medio, Alto
- **Horizonte de Tiempo**: Corto, Medio, Largo
- **Ahorro**: Bajo, Medio, Alto
- **Beneficios**: Bajo, Medio, Alto
- **Satisfacción**: Bajo, Medio, Alto
- **Selección**: Checkbox para enviar a priorización
- **Alineación Estratégica**: Calculada automáticamente (0-100%)

### 4. Funcionalidades

#### Tabla de Evaluación
- ✅ Visualización de todas las iniciativas
- ✅ Selección múltiple con checkboxes
- ✅ Badges para clasificación y niveles
- ✅ Indicador de alineación estratégica
- ✅ Acciones de editar y eliminar
- ✅ Responsive design

#### Matriz Visual
- ✅ Gráfico de dispersión Esfuerzo vs Impacto
- ✅ 4 cuadrantes con etiquetas
- ✅ Puntos posicionados según scores calculados
- ✅ Tooltips con nombre de iniciativa
- ✅ Resaltado del cuadrante óptimo (Bajo Esfuerzo / Alto Impacto)

#### Configuración
- ✅ Sliders para ajustar pesos de criterios
- ✅ Actualización en tiempo real
- ✅ Persistencia de configuración

#### Envío a Priorización
- ✅ Botón con contador de seleccionados
- ✅ Validación de selección mínima
- ✅ Almacenamiento en localStorage
- ✅ Navegación automática a módulo de priorización

### 5. Cálculos Automáticos

#### Score de Esfuerzo
```typescript
effortScore = (
    (investment * peso_inversion) +
    (scope * peso_alcance) +
    (timeHorizon * peso_horizonte)
) * 3.33
```

#### Score de Impacto
```typescript
impactScore = (
    (savings * peso_ahorro) +
    (benefits * peso_beneficios) +
    (satisfaction * peso_satisfaccion)
) * 3.33
```

#### Alineación Estratégica
```typescript
alignment = (impactScore * 10) - (effortScore * 5)
// Normalizado entre 0 y 100
```

## Componentes Base Utilizados

- `BaseTitle`: Título de página con subtítulo
- `BaseButton`: Botones estandarizados con iconos
- `BaseModal`: Modal reutilizable
- `BaseFormInput`: Inputs de formulario con validación
- `BaseFormSelect`: Selectores con validación
- `BaseFormCheckbox`: Checkboxes con validación

## Integración

### Ruta
La ruta está configurada en `/gestion-de-proyectos/analisis-de-iniciativas`

### Navegación
El módulo está integrado en el menú lateral bajo "Gestión de Proyectos" → "Análisis de Iniciativas"

## API Endpoints

- `GET /gestion-proyectos/iniciativas` - Obtener lista paginada
- `POST /gestion-proyectos/iniciativas` - Crear iniciativa
- `PUT /gestion-proyectos/iniciativas/:id` - Actualizar iniciativa
- `DELETE /gestion-proyectos/iniciativas/:id` - Eliminar iniciativa
- `PATCH /gestion-proyectos/iniciativas/:id/seleccionar` - Toggle selección

## Validaciones

Todas las validaciones están definidas en `validations/initiativeValidation.ts` usando Zod:
- Campos requeridos
- Longitud mínima/máxima
- Enums para niveles (Bajo, Medio, Alto)
- Enums para horizonte de tiempo (Corto, Medio, Largo)

## Flujo de Trabajo

1. **Configurar Matriz** (opcional): Ajusta los pesos de los criterios en la tab de configuración
2. **Añadir Iniciativas**: Crea nuevas iniciativas con todos sus criterios
3. **Evaluar**: Los scores se calculan automáticamente basados en los criterios
4. **Visualizar**: Revisa la posición de cada iniciativa en la matriz
5. **Seleccionar**: Marca las iniciativas que deseas priorizar
6. **Enviar**: Envía las seleccionadas al módulo de priorización

## Características de UI

- ✅ Diseño moderno con DaisyUI
- ✅ Tabs interactivos
- ✅ Tabla responsive con badges
- ✅ Matriz visual interactiva
- ✅ Sliders para configuración
- ✅ Tooltips informativos
- ✅ Estados de loading
- ✅ Notificaciones toast
- ✅ Iconos Material Symbols
