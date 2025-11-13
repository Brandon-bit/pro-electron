import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron/simple'
import path from 'node:path'
import { fileURLToPath } from 'url'
import svgLoader from 'vite-svg-loader'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    svgLoader(),
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      //CORE
      '@core': path.resolve(__dirname, './src/core'),
      //MODULES
      // '@defaultModule': path.resolve(__dirname, './src/modules/DefaultModule'),
      // '@contabilidad': path.resolve(__dirname, './src/modules/Contabilidad'),
      // '@administracion': path.resolve(__dirname, './src/modules/administracion'),
      // '@dashboard': path.resolve(__dirname, './src/modules/dashboard'),
      // '@mantenimiento': path.resolve(__dirname, './src/modules/mantenimiento'),
      // '@marketing': path.resolve(__dirname, './src/modules/marketing'),
      // '@procesos': path.resolve(__dirname, './src/modules/procesos'),
      // '@proyectos': path.resolve(__dirname, './src/modules/proyectos'),
      // '@recursosHumanos': path.resolve(__dirname, './src/modules/recursosHumanos'),
      // '@compras': path.resolve(__dirname, './src/modules/compras'),
      '@inventario': path.resolve(__dirname, './src/modules/inventario'),
      // '@pos': path.resolve(__dirname, './src/modules/POS'),
      // '@facturacion': path.resolve(__dirname, './src/modules/facturacion'),
      // '@nomina': path.resolve(__dirname, './src/modules/nomina'),
      // '@planeacionEstrategica': path.resolve(__dirname, './src/modules/PlaneacionEstrategica'),
      // '@inversiones': path.resolve(__dirname, './src/modules/Inversiones'),
      // '@mesa-de-control': path.resolve(__dirname, './src/modules/MesaDeControl'),
      // //NAVBAR
      // '@exportar': path.resolve(__dirname, './src/navbar/Exportar'),
      // '@listaDePendientes': path.resolve(__dirname, './src/navbar/ListaDePendientes'),
      // '@indicadores': path.resolve(__dirname, './src/navbar/Indicadores'),
      // '@portafolioDeProyectos': path.resolve(__dirname, './src/navbar/PortafolioDeProyectos'),
      // '@roadMap': path.resolve(__dirname, './src/navbar/RoadMap'),
      // '@agenda': path.resolve(__dirname, './src/navbar/Agenda'),
      // '@tutoriales': path.resolve(__dirname, './src/navbar/Tutoriales'),
      // '@soporte': path.resolve(__dirname, './src/navbar/Soporte'),
      // '@perfil': path.resolve(__dirname, './src/navbar/Perfil'),
      // '@escalaTuNegocio': path.resolve(__dirname, './src/navbar/EscalaTuNegocio'),
      //GLOBAL STORE
      '@sharedstore': path.resolve(__dirname, './src/shared/stores'),
      //'@rrhh': path.resolve(__dirname, './src/modules/RRHH')
    }
  },
  // Vite options tailored for Electron development
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
