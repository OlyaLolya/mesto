import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(formInput ,formSubmitHandler, popupSelector) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._inputList = Array.from(this._element.querySelectorAll(formInput));
    this._formInputValues = {};
    this._submitButton = this._element.querySelector('.form__button');
  }
  _getInputValues(){
    this._inputList.forEach(inputItem => {
      this._formInputValues[inputItem.name] = inputItem.value;
    })
    return this._formInputValues;
  }
  close() {
    super.close();
    this._inputList.forEach(inputItem => {
      inputItem.value = "";
    })
  }
  setCardId(card, cardId){
    this._cardId = cardId;
    this._card = card
  }
  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if(this._cardId){
        this._formSubmitHandler(this._card, this._cardId)
        this.close();
        this._submitButton.value = 'Сохранение...';
        return  0;
      }
      this._formSubmitHandler(this._getInputValues())
      this._submitButton.value = 'Сохранение...';
      this.close();
    })
  }
}
