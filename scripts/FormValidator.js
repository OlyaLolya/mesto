export class FormValidator{
  constructor(validationSelectors, formElement) {
    this._formElement = formElement;
    this._inputSelector = validationSelectors.inputSelector;
    this._submitButtonSelector = validationSelectors.submitButtonSelector;
    this._inactiveButtonClass = validationSelectors.inactiveButtonClass;
    this._inputErrorClass = validationSelectors.inputErrorClass;
    this._errorClass = validationSelectors.errorClass;
  }
  enableValidation(){
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    this._setEventListeners(inputList, buttonElement);
  }
  _setEventListeners(inputList, buttonElement){
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(inputList, buttonElement);
      })
    })
  }
  _checkInputValidity(inputElement){
    if(!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _toggleButtonState(inputList, buttonElement){
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  _showInputError(inputElement, errorMessage){
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass)
  }
  _hideInputError(inputElement){
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  _hasInvalidInput(inputList){
    return inputList.some(inputElement => {
      return !inputElement.validity.valid
    })
  }
}
