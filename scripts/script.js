//имя и описание для профиля из формы
let nameInput = document.querySelector('.form__input_data_heading');
let jobInput = document.querySelector('.form__input_data_description');
//имя и ссылка для карточки из формы
let newCardName = document.querySelector('.form__input_card_heading');
let newCardLink = document.querySelector('.form__input_card_link');
//элементы фото и описание к фото
let photo = document.querySelector('.photo')
let photoDescription = document.querySelector('.photo__description')
//инфа в профиле
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
//элементы
let editFormElement = document.querySelector('.edit-form');
let addFormElement = document.querySelector('.add-form');
//иконки закрытия
let closeEditFormIcon = document.querySelector('.popup__icon-close-edit-form');
let closeAddFormIcon = document.querySelector('.popup__icon-close-add-form');
let closePhotoIcon = document.querySelector('.popup__icon-close-photo');
//попапы
let popupProfileEdit = document.querySelector('.popup__edit');
let popupAddCard = document.querySelector('.popup__add');
let popupPhoto = document.querySelector('.popup__photo');
//кнопки на странице
let editIcon = document.querySelector('.profile__edit-button');
let addIcon = document.querySelector('.profile__add-button');

const cardsContainer = document.querySelector('.cards');

function closePopup(popupElement){
  popupElement.classList.remove('popup_opened');
}
function openPopup(popupElement){
  popupElement.classList.add('popup_opened');
}
function editFormSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}
function addFormSubmitHandler(evt){
  evt.preventDefault();
  addCard(newCardName.value, newCardLink.value)
  closePopup(popupAddCard)
}
function addCard(cardName, cardLink){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').src = cardLink;

  //лайк карточки
  cardElement.querySelector('.card__icon-like').addEventListener('click', function (evt){
    evt.target.classList.toggle('card__icon-like_disabled');
    evt.target.classList.toggle('card__icon-like_active');
  })
  //удаление карточки
  cardElement.querySelector('.card__icon-delete').addEventListener('click', () => {
    cardElement.remove();
  })
  //открытие попапа с фото
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    photo.src = cardLink
    photoDescription.textContent = cardName;
    openPopup(popupPhoto)
  })
  cardsContainer.prepend(cardElement)
}

/*const cards = document.querySelectorAll('.card');
cards.forEach(card => card.remove());*/

//формируем галерею карточек
initialCards.forEach((card) => {
    addCard(card.name, card.link)
  }
)
//обработчики закрытия
closeEditFormIcon.addEventListener('click', () => closePopup(popupProfileEdit));
closeAddFormIcon.addEventListener('click', () => closePopup(popupAddCard));
closePhotoIcon.addEventListener('click', () => closePopup(popupPhoto));

//обработка кнопок на странице
editIcon.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent
  openPopup(popupProfileEdit)
});
addIcon.addEventListener('click', () => openPopup(popupAddCard));

//обработчики сабмитов
editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

