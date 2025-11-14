# Control de Riesgos

Módulo para gestión proactiva de riesgos del proyecto con matriz de calor, registro de riesgos y dashboard de métricas.

## Estructura del Módulo

```
ControlDeRiesgos/
├── components/          # Componentes Vue del módulo
│   ├── RiskModal.vue          # Modal para agregar/editar riesgos
│   ├── RiskHeatmap.vue        # Matriz de calor de riesgos
│   ├── ControlHeatmap.vue     # Matriz de controles
│   └── DashboardCards.vue     # Cards de métricas
├── composables/         # Lógica reutilizable
│   └── useRiskActions.ts      # Acciones y cálculos
├── store/               # Estado global con Pinia
│   └── riskStore.ts           # Store con riesgos
├── types/               # Definiciones de TypeScript
│   └── riskTypes.ts           # Tipos e interfaces
└── views/               # Vistas principales
    └── RiskControlView.vue    # Vista principal con tabs
```

## Características Principales

### 1. Registro de Riesgos (Tab 1)

#### Tabla de Riesgos (9 Columnas)
1. **ID** - Identificador único (R001, R002...)
2. **Descripción** - Descripción del riesgo
3. **Categoría** - Badge con categoría
4. **P x I** - Probabilidad x Impacto
5. **Score** - Puntuación calculada (badge con color)
6. **Estrategia** - Estrategia de respuesta
7. **Responsable** - Persona responsable
8. **Estado** - Badge de estado (Activo/Cerrado)
9. **Acciones** - Botón editar

#### Funcionalidades
- ✅ Tabla zebra con hover
- ✅ Scroll horizontal
- ✅ Badges con colores
- ✅ Botón editar por fila

### 2. Matriz de Calor (Tab 2)

#### Estructura
- ✅ Tabla 5x5 (Probabilidad x Impacto)
- ✅ Eje Y: Probabilidad (5 a 1)
- ✅ Eje X: Impacto (1 a 5)
- ✅ Celdas con colores según score
- ✅ IDs de riesgos en celdas correspondientes

#### Colores de Celdas
- **Verde** (1-7): Riesgo Bajo
- **Amarillo** (8-14): Riesgo Medio
- **Rojo** (15-25): Riesgo Alto

#### Leyenda
- ✅ 3 cuadros con colores y rangos
- ✅ Escala de Probabilidad (5 niveles)
- ✅ Escala de Impacto (5 niveles)

### 3. Controles (Tab 3)

#### Grid de Cards
- ✅ Grid responsive (1 col / 2 cols MD)
- ✅ Card por riesgo con estrategia
- ✅ ID y badge de nivel
- ✅ Descripción
- ✅ Estrategia (badge outline)
- ✅ Acciones
- ✅ Responsable
- ✅ Estado (badge)

### 4. Dashboard (Tab 4)

#### 3 Cards de Métricas
1. **Total de Riesgos**
   - Número total
   - Cantidad de activos
   - Icono: warning

2. **Riesgos Altos**
   - Cantidad con score ≥ 15
   - "Requieren atención inmediata"
   - Icono: priority_high (rojo)

3. **Controles Activos**
   - Cantidad con estrategia definida
   - "Con estrategia definida"
   - Icono: check_circle (verde)

### 5. Modal de Registro

#### Campos del Formulario
1. **Descripción del Riesgo** - Textarea (3 rows)
2. **Causa Potencial** - Textarea (2 rows)
3. **Efecto Potencial** - Textarea (2 rows)
4. **Probabilidad** - Select (1-5)
5. **Impacto** - Select (1-5)
6. **Score Calculado** - Display con badge
7. **Categoría** - Select (6 opciones)
8. **Estrategia de Respuesta** - Select (6 opciones)
9. **Acciones de Respuesta** - Textarea (3 rows)
10. **Responsable** - Input text

#### Cálculo Automático
```typescript
score = probability * impact
```

#### Categorías
- Cronograma
- Costo
- Alcance
- Calidad
- Recursos
- Técnico

#### Estrategias
- Evitar
- Mitigar
- Transferir
- Aceptar
- Explotar (Oportunidad)
- Mejorar (Oportunidad)

## Tipos

### RiskType
```typescript
{
  id: string
  description: string
  cause: string
  effect: string
  probability: number  // 1-5
  impact: number       // 1-5
  score: number        // probability * impact
  strategy: string
  actions: string
  responsible: string
  status: string
  category: string
}
```

### NewRiskType
```typescript
{
  description: string
  cause: string
  effect: string
  probability: number
  impact: number
  strategy: string
  actions: string
  responsible: string
  category: string
}
```

## Store

### Estado
- `risks`: Array de riesgos
- `isModalOpen`: Estado del modal
- `editingRisk`: Riesgo en edición (null si es nuevo)

