import { ref, watch } from 'vue';
import { useField } from 'vee-validate';
import { searchProductsByName } from '@/modules/Inventario/Stock/TransferenciaStock/services/transferStockServices';
const props = defineProps();
// VeeValidate maneja el VALOR FINAL (el ID del producto seleccionado)
const { value, errorMessage } = useField(props.name);
// --- ESTADO LOCAL DEL COMPONENTE ---
const searchTerm = ref('');
const options = ref([]); // La lista de resultados del API
const isLoading = ref(false);
const isOpen = ref(false);
// --- LÓGICA DE BÚSQUEDA ---
let debounceTimer;
watch(searchTerm, (newTerm) => {
    if (!newTerm) {
        isOpen.value = false;
        options.value = [];
        return;
    }
    isOpen.value = true;
    isLoading.value = true;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        try {
            const response = await searchProductsByName(newTerm);
            console.log('AAAAAA', response);
            // La lista de productos está en response.data.productos
            options.value = response.data.productos;
        }
        catch (error) {
            console.error("Error en la búsqueda:", error);
            options.value = []; // Limpia las opciones en caso de error
        }
        finally {
            isLoading.value = false;
        }
    }, 500);
});
// --- LÓGICA DE SELECCIÓN ---
const selectOption = (option) => {
    console.log('IDDDDD', option);
    value.value = option.id;
    console.log('AHHHH', value.value);
    searchTerm.value = option.nombre; // Muestra el nombre del producto en el input
    isOpen.value = false;
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
    ...{ class: "flex flex-col space-y-2 mb-4 relative" },
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
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    type: "text",
    value: (__VLS_ctx.searchTerm),
    placeholder: (__VLS_ctx.placeholder || 'Escribe para buscar...'),
    ...{ class: "input w-full" },
    ...{ class: ({ 'input-error': __VLS_ctx.errorMessage }) },
    autocomplete: "off",
});
// @ts-ignore
[searchTerm, placeholder, errorMessage,];
if (__VLS_ctx.isOpen) {
    // @ts-ignore
    [isOpen,];
    __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "absolute top-full left-0 right-0 z-10 bg-base-100 border rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1" },
    });
    if (__VLS_ctx.isLoading) {
        // @ts-ignore
        [isLoading,];
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ class: "px-4 py-2 text-gray-500" },
        });
    }
    else if (__VLS_ctx.options.length === 0) {
        // @ts-ignore
        [options,];
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ class: "px-4 py-2 text-gray-500" },
        });
    }
    else {
        for (const [option] of __VLS_getVForSourceType((__VLS_ctx.options))) {
            // @ts-ignore
            [options,];
            __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.isOpen))
                            return;
                        if (!!(__VLS_ctx.isLoading))
                            return;
                        if (!!(__VLS_ctx.options.length === 0))
                            return;
                        __VLS_ctx.selectOption(option);
                        // @ts-ignore
                        [selectOption,];
                    } },
                key: (option.id),
                ...{ class: "px-4 py-2 hover:bg-base-200 cursor-pointer" },
            });
            (option.nombre);
        }
    }
}
if (__VLS_ctx.errorMessage) {
    // @ts-ignore
    [errorMessage,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-error text-sm" },
    });
    (__VLS_ctx.errorMessage);
    // @ts-ignore
    [errorMessage,];
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-error']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['input-error']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-full']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-base-100']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-60']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-base-200']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-error']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=BaseFormSelectFilter.vue.js.map