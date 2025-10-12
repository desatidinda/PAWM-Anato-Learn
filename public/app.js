import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile 
} from './firebaseConfig.js';

import { SigninPage } from './pages/signin.js';
import { SignupPage } from './pages/signup.js';
import { HomePage } from './pages/home.js';
import { CoursesPage } from './pages/courses.js';
import { QuizPage } from './pages/quiz.js';
import { PuzzlePage } from './pages/puzzle.js';
import { CoursePage } from './pages/course.js';
import { QuestionsPage } from './pages/questions.js';
import { ProfilePage } from './pages/profile.js';

// Simple Router
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = window.location.hash.replace('#/', '') || 'signin';
    this.protectedRoutes = ['home', 'courses', 'quiz', 'puzzle', 'course', 'questions', 'profile'];
    this.userAuthenticated = false;

    window.addEventListener('hashchange', () => {
      this.currentRoute = window.location.hash.replace('#/', '') || 'signin';
      this.render();
    });
  }

  addRoute(path, component) {
    this.routes[path] = component;
  }

  navigate(path) {
    this.currentRoute = path;
    window.location.hash = `#/${path}`; 
    this.render();
  }

  requiresAuth(route) {
    const baseRoute = route.split('/')[0];
    return this.protectedRoutes.includes(baseRoute);
  }

  setAuthState(isAuthenticated) {
    this.userAuthenticated = isAuthenticated;
  }

  render() {
    if (this.requiresAuth(this.currentRoute) && !this.userAuthenticated) {
      this.navigate('signin');
      return;
    }

    if ((this.currentRoute === 'signin' || this.currentRoute === 'signup') && this.userAuthenticated) {
      this.navigate('home');
      return;
    }

    if (this.currentRoute === 'signin' || this.currentRoute === 'signup') {
      const existingSidebar = document.querySelector('.sidebar');
      if (existingSidebar) {
        existingSidebar.remove();
      }
    }
    
    const app = document.getElementById('app');

    if (this.currentRoute.startsWith('course/')) {
      const courseId = this.currentRoute.split('/')[1];
      if (this.routes['course']) {
        app.innerHTML = this.routes['course'](courseId);
      }
      return;
    }

    if (this.currentRoute.startsWith('questions/')) {
      const quizId = this.currentRoute.split('/')[1];
      
      const app = document.getElementById('app');
      app.innerHTML = QuestionsPage(quizId);
      return;
    }

    if (this.routes[this.currentRoute]) {
      app.innerHTML = this.routes[this.currentRoute]();
    }

    if (this.currentRoute === 'profile') {
        setTimeout(() => {
          updateProfileInfo();
        }, 100); 
      }
  }
}

// Inisialisasi Router
const router = new Router();
window.router = router;
router.addRoute('signin', SigninPage);
router.addRoute('signup', SignupPage);
router.addRoute('home', HomePage);
router.addRoute('courses', CoursesPage);
router.addRoute('quiz', QuizPage);
router.addRoute('puzzle', PuzzlePage);
router.addRoute('course', CoursePage);
router.addRoute('questions', QuestionsPage);
router.addRoute('profile', ProfilePage);

onAuthStateChanged(auth, (user) => {
  if (window.progressManager) window.progressManager.setUser(user);

  if (user) {
    router.setAuthState(true);
    
    if (router.currentRoute === 'signin' || router.currentRoute === 'signup') {
      router.navigate('home');
    } else {
      router.render();
    }
    setTimeout(() => {
      if (window.updateProfileInfo) {
        window.updateProfileInfo();
      }
    }, 200);
  } else {
    router.setAuthState(false);
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.remove();
    
    if (router.requiresAuth(router.currentRoute)) {
      router.navigate('signin');
    } else {
      router.render();
    }
  }
});

async function handleSignin() {
  const email = document.getElementById('signinEmail')?.value?.trim();
  const password = document.getElementById('signinPassword')?.value?.trim();
  
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
}

