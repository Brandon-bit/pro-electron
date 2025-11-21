# Guía de Configuración de Máscaras de Cuentas Contables

## 📋 Descripción General

El sistema de máscaras de cuentas contables ha sido diseñado para ser **extremadamente flexible y adaptable** a las necesidades específicas de cualquier empresa, independientemente de su sector, tamaño o metodología contable.

## 🎯 Características Principales

### 1. **Plantillas Predefinidas**

El sistema incluye 10 plantillas predefinidas para diferentes industrias y estándares:

#### **Plantillas Estándar**
- **NIF Mexicana Estándar (6 niveles)**: `0000-00-00-00-00-00`
  - Ideal para empresas que siguen las Normas de Información Financiera de México
  - Estructura: Grupo-Subgrupo-Mayor-Subcuenta-Auxiliar-Subauxiliar
  
- **NIF Mexicana Simplificada (4 niveles)**: `0000-00-00-00`
  - Para PYMEs y empresas con estructura contable simplificada
  - Estructura: Grupo-Subgrupo-Mayor-Subcuenta

- **IFRS Básico (3 niveles)**: `0000-000-000`
  - Para empresas que siguen Normas Internacionales de Información Financiera
  - Estructura más simple y estandarizada

#### **Plantillas por Industria**

- **Manufactura**: `000-00-00-00-0000`
  - 5 niveles + código de proyecto
  - Permite seguimiento por línea de producción, centro de costos, proceso, cuenta y proyecto

- **Servicios**: `0000-000-000-000`
  - 4 niveles + código de cliente/proyecto
  - Enfocado en servicios profesionales, consultorías, etc.

- **Comercio (Retail)**: `000-00-0000`
  - Estructura: Tienda-Departamento-Producto
  - Ideal para cadenas de tiendas o comercios con múltiples ubicaciones

- **Construcción**: `AAAA-00-0000`
  - Estructura: Proyecto-Fase-Cuenta (alfanumérico)
  - Permite códigos de proyecto alfanuméricos para mejor identificación

#### **Plantillas Especiales**

- **Estilo SAP (Alfanumérico)**: `AAAA-AAA-AAA`
  - Compatible con sistemas ERP tipo SAP
  - Totalmente alfanumérico

- **Sin Separador**: `000000000`
  - Código continuo sin guiones
  - Para empresas que prefieren códigos compactos

- **Personalizado**: Configuración completamente libre

### 2. **Separadores Configurables**

El sistema soporta múltiples tipos de separadores:

- **Guión (-)**: Más común, fácil lectura
- **Punto (.)**: Estilo europeo/internacional
- **Diagonal (/)**: Menos común pero válido
- **Guión bajo (_)**: Para sistemas que no aceptan guiones
- **Sin separador**: Código continuo

**Ejemplo con diferentes separadores:**
```
1000-01-01-01  (Guión)
1000.01.01.01  (Punto)
1000/01/01/01  (Diagonal)
1000_01_01_01  (Guión bajo)
100001010 1     (Sin separador)
```

### 3. **Tipos de Caracteres por Segmento**

Cada segmento puede configurarse con diferentes tipos de caracteres:

#### **Numérico (0-9)**
- Solo acepta dígitos
- Ideal para la mayoría de cuentas contables
- Ejemplo: `1000`, `0001`, `9999`

#### **Alfanumérico (A-Z, 0-9)**
- Acepta letras y números
- Útil para códigos de proyectos, centros de costo, departamentos
- Ejemplo: `PRO1`, `A001`, `DEPT`

#### **Alfabético (A-Z)**
- Solo letras
- Para códigos descriptivos o clasificaciones especiales
- Ejemplo: `ACT`, `PAS`, `CAP`

**Ejemplo de configuración mixta:**
```
Estructura: [Numérico]-[Alfabético]-[Alfanumérico]
Formato: 0000-XX-AAAA
Ejemplo: 1000-AC-PRO1
```

### 4. **Longitud Variable (Flexible)**

El sistema permite dos modos de longitud:

#### **Modo Fijo (por defecto)**
- Cada segmento tiene una longitud exacta
- Ejemplo: `1000` (siempre 4 dígitos)
- Ideal para consistencia y validación estricta

#### **Modo Variable (Flexible)**
- Cada segmento puede tener longitud entre mínimo y máximo
- Ejemplo: Mínimo 1, Máximo 4 → acepta `1`, `10`, `100`, `1000`
- Útil para empresas con códigos de diferentes longitudes

