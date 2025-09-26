import { renderSidebar } from '../components/sidebar.js';

// Mock data untuk konten awal (contoh), nanti diganti
const courseContentData = {
  1: {
    title: "Introduction to Anatomy",
    description: "Learn the basic building blocks of human anatomy",
    videoId: "uBGl2BujkPQ",
    content: "Anatomy is the branch of biology that focuses on the structure of the human body. It helps us understand how the body is built — from large systems like the skeletal and muscular systems to small components like cells and tissues. Studying anatomy allows us to learn the standard anatomical position of body parts, which is essential for understanding how the body works as a whole.\n\nIn basic human anatomy, we first look at how the body is organized into systems (such as heart, chest, and limbs) and learn the standard anatomical position — standing upright, facing forward, arms at the side, and palms facing forward. This position helps create consistency when discussing locations or directions of structures in the body.\n\nWe also use directional terms to describe where one body part is in relation to another. For example, the eyes are superior to the mouth, and the heart is medial to the lungs. These terms are used everywhere in anatomy and form the foundation for more advanced learning.\n\nUnderstanding these basic principles prepares you for exploring deeper systems like the circulatory, muscular, and nervous systems.",
    bodyParts: [
      { name: "Head & neck", image: "./assets/headneck.png" },
      { name: "Thorax", image: "./assets/headneck.png" },
      { name: "Abdomen", image: "./assets/headneck.png" },
      { name: "Pelvis", image: "./assets/headneck.png" },
      { name: "Upper Limbs", image: "./assets/headneck.png" },
      { name: "Lower Limbs", image: "./assets/headneck.png" },
      { name: "Back", image: "./assets/headneck.png" }
    ]
  },
  2: {
    title: "Circulatory System",
    description: "Explore the heart, blood vessels, and circulation",
    videoId: "bHZsvBdUC2I",
    content: "Learn about the cardiovascular system and how blood flows through your body. The circulatory system is responsible for transporting oxygen, nutrients, and waste products.",
    bodyParts: [
      { name: "Heart", image: "./assets/circulatoryquiz.png" },
      { name: "Arteries", image: "./assets/circulatoryquiz.png" },
      { name: "Veins", image: "./assets/circulatoryquiz.png" },
      { name: "Capillaries", image: "./assets/circulatoryquiz.png" }
    ]
  }
};

// Individual Course Page
export const CoursePage = (courseId) => {
  renderSidebar('courses');
  
  const course = courseContentData[courseId];
  
  if (!course) {
    return `
      <div class="main-content">
        <div class="course-container">
          <h1>Course Not Found</h1>
          <p>The course you're looking for doesn't exist.</p>
          <a href="#/courses" class="back-link">← Back to Courses</a>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="main-content">
      <h1 class="course-title">${course.title}</h1>
      
      <div class="course-container">
        <!-- YouTube Video Embed -->
        <div class="video-container">
          <iframe 
            class="youtube-iframe"
            src="https://www.youtube.com/embed/${course.videoId}?si=zmWfNWV8DkWOSXtV" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>
        </div>
        
        <div class="course-description">
          <p>${course.content}</p>
        </div>
        
        <div class="body-divisions">
          <h2 class="body-divisions-title">Basic Body Divisions</h2>
          <div class="body-cards">
            ${course.bodyParts.map(part => `
              <div class="body-card" data-body-part="${part.name}">
                <div class="body-card-image">
                  <img src="${part.image}" alt="${part.name}" onerror="this.style.background='#ccc'">
                </div>
                <div class="body-card-text">${part.name}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
};

export { courseContentData };