import { renderSidebar } from '../components/sidebar.js';

// Mock data sementara
const mockCoursesData = [
  {
    id: 1,
    title: "Introduction to Anatomy",
    description: "Learn the basic building blocks of human anatomy",
    image: "./assets/anatomy.jpg"
  },
  {
    id: 2,
    title: "Circulatory System",
    description: "Explore the heart, blood vessels, and circulation",
    image: "./assets/circulatory.jpg"
  },
  {
    id: 3,
    title: "Nervous System",
    description: "Understand the brain, spinal cord, and nerves",
    image: "./assets/questionmark.png"
  },
  {
    id: 4,
    title: "Respiratory System", 
    description: "Study the lungs and breathing mechanisms",
    image: "./assets/questionmark.png"
  }
];

async function fetchCourses() {
  try {
    // TODO: ganti pake api call nanti   
    // return mock data
    return new Promise(resolve => {
      setTimeout(() => resolve(mockCoursesData), 100);
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

function generateCourseCard(course) {
  return `
    <div class="course-card" data-course-id="${course.id}">
      <div class="course-content">
        <div class="course-image">
          <img src="${course.image}" alt="${course.title}" onerror="this.style.background='#ccc'">
        </div>
        
        <div class="course-info">
          <h3 class="course-name">${course.title}</h3>
          <p class="course-description">${course.description}</p>
        </div>
      </div>
    </div>
  `;
}

export const CoursesPage = () => {
  renderSidebar('courses');
  
  setTimeout(async () => {
    const coursesGrid = document.querySelector('.courses-grid');
    if (coursesGrid) {
      coursesGrid.innerHTML = '<div class="loading">Loading courses...</div>';
      
      try {
        const courses = await fetchCourses();
        
        if (courses.length > 0) {
          coursesGrid.innerHTML = courses.map(generateCourseCard).join('');
        } else {
          coursesGrid.innerHTML = '<div class="no-courses">No courses available</div>';
        }
        
        
      } catch (error) {
        coursesGrid.innerHTML = '<div class="error">Failed to load courses</div>';
        console.error('Error loading courses:', error);
      }
    }
  }, 0);

  return `
    <div class="main-content">
      <div class="courses-container">
        <div class="courses-header">
          <h1 class="courses-title">Courses</h1>
        </div>
        
        <div class="courses-grid">
          <!-- Will be populated dynamically -->
        </div>
    
      </div>
    </div>
  `;
};

export { fetchCourses, mockCoursesData };