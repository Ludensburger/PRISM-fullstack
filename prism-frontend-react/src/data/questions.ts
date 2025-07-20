
export interface QuizQuestion {
  id: number;
  text: string;
  category: 'stress' | 'personality' | 'demographic' | 'coping';
  options: {
    text: string;
    value: string | number;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: 'Been upset because of something that happened unexpectedly?',
    category: 'stress',
    options: [
      { text: 'Never', value: 0 },
      { text: 'Almost never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Fairly often', value: 3 },
      { text: 'Very often', value: 4 }
    ]
  },
  {
    id: 2,
    text: 'Felt that you were unable to control the important things in your life?',
    category: 'stress',
    options: [
      { text: 'Never', value: 0 },
      { text: 'Almost never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Fairly often', value: 3 },
      { text: 'Very often', value: 4 }
    ]
  },
  {
    id: 3,
    text: 'Felt nervous and "stressed"?',
    category: 'stress',
    options: [
      { text: 'Never', value: 0 },
      { text: 'Almost never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Fairly often', value: 3 },
      { text: 'Very often', value: 4 }
    ]
  },
  {
    id: 4,
    text: 'Felt difficulties were piling up so high that you could not overcome them?',
    category: 'stress',
    options: [
      { text: 'Never', value: 0 },
      { text: 'Almost never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Fairly often', value: 3 },
      { text: 'Very often', value: 4 }
    ]
  },
  {
    id: 5,
    text: 'About how often did you feel tired out for no good reason?',
    category: 'stress',
    options: [
      { text: 'Never', value: 0 },
      { text: 'Almost never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Fairly often', value: 3 },
      { text: 'Very often', value: 4 }
    ]
  },
  {
    id: 6,
    text: 'About how often did you feel so nervous that nothing could calm you down?',
    category: 'stress',
    options: [
      { text: 'Never', value: 0 },
      { text: 'Almost never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Fairly often', value: 3 },
      { text: 'Very often', value: 4 }
    ]
  },
  {
    id: 7,
    text: 'About how often did you feel hopeless?',
    category: 'stress',
    options: [
      { text: 'Never', value: 0 },
      { text: 'Almost never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Fairly often', value: 3 },
      { text: 'Very often', value: 4 }
    ]
  },
  {
    id: 8,
    text: 'About how often did you feel restless or fidgety?',
    category: 'stress',
    options: [
      { text: 'Never', value: 0 },
      { text: 'Almost never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Fairly often', value: 3 },
      { text: 'Very often', value: 4 }
    ]
  },
  {
    id: 9,
    text: 'About how often did you feel that everything was an effort? ',
    category: 'stress',
    options: [
      { text: 'Never', value: 0 },
      { text: 'Almost never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Fairly often', value: 3 },
      { text: 'Very often', value: 4 }
    ]
  },
  {
    id: 10,
    text: 'About how often did you feel worthless? ',
    category: 'stress',
    options: [
      { text: 'Never', value: 0 },
      { text: 'Almost never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Fairly often', value: 3 },
      { text: 'Very often', value: 4 }
    ]
  }
];
