# CharacterTypes Module

## Overview
CRUD module for managing **Tipos de Caracteres** (Character Types) used in accounting mask segments.

## Purpose
Character Types define what kind of data each segment of the accounting mask can contain:
- **Numérico** (Numeric): 0-9
- **Alfabético** (Alpha): A-Z
- **Alfanumérico** (Alphanumeric): A-Z, 0-9

These are used when configuring the structure of account codes in the mask configuration.

## Backend API

**Base Route:** `/contabilidad/tipocaractersegmento`

**Endpoints:**
- `GET /` - Paginated list
- `GET /{id}` - Get by ID
- `GET /lista` - Get all (no pagination)
- `POST /` - Create new
- `PUT /{id}` - Update
- `DELETE /{id}?borradoLogico=true` - Soft delete

## Special Rules

### Codigo Field
> **CRITICAL RULE:** The `codigo` field is **ALWAYS** sent as empty string `""` and is **NEVER** shown in forms or tables.

- ✅ Included in backend Request/Response types
- ✅ Mapped to empty string in `mappingCharacterTypesData.ts`
- ❌ NOT in FormDTO
- ❌ NOT in validation schema
- ❌ NOT rendered in form
- ❌ NOT shown in table

### Backend-Managed Fields
These fields are set by the backend and not exposed in frontend forms:
- `idCuenta` - Account ID
- `idUsuario` - User ID
- `fechacreacion` - Creation date
- `fechaactualizacion` - Update date

## Module Structure

```
CharacterTypes/
├── components/
│   ├── CharacterTypeForm.vue         - Create/Edit form
│   └── CharacterTypeModal.vue        - Modal wrapper
├── composables/
│   ├── useCharacterTypes.ts          - Table columns
│   ├── useCharacterTypesActions.ts   - API calls
│   └── mappingCharacterTypesData.ts  - DTO mappings
├── store/
│   └── characterTypesStore.ts        - Pinia store
├── types/
│   └── characterTypesTypes.ts        - TypeScript interfaces
├── validations/
│   └── characterTypesValidation.ts   - Zod schema
└── views/
    └── CharacterTypesView.vue        - Main view with table
```

## Usage

### In Routes
```typescript
{
    path: 'character-types',
    name: 'CharacterTypes',
    component: () => import('@contabilidad/Configuracion/CharacterTypes/views/CharacterTypesView.vue')
}
```

### Programmatic Access
```typescript
import { useCharacterTypesActions } from '@contabilidad/Configuracion/CharacterTypes/composables/useCharacterTypesActions'

const { getAllCharacterTypes } = useCharacterTypesActions()

// Get all character types for a dropdown
const types = await getAllCharacterTypes()
```

## Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Nombre | string | Yes | Max 100 chars |
| Descripción | string | No | Max 255 chars |
| Activo | boolean | Yes | Default: true |

**Note:** Código field is NOT in the form (always sent as empty string to backend).

## Table Columns

| Column | Description |
|--------|-------------|
| Nombre | Character type name |
| Descripción | Description |
| Estado | Active/Inactive badge |

**Note:** Código column is NOT shown (special rule).

## Integration Points

### With MaskConfig Module
Character Types are used in the Mask Configuration module when defining segments:
- Each segment has a `charType` that maps to a Character Type
- Frontend uses enum: `'numeric' | 'alphanumeric' | 'alpha'`
- Backend uses `idTipoCaracter`: `1 | 2 | 3`
- Mapping handled in `mappingMaskConfigData.ts`

## Testing

- [ ] Create new character type
- [ ] Edit existing character type
- [ ] Delete character type (soft delete)
- [ ] Pagination works correctly
- [ ] Search/filter (if implemented)
- [ ] Codigo always sent as empty string
- [ ] Codigo not visible in UI
- [ ] Validation works correctly
- [ ] Active/Inactive toggle works

## Pattern Consistency

This module follows the EXACT same pattern as:
- `AccountClasification`
- `AccountNature`
- `AccountTypes`

All use:
- ✅ BaseTable for data display
- ✅ BaseModal for create/edit
- ✅ vee-validate + Zod for validation
- ✅ Pinia for state management
- ✅ Mapping composables for DTO transformation
- ✅ codigo field always empty string (never shown)
