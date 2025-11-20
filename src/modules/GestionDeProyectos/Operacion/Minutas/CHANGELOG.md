# Changelog - Módulo de Minutas

## Versión 2.0 - Noviembre 2024

### Mejoras Principales

#### 1. Selector de Proyectos
- Agregado selector de proyectos al inicio de la vista
- Las minutas ahora están asociadas a proyectos específicos
- Filtrado automático de minutas por proyecto seleccionado

#### 2. Vista con Accordions
- Las minutas se muestran en formato accordion compacto
- **Trigger**: Nombre, estatus y fecha
- **Body**: Contenido completo de la minuta
- Reduce el scroll necesario para navegar entre minutas
- Botones de editar y eliminar con iconos

#### 3. Tabla de Acciones Mejorada
- Usa `BaseTable` sin paginación
- Muestra todas las acciones del proyecto seleccionado
- Columnas: ID, Acción, Minuta Origen, Responsable, Fecha Límite, Estado

#### 4. Formulario con Validación
- Implementado con `vee-validate` y `zod`
- Usa componentes base: `BaseFormInput`, `BaseTextArea`
- Validación en tiempo real de campos requeridos
- Modal con tamaño L para mejor visualización

#### 5. BaseModal Mejorado
- Soporte para 3 tamaños: `default`, `L`, `XL`
- Prop `submitText` personalizable
- Mejor experiencia de usuario

### Estructura de Archivos

```
Minutas/
├── components/
│   ├── ActionsTable.vue (actualizado - usa BaseTable)
│   ├── CreateMinuteModal.vue (refactorizado)
│   ├── MinuteAccordion.vue (nuevo)
│   └── MinuteForm.vue (nuevo)
├── composables/
│   └── useMinuteActions.ts (actualizado)
├── store/
│   └── minuteStore.ts (actualizado)
├── types/
│   └── minuteTypes.ts (actualizado)
├── validations/
│   └── minuteValidations.ts (nuevo)
└── views/
    └── MinutesView.vue (refactorizado)
```

### Cambios Técnicos

#### Types
- `MinuteType` y `NewMinuteType` incluyen `projectId`
- Nuevo tipo `ProjectOptionType` para el selector

#### Store
- Gestión de proyectos con `projectsOptions` y `selectedProject`
- Getter `filteredMinutes` para filtrar por proyecto
- Acciones CRUD completas para minutas

#### Validación
- Schema de validación con zod
- Campos requeridos: título, fecha, hora, agenda, discusión, decisiones
- Validación en tiempo real

### Uso

1. Seleccionar un proyecto del dropdown
2. Ver minutas en formato accordion
3. Expandir para ver detalles completos
4. Crear nueva minuta con formulario validado
5. Ver acciones pendientes en tabla
