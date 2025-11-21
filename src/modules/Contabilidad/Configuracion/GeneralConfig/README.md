# Configuración General - Contabilidad

## 📋 Descripción

Módulo para gestionar la configuración general del sistema contable, incluyendo la selección del tipo de empresa (Tradicional o Financiera) que afecta el comportamiento y estructura del catálogo de cuentas.

## 🎯 Características

- **Switch de Tipo de Empresa**: Selector visual para cambiar entre empresa Tradicional y Financiera
- **Store Global**: Configuración accesible desde cualquier parte del sistema
- **Mock API**: Simulación de endpoints GET/PUT para consultar y actualizar
- **Validación con Zod**: Esquema de validación robusto
- **Feedback Visual**: Alertas informativas según el tipo seleccionado

## 📁 Estructura de Archivos

```
GeneralConfig/
├── types/
│   └── generalConfigTypes.ts          # Tipos TypeScript
├── store/
│   └── generalConfigStore.ts          # Store Pinia con estado global
├── composables/
│   ├── useGeneralConfigActions.ts     # Acciones CRUD (mock)
│   └── mappingGeneralConfigData.ts    # Mapeo de datos
├── validations/
│   └── generalConfigValidation.ts     # Esquemas Zod
├── components/
│   └── GeneralConfigForm.vue          # Formulario principal
├── views/
│   └── GeneralConfigView.vue          # Vista principal
└── README.md
```

## 🚀 Uso

### Importar Store Global

```typescript
import useGeneralConfigStore from '@contabilidad/Configuracion/GeneralConfig/store/generalConfigStore'

const generalConfigStore = useGeneralConfigStore()

// Obtener tipo de empresa
const companyType = generalConfigStore.getCompanyType

// Verificar si es financiera
if (generalConfigStore.isFinancialCompany) {
    // Lógica específica para empresa financiera
}

// Verificar si es tradicional
if (generalConfigStore.isTraditionalCompany) {
    // Lógica específica para empresa tradicional
}

// Cambiar tipo de empresa
generalConfigStore.setCompanyType('financiera')
```

### Usar Acciones

```typescript
import { useGeneralConfigActions } from '@contabilidad/Configuracion/GeneralConfig/composables/useGeneralConfigActions'

const { getGeneralConfig, updateGeneralConfig } = useGeneralConfigActions()

// Obtener configuración actual
const config = await getGeneralConfig()

// Actualizar configuración
await updateGeneralConfig({
    companyType: 'financiera',
    description: 'Institución bancaria',
    active: true
})
```

## 🎨 Componentes

### GeneralConfigForm

Formulario principal con switch para seleccionar tipo de empresa.

**Props:** Ninguno

**Eventos:** Ninguno (auto-guardado)

**Características:**
- Toggle switch visual para cambiar entre tipos
- Carga automática de configuración al montar
- Guardado con feedback visual
- Alertas dinámicas según el tipo seleccionado
- TextArea opcional para descripción

## 📊 Tipos de Datos

### CompanyType
```typescript
type CompanyType = 'tradicional' | 'financiera'
```

### GeneralConfigDTO
```typescript
interface GeneralConfigDTO {
    id: number
    companyType: CompanyType
    description: string
    active: boolean
    createdAt: string
    updatedAt: string
}
```

## 🔄 Flujo de Datos

1. Vista carga el componente `GeneralConfigForm`
2. Form llama a `getGeneralConfig()` al montar
3. Mock API simula llamada y retorna datos
4. Datos se mapean y se cargan en el store global
5. Usuario cambia el switch del tipo de empresa
6. Al guardar, se llama a `updateGeneralConfig()`
7. Store global se actualiza con el nuevo tipo
8. El cambio afecta otras partes del sistema (ej: CatalogoDeCuentas)

## 🌐 Endpoints Simulados

### GET - Obtener Configuración
```
GET /api/contabilidad/configuracion/general
Response: GeneralConfigResponse
```

### PUT - Actualizar Configuración
```
PUT /api/contabilidad/configuracion/general
Body: GeneralConfigRequestDTO
Response: GeneralConfigResponse
```

## 💡 Impacto en el Sistema

El tipo de empresa configurado afecta:

1. **Catálogo de Cuentas**
   - Empresa Tradicional: Estructura estándar (Activo, Pasivo, Capital, Ingresos, Gastos)
   - Empresa Financiera: Cuentas especiales (Captación, Colocación, Instrumentos Financieros)

2. **Pólizas Contables**
   - Validaciones diferentes según el tipo
   - Reglas de negocio específicas

3. **Reportes**
   - Formatos adaptados al tipo de empresa

## 🔗 Integración

Para integrar con otros módulos:

```typescript
import useGeneralConfigStore from '@contabilidad/Configuracion/GeneralConfig/store/generalConfigStore'

// En cualquier componente/composable
const generalConfigStore = useGeneralConfigStore()

if (generalConfigStore.isFinancialCompany) {
    // Mostrar opciones para empresa financiera
} else {
    // Mostrar opciones para empresa tradicional
}
```

## ✅ Validaciones

Esquema Zod:
```typescript
generalConfigSchema = z.object({
    companyType: z.enum(['tradicional', 'financiera']),
    description: z.string().optional(),
    active: z.boolean().default(true)
})
```

## 🎯 Próximos Pasos

- Conectar con APIs reales
- Agregar más configuraciones generales
- Implementar permisos para cambiar tipo de empresa
- Agregar logs de auditoría para cambios de configuración
