export class Card {
  constructor(cardData, cardSelector, openPopup, deletePopupElem, userId, putLike, deleteLike) {
    this._cardSelector = cardSelector;
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._ownerId = cardData.owner._id;
    this._isCreatedByAccountOwner = this._ownerId === userId;
    this._countOfLikes = this._likes.length;
    this._openPopup = openPopup;
    this._deletePopupElem = deletePopupElem;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._isLikedByAccountOwner = false
    this._likes.forEach(likedUser => {
      if(likedUser._id === userId)
        this._isLikedByAccountOwner = true;
    })
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }
  createCard() {
    this._element = this._getTemplate();
    this._cardDeleteBtn = this._element.querySelector('.card__icon-delete');
    this._cardLikeBtn = this._element.querySelector('.card__icon-like');
    this._setEventListeners();
    this._likesOfCard = this._element.querySelector('.card__count-likes');
    this._element.querySelector('.card__title').textContent = this._name;
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    if(!this._isCreatedByAccountOwner)
      this._cardDeleteBtn.style.width = "0px";
    if(this._isLikedByAccountOwner) {
      this._cardLikeBtn.classList.add('card__icon-like_active')
    }
    this._likesOfCard.innerHTML = this._countOfLikes;
    return this._element;
  }
  _handleCardLike(){
    this._cardLikeBtn.addEventListener('click', () => {
      if(!this._isLikedByAccountOwner){
        this._isLikedByAccountOwner = true;
        this._likesOfCard.innerHTML = '&#8230';
        this._putLike(this._likesOfCard, this._id);
      }
      else {
        this._isLikedByAccountOwner = false;
        this._likesOfCard.innerHTML = '&#8230';
        this._deleteLike(this._likesOfCard, this._id);
      }
      this._cardLikeBtn.classList.toggle('card__icon-like_active');
    })
  }
  _handleDeleteCard() {
    this._cardDeleteBtn.addEventListener('click', () => {
      this._deletePopupElem.open();
      this._deletePopupElem.setCardId(this._element, this._id);
    })
  }
  _handleOpenPopup(){
    const cardImage = this._element.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
      this._openPopup();
    })
  }
  _setEventListeners() {
    this._handleCardLike();
    this._handleDeleteCard();
    this._handleOpenPopup();
  }
}
