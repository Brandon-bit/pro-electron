# 🔧 DEBUG: Metodología de Procesos

## Problemas Reportados

1. ❌ **Cronómetro no se inicia** cuando se marca una actividad
2. ❌ **Modal no aparece** cuando se hace click en "Agregar actividad"

---

## Cambios Realizados

### ✅ **1. FaseCard.vue**
- Agregado `watch` para detectar cuando `fase.activa` cambia de `false` a `true`
- Cuando la fase se activa, llama automáticamente a `startCronometro()`
- Agregados logs de debug en `handleAddActividad()`

### ✅ **2. General.vue**
- Agregados logs en `openAddModal()` para verificar que se llama
- Logs en `closeAddModal()`, `openDeleteModal()`, `closeDeleteModal()`

### ✅ **3. useMetodologiaActions.ts**
- Agregados logs detallados en `finalizarActividad()`
- Muestra cuando se actualiza `Start` y `End` de la fase

---

## Instrucciones de Prueba

### **Paso 1: Abrir DevTools**
1. Presiona `F12` o `Ctrl+Shift+I`
2. Ve a la pestaña **Console**
3. Limpia la consola (icono 🚫)

### **Paso 2: Cargar la Vista**
1. Navega a: `http://localhost:5173/procesos/procesos-de-negocio/metodologia-de-procesos`
2. Selecciona un proceso (ej: "Desarrollo de Software")

### **Paso 3: Probar Cronómetro**
1. En la **Fase 1 - Planificación**, marca el checkbox de la **primera actividad**
2. **Observa la consola**, debes ver:
   ```
   [useMetodologiaActions] Finalizando actividad: { dniFase: ..., dni: ..., dniProc: ... }
   [useMetodologiaActions] Response: { status: 'success', ... }
   [useMetodologiaActions] Fase activada, Start: 2025-10-26T...
   [useMetodologiaActions] Actualizando fase con: { activa: true, Start: ... }
   [FaseCard] Watch detectó fase.activa cambió a true
   ```
3. **Verifica visualmente:**
   - El card debe cambiar a color **azul** (activa)
   - Debe aparecer el cronómetro: `⏱ 00:00:01`, `00:00:02`, etc.
   - Progress bar debe mostrar 33% (1/3)

### **Paso 4: Probar Modal Agregar**
1. En cualquier fase, haz click en el botón **"+ Agregar actividad"**
2. **Observa la consola**, debes ver:
   ```
   [FaseCard] Click en agregar actividad, fase: Planificación
   [FaseCard] Emitiendo evento add-actividad
   [General] openAddModal llamado, fase: Planificación
   [General] Modal abierto, isAddModalOpen: true
   ```
3. **Verifica visualmente:**
   - Debe aparecer un **modal** con el título "Agregar Actividad"
   - Debe tener un input de texto
   - Botones "Cancelar" y "Agregar"

---

## Posibles Problemas y Soluciones

### ❌ **Si el modal NO aparece:**

**Síntomas en consola:**
```
[FaseCard] Click en agregar actividad, fase: ...
[FaseCard] Emitiendo evento add-actividad
(no hay más logs)
```

**Causa:** El evento no llega a `General.vue`

**Solución:** Verificar que en `General.vue`, el componente `FaseCard` tiene el listener:
```vue
<FaseCard
    @add-actividad="openAddModal"  <!-- Este debe estar -->
    @delete-actividad="openDeleteModal"
/>
```

---

### ❌ **Si el cronómetro NO inicia:**

**Síntomas en consola:**
```
[useMetodologiaActions] Fase activada, Start: ...
(pero el cronómetro no se ve en pantalla)
```

**Causa:** El `watch` no se dispara o el `Start` no se guarda correctamente

**Solución:** Verificar que:
1. El `watch` está en `FaseCard.vue`
2. La fase se está actualizando en el store
3. El `Start` es un string ISO válido

---

## Qué Esperar (Comportamiento Correcto)

### ✅ **Marcar Primera Actividad:**
1. Checkbox se marca ☑
2. Card cambia a azul
3. Aparece cronómetro: `⏱ 00:00:01`
4. Progress: 33% (1/3)
5. Stats arriba: "En Progreso: 1"

### ✅ **Marcar Todas las Actividades:**
1. Todos los checkboxes marcados ☑☑☑
2. Card cambia a verde
3. Cronómetro se detiene
4. Progress: 100%
5. Stats arriba: "Completadas: 1"

### ✅ **Click en Agregar:**
1. Modal aparece con backdrop
2. Input enfocado automáticamente
3. Botones funcionales

---

## Reporte de Resultados

Por favor, copia y pega los logs de la consola aquí:

**Logs al marcar checkbox:**
```
[Pegar aquí]
```

**Logs al hacer click en Agregar:**
```
[Pegar aquí]
```

**Comportamiento visual:**
- [ ] Cronómetro se inicia
- [ ] Card cambia de color
- [ ] Modal aparece

---

## Siguiente Paso

Si después de estas pruebas:
- ✅ **Todo funciona:** Podemos remover los console.logs
- ❌ **Algo falla:** Necesito ver los logs exactos para diagnosticar
