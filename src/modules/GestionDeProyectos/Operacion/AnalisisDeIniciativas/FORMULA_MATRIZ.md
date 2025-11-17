# Fórmula de Cálculo - Matriz Esfuerzo vs Impacto

## 📊 Descripción General

La matriz utiliza dos scores principales calculados en una escala de 0-10:
- **Score de Esfuerzo** (Eje Y)
- **Score de Impacto** (Eje X)

## 🔢 Valores Base

Cada nivel de impacto tiene un valor base en la escala 0-10:

| Nivel | Valor |
|-------|-------|
| Bajo  | 3     |
| Medio | 6     |
| Alto  | 9     |

Para horizonte de tiempo:
| Nivel | Valor |
|-------|-------|
| Corto | 3     |
| Medio | 6     |
| Largo | 9     |

## 📐 Fórmula de Score de Esfuerzo

```
Score de Esfuerzo = (
    (Valor_Inversión × Peso_Inversión) +
    (Valor_Alcance × Peso_Alcance) +
    (Valor_HorizonteTiempo × Peso_HorizonteTiempo)
) / Peso_Total_Esfuerzo
```

### Componentes:
- **Valor_Inversión**: 3 (Bajo), 6 (Medio), 9 (Alto)
- **Valor_Alcance**: 3 (Bajo), 6 (Medio), 9 (Alto)
- **Valor_HorizonteTiempo**: 3 (Corto), 6 (Medio), 9 (Largo)
- **Pesos**: Configurados en los criterios de evaluación (0-100%)
- **Peso_Total_Esfuerzo**: Suma de los tres pesos

### Ejemplo:
Si una iniciativa tiene:
- Inversión: Alto (9)
- Alcance: Medio (6)
- Horizonte: Largo (9)

Y los criterios son:
- Peso Inversión: 50%
- Peso Alcance: 30%
- Peso Horizonte: 20%

```
Score = ((9 × 50) + (6 × 30) + (9 × 20)) / (50 + 30 + 20)
Score = (450 + 180 + 180) / 100
Score = 810 / 100
Score = 8.1
```

## 📐 Fórmula de Score de Impacto

```
Score de Impacto = (
    (Valor_Ahorro × Peso_Ahorro) +
    (Valor_Beneficios × Peso_Beneficios) +
    (Valor_Satisfacción × Peso_Satisfacción)
) / Peso_Total_Impacto
```

### Componentes:
- **Valor_Ahorro**: 3 (Bajo), 6 (Medio), 9 (Alto)
- **Valor_Beneficios**: 3 (Bajo), 6 (Medio), 9 (Alto)
- **Valor_Satisfacción**: 3 (Bajo), 6 (Medio), 9 (Alto)
- **Pesos**: Configurados en los criterios de evaluación (0-100%)
- **Peso_Total_Impacto**: Suma de los tres pesos

### Ejemplo:
Si una iniciativa tiene:
- Ahorro/Ingresos: Alto (9)
- Beneficios: Alto (9)
- Satisfacción: Medio (6)

Y los criterios son:
- Peso Ahorro: 40%
- Peso Beneficios: 35%
- Peso Satisfacción: 25%

```
Score = ((9 × 40) + (9 × 35) + (6 × 25)) / (40 + 35 + 25)
Score = (360 + 315 + 150) / 100
Score = 825 / 100
Score = 8.25
```

## 🎯 Alineación Estratégica

Además de los scores, se calcula un porcentaje de alineación estratégica:

```
Alineación = (Impacto × 10) - (Esfuerzo × 5)
Rango: 0-100%
```

Esta fórmula prioriza iniciativas con:
- **Alto impacto** (multiplica por 10)
- **Bajo esfuerzo** (resta multiplicado por 5)

### Interpretación:
- **80-100%**: Excelente alineación (bajo esfuerzo, alto impacto)
- **60-79%**: Buena alineación
- **40-59%**: Alineación moderada
- **20-39%**: Baja alineación
- **0-19%**: Muy baja alineación (alto esfuerzo, bajo impacto)

## 🗺️ Cuadrantes de la Matriz

La matriz se divide en 4 cuadrantes:

| Cuadrante | Esfuerzo | Impacto | Interpretación |
|-----------|----------|---------|----------------|
| **Inferior Derecho** | 0-5 | 5-10 | ✅ **ÓPTIMO**: Bajo esfuerzo, alto impacto |
| **Superior Derecho** | 5-10 | 5-10 | ⚠️ **EVALUAR**: Alto esfuerzo, alto impacto |
| **Inferior Izquierdo** | 0-5 | 0-5 | ℹ️ **BAJO VALOR**: Bajo esfuerzo, bajo impacto |
| **Superior Izquierdo** | 5-10 | 0-5 | ❌ **EVITAR**: Alto esfuerzo, bajo impacto |

## 🔄 Caso Especial: Sin Criterios Configurados

Si los pesos de los criterios suman 0 (no configurados), se usa promedio simple:

```
Score de Esfuerzo = (Valor_Inversión + Valor_Alcance + Valor_HorizonteTiempo) / 3
Score de Impacto = (Valor_Ahorro + Valor_Beneficios + Valor_Satisfacción) / 3
```

## 📝 Notas de Implementación

1. Los scores siempre están limitados al rango **0-10**
2. Los pesos se configuran en porcentajes (0-100%)
3. La suma de pesos puede ser cualquier valor, la fórmula normaliza dividiendo por el total
4. Los valores base (3, 6, 9) permiten distribución uniforme en la escala

## 🔮 Futuras Mejoras

Esta fórmula es temporal y puede ser reemplazada cuando se defina la fórmula exacta del negocio.

Posibles mejoras futuras:
- Pesos dinámicos por tipo de proyecto
- Factores de riesgo
- Dependencias entre iniciativas
- Restricciones de recursos
- Priorización por área o departamento
