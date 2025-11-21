# 📁 Account Nature (Naturaleza de Cuenta)

## 📋 Descripción

Módulo de configuración para gestionar las naturalezas de cuenta contable. Permite crear, editar, consultar y eliminar las diferentes naturalezas que se utilizan en el catálogo de cuentas.

## 🎯 Propósito

Este módulo reemplaza los valores hardcodeados de `natureOptions` que anteriormente estaban en `useAccountCatalogActions.ts`, permitiendo que las naturalezas de cuenta sean configurables y administrables desde la interfaz.

## 📊 Naturalezas de Cuenta por Defecto

1. **Deudora** - Representa activos y gastos
2. **Acreedora** - Representa pasivos, capital e ingresos

## 🏗️ Estructura del Módulo

```
AccountNature/
├── components/
│   ├── AccountNatureForm.vue           # Formulario de creación/edición
│   ├── AccountNatureModal.vue          # Modal CRUD
│   ├── AccountNatureTable.vue          # Tabla de datos
│   └── DeleteAccountNature.vue         # Confirmación de eliminación
├── composables/
│   ├── mappingAccountNatureData.ts     # Mapeo de datos
│   ├── useAccountNature.ts             # Lógica de tabla
│   └── useAccountNatureActions.ts      # Operaciones CRUD
├── store/
│   └── accountNatureStore.ts           # Estado global (Pinia)
├── types/
│   └── accountNatureTypes.ts           # Interfaces TypeScript
├── validations/
│   └── accountNatureValidation.ts      # Validaciones (Zod)
├── views/
│   └── AccountNatureView.vue           # Vista principal
└── README.md                           # Documentación
```

## 🔌 API Endpoints (Mock)

### GET `/api/contabilidad/configuracion/naturaleza-cuenta`
Obtiene todas las naturalezas de cuenta

### POST `/api/contabilidad/configuracion/naturaleza-cuenta`
Crea una nueva naturaleza de cuenta

### PUT `/api/contabilidad/configuracion/naturaleza-cuenta/:id`
Actualiza una naturaleza de cuenta existente

### DELETE `/api/contabilidad/configuracion/naturaleza-cuenta/:id`
Elimina una naturaleza de cuenta

## 💻 Uso

### En el Catálogo de Cuentas

```typescript
import { useAccountNatureActions } from '@contabilidad/Configuracion/AccountNature/composables/useAccountNatureActions'

const { getAccountNatureOptions } = useAccountNatureActions()

// Obtener opciones para select
const natureOptions = await getAccountNatureOptions()
// Retorna: [{ id: 1, label: 'Deudora' }, { id: 2, label: 'Acreedora' }]
```

## 🚀 Ruta

Navega a: `/contabilidad/configuracion/account-nature`

---

**Desarrollado:** Noviembre 2025  
**Versión:** 1.0
