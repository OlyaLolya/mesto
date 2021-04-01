export class Popup{
  constructor(popupSelector) {
    this._element = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this)
    this._formElem = this._element.querySelector('.popup__container')
    this._closeButton = this._element.querySelector('.popup__icon-close')
    this.setEventListeners();
  }
  open(){
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }
  close(){
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }
  _handleEscClose(evt){
    if(evt.key === 'Escape')
      this.close()
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
  }
}
