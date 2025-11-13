import { useField } from 'vee-validate';
import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    disabled: false
});
const { value, errorMessage } = useField(props.name);
const optionsMap = computed(() => [{ id: 0, label: 'Elige una opción' }, ...props.options]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    disabled: false
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col space-y-2 mb-4" },
    ...{ class: (props.class || '') },
});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: (__VLS_ctx.name),
    ...{ class: "font-semibold" },
});
// @ts-ignore
[name,];
(__VLS_ctx.label);
// @ts-ignore
[label,];
if (props.required) {
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-error" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    value: (__VLS_ctx.value),
    ...{ class: "select w-full" },
    name: (props.name),
    ...{ class: ({ 'select-error': __VLS_ctx.errorMessage }) },
    disabled: (props.disabled),
});
// @ts-ignore
[value, errorMessage,];
for (const [option, index] of __VLS_getVForSourceType((__VLS_ctx.optionsMap))) {
    // @ts-ignore
    [optionsMap,];
    __VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        key: (index),
        value: (option.id.toString()),
    });
    (option.label);
}
if (__VLS_ctx.errorMessage) {
    // @ts-ignore
    [errorMessage,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-error" },
    });
    (__VLS_ctx.errorMessage);
    // @ts-ignore
    [errorMessage,];
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-error']} */ ;
/** @type {__VLS_StyleScopedClasses['select']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['select-error']} */ ;
/** @type {__VLS_StyleScopedClasses['text-error']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=BaseFormSelect.vue.js.map