const { admin, db } = require('./config/firebase');

const sampleQuizzes = [
  {
    id: 'circulatory',
    title: 'Circulatory System',
    category: 'Anatomy - Cardiovascular',
    description: 'Test your knowledge of the circulatory system',
    totalQuestions: 5,
    timeLimit: 300,
    difficulty: 'medium',
    isActive: true,
    image: './assets/quiz/circulatory.jpg',
    questions: [
      {
        id: 1,
        question: 'What is the main function of the circulatory system?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Transport nutrients and oxygen throughout the body', correct: true },
          { id: 'b', text: 'Digest food and absorb nutrients', correct: false },
          { id: 'c', text: 'Filter waste from the blood', correct: false },
          { id: 'd', text: 'Produce hormones and enzymes', correct: false }
        ]
      },
      {
        id: 2,
        question: 'How many chambers does a human heart have?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: '2 chambers', correct: false },
          { id: 'b', text: '3 chambers', correct: false },
          { id: 'c', text: '4 chambers', correct: true },
          { id: 'd', text: '6 chambers', correct: false }
        ]
      },
      {
        id: 3,
        question: 'Which blood vessel carries oxygenated blood away from the heart?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Veins', correct: false },
          { id: 'b', text: 'Arteries', correct: true },
          { id: 'c', text: 'Capillaries', correct: false },
          { id: 'd', text: 'Venules', correct: false }
        ]
      },
      {
        id: 4,
        question: 'What is the average resting heart rate for adults?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: '40-50 beats per minute', correct: false },
          { id: 'b', text: '60-100 beats per minute', correct: true },
          { id: 'c', text: '120-140 beats per minute', correct: false },
          { id: 'd', text: '150-180 beats per minute', correct: false }
        ]
      },
      {
        id: 5,
        question: 'Which component of blood is responsible for clotting?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Red blood cells', correct: false },
          { id: 'b', text: 'White blood cells', correct: false },
          { id: 'c', text: 'Platelets', correct: true },
          { id: 'd', text: 'Plasma', correct: false }
        ]
      }
    ]
  },
  {
    id: 'respiratory',
    title: 'Respiratory System',
    category: 'Anatomy - Respiratory',
    description: 'Test your knowledge of the respiratory system',
    totalQuestions: 5,
    timeLimit: 300,
    difficulty: 'medium',
    isActive: true,
    image: './assets/quiz/respiratory.jpg',
    questions: [
      {
        id: 1,
        question: 'What is the primary function of the respiratory system?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Gas exchange between air and blood', correct: true },
          { id: 'b', text: 'Filter blood and remove toxins', correct: false },
          { id: 'c', text: 'Produce digestive enzymes', correct: false },
          { id: 'd', text: 'Regulate body temperature', correct: false }
        ]
      },
      {
        id: 2,
        question: 'Which structure prevents food from entering the trachea?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Larynx', correct: false },
          { id: 'b', text: 'Epiglottis', correct: true },
          { id: 'c', text: 'Pharynx', correct: false },
          { id: 'd', text: 'Bronchi', correct: false }
        ]
      },
      {
        id: 3,
        question: 'Where does gas exchange occur in the lungs?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Bronchi', correct: false },
          { id: 'b', text: 'Bronchioles', correct: false },
          { id: 'c', text: 'Alveoli', correct: true },
          { id: 'd', text: 'Trachea', correct: false }
        ]
      },
      {
        id: 4,
        question: 'What muscle is primarily responsible for breathing?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Intercostal muscles', correct: false },
          { id: 'b', text: 'Diaphragm', correct: true },
          { id: 'c', text: 'Abdominal muscles', correct: false },
          { id: 'd', text: 'Pectoral muscles', correct: false }
        ]
      },
      {
        id: 5,
        question: 'How many lobes does the right lung have?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: '1 lobe', correct: false },
          { id: 'b', text: '2 lobes', correct: false },
          { id: 'c', text: '3 lobes', correct: true },
          { id: 'd', text: '4 lobes', correct: false }
        ]
      }
    ]
  },
  {
    id: 'nervous',
    title: 'Nervous System',
    category: 'Anatomy - Nervous System',
    description: 'Test your knowledge of the nervous system',
    totalQuestions: 5,
    timeLimit: 300,
    difficulty: 'medium',
    isActive: true,
    image: './assets/quiz/nervous.jpg',
    questions: [
      {
        id: 1,
        question: 'What is the basic functional unit of the nervous system?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Neuron', correct: true },
          { id: 'b', text: 'Synapse', correct: false },
          { id: 'c', text: 'Axon', correct: false },
          { id: 'd', text: 'Dendrite', correct: false }
        ]
      },
      {
        id: 2,
        question: 'Which part of the brain controls balance and coordination?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Cerebrum', correct: false },
          { id: 'b', text: 'Cerebellum', correct: true },
          { id: 'c', text: 'Brain stem', correct: false },
          { id: 'd', text: 'Thalamus', correct: false }
        ]
      },
      {
        id: 3,
        question: 'What protects the brain and spinal cord?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Cerebrospinal fluid only', correct: false },
          { id: 'b', text: 'Skull and vertebrae only', correct: false },
          { id: 'c', text: 'Meninges, cerebrospinal fluid, and bone', correct: true },
          { id: 'd', text: 'Blood-brain barrier only', correct: false }
        ]
      },
      {
        id: 4,
        question: 'Which division of the nervous system controls involuntary functions?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Central nervous system', correct: false },
          { id: 'b', text: 'Somatic nervous system', correct: false },
          { id: 'c', text: 'Autonomic nervous system', correct: true },
          { id: 'd', text: 'Peripheral nervous system', correct: false }
        ]
      },
      {
        id: 5,
        question: 'What is the gap between two neurons called?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Axon terminal', correct: false },
          { id: 'b', text: 'Synapse', correct: true },
          { id: 'c', text: 'Dendrite', correct: false },
          { id: 'd', text: 'Myelin sheath', correct: false }
        ]
      }
    ]
  },
  {
    id: 'skeletal',
    title: 'Skeletal System',
    category: 'Anatomy - Skeletal System',
    description: 'Test your knowledge of bones and joints',
    totalQuestions: 5,
    timeLimit: 300,
    difficulty: 'medium',
    isActive: true,
    image: './assets/quiz/skeletal.jpg',
    questions: [
      {
        id: 1,
        question: 'How many bones are in the adult human body?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: '186 bones', correct: false },
          { id: 'b', text: '206 bones', correct: true },
          { id: 'c', text: '226 bones', correct: false },
          { id: 'd', text: '246 bones', correct: false }
        ]
      },
      {
        id: 2,
        question: 'What is the longest bone in the human body?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Tibia', correct: false },
          { id: 'b', text: 'Humerus', correct: false },
          { id: 'c', text: 'Femur', correct: true },
          { id: 'd', text: 'Fibula', correct: false }
        ]
      },
      {
        id: 3,
        question: 'Where is red blood cell production primarily located?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Bone marrow', correct: true },
          { id: 'b', text: 'Liver', correct: false },
          { id: 'c', text: 'Spleen', correct: false },
          { id: 'd', text: 'Kidneys', correct: false }
        ]
      },
      {
        id: 4,
        question: 'What type of joint is the shoulder joint?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Hinge joint', correct: false },
          { id: 'b', text: 'Ball and socket joint', correct: true },
          { id: 'c', text: 'Pivot joint', correct: false },
          { id: 'd', text: 'Fixed joint', correct: false }
        ]
      },
      {
        id: 5,
        question: 'What connects bones to other bones?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Tendons', correct: false },
          { id: 'b', text: 'Ligaments', correct: true },
          { id: 'c', text: 'Cartilage', correct: false },
          { id: 'd', text: 'Muscles', correct: false }
        ]
      }
    ]
  },
  
  // NOT AVAILABLE QUIZZES
  {
    id: 'digestive',
    title: 'Digestive System',
    category: 'Anatomy - Digestive System',
    description: 'Coming soon - Test your knowledge of the digestive system',
    totalQuestions: 8,
    timeLimit: 480,
    difficulty: 'medium',
    isActive: false,
    image: './assets/questionred.png',
    questions: []
  },
  {
    id: 'muscular',
    title: 'Muscular System',
    category: 'Anatomy - Muscular System', 
    description: 'Coming soon - Test your knowledge of muscles and movement',
    totalQuestions: 10,
    timeLimit: 600,
    difficulty: 'hard',
    isActive: false,
    image: './assets/questionred.png',
    questions: []
  },
  {
    id: 'endocrine',
    title: 'Endocrine System',
    category: 'Anatomy - Endocrine System',
    description: 'Coming soon - Test your knowledge of hormones and glands',
    totalQuestions: 7,
    timeLimit: 420,
    difficulty: 'hard',
    isActive: false,
    image: './assets/questionred.png',
    questions: []
  },
  {
    id: 'immune',
    title: 'Immune System',
    category: 'Anatomy - Immune System',
    description: 'Coming soon - Test your knowledge of body defenses',
    totalQuestions: 6,
    timeLimit: 360,
    difficulty: 'hard',
    isActive: false,
    image: './assets/questionred.png',
    questions: []
  }
];