async function handleSignup() {
  const email = document.getElementById('signupEmail')?.value?.trim();
  const username = document.getElementById('signupUsername')?.value?.trim();
  const password = document.getElementById('signupPassword')?.value?.trim();
  const confirmPassword = document.getElementById('signupConfirmPassword')?.value?.trim();
  
  if (!email || !username || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  if (password.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(userCredential.user, {
      displayName: username
    });
    
  } catch (error) {
    alert('Signup failed: ' + error.message);
  }
}

// Event Handlers
function setupEventListeners() {
  document.body.addEventListener('click', async (e) => {
    if (e.target.id === 'goToSignup') {
      e.preventDefault();
      router.navigate('signup');
    } 
    if (e.target.id === 'goToSignin') {
      e.preventDefault();
      router.navigate('signin');
    } 
    if (e.target.id === 'logout') {
      e.preventDefault();
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }

    if (e.target.closest('.sidebar-link')) {
      e.preventDefault();
      const link = e.target.closest('.sidebar-link');
      const href = link.getAttribute('href');
      const route = href.replace('#/', '');
      router.navigate(route);
    }
    
    // Actions
    if (e.target.id === 'signinButton') {
      e.preventDefault();
      handleSignin();
    }
    
    if (e.target.id === 'signupButton') {
      e.preventDefault();
      handleSignup();
    }

    if (e.target.classList.contains('explore-button') || e.target.id === 'exploreCourses') {
      e.preventDefault();
      router.navigate('courses');
    }

    if (e.target.classList.contains('open-all-link') || e.target.id === 'openAllQuiz') {
      e.preventDefault();
      router.navigate('quiz');
    }

    if (e.target.closest('.course-card')) {
      e.preventDefault();
      const courseCard = e.target.closest('.course-card');
      const courseId = courseCard.getAttribute('data-course-id');
      
      if (courseId) {
        router.navigate(`course/${courseId}`);
      }
    }

    if (e.target.closest('.quiz-card1')) {
      e.preventDefault();
      const quizCard = e.target.closest('.quiz-card1');
      const quizId = quizCard.getAttribute('data-quiz-id');
      const quizType = quizCard.getAttribute('data-quiz-type');
      
      if (quizType && quizType !== 'none') {
        router.currentRoute = `questions/${quizType}`;
        window.location.hash = `#/questions/${quizType}`;

        const app = document.getElementById('app');
        app.innerHTML = QuestionsPage(quizType);
        
      }
    }

    if (e.target.id === 'changeUsername') {
    e.preventDefault();
    
    const displayNameDiv = document.getElementById('userDisplayName');
    const displayNameInput = document.getElementById('userDisplayNameEdit');
    const buttonText = document.getElementById('buttonText');
    
    if (!displayNameDiv || !displayNameInput || !buttonText) {
      return;
    }
    
    if (displayNameDiv.style.display === 'none') {
      const newDisplayName = displayNameInput.value.trim();
      
      if (!newDisplayName) {
        alert('Display name cannot be empty');
        return;
      }
      
      const currentUser = auth.currentUser;
      if (currentUser) {
        updateProfile(currentUser, {
          displayName: newDisplayName
        }).then(() => {

          displayNameDiv.textContent = newDisplayName;
          displayNameDiv.style.display = 'block';
          displayNameInput.style.display = 'none';
          buttonText.textContent = 'Change user name';
          
          updateProfileInfo();
        }).catch((error) => {
          alert('Failed to update display name: ' + error.message);
        });
      }
    } else {
      const currentDisplayName = displayNameDiv.textContent;
      
      displayNameInput.value = currentDisplayName === 'Not set' ? '' : currentDisplayName;
      displayNameDiv.style.display = 'none';
      displayNameInput.style.display = 'block';
      displayNameInput.focus();
      displayNameInput.select();
      buttonText.textContent = 'Save new username';
    }
  }
  });
}

function updateProfileInfo() {
  const userEmailElement = document.getElementById('userEmail');
  const userDisplayNameElement = document.getElementById('userDisplayName');

  if (userEmailElement && userDisplayNameElement) {
    if (auth.currentUser) {
      const user = auth.currentUser;
      userEmailElement.textContent = user.email || 'Not available';
      userDisplayNameElement.textContent = user.displayName || 'Not set';
    } else {
      userEmailElement.textContent = 'Not logged in';
      userDisplayNameElement.textContent = 'Not logged in';
    }
  }
}

window.updateProfileInfo = updateProfileInfo;

class ProgressManager {
  constructor() {
    this.serverURL = 'https://be-anato-learn-6ex73rcgf-desati-dindas-projects.vercel.app';
    this.currentUser = null;
  }
  
  setUser(user) {
    this.currentUser = user;
  }
  
  async saveQuizScore(quizId, score, totalQuestions = 10) {
    if (!this.currentUser) {
      return { success: false, error: 'Not logged in' };
    }
    
    try {
      const response = await fetch(`${this.serverURL}/api/progress/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: this.currentUser.uid,
          quizId,
          score,
          totalQuestions
        })
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  async getQuizHighScore(quizId) {
    if (!this.currentUser) return { highScore: 0, attempts: 0 };
    
    try {
      const response = await fetch(`${this.serverURL}/api/progress/quiz/${this.currentUser.uid}/${quizId}`);
      const result = await response.json();
      return result.success ? result.data : { highScore: 0, attempts: 0 };
    } catch (error) {
      return { highScore: 0, attempts: 0 };
    }
  }
  
  async getUserQuizProgress() {
    if (!this.currentUser) return null;
    
    try {
      const response = await fetch(`${this.serverURL}/api/progress/quiz/${this.currentUser.uid}`);
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      return null;
    }
  }
}

const progressManager = new ProgressManager();
window.progressManager = progressManager;

window.testSaveQuizScore = async (quizType, score) => {
  if (window.progressManager) {
    const result = await window.progressManager.saveQuizScore(quizType, score, 10);
    if (result.success) {
      if (window.router && window.router.currentRoute === 'quiz') {
        window.router.render();
      }
    } else {
      alert(`Failed to save: ${result.error}`);
    }
  } else {
    alert('Progress manager not ready');
  }
};

setupEventListeners();