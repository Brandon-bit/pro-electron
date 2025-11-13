import logotipo from '@/assets/images/logotipo.png';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';
import { showNotification } from '@/utils/toastNotifications';
const showPassword = ref(false);
const isSubmitting = ref(false);
const formData = ref({
    email: '',
    password: ''
});
const router = useRouter();
const route = useRoute();
const { login } = useAuthStore();
const handleSubmit = async (e) => {
    e.preventDefault();
    // Validaciones básicas
    if (!formData.value.email || !formData.value.password) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    if (!formData.value.email.includes('@')) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }
    isSubmitting.value = true;
    try {
        const result = await login(formData.value.email, formData.value.password);
        if (result) {
            showNotification('¡Bienvenido de vuelta!', 'success');
            const redirectPath = route.query.redirect || '/';
            router.push(redirectPath);
        }
        else {
            showNotification('Email o contraseña incorrectos', 'error');
        }
    }
    catch {
        showNotification("Error de conexión. Por favor, intenta nuevamente.", 'error');
    }
    finally {
        isSubmitting.value = false;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col md:flex-row justify-center items-center p-10 rounded bg-[#2e2e2e] shadow-sm m-5" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: "logo",
    ...{ class: "mb-10 md:mb-0" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    src: (__VLS_ctx.logotipo),
});
// @ts-ignore
[logotipo,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "divider divider-horizontal divider-primary" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: "form-login",
});
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-center text-2xl md:text-3xl mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
});
// @ts-ignore
[handleSubmit,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.legend, __VLS_intrinsics.legend)({
    ...{ class: "fieldset-legend" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    type: "email",
    ...{ class: "input w-full" },
    placeholder: "usuario@proyectopolis.com",
});
(__VLS_ctx.formData.email);
// @ts-ignore
[formData,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.legend, __VLS_intrinsics.legend)({
    ...{ class: "fieldset-legend" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    type: (__VLS_ctx.showPassword ? 'text' : 'password'),
    ...{ class: "input w-full" },
    placeholder: "••••••••",
});
(__VLS_ctx.formData.password);
// @ts-ignore
[formData, showPassword,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (() => __VLS_ctx.showPassword = !__VLS_ctx.showPassword) },
    type: "button",
    className: "absolute top-2.5 right-3 hover:text-white transition-colors",
});
// @ts-ignore
[showPassword, showPassword,];
if (!__VLS_ctx.showPassword) {
    // @ts-ignore
    [showPassword,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "material-symbols-outlined" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "material-symbols-outlined" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    className: "flex items-center justify-end text-sm mt-4",
});
__VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    ...{ class: "transition-colors hover:opacity-80 text-right" },
    target: "_blank",
    href: "https://proyectopolis.com/account/forgotpassword",
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "submit",
    disabled: (__VLS_ctx.isSubmitting),
    ...{ class: "btn btn-info w-full text-white" },
});
// @ts-ignore
[isSubmitting,];
if (!__VLS_ctx.isSubmitting) {
    // @ts-ignore
    [isSubmitting,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "material-symbols-outlined" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "loading loading-spinner" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    className: "text-sm mt-4",
});
__VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    ...{ class: "transition-colors hover:opacity-80 text-right" },
    target: "_blank",
    href: "https://proyectopolis.com/terminos-condiciones",
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    ...{ class: "transition-colors hover:opacity-80 text-right" },
    target: "_blank",
    href: "https://proyectopolis.com/politicas-de-privacidad",
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#2e2e2e]']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['m-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
/** @type {__VLS_StyleScopedClasses['md:mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['divider']} */ ;
/** @type {__VLS_StyleScopedClasses['divider-horizontal']} */ ;
/** @type {__VLS_StyleScopedClasses['divider-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['fieldset-legend']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['fieldset-legend']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-info']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Login.vue.js.map