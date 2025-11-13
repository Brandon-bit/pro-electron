import { ref, watchEffect, onUnmounted, watch } from 'vue';
import { useField } from 'vee-validate';
import styles from '@inventario/ConfiguracionDeInventario/CrearProducto/styles/createProduct.module.css';
const props = defineProps();
const fileNames = ref([]);
const fileInput = ref(null);
const previewUrl = ref(props.imageUrl ?? null);
const { value: fileValue, errorMessage } = useField(props.name);
const { value: removeImageValue } = useField('removeImage');
watchEffect(() => {
    if ((!fileValue.value || fileValue.value.length === 0) && !errorMessage.value) {
        fileNames.value = [];
        if (fileInput.value) {
            fileInput.value.value = '';
        }
    }
});
const handleFileChange = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0)
        return;
    const arr = Array.from(files);
    fileValue.value = arr;
    // if single file, we update the preview
    const file = arr[0];
    previewUrl.value = URL.createObjectURL(file);
};
const removeImage = () => {
    previewUrl.value = null;
    fileValue.value = [];
    if (fileInput.value)
        fileInput.value.value = '';
    removeImageValue.value = true;
};
onUnmounted(() => {
    if (previewUrl.value?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl.value);
    }
});
watch(() => props.imageUrl, (newUrl) => {
    previewUrl.value = newUrl ?? null;
}, { immediate: true });
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
if (__VLS_ctx.previewUrl) {
    // @ts-ignore
    [previewUrl,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full aspect-square bg-white rounded-xl shadow-md hover:shadow-lg flex-col indicator transition-shadow duration-300 flex items-center justify-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        src: (__VLS_ctx.previewUrl),
        alt: "Vista previa",
        ...{ class: "object-contain w-full h-full p-2 transition-transform duration-300 hover:scale-105" },
    });
    // @ts-ignore
    [previewUrl,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ onClick: (__VLS_ctx.removeImage) },
        ...{ class: "indicator-item badge badge-error text-white cursor-pointer p-1" },
    });
    // @ts-ignore
    [removeImage,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: ([
                'material-symbols-outlined',
                __VLS_ctx.styles['icon-delete-image']
            ]) },
    });
    // @ts-ignore
    [styles,];
}
else {
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
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-2 text-gray-500" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.input)({
        ...{ onChange: (__VLS_ctx.handleFileChange) },
        ref: "fileInput",
        type: "file",
        id: (props.name),
        name: (props.name),
        ...{ class: "hidden" },
        multiple: (false),
        accept: ('image/*'),
    });
    /** @type {typeof __VLS_ctx.fileInput} */ ;
    // @ts-ignore
    [handleFileChange, fileInput,];
}
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
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-square']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['object-contain']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator-item']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-error']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
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
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=BaseFormSingleImageInput.vue.js.map