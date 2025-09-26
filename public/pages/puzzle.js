import { renderSidebar } from '../components/sidebar.js';

let correctPlacements = 0;
let totalAttempts = 0;
let draggedElement = null;

export const PuzzlePage = () => {
  renderSidebar('puzzle');
  
  setTimeout(() => {
    initializePuzzleGame();
  }, 100);

  return `
    <div class="puzzle-container">
    <div class="puzzle-header">
      <h1 class="puzzle-title">Anatomy Puzzle Lab</h1>
      <p class="puzzle-subtitle">Put the Human Body Back Together! Drag and drop each organ to its correct place.</p>
    </div>
      
      <div class="puzzle-game">
        <!-- Organs Panel -->
        <div class="organs-panel">
          <div class="organs-grid" id="organs-grid">
            <div class="organ lungs" draggable="true" data-organ="lungs">
              <img class="organ-icon" src="assets/puzzle/paru.png" alt="Lungs" draggable="false">
            </div>
            <div class="organ heart" draggable="true" data-organ="heart">
              <img class="organ-icon" src="assets/puzzle/jantung.png" alt="Heart" draggable="false">
            </div>
            <div class="organ liver" draggable="true" data-organ="liver">
              <img class="organ-icon" src="assets/puzzle/hati.png" alt="Liver" draggable="false">
            </div>
            <div class="organ stomach" draggable="true" data-organ="stomach">
              <img class="organ-icon" src="assets/puzzle/lambung.png" alt="Stomach" draggable="false">
            </div>
            <div class="organ kidneys" draggable="true" data-organ="kidneys">
              <img class="organ-icon" src="assets/puzzle/ginjal.png" alt="Kidneys" draggable="false">
            </div>
            <div class="organ pancreas" draggable="true" data-organ="pancreas">
              <img class="organ-icon" src="assets/puzzle/pankreas.png" alt="Pancreas" draggable="false">
            </div>
            <div class="organ intestines" draggable="true" data-organ="intestines">
              <img class="organ-icon" src="assets/puzzle/usus.png" alt="Intestines" draggable="false">
            </div>
          </div>
        </div>
        
        <!-- Body Canvas -->
        <div class="body-canvas">
          <div class="human-body" id="human-body">
            <div class="drop-zone heart-zone" data-target="heart"></div>
            <div class="drop-zone lungs-zone" data-target="lungs"></div>
            <div class="drop-zone liver-zone" data-target="liver"></div>
            <div class="drop-zone stomach-zone" data-target="stomach"></div>
            <div class="drop-zone kidneys-zone" data-target="kidneys"></div>
            <div class="drop-zone kidneys-right-zone" data-target="kidneys"></div>
            <div class="drop-zone pancreas-zone" data-target="pancreas"></div>
            <div class="drop-zone intestines-zone" data-target="intestines"></div>
          </div>
        </div>
      </div>
      
      <div class="game-controls">
        <div class="score-display">
          <div class="score-item">
            <div class="score-value" id="correct-count">0</div>
            <div class="score-label">Correct</div>
          </div>
          <div class="score-item">
            <div class="score-value" id="attempts-count">0</div>
            <div class="score-label">Attempts</div>
          </div>
          <div class="score-item">
            <div class="score-value" id="accuracy">100%</div>
            <div class="score-label">Accuracy</div>
          </div>
        </div>
        <button class="reset-btn" onclick="resetGame()">Reset Game</button>
      </div>
    </div>
  `;
};

// inisialiasi puzzle game
function initializePuzzleGame() {
  const organs = document.querySelectorAll('.organ');
  const dropZones = document.querySelectorAll('.drop-zone');
  
  // Drag
  organs.forEach(organ => {
    organ.addEventListener('dragstart', handleDragStart);
    organ.addEventListener('dragend', handleDragEnd);
  });
  
  // Drop
  dropZones.forEach(zone => {
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener('dragenter', handleDragEnter);
    zone.addEventListener('dragleave', handleDragLeave);
    zone.addEventListener('drop', handleDrop);
  });
  
  updateScore();
}

function handleDragStart(e) {
  draggedElement = e.target.closest('.organ');
  e.target.closest('.organ').classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function handleDragEnd(e) {
  e.target.closest('.organ').classList.remove('dragging');
  draggedElement = null;
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  
  const allZones = document.querySelectorAll('.drop-zone');
  let highestZIndex = -1;
  let targetZone = null;
  
  allZones.forEach(zone => {
    const rect = zone.getBoundingClientRect();
    const zIndex = parseInt(getComputedStyle(zone).zIndex) || 0;
    
    if (e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
      
      if (zIndex > highestZIndex) {
        highestZIndex = zIndex;
        targetZone = zone;
      }
    }
  });
  
  allZones.forEach(zone => zone.classList.remove('active'));
  
  if (targetZone) {
    targetZone.classList.add('active');
  }
}

function handleDragEnter(e) {
  e.preventDefault();
}

function handleDragLeave(e) {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX;
  const y = e.clientY;
  
  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
    e.target.classList.remove('active');
  }
}

function handleDrop(e) {
  e.preventDefault();
  
  if (!draggedElement) return;
  
  const allZones = document.querySelectorAll('.drop-zone');
  let highestZIndex = -1;
  let targetZone = null;
  
  allZones.forEach(zone => {
    const rect = zone.getBoundingClientRect();
    const zIndex = parseInt(getComputedStyle(zone).zIndex) || 0;
    
    if (e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
      
      if (zIndex > highestZIndex) {
        highestZIndex = zIndex;
        targetZone = zone;
      }
    }
  });
  
  if (!targetZone) {
    targetZone = e.target;
  }
  
  allZones.forEach(zone => zone.classList.remove('active'));
  
  const organType = draggedElement.dataset.organ;
  const targetType = targetZone.dataset.target;

  
  totalAttempts++;
  
  if (organType === targetType) {
    correctPlacements++;
    targetZone.classList.add('correct');
    
    const placedOrgan = document.createElement('div');
    placedOrgan.className = `placed-organ ${organType}`;
    placedOrgan.innerHTML = draggedElement.querySelector('.organ-icon').outerHTML;
    placedOrgan.style.top = '50%';
    placedOrgan.style.left = '50%';
    placedOrgan.style.transform = 'translate(-50%, -50%)';
    
    targetZone.appendChild(placedOrgan);
    
    draggedElement.style.display = 'none';
    }
  
  updateScore();
}

function updateScore() {
  const correctElement = document.getElementById('correct-count');
  const attemptsElement = document.getElementById('attempts-count');
  const accuracyElement = document.getElementById('accuracy');
  
  if (correctElement) correctElement.textContent = correctPlacements;
  if (attemptsElement) attemptsElement.textContent = totalAttempts;
  
  const accuracy = totalAttempts > 0 ? Math.round((correctPlacements / totalAttempts) * 100) : 100;
  if (accuracyElement) accuracyElement.textContent = `${accuracy}%`;
}

// Reset Game
window.resetGame = function() {
  correctPlacements = 0;
  totalAttempts = 0;
  
  document.querySelectorAll('.organ').forEach(organ => {
    organ.style.display = 'flex';
  });
  
  document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.classList.remove('correct');
    zone.innerHTML = '';
    zone.style.pointerEvents = 'auto';
  });
  
  updateScore();
};