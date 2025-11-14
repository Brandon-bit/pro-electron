# 📋 ANÁLISIS DE MIGRACIÓN - AUDITORÍAS DE MANUALES Y POLÍTICAS

## 🎯 OBJETIVO
Migrar la vista `Auditoria.cshtml` (Vue 2 + Bootstrap) a Vue 3 + Composition API + DaisyUI.

---

## 📊 **ANÁLISIS DEL ARCHIVO ORIGINAL**

### **Archivo:** `@src/ejemplo/ManualesPoliticas/Auditoria.cshtml`
- **Tamaño:** 391 líneas
- **Framework:** Vue 2 Options API + Bootstrap
- **Complejidad:** Alta (cálculos automáticos, estructura jerárquica)

---

## 🔍 **FUNCIONALIDADES IDENTIFICADAS**

### **1. Parámetros de URL**
```typescript
?idProc=1001    // ID del proceso/manual
?idForm=5       // ID del formulario seleccionado
?idAu=201       // ID de auditoría (opcional, para abrir específica)
```

### **2. Selector de Formulario**
- Dropdown con lista de formularios disponibles
- Al cambiar, recarga la página con nuevo `idForm`
- Muestra título del formulario

### **3. Botones de Acción**
- **Regresar:** Volver a `/manualespoliticas`
- **Nueva Auditoría:** Abrir modal input para crear auditoría

### **4. Lista de Auditorías (Propuestas)**
Accordion colapsable con:
- **Header:**
  - Descripción de la auditoría
  - Calificación (destacada, mejor opción en verde)
  - Botón "Terminar auditoría" (si no finalizada)
  - Fecha de finalización (si terminada)
  - Botones: Editar, Eliminar
- **Body (collapse):**
  - Tabla de Dominios y Subdominios
  - Evaluación en tiempo real

### **5. Tabla de Evaluación**
**Estructura jerárquica:**
```
Auditoría
  └── Dominios (con peso y título)
       └── Subdominios (con título)
            └── Evaluación + Observaciones
```

**Columnas de la tabla:**
1. Nombre (Dominio/Subdominio)
2. Peso
3. Evaluación
4. Observaciones
5. Calificación

**Fila de Dominio:**
- Nombre: "Dominio: N - Título"
- Peso: Número
- Evaluación: Vacía
- Observaciones: Vacía
- Calificación: Calculada

**Fila de Subdominio:**
- Nombre: "Subdominio: N - Título"
- Peso: Vacío (o muestra si es "mejor opción")
- Evaluación: Select 0-100 (incrementos de 5) o Switch
- Observaciones: Textarea
- Calificación: Muestra evaluación seleccionada

### **6. Dos Modos de Cálculo**

#### **Modo Normal (por defecto):**
```typescript
// Por cada Dominio:
suma = Σ(evaluaciones de subdominios)
promedio = suma / cantidad_subdominios
calificacion_dominio = peso_dominio * (promedio / 100)

// Calificación total auditoría:
calificacion_auditoria = Σ(calificaciones_dominios)
```

#### **Modo "Mejor Opción":**
```typescript
// Por cada Dominio:
// Solo UN subdominio puede estar seleccionado
calificacion_dominio = peso_dominio * (peso_subdominio / 100)

// Calificación total auditoría:
calificacion_auditoria = Σ(calificaciones_dominios)
```

### **7. Modal de Formulario (Template)**
**No visible en la vista principal** - Se usa en otra sección para:
- Configurar formulario de auditoría
- Agregar/Eliminar Dominios
- Agregar/Eliminar Subdominios
- Toggle "Evaluación por mejor opción"
- Drag & drop para reordenar (sortable)

---

## 📦 **ESTRUCTURA DE DATOS**

### **Modelo Principal**
```typescript
{
  dniProc: number,        // ID del proceso/manual
  dniForm: number,        // ID del formulario seleccionado
  dniAu: number | null,   // ID de auditoría a abrir
  forms: IFormulario[],   // Lista de formularios
  propuestas: IAuditoria[],  // Lista de auditorías
  mejoropcion: boolean    // Modo de cálculo
}
```

### **IFormulario**
```typescript
{
  dni: number,
  titulo: string
}
```

