# 📊 Matriz RASCI

## 📋 Descripción

Módulo para gestionar y visualizar matrices RASCI (Responsable, Accountable, Soporte, Consultado, Informado) de procesos de negocio. Permite editar responsabilidades, calcular estadísticas automáticamente y exportar resultados.

---

## 🗂️ Estructura del Módulo

```
Rasci/
├── components/
│   ├── EditRasciModal.vue       # Modal para editar valores RASCI
│   ├── LeyendaRasci.vue         # Leyenda explicativa RASCI
│   ├── MatrizRasci.vue          # Tabla principal con la matriz
│   ├── SelectorProceso.vue      # Selector de proceso
│   └── StatsCards.vue           # KPIs y estadísticas
├── composables/
│   ├── useRasciActions.ts       # Acciones (cargar, modificar)
│   └── useRasciUtils.ts         # Utilidades (colores, exportación)
├── services/
│   └── rasciServices.ts         # Servicios API (mock)
├── store/
│   └── rasciStore.ts            # Store Pinia con cálculos
├── types/
│   └── rasci.types.ts           # Tipos e interfaces
└── views/
    └── General.vue              # Vista principal
```

---

## 🎯 Funcionalidades

### ✅ **Matriz RASCI Interactiva**

Tabla dinámica con:
- **Actividades** en filas
- **Roles/Puestos** en columnas
- **Valores RASCI** editables por celda
- **Click para editar** cada valor individual

### ✅ **Modal de Edición**

Modal con checkboxes para seleccionar:
- **R** - Responsable (ejecuta)
- **A** - Accountable (rinde cuentas)
- **S** - Soporte (brinda apoyo)
- **C** - Consultado (opinión solicitada)
- **I** - Informado (notificado)

Permite combinaciones como: `R/A`, `R/A/S`, `C/I`, etc.

### ✅ **Cálculos Automáticos**

**Por Actividad:**
- Número de Accountables (debe ser idealmente 1)

**Por Rol:**
- Total de R (Responsables)
- Total de A (Accountables)
- Total de S (Soportes)
- Total de C (Consultados)
- Total de I (Informados)
- **Total General** por rol

### ✅ **KPIs y Estadísticas**

Dashboard con 6 KPIs:

1. **Total Actividades** - Número de actividades en el proceso
2. **Total Roles** - Número de roles/puestos involucrados
3. **Total Asignaciones** - Suma de todas las responsabilidades
4. **Sin Accountable** - Actividades sin responsable (alerta)
5. **Múltiples Accountables** - Actividades con >1 Accountable (advertencia)
6. **Roles sin Asignación** - Roles que no participan (alerta)

### ✅ **Colores Semánticos**

**Accountables por Actividad:**
- 🟢 **Verde (1):** Óptimo - un solo accountable
- 🟡 **Amarillo (2):** Aceptable - dos accountables
- 🔴 **Rojo (3+):** Problema - múltiples accountables

**Totales por Rol:**
- 🔴 **Rojo (0):** Ninguna asignación (rol inactivo)
- 🟡 **Amarillo (1-8):** Carga baja
- 🟢 **Verde (9+):** Carga alta (participación activa)

### ✅ **Exportación (Simulada - Frontend Only)**

**1. Exportar CSV:**
- Incluye estadísticas
- Incluye leyenda
- Tabla completa con totales
- Descarga automática

**2. Exportar Excel:**
- Similar a CSV (simulado)
- Compatible con Excel
- Descarga automática

**3. Imprimir / PDF:**
- Abre ventana de impresión del navegador
- CSS optimizado para impresión
- Oculta botones automáticamente

---

## 📦 Data Mock

### **5 Procesos Disponibles:**

1. **Proceso de Compras** (7 actividades, 5 roles)
2. **Proceso de Ventas** (5 actividades, 4 roles)
3. **Proceso de Recursos Humanos** (6 actividades, 4 roles)
4. **Proceso de Desarrollo de Software** (5 actividades, 5 roles)
5. **Proceso de Atención al Cliente** (5 actividades, 3 roles)

### **Ejemplo: Proceso de Compras**

**Roles:**
- Gerente de Compras
- Analista de Compras
- Jefe de Almacén
- Contador
- Gerente General

**Actividades:**
1. Identificar necesidad de compra
2. Solicitar cotizaciones
3. Evaluar proveedores
4. Aprobar orden de compra
5. Recepcionar productos
6. Verificar factura
7. Realizar pago

**Valores de ejemplo:**
```
Actividad 1: A (Gerente), R (Analista), C (Almacén), I (Contador), I (Gerente General)
Actividad 2: A (Gerente), R (Analista), - (Almacén), I (Contador), - (Gerente General)
...
```

