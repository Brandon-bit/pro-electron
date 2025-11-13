# 📚 Ejemplos de Código

## Comunicación IPC Avanzada

### 1. Crear un canal IPC personalizado

**electron/main.ts** - Agregar después de `createWindow()`:
```typescript
import { ipcMain } from 'electron'

// Manejar mensajes del renderer
ipcMain.on('save-file', (event, data) => {
  console.log('Guardando archivo:', data)
  // Lógica para guardar archivo
})

// Manejar invocaciones con respuesta
ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const fs = await import('fs/promises')
    const content = await fs.readFile(filePath, 'utf-8')
    return { success: true, content }
  } catch (error) {
    return { success: false, error: error.message }
  }
})
```

**Componente Vue:**
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useElectronSend } from '@/composables/useElectron'

const { send, invoke } = useElectronSend()
const fileContent = ref('')

const saveFile = () => {
  send('save-file', { name: 'test.txt', content: 'Hello!' })
}

const readFile = async () => {
  const result = await invoke('read-file', '/path/to/file.txt')
  if (result.success) {
    fileContent.value = result.content
  }
}
</script>
```

## Menú Personalizado

**electron/main.ts** - Agregar al inicio:
```typescript
import { Menu } from 'electron'

function createMenu() {
  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Nuevo',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            win?.webContents.send('menu-new-file')
          }
        },
        {
          label: 'Abrir',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            win?.webContents.send('menu-open-file')
          }
        },
        { type: 'separator' },
        {
          label: 'Salir',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { role: 'undo', label: 'Deshacer' },
        { role: 'redo', label: 'Rehacer' },
        { type: 'separator' },
        { role: 'cut', label: 'Cortar' },
        { role: 'copy', label: 'Copiar' },
        { role: 'paste', label: 'Pegar' }
      ]
    },
    {
      label: 'Ver',
      submenu: [
        { role: 'reload', label: 'Recargar' },
        { role: 'toggleDevTools', label: 'DevTools' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom Normal' },
        { role: 'zoomIn', label: 'Acercar' },
        { role: 'zoomOut', label: 'Alejar' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// Llamar en app.whenReady()
app.whenReady().then(() => {
  createMenu()
  createWindow()
})
```

## Diálogos Nativos

### Seleccionar archivo

**electron/main.ts:**
```typescript
import { dialog } from 'electron'

ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog(win!, {
    properties: ['openFile'],
    filters: [
      { name: 'Texto', extensions: ['txt', 'md'] },
      { name: 'Todos', extensions: ['*'] }
    ]
  })
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0]
  }
  return null
})
```

**Componente Vue:**
```vue
<script setup lang="ts">
import { useElectronSend } from '@/composables/useElectron'

const { invoke } = useElectronSend()

const selectFile = async () => {
  const filePath = await invoke('select-file')
  if (filePath) {
    console.log('Archivo seleccionado:', filePath)
  }
}
</script>

<template>
  <button @click="selectFile">Seleccionar Archivo</button>
</template>
```

### Guardar archivo

**electron/main.ts:**
```typescript
ipcMain.handle('save-file-dialog', async (event, content) => {
  const result = await dialog.showSaveDialog(win!, {
    defaultPath: 'documento.txt',
    filters: [
      { name: 'Texto', extensions: ['txt'] }
    ]
  })
  
  if (!result.canceled && result.filePath) {
    const fs = await import('fs/promises')
    await fs.writeFile(result.filePath, content, 'utf-8')
    return { success: true, path: result.filePath }
  }
  return { success: false }
})
```

## Notificaciones del Sistema

**electron/main.ts:**
```typescript
import { Notification } from 'electron'

ipcMain.on('show-notification', (event, { title, body }) => {
  new Notification({
    title,
    body,
    icon: path.join(process.env.VITE_PUBLIC || '', 'vite.svg')
  }).show()
})
```

**Componente Vue:**
```vue
<script setup lang="ts">
import { useElectronSend } from '@/composables/useElectron'

const { send } = useElectronSend()

const showNotification = () => {
  send('show-notification', {
    title: '¡Hola!',
    body: 'Esta es una notificación del sistema'
  })
}
</script>
```

## Acceso al Sistema de Archivos

### Composable para archivos

**src/composables/useFileSystem.ts:**
```typescript
import { useElectronSend } from './useElectron'

export function useFileSystem() {
  const { invoke } = useElectronSend()

  const readFile = async (filePath: string) => {
    return await invoke('fs-read-file', filePath)
  }

  const writeFile = async (filePath: string, content: string) => {
    return await invoke('fs-write-file', filePath, content)
  }

  const selectFile = async () => {
    return await invoke('select-file')
  }

  const selectFolder = async () => {
    return await invoke('select-folder')
  }

  return {
    readFile,
    writeFile,
    selectFile,
    selectFolder
  }
}
```

**electron/main.ts - Handlers:**
```typescript
import fs from 'fs/promises'