async function seedQuizzes() {
  try {
    console.log('Checking existing quiz data...');
    
    const existingQuizzes = await db.collection('quizzes').get();
    
    if (!existingQuizzes.empty) {
      console.log(` Found ${existingQuizzes.size} existing quizzes`);
      console.log(` Database already seeded. Skipping...`);
      
      existingQuizzes.forEach(doc => {
        const data = doc.data();
        const status = data.isActive ? 'active' : 'no';
        console.log(`   ${status} ${doc.id}: ${data.title}`);
      });
      
      process.exit(0);
    }
    
    console.log('No existing quizzes found. Starting seeding...');
    
    for (const quiz of sampleQuizzes) {
      const { id, ...quizData } = quiz;
      
      // Add timestamps
      quizData.createdAt = new Date().toISOString();
      quizData.updatedAt = new Date().toISOString();
      
      // Set quiz with custom ID
      await db.collection('quizzes').doc(id).set(quizData);
      
      const status = quiz.isActive ? 'ACTIVE' : 'COMING SOON';
      console.log(`${status} Quiz "${quiz.title}" seeded successfully`);
    }
    
    console.log(' All 8 quizzes seeded successfully!');
    console.log(' Summary:');
    console.log('    4 Active quizzes ready to use');
    console.log('    4 Coming soon quizzes (inactive)');
    process.exit(0);
  } catch (error) {
    console.error(' Error seeding quizzes:', error);
    process.exit(1);
  }
}

seedQuizzes();