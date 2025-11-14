# 📋 ANÁLISIS DE MIGRACIÓN - Manuales y Políticas

## 🎯 OBJETIVO
Migrar la vista `Index.cshtml` (Vue 2 + Bootstrap + .NET Framework) a Vue 3 + Composition API + DaisyUI siguiendo la estructura de CadenasDeValor.

---

## 📊 **ANÁLISIS DEL ARCHIVO ORIGINAL**

### **Archivo:** `@src/ejemplo/ManualesPoliticas/Index.cshtml`
- **Tamaño:** 1,044 líneas
- **Framework:** Vue 2 Options API
- **UI:** Bootstrap 4
- **Componentes externos:** 3 (select-cv, comp-files, alerta-cv)

---

## 🔍 **FUNCIONALIDADES IDENTIFICADAS**

### **1. Selector de Cadena de Valor**
- Componente: `<select-cv>`
- Propósito: Seleccionar cadena de valor para filtrar datos
- Muestra: `CV.name` (nombre de cadena de valor)

### **2. Sistema de Tabs (2 pestañas)**

#### **Tab 1: "Cadena de valor"** (manualesCV)
- Tabla con datos de procesos de la CV seleccionada
- **12 columnas:**
  1. # (índice)
  2. Macroprocesos (Nivel 1)
  3. Grupo de Procesos (Nivel 2)
  4. Procesos (Nivel 3) - puede ser lista o texto
  5. Diagrama de Flujo (Nivel 4)
  6. Manual de procesos (Nivel 5) - comp-files para .docx
  7. Historial de Versiones - links a versiones anteriores
  8. Versión Actual - link a versión actual
  9. Documentos de Soporte - comp-files multiprop
  10. Historial de Auditorías - links a auditorías
  11. Promedio - promedio de auditorías
  12. Acciones - botón "Auditar"

#### **Tab 2: "Manual"** (manuales)
- Similar a Tab 1 pero con manuales manuales (no automáticos de CV)
- **Funcionalidades adicionales:**
  - Botón "Agregar Manual"
  - Botón "Habilitar/Deshabilitar" por fila
  - Botón "Eliminar" (solo Owner)
  - Filas deshabilitadas tienen estilo gris
  - Botón "Auditar" solo si está habilitado

### **3. Gestión de Archivos (comp-files)**
- Subir múltiples archivos
- Ver archivos
- Eliminar archivos (si tiene permisos)
- **Tipos de archivos:**
  - Manuales: `.docx`
  - Soporte: `.png, .jpg, .jpeg, .pdf, .docx, .xlsx, .pptx`
- **Carpetas:**
  - `/manualespoliticas/{dni}/version` - para manuales
  - `/manualespoliticas/{dni}/soporte` - para documentos soporte

### **4. Modal "Agregar Manual"**
- **Dos modos:** Automático (deshabilitado en código) y Manual
- **Modo Manual (activo):**
  - Select: Proceso (nivel 1) - de espacios
  - Input: Proceso (nivel 2)
  - Textarea: Grupo de procesos (nivel 3)
  - Select: Proceso (nivel 4) - depende de nivel 1
- **Validaciones**
- **Endpoint:** `/manualespoliticas/agregarcvprocesoman`

### **5. Acciones CRUD**
- **Agregar Manual:** Modal + POST
- **Eliminar Manual:** Confirmación SweetAlert2 + POST `/manualespoliticas/EliminarManualProceso`
- **Habilitar/Deshabilitar:** Toggle + POST `/manualespoliticas/HabilitarManual`
- **Auditar:** Redirect a `/manualespoliticas/auditoria`

### **6. Métodos de Renderizado**
- `manual(obj)`: Renderiza link del manual más reciente
- `historial(obj)`: Renderiza links de versiones anteriores (v1, v2, v3...)
- `version(obj)`: Renderiza link de versión actual
- `historialAuditorias(obj)`: Renderiza links de auditorías (a1, a2, a3...)

---

## 📦 **ESTRUCTURA DE DATOS**

### **Modelo Principal**
```typescript
{
  CV: {
    dni: number
    name: string
  },
  manualesCV: IManual[], // Manuales de cadena de valor
  manuales: IManual[], // Manuales manuales
  lvls1: INivel1[], // Para modal
  espacios: IEspacio[] // Para modal
}
```

