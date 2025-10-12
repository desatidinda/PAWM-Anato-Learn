import { renderSidebar } from '../components/sidebar.js';

let currentQuizData = null;
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let userAnswers = [];
let quizTimer = null;
let timeRemaining = 0;
let quizStartTime = null;

async function loadQuizData(quizId) {
  try {
    
    const response = await fetch(`https://be-anato-learn-6ex73rcgf-desati-dindas-projects.vercel.app/api/quiz/${quizId}`);
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

async function initializeQuiz(quizId) {
  
  currentQuizData = await loadQuizData(quizId);
  
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswers = [];
  userAnswers = [];
  quizStartTime = null;
  
  if (!currentQuizData || !currentQuizData.questions || currentQuizData.questions.length === 0) {
    return false;
  }
  
  // Update quiz header
  setTimeout(() => {
    const titleElement = document.querySelector('.quiz-title');
    const categoryElement = document.querySelector('.quiz-category');
    
    if (titleElement) titleElement.textContent = currentQuizData.title;
    if (categoryElement) categoryElement.textContent = currentQuizData.category || 'Anatomy Quiz';
  }, 100);
  
  return true;
}

function startTimer() {
  timeRemaining = currentQuizData.timeLimit || 300; // Default 5 menit
  quizStartTime = Date.now();
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

async function endQuiz() {
  stopTimer();
  await saveQuizProgress();
  showResults();
}

async function saveQuizProgress() {
  
  if (window.progressManager && window.progressManager.currentUser) {
    try {
      const totalQuestions = currentQuizData.questions.length;
      const correctAnswers = userAnswers.filter(answer => answer.correct).length;
      const timeUsed = quizStartTime ? Math.round((Date.now() - quizStartTime) / 1000) : 0;
      
      const result = await window.progressManager.saveQuizScore(
        currentQuizData.id,
        correctAnswers,
        totalQuestions,
        timeUsed
      );
    } catch (error) {
      console.error('Error saving quiz progress:', error);
    }
  }
}

function showResults() {
  stopTimer();
  
  const totalQuestions = currentQuizData.questions.length;
  const correctAnswers = userAnswers.filter(answer => answer.correct).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const timeUsed = (currentQuizData.timeLimit || 300) - timeRemaining;
  const minutes = Math.floor(timeUsed / 60);
  const seconds = timeUsed % 60;

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
  if (!currentQuizData || !currentQuizData.questions || currentQuizData.questions.length === 0) {
    return;
  }
  
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
window.retryQuiz = async () => {
  const quizId = currentQuizData.id;
  await initializeQuiz(quizId);
  renderCurrentQuestion();
  startTimer();
};
window.goBackToQuizzes = () => {
  window.router.navigate('quiz');
};

export const QuestionsPage = (quizId) => {
  if (!quizId || quizId === undefined) {
    const hash = window.location.hash; 
    
    if (hash.includes('questions/')) {
      quizId = hash.split('questions/')[1];
    } else if (hash.includes('/questions/')) {  
      quizId = hash.split('/questions/')[1];
    }
    
    if (quizId && quizId.includes('/')) {
      quizId = quizId.split('/')[0];
    }
  }
  
  renderSidebar('quiz');
  
  setTimeout(async () => {
    
    const success = await initializeQuiz(quizId);
    if (success) {
      renderCurrentQuestion();
      startTimer();
    } else {
      document.querySelector('.quiz-content').innerHTML = `
        <div class="error" style="text-align: center; padding: 40px; color: white;">
          <h3>Quiz Not Available</h3>
          <p>The quiz "${quizId}" could not be loaded.</p>
          <p>It might be inactive or the questions are not available yet.</p>
          <button onclick="window.router.navigate('quiz')" 
                  style="background: #1e7e34; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
            Back to Quizzes
          </button>
        </div>
      `;
    }
  }, 100);
  
  return `
    <div class="main-content">
      <div class="questions-container">
        <div class="quiz-header">
          <div class="quiz-info">
            <h1 class="quiz-title">Loading Quiz...</h1>
            <div class="quiz-meta-info">
              <span class="quiz-category">Loading...</span>
            </div>
          </div>
        </div>
        
        <div class="quiz-content">
          <div class="loading" style="text-align: center; padding: 40px; color: white;">
            Loading quiz questions for "${quizId}"...
          </div>
        </div>
      </div>
    </div>
  `;
};