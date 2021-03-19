export const initialCards = [
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
export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

//контейнер для карточек
export const cardsContainer = document.querySelector('.cards');
//имя и описание для профиля из формы
export const nameInput = document.querySelector('.form__input_data_heading');
export const jobInput = document.querySelector('.form__input_data_description');
//имя и ссылка для карточки из формы
export const newCardName = document.querySelector('.form__input_card_heading');
export const newCardLink = document.querySelector('.form__input_card_link');
//элементы фото и описание к фото
export const photo = document.querySelector('.popup__photo')
export const photoDescription = document.querySelector('.popup__description')
//инфа в профиле
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
//элементы
export const editFormElement = document.querySelector('.edit-form');
export const addFormElement = document.querySelector('.add-form');
//иконки закрытия
export const closeEditFormIcon = document.querySelector('.popup__icon-close-edit-form');
export const closeAddFormIcon = document.querySelector('.popup__icon-close-add-form');
export const closePhotoIcon = document.querySelector('.popup__icon-close-photo');
//попапы
export const popupProfileEdit = document.querySelector('#popup__edit');
export const popupAddCard = document.querySelector('#popup__add');
export const popupPhoto = document.querySelector('#popup__photo');
//кнопки на странице
export const editIcon = document.querySelector('.profile__edit-button');
export const addIcon = document.querySelector('.profile__add-button');
export const cardFormSubmitButton = addFormElement.querySelector('.form__button')
//клавиша esc
export const escKey = 'Escape'
