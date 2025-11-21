<template>
  <div class="integrations-view">
    <div class="view-header">
      <div class="breadcrumbs">
        <router-link to="/marketing">Marketing</router-link>
        <span class="separator">›</span>
        <span>Integraciones</span>
      </div>
      
      <div class="header-content">
        <div>
          <h1 class="view-title">Integraciones de Redes Sociales</h1>
          <p class="view-subtitle">
            Conecta y gestiona tus cuentas de redes sociales para publicar contenido
          </p>
        </div>
        
        <div class="stats-card">
          <div class="stat-icon">🔌</div>
          <div class="stat-content">
            <div class="stat-label">Integraciones</div>
            <div class="stat-value">{{ connectedCount }}</div>
            <div class="stat-desc">{{ connectedCount === 1 ? 'conectada' : 'conectadas' }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="integrations-grid">
      <!-- Sendible Integration -->
      <SendibleConnection />
      
      <!-- Future Integrations Placeholders -->
      <div class="integration-placeholder">
        <div class="placeholder-icon">📊</div>
        <h3 class="placeholder-title">Hootsuite</h3>
        <p class="placeholder-desc">Gestión avanzada de redes sociales</p>
        <span class="placeholder-badge">Próximamente</span>
      </div>

      <div class="integration-placeholder">
        <div class="placeholder-icon">⏰</div>
        <h3 class="placeholder-title">Later</h3>
        <p class="placeholder-desc">Programación visual de contenido</p>
        <span class="placeholder-badge">Próximamente</span>
      </div>

      <div class="integration-placeholder">
        <div class="placeholder-icon">🌱</div>
        <h3 class="placeholder-title">Sprout Social</h3>
        <p class="placeholder-desc">Análisis y engagement social</p>
        <span class="placeholder-badge">Próximamente</span>
      </div>
    </div>

    <!-- Help Section -->
    <div class="help-section">
      <h3 class="help-title">💡 ¿Necesitas ayuda?</h3>
      <div class="help-grid">
        <div class="help-card">
          <h4>Configuración de Sendible</h4>
          <ul>
            <li>Haz clic en "Conectar con Sendible"</li>
            <li>Autoriza el acceso en la ventana de Sendible</li>
            <li>Regresa automáticamente a esta página</li>
            <li>Vincula perfiles a tus marcas</li>
          </ul>
        </div>
        
        <div class="help-card">
          <h4>Solución de problemas</h4>
          <ul>
            <li>Verifica que tengas una cuenta activa de Sendible</li>
            <li>Asegúrate de permitir ventanas emergentes</li>
            <li>Contacta soporte si persisten los problemas</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSendibleStore } from '@/store/sendible'
import SendibleConnection from '../components/SendibleConnection.vue'

const sendibleStore = useSendibleStore()

const connectedCount = computed(() => {
  let count = 0
  if (sendibleStore.isSendibleConnected) count++
  return count
})

onMounted(async () => {
  await sendibleStore.checkSendibleStatus()
})
</script>

<style scoped>
.integrations-view { max-width: 1200px; margin: 0 auto; padding: 2rem; }
.view-header { margin-bottom: 2rem; }
.breadcrumbs { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem; }
.breadcrumbs a { color: #667eea; text-decoration: none; }
.breadcrumbs a:hover { text-decoration: underline; }
.separator { color: #d1d5db; }
.header-content { display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; }
.view-title { font-size: 2rem; font-weight: 700; color: #111827; margin: 0 0 0.5rem; }
.view-subtitle { font-size: 1rem; color: #6b7280; margin: 0; }
.stats-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 12px; display: flex; align-items: center; gap: 1rem; min-width: 180px; }
.stat-icon { font-size: 2.5rem; }
.stat-content { flex: 1; }
.stat-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.9; }
.stat-value { font-size: 2rem; font-weight: 700; line-height: 1; margin: 0.25rem 0; }
.stat-desc { font-size: 0.75rem; opacity: 0.8; }
.integrations-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
.integration-placeholder { background: white; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); opacity: 0.6; }
.placeholder-icon { font-size: 3rem; margin-bottom: 1rem; }
.placeholder-title { font-size: 1.25rem; font-weight: 600; color: #111827; margin: 0 0 0.5rem; }
.placeholder-desc { font-size: 0.875rem; color: #6b7280; margin: 0 0 1rem; }
.placeholder-badge { display: inline-block; padding: 0.375rem 0.875rem; background: #f3f4f6; color: #6b7280; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
.help-section { background: #f9fafb; border-radius: 12px; padding: 2rem; }
.help-title { font-size: 1.5rem; font-weight: 600; color: #111827; margin: 0 0 1.5rem; }
.help-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.help-card { background: white; border-radius: 8px; padding: 1.5rem; }
.help-card h4 { font-size: 1rem; font-weight: 600; color: #111827; margin: 0 0 1rem; }
.help-card ul { list-style: none; padding: 0; margin: 0; }
.help-card li { font-size: 0.875rem; color: #6b7280; padding: 0.5rem 0; padding-left: 1.5rem; position: relative; }
.help-card li::before { content: '•'; position: absolute; left: 0; color: #667eea; font-weight: 700; }
@media (max-width: 768px) {
  .integrations-view { padding: 1rem; }
  .header-content { flex-direction: column; }
  .stats-card { width: 100%; }
  .integrations-grid { grid-template-columns: 1fr; }
}
</style>
