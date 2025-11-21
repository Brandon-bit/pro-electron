import type { Survey, Template, Execution, PublicResponse, Question, AggregatedResult } from '../types/benchmarkingTypes';

export const useResults = () => {
  const calculateAggregatedResults = (
    surveyId: string | null,
    surveys: Survey[],
    templates: Template[],
    executions: Execution[] | PublicResponse[]
  ): AggregatedResult[] | null => {
    if (!surveyId) return null;

    const survey = surveys.find(s => s.id === surveyId);
    const template = templates.find(t => t.id === survey?.templateId);
    
    // Filtrar respuestas válidas (ejecutadas completadas o respuestas públicas)
    const surveyExecutions = executions.filter(e => {
      // Type guard para Execution
      if ('status' in e) {
        return e.status === "completed";
      }
      // Type guard para PublicResponse
      if ('type' in e) {
        return e.type === "public";
      }
      return false;
    });

    if (!template || !survey || surveyExecutions.length === 0) return null;

    return template.questions.map((question: Question) => {
      const responsesWithCommenter = surveyExecutions
        .map(e => ({
            commenter: ('assignedTo' in e ? e.assignedTo : null) || 'Anónimo', // Get the commenter name
            response: e.responses?.[question.id]
        }))
        .filter(r => r.response !== undefined && r.response !== null && String(r.response).trim() !== ''); // Filter out empty comments

      if (responsesWithCommenter.length === 0) {
        return { question, data: [] };
      }

      if (question.type === "multiple" || question.type === "dropdown" || question.type === "short" ) {
        const counts: Record<string, number> = {};
        responsesWithCommenter.forEach(r => {
          const key = String(r.response);
          counts[key] = (counts[key] || 0) + 1;
        });
        return {
          question: { ...question, chartType: "pie" }, // Asigna "pie"
          data: Object.entries(counts).map(([name, value]) => ({ name, value })),
        };
      } else if (question.type === "scale" || question.type === "stars") {
        const numericResponses = responsesWithCommenter.map(r => Number(r.response)).filter(n => !isNaN(n));
        if (numericResponses.length === 0) {
           return { question, data: [], average: 0 };
        }
        const counts: Record<number, number> = {};
        numericResponses.forEach(r => {
          counts[r] = (counts[r] || 0) + 1;
        });
        const sum = numericResponses.reduce((acc, r) => acc + r, 0);
        const average = sum / numericResponses.length;
        return {
          question: { ...question, chartType: "bar" },
          data: Object.entries(counts).map(([name, value]) => ({
            name: name.toString(),
            value
          })).sort((a, b) => Number(a.name) - Number(b.name)),
          average: average,
        };
      }else if (question.type === "long" || question.chartType === "table") { // ¡CORRECCIÓN! Quitamos "short" de aquí
              const questionWithChartType = {
                ...question,
                chartType: "table"
              };
              return {
                question: questionWithChartType,
                data: responsesWithCommenter.map(r => ({ commenter: r.commenter, comment: String(r.response) })),
              };
            } 
        else {
         return { question, data: [] }; // Handle other types if necessary
      }
    });
  };

  return { calculateAggregatedResults };
};