### **IManual**
```typescript
{
  id: number
  dni: number
  lvl1: string // Macroprocesos
  lvl2: string // Grupo de procesos
  lvls3: string // Procesos (texto)
  isAuto: boolean // Si es auto, usa Lvls3[]
  Lvls3: { lvl3: string }[] // Lista de procesos
  diagrama: string // Diagrama de flujo
  Manuales: IArchivo[] // Archivos de manual
  Historial: IHistorialVersion[] // Historial de versiones
  Soporte: IArchivo[] // Documentos de soporte
  HistorialAu: IHistorialAuditoria[] // Historial de auditorías
  promedioAuditorias: number
  habilitado: boolean // Solo en 'manuales'
}
```

### **IArchivo**
```typescript
{
  dni: number
  nombre: string
  ext: string
  b64?: string
}
```

### **IHistorialVersion**
```typescript
{
  dni: number
  idProceso: number
  version: number
  final: boolean
}
```

### **IHistorialAuditoria**
```typescript
{
  dni: number
  dniProc: number
  dniForm: number
}
```

---

## 🎨 **DISEÑO PROPUESTO (Vue 3)**

### **Estructura de Archivos**
```
MatrizDeManuales/
├── types/
│   └── manuales.types.ts
├── services/
│   └── manualesServices.ts
├── store/
│   └── manualesStore.ts
├── composables/
│   ├── useManualesActions.ts
│   └── useManualesUtils.ts
├── components/
│   ├── SelectorCadenaValor.vue
│   ├── TablaManualCV.vue
│   ├── TablaManualProceso.vue
│   ├── FilaManual.vue
│   ├── GestorArchivos.vue
│   ├── AgregarManualModal.vue
│   └── HistorialLinks.vue
├── views/
│   └── General.vue
└── README.md
```

### **UI Moderna con DaisyUI**
- Tabs con DaisyUI
- Tabla responsive con scroll horizontal
- Cards para KPIs/estadísticas
- Modales con backdrop
- Badges para versiones y auditorías
- Colores semánticos:
  - Verde: Habilitado
  - Gris: Deshabilitado
  - Azul: Enlaces activos
  - Rojo: Eliminar

---

## 🔄 **ENDPOINTS A SIMULAR**

### **1. Cargar Datos**
```typescript
GET /manualespoliticas/getlevels1
Response: INivel1[]

GET /manualespoliticas/getespacios?dniCV={dni}
Response: IEspacio[]
```

### **2. CRUD Manuales**
```typescript
POST /manualespoliticas/agregarcvprocesoman
Body: { lvl2, lvls3, lvl4 }
Response: { tipo: 'success', m: IManual }

POST /manualespoliticas/EliminarManualProceso
Body: { dniProc }
Response: { tipo: 'success', titulo: string }

POST /manualespoliticas/HabilitarManual
Body: { dniManual, habilitado }
Response: { tipo: 'success', titulo: string }
```

### **3. Gestión de Archivos**
```typescript
POST /manualespoliticas/{dni}/version (upload manual)
POST /manualespoliticas/{dni}/soporte (upload soporte)
DELETE /archivo/delete?dir=...&docName=...
GET /archivo/getfile?dir=...&docName=...
```

---

## 📝 **PLAN DE MIGRACIÓN**

### **Fase 1: Fundación (30 min)**
- [x] Crear estructura de carpetas
- [ ] Crear types/manuales.types.ts
- [ ] Crear services/manualesServices.ts (datos mock)
- [ ] Crear README.md

### **Fase 2: Store y Composables (45 min)**
- [ ] Crear store/manualesStore.ts
- [ ] Crear composables/useManualesActions.ts
- [ ] Crear composables/useManualesUtils.ts

### **Fase 3: Componentes Básicos (1h)**
- [ ] SelectorCadenaValor.vue
- [ ] GestorArchivos.vue
- [ ] HistorialLinks.vue
- [ ] FilaManual.vue

### **Fase 4: Componentes de Tabla (1h)**
- [ ] TablaManualCV.vue
- [ ] TablaManualProceso.vue

### **Fase 5: Modal y Vista (45 min)**
- [ ] AgregarManualModal.vue
- [ ] General.vue

### **Fase 6: Integración y Pruebas (30 min)**
- [ ] Integrar todos los componentes
- [ ] Pruebas funcionales
- [ ] Ajustes de diseño

**Tiempo estimado total:** ~4 horas

---

## 🎯 **CARACTERÍSTICAS CLAVE A IMPLEMENTAR**

