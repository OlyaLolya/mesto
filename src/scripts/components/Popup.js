import * as constData from '../utils/constData.js'

export class Popup{
  constructor(popupSelector) {
    this._element = popupSelector;
    this._formElem = this._element.querySelector('.popup__container')
    this._closeButton = this._element.querySelector('.popup__icon-close')
    this.setEventListeners();
  }
  open(){
    this._element.classList.add('popup_opened');
  }
  close(){
    this._element.classList.remove('popup_opened');
  }
  _handleEscClose(){
    document.addEventListener('keydown', (evt) => {
      if(evt.key === constData.escKey)
        this.close()
    });
  }
  _handleOverlayClose(){
    this._element.addEventListener('click', (evt) => {
      if(evt.target.contains(this._formElem))
        this.close()
    });
  }
  setEventListeners(){
    this._closeButton.addEventListener('click', () => this.close())
    this._handleOverlayClose();
    this._handleEscClose();
  }
}
