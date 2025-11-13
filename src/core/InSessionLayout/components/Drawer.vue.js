import { inject } from 'vue';
import logotipo from '@/assets/images/logotipo.png';
import { ref } from 'vue';
const showSidebar = inject('showSidebar');
const modulos = inject('modulos');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "drawer" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    id: "my-drawer",
    type: "checkbox",
    ...{ class: "drawer-toggle" },
});
(__VLS_ctx.showSidebar);
// @ts-ignore
[showSidebar,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "drawer-side" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "my-drawer",
    'aria-label': "close sidebar",
    ...{ class: "drawer-overlay" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "menu bg-[var(--black)] text-white justify-between min-h-full w-70 max-w-[80vw] z-50" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between mx-4 my-7" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    to: "/",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    to: "/",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (() => (__VLS_ctx.showSidebar = false)) });
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[showSidebar,];
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    src: (__VLS_ctx.logotipo),
    alt: "Logo",
    ...{ class: "h-auto" },
});
// @ts-ignore
[logotipo,];
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-1 overflow-y-auto" },
});
const __VLS_8 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    to: "/",
    ...{ class: "flex items-center gap-2 m-4" },
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    to: "/",
    ...{ class: "flex items-center gap-2 m-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
const __VLS_14 = ({ click: {} },
    { onClick: (() => (__VLS_ctx.showSidebar = false)) });
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[showSidebar,];
__VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
    ...{ class: "fas fa-fw fa-tachometer-alt" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "oxygen-bold" },
});
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsics.hr)({
    ...{ class: "m-4 opacity-30" },
});
for (const [m] of __VLS_getVForSourceType((__VLS_ctx.modulos))) {
    // @ts-ignore
    [modulos,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-white mb-6" },
    });
    if (m.name != '') {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center gap-2 opacity-50 text-xs px-4" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "material-symbols-outlined text-white" },
            ...{ style: {} },
        });
        (m.icon);
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (m.name.toUpperCase());
    }
    for (const [s, ix] of __VLS_getVForSourceType((m.sections))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            tabindex: (ix),
            ...{ class: "collapse collapse-arrow" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.input)({
            type: "checkbox",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (() => (s.open = !s.open)) },
            ...{ class: "collapse-title font-semibold pb-0" },
        });
        (s.name);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "collapse-content text-sm [input:checked_~_&]:mt-2 bg-gray-200/10 mx-4 rounded p-0" },
            ...{ style: {} },
        });
        for (const [v] of __VLS_getVForSourceType((s.views))) {
            const __VLS_16 = {}.RouterLink;
            /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
            // @ts-ignore
            RouterLink;
            // @ts-ignore
            const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
                ...{ 'onClick': {} },
                to: (v.url),
            }));
            const __VLS_18 = __VLS_17({
                ...{ 'onClick': {} },
                to: (v.url),
            }, ...__VLS_functionalComponentArgsRest(__VLS_17));
            let __VLS_20;
            let __VLS_21;
            const __VLS_22 = ({ click: {} },
                { onClick: (() => (__VLS_ctx.showSidebar = false)) });
            const { default: __VLS_23 } = __VLS_19.slots;
            // @ts-ignore
            [showSidebar,];
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "m-2 p-1 rounded hover:bg-gray-200/50" },
            });
            (v.name);
            var __VLS_19;
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.hr)({
        ...{ class: "m-4 opacity-30" },
    });
}
/** @type {__VLS_StyleScopedClasses['drawer']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-side']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--black)]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-70']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[80vw]']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-4']} */ ;
/** @type {__VLS_StyleScopedClasses['my-7']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['m-4']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-fw']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-tachometer-alt']} */ ;
/** @type {__VLS_StyleScopedClasses['oxygen-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['m-4']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-30']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['collapse']} */ ;
/** @type {__VLS_StyleScopedClasses['collapse-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['collapse-title']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['collapse-content']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['[input:checked_~_&]:mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-200/10']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0']} */ ;
/** @type {__VLS_StyleScopedClasses['m-2']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-200/50']} */ ;
/** @type {__VLS_StyleScopedClasses['m-4']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-30']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Drawer.vue.js.map