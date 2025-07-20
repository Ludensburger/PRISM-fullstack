
import { ResultData, AnalysisInput } from '@/types/assessment';

export function analyzeResults(answers: AnalysisInput): ResultData {
  // Calculate stress score (questions 1-5, based on PSS-10)
  const stressQuestions = [1, 2, 3, 4, 5];
  const stressSum = stressQuestions.reduce((sum, questionId) => {
    return sum + (answers[questionId] || 0);
  }, 0);
  
  const stressScore = Math.round((stressSum / 20) * 100); // Convert to percentage
  
  let stressLevel: 'Low' | 'Moderate' | 'High';
  let stressDescription: string;
  
  if (stressScore <= 40) {
    stressLevel = 'Low';
    stressDescription = "Your stress levels appear to be well-managed. You demonstrate good resilience and coping mechanisms. Continue maintaining your current healthy habits and stress management techniques.";
  } else if (stressScore <= 70) {
    stressLevel = 'Moderate';
    stressDescription = "You're experiencing moderate stress levels. While manageable, there's room for improvement in your stress management strategies. Consider implementing additional coping techniques to enhance your well-being.";
  } else {
    stressLevel = 'High';
    stressDescription = "Your assessment indicates elevated stress levels that may be impacting your daily life. It's important to prioritize stress management and consider seeking support from friends, family, or professionals.";
  }

  // Analyze personality tendencies (questions 6-10)
  const personalityQuestions = [6, 7, 8, 9, 10];
  const personalitySum = personalityQuestions.reduce((sum, questionId) => {
    return sum + (answers[questionId] || 0);
  }, 0);
  
  const introversionScore = personalitySum / personalityQuestions.length;
  
  let personalityType: string;
  let personalityDescription: string;
  
  if (introversionScore >= 3) {
    personalityType = "Introverted-Leaning";
    personalityDescription = "You tend to be more introverted, preferring solitude for recharging and deeper thinking. You may be more sensitive to stress and benefit from quiet, structured environments for optimal performance.";
  } else if (introversionScore >= 1.5) {
    personalityType = "Ambivert";
    personalityDescription = "You display balanced traits between introversion and extroversion. You can adapt to various social situations but may need to be mindful of your energy levels and stress triggers in different environments.";
  } else {
    personalityType = "Extroverted-Leaning";
    personalityDescription = "You tend to be more extroverted, gaining energy from social interactions. You may handle some types of stress well through social support but should be aware of overstimulation and burnout.";
  }

  // Generate coping strategies based on results
  const copingStrategies = generateCopingStrategies(stressLevel, personalityType, answers);
  
  // Calculate confidence level (mock ML confidence)
  const confidence = Math.round(75 + Math.random() * 20); // 75-95% range
  
  return {
    stressLevel,
    stressScore,
    stressDescription,
    personalityType,
    personalityDescription,
    confidence,
    copingStrategies,
    recommendations: []
  };
}

function generateCopingStrategies(
  stressLevel: string,
  personalityType: string,
  answers: AnalysisInput
): { title: string; description: string }[] {
  const strategies = [];
  
  // Base strategies for stress level
  if (stressLevel === 'High') {
    strategies.push({
      title: "Immediate Stress Relief",
      description: "Practice deep breathing exercises, take regular breaks, and consider speaking with a counselor or therapist for professional support."
    });
  }
  
  if (stressLevel === 'Moderate' || stressLevel === 'High') {
    strategies.push({
      title: "Daily Stress Management",
      description: "Establish a consistent daily routine, prioritize tasks, and set realistic goals. Regular sleep schedule and time management can significantly reduce stress."
    });
  }
  
  // Personality-based strategies
  if (personalityType.includes('Introverted')) {
    strategies.push({
      title: "Quiet Restoration",
      description: "Schedule regular alone time for recharging. Create a peaceful environment at home, and use solitary activities like reading, journaling, or meditation to manage stress."
    });
    
    strategies.push({
      title: "Structured Social Support",
      description: "Build a small, trusted network of close friends or family members you can talk to. Consider one-on-one conversations rather than group discussions when seeking support."
    });
  } else if (personalityType.includes('Extroverted')) {
    strategies.push({
      title: "Social Connection",
      description: "Leverage your social network for support. Engage in group activities, team sports, or social hobbies that energize you while providing stress relief."
    });
    
    strategies.push({
      title: "Active Stress Relief",
      description: "Channel stress through physical and social activities. Consider group fitness classes, team projects, or collaborative problem-solving approaches."
    });
  } else {
    strategies.push({
      title: "Flexible Coping",
      description: "Alternate between social and solitary stress relief methods based on your current needs. Pay attention to what works best in different situations."
    });
  }
  
  // Universal strategies
  strategies.push({
    title: "Mindfulness Practice",
    description: "Incorporate mindfulness or meditation into your daily routine. Even 5-10 minutes of mindful breathing can help reduce stress and improve emotional regulation."
  });
  
  if (answers[12] >= 3) { // If they rarely/never exercise
    strategies.push({
      title: "Physical Activity",
      description: "Start with light physical activity like walking, stretching, or yoga. Regular exercise is one of the most effective ways to reduce stress and improve mood."
    });
  }
  
  return strategies.slice(0, 4); // Return top 4 strategies
}
