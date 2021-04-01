import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(formInput ,formSubmitHandler, popupSelector) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._inputList = Array.from(this._element.querySelectorAll(formInput));
    this._formInputValues = {};
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
  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues())
      this.close()
    })
  }
}
