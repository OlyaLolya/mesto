const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}
function enableValidation(settingsObj) {
  const formList = Array.from(document.querySelectorAll(settingsObj.formSelector))
  formList.forEach(formElement => {
    setEventListeners(formElement, settingsObj)
  })
}
function setEventListeners(formElement, settingsObj){
  const inputList = Array.from(formElement.querySelectorAll(settingsObj.inputSelector))
  const buttonElement = formElement.querySelector(settingsObj.submitButtonSelector);
  /*toggleButtonState(inputList, buttonElement, settingsObj);*/
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settingsObj)
      toggleButtonState(inputList, buttonElement, settingsObj);
    })
  })
}
function checkInputValidity(formElement, inputElement, settingsObj){
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObj);
  } else {
    hideInputError(formElement, inputElement, settingsObj);
  }
}
function toggleButtonState(inputList, buttonElement, settingsObj){
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsObj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settingsObj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function showInputError(formElement, inputElement, errorMessage, settingsObj){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(settingsObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsObj.errorClass);
}

function hideInputError(formElement, inputElement, settingsObj){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsObj.inputErrorClass);
  errorElement.classList.remove(settingsObj.errorClass);
  errorElement.textContent = '';
}

function hasInvalidInput(inputList){
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
}

enableValidation(validationSettings);
