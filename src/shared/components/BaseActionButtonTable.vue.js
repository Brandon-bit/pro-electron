const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (props.onClick) },
    type: "button",
    ...{ class: (`btn btn-outline btn-${__VLS_ctx.variant || 'edit'} ${__VLS_ctx.className} action-btn-table`) },
});
__VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: { top: true, }, value: (`${__VLS_ctx.tooltipText}`) }, null, null);
// @ts-ignore
[variant, className, vTooltip, tooltipText,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "material-symbols-outlined" },
});
(props.icon);
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=BaseActionButtonTable.vue.js.map