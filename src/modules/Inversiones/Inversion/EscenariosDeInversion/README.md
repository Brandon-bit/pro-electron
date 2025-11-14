# Módulo: Escenarios de Inversión

Calculadora de inversiones que permite simular diferentes escenarios de inversión con distintas modalidades de pago.

## Estructura de Carpetas

```
EscenariosDeInversion/
├── composables/
│   └── useInvestmentCalculator.ts  # Lógica de cálculo
├── types/
│   └── investmentTypes.ts          # Tipos TypeScript
├── views/
│   └── InvestmentScenarioView.vue  # Vista principal
├── index.ts                        # Exports del módulo
└── README.md                       # Documentación
```

## Características Principales

### Vista Principal (InvestmentScenarioView)

**Formulario de Cálculo:**

1. **Nombre** - Nombre del escenario
2. **Monto** - Monto de la inversión
3. **Tasa de interés** - Tasa anual de interés (%)
4. **Plazo Meses** - Select con opciones: 6, 12, 18, 24, 30, 36, 42, 48
5. **Plazo Días** - Calculado automáticamente (Meses × 30) - Solo lectura
6. **Modalidad** - Select con opciones de pago
7. **Botón Calcular** - Ejecuta el cálculo

**Modalidades de Pago:**
- ✅ Pago mensual (cada mes)
- ✅ Pago bimestral (cada 2 meses)
- ✅ Pago trimestral (cada 3 meses)
- ✅ Pago cuatrimestral (cada 4 meses)
- ✅ Pago semestral (cada 6 meses)
- ✅ Vencimiento (solo al final)
- ✅ Reinversión (interés se acumula al capital)

**Tabla de Resultados:**

Columnas:
1. **Mes** - Número del mes (1-48)
2. **Días** - Días del período (30 días por mes)
3. **Interés** - Interés generado en el mes
4. **Rendimiento Final** - Monto + Interés acumulado
5. **Mes de pago** - Check verde si es mes de pago

**Totales:**
- Total de días
- Total de interés
- Rendimiento final total

**Información de la Empresa:**
- Nombre
- Dirección
- Ciudad
- RFC

### Lógica de Cálculo (useInvestmentCalculator)

**Fórmulas:**

1. **Plazo en Días:**
   ```
   Plazo Días = Plazo Meses × 30
   ```

2. **Interés Mensual:**
   ```
   Interés = (Monto × Tasa Anual × Días) / (100 × 360)
   ```

3. **Rendimiento Final:**
   ```
   Rendimiento = Monto Inicial + Interés Acumulado
   ```

4. **Reinversión:**
   - El interés de cada mes se suma al capital
   - El siguiente mes calcula sobre el nuevo monto

**Determinación de Mes de Pago:**
- **Mensual:** Todos los meses
- **Bimestral:** Meses 2, 4, 6, 8, 10, 12...
- **Trimestral:** Meses 3, 6, 9, 12...
- **Cuatrimestral:** Meses 4, 8, 12...
- **Semestral:** Meses 6, 12, 18...
- **Vencimiento:** Solo el último mes
- **Reinversión:** Solo el último mes

### Funcionalidades

✅ **Cálculo automático** de plazo en días  
✅ **7 modalidades** de pago diferentes  
✅ **Tabla dinámica** con resultados mensuales  
✅ **Indicadores visuales** de meses de pago (check verde)  
✅ **Totales** en el footer de la tabla  
✅ **Formato de moneda** mexicana  
✅ **Reinversión** con capitalización de intereses  
✅ **Botón de descarga** (placeholder)  
✅ **Responsive design**  
✅ **Información de empresa** en resultados  

## Tipos de Datos

### InvestmentScenario
```typescript
{
    nombre: string
    monto: number
    tasaInteres: number
    plazoMeses: 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48
    plazoDias: number
    modalidad: PaymentModality
}
```

### MonthlyCalculation
```typescript
{
    mes: number
    dias: number
    interes: number
    rendimientoFinal: number
    mesDePago: boolean
}
```

### InvestmentResult
```typescript
{
    scenario: InvestmentScenario
    calculations: MonthlyCalculation[]
    totalDias: number
    totalInteres: number
    totalRendimiento: number
}
```

## Componentes Utilizados

- **BaseTitle** - Título de página
- **BaseFormInput** - Inputs del formulario
- **Select nativo** - Para plazo y modalidad

## Ejemplo de Uso

1. Ingresar nombre del escenario
2. Ingresar monto de inversión (ej: 4000)
3. Ingresar tasa de interés (ej: 12%)
4. Seleccionar plazo en meses (ej: 12 meses)
5. El plazo en días se calcula automáticamente (360)
6. Seleccionar modalidad (ej: Pago cuatrimestral)
7. Presionar "Calcular"
8. Ver tabla con resultados mensuales
9. Los meses 4, 8 y 12 tendrán check verde
10. Ver totales en el footer
11. Descargar cálculo (opcional)

## Estado Actual

✅ **Completado**
- Estructura de carpetas
- Vista con formulario
- Lógica de cálculo
- Tabla de resultados
- Todas las modalidades de pago
- Cálculo de intereses
- Reinversión con capitalización
- Indicadores de meses de pago
- Formato de moneda
- Totales

⏳ **Pendiente**
- Funcionalidad de descarga (PDF/Excel)
- Validaciones de formulario
- Guardar escenarios
- Comparar múltiples escenarios
- Gráficas de rendimiento
- Integración con API
