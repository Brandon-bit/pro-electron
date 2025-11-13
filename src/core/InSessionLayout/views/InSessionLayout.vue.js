import { ref, provide, onMounted, onUnmounted, onBeforeMount } from 'vue';
import Sidebar from '@core/InSessionLayout/components/SideBar.vue';
import NavBar from '@core/InSessionLayout/components/NavBar.vue';
import Drawer from '@core/InSessionLayout/components/Drawer.vue';
import { useInSessionActions } from '@core/InSessionLayout/composables/useInSessionActions';
const showSidebar = ref(false);
const showLogo = ref(true);
const isSmallScreen = ref(false);
const checkScreen = () => {
    isSmallScreen.value = window.matchMedia('(max-width: 768px)').matches;
};
onBeforeMount(() => {
    useInSessionActions().getDashboards();
    useInSessionActions().getModules();
});
onMounted(() => {
    checkScreen();
    window.addEventListener('resize', checkScreen);
});
onUnmounted(() => {
    window.removeEventListener('resize', checkScreen);
});
provide('showSidebar', showSidebar);
provide('showLogo', showLogo);
provide('isSmallScreen', isSmallScreen);
//provide('modulos', modulos)
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex bg-[var(--black)] h-screen overflow-hidden" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: ([
            'transition-all duration-300',
            __VLS_ctx.isSmallScreen ? 'w-0' : __VLS_ctx.showSidebar ? 'w-64' : 'w-18'
        ]) },
});
// @ts-ignore
[isSmallScreen, showSidebar,];
const __VLS_0 = ((__VLS_ctx.isSmallScreen ? __VLS_ctx.Drawer : __VLS_ctx.Sidebar));
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
// @ts-ignore
[isSmallScreen, Drawer, Sidebar,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: ([
            'flex flex-col flex-1 bg-[var(--color-base-100)] rounded overflow-hidden',
            __VLS_ctx.isSmallScreen ? 'm-2' : __VLS_ctx.showSidebar ? 'm-2' : 'my-2 mr-2'
        ]) },
});
// @ts-ignore
[isSmallScreen, showSidebar,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
/** @type {[typeof NavBar, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(NavBar, new NavBar({}));
const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "h-screen overflow-auto scrollbar-hide px-10 py-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full lg:max-w-[90%] lg:mx-auto" },
});
const __VLS_9 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({}));
const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--black)]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--color-base-100)]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['scrollbar-hide']} */ ;
/** @type {__VLS_StyleScopedClasses['px-10']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:max-w-[90%]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:mx-auto']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=InSessionLayout.vue.js.map