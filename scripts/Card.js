import {photo, photoDescription, popupPhoto} from "./constData.js";

export class Card {
  constructor(cardData, cardSelector, openPopup) {
    this._cardSelector = cardSelector;
    this._name = cardData.name;
    this._link = cardData.link;
    this._openPopup = openPopup;
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
      this._element = undefined;
    })
  }
  _handleOpenPopup(){
    const cardImage = this._element.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
      photo.src = this._link;
      photo.alt = this._name;
      photoDescription.textContent =this._name;
      this._openPopup(popupPhoto);
    })
  }
  _setEventListeners() {
    this._handleCardLike();
    this._handleDeleteCard();
    this._handleOpenPopup();
  }
}
