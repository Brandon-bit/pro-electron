# 📁 Account Clasification (Clasificación de Cuenta)

## 📋 Descripción

Módulo de configuración para gestionar las clasificaciones de cuenta contable. Permite crear, editar, consultar y eliminar las diferentes clasificaciones que se utilizan en el catálogo de cuentas.

## 🎯 Propósito

Este módulo reemplaza los valores hardcodeados de `clasificationOptions` que anteriormente estaban en `useAccountCatalogActions.ts`, permitiendo que las clasificaciones de cuenta sean configurables y administrables desde la interfaz.

## 📊 Clasificaciones de Cuenta por Defecto

1. **Balance** - Cuentas del balance general (Activo, Pasivo, Capital)
2. **Orden** - Cuentas de orden que no afectan el balance
3. **Resultados** - Cuentas de resultados (Ingresos y Gastos)

## 🏗️ Estructura del Módulo

```
AccountClasification/
├── components/
│   ├── AccountClasificationForm.vue           # Formulario de creación/edición
│   ├── AccountClasificationModal.vue          # Modal CRUD
│   ├── AccountClasificationTable.vue          # Tabla de datos
│   └── DeleteAccountClasification.vue         # Confirmación de eliminación
├── composables/
│   ├── mappingAccountClasificationData.ts     # Mapeo de datos
│   ├── useAccountClasification.ts             # Lógica de tabla
│   └── useAccountClasificationActions.ts      # Operaciones CRUD
├── store/
│   └── accountClasificationStore.ts           # Estado global (Pinia)
├── types/
│   └── accountClasificationTypes.ts           # Interfaces TypeScript
├── validations/
│   └── accountClasificationValidation.ts      # Validaciones (Zod)
├── views/
│   └── AccountClasificationView.vue           # Vista principal
└── README.md                                  # Documentación
```

## 🔌 API Endpoints (Mock)

### GET `/api/contabilidad/configuracion/clasificacion-cuenta`
Obtiene todas las clasificaciones de cuenta

### POST `/api/contabilidad/configuracion/clasificacion-cuenta`
Crea una nueva clasificación de cuenta

### PUT `/api/contabilidad/configuracion/clasificacion-cuenta/:id`
Actualiza una clasificación de cuenta existente

### DELETE `/api/contabilidad/configuracion/clasificacion-cuenta/:id`
Elimina una clasificación de cuenta

## 💻 Uso

### En el Catálogo de Cuentas

```typescript
import { useAccountClasificationActions } from '@contabilidad/Configuracion/AccountClasification/composables/useAccountClasificationActions'

const { getAccountClasificationOptions } = useAccountClasificationActions()

// Obtener opciones para select
const clasificationOptions = await getAccountClasificationOptions()
// Retorna: [{ id: 1, label: 'Balance' }, { id: 2, label: 'Orden' }, { id: 3, label: 'Resultados' }]
```

## 🚀 Ruta

Navega a: `/contabilidad/configuracion/account-clasification`

---

**Desarrollado:** Noviembre 2025  
**Versión:** 1.0
