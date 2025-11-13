# Guía de Implementación de Electron en un Proyecto Vue Existente

## Contexto
Esta guía explica cómo convertir un proyecto Vue 3 + Vite existente para que funcione tanto en **web** como en **desktop con Electron**, manteniendo una única base de código que compile para ambas plataformas.

## Requisitos del Proyecto
- **Framework:** Vue 3 con TypeScript
- **Build Tool:** Vite
- **Objetivo:** Dual deployment (web y desktop)
- **Plataformas desktop:** Windows, macOS, Linux

## Pasos de Implementación

### 1. Instalación de Dependencias

Instala las dependencias necesarias para Electron:

```bash
npm install --save-dev electron electron-builder vite-plugin-electron vite-plugin-electron-renderer
```

**Paquetes:**
- `electron`: Framework para aplicaciones de escritorio
- `electron-builder`: Para crear instaladores nativos
- `vite-plugin-electron`: Plugin que integra Electron con Vite
- `vite-plugin-electron-renderer`: Soporte adicional para el proceso renderer

**Versiones recomendadas:**
```json
{
  "electron": "^33.2.1",
  "electron-builder": "^25.1.8",
  "vite-plugin-electron": "^0.28.8",
  "vite-plugin-electron-renderer": "^0.14.5"
}
```

### 2. Crear Estructura de Archivos de Electron

Crea una carpeta `electron/` en la raíz del proyecto con dos archivos:

#### `electron/main.ts` (Proceso principal de Electron)

```typescript
import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(process.env.VITE_PUBLIC || '', 'vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
```

#### `electron/preload.ts` (Script de seguridad)

```typescript
import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})
```

### 3. Configurar Vite

#### Actualizar `vite.config.ts` (para Electron)

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron/simple'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Optional: Use Node.js API in the Renderer process
      renderer: {},
    }),
  ],
  // Vite options tailored for Electron development
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
```

#### Crear `vite.config.web.ts` (para web sin Electron)

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// Configuration for web-only build (without Electron)
export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    outDir: 'dist-web',
    emptyOutDir: true,
  },
})
```

### 4. Actualizar package.json

Modifica el `package.json` para agregar las siguientes configuraciones:

```json
{
  "name": "tu-proyecto",
  "version": "0.0.0",
  "type": "module",
  "main": "dist-electron/main.js",
  "scripts": {
    "dev": "vite --config vite.config.web.ts",
    "dev:electron": "vite",
    "build": "vue-tsc -b && vite build",
    "build:web": "vue-tsc -b && vite build --config vite.config.web.ts",
    "build:electron": "vue-tsc -b && vite build",
    "build:win": "npm run build:electron && electron-builder --win",
    "build:mac": "npm run build:electron && electron-builder --mac",
    "build:linux": "npm run build:electron && electron-builder --linux",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.24"
  },
  "devDependencies": {
    "@types/node": "^24.10.0",
    "@vitejs/plugin-vue": "^6.0.1",
    "@vue/tsconfig": "^0.8.1",
    "electron": "^33.2.1",
    "electron-builder": "^25.1.8",
    "typescript": "~5.9.3",
    "vite": "^7.2.2",
    "vite-plugin-electron": "^0.28.8",
    "vite-plugin-electron-renderer": "^0.14.5",
    "vue-tsc": "^3.1.3"
  },
  "build": {
    "appId": "com.tuempresa.tuapp",
    "productName": "TuApp",
    "directories": {
      "output": "release/${version}"
    },
    "files": [
      "dist/**/*",
      "dist-electron/**/*"
    ],
    "win": {
      "target": ["nsis"]
    },
    "mac": {
      "target": ["dmg"]
    },
    "linux": {
      "target": ["AppImage"]
    }
  }
}
```

**Puntos clave:**
- `"main": "dist-electron/main.js"` - Define el punto de entrada de Electron
- `"type": "module"` - Habilita ES modules
- Scripts separados para web (`dev`) y Electron (`dev:electron`)
- Configuración de `electron-builder` en la sección `build`

### 5. Crear Utilidades Vue para Electron

#### `src/electron.d.ts` (Tipos TypeScript)

```typescript
export interface IElectronAPI {
  on: (channel: string, listener: (event: any, ...args: any[]) => void) => void
  off: (channel: string, listener: (event: any, ...args: any[]) => void) => void
  send: (channel: string, ...args: any[]) => void
  invoke: (channel: string, ...args: any[]) => Promise<any>
}

declare global {
  interface Window {
    ipcRenderer: IElectronAPI
  }
}
```

#### `src/composables/useElectron.ts` (Composables)

