import { ref, watch } from 'vue';
import { useModalStore } from '@sharedstore/modal.store';
import StepNavigation from './StepNavigation.vue';
const props = defineProps();
const modalRef = ref(null);
const modalStore = useModalStore();
watch(() => modalStore.modals[props.modalId]?.status, (isOpen) => {
    const dialog = modalRef.value;
    if (!dialog)
        return;
    if (isOpen && !dialog.open) {
        dialog.showModal();
    }
    else if (!isOpen && dialog.open) {
        dialog.close();
    }
}, { immediate: true });
const close = () => {
    if (props.onClose) {
        props.onClose();
    }
    modalStore.close(props.modalId);
    const dialog = modalRef.value;
    if (dialog?.open)
        dialog.close();
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
/** @type {__VLS_StyleScopedClasses['modern-close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-modal-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-modal-btn']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.dialog, __VLS_intrinsics.dialog)({
    ...{ onClose: (...[$event]) => {
            false;
        } },
    ref: "modalRef",
    ...{ class: "modal sm:modal-middle modern-modal" },
});
/** @type {typeof __VLS_ctx.modalRef} */ ;
// @ts-ignore
[modalRef,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "modal-box overflow-auto scrollbar-hide modern-modal-box" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-modal mb-10 col-span-12 grid grid-cols-12 items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "col-span-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-2xl font-bold text-center col-span-10 modal-title" },
});
(__VLS_ctx.modalStore.modals[props.modalId]?.title);
// @ts-ignore
[modalStore,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "col-span-1 text-right" },
});
if (__VLS_ctx.stepForm) {
    // @ts-ignore
    [stepForm,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.close) },
        ...{ class: "btn btn-sm btn-circle btn-ghost right-2 top-2 modern-close-btn" },
    });
    // @ts-ignore
    [close,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "material-symbols-outlined text-lg" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "content-modal col-span-12" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (props.onSubmit) },
    method: "dialog",
    ...{ class: "space-y-4" },
});
var __VLS_0 = {};
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-modal grid grid-cols-12 justify-end gap-4 mt-10" },
});
if (__VLS_ctx.stepForm) {
    // @ts-ignore
    [stepForm,];
    /** @type {[typeof StepNavigation, ]} */ ;
    // @ts-ignore
    const __VLS_2 = __VLS_asFunctionalComponent(StepNavigation, new StepNavigation({
        ...{ 'onSubmit': {} },
        isSubmitting: (__VLS_ctx.isSubmitting),
    }));
    const __VLS_3 = __VLS_2({
        ...{ 'onSubmit': {} },
        isSubmitting: (__VLS_ctx.isSubmitting),
    }, ...__VLS_functionalComponentArgsRest(__VLS_2));
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = ({ submit: {} },
        { onSubmit: (__VLS_ctx.onSubmit) });
    // @ts-ignore
    [isSubmitting, onSubmit,];
    var __VLS_4;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.close) },
        type: "button",
        ...{ class: "btn col-span-6 modern-modal-btn" },
    });
    // @ts-ignore
    [close,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        type: "submit",
        ...{ class: "btn btn-primary col-span-6 modern-modal-btn modern-submit-btn" },
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
    }
}
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:modal-middle']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-modal']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-box']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['scrollbar-hide']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-modal-box']} */ ;
/** @type {__VLS_StyleScopedClasses['header-modal']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-10']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-title']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
/** @type {__VLS_StyleScopedClasses['right-2']} */ ;
/** @type {__VLS_StyleScopedClasses['top-2']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['content-modal']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-modal']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-modal-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-modal-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['modern-submit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=BaseModal.vue.js.map