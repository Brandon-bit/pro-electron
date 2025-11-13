# 🚀 Guía Rápida - ProElectron

## ✅ Configuración Completada

Tu proyecto ahora está configurado para funcionar tanto en **web** como en **desktop** con Electron.

## 📋 Comandos Disponibles

### Desarrollo

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo web (http://localhost:5173) |
| `npm run dev:electron` | Inicia la aplicación en modo Electron con DevTools |

### Build

| Comando | Descripción | Salida |
|---------|-------------|--------|
| `npm run build:web` | Build para web | `dist-web/` |
| `npm run build:electron` | Build para Electron (sin empaquetar) | `dist/` y `dist-electron/` |
| `npm run build:win` | Build instalador Windows | `release/[version]/*.exe` |
| `npm run build:mac` | Build instalador macOS | `release/[version]/*.dmg` |
| `npm run build:linux` | Build instalador Linux | `release/[version]/*.AppImage` |

## 🎯 Primeros Pasos

### 1. Probar en modo desarrollo

**Modo Web:**
```bash
npm run dev
```
Abre http://localhost:5173 en tu navegador

**Modo Electron:**
```bash
npm run dev:electron
```
Se abrirá una ventana de Electron con tu aplicación

### 2. Crear tu primer build

**Para Web:**
```bash
npm run build:web
```
Los archivos estarán en `dist-web/` listos para subir a cualquier hosting

**Para Windows:**
```bash
npm run build:win
```
El instalador estará en `release/[version]/`

## 📁 Estructura del Proyecto

```
pro-electron/
├── electron/              # Configuración de Electron
│   ├── main.ts           # Proceso principal (backend)
│   └── preload.ts        # Script de seguridad
├── src/                  # Tu aplicación Vue
│   ├── components/
│   │   ├── HelloWorld.vue
│   │   └── ElectronDemo.vue  # Ejemplo de integración
│   ├── composables/
│   │   └── useElectron.ts    # Helpers para Electron
│   ├── App.vue
│   └── main.ts
├── vite.config.ts        # Config Vite + Electron
└── vite.config.web.ts    # Config Vite solo web
```

## 🔧 Características Implementadas

### ✅ Dual Mode (Web + Desktop)
- Mismo código funciona en ambos entornos
- Detección automática del entorno
- Componente de ejemplo incluido

### ✅ Comunicación IPC
- Composables Vue para IPC
- Tipos TypeScript incluidos
- Ejemplos de uso en `ElectronDemo.vue`

### ✅ Build Optimizado
- Configuraciones separadas para web y desktop
- electron-builder configurado
- Soporte para Windows, macOS y Linux

### ✅ Desarrollo Eficiente
- Hot reload en ambos modos
- DevTools habilitadas en Electron
- TypeScript completamente configurado

## 💡 Ejemplos de Uso

### Detectar si estás en Electron

```vue
<script setup>
import { useElectron } from './composables/useElectron'

const { isElectron } = useElectron()
</script>

<template>
  <div v-if="isElectron">
    Características exclusivas de desktop
  </div>
  <div v-else>
    Versión web
  </div>
</template>
```

### Comunicarse con el proceso principal

```vue
<script setup>
import { useElectronSend } from './composables/useElectron'

const { send, invoke } = useElectronSend()

// Enviar mensaje
const sendMessage = () => {
  send('my-channel', 'data')
}

// Invocar y esperar respuesta
const getData = async () => {
  const result = await invoke('get-data')
  console.log(result)
}
</script>
```

### Escuchar mensajes del proceso principal

```vue
<script setup>
import { ref } from 'vue'
import { useElectronListener } from './composables/useElectron'

const message = ref('')

useElectronListener('main-message', (_event, data) => {
  message.value = data
})
</script>
```

## 🎨 Personalización

### Cambiar el nombre de la app
Edita `package.json`:
```json
{
  "name": "tu-app",
  "build": {
    "productName": "Tu App",
    "appId": "com.tuempresa.tuapp"
  }
}
```

### Cambiar el icono
Reemplaza los archivos en `public/` con tus propios iconos

### Configurar la ventana de Electron
Edita `electron/main.ts`:
```typescript
win = new BrowserWindow({
  width: 1920,  // Ancho
  height: 1080, // Alto
  // ... más opciones
})
```

## 📚 Recursos Adicionales

- **README.md** - Documentación completa
- **DEPLOYMENT.md** - Guía de despliegue detallada
- [Documentación de Electron](https://www.electronjs.org/docs)
- [Documentación de Vue 3](https://vuejs.org/)
- [Documentación de Vite](https://vitejs.dev/)

## 🐛 Solución de Problemas

### La app no abre en Electron
1. Verifica que las dependencias estén instaladas: `npm install`
2. Revisa la consola por errores
3. Intenta borrar `node_modules` y reinstalar

### Build falla
1. Asegúrate de tener espacio en disco
2. Ejecuta `npm run build:electron` primero
3. Revisa los logs de error

### Cambios no se reflejan
1. Detén el servidor (Ctrl+C)
2. Borra la carpeta `dist` y `dist-electron`
3. Vuelve a ejecutar `npm run dev:electron`

## 🎉 ¡Listo!

Tu proyecto está configurado y listo para usar. Comienza desarrollando en `src/` y tu código funcionará tanto en web como en desktop.

**Siguiente paso:** Ejecuta `npm run dev:electron` para ver tu app en acción.
