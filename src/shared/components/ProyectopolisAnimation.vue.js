import { ref, onMounted, onBeforeUnmount } from 'vue';
import lottie from 'lottie-web';
const container = ref(null);
let animation = null;
onMounted(() => {
    animation = lottie.loadAnimation({
        container: container.value,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/icono.json'
    });
});
onBeforeUnmount(() => {
    if (animation)
        animation.destroy();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "container",
    ...{ class: "lottie-container" },
});
/** @type {typeof __VLS_ctx.container} */ ;
// @ts-ignore
[container,];
/** @type {__VLS_StyleScopedClasses['lottie-container']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=ProyectopolisAnimation.vue.js.map