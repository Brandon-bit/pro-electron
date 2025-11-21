# Módulo de E-mailing - Plantillas

Este módulo implementa la funcionalidad de gestión de plantillas de email para el sistema de marketing.

## 📦 Instalación de Dependencias

Para que el editor de texto enriquecido funcione correctamente, necesitas instalar TinyMCE:

```bash
npm install @tinymce/tinymce-vue
```

O si usas yarn:

```bash
yarn add @tinymce/tinymce-vue
```

## 🏗️ Estructura del Módulo

```
Emailing/
├── components/
│   ├── PlantillasTab.vue           # Vista principal de plantillas
│   └── NuevaPlantillaModal.vue     # Modal con editor TinyMCE
├── services/
│   └── emailingService.ts          # Servicios de API
├── types/
│   └── emailingTypes.ts            # Tipos TypeScript
└── views/
    └── EmailingView.vue            # Vista principal del módulo
```

## 🔧 Configuración

### 1. Store Pinia

El store se encuentra en `src/store/emailing.ts` y maneja:
- **Estado**: `plantillas`, `isLoading`, `currentError`
- **Acciones**: 
  - `fetchPlantillas(idMarca)` - Obtiene plantillas por marca
  - `createPlantilla(data)` - Crea nueva plantilla
  - `updatePlantilla(id, data)` - Actualiza plantilla
  - `deletePlantilla(id)` - Elimina plantilla

### 2. Servicios de API

Los endpoints esperados son:
- `GET /api/emailing/plantillas?marcaId={idMarca}` - Listar plantillas
- `GET /api/emailing/plantillas/{id}` - Obtener plantilla
- `POST /api/emailing/plantillas` - Crear plantilla
- `PUT /api/emailing/plantillas/{id}` - Actualizar plantilla
- `DELETE /api/emailing/plantillas/{id}` - Eliminar plantilla

### 3. Esquema de Base de Datos

El módulo está basado en la tabla `mkt_email_plantillas`:
- `id` (string)
- `nombrePlantilla` (string)
- `asunto` (string)
- `contenidoHTML` (string)
- `idMarca` (string)
- `createdAt` (string/datetime)
- `updatedAt` (string/datetime)
- `createdBy` (string, opcional)

## 🎨 Editor TinyMCE

El modal `NuevaPlantillaModal.vue` integra TinyMCE para edición de contenido HTML enriquecido.

### Configuración del Editor

```typescript
const editorConfig = {
  height: 400,
  menubar: false,
  plugins: ['advlist', 'autolink', 'lists', 'link', 'image', ...],
  toolbar: 'undo redo | blocks | bold italic forecolor | ...',
}
```

### API Key (Opcional)

TinyMCE funciona en modo gratuito con marca de agua. Para eliminarla, obtén una API key gratuita en:
https://www.tiny.cloud/

Luego agrégala en `NuevaPlantillaModal.vue`:

```typescript
const editorConfig = {
  api_key: 'tu-api-key-aqui',
  // ... resto de la configuración
}
```

## 📝 Uso

### En EmailingView.vue

```vue
<script setup>
import PlantillasTab from '../components/PlantillasTab.vue';

const currentMarcaId = ref('1'); // ID de la marca actual
</script>

<template>
  <PlantillasTab :id-marca="currentMarcaId" />
</template>
```

### Crear Nueva Plantilla

1. Click en "Nueva Plantilla"
2. Llenar formulario:
   - Nombre de la plantilla
   - Asunto del email
   - Contenido HTML (usando editor TinyMCE)
3. Click en "Guardar Plantilla"

## 🔄 Flujo de Datos

```
Usuario → PlantillasTab → NuevaPlantillaModal → Store (emailing)
                                                    ↓
                                              emailingService
                                                    ↓
                                              Backend API
```

## ⚠️ Notas Importantes

1. **ID de Marca**: Actualmente usa un valor hardcodeado (`'1'`). Deberás integrarlo con tu sistema de gestión de marcas/cuentas.

2. **Autenticación**: Los servicios usan `axiosApiInstance` que debe estar configurado con los interceptores de autenticación.

3. **Validación**: La validación actual es básica. Considera agregar validaciones más robustas según tus necesidades.

4. **Edición de Plantillas**: La funcionalidad de edición está preparada pero necesita implementar el modal de edición (similar al de creación).

## 🚀 Próximos Pasos

- [ ] Implementar modal de edición de plantillas
- [ ] Agregar vista previa de plantillas
- [ ] Integrar selector de marca dinámico
- [ ] Agregar variables/placeholders para personalización
- [ ] Implementar duplicación de plantillas
- [ ] Agregar categorización de plantillas
