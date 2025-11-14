# 📋 Formulario de Factura Emitida - Documentación

## Vista del Formulario Completo

El formulario se muestra cuando haces clic en el botón **"Nueva Factura"** y contiene las siguientes secciones:

---

## 📝 Sección 1: Información del Cliente

```
┌─────────────────────────────────────────────────────────────────┐
│ 👤 Información del Cliente                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Nombre del Cliente *                 RFC del Cliente *         │
│  [____________________________]       [______________]           │
│  Ingrese el nombre del cliente        XAXX010101000             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Campos:**
- **Nombre del Cliente** (requerido)
  - Placeholder: "Ingrese el nombre del cliente"
  - Validación: Mínimo 3 caracteres, máximo 254
  
- **RFC del Cliente** (requerido)
  - Placeholder: "XAXX010101000"
  - Validación: Formato RFC válido (12-13 caracteres)
  - Regex: `^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$`

---

## 📄 Sección 2: Información de la Factura

```
┌─────────────────────────────────────────────────────────────────┐
│ 🧾 Información de la Factura                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Serie *              Fecha de Emisión *                        │
│  [____]               [__________]                              │
│  A                    2025-10-20                                │
│                                                                  │
│  Fecha de Pago        Moneda *                                  │
│  [__________]         [MXN - Peso Mexicano ▼]                   │
│  (Opcional)           • MXN - Peso Mexicano                     │
│                       • USD - Dólar Americano                   │
│                       • EUR - Euro                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Campos:**
- **Serie** (requerido)
  - Placeholder: "A"
  - Validación: Máximo 10 caracteres
  - Valor por defecto: "A"
  
- **Fecha de Emisión** (requerido)
  - Tipo: date
  - Valor por defecto: Fecha actual
  
- **Fecha de Pago** (opcional)
  - Tipo: date
  
- **Moneda** (requerido)
  - Opciones: MXN, USD, EUR
  - Valor por defecto: MXN

---

## 💳 Sección 3: Información de Pago