### Acciones
- `setRisks(risks)`: Establecer riesgos
- `addRisk(newRisk)`: Agregar riesgo
- `updateRisk(id, updatedRisk)`: Actualizar riesgo
- `deleteRisk(id)`: Eliminar riesgo
- `openModal()`: Abrir modal
- `closeModal()`: Cerrar modal
- `setEditingRisk(risk)`: Establecer riesgo en edición

### Getters
- `activeRisks`: Riesgos con estado "Activo"
- `highRisks`: Riesgos con score ≥ 15
- `risksWithStrategy`: Riesgos con estrategia definida
- `getRisksByCategory(category)`: Riesgos por categoría

## Composables

### useRiskActions
- `getRiskColor(score)`: Color del badge según score
- `getRiskLevel(score)`: Nivel del riesgo (Bajo/Medio/Alto)
- `getCellColor(prob, imp)`: Color de celda en matriz
- `getRisksInCell(prob, imp)`: Riesgos en celda específica
- `loadRisks()`: Cargar desde localStorage
- `saveRisks()`: Guardar en localStorage

## Componentes

### RiskModal.vue
- ✅ BaseModal integrado
- ✅ Formulario completo
- ✅ Cálculo automático de score
- ✅ Badge con nivel calculado
- ✅ Validación de campos
- ✅ Reset al cerrar

### RiskHeatmap.vue
- ✅ Tabla 5x5
- ✅ Colores dinámicos
- ✅ Badges con IDs
- ✅ Leyenda de colores
- ✅ Escalas de probabilidad e impacto

### ControlHeatmap.vue
- ✅ Grid de cards
- ✅ Filtrado por estrategia
- ✅ Información completa
- ✅ Badges de nivel y estado

### DashboardCards.vue
- ✅ 3 cards métricas
- ✅ Iconos Material
- ✅ Números grandes
- ✅ Texto descriptivo

## Cálculos

### Score de Riesgo
```typescript
score = probability * impact
```

Rango: 1-25

### Nivel de Riesgo
```typescript
if (score >= 15) return 'Alto'
if (score >= 8) return 'Medio'
return 'Bajo'
```

### Color de Badge
```typescript
if (score >= 15) return 'badge-error'    // Rojo
if (score >= 8) return 'badge-warning'   // Amarillo
return 'badge-success'                    // Verde
```

### Color de Celda (Matriz)
```typescript
if (score >= 15) return 'bg-error/20 hover:bg-error/30'
if (score >= 8) return 'bg-warning/20 hover:bg-warning/30'
return 'bg-success/20 hover:bg-success/30'
```

## Escalas

### Probabilidad (1-5)
- **5** - Muy Alta (>80%)
- **4** - Alta (60-80%)
- **3** - Media (40-60%)
- **2** - Baja (20-40%)
- **1** - Muy Baja (<20%)

### Impacto (1-5)
- **5** - Muy Alto (Crítico)
- **4** - Alto (Mayor)
- **3** - Medio (Moderado)
- **2** - Bajo (Menor)
- **1** - Muy Bajo (Insignificante)

## Flujo de Trabajo

1. **Cargar Riesgos** → onMounted
2. **Ver Registro** → Tab 1
3. **Agregar Riesgo** → Botón "Nuevo Riesgo"
4. **Llenar Formulario** → Modal
5. **Calcular Score** → Automático
6. **Registrar** → Botón submit
7. **Ver Matriz** → Tab 2
8. **Ver Controles** → Tab 3
9. **Ver Dashboard** → Tab 4
10. **Guardar** → Botón "Guardar"

## Persistencia

### LocalStorage Key
- `risks`: Array de riesgos

### Estructura Guardada
```typescript
[
  {
    id: string
    description: string
    cause: string
    effect: string
    probability: number
    impact: number
    score: number
    strategy: string
    actions: string
    responsible: string
    status: string
    category: string
  }
]
```

## Características de UI

### Header
- ✅ BaseTitle con icono warning
- ✅ Botón "Guardar" (outline)
- ✅ Botón "Nuevo Riesgo" (primary)
- ✅ Flex justify-between

### Tabs
- ✅ Tabs boxed (DaisyUI)
- ✅ 4 tabs
- ✅ Tab content con padding
- ✅ Cards dentro de tabs

### Tabla
- ✅ Table zebra
- ✅ Hover en filas
- ✅ Overflow horizontal
- ✅ Max-width en descripción
- ✅ Badges con colores

### Matriz de Calor
- ✅ Tabla con borders
- ✅ Headers con bg-base-200
- ✅ Celdas con colores dinámicos
- ✅ Transition en hover
- ✅ Badges outline en celdas

