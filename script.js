const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('login_email_or_phone');
const passwordInput = document.getElementById('login_password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (emailValue === '') {
    emailError.textContent = 'Please enter your email or phone number';
  } else if (!validateEmail(emailValue)) {
    emailError.textContent = 'Please enter a valid email address';
  } else if (!validatePhoneNumber(emailValue)) {
    emailError.textContent = 'Please enter a valid phone number';
  } else {
    emailError.textContent = '';
  }

  if (passwordValue === '') {
    passwordError.textContent = 'Please enter your password';
  } else if (passwordValue.length < 8) {
    passwordError.textContent = 'Please enter a password with at least 8 characters';
  } else if (!validatePasswordStrength(passwordValue)) {
    passwordError.textContent = 'Please enter a stronger password';
  } else {
    passwordError.textContent = '';
  }

  if (emailError.textContent === '' && passwordError.textContent === '') {
    // Form is valid, submit the form
    loginForm.submit();
  }
});

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneNumberRegex.test(phoneNumber);
}

function validatePasswordStrength(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}


const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const phoneNumberInput = document.getElementById('phone_number');
const confirmPasswordInput = document.getElementById('confirm_password');
const policyInput = document.getElementById('remember-policy');
const nameError = document.getElementById('name-error');
const phoneError = document.getElementById('phone-error');
const confirmPasswordError = document.getElementById('confirm-password-error');
const policyError = document.getElementById('policy-error');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const phoneNumberValue = phoneNumberInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  const policyValue = policyInput.checked;

  if (nameValue === '') {
    nameError.textContent = 'Please enter your name';
  } else {
    nameError.textContent = '';
  }

  if (emailValue === '') {
    emailError.textContent = 'Please enter your email';
  } else if (!validateEmail(emailValue)) {
    emailError.textContent = 'Please enter a valid email address';
  } else {
    emailError.textContent = '';
  }

  if (phoneNumberValue === '') {
    phoneError.textContent = 'Please enter your phone number';
  } else if (!validatePhoneNumber(phoneNumberValue)) {
    phoneError.textContent = 'Please enter a valid phone number';
  } else {
    phoneError.textContent = '';
  }

  if (passwordValue === '') {
    passwordError.textContent = 'Please enter your password';
  } else if (passwordValue.length < 8) {
    passwordError.textContent = 'Please enter a password with at least 8 characters';
  } else if (!validatePasswordStrength(passwordValue)) {
    passwordError.textContent = 'Please enter a stronger password';
  } else {
    passwordError.textContent = '';
  }

  if (confirmPasswordValue === '') {
    confirmPasswordError.textContent = 'Please confirm your password';
  } else if (confirmPasswordValue !== passwordValue) {
    confirmPasswordError.textContent = 'Passwords do not match';
  } else {
    confirmPasswordError.textContent = '';
  }

  if (!policyValue) {
    policyError.textContent = 'Please accept the company privacy policy';
  } else {
    policyError.textContent = '';
  }

  if (nameError.textContent === '' && emailError.textContent === '' && phoneError.textContent === '' && passwordError.textContent === '' && confirmPasswordError.textContent === '' && policyError.textContent === '') {
    // Form is valid, submit the form
    registerForm.submit();
  }
});

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneNumberRegex.test(phoneNumber);
}

function validatePasswordStrength(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}


