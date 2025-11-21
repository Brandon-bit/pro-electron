# 📁 Account Types (Tipos de Cuenta)

## 📋 Descripción

Módulo de configuración para gestionar los tipos de cuenta contable. Permite crear, editar, consultar y eliminar los diferentes tipos de cuentas que se utilizan en el catálogo de cuentas.

## 🎯 Propósito

Este módulo reemplaza los valores hardcodeados de `typeOptions` que anteriormente estaban en `useAccountCatalogActions.ts`, permitiendo que los tipos de cuenta sean configurables y administrables desde la interfaz.

## 📊 Tipos de Cuenta por Defecto

1. **Mayor** - Cuenta de mayor general
2. **Detalle** - Cuenta de detalle específico
3. **Título** - Cuenta de título agrupador
4. **Subtítulo** - Cuenta de subtítulo

## 🏗️ Estructura del Módulo

```
AccountTypes/
├── components/
│   ├── AccountTypeForm.vue           # Formulario de creación/edición
│   ├── AccountTypeModal.vue          # Modal CRUD
│   ├── AccountTypeTable.vue          # Tabla de datos
│   └── DeleteAccountType.vue         # Confirmación de eliminación
├── composables/
│   ├── mappingAccountTypesData.ts    # Mapeo de datos
│   ├── useAccountTypes.ts            # Lógica de tabla
│   └── useAccountTypesActions.ts     # Operaciones CRUD
├── store/
│   └── accountTypesStore.ts          # Estado global (Pinia)
├── types/
│   └── accountTypesTypes.ts          # Interfaces TypeScript
├── validations/
│   └── accountTypesValidation.ts     # Validaciones (Zod)
├── views/
│   └── AccountTypesView.vue          # Vista principal
└── README.md                         # Documentación
```

## 🔌 API Endpoints (Mock)

### GET `/api/contabilidad/configuracion/tipos-cuenta`
Obtiene todos los tipos de cuenta

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "Mayor",
    "descripcion": "Cuenta de mayor general",
    "activo": true,
    "fechaCreacion": "2025-01-01T00:00:00Z",
    "fechaActualizacion": "2025-01-01T00:00:00Z"
  }
]
```

### GET `/api/contabilidad/configuracion/tipos-cuenta/:id`
Obtiene un tipo de cuenta por ID

### POST `/api/contabilidad/configuracion/tipos-cuenta`
Crea un nuevo tipo de cuenta

**Request:**
```json
{
  "nombre": "Nuevo Tipo",
  "descripcion": "Descripción del nuevo tipo",
  "activo": true
}
```

### PUT `/api/contabilidad/configuracion/tipos-cuenta/:id`
Actualiza un tipo de cuenta existente

### DELETE `/api/contabilidad/configuracion/tipos-cuenta/:id`
Elimina un tipo de cuenta

## 💻 Uso

### En el Catálogo de Cuentas

```typescript
import { useAccountTypesActions } from '@contabilidad/Configuracion/AccountTypes/composables/useAccountTypesActions'

const { getAccountTypeOptions } = useAccountTypesActions()

// Obtener opciones para select
const typeOptions = await getAccountTypeOptions()
// Retorna: [{ id: 1, label: 'Mayor' }, ...]
```

### En la Vista de Configuración

Navega a: `/contabilidad/configuracion/account-types`

**Funcionalidades:**
- ✅ Ver lista de todos los tipos de cuenta
- ✅ Crear nuevo tipo de cuenta
- ✅ Editar tipo de cuenta existente
- ✅ Eliminar tipo de cuenta
- ✅ Activar/Desactivar tipo de cuenta

## 🎨 Componentes

### AccountTypesView
Vista principal que integra tabla y modales.

### AccountTypeTable
Tabla con las siguientes columnas:
- ID
- Nombre
- Descripción
- Estado (Activo/Inactivo)
- Acciones (Editar/Eliminar)

### AccountTypeModal
Modal para crear/editar con formulario integrado.

### AccountTypeForm
Formulario con campos:
- **Nombre*** (requerido)
- **Descripción** (opcional)
- **Activo** (checkbox)

### DeleteAccountType
Modal de confirmación de eliminación con advertencia.

## 📝 Validaciones

Implementadas con **Zod**:

```typescript
- Nombre: requerido, min 2 caracteres, max 100
- Descripción: opcional, max 500 caracteres
- Activo: booleano, default true
```

## 🔧 Store (Pinia)

```typescript
{
  currentAccountType: AccountTypeFormDTO
}

Actions:
- setAccountType(accountType)
- resetAccountType()
```

## 📦 Types

```typescript
AccountTypeDTO          // Frontend format
AccountTypeFormDTO      // Form format
AccountTypeResponse     // Backend response
AccountTypeRequest      // Backend request
SelectOptionDTO         // Select options
```

## 🚀 Próximos Pasos

1. ✅ Implementar CRUD completo con mock data
2. ⏳ Conectar con API real del backend
3. ⏳ Agregar paginación si hay muchos registros
4. ⏳ Agregar búsqueda/filtros
5. ⏳ Agregar ordenamiento por columnas

## 🔗 Integración

Este módulo se integra con:
- **CatalogoDeCuentas** - Consume los tipos de cuenta para el formulario de cuentas
- **Otros módulos de configuración** - Parte del sistema de configuración contable

## ⚠️ Notas

- Actualmente usa **mock data** para simular API calls
- Los logs de consola muestran las operaciones realizadas
- Los IDs son autogenerados en el mock
- Estado persistente con Pinia

---

**Desarrollado:** Noviembre 2025  
**Versión:** 1.0