### Modal
- ✅ BaseModal
- ✅ Max-width 2xl
- ✅ Scroll vertical
- ✅ Grid 2 columnas para causa/efecto
- ✅ Score destacado con bg-base-200

### Cards
- ✅ Card con sombra
- ✅ Card-body con padding
- ✅ Iconos Material
- ✅ Números grandes (text-2xl)
- ✅ Texto descriptivo pequeño

## Ruta

La ruta está configurada en `/gestion-de-proyectos/control-de-riesgos`

## Integración

### Con Proyectos
- ✅ Puede filtrar por proyecto (futuro)
- ✅ Independiente por ahora

### Persistencia
- ✅ Guarda en localStorage
- ✅ Carga automática al montar
- ✅ Notificación al guardar

## Ejemplo de Uso

```vue
<script setup lang="ts">
import RiskControlView from '@/modules/GestionDeProyectos/ControlDeRiesgos/views/RiskControlView.vue'
</script>

<template>
  <RiskControlView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Computed properties para filtros
- ✅ Watch para modal
- ✅ Notificaciones toast
- ✅ Persistencia en localStorage
- ✅ Cálculo automático de score
- ✅ Colores dinámicos
- ✅ Badges con estilos
- ✅ Grid responsive
- ✅ Tabs con DaisyUI
- ✅ BaseModal integrado
- ✅ Material icons

## Validaciones

### Modal
- ✅ Todos los campos son opcionales excepto descripción
- ✅ Probabilidad e impacto con valores por defecto (3)
- ✅ Score calculado automáticamente
- ✅ Reset al cerrar

### Store
- ✅ ID autogenerado (R001, R002...)
- ✅ Status por defecto "Activo"
- ✅ Score recalculado al actualizar P o I

## Matriz de Calor

### Estructura
```
     1   2   3   4   5  (Impacto)
5  [ ] [ ] [ ] [ ] [ ]
4  [ ] [ ] [ ] [ ] [ ]
3  [ ] [ ] [ ] [ ] [ ]
2  [ ] [ ] [ ] [ ] [ ]
1  [ ] [ ] [ ] [ ] [ ]
(Probabilidad)
```

### Colores
- **Verde**: Scores 1-7
- **Amarillo**: Scores 8-14
- **Rojo**: Scores 15-25

### Ejemplo
```
Probabilidad 5, Impacto 5 = Score 25 (Rojo)
Probabilidad 3, Impacto 3 = Score 9 (Amarillo)
Probabilidad 1, Impacto 2 = Score 2 (Verde)
```

## Estados de Riesgo

- **Activo**: Riesgo vigente
- **Cerrado**: Riesgo materializado o descartado
- **En Seguimiento**: Riesgo monitoreado

## Estrategias de Respuesta

### Para Amenazas
- **Evitar**: Eliminar la amenaza
- **Mitigar**: Reducir probabilidad o impacto
- **Transferir**: Pasar a terceros
- **Aceptar**: Asumir el riesgo

### Para Oportunidades
- **Explotar**: Asegurar que ocurra
- **Mejorar**: Aumentar probabilidad o impacto

## Categorías de Riesgo

1. **Cronograma**: Retrasos, dependencias
2. **Costo**: Sobrecostos, presupuesto
3. **Alcance**: Cambios, requisitos
4. **Calidad**: Defectos, estándares
5. **Recursos**: Personal, equipos
6. **Técnico**: Tecnología, complejidad

## Datos de Ejemplo

### Riesgo por Defecto
```typescript
{
  id: 'R001',
  description: 'Retraso en la entrega de componentes críticos',
  cause: 'Dependencia de proveedor único',
  effect: 'Retraso en cronograma de 2-3 semanas',
  probability: 4,
  impact: 5,
  score: 20,
  strategy: 'Mitigar',
  actions: 'Identificar proveedores alternativos',
  responsible: 'Juan Pérez',
  status: 'Activo',
  category: 'Cronograma'
}
```

## Futuras Mejoras

- 📊 Gráfica de tendencias
- 📊 Histograma de riesgos
- 📄 Exportación a PDF
- 📄 Exportación a Excel
- 🔄 Historial de cambios
- 📧 Notificaciones por email
- 👥 Asignación múltiple
- 📅 Fechas de revisión
- 🔔 Alertas automáticas
- 📈 Análisis de impacto acumulado

## Notas Importantes

- ✅ El score se calcula automáticamente
- ✅ Los colores son dinámicos según el score
- ✅ La matriz se actualiza en tiempo real
- ✅ Los riesgos se guardan en localStorage
- ✅ El modal se resetea al cerrar
- ✅ Las tabs usan radio buttons de DaisyUI
- ✅ Los badges tienen colores semánticos
- ✅ La tabla es responsive con scroll horizontal
