export class Card {
  constructor(cardData, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = cardData.name;
    this._link = cardData.link;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.card__image');

    this._element.querySelector('.card__title').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    return this._element;
  }
  _handleCardLike(){
    const cardLikeBtn = this._element.querySelector('.card__icon-like');
    cardLikeBtn.addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__icon-like_active');
    })
  }
  _handleDeleteCard(){
    const cardDeleteBtn = this._element.querySelector('.card__icon-delete');
    cardDeleteBtn.addEventListener('click', () => {
      this._element.remove();
    })
  }
  _handleOpenPopup(){
    const cardImage = this._element.querySelector('.card__image');
    const photo = document.querySelector('.popup__photo')
    const photoDescription = document.querySelector('.popup__description')
    const popupPhoto = document.querySelector('#popup__photo');
    cardImage.addEventListener('click', () => {
      photo.src = this._link;
      photo.alt = this._name;
      photoDescription.textContent =this._name;
      popupPhoto.classList.add('popup_opened');
      document.addEventListener('click', this._handleCloseByClickAtOverlay)
      document.addEventListener('keydown', this._handleCloseByEsc)
    })
  }
  _handleClosePopup(){
    const popupPhoto = document.querySelector('#popup__photo');
    const closePhotoIcon = document.querySelector('.popup__icon-close-photo');
    closePhotoIcon.addEventListener('click', () => {
      popupPhoto.classList.remove('popup_opened');
      document.removeEventListener('click', this._handleCloseByClickAtOverlay)
      document.removeEventListener('keydown', this._handleCloseByEsc)
    });

  }
  _handleCloseByEsc(evt){
    const popupPhoto = document.querySelector('#popup__photo');
    if(evt.key === 'Escape'){
      popupPhoto.classList.remove('popup_opened');
    }
  }
  _handleCloseByClickAtOverlay(evt){
    const popupPhoto = document.querySelector('#popup__photo');
    const formElem = popupPhoto.querySelector('.popup__container')
    if(evt.target.contains(formElem))
      popupPhoto.classList.remove('popup_opened');
  }
  _setEventListeners() {
    this._handleCardLike();
    this._handleDeleteCard();
    this._handleOpenPopup();
    this._handleClosePopup();
  }
}
