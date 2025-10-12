import { renderSidebar } from '../components/sidebar.js';

let quizzesData = [];

function calculateOverallProgress() {
  if (!quizzesData || quizzesData.length === 0) return 0;
  
  const activeQuizzes = quizzesData.filter(quiz => quiz.isActive !== false && quiz.type !== 'none');
  const totalActiveQuizzes = activeQuizzes.length;
  
  if (totalActiveQuizzes === 0) return 0;
  
  let passedQuizzes = 0;
  activeQuizzes.forEach(quiz => {
    const progressScore = document.getElementById(`progressScore-${quiz.id}`);
    if (progressScore && progressScore.textContent === 'PASSED') {
      passedQuizzes++;
    }
  });
  
  const percentage = Math.round((passedQuizzes / totalActiveQuizzes) * 100);
  return percentage;
}

function updateProgressCircle(percentage) {
  const progressElement = document.getElementById('overallProgress');
  const progressCircle = document.querySelector('.progress-circle');
  
  if (progressElement) {
    progressElement.textContent = `${percentage}%`;
  }
  
  if (progressCircle) {
    progressCircle.style.setProperty('--progress', percentage);
  }
}

async function fetchQuizzesFromBackend() {
  try {
    const response = await fetch('https://be-anato-learn-6ex73rcgf-desati-dindas-projects.vercel.app/api/quiz/list');
    const result = await response.json();
    
    if (result.success && result.data) {
      const transformedQuizzes = result.data.map((quiz, index) => ({
        id: index + 1,
        title: quiz.title,
        questions: quiz.totalQuestions || 5,
        image: quiz.image,
        type: quiz.id,
        isActive: quiz.isActive
      }));
      return transformedQuizzes;
    } else {
      throw new Error('No data from backend');
    }
  } catch (error) {
    console.error('Backend fetch failed:', error);
    return [
      {
        id: 1,
        title: "Circulatory system",
        questions: 5,
        image: "./assets/circulatory.jpg",
        type: "circulatory"
      },
      {
        id: 2,
        title: "Quiz round 2",
        questions: 5,
        image: "./assets/questionred.png",
        type: "respiratory"
      },
      {
        id: 3,
        title: "Quiz round 3",
        questions: 5,
        image: "./assets/questionred.png",
        type: "nervous"
      },
      {
        id: 4,
        title: "Quiz round 4",
        questions: 5,
        image: "./assets/questionred.png",
        type: "skeletal"
      },
      {
        id: 5,
        title: "Quiz round 5",
        questions: 30,
        image: "./assets/questionred.png",
        type: "none"
      },
      {
        id: 6,
        title: "Quiz round 6",
        questions: 18,
        image: "./assets/questionred.png",
        type: "none"
      },
      {
        id: 7,
        title: "Quiz round 7",
        questions: 22,
        image: "./assets/questionred.png",
        type: "none"
      },
      {
        id: 8,
        title: "Quiz round 8",
        questions: 30,
        image: "./assets/questionred.png",
        type: "none"
      }
    ];
  }
}

function generateQuizCard(quiz) {
  return `
    <div class="quiz-card1" data-quiz-id="${quiz.id}" data-quiz-type="${quiz.type}">
      <div class="quiz-content">
        <div class="quiz-image">
          <img src="${quiz.image}" 
               alt="${quiz.title}"
               onerror="this.src='./assets/questionred.png'">
        </div>
        
        <div class="quiz-info1">
          <h3 class="quiz-name1">${quiz.title}</h3>
          <div class="progress-box" id="progressBox-${quiz.id}">
            <div class="progress-score not-started" id="progressScore-${quiz.id}">Not Started</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export const QuizPage = () => {
  renderSidebar('quiz');

  if (window.quizPageTimeout) {
    clearTimeout(window.quizPageTimeout);
  }

  window.quizPageTimeout = setTimeout(async () => {
    const quizzesGrid = document.querySelector('.quizzes-grid');
    if (quizzesGrid) {
      quizzesGrid.innerHTML = '<div class="loading" style="text-align: center; padding: 20px; color: white;">Loading quizzes...</div>';
      
      try {
        quizzesData = await fetchQuizzesFromBackend();

        quizzesGrid.innerHTML = quizzesData.map(generateQuizCard).join('');
        
        document.querySelectorAll('.quiz-card1').forEach(card => {
          card.addEventListener('click', () => {
            const quizType = card.dataset.quizType;
            const quiz = quizzesData.find(q => q.id == card.dataset.quizId);

            if (quiz && quiz.isActive !== false && quizType && quizType !== 'none') {
              window.router.navigate('questions', quizType);
            } else {
              alert('This quiz is not available yet!');
            }
          });
        });

        setTimeout(async () => {
          await loadQuizProgress();
          
          setTimeout(() => {
            const overallProgress = calculateOverallProgress();
            updateProgressCircle(overallProgress);
          }, 500);
        }, 500);
        
      } catch (error) {
        quizzesGrid.innerHTML = `
          <div class="error" style="text-align: center; padding: 20px; color: red;">
            <h3>Failed to Load Quizzes</h3>
            <p>Please try again</p>
            <button onclick="window.location.reload()">Retry</button>
          </div>
        `;
      }
    }
  }, 100);

    return `
    <div class="main-content">
      <div class="quiz-container1">
        <div class="quiz-header">
          <div class="quiz-text-content">
            <h1 class="quiz-title">Quiz</h1>
            <p class="quiz-subtitle">Ready to challenge yourself? Our anatomy quizzes are here to help you review what you've learned in a fun and interactive way. Whether you're just starting or looking to test yourself, there's always something new to explore!</p>
          </div>
          
          <div class="progress-section">
            <div class="progress-circle" style="--progress: 0">
              <div class="progress-ring">
                <div class="progress-text" id="overallProgress">0%</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="discover-section">
          <h2 class="discover-title">Discover quizzes!</h2>
          
          <div class="quizzes-grid">
            <div class="loading">Loading...</div>
          </div>
        </div>
      </div>
    </div>
  `;
};

async function loadQuizProgress() {
  if (!window.progressManager || !window.progressManager.currentUser) {
    return;
  }
  
  for (const quiz of quizzesData) {
    const progressScore = document.getElementById(`progressScore-${quiz.id}`);
    
    if (quiz.isActive !== false && quiz.type && quiz.type !== 'none') {
      try {
        const progressData = await window.progressManager.getQuizHighScore(quiz.type);
        
        if (progressScore) {
          if (progressData.attempts > 0) {
            const score = progressData.highScore || 0;
            const maxScore = quiz.questions || 5;
            
            if (score >= maxScore) {
              progressScore.textContent = 'PASSED';
              progressScore.className = 'progress-score passed';
            } else {
              progressScore.textContent = `${score}/${maxScore}`;
              progressScore.className = 'progress-score attempted';
            }
          } else {
            progressScore.textContent = 'Not Started';
            progressScore.className = 'progress-score not-started';
          }
        }
      } catch (error) {
        if (progressScore) {
          progressScore.textContent = 'Not Started';
          progressScore.className = 'progress-score not-started';
        }
      }
    } else {
      if (progressScore) {
        progressScore.textContent = 'Not Started';
        progressScore.className = 'progress-score not-started';
      }
    }
  }
}