const formElement = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (control, msg) => {
  control.classList.remove('success');
  control.classList.add('error');
  control.querySelector('small').innerText = msg;
};

const showSuccess = (control) => {
  control.classList.remove('error');
  control.classList.add('success');
}

const getInputName = (inputId) => {
  return inputId.charAt(0).toUpperCase() + inputId.slice(1);
}

const checkRequired = (formControl) => {
  const requiredInput = formControl.querySelector('input');
  if (requiredInput.value.trim().length === 0) showError(formControl, `${getInputName(requiredInput.id)} is required`);
};

const checkLength = (inputElement, minLength) => {
  const inputLen = inputElement.value.trim().length;
  const parentControl = inputElement.parentElement;
  if (inputLen < minLength) return showError(parentControl, `${getInputName(inputElement.id)} must be at least ${minLength} characters`);

  showSuccess(parentControl);
};

const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const checkEmail = (email) => {
  const emailControl = email.parentElement;
  isValidEmail(email.value) ? showSuccess(emailControl) : showError(emailControl, 'Email is not valid');
};

const checkPassword = (pwdInput, pwdInput2) => {
  const pwdInputValue = pwdInput.value.trim();
  const pwdInput2Value = pwdInput2.value.trim();
  const pwd2Control = pwdInput2.parentElement;
  if (!pwdInputValue && !pwdInput2Value) return;

  if(pwdInputValue !== pwdInput2Value) return showError(pwd2Control, 'Passwords do not match');

  showSuccess(pwd2Control);
};

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  checkLength(username, 3);
  checkLength(password, 4);
  checkEmail(email);
  checkPassword(password, password2);
  formElement.querySelectorAll('.required').forEach(checkRequired);
});
