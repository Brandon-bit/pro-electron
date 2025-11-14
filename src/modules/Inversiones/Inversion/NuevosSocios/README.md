# Módulo: Alta de Nuevos Socios

Formulario multi-paso para el registro de nuevos socios en el sistema.

## Estructura de Carpetas

```
NuevosSocios/
├── components/
│   └── steps/           # Componentes de cada paso del formulario
├── composables/         # Lógica reutilizable
├── types/              # Tipos TypeScript
├── validations/        # Esquemas de validación Zod
├── views/              # Vista principal
└── index.ts            # Exports del módulo
```

## Pasos Implementados

### Paso 1: Datos Personales ✅

**Campos:**
- **Nombre*** (obligatorio)
- **Apellidos*** (obligatorio)
- **Fecha de nacimiento*** (obligatorio)
- **Edad*** (calculada automáticamente, solo lectura)
- **Sexo** (radio buttons: M/F)
- **Estado civil*** (select: Soltero, Casado, Divorciado, Viudo, Unión libre)
- **CURP*** (obligatorio, 18 caracteres, formato mexicano)
- **Lugar de nacimiento** (opcional)
- **Nacionalidad*** (select: Mexicana, Estadounidense, Canadiense, Española, Otra)
- **INE*** (obligatorio, 10-13 dígitos)

**Validaciones:**
- CURP: Formato mexicano válido
- INE: Entre 10 y 13 dígitos
- Edad: Calculada automáticamente, mínimo 18 años
- Todos los campos marcados con * son obligatorios

**Características:**
- ✅ Validación en tiempo real con Zod + VeeValidate
- ✅ Cálculo automático de edad
- ✅ CURP en mayúsculas automáticamente
- ✅ Diseño responsive con grid
- ✅ Borde punteado azul alrededor del formulario

### Paso 2: Contacto ✅

**Campos:**
- **Teléfono Casa** (opcional, con selector de país)
- **Teléfono Celular*** (obligatorio, con selector de país)
- **Correo electrónico*** (obligatorio)

**Validaciones:**
- Teléfonos: 10 dígitos
- Correo: Formato de email válido
- Selector de país: +52 (México), +1 (USA), +34 (España)

**Características:**
- ✅ Selector de código de país con banderas
- ✅ Formato automático de teléfonos (solo números)
- ✅ Validación de email
- ✅ Teléfono casa opcional

### Paso 3: Domicilio ✅

**Campos:**
- **Calle*** (obligatorio)
- **No. Exterior*** (obligatorio)
- **No. Interior** (opcional)
- **Colonia*** (obligatorio)
- **C.P.*** (obligatorio, 5 dígitos)
- **Ciudad*** (obligatorio)
- **Estado*** (obligatorio)
- **País*** (obligatorio)

**Validaciones:**
- Código Postal: 5 dígitos numéricos
- Calle y Colonia: Mínimo 3 caracteres
- Todos los campos marcados con * son obligatorios

**Características:**
- ✅ Formato automático de código postal (solo números)
- ✅ Validación de longitud de campos
- ✅ Diseño responsive con grid

### Paso 4: Datos Financieros ✅

**Campos:**
- **Tipo de Persona** (radio buttons: Persona Física / Persona Moral)
- **Régimen Fiscal** (opcional)
- **Razón social*** (obligatorio si es Persona Moral)
- **Banco** (opcional)
- **RFC*** (obligatorio, 12-13 caracteres, formato mexicano)
- **Clabe** (opcional, 18 dígitos)
- **Cuenta** (opcional)
- **Codigo SWIFT** (opcional, 8-11 caracteres)

**Validaciones:**
- RFC: Formato mexicano válido (12-13 caracteres)
- CLABE: 18 dígitos numéricos
- Código SWIFT: Formato internacional válido (8-11 caracteres)
- Razón social: Obligatoria solo para Persona Moral

**Características:**
- ✅ Selector de tipo de persona (Física/Moral)
- ✅ RFC y SWIFT en mayúsculas automáticamente
- ✅ Formato automático de CLABE (solo números)
- ✅ Validación de formatos RFC, CLABE y SWIFT

### Paso 5: Beneficiarios ✅

**Campos:**
- Tabla de beneficiarios con columnas:
  - Nombre
  - Apellidos
  - Fecha de nacimiento
  - CURP (opcional)
  - RFC* (obligatorio)
  - Parentesco (opcional)
  - Porcentaje* (obligatorio, 0-100)
  - Acciones (eliminar)

**Modal de Beneficiario:**
- **Nombre*** (obligatorio)
- **Apellidos*** (obligatorio)
- **Fecha de nacimiento*** (obligatorio)
- **CURP** (opcional, 18 caracteres)
- **RFC*** (obligatorio, 12-13 caracteres)
- **Parentesco** (opcional)
- **Porcentaje*** (obligatorio, 0-100)

**Validaciones:**
- RFC: Formato mexicano válido
- CURP: Formato mexicano válido (opcional)
- Porcentaje: Entre 0 y 100
- Total de porcentajes debe sumar 100%

**Características:**
- ✅ Tabla dinámica de beneficiarios
- ✅ Modal para agregar beneficiarios
- ✅ Validación individual de cada beneficiario
- ✅ Cálculo automático del total de porcentajes
- ✅ Indicador visual si el total no suma 100%
- ✅ Eliminar beneficiarios de la tabla
- ✅ CURP y RFC en mayúsculas automáticamente

### Paso 6: Resumen y Alta ✅

**Secciones del Resumen:**

1. **Datos opcionales personalizados:**
   - Código de cliente (opcional)
   - Número de cuenta (opcional)

2. **Cliente (Paso 1):**
   - Nombre, Apellidos
   - Fecha de nacimiento, Edad
   - Sexo, Estado civil
   - CURP, Lugar de nacimiento
   - Nacionalidad, INE

3. **Contacto (Paso 2):**
   - Teléfono Casa
   - Teléfono Celular
   - Correo electrónico

4. **Domicilio (Paso 3):**
   - Calle, No. Exterior, No. Interior
   - Colonia, C.P.
   - Ciudad, Estado, País

5. **Datos Financieros (Paso 4):**
   - Tipo de Persona
   - Régimen Fiscal, Razón Social
   - Banco, RFC
   - CLABE, Cuenta, Código SWIFT

6. **Beneficiarios (Paso 5):**
   - Tabla con todos los beneficiarios agregados
   - Columnas: Nombre, Apellidos, Fecha nacimiento, CURP, RFC, Parentesco, Porcentaje

**Características:**
- ✅ Resumen completo de todos los pasos
- ✅ Datos opcionales personalizados (Código cliente y Número cuenta)
- ✅ Formato de fechas en español
- ✅ Valores opcionales mostrados como "-"
- ✅ Diseño organizado por secciones
- ✅ Tabla de beneficiarios
- ✅ Botón "Finalizar" para confirmar el alta

## Estado: ✅ Completado

Todos los pasos (1-6) han sido implementados exitosamente.