**Ventajas del modo flexible:**
- Mayor adaptabilidad
- Códigos más cortos para cuentas simples
- Códigos más largos para cuentas complejas
- Ahorro de espacio en bases de datos

### 5. **Segmentos Obligatorios vs Opcionales**

Cada segmento puede marcarse como:

#### **Obligatorio**
- Debe estar presente en todos los códigos
- Típicamente los primeros 2-3 niveles
- Ejemplo: Grupo y Subgrupo siempre requeridos

#### **Opcional**
- Puede omitirse en códigos simples
- Útil para niveles de detalle adicional
- Ejemplo: Auxiliar y Subauxiliar opcionales

**Ejemplo práctico:**
```
Configuración:
- Nivel 1 (Grupo): Obligatorio, 4 dígitos
- Nivel 2 (Subgrupo): Obligatorio, 2 dígitos
- Nivel 3 (Mayor): Obligatorio, 2 dígitos
- Nivel 4 (Auxiliar): Opcional, 2 dígitos

Códigos válidos:
✓ 1000-01-01     (Mínimo requerido)
✓ 1000-01-01-05  (Con auxiliar)
✗ 1000-01        (Falta nivel Mayor)
```

## 🛠️ Configuración Paso a Paso

### Paso 1: Seleccionar Plantilla Base

1. Elegir una plantilla predefinida según su industria
2. O seleccionar "Personalizado" para empezar desde cero

### Paso 2: Configurar Separador

1. Seleccionar el tipo de separador deseado
2. El formato se actualizará automáticamente

### Paso 3: Configurar Cada Segmento

Para cada segmento, configurar:

1. **Nombre**: Identificador descriptivo (ej: "Grupo", "Departamento", "Proyecto")
2. **Tipo de caracteres**: Numérico, Alfanumérico o Alfabético
3. **Longitud**: 
   - Modo fijo: Número exacto de caracteres
   - Modo flexible: Rango de mínimo a máximo
4. **Descripción**: Explicación de qué representa
5. **Ejemplo**: Código de muestra para referencia
6. **Obligatorio**: Marcar si es requerido

### Paso 4: Revisar Vista Previa

El sistema muestra:
- Formato generado visualmente
- Ejemplos de códigos válidos
- Resumen de configuración (niveles, obligatorios, separador, longitud)

### Paso 5: Guardar Configuración

El sistema valida:
- Al menos un segmento configurado
- Al menos un segmento obligatorio
- Nombres de segmentos únicos
- Rangos de longitud válidos (min ≤ max)

## 📊 Casos de Uso Reales

### Caso 1: Empresa Manufacturera Mediana

**Necesidad**: Seguimiento por centro de costos, departamento y proyecto

**Configuración:**
```
Formato: 0000-00-00-00-AAAA
Segmentos:
1. Grupo (4 dígitos, numérico, obligatorio)
2. Centro de Costo (2 dígitos, numérico, obligatorio)
3. Departamento (2 dígitos, numérico, obligatorio)
4. Cuenta (2 dígitos, numérico, obligatorio)
5. Proyecto (4 caracteres, alfanumérico, opcional)

Ejemplos:
- 1000-01-05-10-PRO1 (Activo - Centro 1 - Depto 5 - Cuenta 10 - Proyecto 1)
- 5000-02-03-25      (Gastos - Centro 2 - Depto 3 - Cuenta 25)
```

### Caso 2: Despacho de Servicios Profesionales

**Necesidad**: Códigos simples con identificación de cliente

**Configuración:**
```
Formato: 000-00-000-AAAA
Segmentos:
1. Tipo de Cuenta (3 dígitos, numérico, obligatorio)
2. Categoría (2 dígitos, numérico, obligatorio)
3. Subcategoría (3 dígitos, numérico, obligatorio)
4. Código Cliente (4 caracteres, alfanumérico, opcional)

Ejemplos:
- 100-01-001-CLIE (Ingreso - Consultoría - Honorarios - Cliente específico)
- 400-05-010      (Gasto - Administrativo - Papelería)
```

### Caso 3: Cadena de Retail

**Necesidad**: Identificación por tienda y departamento

**Configuración:**
```
Formato: 000-00-0000
Segmentos:
1. Tienda (3 dígitos, numérico, obligatorio)
2. Departamento (2 dígitos, numérico, obligatorio)
3. Cuenta (4 dígitos, numérico, obligatorio)

Ejemplos:
- 001-10-1000 (Tienda 1 - Electrónica - Ventas)
- 015-05-2000 (Tienda 15 - Ropa - Inventario)
```

### Caso 4: Empresa Constructora

**Necesidad**: Códigos de proyecto alfanuméricos, fases numéricas

