import { computed } from 'vue';
import { inject } from 'vue';
const currentStep = inject('currentStep');
const stepsConfig = inject('stepsConfig');
const validateField = inject('validateField');
const __VLS_props = defineProps();
const emit = defineEmits(['submit']);
const isLastStep = computed(() => currentStep.value === stepsConfig.length);
const nextStep = async () => {
    const currentFields = stepsConfig[currentStep.value - 1].fields;
    const results = await Promise.all(currentFields.map((field) => validateField(field)));
    if (results.every((r) => r.valid)) {
        if (currentStep.value < stepsConfig.length)
            currentStep.value++;
    }
};
const prevStep = () => {
    if (currentStep.value > 1)
        currentStep.value--;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.prevStep) },
    type: "button",
    ...{ class: "btn col-span-6" },
    disabled: (__VLS_ctx.currentStep === 1),
});
// @ts-ignore
[prevStep, currentStep,];
if (!__VLS_ctx.isLastStep) {
    // @ts-ignore
    [isLastStep,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.nextStep) },
        type: "button",
        ...{ class: "btn btn-primary col-span-6" },
    });
    // @ts-ignore
    [nextStep,];
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.isLastStep))
                    return;
                __VLS_ctx.emit('submit');
                // @ts-ignore
                [emit,];
            } },
        type: "submit",
        disabled: (__VLS_ctx.isSubmitting),
        ...{ class: "btn btn-primary col-span-6" },
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
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=StepNavigation.vue.js.map