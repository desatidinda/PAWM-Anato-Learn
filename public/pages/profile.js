import { renderSidebar } from '../components/sidebar.js';

export const ProfilePage = () => {
  renderSidebar('profile');
  return `
    <div class="profile-page">
      <div class="profile-header">
        <h1>Profile</h1>
      </div>
      
      <div class="profile-container">
        <div class="profile-picture">
          <!-- Profile picture from assets/defaultprofile.jpg -->
        </div>
        
        <div class="profile-info-frame">
          <div class="profile-name" id="userDisplayName">Loading...</div>
          <input type="text" class="profile-name-edit" id="userDisplayNameEdit" style="display: none;">
          
          <div class="profile-email" id="userEmail">Loading...</div>
        
          <button id="changeUsername" class="change-username-btn">
            <span id="buttonText">Change user name</span>
          </button>
        </div>
        
        <button id="logout" class="logout-btn">
          SIGN OUT
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M22.4 2.66699H18.9333C14.6667 2.66699 12 5.33366 12 9.60033V15.0003H20.3333C20.88 15.0003 21.3333 15.4537 21.3333 16.0003C21.3333 16.547 20.88 17.0003 20.3333 17.0003H12V22.4003C12 26.667 14.6667 29.3337 18.9333 29.3337H22.3867C26.6533 29.3337 29.32 26.667 29.32 22.4003V9.60033C29.3333 5.33366 26.6667 2.66699 22.4 2.66699Z" fill="white"/>
            <path d="M6.07931 15.0004L8.83931 12.2404C9.03931 12.0404 9.13264 11.7871 9.13264 11.5338C9.13264 11.2804 9.03931 11.0138 8.83931 10.8271C8.45265 10.4404 7.81265 10.4404 7.42598 10.8271L2.95931 15.2938C2.57264 15.6804 2.57264 16.3204 2.95931 16.7071L7.42598 21.1738C7.81265 21.5604 8.45265 21.5604 8.83931 21.1738C9.22598 20.7871 9.22598 20.1471 8.83931 19.7604L6.07931 17.0004H11.9993V15.0004H6.07931V15.0004Z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>
  `;
};