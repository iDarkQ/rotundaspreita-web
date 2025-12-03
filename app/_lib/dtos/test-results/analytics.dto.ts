export interface AnalyticsDto {
  finishedTests: number;
  averageTestResult: number;
  visitedQuestions: number;

  correctAnswers: number;
  wrongAnswers: number;

  questionsAnswered: number;
  questionsNotAnswered: number;
}
