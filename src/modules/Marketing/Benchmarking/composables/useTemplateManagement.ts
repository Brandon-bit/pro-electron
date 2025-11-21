import { ref, computed } from 'vue';
import { useBenchmarkingStore } from '@/store/benchmarking';
import type { Template, CreateTemplateRequest } from '../types/benchmarkingTypes';

export function useTemplateManagement() {
  const store = useBenchmarkingStore();
  
  // Local state for filtering
  const searchTerm = ref('');

  // Computed properties
  const templates = computed(() => store.templates);
  const loading = computed(() => store.isLoading);
  const error = computed(() => store.currentError);

  const publicTemplates = computed(() => store.publicTemplates);
  const privateTemplates = computed(() => store.privateTemplates);

  // Filtered templates
  const filteredTemplates = computed(() => {
    if (!searchTerm.value) {
      return templates.value;
    }
    const lowerSearch = searchTerm.value.toLowerCase();
    return templates.value.filter(t =>
      t.name.toLowerCase().includes(lowerSearch) ||
      t.description.toLowerCase().includes(lowerSearch)
    );
  });

  // Template operations
  const createTemplate = async (data: CreateTemplateRequest) => {
    return await store.createTemplate(data);
  };

  const updateTemplate = async (id: string, data: Partial<Template>) => {
    return await store.updateTemplate(id, data);
  };

  const deleteTemplate = async (id: string) => {
    return await store.deleteTemplate(id);
  };

  const fetchPublicTemplates = async () => {
    return await store.fetchPublicTemplates();
  };

  // Modal operations
  const openCreateModal = () => {
    store.openCreateTemplateModal();
  };

  const openEditModal = (template: Template) => {
    store.openEditTemplateModal(template);
  };

  const closeModals = () => {
    store.closeTemplateModal();
  };

  return {
    // State
    templates,
    loading,
    error,
    searchTerm,
    publicTemplates,
    privateTemplates,
    filteredTemplates,

    // Operations
    createTemplate,
    updateTemplate,
    deleteTemplate,
    fetchPublicTemplates,

    // Modals
    openCreateModal,
    openEditModal,
    closeModals,
  };
}
