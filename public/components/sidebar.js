const sidebarMenus = [
  {
    key: 'home',
    label: 'Home',
    href: '#/home',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36" fill="none">
    <path d="M12.9308 32.1996V17.943H21.4848V32.1996M4.37683 13.666L17.2078 3.68634L30.0387 13.666V29.3483C30.0387 30.1045 29.7383 30.8297 29.2036 31.3644C28.6689 31.8992 27.9436 32.1996 27.1874 32.1996H7.22815C6.47194 32.1996 5.74669 31.8992 5.21196 31.3644C4.67724 30.8297 4.37683 30.1045 4.37683 29.3483V13.666Z" stroke="currentColor" stroke-width="3.66599" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    key: 'courses',
    label: 'Courses',
    href: '#/courses',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="39" height="36" viewBox="0 0 39 36" fill="none">
    <path d="M19.2078 9.22247C19.2078 7.37393 18.4868 5.60111 17.2035 4.294C15.9201 2.98689 14.1795 2.25256 12.3646 2.25256H2.09985V28.3897H14.0754C15.4366 28.3897 16.742 28.9404 17.7046 29.9208C18.6671 30.9011 19.2078 32.2307 19.2078 33.6171M19.2078 9.22247V33.6171M19.2078 9.22247C19.2078 7.37393 19.9288 5.60111 21.2121 4.294C22.4955 2.98689 24.236 2.25256 26.051 2.25256H36.3157V28.3897H24.3402C22.979 28.3897 21.6735 28.9404 20.711 29.9208C19.7485 30.9011 19.2078 32.2307 19.2078 33.6171" stroke="currentColor" stroke-width="3.66599" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    key: 'quiz',
    label: 'Quiz',
    href: '#/quiz',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
    <path d="M12.218 31.9674C15.4828 31.0407 18.9329 31.0407 22.1976 31.9674M11.9329 26.3217V24.668C8.65385 22.6863 5.95935 18.8228 5.95935 14.7169C5.95935 7.65982 12.4461 2.12826 19.774 3.725C22.996 4.43783 25.8188 6.57632 27.2873 9.52744C30.2669 15.5152 27.1304 21.8737 22.5255 24.6537V26.3075C22.5255 26.7209 22.6824 27.6761 21.1569 27.6761H13.3015C11.7333 27.6904 11.9329 27.0773 11.9329 26.3217Z" stroke="currentColor" stroke-width="3.66599" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    key: 'puzzle',
    label: 'Puzzle',
    href: '#/puzzle',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15.3908 4.39C15.5165 4.51583 15.6735 4.60585 15.8456 4.6508C16.0177 4.69574 16.1987 4.69397 16.3698 4.64567C16.541 4.59738 16.6962 4.5043 16.8194 4.37604C16.9427 4.24778 17.0294 4.08897 17.0708 3.916C17.1746 3.48389 17.3918 3.08727 17.6998 2.76697C18.0079 2.44668 18.3957 2.21428 18.8235 2.09372C19.2512 1.97316 19.7033 1.96879 20.1333 2.08107C20.5633 2.19334 20.9556 2.4182 21.2697 2.73249C21.5839 3.04678 21.8087 3.43913 21.9208 3.86915C22.0329 4.29916 22.0284 4.7513 21.9077 5.17899C21.787 5.60668 21.5545 5.99446 21.2341 6.30241C20.9137 6.61036 20.517 6.82734 20.0848 6.931C19.9119 6.97239 19.7531 7.05918 19.6248 7.1824C19.4965 7.30562 19.4035 7.46081 19.3552 7.63199C19.3069 7.80317 19.3051 7.98413 19.35 8.15622C19.395 8.32831 19.485 8.48529 19.6108 8.611L21.2938 10.293C21.518 10.5172 21.6958 10.7833 21.8172 11.0762C21.9385 11.3691 22.0009 11.683 22.0009 12C22.0009 12.317 21.9385 12.6309 21.8172 12.9238C21.6958 13.2167 21.518 13.4828 21.2938 13.707L19.6108 15.39C19.4851 15.5158 19.3281 15.6059 19.1561 15.6508C18.984 15.6957 18.803 15.694 18.6318 15.6457C18.4607 15.5974 18.3055 15.5043 18.1822 15.376C18.059 15.2478 17.9722 15.089 17.9308 14.916C17.827 14.4839 17.6099 14.0873 17.3019 13.767C16.9938 13.4467 16.606 13.2143 16.1782 13.0937C15.7505 12.9732 15.2984 12.9688 14.8684 13.0811C14.4384 13.1933 14.0461 13.4182 13.7319 13.7325C13.4178 14.0468 13.193 14.4391 13.0809 14.8691C12.9688 15.2992 12.9733 15.7513 13.094 16.179C13.2147 16.6067 13.4472 16.9945 13.7676 17.3024C14.088 17.6104 14.4847 17.8273 14.9168 17.931C15.0898 17.9724 15.2486 18.0592 15.3769 18.1824C15.5051 18.3056 15.5982 18.4608 15.6465 18.632C15.6948 18.8032 15.6966 18.9841 15.6516 19.1562C15.6067 19.3283 15.5167 19.4853 15.3908 19.611L13.7078 21.293C13.4837 21.5172 13.2176 21.695 12.9247 21.8163C12.6318 21.9376 12.3179 22.0001 12.0008 22.0001C11.6838 22.0001 11.3699 21.9376 11.077 21.8163C10.7841 21.695 10.518 21.5172 10.2938 21.293L8.61084 19.61C8.48514 19.4842 8.32815 19.3941 8.15606 19.3492C7.98397 19.3043 7.80301 19.306 7.63183 19.3543C7.46066 19.4026 7.30546 19.4957 7.18224 19.624C7.05902 19.7522 6.97224 19.911 6.93084 20.084C6.82704 20.5161 6.60993 20.9127 6.30187 21.233C5.99382 21.5533 5.60596 21.7857 5.17823 21.9063C4.7505 22.0268 4.29836 22.0312 3.86838 21.9189C3.4384 21.8067 3.04612 21.5818 2.73194 21.2675C2.41776 20.9532 2.19303 20.5609 2.08089 20.1308C1.96876 19.7008 1.97328 19.2487 2.09398 18.821C2.21468 18.3933 2.44721 18.0055 2.76761 17.6976C3.08801 17.3896 3.4847 17.1727 3.91684 17.069C4.08982 17.0276 4.24862 16.9408 4.37688 16.8176C4.50514 16.6944 4.59822 16.5392 4.64652 16.368C4.69481 16.1968 4.69658 16.0159 4.65164 15.8438C4.6067 15.6717 4.51667 15.5147 4.39084 15.389L2.70784 13.707C2.48367 13.4828 2.30584 13.2167 2.18452 12.9238C2.0632 12.6309 2.00075 12.317 2.00075 12C2.00075 11.683 2.0632 11.3691 2.18452 11.0762C2.30584 10.7833 2.48367 10.5172 2.70784 10.293L4.39084 8.61C4.51654 8.48417 4.67353 8.39414 4.84562 8.3492C5.01771 8.30426 5.19867 8.30602 5.36985 8.35432C5.54102 8.40262 5.69622 8.49569 5.81944 8.62396C5.94266 8.75222 6.02944 8.91102 6.07084 9.084C6.17465 9.5161 6.39175 9.91272 6.69981 10.233C7.00786 10.5533 7.39572 10.7857 7.82345 10.9063C8.25118 11.0268 8.70332 11.0312 9.1333 10.9189C9.56328 10.8067 9.95556 10.5818 10.2697 10.2675C10.5839 9.95322 10.8087 9.56086 10.9208 9.13085C11.0329 8.70083 11.0284 8.2487 10.9077 7.82101C10.787 7.39332 10.5545 7.00553 10.2341 6.69758C9.91367 6.38964 9.51698 6.17266 9.08484 6.069C8.91186 6.0276 8.75306 5.94082 8.6248 5.8176C8.49654 5.69438 8.40346 5.53918 8.35516 5.368C8.30687 5.19682 8.3051 5.01586 8.35004 4.84378C8.39498 4.67169 8.48501 4.5147 8.61084 4.389L10.2938 2.707C10.518 2.48282 10.7841 2.305 11.077 2.18368C11.3699 2.06235 11.6838 1.99991 12.0008 1.99991C12.3179 1.99991 12.6318 2.06235 12.9247 2.18368C13.2176 2.305 13.4837 2.48282 13.7078 2.707L15.3908 4.39Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
  },
  {
    key: 'profile',
    label: 'Profile',
    href: '#/profile',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
    <g clip-path="url(#clip0_38_5360)"> <path d="M17.2078 3.23013C9.33814 3.23013 2.95117 9.6171 2.95117 17.4868C2.95117 25.3564 9.33814 31.7434 17.2078 31.7434C25.0774 31.7434 31.4644 25.3564 31.4644 17.4868C31.4644 9.6171 25.0774 3.23013 17.2078 3.23013ZM17.2078 7.50712C19.5744 7.50712 21.4848 9.41751 21.4848 11.7841C21.4848 14.1507 19.5744 16.0611 17.2078 16.0611C14.8412 16.0611 12.9308 14.1507 12.9308 11.7841C12.9308 9.41751 14.8412 7.50712 17.2078 7.50712ZM17.2078 27.7515C13.6436 27.7515 10.4929 25.9267 8.65382 23.1609C8.69659 20.3238 14.3565 18.7698 17.2078 18.7698C20.0449 18.7698 25.719 20.3238 25.7618 23.1609C23.9227 25.9267 20.7719 27.7515 17.2078 27.7515Z" fill="currentColor"/> </g>
    <defs><clipPath id="clip0_38_5360"><rect width="34.2159" height="34.2159" fill="white" transform="translate(0.0998535 0.378784)"/></clipPath> </defs>
    </svg>`
  }
];

// mobile menu state
let isMobileMenuOpen = false;

export function renderSidebar(activeKey) {
  const sidebarHTML = `
    <!-- Desktop Sidebar -->
    <nav class="sidebar">
      <div class="sidebar-logo">
        <img src="./assets/logo.png" alt="AnatoLearn Logo" />
      </div>
      <ul class="sidebar-menu">
        ${sidebarMenus.map(menu => `
          <li>
            <a href="${menu.href}" class="sidebar-link${menu.key === activeKey ? ' active' : ''}">
              <span class="sidebar-icon">${menu.icon}</span>
              <span class="sidebar-label">${menu.label}</span>
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>
    
    <!-- Mobile Navbar -->
    <nav class="mobile-navbar">
      <div class="mobile-navbar-content">
        <div class="mobile-logo">
          <img src="./assets/logo.png" alt="AnatoLearn Logo" />
        </div>
        <button class="hamburger-menu" id="hamburgerMenu">
          <div class="hamburger-icon">
            <div class="hamburger-line"></div>
            <div class="hamburger-line"></div>
            <div class="hamburger-line"></div>
          </div>
        </button>
      </div>
    </nav>
    
    <!-- Mobile Dropdown -->
    <div class="mobile-dropdown" id="mobileDropdown">
      <ul class="mobile-dropdown-menu">
        ${sidebarMenus.map(menu => `
          <li>
            <a href="${menu.href}" class="mobile-dropdown-link${menu.key === activeKey ? ' active' : ''}" data-href="${menu.href}">
              <span class="sidebar-icon">${menu.icon}</span>
              <span class="sidebar-label">${menu.label}</span>
            </a>
          </li>
        `).join('')}
      </ul>
    </div>
    
    <!-- Mobile Overlay -->
    <div class="mobile-overlay" id="mobileOverlay"></div>
  `;
  
  const oldSidebar = document.querySelector('.sidebar');
  const oldMobileNavbar = document.querySelector('.mobile-navbar');
  const oldMobileDropdown = document.querySelector('.mobile-dropdown');
  const oldMobileOverlay = document.querySelector('.mobile-overlay');
  
  if (oldSidebar) oldSidebar.remove();
  if (oldMobileNavbar) oldMobileNavbar.remove();
  if (oldMobileDropdown) oldMobileDropdown.remove();
  if (oldMobileOverlay) oldMobileOverlay.remove();

  document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
  
  setupMobileMenu();
}

function setupMobileMenu() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileDropdown = document.getElementById('mobileDropdown');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileDropdownLinks = document.querySelectorAll('.mobile-dropdown-link');
  
  if (!hamburgerMenu || !mobileDropdown || !mobileOverlay) return;
  
  hamburgerMenu.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);
  
  mobileDropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeMobileMenu();
    });
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });
  
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  if (isMobileMenuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileDropdown = document.getElementById('mobileDropdown');
  const mobileOverlay = document.getElementById('mobileOverlay');
  
  isMobileMenuOpen = true;
  
  hamburgerMenu.classList.add('active');
  mobileDropdown.classList.add('show');
  mobileOverlay.classList.add('show');
  
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileDropdown = document.getElementById('mobileDropdown');
  const mobileOverlay = document.getElementById('mobileOverlay');
  
  isMobileMenuOpen = false;
  
  if (hamburgerMenu) hamburgerMenu.classList.remove('active');
  if (mobileDropdown) mobileDropdown.classList.remove('show');
  if (mobileOverlay) mobileOverlay.classList.remove('show');
  
  document.body.style.overflow = '';
}

export { setupMobileMenu, closeMobileMenu };