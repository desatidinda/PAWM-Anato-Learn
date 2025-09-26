export const SigninPage = () => `
  <div class="signin-container">
    <div class="signin-image">
    </div>
    
    <div class="signin-form">
      <h1 class="signin-title">Sign in</h1>
      
      <div class="signin-inputs-section">
        <div class="input-wrapper">
          <img src="assets/mail.svg" alt="email" class="input-icon">
          <input 
            type="email" 
            id="signinEmail" 
            class="signin-input"
            placeholder="email address"
            required
          >
        </div>
        
        <div class="input-wrapper">
          <img src="assets/pass.svg" alt="password" class="input-icon">
          <input 
            type="password" 
            id="signinPassword" 
            class="signin-input"
            placeholder="password"
            required
          >
        </div>
        
        <a href="#" class="forgot-password">Forgot password?</a>
      </div>
      
      <div class="signin-actions-section">
        <button type="submit" class="signin-button" id="signinButton">Sign in</button>
        
        <div class="signup-link">
          Don't have an account? <a href="#" id="goToSignup">Sign up</a>
        </div>
      </div>
    </div>
  </div>
`;