### **Prioridad Alta**
1. ✅ Selector de Cadena de Valor
2. ✅ Tabs (Cadena de valor / Manual)
3. ✅ Tabla con 12 columnas
4. ✅ Gestión de archivos (subir, listar, eliminar)
5. ✅ Agregar manual (modal)
6. ✅ Eliminar manual (confirmación)
7. ✅ Habilitar/Deshabilitar manual
8. ✅ Links a historial de versiones
9. ✅ Links a auditorías

### **Prioridad Media**
10. Filtrado por cadena de valor
11. Estados visuales (habilitado/deshabilitado)
12. Validaciones de formulario
13. Permisos (Owner vs usuario normal)

### **Prioridad Baja** (Opcionales)
14. Búsqueda/filtrado en tabla
15. Ordenamiento de columnas
16. Exportación a Excel/PDF
17. Estadísticas/KPIs

---

## 🎨 **MEJORAS DE UX/UI**

### **Modernización**
1. **Tabs DaisyUI** - Con animaciones smooth
2. **Tabla Responsive** - Con scroll horizontal en móvil
3. **Badges para versiones** - `v1`, `v2`, `v3` con colores
4. **Badges para auditorías** - `a1`, `a2`, `a3` con colores
5. **Cards para archivos** - En lugar de lista plana
6. **Drag & drop** - Para subir archivos
7. **Preview de archivos** - Modal con visor
8. **Estados visuales claros** - Colores semánticos
9. **Loading states** - Spinners durante carga
10. **Empty states** - Mensajes cuando no hay datos

### **Colores Propuestos**
```css
Habilitado: badge-success (verde)
Deshabilitado: badge-neutral (gris)
Versión actual: badge-primary (azul)
Versiones antiguas: badge-ghost (gris claro)
Auditorías: badge-info (celeste)
Eliminar: btn-error (rojo)
Agregar: btn-success (verde)
```

---

## ⚠️ **CONSIDERACIONES IMPORTANTES**

### **1. Datos Mock**
- Crear al menos 5 manuales de CV
- Crear al menos 3 manuales manuales
- 2-3 versiones por manual
- 1-2 auditorías por manual
- Archivos simulados (nombres + extensiones)

### **2. Permisos**
- Simular rol "Owner" vs usuario normal
- Owner puede eliminar
- Todos pueden habilitar/deshabilitar (verificar en original)

### **3. Archivos**
- No implementar upload real (solo simular)
- Generar nombres de archivo mock
- Simular extensiones correctas

### **4. Links Externos**
- `/manualespoliticas/auditoria` - Solo mostrar link
- `/proceso/diagrama/{id}` - Solo mostrar link
- Archivos - Simular download

---

## 📋 **CHECKLIST DE FUNCIONALIDADES**

### **Core**
- [ ] Selector de cadena de valor
- [ ] Tab "Cadena de valor" con tabla
- [ ] Tab "Manual" con tabla
- [ ] Mostrar 12 columnas
- [ ] Renderizar niveles 1-5
- [ ] Mostrar lista de procesos (Lvls3)

### **Archivos**
- [ ] Mostrar archivos de manuales
- [ ] Mostrar documentos de soporte
- [ ] Botón subir archivo
- [ ] Botón eliminar archivo (con permisos)
- [ ] Vista previa de archivos

### **Historial**
- [ ] Links de historial de versiones
- [ ] Link de versión actual
- [ ] Links de historial de auditorías
- [ ] Mostrar promedio de auditorías

### **Acciones**
- [ ] Botón "Agregar Manual"
- [ ] Modal con formulario
- [ ] Validaciones de formulario
- [ ] Guardar nuevo manual
- [ ] Botón "Eliminar" (Owner)
- [ ] Confirmación de eliminación
- [ ] Botón "Habilitar/Deshabilitar"
- [ ] Toggle de estado
- [ ] Botón "Auditar" (link externo)

### **Estados**
- [ ] Filas deshabilitadas (estilo gris)
- [ ] Botón auditar solo si habilitado
- [ ] Loading state
- [ ] Empty state
- [ ] Error handling

---

## 🚀 **LISTO PARA INICIAR MIGRACIÓN**

**¿Procedo con la migración?**

Voy a crear la estructura paso por paso:
1. Types
2. Services (con datos mock realistas)
3. Store
4. Composables
5. Componentes
6. Vista

**Confirma para continuar** o si tienes alguna pregunta/ajuste al plan.
