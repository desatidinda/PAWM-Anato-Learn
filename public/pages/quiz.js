import { renderSidebar } from '../components/sidebar.js';

// Mock quiz data
const mockQuizzesData = [
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
    questions: 15,
    image: "./assets/questionred.png",
    type: "none"
  },
  {
    id: 3,
    title: "Quiz round 3",
    questions: 20,
    image: "./assets/questionred.png",
    type: "none"
  },
  {
    id: 4,
    title: "Quiz round 4",
    questions: 25,
    image: "./assets/questionred.png",
    type: "none"
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

async function fetchQuizzes() {
  try {
    // TODO: ganti jd api call nanti
    return new Promise(resolve => {
      setTimeout(() => resolve(mockQuizzesData), 100);
    });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return [];
  }
}

function generateQuizCard(quiz) {
  return `
    <div class="quiz-card1" data-quiz-id="${quiz.id}">
      <div class="quiz-content">
        <!-- Quiz Image -->
        <div class="quiz-image">
          <img src="${quiz.image}" alt="${quiz.title}">
        </div>
        
        <!-- Quiz Info -->
        <div class="quiz-info1">
          <h3 class="quiz-name1">${quiz.title}</h3>
        </div>
      </div>
    </div>
  `;
}

export const QuizPage = () => {
  renderSidebar('quiz');

  setTimeout(async () => {
    const quizzesGrid = document.querySelector('.quizzes-grid');
    if (quizzesGrid) {
      quizzesGrid.innerHTML = '<div class="loading">Loading quizzes...</div>';
      
      try {
        const quizzes = await fetchQuizzes();
        
        if (quizzes.length > 0) {
          quizzesGrid.innerHTML = quizzes.map(generateQuizCard).join('');
        } else {
          quizzesGrid.innerHTML = '<div class="no-quizzes">No quizzes available</div>';
        }
        
      } catch (error) {
        quizzesGrid.innerHTML = '<div class="error">Failed to load quizzes</div>';
      }
    }
  }, 0);

  return `
    <div class="main-content">
      <div class="quiz-container1">
        <div class="quiz-header">
          <div class="quiz-text-content">
            <h1 class="quiz-title">Quiz</h1>
            <p class="quiz-subtitle">Ready to challenge yourself? Our anatomy quizzes are here to help you review what you've learned in a fun and interactive way. Whether you're just starting or looking to test yourself, there's always something new to explore!</p>
          </div>
          
          <div class="progress-section">
            <div class="progress-circle">
              <div class="progress-ring">
                <div class="progress-text">50%</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="discover-section">
          <h2 class="discover-title">Discover quizzes!</h2>
          
          <div class="quizzes-grid">
          </div>
        </div>
      </div>
    </div>
  `;
};

export { fetchQuizzes, mockQuizzesData };