```typescript
import { onMounted, onUnmounted } from 'vue'

/**
 * Composable para detectar si la app está corriendo en Electron
 */
export function useElectron() {
  const isElectron = typeof window !== 'undefined' && window.ipcRenderer !== undefined

  return {
    isElectron
  }
}

/**
 * Composable para escuchar mensajes del proceso principal de Electron
 * @param channel - Canal de IPC a escuchar
 * @param callback - Función a ejecutar cuando se recibe un mensaje
 */
export function useElectronListener(
  channel: string,
  callback: (event: any, ...args: any[]) => void
) {
  const { isElectron } = useElectron()

  onMounted(() => {
    if (isElectron) {
      window.ipcRenderer.on(channel, callback)
    }
  })

  onUnmounted(() => {
    if (isElectron) {
      window.ipcRenderer.off(channel, callback)
    }
  })
}

/**
 * Composable para enviar mensajes al proceso principal de Electron
 */
export function useElectronSend() {
  const { isElectron } = useElectron()

  const send = (channel: string, ...args: any[]) => {
    if (isElectron) {
      window.ipcRenderer.send(channel, ...args)
    } else {
      console.warn('IPC not available: not running in Electron')
    }
  }

  const invoke = async (channel: string, ...args: any[]) => {
    if (isElectron) {
      return await window.ipcRenderer.invoke(channel, ...args)
    } else {
      console.warn('IPC not available: not running in Electron')
      return null
    }
  }

  return {
    send,
    invoke
  }
}
```

### 6. Actualizar .gitignore

Agrega las carpetas de build al `.gitignore`:

```gitignore
# Build outputs
dist
dist-web
dist-electron
dist-ssr
release

# Logs
logs
*.log
npm-debug.log*

# Dependencies
node_modules

# Environment
*.local
```

### 7. Uso en Componentes Vue

#### Ejemplo básico: Detectar el entorno

```vue
<script setup lang="ts">
import { useElectron } from '@/composables/useElectron'

const { isElectron } = useElectron()
</script>

<template>
  <div>
    <div v-if="isElectron">
      <h2>💻 Corriendo en Electron</h2>
      <p>Características exclusivas de desktop disponibles</p>
    </div>
    <div v-else>
      <h2>🌐 Corriendo en Web</h2>
      <p>Versión web de la aplicación</p>
    </div>
  </div>
</template>
```

#### Ejemplo avanzado: Comunicación IPC

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useElectronListener, useElectronSend } from '@/composables/useElectron'

const { send, invoke } = useElectronSend()
const lastMessage = ref<string>('')

// Escuchar mensajes del proceso principal
useElectronListener('main-process-message', (_event, message) => {
  lastMessage.value = message
})

// Enviar mensaje al proceso principal
const sendTestMessage = () => {
  send('test-message', 'Hola desde el renderer!')
}

// Invocar y esperar respuesta
const getData = async () => {
  const result = await invoke('get-data')
  console.log(result)
}
</script>

<template>
  <div>
    <p>Último mensaje: {{ lastMessage }}</p>
    <button @click="sendTestMessage">Enviar Mensaje</button>
    <button @click="getData">Obtener Datos</button>
  </div>
</template>
```

## Comandos Disponibles

### Desarrollo

```bash
# Desarrollo en navegador (http://localhost:5173)
npm run dev

# Desarrollo en Electron (ventana de escritorio con DevTools)
npm run dev:electron
```

### Build

```bash
# Build para web (salida: dist-web/)
npm run build:web

# Build para Electron sin empaquetar (salida: dist/ y dist-electron/)
npm run build:electron

# Build instalador Windows (salida: release/[version]/*.exe)
npm run build:win

# Build instalador macOS (salida: release/[version]/*.dmg)
npm run build:mac

