export const TEST_BASE_URL = "http://127.0.0.1:3100";
export const TEST_JWT_SECRET = "playwright-only-secret-not-for-production";
export const TEST_ADMIN_ID = "playwright-admin";
export const TEST_ADMIN_EMAIL = "playwright-admin@example.test";
export const TEST_PAYMENT_USER_ID = "playwright-payment-user";
export const TEST_PAYMENT_USER_EMAIL = "playwright-payment@example.test";
export const TEST_EXAM_ADMIN_ID = "playwright-exam-admin";
export const TEST_STUDY_ID = "playwright-study";
export const TEST_EXAM_STUDY_ID = "playwright-exam-study";
export const TEST_READINESS_USER_ID = "playwright-readiness-user";
export const TEST_READINESS_EMPTY_USER_ID = "playwright-readiness-empty-user";
export const TEST_READINESS_STUDY_ID = "playwright-readiness-study";

// Mecânica is answered wrong, Sinalização right, Legislação is never seen.
export const TEST_READINESS_CATEGORIES = [
  { name: "Sinalização", questions: 5, answeredCorrectly: true },
  { name: "Mecânica", questions: 5, answeredCorrectly: false },
  { name: "Legislação", questions: 4, answeredCorrectly: null },
] as const;
export const TEST_READINESS_TEST_RUNS = 3;
export const TEST_QUESTION_ID = "playwright-question";
export const TEST_REGISTRATION_EMAILS = [
  "playwright-registration-desktop-chromium@example.test",
  "playwright-registration-mobile-chromium@example.test",
];

export const TEST_QUESTION =
  "Pergunta de teste para verificar o percurso do exame.";
export const TEST_CORRECT_ANSWER = "Resposta correta de teste";

export const TEST_EXAM_QUESTIONS = [
  {
    id: "playwright-exam-question-1",
    content: "Pergunta um do exame de teste.",
    correctAnswer: "Resposta correta um",
    incorrectAnswer: "Resposta incorreta um",
  },
  {
    id: "playwright-exam-question-2",
    content: "Pergunta dois do exame de teste.",
    correctAnswer: "Resposta correta dois",
    incorrectAnswer: "Resposta incorreta dois",
  },
  {
    id: "playwright-exam-question-3",
    content: "Pergunta três do exame de teste.",
    correctAnswer: "Resposta correta três",
    incorrectAnswer: "Resposta incorreta três",
  },
] as const;
