import 'v-calendar/style.css';
import { Calendar as VCalendar } from 'v-calendar';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
const props = defineProps();
const emit = defineEmits(['update:modelValue']);
const handleDateUpdate = (val) => {
    if (val) {
        emit('update:modelValue', val);
    }
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
const __VLS_0 = {}.VCalendar;
/** @type {[typeof __VLS_components.VCalendar, typeof __VLS_components.VCalendar, ]} */ ;
// @ts-ignore
VCalendar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (props.modelValue),
    mode: "single",
    isDark: (false),
    expanded: true,
    borderless: true,
    attributes: ([{ key: 'today', dot: true, dates: [new Date()] }]),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (props.modelValue),
    mode: "single",
    isDark: (false),
    expanded: true,
    borderless: true,
    attributes: ([{ key: 'today', dot: true, dates: [new Date()] }]),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (__VLS_ctx.handleDateUpdate) });
var __VLS_7 = {};
const { default: __VLS_8 } = __VLS_3.slots;
// @ts-ignore
[handleDateUpdate,];
{
    const { 'header-left-button': __VLS_9 } = __VLS_3.slots;
    const __VLS_10 = {}.ChevronLeft;
    /** @type {[typeof __VLS_components.ChevronLeft, ]} */ ;
    // @ts-ignore
    ChevronLeft;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        ...{ class: "h-6 w-6 cursor-pointer" },
    }));
    const __VLS_12 = __VLS_11({
        ...{ class: "h-6 w-6 cursor-pointer" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
{
    const { 'header-right-button': __VLS_15 } = __VLS_3.slots;
    const __VLS_16 = {}.ChevronRight;
    /** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
    // @ts-ignore
    ChevronRight;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ class: "h-6 w-6 cursor-pointer" },
    }));
    const __VLS_18 = __VLS_17({
        ...{ class: "h-6 w-6 cursor-pointer" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=BaseCalendar.vue.js.map