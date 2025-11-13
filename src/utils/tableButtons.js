import { h, withDirectives } from 'vue';
export const editTableButton = (onClick) => {
    return withDirectives(h('div', { class: 'tooltip', 'data-tip': 'Editar' }, [
        h('button', {
            class: 'btn btn-outline btn-primary action-btn-table',
            onClick
        }, [h('span', { class: 'material-symbols-outlined' }, 'edit_square')])
    ]), []);
};
export const deleteTableButton = (onClick) => {
    return withDirectives(h('div', {
        class: 'tooltip',
        'data-tip': 'Eliminar'
    }, [
        h('button', {
            class: 'btn btn-outline btn-error action-btn-table',
            onClick
        }, [h('span', { class: 'material-symbols-outlined' }, 'delete')])
    ]), []);
};
export const detailTableButton = (onClick) => {
    return withDirectives(h('div', { class: 'tooltip', 'data-tip': 'Detalle' }, [
        h('button', {
            class: 'btn btn-outline btn-accent action-btn-table',
            onClick
        }, [h('span', { class: 'material-symbols-outlined' }, 'visibility')])
    ]), []);
};
export const customTableButton = (onClick, tooltipText, icon) => {
    return withDirectives(h('div', { class: 'tooltip', 'data-tip': `${tooltipText}` }, [
        h('button', {
            class: 'btn btn-outline btn-primary action-btn-table',
            onClick
        }, [h('span', { class: 'material-symbols-outlined' }, `${icon}`)])
    ]), []);
};
//# sourceMappingURL=tableButtons.js.map