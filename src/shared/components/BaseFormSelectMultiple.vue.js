import { useField } from 'vee-validate';
import { computed } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
const props = defineProps();
const { value: fieldValue, errorMessage } = useField(props.name);
// Computed para manejar la conversión entre objetos y IDs
const selectedOptions = computed({
    get: () => {
        if (!fieldValue.value || fieldValue.value.length === 0)
            return [];
        return props.options.filter((opt) => fieldValue.value.includes(Number(opt.id)));
    },
    set: (newValue) => {
        fieldValue.value = newValue.map((item) => Number(item.id));
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
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
    ...{ class: "font-semibold" },
});
(props.label);
if (props.required) {
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-error" },
    });
}
const __VLS_0 = {}.Multiselect;
/** @type {[typeof __VLS_components.Multiselect, ]} */ ;
// @ts-ignore
Multiselect;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: (props.name),
    modelValue: (__VLS_ctx.selectedOptions),
    options: (props.options),
    multiple: (true),
    placeholder: "Elige una o varias opciones",
    label: "label",
    showLabels: (false),
    trackBy: "id",
    maxHeight: (200),
    ...{ class: ({ '!select w-full': __VLS_ctx.errorMessage }) },
}));
const __VLS_2 = __VLS_1({
    name: (props.name),
    modelValue: (__VLS_ctx.selectedOptions),
    options: (props.options),
    multiple: (true),
    placeholder: "Elige una o varias opciones",
    label: "label",
    showLabels: (false),
    trackBy: "id",
    maxHeight: (200),
    ...{ class: ({ '!select w-full': __VLS_ctx.errorMessage }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
// @ts-ignore
[selectedOptions, errorMessage,];
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
/** @type {__VLS_StyleScopedClasses['!select']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-error']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=BaseFormSelectMultiple.vue.js.map