# 📋 Matriz de VoBo (Visto Bueno)

## 📋 Descripción

Módulo para gestionar las solicitudes y aprobaciones de Vistos Buenos (VoBo) de procesos, olas de implementación y manuales/políticas.

---

## 🗂️ Estructura del Módulo

```
MatrizDeVobo/
├── components/
│   ├── FiltrosVoBo.vue           # Filtros en cascada (CV → Espacio → Proceso)
│   ├── TablaProcesos.vue         # Tabla de VoBos de diagramas de procesos
│   ├── TablaOlas.vue             # Tabla de VoBos de olas
│   ├── TablaManuales.vue         # Tabla de VoBos de manuales (CRUD)
│   ├── DeleteVoBoModal.vue       # Modal confirmar eliminación
│   └── SendVoBoModal.vue         # Modal enviar correo VoBo
├── composables/
│   ├── useVoBoActions.ts         # Acciones (CRUD, filtros)
│   └── useVoBoUtils.ts           # Utilidades (colores, fechas, archivos)
├── services/
│   └── voboServices.ts           # Servicios API (mock)
├── store/
│   └── voboStore.ts              # Store Pinia
├── types/
│   └── vobo.types.ts             # Tipos e interfaces
└── views/
    └── General.vue               # Vista principal con tabs
```

---

## 🎯 Funcionalidades

### ✅ **Sistema de Filtros en Cascada**
- **Nivel 1:** Cadena de Valor
- **Nivel 2:** Espacios (Procesos y CV)
- **Nivel 3:** Procesos (AsIs y ToBe)
- Los filtros cargan datos dinámicamente según la selección

### ✅ **3 Tabs de Visualización**

| Tab | Contenido | Funcionalidad |
|-----|-----------|---------------|
| **Procesos** | VoBos de diagramas BPMN | Solo lectura |
| **Olas** | VoBos de implementación | Solo lectura |
| **Manuales** | VoBos de manuales/políticas | CRUD completo |

### ✅ **Gestión de VoBos de Manuales**
- Crear nueva solicitud de VoBo
- Asignar responsable (dropdown)
- Enviar correo de notificación (simulado)
- Eliminar VoBo (solo si no se ha enviado)
- Ver archivos adjuntos
- Estados con código de colores

### ✅ **Estados de VoBo**

| ID | Estado | Color | Descripción |
|----|--------|-------|-------------|
| 1 | Pendiente | Amarillo | Esperando asignación |
| 2 | Aprobado | Verde | Aprobado por responsable |
| 3 | Rechazado | Rojo | Rechazado |
| 4 | En Revisión | Azul | Enviado, esperando respuesta |
| 5 | Cancelado | Gris | Cancelado |

---

## 📦 Data Mock

### **Cadenas de Valor:**
1. Procesos Estratégicos
2. Procesos Operativos
3. Procesos de Soporte

### **Espacios:**
- Recursos Humanos
- Finanzas
- Operaciones

### **Usuarios:**
5 usuarios de ejemplo con nombre, apellidos y correo

### **VoBos de Ejemplo:**
- 2 VoBos de Procesos
- 1 VoBo de Olas
- 2 VoBos de Manuales

---

## 🚀 Uso

### **Filtrar VoBos:**
```typescript
import { useVoBoActions } from '../composables/useVoBoActions'

const { selectCadenaValor, selectEspacio, selectProceso } = useVoBoActions()

// Seleccionar filtros en cascada
await selectCadenaValor(1) // Carga espacios
selectEspacio(1)            // Carga procesos
selectProceso(101)          // Filtra VoBos
```

### **Crear VoBo de Manual:**
```typescript
const { createVoBoManual } = useVoBoActions()

await createVoBoManual({
    dniProc: 101
})
```

### **Actualizar Responsable:**
```typescript
const { updateVoBoManual } = useVoBoActions()

await updateVoBoManual({
    dni: 3001,
    dniAutoriza: 2
})
```

### **Enviar Correo:**
```typescript
const { sendVoBoEmail } = useVoBoActions()

await sendVoBoEmail({
    dni: 3001,
    dniProc: 101
})
```

---

## 🔄 Flujo de Trabajo

### **Filtros:**
1. Usuario selecciona **Cadena de Valor**
2. Sistema carga **Espacios** disponibles
3. Usuario selecciona **Espacio**
4. Sistema carga **Procesos** (AsIs y ToBe)
5. Usuario selecciona **Proceso**
6. Sistema filtra y muestra **VoBos** en las 3 tabs

