import { useRouter } from 'vue-router';
const props = defineProps();
const router = useRouter();
const handleCancel = () => {
    if (props.onCancel) {
        props.onCancel();
    }
    else {
        router.back();
    }
};
const getSubmitText = () => {
    if (props.submitText) {
        return props.isEditMode ? `Actualizar ${props.submitText}` : `Crear ${props.submitText}`;
    }
    return props.isEditMode ? 'Actualizar' : 'Crear';
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['modern-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-btn']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-12 justify-end gap-4 mt-10" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.handleCancel) },
    type: "button",
    ...{ class: "btn col-span-6 modern-btn" },
    disabled: (__VLS_ctx.isSubmitting),
});
// @ts-ignore
[handleCancel, isSubmitting,];
(__VLS_ctx.cancelText || 'Regresar');
// @ts-ignore
[cancelText,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "submit",
    ...{ class: "btn btn-primary col-span-6 modern-btn" },
    disabled: (__VLS_ctx.isSubmitting),
});
// @ts-ignore
[isSubmitting,];
if (__VLS_ctx.isSubmitting) {
    // @ts-ignore
    [isSubmitting,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "loading loading-spinner" },
    });
}
else {
    (__VLS_ctx.getSubmitText());
    // @ts-ignore
    [getSubmitText,];
}
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=BaseFormActionButtons.vue.js.map