# 📥 Guía de Importación de Cuentas Contables

## 📋 Descripción

La funcionalidad de importación masiva permite cargar múltiples cuentas contables desde un archivo Excel en un solo paso, facilitando la configuración inicial del catálogo de cuentas.

## 🚀 Cómo Usar

### Paso 1: Acceder a la Importación

1. Ve a **Contabilidad > Catálogo de Cuentas**
2. Haz clic en el botón **"Importar"** en la esquina superior derecha
3. Se abrirá el modal de importación

### Paso 2: Descargar la Plantilla

1. En el modal, haz clic en **"Descargar Plantilla"**
2. Se descargará un archivo Excel llamado `Plantilla_Catalogo_Cuentas.xlsx`
3. La plantilla incluye:
   - Ejemplos de cuentas contables
   - Formato correcto de las columnas
   - Estructura jerárquica de ejemplo

### Paso 3: Llenar la Plantilla

Abre el archivo Excel y llena las siguientes columnas:

| Columna | Descripción | Requerido | Ejemplos |
|---------|-------------|-----------|----------|
| **Código** | Código único de la cuenta | ✅ Sí | `1000-00-00`, `1100-00-00` |
| **Nombre** | Nombre descriptivo de la cuenta | ✅ Sí | `ACTIVO`, `ACTIVO CIRCULANTE` |
| **Tipo Cuenta** | Clasificación de la cuenta | ✅ Sí | `Título`, `Subtítulo`, `Cuenta de Mayor` |
| **Cuenta Padre** | Código de la cuenta padre (jerárquica) | ❌ No | `1000-00-00` |
| **Naturaleza** | Tipo de naturaleza de la cuenta | ✅ Sí | `Deudora`, `Acreedora` |
| **Clasificación** | Clasificación contable | ✅ Sí | `Balance`, `Resultados` |
| **Clave SAT** | Clave del catálogo SAT (México) | ❌ No | `101.01`, `102` |

#### Valores Permitidos

**Tipo Cuenta:**
- `Título`
- `Subtítulo`
- `Cuenta de Mayor`
- `Cuenta de Detalle`

**Naturaleza:**
- `Deudora`
- `Acreedora`

**Clasificación:**
- `Balance`
- `Resultados`
- `Orden`

### Paso 4: Cargar el Archivo

1. En el modal, haz clic en **"Seleccionar Archivo"**
2. Busca y selecciona tu archivo Excel con los datos
3. El sistema procesará el archivo automáticamente
4. Verás una **vista previa** de las primeras 5 cuentas

### Paso 5: Confirmar Importación

1. Revisa la vista previa para verificar que los datos sean correctos
2. El modal mostrará el total de cuentas a importar
3. Haz clic en **"Importar Cuentas"**
4. Espera a que el proceso termine
5. Recibirás una notificación con el resultado

## ✅ Ejemplo de Plantilla

```
Código       | Nombre              | Tipo Cuenta      | Cuenta Padre | Naturaleza | Clasificación | Clave SAT
-------------|---------------------|------------------|--------------|------------|---------------|----------
1000-00-00   | ACTIVO              | Título           |              | Deudora    | Balance       |
1100-00-00   | ACTIVO CIRCULANTE   | Subtítulo        | 1000-00-00   | Deudora    | Balance       | 101
1101-00-00   | CAJA                | Cuenta de Mayor  | 1100-00-00   | Deudora    | Balance       | 101.01
1102-00-00   | BANCOS              | Cuenta de Mayor  | 1100-00-00   | Deudora    | Balance       | 102.01
```

## 🔧 Características Técnicas

### Endpoint de Importación

**URL:** `/api/accounts/import-bulk`  
**Método:** `POST`  
**Content-Type:** `application/json`

**Payload:**
```json
{
  "accounts": [
    {
      "code": "1000-00-00",
      "name": "ACTIVO",
      "accountType": "Título",
      "parentAccount": null,
      "nature": "Deudora",
      "classification": "Balance",
      "satCode": null
    }
  ],
  "options": {
    "validateCodes": true,
    "skipDuplicates": false,
    "createParents": true
  }
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Se importaron 10 cuentas exitosamente",
  "imported": 10,
  "errors": 0
}
```

### Opciones de Importación

- **`validateCodes`**: Valida que los códigos cumplan con el formato de máscara configurado
- **`skipDuplicates`**: Omite cuentas con códigos duplicados
- **`createParents`**: Crea automáticamente cuentas padre si no existen

## 🎯 Validaciones

El sistema realiza las siguientes validaciones:

1. ✅ **Formato de archivo**: Solo acepta archivos `.xlsx` o `.xls`
2. ✅ **Columnas requeridas**: Código, Nombre, Tipo Cuenta, Naturaleza, Clasificación
3. ✅ **Filas vacías**: Se filtran automáticamente
4. ✅ **Formato de código**: Debe cumplir con la máscara configurada
5. ✅ **Jerarquía**: Valida que las cuentas padre existan

## ⚠️ Consideraciones

- El archivo debe estar en formato Excel (`.xlsx` o `.xls`)
- Los códigos deben ser únicos
- Si una cuenta padre no existe, considera la opción `createParents`
- La importación procesa todas las cuentas en una sola transacción
- Se recomienda hacer respaldo antes de importar

## 🐛 Solución de Problemas

### El archivo no se carga

- Verifica que el archivo sea `.xlsx` o `.xls`
- Asegúrate de que el archivo no esté corrupto
- Cierra el archivo en Excel antes de cargarlo

### No se muestran datos en la vista previa

- Verifica que el archivo tenga las columnas correctas
- Asegúrate de que haya datos en las filas (no solo encabezados)
- Revisa que los nombres de columnas coincidan exactamente

### Error al importar

- Verifica que los códigos sean únicos
- Asegúrate de que las cuentas padre existan
- Revisa que los valores de Tipo, Naturaleza y Clasificación sean válidos

## 📊 Logs de Consola

Durante la importación, el sistema genera logs detallados en la consola:

```
=== API IMPORT ACCOUNTS ===
Method: POST
Endpoint: /api/accounts/import-bulk
Headers: {
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
Total Accounts: 10
Payload: { ... }
===========================
```

Estos logs son útiles para debugging y desarrollo.

## 🎉 Resultado Exitoso

Al finalizar exitosamente, verás:
- ✅ Notificación de éxito con el número de cuentas importadas
- ✅ El catálogo se recarga automáticamente
- ✅ Las nuevas cuentas aparecen en la tabla

---

**Desarrollado para el módulo de Contabilidad**  
**Versión 1.0 - 2025**
