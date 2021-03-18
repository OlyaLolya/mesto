import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

//контейнер для карточек
const cardsContainer = document.querySelector('.cards');
//имя и описание для профиля из формы
const nameInput = document.querySelector('.form__input_data_heading');
const jobInput = document.querySelector('.form__input_data_description');
//имя и ссылка для карточки из формы
const newCardName = document.querySelector('.form__input_card_heading');
const newCardLink = document.querySelector('.form__input_card_link');
//инфа в профиле
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//элементы
const editFormElement = document.querySelector('.edit-form');
const addFormElement = document.querySelector('.add-form');
//иконки закрытия
const closeEditFormIcon = document.querySelector('.popup__icon-close-edit-form');
const closeAddFormIcon = document.querySelector('.popup__icon-close-add-form');
//попапы
const popupProfileEdit = document.querySelector('#popup__edit');
const popupAddCard = document.querySelector('#popup__add');
//кнопки на странице
const editIcon = document.querySelector('.profile__edit-button');
const addIcon = document.querySelector('.profile__add-button');
const cardFormSubmitButton = addFormElement.querySelector('.form__button')
//массив форм
const formList = Array.from(document.querySelectorAll('.form'))

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
  const item = {name: newCardName.value, link: newCardLink.value}
  const card = new Card(item, '#card-template');
  const veryNewCard = card.createCard();
  cardsContainer.prepend(veryNewCard);
  newCardName.value = "";
  newCardLink.value = "";
  closePopup(popupAddCard);
  cardFormSubmitButton.classList.add(validationSettings.inactiveButtonClass);
}

initialCards.forEach(item => {
  const card = new Card(item, '#card-template');
  const veryNewCard = card.createCard();
  cardsContainer.prepend(veryNewCard);
})

//обработчики закрытия
closeEditFormIcon.addEventListener('click', () => closePopup(popupProfileEdit));
closeAddFormIcon.addEventListener('click', () => closePopup(popupAddCard));

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


formList.forEach(formElement => {
  const form = new FormValidator(validationSettings, formElement)
  form.enableValidation();
})

