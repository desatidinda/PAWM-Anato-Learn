import { renderSidebar } from '../components/sidebar.js';

let hasRunTypewriter = false;

function typewriterEffect() {
  if (hasRunTypewriter) return;
  
  const titleElement = document.querySelector('.home-title');
  const subtitleElement = document.querySelector('.home-subtitle');
  
  if (!titleElement || !subtitleElement) return;
  
  hasRunTypewriter = true;
  
  const titleText = "Hi TPBabes! Welcome to,";
  const subtitleText = "Your virtual gateway to exploring the human body.";
  
  let titleIndex = 0;
  let subtitleIndex = 0;
  
  // typewriter
  function typeTitle() {
    if (titleIndex < titleText.length) {
      titleElement.textContent += titleText.charAt(titleIndex);
      titleIndex++;
      setTimeout(typeTitle, 100);
    } else {
      setTimeout(typeSubtitle, 300);
    }
  }
  
  function typeSubtitle() {
    if (subtitleIndex < subtitleText.length) {
      subtitleElement.textContent += subtitleText.charAt(subtitleIndex);
      subtitleIndex++;
      setTimeout(typeSubtitle, 50);
    }
  }
  
  setTimeout(typeTitle, 500);
}

export const HomePage = () => {
  renderSidebar('home');
  
  if (!hasRunTypewriter) {
    setTimeout(typewriterEffect, 100);
  } else {
    setTimeout(() => {
      const titleElement = document.querySelector('.home-title');
      const subtitleElement = document.querySelector('.home-subtitle');
      
      if (titleElement && subtitleElement) {
        titleElement.textContent = "Hi TPBabes! Welcome to,";
        subtitleElement.textContent = "Your virtual gateway to exploring the human body.";
      }
    }, 50);
  }
  
  return `
    <div class="main-content">
      <div class="home-container">
        <div class="home-header">
          <div class="title-container">
            <h1 class="home-title"></h1>
            <p class="home-subtitle"></p>
          </div>
        </div>
        
        <div class="hero-section">
          <div class="hero-content">
            <h2 class="hero-title">Go and Explore Various Courses!</h2>
            <p class="hero-description">Learn at your own pace and unlock the building blocks of anatomy in a fun and simple way.</p>
            <button class="explore-button" id="exploreCourses">Explore Courses</button>
          </div>
        </div>
        
        <div class="challenge-section">
          <div class="challenge-header">
            <h3 class="challenge-title">Ready to challenge yourself?</h3>
            <a href="#" class="open-all-link" id="openAllQuiz">Open all</a>
          </div>
          <p class="challenge-description">After exploring our lessons, challenge your brain with fast & fun quizzes! Track your progress and earn points as you learn.</p>
          
          <div class="quiz-cards">
            <div class="quiz-card" data-quiz-id="circulatory">
              <div class="quiz-icon">
                <img src="assets/CirculatoryQuiz.png" alt="Heart">
              </div>
              <div class="quiz-info">
                <h4 class="quiz-name">Circulatory System</h4>
                <button class="start-quiz-btn">Start Quiz</button>
              </div>
            </div>
            
            <div class="quiz-card" data-quiz-id="anatomy-basic">
              <div class="quiz-icon">
                <img src="assets/CirculatoryQuiz.png" alt="Anatomy">
              </div>
              <div class="quiz-info">
                <h4 class="quiz-name">Basic Anatomy</h4>
                <button class="start-quiz-btn">Start Quiz</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};