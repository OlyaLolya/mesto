export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

//контейнер для карточек
export const cardsContainer = '.cards';
//имя и описание для профиля из формы
export const nameInput = document.querySelector('.form__input_data_heading');
export const jobInput = document.querySelector('.form__input_data_description');
//url аватара из формы
export const avatarUrl = document.querySelector('.form__input_avatar_url');
//элементы фото и описание к фото
export const photo = document.querySelector('.popup__photo')
export const photoDescription = document.querySelector('.popup__description')
//инфа в профиле
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const profilePhoto = document.querySelector('.profile__photo');
//элементы
export const editFormElement = document.querySelector('.edit-form');
export const addFormElement = document.querySelector('.add-form');
export const avatarFormElement = document.querySelector('.avatar-form');
//попапы
export const popupProfileEdit = document.querySelector('#popup__edit');
export const popupAddCard = document.querySelector('#popup__add');
export const popupPhoto = document.querySelector('#popup__photo');
export const popupDelete = document.querySelector('#popup__delete');
export const popupAvatarEdit = document.querySelector('#popup__avatar');
//кнопки на странице
export const editIcon = document.querySelector('.profile__edit-button');
export const addIcon = document.querySelector('.profile__add-button');
export const editAvatar = document.querySelector('.profile__avatar-container')
//клавиша esc
export const escKey = 'Escape'

export const formInput = '.form__input'