# Build instalador Linux (salida: release/[version]/*.AppImage)
npm run build:linux
```

### Preview

```bash
# Vista previa del build web
npm run preview
```

## Estructura de Carpetas Resultante

```
tu-proyecto/
├── electron/              # Configuración de Electron
│   ├── main.ts           # Proceso principal (backend)
│   └── preload.ts        # Script de seguridad
├── src/                  # Tu aplicación Vue
│   ├── components/       # Tus componentes
│   ├── composables/      # Composables (incluye useElectron.ts)
│   ├── electron.d.ts     # Tipos TypeScript para Electron
│   ├── App.vue
│   └── main.ts
├── public/               # Archivos estáticos
├── dist/                 # Build Vue para Electron (generado)
├── dist-web/             # Build para web (generado)
├── dist-electron/        # Build proceso principal Electron (generado)
├── release/              # Instaladores (generado)
├── vite.config.ts        # Config Vite + Electron
├── vite.config.web.ts    # Config Vite solo web
├── package.json          # Configuración del proyecto
└── tsconfig.json         # Configuración TypeScript
```

## Notas Importantes

### 1. Versiones de Paquetes

Si encuentras errores de instalación, usa estas versiones específicas:
```json
{
  "vite-plugin-electron": "^0.28.8",
  "vite-plugin-electron-renderer": "^0.14.5"
}
```

### 2. Iconos Personalizados

Para usar iconos personalizados, necesitas:
- **Windows:** Archivo `.ico` (256x256 o múltiples tamaños)
- **macOS:** Archivo `.icns` (512x512 o múltiples tamaños)
- **Linux:** Archivo `.png` (512x512)

Configuración en `package.json`:
```json
"build": {
  "win": {
    "icon": "build/icon.ico"
  },
  "mac": {
    "icon": "build/icon.icns"
  },
  "linux": {
    "icon": "build/icon.png"
  }
}
```

Si no tienes iconos, **omite la configuración** y electron-builder usará iconos por defecto.

### 3. Seguridad

**SIEMPRE** mantén estas configuraciones de seguridad:
```typescript
webPreferences: {
  contextIsolation: true,  // Aísla el contexto del renderer
  nodeIntegration: false,  // Desactiva Node.js en el renderer
  preload: path.join(__dirname, 'preload.mjs')  // Usa preload para IPC
}
```

### 4. Rutas en Electron

- Usa `base: './'` en `vite.config.ts` para rutas relativas
- Usa `base: '/'` en `vite.config.web.ts` para rutas absolutas

### 5. Salida de Builds

| Comando | Salida | Descripción |
|---------|--------|-------------|
| `build:web` | `dist-web/` | Archivos estáticos para hosting web |
| `build:electron` | `dist/` + `dist-electron/` | Aplicación compilada sin empaquetar |
| `build:win` | `release/[version]/` | Instalador `.exe` para Windows |
| `build:mac` | `release/[version]/` | Instalador `.dmg` para macOS |
| `build:linux` | `release/[version]/` | Instalador `.AppImage` para Linux |

### 6. Configuración del Instalador NSIS (Windows)

Por defecto, el instalador se abre automáticamente después de instalar. Para cambiar esto:

```json
"win": {
  "target": [
    {
      "target": "nsis",
      "arch": ["x64"]
    }
  ],
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "runAfterFinish": false
  }
}
```

## Solución de Problemas Comunes

### Error: "Cannot find module"
**Causa:** Dependencias no instaladas correctamente.
**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de iconos en build
**Causa:** Formato de icono incorrecto o ruta no válida.
**Solución:** Elimina la configuración de `icon` en `package.json` o usa archivos en formato correcto.

### Error de versión de Node.js
**Causa:** Vite 7.x requiere Node.js 20.19+ o 22.12+.
**Solución:** Actualiza Node.js o ignora la advertencia (funciona con 20.17.0).

### Build falla en Windows
**Causa:** Falta windows-build-tools.
**Solución:**
```bash
npm install --global windows-build-tools
```

### App no abre en macOS
**Causa:** App no firmada.
**Solución:** Firma la app o permite apps de desarrolladores no identificados en Preferencias del Sistema.

### Build muy pesado
**Causa:** Dependencias innecesarias incluidas.
**Solución:** Revisa la configuración de `files` en `package.json` y usa `asar: true`.

## Mejoras Opcionales

### Auto-actualización

Instala `electron-updater`:
```bash
npm install electron-updater
```

Configura en `package.json`:
```json
"build": {
  "publish": {
    "provider": "github",
    "owner": "tu-usuario",
    "repo": "tu-repo"
  }
}
```

### Menú personalizado

Agrega en `electron/main.ts`:
```typescript
import { Menu } from 'electron'

const template = [
  {
    label: 'Archivo',
    submenu: [
      { role: 'quit', label: 'Salir' }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### Notificaciones del sistema

```typescript
import { Notification } from 'electron'

new Notification({
  title: 'Título',
  body: 'Mensaje'
}).show()
```

## Recursos Adicionales

- [Documentación de Electron](https://www.electronjs.org/docs)
- [Documentación de Vue 3](https://vuejs.org/)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de electron-builder](https://www.electron.build/)
- [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron)

## Checklist de Implementación

- [ ] Instalar dependencias de Electron
- [ ] Crear carpeta `electron/` con `main.ts` y `preload.ts`
- [ ] Actualizar `vite.config.ts` con plugin de Electron
- [ ] Crear `vite.config.web.ts` para builds web
- [ ] Actualizar `package.json` con scripts y configuración de build
- [ ] Crear composables en `src/composables/useElectron.ts`
- [ ] Crear tipos en `src/electron.d.ts`
- [ ] Actualizar `.gitignore`
- [ ] Probar `npm run dev` (web)
- [ ] Probar `npm run dev:electron` (desktop)
- [ ] Probar `npm run build:web`
- [ ] Probar `npm run build:win` (o mac/linux)
- [ ] Verificar que el instalador funcione correctamente

---

**Resultado Final:** Un proyecto Vue que funciona tanto en web como en desktop desde la misma base de código, con detección automática del entorno y comunicación IPC lista para usar.
