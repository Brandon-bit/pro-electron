import { useField } from 'vee-validate';
const props = withDefaults(defineProps(), {
    readonly: false
});
const { value, errorMessage } = useField(props.name);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    readonly: false
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
    ...{ class: (['flex flex-col space-y-2', props.class]) },
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
__VLS_asFunctionalElement(__VLS_intrinsics.textarea, __VLS_intrinsics.textarea)({
    value: (__VLS_ctx.value),
    ...{ class: "textarea w-full" },
    ...{ class: ({ 'textarea-error': __VLS_ctx.errorMessage }) },
    placeholder: "Ingrese valor",
    readonly: (props.readonly),
});
// @ts-ignore
[value, errorMessage,];
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
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['textarea-error']} */ ;
/** @type {__VLS_StyleScopedClasses['text-error']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=BaseTextArea.vue.js.map