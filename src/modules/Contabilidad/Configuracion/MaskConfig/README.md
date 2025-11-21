# Configuración de Máscara Contable

## 📋 Descripción

Módulo para gestionar la configuración de la máscara contable del sistema. Define la estructura y formato del catálogo de cuentas, incluyendo niveles jerárquicos, separadores y tipos de caracteres permitidos.

## 🎯 Características

- **Formatos Predefinidos**: Templates listos para usar (NIF Mexicana, IFRS, SAP, etc.)
- **Configuración Manual**: Personalización completa de segmentos y formato
- **Vista Previa en Tiempo Real**: Visualización instantánea del formato configurado
- **Store Global**: Configuración accesible desde el catálogo de cuentas
- **Mock API**: Simulación de endpoints GET/POST/PUT
- **Validación con Zod**: Esquema robusto de validación

## 📁 Estructura de Archivos

```
MaskConfig/
├── types/
│   └── maskConfigTypes.ts            # Tipos TypeScript completos
├── store/
│   └── maskConfigStore.ts            # Store Pinia con configuración global
├── composables/
│   ├── useMaskConfigActions.ts       # Acciones CRUD (GET/POST/PUT)
│   └── mappingMaskConfigData.ts      # Mapeo de datos
├── validations/
│   └── maskConfigValidation.ts       # Esquemas Zod
├── components/
│   └── MaskConfigForm.vue            # Formulario de configuración
├── views/
│   └── MaskConfigView.vue            # Vista principal
└── README.md
```

## 🚀 Uso

### Importar Store Global

```typescript
import useMaskConfigStore from '@contabilidad/Configuracion/MaskConfig/store/maskConfigStore'

const maskConfigStore = useMaskConfigStore()

// Obtener formato actual
const format = maskConfigStore.getMaskFormat
// Ejemplo: "0000-00-00-00-00-00"

// Obtener separador
const separator = maskConfigStore.getSeparator
// Ejemplo: "-"

// Obtener segmentos
const segments = maskConfigStore.getSegments

// Obtener profundidad máxima
const maxDepth = maskConfigStore.getMaxDepth
```

### Usar Acciones

```typescript
import { useMaskConfigActions } from '@contabilidad/Configuracion/MaskConfig/composables/useMaskConfigActions'

const { getMaskConfig, updateMaskConfig } = useMaskConfigActions()

// Obtener configuración actual
const config = await getMaskConfig()

// Actualizar configuración
await updateMaskConfig(1, {
    format: '0000-00-00-00',
    separator: '-',
    maxDepth: 4,
    allowFlexibleLength: false,
    segments: [...]
})
```

## 🎨 Componentes

### MaskConfigForm

Formulario principal para configurar la máscara contable.

**Props:** Ninguno

**Eventos:** Ninguno (auto-guardado)

**Características:**
- Selector de formatos predefinidos
- Configuración manual de separador y profundidad
- Vista previa en tiempo real del formato
- Estadísticas visuales (segmentos, profundidad, separador)
- Guardado con feedback visual

## 📊 Tipos de Datos

### MaskSegment
```typescript
interface MaskSegment {
    id: string
    name: string              // Ej: "Grupo", "Mayor"
    digits: number            // Cantidad de dígitos
    minDigits: number         // Mínimo permitido
    maxDigits: number         // Máximo permitido
    charType: CharType        // 'numeric' | 'alphanumeric' | 'alpha'
    required: boolean         // Si es obligatorio
    description: string       // Descripción del segmento
    placeholder: string       // Ejemplo
}
```

### MaskConfiguration
```typescript
interface MaskConfiguration {
    format: string                    // Ej: "0000-00-00-00"
    segments: MaskSegment[]           // Segmentos configurados
    separator: string                 // Separador entre segmentos
    maxDepth: number                  // Profundidad máxima
    allowFlexibleLength: boolean      // Permitir longitud variable
}
```

## 🎭 Formatos Predefinidos

### NIF Mexicana Estándar (6 niveles)
```
Formato: 0000-00-00-00-00-00
Ejemplo: 1000-01-01-01-01-01
Niveles: Grupo-Subgrupo-Mayor-Subcuenta-Auxiliar-Subauxiliar
```

### NIF Mexicana Simplificada (4 niveles)
```
Formato: 0000-00-00-00
Ejemplo: 1000-01-01-01
Niveles: Grupo-Subgrupo-Mayor-Subcuenta
```

