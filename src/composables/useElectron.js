import { onMounted, onUnmounted } from 'vue';
/**
 * Composable para detectar si la app está corriendo en Electron
 */
export function useElectron() {
    const isElectron = typeof window !== 'undefined' && window.ipcRenderer !== undefined;
    return {
        isElectron
    };
}
/**
 * Composable para escuchar mensajes del proceso principal de Electron
 * @param channel - Canal de IPC a escuchar
 * @param callback - Función a ejecutar cuando se recibe un mensaje
 */
export function useElectronListener(channel, callback) {
    const { isElectron } = useElectron();
    onMounted(() => {
        if (isElectron) {
            window.ipcRenderer.on(channel, callback);
        }
    });
    onUnmounted(() => {
        if (isElectron) {
            window.ipcRenderer.off(channel, callback);
        }
    });
}
/**
 * Composable para enviar mensajes al proceso principal de Electron
 */
export function useElectronSend() {
    const { isElectron } = useElectron();
    const send = (channel, ...args) => {
        if (isElectron) {
            window.ipcRenderer.send(channel, ...args);
        }
        else {
            console.warn('IPC not available: not running in Electron');
        }
    };
    const invoke = async (channel, ...args) => {
        if (isElectron) {
            return await window.ipcRenderer.invoke(channel, ...args);
        }
        else {
            console.warn('IPC not available: not running in Electron');
            return null;
        }
    };
    return {
        send,
        invoke
    };
}
//# sourceMappingURL=useElectron.js.map