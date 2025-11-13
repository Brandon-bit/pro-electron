<template>
  <div class="electron-demo">
    <h2>🚀 Electron Demo</h2>
    
    <div class="status">
      <p>
        <strong>Estado:</strong> 
        <span :class="isElectron ? 'running-electron' : 'running-web'">
          {{ isElectron ? '💻 Corriendo en Electron' : '🌐 Corriendo en Web' }}
        </span>
      </p>
    </div>

    <div v-if="isElectron" class="electron-features">
      <h3>Características de Electron</h3>
      <p>Último mensaje del proceso principal:</p>
      <div class="message-box">
        {{ lastMessage || 'Esperando mensaje...' }}
      </div>
      
      <button @click="sendTestMessage">
        Enviar mensaje de prueba
      </button>
    </div>

    <div v-else class="web-mode">
      <p>ℹ️ Esta aplicación también funciona en modo web.</p>
      <p>Para ver las características de Electron, ejecuta:</p>
      <code>npm run dev:electron</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useElectron, useElectronListener, useElectronSend } from '../composables/useElectron'

const { isElectron } = useElectron()
const { send } = useElectronSend()
const lastMessage = ref<string>('')

// Escuchar mensajes del proceso principal
useElectronListener('main-process-message', (_event, message) => {
  lastMessage.value = message
})

const sendTestMessage = () => {
  send('test-message', 'Hola desde el renderer!')
}
</script>

<style scoped>
.electron-demo {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  color: #42b983;
  margin-bottom: 1rem;
}

.status {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.running-electron {
  color: #42b983;
  font-weight: bold;
}

.running-web {
  color: #2c3e50;
  font-weight: bold;
}

.electron-features {
  background: #e8f5e9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.message-box {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  border: 1px solid #ddd;
  font-family: monospace;
  min-height: 50px;
}

.web-mode {
  background: #e3f2fd;
  padding: 1.5rem;
  border-radius: 8px;
}

.web-mode code {
  background: #263238;
  color: #aed581;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: block;
  margin-top: 0.5rem;
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

button:hover {
  background: #35a372;
}

button:active {
  transform: scale(0.98);
}
</style>
