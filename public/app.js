import { SigninPage } from './pages/signin.js'; //menyusul untuk auth
import { SignupPage } from './pages/signup.js';
import { HomePage } from './pages/home.js';
import { CoursesPage } from './pages/courses.js';
import { QuizPage } from './pages/quiz.js';
import { PuzzlePage } from './pages/puzzle.js';
import { CoursePage } from './pages/course.js';
import { QuestionsPage } from './pages/questions.js';

// Simple Router
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = window.location.hash.replace('#/', '') || 'home';

    window.addEventListener('hashchange', () => {
      this.currentRoute = window.location.hash.replace('#/', '') || 'home';
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

  render() {
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

    if (this.routes[this.currentRoute]) {
      app.innerHTML = this.routes[this.currentRoute]();
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

// Event Handlers
function setupEventListeners() {
  document.body.addEventListener('click', (e) => {
    if (e.target.id === 'goToSignup') {
      e.preventDefault();
      router.navigate('signup');
    } 
    if (e.target.id === 'goToSignin') {
      e.preventDefault();
      router.navigate('signin');
    } 
    if (e.target.id === 'logout') {
      router.navigate('signin');
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
      console.log('Signin button clicked!');
      router.navigate('home');
    }
    if (e.target.id === 'signupButton') {
      e.preventDefault();
      console.log('Signup button clicked!');
      router.navigate('home');
    }

    if (e.target.classList.contains('explore-button') || e.target.id === 'exploreCourses') {
      e.preventDefault();
      console.log('Explore Courses button clicked!');
      router.navigate('courses');
    }

    if (e.target.classList.contains('open-all-link') || e.target.id === 'openAllQuiz') {
      e.preventDefault();
      console.log('Open All Quiz button clicked!');
      router.navigate('quiz');
    }

    if (e.target.closest('.course-card')) {
      e.preventDefault();
      const courseCard = e.target.closest('.course-card');
      const courseId = courseCard.getAttribute('data-course-id');
      
      if (courseId) {
        console.log(`Course ${courseId} clicked!`);
        router.navigate(`course/${courseId}`);
      }
    }

    if (e.target.closest('.quiz-card')) {
      e.preventDefault();
      const quizCard = e.target.closest('.quiz-card');
      const quizId = quizCard.getAttribute('data-quiz-id');
      
      console.log(`Quiz ${quizId} clicked!`);
      
      if (quizId === 'circulatory') {
        router.navigate('questions');
      } else if (quizId === 'anatomy-basic') {
        alert('Basic Anatomy quiz will be available soon!');
      } else {
        alert('Quiz will be available soon!');
      }
    }

    if (e.target.closest('.quiz-card1')) {
      e.preventDefault();
      const quizCard = e.target.closest('.quiz-card1');
      const quizId = quizCard.getAttribute('data-quiz-id');
      
      console.log(`Quiz ${quizId} clicked!`);
      
      if (quizId === '1') {
        router.navigate('questions');
      } else {
        alert('Quiz will be available soon!');
      }
    }
  });
}

router.render();
setupEventListeners();