### **IAuditoria (Propuesta)**
```typescript
{
  dni: number,
  descripcion: string,
  calificacion: number,      // Calculada
  mejor: boolean,            // Si es la mejor calificación
  fechaFin: string | null,   // Fecha finalización
  strFechaFin: string | null, // Fecha formateada
  show: boolean,             // Accordion abierto/cerrado
  Dominios: IDominio[]
}
```

### **IDominio**
```typescript
{
  dni: number,
  titulo: string,
  peso: number,              // 0-100
  calificacion: number,      // Calculada
  Subdominios: ISubdominio[]
}
```

### **ISubdominio**
```typescript
{
  dni: number,
  titulo: string,
  peso?: number,             // Solo en modo "mejor opción"
  evaluacion: number,        // 0-100 (modo normal)
  seleccionado: boolean,     // Solo en modo "mejor opción"
  observaciones: string
}
```

---

## 🎨 **DISEÑO PROPUESTO (Vue 3)**

### **Estructura de Archivos**
```
Auditorias/
├── types/
│   └── auditorias.types.ts
├── services/
│   └── auditoriasServices.ts
├── store/
│   └── auditoriasStore.ts
├── composables/
│   ├── useAuditoriasActions.ts
│   ├── useAuditoriasCalc.ts
│   └── useAuditoriasUtils.ts
├── components/
│   ├── SelectorFormulario.vue
│   ├── AuditoriaAccordion.vue
│   ├── TablaEvaluacion.vue
│   ├── FilaDominio.vue
│   ├── FilaSubdominio.vue
│   └── NuevaAuditoriaModal.vue
├── views/
│   └── General.vue
└── README.md
```

### **UI Moderna con DaisyUI**
- Selector de formulario con iconos
- Stats cards con KPIs
- Accordion collapse con animaciones
- Tabla responsive con inputs inline
- Calificaciones con badges de colores
- Progress bar visual
- Toggle switch para "mejor opción"
- Modales con backdrop

---

## 🔄 **ENDPOINTS A SIMULAR**

### **1. Cargar Formularios**
```typescript
GET /manualespoliticas/formularios?idProc={dni}
Response: IFormulario[]
```

### **2. Cargar Auditorías**
```typescript
GET /manualespoliticas/auditorias?idProc={dni}&idForm={form}
Response: {
  propuestas: IAuditoria[],
  mejoropcion: boolean
}
```

### **3. Nueva Auditoría**
```typescript
POST /manualespoliticas/qkagregar
Body: { dni: formId, dniProc: procId, descripcion: string }
Response: { tipo: 'success', m: IAuditoria }
```

### **4. Terminar Auditoría**
```typescript
POST /manualespoliticas/terminarauditoria
Body: { dni: auditoriaId }
Response: { 
  tipo: 'success', 
  m: { 
    auditoria: { fechaFin: string, strFechaFin: string } 
  } 
}
```

### **5. Modificar Respuesta**
```typescript
POST /manualespoliticas/qkmodificarrespuesta
Body: {
  dni: formId,
  dniProp: auditoriaId,
  dniDom: dominioId,
  dniSub: subdominioId,
  evaluacion: number,
  observaciones: string,
  lista: { dni, calificacion, mejor }[]
}
Response: { tipo: 'success', titulo: string }
```

### **6. Modificar Subdominio (Mejor Opción)**
```typescript
POST /manualespoliticas/QkModificarTipoDeCalculoSubdominio
Body: {
  dniPropuesta: number,
  dniDominio: number,
  dniSubdominio: number,
  opcion: boolean
}
Response: { tipo: 'success' }
```

---

## 📝 **PLAN DE MIGRACIÓN**

### **Fase 1: Fundación (30 min)**
- [ ] Types e interfaces
- [ ] Services mock con cálculos
- [ ] README

### **Fase 2: Store y Composables (45 min)**
- [ ] Store Pinia
- [ ] useAuditoriasActions
- [ ] useAuditoriasCalc (lógica de cálculos)
- [ ] useAuditoriasUtils

### **Fase 3: Componentes (1h 30min)**
- [ ] SelectorFormulario
- [ ] AuditoriaAccordion
- [ ] TablaEvaluacion
- [ ] FilaDominio
- [ ] FilaSubdominio
- [ ] NuevaAuditoriaModal

