# 📂 Módulo de Contabilidad

## 🏗️ Estructura del Módulo

Este módulo está organizado en dos categorías principales:

### 📊 Contabilidad (Módulos Operativos)
Contiene todos los submódulos relacionados con las operaciones contables diarias:

```
Contabilidad/
├── ActivosFijos/              # Gestión de activos fijos
├── CatalogoDeCuentas/         # Catálogo y plan de cuentas
├── Dashboard/                 # Dashboard contable
├── Depreciacion/              # Cálculo de depreciaciones
├── LibrosDeDiario/            # Libros contables
├── OperacionDeMovimientos/    # Consulta de movimientos
├── PolizasContables/          # Pólizas contables generales
├── PolizasDeDiario/           # Pólizas de diario
├── PolizasDeGastos/           # Pólizas de gastos
└── PolizasDeIngresos/         # Pólizas de ingresos
```

### ⚙️ Configuración (Módulos de Configuración)
Carpeta reservada para futuros módulos de configuración del sistema contable:

```
Configuracion/
└── (Vacía - Lista para nuevos módulos)
```

**Posibles módulos futuros:**
- `ConfiguracionGeneral` - Configuraciones generales del sistema
- `PlantillasContables` - Plantillas y formatos predefinidos
- `ReglasContables` - Reglas de negocio y validaciones
- `IntegracionesExternas` - Configuración de integraciones con otros sistemas

---

## 📝 Alias de Importación

Para importar módulos de Contabilidad, usa el alias `@contabilidad` seguido de `/Contabilidad/`:

```typescript
// ✅ CORRECTO - Usando alias con nueva estructura
import AccountsCatalogView from '@contabilidad/Contabilidad/CatalogoDeCuentas/views/AccountsCatalogView.vue'
import { useAccountCatalogActions } from '@contabilidad/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalogActions'

// ✅ TAMBIÉN VÁLIDO - Ruta absoluta completa
import AccountsCatalogView from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/views/AccountsCatalogView.vue'

// ⚠️ NOTA: El alias @contabilidad apunta a ./src/modules/Contabilidad
// Por lo tanto, debes agregar /Contabilidad/ después del alias para acceder a los módulos operativos
```

### **Importante:**
- El alias `@contabilidad` está configurado para apuntar a `src/modules/Contabilidad`
- Los módulos operativos están en `src/modules/Contabilidad/Contabilidad/`
- Por lo tanto, usa: `@contabilidad/Contabilidad/NombreModulo/...`

---

## 🚀 Rutas Principales

### Navegación

Las rutas están definidas en `src/router/ContabilidadRoutes.ts`:

```
/contabilidad                           → Dashboard
/contabilidad/catalogo-de-cuentas       → Catálogo de Cuentas
/contabilidad/activos                   → Activos Fijos
/contabilidad/depreciacion              → Depreciación
/contabilidad/libros-de-diario          → Libros de Diario
/contabilidad/polizas-contables         → Pólizas Contables
/contabilidad/polizas-de-diario         → Pólizas de Diario
/contabilidad/polizas-de-ingresos       → Pólizas de Ingresos
/contabilidad/polizas-de-gastos         → Pólizas de Gastos
/contabilidad/operacion-de-movimientos  → Operación de Movimientos
```

---

## 🔧 Configuración Técnica

### Alias Configurados

**vite.config.ts:**
```typescript
'@contabilidad': path.resolve(__dirname, './src/modules/Contabilidad')
```

**tsconfig.json:**
```json
"@contabilidad/*": ["src/modules/Contabilidad/*"]
```

**Nota:** Los aliases apuntan a la carpeta padre `Contabilidad`, no directamente a `Contabilidad/Contabilidad`. Esto permite acceso tanto a los módulos operativos como a la carpeta de configuración.

---

## 📦 Agregar Nuevos Módulos

### Módulos Operativos (en /Contabilidad/)

1. Crear carpeta en `src/modules/Contabilidad/Contabilidad/NuevoModulo/`
2. Seguir estructura estándar:
   ```
   NuevoModulo/
   ├── views/           # Vistas principales
   ├── components/      # Componentes reutilizables
   ├── composables/     # Lógica de negocio
   ├── store/           # Estado global
   ├── types/           # Tipos TypeScript
   └── README.md        # Documentación
   ```
3. Agregar rutas en `src/router/ContabilidadRoutes.ts`
4. Importar usando: `@contabilidad/Contabilidad/NuevoModulo/...`

### Módulos de Configuración (en /Configuracion/)

1. Crear carpeta en `src/modules/Contabilidad/Configuracion/NuevoModulo/`
2. Seguir la misma estructura que los módulos operativos
3. Considerar crear un alias específico si es necesario:
   ```typescript
   '@contabilidad-config': path.resolve(__dirname, './src/modules/Contabilidad/Configuracion')
   ```

---

## 🧪 Testing

Para probar los módulos de contabilidad:

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Type checking
npm run type-check
```

---

## 📚 Documentación de Módulos

Cada submódulo tiene su propia documentación:

- 📁 **CatalogoDeCuentas:** Ver `CatalogoDeCuentas/README.md`
- 📁 **Depreciacion:** Ver `Depreciacion/README.md`
- 📁 **OperacionDeMovimientos:** Ver `OperacionDeMovimientos/README.md`
- 📁 **LibrosDeDiario:** Ver `LibrosDeDiario/README.md`

---

## 🔗 Enlaces Útiles

- [Reporte de Reestructuración](../../../RESTRUCTURING_REPORT.md)
- [Guía de Importación de Cuentas](./Contabilidad/CatalogoDeCuentas/docs/IMPORT_ACCOUNTS_GUIDE.md)
- [Configuración de Máscaras](./Contabilidad/CatalogoDeCuentas/docs/MASK_CONFIGURATION_GUIDE.md)

---

## 🤝 Contribuir

Al agregar nuevos módulos o funcionalidades:

1. ✅ Usa el alias `@contabilidad` para imports
2. ✅ Sigue la estructura de carpetas establecida
3. ✅ Documenta el módulo con un README.md
4. ✅ Agrega las rutas correspondientes
5. ✅ Incluye tipos TypeScript
6. ✅ Escribe componentes reutilizables

---

**Última Actualización:** 7 de Noviembre de 2025  
**Versión:** 2.0 (Post-Reestructuración)
