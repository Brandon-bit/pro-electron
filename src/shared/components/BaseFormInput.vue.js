import { useField } from 'vee-validate';
const props = withDefaults(defineProps(), {
    readonly: false,
    type: 'text',
    allowDecimal: false
});
const { value, errorMessage } = useField(props.name);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    readonly: false,
    type: 'text',
    allowDecimal: false
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
    ...{ class: (['flex flex-col space-y-2 mb-4', props.class]) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: (props.name),
    ...{ class: "font-semibold" },
});
(props.label);
if (props.required) {
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-error" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    name: (props.name),
    readonly: (props.readonly),
    type: (props.type),
    placeholder: (props.placeholder),
    step: (props.type === 'number' ? (__VLS_ctx.allowDecimal ? '0.01' : '1') : undefined),
    ...{ class: (['input w-full', { 'input-error': __VLS_ctx.errorMessage }, props.inputClass]) },
});
(__VLS_ctx.value);
// @ts-ignore
[allowDecimal, errorMessage, value,];
if (__VLS_ctx.errorMessage) {
    // @ts-ignore
    [errorMessage,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-error" },
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
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['input-error']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-error']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=BaseFormInput.vue.js.map