### IFRS Básico (3 niveles)
```
Formato: 0000-000-000
Ejemplo: 1000-001-001
Niveles: Grupo-Categoría-Cuenta
```

### Sin Separador
```
Formato: 000000000
Ejemplo: 100010101
Niveles: Código continuo
```

## 🔄 Flujo de Datos

1. Vista carga `MaskConfigForm`
2. Form llama a `getMaskConfig()` al montar
3. Mock API retorna configuración actual
4. Datos se cargan en el store global
5. Usuario modifica separador, profundidad o aplica formato predefinido
6. Vista previa se actualiza en tiempo real
7. Al guardar, se llama a `updateMaskConfig()`
8. Store global se actualiza
9. La configuración está disponible para el catálogo de cuentas

## 🌐 Endpoints Simulados

### GET - Obtener Configuración
```
GET /api/contabilidad/configuracion/mascara
Response: MaskConfigResponse
```

### POST - Crear Configuración
```
POST /api/contabilidad/configuracion/mascara
Body: MaskConfigRequestDTO
Response: MaskConfigResponse
```

### PUT - Actualizar Configuración
```
PUT /api/contabilidad/configuracion/mascara/:id
Body: MaskConfigRequestDTO
Response: MaskConfigResponse
```

## 💡 Impacto en el Sistema

La configuración de máscara afecta:

1. **Catálogo de Cuentas**
   - Estructura jerárquica de cuentas
   - Validación de códigos al crear/editar
   - Formato de visualización

2. **Búsqueda y Filtros**
   - Búsqueda por niveles específicos
   - Agrupación por jerarquía

3. **Reportes**
   - Agrupación de cuentas por nivel
   - Totales por segmento

4. **Validaciones**
   - Longitud mínima y máxima
   - Tipo de caracteres permitidos
   - Niveles requeridos vs opcionales

## 🔗 Integración con Catálogo de Cuentas

```typescript
import useMaskConfigStore from '@contabilidad/Configuracion/MaskConfig/store/maskConfigStore'

// En el formulario de cuentas
const maskConfigStore = useMaskConfigStore()
const maskFormat = maskConfigStore.getMaskFormat
const separator = maskConfigStore.getSeparator

// Validar código de cuenta contra la máscara
const validateAccountCode = (code: string): boolean => {
    const segments = code.split(separator)
    const configSegments = maskConfigStore.getSegments
    
    // Validar cada segmento según configuración...
    return true
}

// Generar placeholder para input
const accountCodePlaceholder = computed(() => {
    return maskConfigStore.getMaskFormat.replace(/0/g, '_')
})
```

## ✅ Validaciones

Esquema Zod:
```typescript
maskConfigSchema = z.object({
    format: z.string().min(1),
    separator: z.string(),
    maxDepth: z.number().min(1).max(10),
    allowFlexibleLength: z.boolean(),
    segments: z.array(maskSegmentSchema).min(1)
})
```

## 🔧 Ejemplos de Uso

### Aplicar Formato Predefinido
```typescript
// Usuario selecciona "NIF Mexicana Simplificada"
// El sistema automáticamente configura:
{
    format: '0000-00-00-00',
    separator: '-',
    maxDepth: 4,
    segments: [...]
}
```

### Vista Previa Dinámica
```typescript
// Conforme el usuario cambia la configuración:
Separador: "-" → Formato: "0000-00-00"
Separador: "." → Formato: "0000.00.00"
Separador: "" → Formato: "00000000"
```

## 📝 Migración desde CatalogoDeCuentas

Esta funcionalidad se migró desde:
```
/contabilidad/catalogo-de-cuentas/configuracion-mascara
```

A la nueva ubicación:
```
/contabilidad/configuracion/mascara
```

**Razones de la migración:**
- ✅ Mejor organización modular
- ✅ Separación de responsabilidades
- ✅ Configuración centralizada y reutilizable
- ✅ Más fácil de mantener y escalar

## 🎯 Próximos Pasos

- Conectar con APIs reales
- Implementar validación avanzada de códigos
- Agregar más formatos predefinidos
- Exportar/importar configuraciones
- Historial de cambios de máscara
- Migración automática de cuentas al cambiar formato

## ⚠️ Consideraciones Importantes

1. **Cambios Críticos**: Modificar la máscara afecta todo el catálogo de cuentas existente
2. **Validación Previa**: Verificar impacto antes de guardar cambios
3. **Respaldo**: Recomendado respaldar antes de cambios mayores
4. **Comunicación**: Notificar a usuarios sobre cambios en la estructura
