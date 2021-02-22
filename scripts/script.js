//имя и описание для профиля из формы
const nameInput = document.querySelector('.form__input_data_heading');
const jobInput = document.querySelector('.form__input_data_description');
//имя и ссылка для карточки из формы
const newCardName = document.querySelector('.form__input_card_heading');
const newCardLink = document.querySelector('.form__input_card_link');
//элементы фото и описание к фото
const photo = document.querySelector('.popup__photo')
const photoDescription = document.querySelector('.popup__description')
//инфа в профиле
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//элементы
const editFormElement = document.querySelector('.edit-form');
const addFormElement = document.querySelector('.add-form');
//иконки закрытия
const closeEditFormIcon = document.querySelector('.popup__icon-close-edit-form');
const closeAddFormIcon = document.querySelector('.popup__icon-close-add-form');
const closePhotoIcon = document.querySelector('.popup__icon-close-photo');
//попапы
const popupProfileEdit = document.querySelector('#popup__edit');
const popupAddCard = document.querySelector('#popup__add');
const popupPhoto = document.querySelector('#popup__photo');
//кнопки на странице
const editIcon = document.querySelector('.profile__edit-button');
const addIcon = document.querySelector('.profile__add-button');
//контейнер для карточек
const cardsContainer = document.querySelector('.cards');
//шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

const oneCard = cardTemplate.querySelector('.card');

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEcs);
  document.removeEventListener('click', closeByClickAtOverlay)
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEcs)
  document.addEventListener('click', closeByClickAtOverlay)

}

function closeByClickAtOverlay(evt){
  const openedPopup = document.querySelector('.popup_opened');
  const formElem = openedPopup.querySelector('.popup__container')
  if(evt.target.contains(formElem))
    closePopup(openedPopup)
}
function closeByEcs(evt){
  const openedPopup = document.querySelector('.popup_opened')
  if(evt.key === 'Escape'){
    closePopup(openedPopup)
  }
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard(createCard(newCardName.value, newCardLink.value), cardsContainer)
  newCardName.value = "";
  newCardLink.value = "";
  closePopup(popupAddCard)
}

function handlePreviewPicture(fullPhoto) {
  photo.src = fullPhoto.link;
  photo.alt = fullPhoto.name;
  photoDescription.textContent = fullPhoto.name;
  openPopup(popupPhoto)
}

function createCard(cardName, cardLink) {
  const cardElement = oneCard.cloneNode(true);

  const cardLikeBtn = cardElement.querySelector('.card__icon-like');
  const cardDeleteBtn = cardElement.querySelector('.card__icon-delete');
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  //лайк карточки
  cardLikeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__icon-like_active');
  })
  //удаление карточки
  cardDeleteBtn.addEventListener('click', () => {
    cardElement.remove();
  })
  //открытие попапа с фото
  cardImage.addEventListener('click', () => {
    handlePreviewPicture({name: cardName, link: cardLink})
  })
  return cardElement;
}

function renderCard(data, wrap) {
  wrap.prepend(data)
}

//формируем галерею карточек
initialCards.forEach((data) => {
  renderCard(createCard(data.name, data.link), cardsContainer)
})

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

