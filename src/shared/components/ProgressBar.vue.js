const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "steps w-full mb-8" },
});
for (const [stepItem, index] of __VLS_getVForSourceType((__VLS_ctx.stepsConfig))) {
    // @ts-ignore
    [stepsConfig,];
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (index),
        ...{ class: "step" },
        ...{ class: ({ 'step-primary': __VLS_ctx.step >= index + 1 }) },
    });
    // @ts-ignore
    [step,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "material-symbols-outlined step-icon !flex items-center justify-center mb-1" },
    });
    (stepItem.icon);
}
/** @type {__VLS_StyleScopedClasses['steps']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['!flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=ProgressBar.vue.js.map