---

## 🎨 Diseño UX/UI

### **Layout Responsivo:**

```
[Título: RASCI - Nombre del Proceso]
───────────────────────────────────────
[Selector: Proceso ▼]
───────────────────────────────────────
[Leyenda: R/A/S/C/I]
───────────────────────────────────────
[KPI1] [KPI2] [KPI3] [KPI4] [KPI5] [KPI6]
───────────────────────────────────────
[Botón CSV] [Botón Excel] [Botón PDF]
───────────────────────────────────────
┌────────────────────────────────────────┐
│ MATRIZ RASCI                           │
│ ┌──────────┬─────┬─────┬─────┬─────┐  │
│ │Activity  │Role1│Role2│Role3│ Acc │  │
│ ├──────────┼─────┼─────┼─────┼─────┤  │
│ │ Act 1    │ R/A │  S  │  I  │ 1🟢│  │
│ │ Act 2    │  A  │ R/A │  C  │ 2🟡│  │
│ ├──────────┼─────┼─────┼─────┼─────┤  │
│ │ R Total  │  2  │  1  │  2  │     │  │
│ │ A Total  │  2  │  2  │  3  │     │  │
│ └──────────┴─────┴─────┴─────┴─────┘  │
└────────────────────────────────────────┘
```

### **Características Visuales:**

1. **Badges de Colores:**
   - R (Azul - Primary)
   - A (Morado - Secondary)
   - S (Rosa - Accent)
   - C (Celeste - Info)
   - I (Gris - Neutral)

2. **Botones de Edición:**
   - Círculos pequeños con icono de editar
   - Uno por cada celda
   - Hover effect

3. **Tabla:**
   - Zebra striping (filas alternadas)
   - Header fijo con colores
   - Scroll horizontal en móviles
   - Hover effect en filas

4. **Modal:**
   - Diseño limpio con checkboxes
   - Descripciones de cada rol
   - Botones Cancelar/Guardar

---

## 🧮 Cálculos Automáticos

### **1. Accountables por Actividad:**
```typescript
acc = actividad.Valores.filter(v => v.valor.includes('A')).length
```

### **2. Totales por Tipo RASCI:**
```typescript
R[rolIndex] = actividades.filter(a => 
  a.Valores[rolIndex].valor.includes('R')
).length
```

### **3. Estadísticas:**
```typescript
totalAsignaciones = sum(actividades.flatMap(a => 
  a.Valores.flatMap(v => v.valor.split('/'))
))

promedioAsignacionesPorRol = totalAsignaciones / totalRoles

actividadesSinAccountable = actividades.filter(a => a.acc === 0).length

actividadesConMultiplesAccountables = actividades.filter(a => a.acc > 1).length

rolesSinAsignaciones = roles.filter((_, idx) => 
  totales[5].val[idx] === 0
).length
```

---

## 🚀 Uso

### **Cargar Proceso:**
```typescript
const { loadProcesos, seleccionarProceso } = useRasciActions()

await loadProcesos() // Carga lista de procesos
await seleccionarProceso(1) // Carga matriz del proceso 1
```

### **Modificar Valor:**
```typescript
const { modificarValor } = useRasciActions()

await modificarValor(
    1001, // dni de actividad
    101,  // dni de rol
    { R: true, A: true, S: false, C: false, I: false } // checkboxes
)
```

### **Exportar:**
```typescript
const { exportarCSV, exportarExcel, exportarPDF } = useRasciUtils()

exportarCSV(roles, actividades, totales, nombreProceso, true, estadisticas)
exportarExcel(roles, actividades, totales, nombreProceso, true, estadisticas)
exportarPDF() // window.print()
```

---

## 📊 Interpretación de Resultados

### **Matriz Óptima:**
- ✅ Cada actividad tiene **exactamente 1 Accountable** (columna verde)
- ✅ Todos los roles tienen **al menos 1 asignación** (sin ceros rojos)
- ✅ Distribución balanceada de responsabilidades

### **Problemas Comunes:**

**🔴 Actividades sin Accountable (Acc = 0):**
- **Riesgo:** Nadie rinde cuentas del resultado
- **Solución:** Asignar un Accountable

**🔴 Múltiples Accountables (Acc > 2):**
- **Riesgo:** Confusión sobre quién es responsable final
- **Solución:** Designar un solo Accountable principal

**🔴 Roles sin Asignaciones (Total = 0):**
- **Riesgo:** Rol innecesario o falta definir su participación
- **Solución:** Asignar responsabilidades o eliminar rol

**🟡 Roles Sobrecargados (Total muy alto):**
- **Riesgo:** Cuello de botella en el proceso
- **Solución:** Redistribuir responsabilidades

