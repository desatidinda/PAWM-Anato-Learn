export const SignupPage = () => `
  <div class="signup-container">
    <div class="signup-image">
    </div>

    <div class="signup-form">
        <h1 class="signup-title">Sign Up</h1>

        <div class="signup-inputs-section">
            <div class="input-wrapper">
            <img src="assets/mail.svg" alt="email" class="input-icon">
            <input 
                type="email" 
                id="signupEmail" 
                class="signup-input"
                placeholder="email address"
                required
            >
            </div>

            <div class="input-wrapper">
            <img src="assets/username.svg" alt="username" class="input-icon">
            <input 
                type="text" 
                id="signupUsername" 
                class="signup-input"
                placeholder="username"
                required
            >
            </div>

            <div class="input-wrapper">
            <img src="assets/pass.svg" alt="password" class="input-icon">
            <input 
                type="password" 
                id="signupPassword" 
                class="signup-input"
                placeholder="password"
                required
            >
            </div>

            <div class="input-wrapper">
            <img src="assets/confirmpass.png" alt="confirm password" class="input-icon">
            <input 
                type="password" 
                id="signupConfirmPassword" 
                class="signup-input"
                placeholder="confirm password"
                required
            >
            </div>

        </div>

        <div class="signup-actions-section">
            <button type="submit" class="signup-button" id="signupButton">Sign Up</button>

            <div class="signin-link">
                Already have an account? <a href="#" id="goToSignin">Sign In</a>
            </div>
        </div>
    </div>
`;