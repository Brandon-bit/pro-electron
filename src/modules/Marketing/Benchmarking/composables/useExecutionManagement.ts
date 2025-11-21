import { ref, computed } from 'vue';
import { useBenchmarkingStore } from '@/store/benchmarking';
import type { Execution, CreateExecutionRequest } from '../types/benchmarkingTypes';

export function useExecutionManagement() {
  const store = useBenchmarkingStore();
  
  // Local state
  const selectedSurveyId = ref<string | null>(null);

  // Computed properties
  const executions = computed(() => store.executions);
  const loading = computed(() => store.isLoading);
  const error = computed(() => store.currentError);

  const pendingExecutions = computed(() => store.pendingExecutions);
  const completedExecutions = computed(() => store.completedExecutions);

  // Execution operations
  const createExecution = async (data: CreateExecutionRequest) => {
    return await store.createExecution(data);
  };

  const updateExecution = async (id: string, data: any) => {
    return await store.updateExecution(id, data);
  };

  const deleteExecution = async (id: string) => {
    return await store.deleteExecution(id);
  };

  const completeExecution = async (id: string, responses: Record<string, any>) => {
    return await store.completeExecution(id, responses);
  };

  const fetchExecutionsBySurvey = async (surveyId: string, page: number = 1, pageSize: number = 10) => {
    return await store.fetchExecutionsBySurvey(surveyId, page, pageSize);
  };

  // Helper function for table
  const fetchExecutionsForTable = async (page: number, pageSize: number) => {
    if (!selectedSurveyId.value) {
      return { items: [], total: 0 };
    }
    
    return await fetchExecutionsBySurvey(selectedSurveyId.value, page, pageSize);
  };

  // Create execution with prompt
  const createExecutionWithPrompt = async (surveyId: string) => {
    const assignedTo = prompt('Email o nombre del evaluador:');
    if (!assignedTo) return null;
    
    return await createExecution({
      surveyId,
      accountId: store.selectedBrandId!,
      assignedTo
    });
  };

  // Export results for survey
  const exportSurveyResults = async (surveyId: string, format: 'excel' | 'csv' = 'excel') => {
    return await store.exportSurveyResults(surveyId, format);
  };

  return {
    // State
    executions,
    loading,
    error,
    selectedSurveyId,
    pendingExecutions,
    completedExecutions,

    // Operations
    createExecution,
    updateExecution,
    deleteExecution,
    completeExecution,
    fetchExecutionsBySurvey,
    fetchExecutionsForTable,
    createExecutionWithPrompt,
    exportSurveyResults,
  };
}