---

## 🎨 Colores y Badges

### **Badges por Tipo:**
```typescript
R - badge-primary (azul)
A - badge-secondary (morado)
S - badge-accent (rosa)
C - badge-info (celeste)
I - badge-neutral (gris)
```

### **Colores de Estado:**
```typescript
// Accountables
1 → bg-success (verde) ✅ ÓPTIMO
2 → bg-warning (amarillo) ⚠️ ACEPTABLE
3+ → bg-error (rojo) ❌ PROBLEMA

// Totales
0 → bg-error (rojo) ❌ NINGUNO
1-8 → bg-warning (amarillo) ⚠️ BAJO
9+ → bg-success (verde) ✅ ALTO
```

---

## 🛠️ Migración desde Vue 2

### **Cambios Principales:**
- ✅ Vue 2 → Vue 3 (Composition API)
- ✅ Bootstrap → DaisyUI + Tailwind
- ✅ SweetAlert2 → Modal nativo de Vue
- ✅ Inline script → SFCs separados
- ✅ Manual calculations → Computed properties
- ✅ v-model checkboxes → Reactive refs

### **Equivalencias:**

| Vue 2 (Viejo) | Vue 3 (Nuevo) |
|---------------|---------------|
| `comp-rasci` component | `MatrizRasci.vue` |
| `updValor()` method | `abrirModalEdicion()` + modal |
| `actAcc()` method | Computed `actividadesConAccountables` |
| SweetAl ert2 form | `EditRasciModal.vue` |
| Inline totals calculation | Computed `totalesRasci` |
| Bootstrap table | DaisyUI table |

---

## ✅ Estado del Módulo

**Completado al 100%**

- [x] Types e interfaces
- [x] Services mock con 5 procesos
- [x] Store Pinia con cálculos automáticos
- [x] 2 composables (actions + utils)
- [x] 5 componentes funcionales
- [x] Vista principal con estados
- [x] Selector de procesos
- [x] Matriz interactiva con edición
- [x] Modal de edición con checkboxes
- [x] Cálculos automáticos en tiempo real
- [x] 6 KPIs con colores dinámicos
- [x] Totales por tipo RASCI
- [x] Exportación CSV (frontend)
- [x] Exportación Excel (frontend)
- [x] Impresión/PDF optimizada
- [x] Colores semánticos
- [x] Leyenda informativa
- [x] Responsive design
- [x] Loading states
- [x] Empty states
- [x] Animaciones CSS

---

## 🧪 Pruebas

### **URL:**
```
http://localhost:5173/procesos/procesos-de-negocio/rasci
```

### **Flujo de Prueba:**

1. **Selecciona** "Proceso de Compras" en el dropdown
2. **Observa:**
   - Leyenda RASCI
   - 6 KPIs con estadísticas
   - Matriz con 7 actividades y 5 roles
   - Totales en footer
3. **Click** en botón de editar (círculo azul) en cualquier celda
4. **Modal se abre** con checkboxes
5. **Marca/desmarca** checkboxes (R/A/S/C/I)
6. **Guarda** cambios
7. **Observa** que la celda se actualiza con badges
8. **Observa** que los totales se recalculan automáticamente
9. **Observa** que los KPIs se actualizan
10. **Exporta** CSV, Excel o imprime

---

## 🔮 Posibles Mejoras Futuras

- [ ] Agregar/eliminar actividades dinámicamente
- [ ] Agregar/eliminar roles dinámicamente
- [ ] Historial de cambios
- [ ] Comentarios por celda
- [ ] Validaciones estrictas (alertas)
- [ ] Gráficas de distribución (pie charts)
- [ ] Comparar matrices de diferentes procesos
- [ ] Exportar a imagen/PNG
- [ ] Copiar matriz al portapapeles
- [ ] Modo de solo lectura
- [ ] Filtros por rol o actividad
- [ ] Búsqueda en la tabla
- [ ] Atajos de teclado

---

## 👨‍💻 Autor

**Migrado desde:** Vue 2 + Bootstrap + .NET Framework  
**Migrado a:** Vue 3 + DaisyUI + Vite  
**Fecha:** Oct 2025

---

## 📚 Dependencias

- Vue 3
- Pinia
- Tailwind CSS
- DaisyUI
- Vue Toastification
- Material Symbols (iconos)

**Sin dependencias externas para exportación** (todo con APIs nativas del navegador) ✅

---

## 🎉 **¡VISTA 100% FUNCIONAL!**

La matriz RASCI está completamente migrada y lista para usar con diseño moderno, KPIs visuales y exportación simulada. 🚀
