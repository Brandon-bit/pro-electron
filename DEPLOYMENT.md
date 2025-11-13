# Guía de Despliegue

## 🌐 Despliegue Web

### Opción 1: Netlify / Vercel
1. Ejecuta el build para web:
   ```bash
   npm run build:web
   ```
2. Sube la carpeta `dist-web/` a tu servicio de hosting preferido
3. Configura el directorio de publicación como `dist-web`

### Opción 2: Servidor tradicional
1. Ejecuta el build:
   ```bash
   npm run build:web
   ```
2. Copia el contenido de `dist-web/` a tu servidor web (Apache, Nginx, etc.)
3. Configura el servidor para servir `index.html` como fallback para rutas SPA

## 💻 Despliegue Desktop

### Windows
```bash
npm run build:win
```
**Salida:** `release/[version]/ProElectron Setup [version].exe`

**Requisitos:**
- Windows 7 o superior
- No requiere instalación de dependencias adicionales

### macOS
```bash
npm run build:mac
```
**Salida:** `release/[version]/ProElectron-[version].dmg`

**Requisitos:**
- macOS 10.13 o superior
- Para firmar la app, necesitas un certificado de desarrollador de Apple

**Nota:** Para compilar para macOS desde Windows, necesitas configurar electron-builder con herramientas adicionales.

### Linux
```bash
npm run build:linux
```
**Salida:** `release/[version]/ProElectron-[version].AppImage`

**Requisitos:**
- Distribuciones basadas en Debian/Ubuntu, Fedora, o Arch
- El AppImage es portable y no requiere instalación

## 🔐 Firma de Código

### Windows
Agrega a `package.json`:
```json
"build": {
  "win": {
    "certificateFile": "path/to/certificate.pfx",
    "certificatePassword": "your-password"
  }
}
```

### macOS
Configura las variables de entorno:
```bash
export CSC_LINK="path/to/certificate.p12"
export CSC_KEY_PASSWORD="your-password"
```

## 📦 Distribución

### Auto-actualización
Para implementar auto-actualización, considera usar:
- **electron-updater** (incluido con electron-builder)
- Configura un servidor de actualizaciones o usa GitHub Releases

### Ejemplo de configuración:
```json
"build": {
  "publish": {
    "provider": "github",
    "owner": "tu-usuario",
    "repo": "pro-electron"
  }
}
```

## 🎯 Optimización

### Reducir tamaño del build
1. **Excluir dependencias innecesarias:**
   ```json
   "build": {
     "files": [
       "dist/**/*",
       "dist-electron/**/*",
       "!node_modules/**/*"
     ]
   }
   ```

2. **Comprimir con asar:**
   ```json
   "build": {
     "asar": true
   }
   ```

3. **Optimizar assets:**
   - Usa imágenes optimizadas
   - Minimiza el uso de fuentes personalizadas
   - Implementa lazy loading en Vue

## 🐛 Solución de Problemas

### Error: "Cannot find module"
- Verifica que todas las dependencias estén en `dependencies` (no en `devDependencies`)
- Ejecuta `npm install` nuevamente

### Build falla en Windows
- Ejecuta PowerShell como administrador
- Instala windows-build-tools: `npm install --global windows-build-tools`

### App no abre en macOS
- Verifica que la app esté firmada correctamente
- Permite apps de desarrolladores no identificados en Preferencias del Sistema

### Build muy pesado
- Revisa las dependencias incluidas
- Usa `electron-builder` con configuración de compresión
- Considera usar electron-builder con `compression: "maximum"`