**Configuración:**
```
Formato: AAAA-00-0000
Segmentos:
1. Código Proyecto (4 caracteres, alfanumérico, obligatorio)
2. Fase (2 dígitos, numérico, obligatorio)
3. Cuenta (4 dígitos, numérico, obligatorio)

Ejemplos:
- OBRA-01-1000 (Proyecto OBRA - Fase 1 - Materiales)
- EDIF-03-5000 (Proyecto EDIF - Fase 3 - Mano de obra)
```

## ✅ Validaciones Implementadas

El sistema incluye validaciones automáticas:

1. **Segmentos mínimos**: Al menos 1 segmento
2. **Segmentos obligatorios**: Al menos 1 obligatorio
3. **Nombres únicos**: No puede haber segmentos con el mismo nombre
4. **Rangos válidos**: Mínimo ≤ Máximo en modo flexible
5. **Longitud total**: Alerta si el código es muy largo (>50 caracteres)

## 🔄 Migración y Compatibilidad

### Migración desde otro sistema

Si ya tiene códigos de cuenta:

1. Analizar la estructura actual
2. Identificar los niveles jerárquicos
3. Configurar la máscara que coincida con su estructura actual
4. Validar que todos los códigos existentes cumplan con la nueva máscara

### Compatibilidad con otros sistemas

La configuración es compatible con:
- Sistemas ERP (SAP, Oracle, Microsoft Dynamics)
- Software contable mexicano (COI, Aspel, Contpaq)
- Estándares internacionales (IFRS, US GAAP)
- Normas mexicanas (NIF)

## 🎓 Mejores Prácticas

### 1. Diseño de Estructura

- **Empezar simple**: 3-4 niveles son suficientes para la mayoría
- **Crecer gradualmente**: Agregar niveles solo cuando sea necesario
- **Pensar en el futuro**: Dejar espacio para expansión

### 2. Nomenclatura

- **Nombres descriptivos**: "Centro de Costo" en lugar de "Nivel 3"
- **Documentar**: Agregar descripciones claras en cada segmento
- **Ejemplos reales**: Usar placeholders representativos

### 3. Segmentos Obligatorios

- **Primeros niveles**: Siempre obligatorios (Grupo, Subgrupo, Mayor)
- **Niveles de detalle**: Opcionales (Auxiliar, Proyecto, Cliente)
- **Mínimo 2-3 obligatorios**: Para mantener consistencia

### 4. Longitud de Segmentos

- **Grupo principal**: 3-4 caracteres
- **Niveles intermedios**: 2-3 caracteres
- **Niveles de detalle**: 2-4 caracteres
- **Evitar excesos**: No más de 6 caracteres por segmento

### 5. Tipos de Caracteres

- **Numérico por defecto**: Más fácil de ordenar y validar
- **Alfanumérico para excepciones**: Proyectos, clientes, ubicaciones
- **Consistencia**: Mismo tipo para niveles similares

## 📚 Recursos Adicionales

### Estándares Contables

- [Normas de Información Financiera (NIF)](https://www.cinif.org.mx)
- [International Financial Reporting Standards (IFRS)](https://www.ifrs.org)
- [Consejo Mexicano de Normas de Información Financiera (CINIF)](https://www.cinif.org.mx)

### Documentación Técnica

- Archivo: `MaskSegment` interface en `accountsCatalogTypes.ts`
- Validaciones: `accountsCatalogValidation.ts`
- Componente: `AccountMaskConfigForm.vue`

## 🆘 Preguntas Frecuentes

### ¿Puedo cambiar la configuración después de crear cuentas?

Sí, pero con precaución. Los códigos existentes deben cumplir con la nueva máscara, o deberán migrarse.

### ¿Cuántos niveles recomienda?

- **Mínimo**: 3 niveles (Grupo-Subgrupo-Mayor)
- **Ideal**: 4-5 niveles
- **Máximo práctico**: 6-7 niveles

### ¿Puedo usar códigos alfanuméricos para todo?

Sí, pero no es recomendable. Los códigos numéricos son más fáciles de ordenar, validar y exportar.

### ¿Qué pasa si necesito más niveles después?

Puede agregar nuevos segmentos opcionales sin afectar los códigos existentes.

### ¿Es compatible con el SAT?

Sí, el sistema permite configurar un campo SAT Code independiente de la estructura interna.

## 📞 Soporte

Para soporte adicional o configuraciones específicas, contacte al equipo de desarrollo.

---

**Última actualización**: 2025-01-06
**Versión del documento**: 1.0
