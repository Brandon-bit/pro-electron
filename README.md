# ProElectron

Aplicación Vue 3 + Vite que funciona tanto en web como en desktop con Electron.

## 🚀 Desarrollo

### Modo Web
```bash
npm run dev
```
Abre el navegador en `http://localhost:5173`

### Modo Electron (Desktop)
```bash
npm run dev:electron
```
Abre la aplicación en una ventana de Electron con DevTools habilitadas.

## 📦 Build

### Build para Web
```bash
npm run build:web
```
Genera los archivos estáticos en la carpeta `dist-web/` listos para desplegar en cualquier servidor web.

### Build para Desktop

#### Windows
```bash
npm run build:win
```
Genera un instalador `.exe` en `release/[version]/`

#### macOS
```bash
npm run build:mac
```
Genera un archivo `.dmg` en `release/[version]/`

#### Linux
```bash
npm run build:linux
```
Genera un archivo `.AppImage` en `release/[version]/`

### Build completo para Electron (sin empaquetar)
```bash
npm run build:electron
```
Compila la aplicación en las carpetas `dist/` y `dist-electron/`

## 📁 Estructura del Proyecto

```
pro-electron/
├── electron/           # Archivos de Electron
│   ├── main.ts        # Proceso principal de Electron
│   └── preload.ts     # Script de preload para seguridad
├── src/               # Código fuente de Vue
│   ├── components/
│   ├── App.vue
│   └── main.ts
├── public/            # Archivos estáticos
├── dist/              # Build de la app Vue (Electron)
├── dist-web/          # Build para web
├── dist-electron/     # Build del proceso principal de Electron
├── vite.config.ts     # Configuración Vite + Electron
└── vite.config.web.ts # Configuración Vite solo web
```

## 🔧 Tecnologías

- **Vue 3** - Framework progresivo de JavaScript
- **Vite** - Build tool ultra rápido
- **TypeScript** - Tipado estático
- **Electron** - Framework para apps de escritorio
- **electron-builder** - Empaquetado de aplicaciones Electron

## 📝 Notas

- El modo desarrollo de Electron (`dev:electron`) abre automáticamente las DevTools
- Los builds de desktop se generan en `release/[version]/`
- La configuración de electron-builder está en `package.json` bajo la clave `build`
- Para cambiar el icono de la aplicación, reemplaza los archivos en `public/`