ipcMain.handle('fs-read-file', async (event, filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return { success: true, content }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('fs-write-file', async (event, filePath, content) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(win!, {
    properties: ['openDirectory']
  })
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0]
  }
  return null
})
```

## Ventanas Múltiples

**electron/main.ts:**
```typescript
let secondWindow: BrowserWindow | null = null

ipcMain.on('open-second-window', () => {
  if (secondWindow) {
    secondWindow.focus()
    return
  }

  secondWindow = new BrowserWindow({
    width: 800,
    height: 600,
    parent: win!,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    secondWindow.loadURL(VITE_DEV_SERVER_URL + '#/second')
  } else {
    secondWindow.loadFile(path.join(RENDERER_DIST, 'index.html'), {
      hash: 'second'
    })
  }

  secondWindow.on('closed', () => {
    secondWindow = null
  })
})
```

## Tray (Icono en bandeja del sistema)

**electron/main.ts:**
```typescript
import { Tray } from 'electron'

let tray: Tray | null = null

function createTray() {
  tray = new Tray(path.join(process.env.VITE_PUBLIC || '', 'vite.svg'))
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mostrar',
      click: () => {
        win?.show()
      }
    },
    {
      label: 'Salir',
      click: () => {
        app.quit()
      }
    }
  ])
  
  tray.setToolTip('ProElectron')
  tray.setContextMenu(contextMenu)
  
  tray.on('click', () => {
    win?.show()
  })
}

// Llamar en app.whenReady()
app.whenReady().then(() => {
  createWindow()
  createTray()
})
```

## Auto-actualización

**Instalar:**
```bash
npm install electron-updater
```

**electron/main.ts:**
```typescript
import { autoUpdater } from 'electron-updater'

// Configurar auto-updater
autoUpdater.checkForUpdatesAndNotify()

autoUpdater.on('update-available', () => {
  win?.webContents.send('update-available')
})

autoUpdater.on('update-downloaded', () => {
  win?.webContents.send('update-downloaded')
})

ipcMain.on('install-update', () => {
  autoUpdater.quitAndInstall()
})
```

**Componente Vue:**
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useElectronListener, useElectronSend } from '@/composables/useElectron'

const updateAvailable = ref(false)
const updateReady = ref(false)
const { send } = useElectronSend()

useElectronListener('update-available', () => {
  updateAvailable.value = true
})

useElectronListener('update-downloaded', () => {
  updateReady.value = true
})

const installUpdate = () => {
  send('install-update')
}
</script>

<template>
  <div v-if="updateAvailable" class="update-banner">
    <p v-if="!updateReady">Descargando actualización...</p>
    <div v-else>
      <p>Actualización lista</p>
      <button @click="installUpdate">Instalar y Reiniciar</button>
    </div>
  </div>
</template>
```

## Store Persistente

**src/composables/useStore.ts:**
```typescript
import { ref, watch } from 'vue'
import { useElectronSend } from './useElectron'

export function useStore<T>(key: string, defaultValue: T) {
  const { invoke } = useElectronSend()
  const data = ref<T>(defaultValue)

  // Cargar datos al iniciar
  const load = async () => {
    const result = await invoke('store-get', key)
    if (result !== null) {
      data.value = result
    }
  }

  // Guardar cuando cambie
  watch(data, (newValue) => {
    invoke('store-set', key, newValue)
  }, { deep: true })

  load()

  return data
}
```

**electron/main.ts:**
```typescript
import Store from 'electron-store'

const store = new Store()

ipcMain.handle('store-get', (event, key) => {
  return store.get(key)
})

ipcMain.handle('store-set', (event, key, value) => {
  store.set(key, value)
  return true
})
```

**Uso:**
```vue
<script setup lang="ts">
import { useStore } from '@/composables/useStore'

const settings = useStore('settings', {
  theme: 'light',
  language: 'es'
})

// Los cambios se guardan automáticamente
settings.value.theme = 'dark'
</script>
```

## Conclusión

Estos ejemplos te dan una base sólida para implementar funcionalidades avanzadas en tu aplicación Electron. Recuerda siempre:

1. **Seguridad**: Usa `contextIsolation: true` y `nodeIntegration: false`
2. **IPC**: Toda comunicación debe pasar por IPC
3. **Tipos**: Define tipos TypeScript para mejor desarrollo
4. **Error Handling**: Siempre maneja errores en operaciones asíncronas
