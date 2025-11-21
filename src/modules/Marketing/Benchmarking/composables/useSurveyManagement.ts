import { computed } from 'vue';
import { useBenchmarkingStore } from '@/store/benchmarking';
import type { Survey, CreateSurveyRequest } from '../types/benchmarkingTypes';

export function useSurveyManagement() {
  const store = useBenchmarkingStore();

  // Computed properties
  const surveys = computed(() => store.surveys);
  const loading = computed(() => store.isLoading);
  const error = computed(() => store.currentError);

  const activeSurveys = computed(() => store.activeSurveys);
  const draftSurveys = computed(() => store.draftSurveys);
  const closedSurveys = computed(() => store.closedSurveys);
  const benchmarkingSurveys = computed(() => store.benchmarkingSurveys);
  const mysterySurveys = computed(() => store.mysterySurveys);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "badge-ghost";
      case "active": return "badge-success";
      case "closed": return "badge-info";
      case "archived": return "badge-warning";
      default: return "badge-outline";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft": return "Borrador";
      case "active": return "Activo";
      case "closed": return "Cerrado";
      case "archived": return "Archivado";
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "benchmarking": return "Benchmarking";
      case "mystery": return "Mystery Shopper";
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "benchmarking": return "badge-primary";
      case "mystery": return "badge-secondary";
      default: return "badge-outline";
    }
  };

  // Survey operations
  const createSurvey = async (data: CreateSurveyRequest) => {
    return await store.createSurvey(data);
  };

  const updateSurvey = async (id: string, data: Partial<Survey>) => {
    return await store.updateSurvey(id, data);
  };

  const deleteSurvey = async (id: string) => {
    return await store.deleteSurvey(id);
  };

  const changeSurveyStatus = async (id: string, status: string) => {
    return await store.changeSurveyStatus(id, status);
  };

  const generatePublicUrl = async (id: string) => {
    return await store.generatePublicUrl(id);
  };

  const shareSurvey = async (survey: Survey) => {
    if (survey.type !== 'benchmarking') {
      throw new Error('Solo los estudios de benchmarking pueden ser compartidos públicamente');
    }
    
    const publicUrl = await generatePublicUrl(survey.id);
    
    // Copy to clipboard
    await navigator.clipboard.writeText(publicUrl);
    return publicUrl;
  };

  const exportResults = async (surveyId: string, format: 'excel' | 'csv' = 'excel') => {
    return await store.exportSurveyResults(surveyId, format);
  };

  // Modal operations
  const openCreateModal = () => {
    store.openCreateStudyModal();
  };

  const openEditModal = (survey: Survey) => {
    store.openEditSurveyModal(survey);
  };

  const closeModals = () => {
    store.closeStudyModal();
  };

  return {
    // State
    surveys,
    loading,
    error,
    activeSurveys,
    draftSurveys,
    closedSurveys,
    benchmarkingSurveys,
    mysterySurveys,

    // Helpers
    getStatusColor,
    getStatusLabel,
    getTypeLabel,
    getTypeColor,

    // Operations
    createSurvey,
    updateSurvey,
    deleteSurvey,
    changeSurveyStatus,
    generatePublicUrl,
    shareSurvey,
    exportResults,

    // Modals
    openCreateModal,
    openEditModal,
    closeModals,
  };
}
