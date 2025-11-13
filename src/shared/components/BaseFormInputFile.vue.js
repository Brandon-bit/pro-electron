import { ref, watchEffect } from 'vue';
import { useField } from 'vee-validate';
const props = defineProps();
const fileNames = ref([]);
const fileInput = ref(null);
const { value, errorMessage } = useField(props.name);
// watch(value, (newValue) => {
//     if (!newValue.length) {
//         fileNames.value = []
//         value.value = ''
//         fileInput.value.value = ''
//     } else {
//         fileNames.value = newValue
//         value.value = newValue
//     }
// })
watchEffect(() => {
    if ((!value.value || value.value.length === 0) && !errorMessage.value) {
        fileNames.value = [];
        if (fileInput.value) {
            fileInput.value.value = '';
        }
    }
});
const handleFileChange = (event) => {
    const files = event.target.files;
    if (!files)
        return;
    const arr = Array.from(files);
    fileNames.value = arr;
    value.value = arr;
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
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col space-y-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "font-semibold text-start" },
});
(props.label);
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-center items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: (props.name),
    ...{ class: ([
            'w-full h-40 border-4 border-dashed rounded-lg flex justify-center items-center cursor-pointer hover:border-gray-400',
            __VLS_ctx.errorMessage
                ? 'border-red-300 hover:border-red-400'
                : 'border-gray-300 hover:border-gray-400'
        ]) },
});
// @ts-ignore
[errorMessage,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-center px-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "material-symbols-outlined animate-subtle-bounce text-lg" },
});
if (!__VLS_ctx.fileNames.length) {
    // @ts-ignore
    [fileNames,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-2 text-gray-500" },
    });
}
if (__VLS_ctx.fileNames.length) {
    // @ts-ignore
    [fileNames,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-3 text-gray-600" },
    });
    for (const [file, index] of __VLS_getVForSourceType((__VLS_ctx.fileNames))) {
        // @ts-ignore
        [fileNames,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (index),
        });
        (file.name);
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-3 text-gray-500" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.handleFileChange) },
    ref: "fileInput",
    type: "file",
    id: (props.name),
    name: (props.name),
    ...{ class: "hidden" },
    ...{ class: ({ 'input-error': __VLS_ctx.errorMessage }) },
    multiple: (props.multiple || false),
    accept: (__VLS_ctx.accept || '*/*'),
});
/** @type {typeof __VLS_ctx.fileInput} */ ;
// @ts-ignore
[errorMessage, handleFileChange, accept, fileInput,];
if (__VLS_ctx.errorMessage) {
    // @ts-ignore
    [errorMessage,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-red-500" },
    });
    (__VLS_ctx.errorMessage);
    // @ts-ignore
    [errorMessage,];
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-start']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-40']} */ ;
/** @type {__VLS_StyleScopedClasses['border-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-subtle-bounce']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['input-error']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=BaseFormInputFile.vue.js.map