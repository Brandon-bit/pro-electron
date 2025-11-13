import { defineStore } from 'pinia';
export const useModalStore = defineStore('modal', {
    state: () => ({
        modals: {}
    }),
    actions: {
        open(modalId, options) {
            this.modals[modalId] = {
                status: true,
                data: options?.data,
                title: options?.title,
                type: options?.type,
                openedAt: Date.now()
            };
        },
        close(modalId) {
            this.modals[modalId].status = false;
        },
        updateModal(modalId, options) {
            if (this.modals[modalId]) {
                this.modals[modalId] = {
                    ...this.modals[modalId],
                    data: options?.data,
                    title: options?.title,
                    type: options?.type
                };
            }
        },
        toggle(modalId) {
            this.modals[modalId].status = !this.modals[modalId].status;
        },
        isOpen(modalId) {
            return !!this.modals[modalId].status;
        },
        closeAll() {
            Object.keys(this.modals).forEach((id) => {
                this.modals[id].status = false;
            });
        }
    }
});
//# sourceMappingURL=modal.store.js.map