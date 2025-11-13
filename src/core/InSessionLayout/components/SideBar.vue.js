import logotipo from '@/assets/images/logotipo.png';
import isotipo from '@/assets/icons/favicon.ico';
import { ref, inject, nextTick, onMounted } from 'vue';
import useInSessionStore from '@/core/InSessionLayout/store/inSessionStore';
const inSessionStore = useInSessionStore();
//const modulos = inject('modulos')
const isSmallScreen = inject('isSmallScreen');
const showSidebar = inject('showSidebar');
const showLogo = inject('showLogo');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex text-white flex-col justify-between h-screen" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (['flex items-center justify-between mx-4', !__VLS_ctx.showSidebar ? 'mb-2 mt-7' : 'my-7']) },
});
// @ts-ignore
[showSidebar,];
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/",
}));
const __VLS_2 = __VLS_1({
    to: "/",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    src: (__VLS_ctx.logotipo),
    alt: "Logo",
    ...{ class: "h-auto" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showSidebar && __VLS_ctx.showLogo) }, null, null);
// @ts-ignore
[showSidebar, logotipo, showLogo,];
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    src: (__VLS_ctx.isotipo),
    alt: "Logo",
    ...{ class: "h-auto mobile-image-brand" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.showSidebar && __VLS_ctx.showLogo) }, null, null);
// @ts-ignore
[showSidebar, showLogo, isotipo,];
var __VLS_3;
if (__VLS_ctx.showSidebar) {
    // @ts-ignore
    [showSidebar,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 overflow-y-auto" },
    });
    const __VLS_5 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        to: "/",
        ...{ class: "flex items-center gap-2 m-4" },
    }));
    const __VLS_7 = __VLS_6({
        to: "/",
        ...{ class: "flex items-center gap-2 m-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const { default: __VLS_9 } = __VLS_8.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: "fas fa-fw fa-tachometer-alt" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "oxygen-bold" },
    });
    var __VLS_8;
    __VLS_asFunctionalElement(__VLS_intrinsics.hr)({
        ...{ class: "m-4 opacity-30" },
    });
    for (const [m] of __VLS_getVForSourceType((__VLS_ctx.inSessionStore.modules))) {
        // @ts-ignore
        [inSessionStore,];
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
                const __VLS_10 = {}.RouterLink;
                /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
                // @ts-ignore
                RouterLink;
                // @ts-ignore
                const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
                    to: (v.url),
                }));
                const __VLS_12 = __VLS_11({
                    to: (v.url),
                }, ...__VLS_functionalComponentArgsRest(__VLS_11));
                const { default: __VLS_14 } = __VLS_13.slots;
                __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                    ...{ class: "m-2 p-1 rounded hover:bg-gray-200/50" },
                });
                (v.name);
                var __VLS_13;
            }
        }
        __VLS_asFunctionalElement(__VLS_intrinsics.hr)({
            ...{ class: "m-4 opacity-30" },
        });
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 overflow-y-auto" },
    });
    const __VLS_15 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        to: "/",
        ...{ class: "flex justify-center items-center gap-2 m-4" },
    }));
    const __VLS_17 = __VLS_16({
        to: "/",
        ...{ class: "flex justify-center items-center gap-2 m-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_19 } = __VLS_18.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        role: "button",
        ...{ class: "btn hover:bg-gray-200/10 btn-ghost btn-sm p-2" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: { right: true, }, value: ('Dashboard') }, null, null);
    // @ts-ignore
    [vTooltip,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "material-symbols-outlined text-white" },
        ...{ style: {} },
    });
    var __VLS_18;
    for (const [m, ix] of __VLS_getVForSourceType((__VLS_ctx.inSessionStore.modules))) {
        // @ts-ignore
        [inSessionStore,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-white mb-6 flex items-center justify-center" },
        });
        if (m.name != '') {
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ class: "btn hover:bg-gray-200/10 btn-ghost btn-sm p-2" },
                popovertarget: (`popover-${ix}`),
                ...{ style: ({ 'anchor-name': `--anchor-${ix}` }) },
            });
            __VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: { right: true, }, value: (m.name) }, null, null);
            // @ts-ignore
            [vTooltip,];
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "material-symbols-outlined text-white" },
                ...{ style: {} },
            });
            (m.icon);
            __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
                ...{ class: "dropdown dropdown-right dropdown-center ml-3 menu rounded-box bg-[var(--black)] shadow-sm" },
                popover: true,
                id: (`popover-${ix}`),
                ...{ style: ({ positionAnchor: `--anchor-${ix}` }) },
            });
            for (const [s, jx] of __VLS_getVForSourceType((m.sections))) {
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
                __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                    ...{ class: "hover:bg-gray-200/10 rounded cursor-pointer btn-sm p-2" },
                    popovertarget: (`popover-${ix}-${jx}`),
                    ...{ style: ({ 'anchor-name': `--anchor-${ix}-${jx}` }) },
                });
                (s.name);
                __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
                    ...{ class: "dropdown dropdown-right dropdown-start menu rounded-box bg-[var(--gray)] shadow-sm ml-3" },
                    popover: true,
                    id: (`popover-${ix}-${jx}`),
                    ...{ style: ({ positionAnchor: `--anchor-${ix}-${jx}` }) },
                });
                for (const [v] of __VLS_getVForSourceType((s.views))) {
                    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                        ...{ class: "hover:bg-gray-200/10 rounded cursor-pointer" },
                    });
                    const __VLS_20 = {}.RouterLink;
                    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
                    // @ts-ignore
                    RouterLink;
                    // @ts-ignore
                    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
                        to: (v.url),
                    }));
                    const __VLS_22 = __VLS_21({
                        to: (v.url),
                    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                    const { default: __VLS_24 } = __VLS_23.slots;
                    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                        ...{ class: "p-1" },
                    });
                    (v.name);
                    var __VLS_23;
                }
            }
        }
    }
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-image-brand']} */ ;
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
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['m-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-200/10']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-200/10']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-right']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-box']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--black)]']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-200/10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-right']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-start']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-box']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--gray)]']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-200/10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=SideBar.vue.js.map