### **Gestión de VoBo (Tab Manuales):**
1. Click en **"Solicitar VoBo"**
2. Sistema crea nuevo VoBo con estado **Pendiente**
3. Usuario selecciona **Responsable** del dropdown
4. Sistema actualiza VoBo automáticamente
5. Click en **"Enviar"**
6. Modal de confirmación con datos del responsable
7. Sistema envía correo (simulado) y cambia estado a **En Revisión**

---

## 🎨 Componentes Clave

### **FiltrosVoBo.vue**
```vue
<FiltrosVoBo />
```
- 3 selectores en cascada
- Estados disabled dinámicos
- Loading indicators

### **TablaManuales.vue**
```vue
<TablaManuales 
  @open-create-modal="handleCreate"
  @open-delete-modal="handleDelete"
  @open-send-modal="handleSend"
/>
```
- Botón crear VoBo
- Dropdown inline para responsable
- Botones Enviar/Eliminar con validaciones
- Enlaces a archivos adjuntos

### **Modales**
```vue
<DeleteVoBoModal :is-open="isOpen" :vobo="vobo" @close="close" />
<SendVoBoModal :is-open="isOpen" :vobo="vobo" @close="close" />
```
- Confirmación con información detallada
- Estados de loading
- Notificaciones toast

---

## 🛠️ Migración desde Vue 2

### **Cambios principales:**
- ✅ Vue 2 → Vue 3 (Composition API)
- ✅ Bootstrap → DaisyUI + Tailwind
- ✅ jQuery → Vue reactivity
- ✅ Alertify → vue-toastification
- ✅ SweetAlert2 → Custom Vue modals
- ✅ vue-resource → Fetch API (mock)
- ✅ Global state → Pinia store

### **Equivalencias:**

| Vue 2 (Viejo) | Vue 3 (Nuevo) |
|---------------|---------------|
| `new Vue({ el, data })` | `defineComponent`, `ref`, `reactive` |
| `this.$http.post()` | `voboServices.createVoBo()` |
| `Swal.fire()` | `<DeleteVoBoModal />` |
| `confirmSwal2()` | `<SendVoBoModal />` |
| `v-on:change` | `@change` |
| Mixins | Composables |

---

## 📝 Notas Técnicas

### **Validaciones:**
- VoBo solo se puede enviar si tiene responsable asignado
- VoBo solo se puede eliminar si NO ha sido enviado
- Fechas con formato especial ('01/01/0001' = fecha inválida)

### **Estados:**
- Colores dinámicos según estatus (1-5)
- Classes utility de DaisyUI (alert-warning, alert-success, etc.)

### **Archivos:**
- Simulación de upload (no se envían realmente)
- Links con iconos según extensión
- Formato de tamaño de archivo

### **Rendimiento:**
- Computed properties para filtrado
- Lazy loading de espacios y procesos
- Mock con delays realistas (300-600ms)

---

## 🎉 Estado del Módulo

✅ **Completado al 100%**

- [x] Tipos e interfaces
- [x] Servicios mock
- [x] Store Pinia
- [x] Composables
- [x] Filtros en cascada
- [x] 3 tablas con tabs
- [x] CRUD completo en Manuales
- [x] 2 modales funcionales
- [x] Vista principal
- [x] Estados con colores
- [x] Validaciones
- [x] Responsive design

---

## 🔮 Posibles Mejoras Futuras

- [ ] Upload real de archivos
- [ ] Previsualización de archivos PDF
- [ ] Historial de cambios por VoBo
- [ ] Notificaciones en tiempo real
- [ ] Comentarios en línea
- [ ] Filtros avanzados y búsqueda
- [ ] Exportar a Excel/PDF
- [ ] Dashboard de métricas
- [ ] Integración con backend real
- [ ] Firma digital

---

## 👨‍💻 Autor

**Migrado desde:** Vue 2 + Bootstrap + .NET Framework  
**Migrado a:** Vue 3 + DaisyUI + Vite  
**Fecha:** Oct 2025

---

## 🚦 Pruebas

### **URL:**
```
http://localhost:5173/procesos/procesos-de-negocio/matriz-de-vobo
```

### **Flujo de Prueba:**

1. **Abre la vista**
2. **Selecciona "Procesos Estratégicos"** en Cadena de Valor
3. **Selecciona "Recursos Humanos"** en Espacios
4. **Selecciona "Reclutamiento"** en Procesos
5. **Verás VoBos** en las 3 tabs
6. **Ve al tab "Manuales"**
7. **Click "Solicitar VoBo"** para crear uno nuevo
8. **Selecciona responsable** del dropdown
9. **Click "Enviar"** para abrir modal
10. **Confirma envío** de correo (simulado)

**¡Todo funcional!** 🎊
