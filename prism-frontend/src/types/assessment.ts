
export interface ResultData {
  stressLevel: 'Low' | 'Moderate' | 'High';
  stressScore: number;
  stressDescription: string;
  personalityType: string;
  personalityDescription: string;
  confidence: number;
  copingStrategies: {
    title: string;
    description: string;
  }[];
  recommendations: string[];
}

export interface AnalysisInput {
  [questionId: number]: number;
}
