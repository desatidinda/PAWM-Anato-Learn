import { renderSidebar } from '../components/sidebar.js';

let currentQuizData = null;
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let userAnswers = [];

// Sample quiz data
const sampleQuizzes = {
  "circulatory": {
    id: "circulatory",
    title: "Circulatory System Quiz",
    category: "Anatomy - Cardiovascular",
    description: "Test your knowledge of the circulatory system",
    totalQuestions: 5,
    timeLimit: 300, // 5 minutes in seconds
    questions: [
      {
        id: 1,
        question: "What is the main function of the circulatory system?",
        type: "multiple-choice",
        options: [
          { id: "a", text: "Transport nutrients and oxygen throughout the body", correct: true },
          { id: "b", text: "Digest food and absorb nutrients", correct: false },
          { id: "c", text: "Filter waste from the blood", correct: false },
          { id: "d", text: "Produce hormones and enzymes", correct: false }
        ],
      },
      {
        id: 2,
        question: "How many chambers does a human heart have?",
        type: "multiple-choice",
        options: [
          { id: "a", text: "2 chambers", correct: false },
          { id: "b", text: "3 chambers", correct: false },
          { id: "c", text: "4 chambers", correct: true },
          { id: "d", text: "6 chambers", correct: false }
        ],
      },
      {
        id: 3,
        question: "Which blood vessel carries oxygenated blood away from the heart?",
        type: "multiple-choice",
        options: [
          { id: "a", text: "Veins", correct: false },
          { id: "b", text: "Arteries", correct: true },
          { id: "c", text: "Capillaries", correct: false },
          { id: "d", text: "Venules", correct: false }
        ],
      },
      {
        id: 4,
        question: "What is the average resting heart rate for adults?",
        type: "multiple-choice",
        options: [
          { id: "a", text: "40-50 beats per minute", correct: false },
          { id: "b", text: "60-100 beats per minute", correct: true },
          { id: "c", text: "120-140 beats per minute", correct: false },
          { id: "d", text: "150-180 beats per minute", correct: false }
        ],
      },
      {
        id: 5,
        question: "Which component of blood is responsible for clotting?",
        type: "multiple-choice",
        options: [
          { id: "a", text: "Red blood cells", correct: false },
          { id: "b", text: "White blood cells", correct: false },
          { id: "c", text: "Platelets", correct: true },
          { id: "d", text: "Plasma", correct: false }
        ],
      }
    ]
  }
};

// Timer
let quizTimer = null;
let timeRemaining = 0;

