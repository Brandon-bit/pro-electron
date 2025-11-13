import { ref } from 'vue';
import { useElectron, useElectronListener, useElectronSend } from '../composables/useElectron';
const { isElectron } = useElectron();
const { send } = useElectronSend();
const lastMessage = ref('');
// Escuchar mensajes del proceso principal
useElectronListener('main-process-message', (_event, message) => {
    lastMessage.value = message;
});
const sendTestMessage = () => {
    send('test-message', 'Hola desde el renderer!');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['web-mode']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "electron-demo" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "status" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: (__VLS_ctx.isElectron ? 'running-electron' : 'running-web') },
});
// @ts-ignore
[isElectron,];
(__VLS_ctx.isElectron ? '💻 Corriendo en Electron' : '🌐 Corriendo en Web');
// @ts-ignore
[isElectron,];
if (__VLS_ctx.isElectron) {
    // @ts-ignore
    [isElectron,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "electron-features" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "message-box" },
    });
    (__VLS_ctx.lastMessage || 'Esperando mensaje...');
    // @ts-ignore
    [lastMessage,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.sendTestMessage) },
    });
    // @ts-ignore
    [sendTestMessage,];
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "web-mode" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
}
/** @type {__VLS_StyleScopedClasses['electron-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['electron-features']} */ ;
/** @type {__VLS_StyleScopedClasses['message-box']} */ ;
/** @type {__VLS_StyleScopedClasses['web-mode']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=ElectronDemo.vue.js.map