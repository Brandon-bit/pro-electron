import { useVueTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, FlexRender } from '@tanstack/vue-table';
import { ref, computed, defineProps, watch, onMounted } from 'vue';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
//import axiosApiInstance from '@/api/axiosApiInstance'
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue';
const __VLS_export = ((__VLS_props, __VLS_ctx, __VLS_expose, __VLS_setup = (async () => {
    //type DataMapper<T> = (rawData: any) => T;
    const props = withDefaults(defineProps(), {
        pagedTable: true
    });
    // State
    const data = ref([]);
    const loading = ref(true);
    const totalRows = ref(0);
    const globalFilter = ref('');
    const pageSize = ref(5);
    const pageIndex = ref(1);
    const table = useVueTable({
        data: data,
        columns: props.headers,
        state: {
            get globalFilter() {
                return globalFilter.value;
            }
        },
        onGlobalFilterChange: (val) => {
            globalFilter.value = val ?? '';
        },
        globalFilterFn: 'includesString',
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: pageIndex.value,
                pageSize: pageSize.value
            }
        },
        manualPagination: true
    });
    const from = computed(() => data.value.length > 0 ? (pageIndex.value - 1) * pageSize.value + 1 : 0);
    const to = computed(() => Math.min(pageIndex.value * pageSize.value, totalRows.value));
    const fetchData = async () => {
        loading.value = true;
        try {
            const { items, total } = await props.fetchCallback(pageIndex.value, pageSize.value);
            data.value = items;
            totalRows.value = total;
        }
        catch (error) {
            //TODO: Cambiar por toastify
            console.error('Error fetching data:', error);
        }
        finally {
            loading.value = false;
        }
    };
    // Watchers to trigger data fetching
    watch([pageIndex, pageSize, globalFilter], () => {
        fetchData();
    });
    onMounted(() => {
        fetchData();
    });
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data.value);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        XLSX.writeFile(wb, 'data.xlsx');
    };
    const exportToPDF = () => {
        // const doc = new jsPDF("p", "pt"); // horizontal
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm'
        });
        const headers = props.headers.map((col) => {
            if (col.header != 'Acciones') {
                return col.header;
            }
        });
        const tableData = data.value.map((row) => {
            return props.headers.map((col) => {
                const value = row[col.accessorKey];
                return value !== undefined && value !== null ? value.toString() : '';
            });
        });
        autoTable(doc, {
            head: [headers],
            body: tableData,
            styles: {
                fontSize: 10,
                cellPadding: 6,
                overflow: 'linebreak'
            },
            headStyles: {
                fillColor: [51, 102, 153],
                textColor: 255,
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240]
            },
            margin: { top: 20 }
            // showHead: 'firstPage'
        });
        doc.save('data.pdf');
    };
    const __VLS_exposed = {
        fetchData
    };
    defineExpose(__VLS_exposed);
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_defaults = {
        pagedTable: true
    };
    const __VLS_ctx = {
        ...{},
        ...{},
        ...{},
        ...{},
    };
    let __VLS_components;
    let __VLS_directives;
    /** @type {__VLS_StyleScopedClasses['dropdown-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['export-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-select']} */ ;
    /** @type {__VLS_StyleScopedClasses['search-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['export-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['export-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['export-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-dropdown']} */ ;
    /** @type {__VLS_StyleScopedClasses['dropdown-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['dropdown-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-select']} */ ;
    /** @type {__VLS_StyleScopedClasses['search-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-select']} */ ;
    /** @type {__VLS_StyleScopedClasses['search-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['search-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-container']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-info']} */ ;
    /** @type {__VLS_StyleScopedClasses['page-number']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-th']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-td']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-container']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col md:flex-row md:items-center gap-5 table-controls" },
    });
    if (__VLS_ctx.pagedTable) {
        // @ts-ignore
        [pagedTable,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ class: "btn btn-sm export-btn" },
            popovertarget: "popover-exportar",
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "material-symbols-outlined" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
            ...{ class: "dropdown menu w-52 rounded-box bg-base-100 table-dropdown" },
            popover: true,
            id: "popover-exportar",
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onClick: (__VLS_ctx.exportToPDF) },
            ...{ class: "dropdown-item" },
        });
        // @ts-ignore
        [exportToPDF,];
        __VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "material-symbols-outlined" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onClick: (__VLS_ctx.exportToExcel) },
            ...{ class: "dropdown-item" },
        });
        // @ts-ignore
        [exportToExcel,];
        __VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "material-symbols-outlined" },
        });
    }
    if (__VLS_ctx.pagedTable) {
        // @ts-ignore
        [pagedTable,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-span-12 md:col-span-5 md:mb-0 justify-center w-full" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center page-size-selector" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.select, __VLS_intrinsics.select)({
            ...{ onChange: ((e) => {
                    __VLS_ctx.pageIndex = 1;
                    __VLS_ctx.pageSize = Number(e.target.value);
                }) },
            ...{ class: "select mx-2 w-full max-w-[70px] table-select" },
        });
        // @ts-ignore
        [pageIndex, pageSize,];
        for (const [number, index] of __VLS_getVForSourceType(([5, 10, 20, 100]))) {
            __VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
                key: (index),
                value: (number),
            });
            (number);
        }
    }
    if (__VLS_ctx.pagedTable) {
        // @ts-ignore
        [pagedTable,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-span-12 md:col-span-4 w-full" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center lg:justify-end" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "mb-0 me-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.input)({
            placeholder: "Ingresar texto...",
            ...{ class: "input min-w-0 search-input" },
        });
        (__VLS_ctx.globalFilter);
        // @ts-ignore
        [globalFilter,];
    }
    if (__VLS_ctx.loading) {
        // @ts-ignore
        [loading,];
        /** @type {[typeof BaseSkeletonTable, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(BaseSkeletonTable, new BaseSkeletonTable({}));
        const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "table-container" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "overflow-x-auto" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.table, __VLS_intrinsics.table)({
            ...{ class: "table text-center data-table" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.thead, __VLS_intrinsics.thead)({});
        for (const [headerGroup] of __VLS_getVForSourceType((__VLS_ctx.table.getHeaderGroups()))) {
            // @ts-ignore
            [table,];
            __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
                key: (headerGroup.id),
                ...{ class: "table-header" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.th, __VLS_intrinsics.th)({
                ...{ class: "table-th" },
            });
            for (const [header] of __VLS_getVForSourceType((headerGroup.headers))) {
                __VLS_asFunctionalElement(__VLS_intrinsics.th, __VLS_intrinsics.th)({
                    key: (header.id),
                    colSpan: (header.colSpan),
                    ...{ class: "table-th font-bold !text-black" },
                });
                if (!header.isPlaceholder) {
                    const __VLS_4 = {}.FlexRender;
                    /** @type {[typeof __VLS_components.FlexRender, ]} */ ;
                    // @ts-ignore
                    FlexRender;
                    // @ts-ignore
                    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
                        render: (header.column.columnDef.header),
                        props: (header.getContext()),
                    }));
                    const __VLS_6 = __VLS_5({
                        render: (header.column.columnDef.header),
                        props: (header.getContext()),
                    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
                }
            }
        }
        __VLS_asFunctionalElement(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
        if (__VLS_ctx.data.length > 0) {
            // @ts-ignore
            [data,];
            for (const [row, ix] of __VLS_getVForSourceType((__VLS_ctx.table.getRowModel().rows))) {
                // @ts-ignore
                [table,];
                __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
                    key: (row.id),
                    ...{ class: "table-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({
                    ...{ class: "table-td" },
                });
                (ix + 1 + (__VLS_ctx.pageIndex - 1) * __VLS_ctx.pageSize);
                // @ts-ignore
                [pageIndex, pageSize,];
                for (const [cell] of __VLS_getVForSourceType((row.getVisibleCells()))) {
                    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({
                        key: (cell.id),
                        ...{ class: "table-td" },
                    });
                    const __VLS_9 = {}.FlexRender;
                    /** @type {[typeof __VLS_components.FlexRender, ]} */ ;
                    // @ts-ignore
                    FlexRender;
                    // @ts-ignore
                    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
                        render: (cell.column.columnDef.cell),
                        props: (cell.getContext()),
                    }));
                    const __VLS_11 = __VLS_10({
                        render: (cell.column.columnDef.cell),
                        props: (cell.getContext()),
                    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
                }
            }
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({});
            __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({
                colspan: (__VLS_ctx.table.getAllColumns().length + 1),
                ...{ class: "text-center py-8 empty-state" },
            });
            // @ts-ignore
            [table,];
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "material-symbols-outlined text-4xl opacity-30 mb-2" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "text-base-content/60" },
            });
        }
    }
    if (__VLS_ctx.pagedTable) {
        // @ts-ignore
        [pagedTable,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "grid grid-cols-12 gap-3 items-center w-full table-pagination" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-span-12 md:col-span-5 flex items-center justify-center md:justify-start" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "pagination-info" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (__VLS_ctx.from);
        // @ts-ignore
        [from,];
        __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (__VLS_ctx.to);
        // @ts-ignore
        [to,];
        __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (__VLS_ctx.totalRows);
        // @ts-ignore
        [totalRows,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-span-12 md:col-span-7 flex flex-col md:flex-row items-center justify-center md:justify-end gap-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "join pagination-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (() => (__VLS_ctx.pageIndex = 1)) },
            ...{ class: "btn join-item pagination-btn" },
            disabled: (__VLS_ctx.pageIndex == 1 || __VLS_ctx.loading),
        });
        // @ts-ignore
        [pageIndex, pageIndex, loading,];
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (() => __VLS_ctx.pageIndex--) },
            ...{ class: "btn join-item pagination-btn" },
            disabled: (__VLS_ctx.pageIndex - 1 == 0 || __VLS_ctx.loading),
        });
        // @ts-ignore
        [pageIndex, pageIndex, loading,];
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            className: "text-center md:text-left page-indicator",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
            ...{ class: "page-number" },
        });
        (__VLS_ctx.pageIndex);
        (Math.ceil(__VLS_ctx.totalRows / __VLS_ctx.pageSize));
        // @ts-ignore
        [pageIndex, pageSize, totalRows,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "join pagination-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (() => __VLS_ctx.pageIndex++) },
            ...{ class: "btn join-item pagination-btn" },
            disabled: (__VLS_ctx.pageIndex == Math.ceil(__VLS_ctx.totalRows / __VLS_ctx.pageSize) || __VLS_ctx.loading),
        });
        // @ts-ignore
        [pageIndex, pageIndex, pageSize, loading, totalRows,];
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (() => (__VLS_ctx.pageIndex = Math.ceil(__VLS_ctx.totalRows / __VLS_ctx.pageSize))) },
            ...{ class: "btn join-item pagination-btn" },
            disabled: (__VLS_ctx.pageIndex == Math.ceil(__VLS_ctx.totalRows / __VLS_ctx.pageSize) || __VLS_ctx.loading),
        });
        // @ts-ignore
        [pageIndex, pageIndex, pageSize, pageSize, loading, totalRows, totalRows,];
    }
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-controls']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['export-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    /** @type {__VLS_StyleScopedClasses['dropdown']} */ ;
    /** @type {__VLS_StyleScopedClasses['menu']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-52']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-box']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-base-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-dropdown']} */ ;
    /** @type {__VLS_StyleScopedClasses['dropdown-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    /** @type {__VLS_StyleScopedClasses['dropdown-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    /** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:col-span-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:mb-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['page-size-selector']} */ ;
    /** @type {__VLS_StyleScopedClasses['select']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-[70px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-select']} */ ;
    /** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:col-span-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['me-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['input']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['search-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-container']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['table']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['data-table']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-header']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-th']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-th']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['!text-black']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-td']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-td']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-30']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-base-content/60']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-pagination']} */ ;
    /** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:col-span-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:justify-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-info']} */ ;
    /** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:col-span-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['join']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-group']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['join-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['join-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['page-number']} */ ;
    /** @type {__VLS_StyleScopedClasses['join']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-group']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['join-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['join-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
    return {};
})()) => ({}));
export default {};
//# sourceMappingURL=BaseTable.vue.js.map