```
┌─────────────────────────────────────────────────────────────────┐
│ 💳 Información de Pago                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Método de Pago *                                               │
│  [Pago en una sola exhibición ▼]                                │
│  • PUE - Pago en una sola exhibición                            │
│  • PPD - Pago en parcialidades o diferido                       │
│                                                                  │
│  Forma de Pago *                                                │
│  [01 - Efectivo ▼]                                              │
│  • 01 - Efectivo                                                │
│  • 02 - Cheque nominativo                                       │
│  • 03 - Transferencia electrónica                               │
│  • 04 - Tarjeta de crédito                                      │
│  • 28 - Tarjeta de débito                                       │
│  • 99 - Por definir                                             │
│                                                                  │
│  Uso de CFDI *                                                  │
│  [G03 - Gastos en general ▼]                                    │
│  • G01 - Adquisición de mercancías                              │
│  • G02 - Devoluciones, descuentos o bonificaciones              │
│  • G03 - Gastos en general                                      │
│  • I01 - Construcciones                                         │
│  • I02 - Mobiliario y equipo de oficina                         │
│  • I03 - Equipo de transporte                                   │
│  • I04 - Equipo de cómputo                                      │
│  • P01 - Por definir                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Campos:**
- **Método de Pago** (requerido)
  - PUE: Pago en una sola exhibición
  - PPD: Pago en parcialidades o diferido
  - Valor por defecto: PUE
  
- **Forma de Pago** (requerido)
  - Catálogo SAT de formas de pago
  - Valor por defecto: 01 (Efectivo)
  
- **Uso de CFDI** (requerido)
  - Catálogo SAT de usos de CFDI
  - Valor por defecto: G03 (Gastos en general)

---

## 📦 Sección 4: Conceptos (Dinámico)

```
┌─────────────────────────────────────────────────────────────────┐
│ 📋 Conceptos                          [+ Agregar Concepto]      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Concepto 1                                            [×] │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                           │  │
│  │  Cantidad *        Unidad *         Clave Prod/Serv *    │  │
│  │  [____]            [_______]        [__________]         │  │
│  │  1                 Pieza            01010101             │  │
│  │                                                           │  │
│  │  Descripción *                                           │  │
│  │  [_______________________________________________]        │  │
│  │  Descripción del producto o servicio                     │  │
│  │                                                           │  │
│  │  Precio Unitario * Descuento        Total                │  │
│  │  [__________]      [________]       $0.00                │  │
│  │  0.00              0.00             (Calculado)          │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [Puedes agregar más conceptos haciendo clic en el botón]       │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│ 💰 Total de la Factura:                          $0.00          │
└─────────────────────────────────────────────────────────────────┘
```

**Campos por Concepto:**
- **Cantidad** (requerido)
  - Tipo: number
  - Mínimo: 0.01
  - Valor por defecto: 1
  
- **Unidad** (requerido)
  - Texto libre
  - Máximo: 20 caracteres
  - Valor por defecto: "Pieza"
  
- **Clave Prod/Serv** (requerido)
  - Clave del catálogo SAT
  - Máximo: 10 caracteres
  
- **Descripción** (requerido)
  - Texto libre
  - Mínimo: 3 caracteres
  - Máximo: 1000 caracteres
  
- **Precio Unitario** (requerido)
  - Tipo: number
  - Mínimo: 0.01
  
- **Descuento** (opcional)
  - Tipo: number
  - Mínimo: 0
  
- **Total** (calculado automáticamente)
  - Fórmula: `(Cantidad × Precio Unitario - Descuento) × 1.16`
  - Incluye IVA del 16%

**Validaciones:**
- Mínimo 1 concepto requerido
- Máximo 100 conceptos permitidos

---

## 🎯 Cálculos Automáticos

### Por Concepto:
```
Subtotal = (Cantidad × Precio Unitario) - Descuento
IVA = Subtotal × 0.16
Total Concepto = Subtotal + IVA
```

### Total de la Factura:
```
Subtotal Total = Suma de todos los subtotales
IVA Total = Suma de todos los IVA
Total Factura = Subtotal Total + IVA Total
```

---

## ✅ Ejemplo de Factura Completa

```
┌─────────────────────────────────────────────────────────────────┐
│ FACTURA EJEMPLO                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Cliente: Corporativo ABC S.A. de C.V.                           │
│ RFC: CAB850101XYZ                                               │
│                                                                  │
│ Serie: A                                                         │
│ Fecha Emisión: 20 Oct 2025                                      │
│ Moneda: MXN                                                      │
│                                                                  │
│ Método de Pago: PUE (Pago en una sola exhibición)              │
│ Forma de Pago: 03 - Transferencia electrónica                   │
│ Uso de CFDI: G03 - Gastos en general                            │
│                                                                  │
│ CONCEPTOS:                                                       │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 1. Servicio de Consultoría                                  │ │
│ │    10 Horas × $1,000.00 = $10,000.00                        │ │
│ │    IVA 16%: $1,600.00                                       │ │
│ │    Total: $11,600.00                                        │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 2. Desarrollo de Software                                   │ │
│ │    5 Piezas × $5,000.00 = $25,000.00                        │ │
│ │    Descuento: -$1,000.00                                    │ │
│ │    Subtotal: $24,000.00                                     │ │
│ │    IVA 16%: $3,840.00                                       │ │
│ │    Total: $27,840.00                                        │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ TOTALES:                                                         │
│ Subtotal:  $34,000.00                                           │
│ IVA (16%): $ 5,440.00                                           │
│ ─────────────────────                                           │
│ TOTAL:     $39,440.00                                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Cómo Usar el Formulario

1. **Abrir el Modal:**
   - Haz clic en el botón "Nueva Factura" en la parte superior derecha

2. **Llenar Información del Cliente:**
   - Ingresa el nombre completo del cliente
   - Ingresa el RFC válido (será validado automáticamente)

3. **Configurar la Factura:**
   - La serie y fecha se llenan automáticamente
   - Selecciona la moneda si es diferente a MXN
   - Opcionalmente agrega una fecha de pago

4. **Configurar Método de Pago:**
   - Selecciona el método de pago (PUE o PPD)
   - Selecciona la forma de pago del catálogo SAT
   - Selecciona el uso de CFDI

5. **Agregar Conceptos:**
   - Haz clic en "Agregar Concepto"
   - Llena todos los campos del concepto
   - El total se calcula automáticamente
   - Puedes agregar múltiples conceptos

6. **Guardar:**
   - Haz clic en "Guardar" o "Crear"
   - La factura se guardará como borrador
   - Podrás timbrarla después desde el detalle

---

## ⚠️ Validaciones Importantes

- ❌ No puedes guardar sin al menos 1 concepto
- ❌ El RFC debe tener formato válido
- ❌ Todos los campos marcados con * son obligatorios
- ❌ Los montos deben ser mayores a 0
- ✅ El total se calcula automáticamente
- ✅ Puedes agregar hasta 100 conceptos

---

## 💡 Consejos

- **Guarda como borrador primero**: Puedes editar la factura antes de timbrarla
- **Verifica el RFC**: El RFC debe ser válido según el formato SAT
- **Usa el catálogo correcto**: Los códigos de producto/servicio deben ser del catálogo SAT
- **Revisa los totales**: Los cálculos son automáticos pero verifica que sean correctos
