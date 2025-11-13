import { computed } from 'vue';
import { useThemeStore } from '@/store/theme';
const themeStore = useThemeStore();
const isDarkMode = computed({
    get: () => themeStore.currentTheme === 'business',
    set: (value) => {
        const theme = value ? 'business' : 'corporate';
        themeStore.setTheme(theme);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "flex cursor-pointer gap-2 m-auto" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "12",
    cy: "12",
    r: "5",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
});
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    type: "checkbox",
    value: "business",
    ...{ class: "toggle theme-controller" },
});
(__VLS_ctx.isDarkMode);
// @ts-ignore
[isDarkMode,];
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path, __VLS_intrinsics.path)({
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['m-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-controller']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=DarkModeSwitch.vue.js.map