### **Fase 4: Vista (30 min)**
- [ ] General.vue

### **Fase 5: Integración (30 min)**
- [ ] Pruebas de cálculos
- [ ] Ajustes finales
- [ ] Documentación

**Tiempo estimado total:** ~3.5 horas

---

## 🎯 **CARACTERÍSTICAS CLAVE**

### **Prioridad Alta**
1. ✅ Selector de formulario
2. ✅ Lista de auditorías (accordion)
3. ✅ Tabla de evaluación (dominios/subdominios)
4. ✅ Cálculo automático de calificaciones
5. ✅ Modo normal vs mejor opción
6. ✅ Nueva auditoría
7. ✅ Terminar auditoría
8. ✅ Guardar evaluaciones en tiempo real
9. ✅ Destacar mejor auditoría

### **Prioridad Media**
10. Editar auditoría
11. Eliminar auditoría
12. Validaciones de datos
13. Estados visuales (finalizada/activa)
14. Botón regresar

### **Prioridad Baja** (Opcionales)
15. Drag & drop para reordenar
16. Exportación de resultados
17. Gráficas de comparación
18. Historial de cambios

---

## 🎨 **MEJORAS DE UX/UI**

### **Modernización**
1. **Progress bar** - Barra visual de calificación
2. **Badges de colores** - Verde/Amarillo/Rojo según calificación
3. **Iconos Material Symbols** - Para cada sección
4. **Animaciones** - Collapse suave, fade in
5. **Estados visuales** - Finalizada (gris), Activa (normal)
6. **Resaltado** - Mejor auditoría con border dorado
7. **Inputs modernos** - Select estilizado, textarea autosize
8. **Empty states** - Cuando no hay auditorías
9. **Loading states** - Spinners durante guardado
10. **Tooltips** - Información de ayuda

### **Colores Propuestos**
```css
Calificación >= 90: badge-success + border-success
Calificación 70-89: badge-warning + border-warning
Calificación < 70: badge-error + border-error

Mejor auditoría: border-4 border-accent (dorado)
Finalizada: opacity-70 + badge-neutral
Activa: opacity-100
```

---

## ⚠️ **CONSIDERACIONES IMPORTANTES**

### **1. Cálculos Automáticos**
- Reactivos con `watch` o `computed`
- Actualización en tiempo real al cambiar evaluación
- Recálculo al cambiar observaciones
- Identificar mejor auditoría automáticamente

### **2. Persistencia**
- Guardar cada cambio de evaluación
- Guardar observaciones al blur
- Auto-save cada 3 segundos (opcional)

### **3. Estados de Auditoría**
- **Activa:** `fechaFin === null` - Permite editar
- **Finalizada:** `fechaFin !== null` - Solo lectura
- Deshabilitar inputs si finalizada

### **4. Datos Mock**
- 3 formularios diferentes
- 3-5 auditorías por formulario
- 3-4 dominios por auditoría
- 2-5 subdominios por dominio
- Algunas finalizadas, otras activas

---

## 📋 **CHECKLIST DE FUNCIONALIDADES**

### **Core**
- [ ] Selector de formulario
- [ ] Lista de auditorías
- [ ] Accordion por auditoría
- [ ] Tabla de dominios/subdominios
- [ ] Cálculo automático modo normal
- [ ] Cálculo automático modo mejor opción

### **Interacción**
- [ ] Nueva auditoría (modal)
- [ ] Terminar auditoría
- [ ] Editar evaluación (select)
- [ ] Editar observaciones (textarea)
- [ ] Toggle mejor opción (switch)
- [ ] Guardar cambios automático

### **Visuales**
- [ ] Badge de calificación con colores
- [ ] Progress bar
- [ ] Destacar mejor auditoría
- [ ] Estados activa/finalizada
- [ ] Loading states
- [ ] Empty states

### **Extras**
- [ ] Editar auditoría
- [ ] Eliminar auditoría
- [ ] Botón regresar
- [ ] Validaciones
- [ ] Tooltips

---

## 🚀 **LISTO PARA MIGRACIÓN**

**Complejidad:** Muy Alta (cálculos complejos + jerarquía)
**Prioridad:** Alta
**Estimado:** 3.5 horas

**¿Procedo con la implementación completa?**