function startTimer() {
  timeRemaining = currentQuizData.timeLimit;
  updateTimerDisplay();
  
  quizTimer = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();
    
    if (timeRemaining <= 0) {
      clearInterval(quizTimer);
      endQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  const timerElement = document.querySelector('.timer-display');
  if (timerElement) {
    timerElement.textContent = timeString;
  }
}

function stopTimer() {
  if (quizTimer) {
    clearInterval(quizTimer);
    quizTimer = null;
  }
}

function initializeQuiz(quizId) {
  currentQuizData = sampleQuizzes[quizId];
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswers = [];
  userAnswers = [];
  
  if (!currentQuizData) {
    console.error('Quiz not found:', quizId);
    return false;
  }
  
  return true;
}

function selectAnswer(optionId) {
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  const selectedOption = document.querySelector(`[data-option-id="${optionId}"]`);
  if (selectedOption) {
    selectedOption.classList.add('selected');
    selectedAnswers[currentQuestionIndex] = optionId;
    
    const nextButton = document.querySelector('.next-question-btn');
    if (nextButton) {
      nextButton.disabled = false;
      nextButton.classList.remove('disabled');
    }
  }
}

function nextQuestion() {
  const currentQuestion = currentQuizData.questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  
  userAnswers[currentQuestionIndex] = {
    questionId: currentQuestion.id,
    selectedOption: selectedAnswer,
    correct: currentQuestion.options.find(opt => opt.id === selectedAnswer)?.correct || false
  };
  
  if (userAnswers[currentQuestionIndex].correct) {
    score += 10;
  }
  
  currentQuestionIndex++;
  
  if (currentQuestionIndex < currentQuizData.questions.length) {
    renderCurrentQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  stopTimer();
  showResults();
}

function showResults() {
  stopTimer();
  
  const totalQuestions = currentQuizData.questions.length;
  const correctAnswers = userAnswers.filter(answer => answer.correct).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const timeUsed = currentQuizData.timeLimit - timeRemaining;
  const minutes = Math.floor(timeUsed / 60);
  const seconds = timeUsed % 60;

  if (window.markQuizCompleted) {
    window.markQuizCompleted(1, percentage);
  }
  
  let performanceMessage = "";
  let performanceClass = "";
  
  if (percentage >= 90) {
    performanceMessage = "Excellent! Outstanding knowledge!";
    performanceClass = "excellent";
  } else if (percentage >= 80) {
    performanceMessage = "Great job! Very good understanding!";
    performanceClass = "great";
  } else if (percentage >= 70) {
    performanceMessage = "Good work! Keep practicing!";
    performanceClass = "good";
  } else if (percentage >= 60) {
    performanceMessage = "Not bad! Review the topics and try again!";
    performanceClass = "okay";
  } else {
    performanceMessage = "Keep studying! You'll get better!";
    performanceClass = "needs-improvement";
  }
  
  const resultsHTML = `
    <div class="quiz-results">
      <div class="results-header">
        <h2>Quiz Complete!</h2>
        <div class="score-display">
          <div class="score-circle ${performanceClass}">
            <span class="percentage">${percentage}%</span>
            <span class="score-text">${correctAnswers}/${totalQuestions}</span>
          </div>
        </div>
      </div>
      
      <div class="results-stats">
        <div class="stat-item">
          <div class="stat-value">${correctAnswers}</div>
          <div class="stat-label">Correct</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${totalQuestions - correctAnswers}</div>
          <div class="stat-label">Incorrect</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${minutes}:${seconds.toString().padStart(2, '0')}</div>
          <div class="stat-label">Time Used</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${score}</div>
          <div class="stat-label">Points</div>
        </div>
      </div>
      
      <div class="performance-message ${performanceClass}">
        ${performanceMessage}
      </div>
      
      <div class="results-actions">
        <button class="retry-btn" onclick="retryQuiz()">Try Again</button>
        <button class="back-btn" onclick="goBackToQuizzes()">Back to Quizzes</button>
      </div>
    </div>
  `;
  
  document.querySelector('.quiz-content').innerHTML = resultsHTML;
}

function renderCurrentQuestion() {
  const question = currentQuizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuizData.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === currentQuizData.questions.length - 1;
  
  const questionHTML = `
    <div class="quiz-progress-header">
      <div class="progress-info">
        <span class="question-counter">${currentQuestionIndex + 1} / ${currentQuizData.questions.length}</span>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>
      <div class="quiz-meta">
        <div class="timer-container">
          <span class="timer-icon">⏱️</span>
          <span class="timer-display">5:00</span>
        </div>
        <div class="score-container">
          <span class="score-label">Score:</span>
          <span class="current-score">${score}</span>
        </div>
      </div>
    </div>
    
    <div class="question-container">
      <div class="question-header">
        <h3 class="question-text">${question.question}</h3>
      </div>
      
      <div class="options-container">
        ${question.options.map(option => `
          <div class="quiz-option" 
               data-option-id="${option.id}"
               onclick="selectAnswer('${option.id}')">
            <div class="option-marker">
              <span class="option-letter">${option.id.toUpperCase()}</span>
            </div>
            <div class="option-text">${option.text}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="question-navigation">
        <button class="next-question-btn disabled" 
                onclick="nextQuestion()" 
                disabled>
          ${isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  `;
  
  document.querySelector('.quiz-content').innerHTML = questionHTML;
}

window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.retryQuiz = () => {
  const quizId = currentQuizData.id;
  initializeQuiz(quizId);
  renderCurrentQuestion();
  startTimer();
};
window.goBackToQuizzes = () => window.router.navigate('quiz');

export const QuestionsPage = (quizId = 'circulatory') => {
  renderSidebar('quiz');
  
  if (!initializeQuiz(quizId)) {
    return `<div class="error">Quiz not found</div>`;
  }
  
  setTimeout(() => {
    renderCurrentQuestion();
    startTimer();
  }, 100);
  
  return `
    <div class="main-content">
      <div class="questions-container">
        <div class="quiz-header">
          <div class="quiz-info">
            <h1 class="quiz-title">${currentQuizData.title}</h1>
            <div class="quiz-meta-info">
              <span class="quiz-category">${currentQuizData.category}</span>
              <span class="quiz-description">${currentQuizData.description}</span>
            </div>
          </div>
        </div>
        
        <div class="quiz-content">
        </div>
      </div>
    </div>
  `;
};

export { sampleQuizzes };