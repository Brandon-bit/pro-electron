# 📊 Implementación de Olas

## 📋 Descripción

Módulo para gestionar la implementación de mejoras de procesos organizadas en "olas" según su prioridad y plazo de implementación.

---

## 🗂️ Estructura del Módulo

```
ImplementacionDeOlas/
├── components/
│   ├── AddOlaModal.vue          # Modal para agregar nueva ola
│   ├── CodigoColores.vue         # Leyenda de código de colores
│   ├── OlaCard.vue               # Tarjeta individual de ola
│   ├── SelectProceso.vue         # Selector de proceso
│   └── VoBoModal.vue             # Modal para envío a VoBo
├── composables/
│   ├── useOlaActions.ts          # Acciones (CRUD, VoBo)
│   └── useOlaUtils.ts            # Utilidades y listas
├── services/
│   └── olaServices.ts            # Servicios API (mock)
├── store/
│   └── olaStore.ts               # Store Pinia
├── types/
│   └── ola.types.ts              # Tipos e interfaces
└── views/
    └── General.vue               # Vista principal
```

---

## 🎯 Funcionalidades

### ✅ **Gestión de Procesos**
- Selector de proceso con lista hardcodeada
- Carga automática de olas al seleccionar proceso
- Visualización del proceso actual en el título

### ✅ **Gestión de Olas**
- **Agregar ola** con modal
- Clasificación por:
  - **Prioridad:** Baja, Media, Alta, Muy Alta
  - **Tipo:** Quick Hits, Desarrollo de Sistema, Proyecto de Inversión
  - **Plazo:** Inmediato (0), Corto (1), Mediano (2), Largo (3)
- Visualización en tabla de 4 columnas
- Código de colores por prioridad

### ✅ **Sistema VoBo**
- Selección de usuarios internos
- Agregar correos externos
- Envío simulado (sin correos reales)
- Notificaciones de éxito

---

## 🎨 Código de Colores

| Prioridad | Color | Hex |
|-----------|-------|-----|
| Baja | Verde | `#65b552` |
| Media | Amarillo | `#ffbc37` |
| Alta | Naranja | `#ef7d4a` |
| Muy Alta | Rojo | `#e82754` |

---

## 📦 Data Mock

### **Procesos disponibles:**
1. Gestión de Compras (ID: 101)
2. Gestión de Ventas (ID: 102)
3. Recursos Humanos (ID: 103)
4. Contabilidad (ID: 104)
5. Inventarios (ID: 105)

### **Olas de ejemplo:**
El proceso "Gestión de Compras" (ID: 101) tiene 5 olas de ejemplo distribuidas en las 4 columnas.

### **Usuarios VoBo:**
5 usuarios de ejemplo con nombre, apellidos y correo.

---

## 🚀 Uso

### **Seleccionar un proceso:**
```typescript
import { useOlaActions } from '../composables/useOlaActions'

const { selectProceso } = useOlaActions()

// Seleccionar proceso
await selectProceso({ id: 101, nombre: 'Gestión de Compras', ... })
```

### **Crear una ola:**
```typescript
const { createOla } = useOlaActions()

await createOla({
    concepto: 'Automatización de órdenes',
    tipoImplementacion: 'Desarrollo de Sistema',
    prioridad: 'Muy Alta',
    ola_descripcion: 'Inmediato',
    dniProceso: 101
})
```

### **Enviar VoBo:**
```typescript
const { sendVoBo } = useOlaActions()

await sendVoBo({
    dniProceso: 101,
    correos: ['user1@empresa.com', 'user2@empresa.com']
})
```

---

## 🔄 Flujo de Trabajo

1. **Usuario selecciona un proceso** del dropdown
2. **Sistema carga las olas** asociadas al proceso
3. **Olas se agrupan automáticamente** en 4 columnas (0, 1, 2, 3)
4. **Usuario puede:**
   - Agregar nuevas olas
   - Enviar a VoBo
   - Ver código de colores

---

## 🛠️ Migración desde Vue 2

### **Cambios principales:**
- ✅ Vue 2 → Vue 3 (Composition API)
- ✅ Bootstrap → DaisyUI + Tailwind
- ✅ jQuery → Vue reactivity
- ✅ SweetAlert2 modals → Custom Vue modals
- ✅ vue-resource → Fetch API (mock)
- ✅ Mixins → Composables

### **Equivalencias:**
| Vue 2 (Viejo) | Vue 3 (Nuevo) |
|---------------|---------------|
| `new Vue({ el, data })` | `defineComponent`, `ref`, `reactive` |
| `this.$http.post()` | `olaServices.createOla()` |
| `Swal.fire()` | `<AddOlaModal />` |
| `v-on:click` | `@click` |
| Global state | Pinia store |

---

## 📝 Notas Técnicas

### **Validaciones:**
- Email regex en correos externos
- Campos requeridos en modal de agregar ola
- Mínimo 1 correo para envío VoBo

### **Rendimiento:**
- Computed properties para agrupación de olas
- Lazy loading de usuarios VoBo
- Mock con delays realistas (300-600ms)

### **Accesibilidad:**
- Labels descriptivos
- Estados disabled cuando corresponde
- Feedback visual en loading states

---

## 🎉 Estado del Módulo

✅ **Completado al 100%**

- [x] Tipos e interfaces
- [x] Servicios mock
- [x] Store Pinia
- [x] Composables
- [x] Componentes
- [x] Vista principal
- [x] Funcionalidad VoBo
- [x] Código de colores
- [x] Responsive design

---

## 🔮 Posibles Mejoras Futuras

- [ ] Drag & drop entre columnas
- [ ] Filtros y búsqueda
- [ ] Exportar a Excel/PDF
- [ ] Historial de cambios
- [ ] Comentarios en olas
- [ ] Asignación de responsables
- [ ] Notificaciones en tiempo real
- [ ] Integración con backend real

---

## 👨‍💻 Autor

**Migrado desde:** Vue 2 + Bootstrap + .NET Framework  
**Migrado a:** Vue 3 + DaisyUI + Vite  
**Fecha:** Oct 2025
