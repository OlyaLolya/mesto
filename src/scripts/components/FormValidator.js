export class FormValidator{
  constructor(validationSelectors, formElement) {
    this._formElement = formElement;
    this._inputSelector = validationSelectors.inputSelector;
    this._submitButtonSelector = validationSelectors.submitButtonSelector;
    this._inactiveButtonClass = validationSelectors.inactiveButtonClass;
    this._inputErrorClass = validationSelectors.inputErrorClass;
    this._errorClass = validationSelectors.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }
  enableValidation(){
    this._setEventListeners();
  }
  _setEventListeners(){
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this.toggleButtonState();
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
  toggleButtonState(){
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
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
  _hasInvalidInput(){
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid
    })
  }
}
