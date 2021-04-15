import './index.css';
import {Card} from "../scripts/components/Card.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {Section} from "../scripts/components/Section.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage.js";
import {PopupWithForm} from "../scripts/components/PopupWithForm.js";
import {UserInfo} from "../scripts/components/UserInfo.js";
import {Api} from '../scripts/components/Api.js';
import * as constData from "../scripts/utils/constData.js"

//экземпляры валидации
const validateEditForm = new FormValidator(constData.validationSettings, constData.editFormElement);
const validateAddForm = new FormValidator(constData.validationSettings, constData.addFormElement);
const validateAvatarEditForm = new FormValidator(constData.validationSettings, constData.avatarFormElement);
//экземпляр юзера
const user = new UserInfo(constData.profileName, constData.profileDescription, constData.profilePhoto)
//экземпляр апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
  headers: {
    authorization: '67fb5242-644a-424c-b1b4-e82b266c66c5'
  }
});
//экземпляр секции
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, constData.cardsContainer);
//функции
const addFormSubmitHandler = function (data) {
  api.addNewCard(data)
    .then(result => {
      cardList.addItem(createCard(result));
      addPopup.close();
    })
    .catch(err => {
      console.log(err)
    })
}
const editFormSubmitHandler = function (data) {
  api.editProfile(data)
    .then((result) => {
      user.setUserInfo(result);
      editPopup.close()
    })
    .catch(err => {
      console.log(err)
    })
}
const avatarEditFormSubmitHandler = function (data) {
  api.changeAvatar(data)
    .then(result => {
      user.setUserInfo(result);
      constData.profilePhoto.src = result.avatar;
      avatarEditPopup.close()
    })
    .catch(err => {
      console.log(err)
    })
}
const deleteCardFormSubmitHandler = function (card, cardId) {
  api.deleteCard(cardId)
    .then(() => {
      card.remove();
      deletePopup.close()
    })
    .catch(err => {
      console.log(err)
    })
}
const putLikeHandler = function (countOfLikes, cardId) {
  api.putLike(cardId)
    .then(result => {
      countOfLikes.innerHTML = result.likes.length;
    })
    .catch(err => {
      console.log(err)
    })
}
const deleteLikeHandler = function (countOfLikes, cardId) {
  api.deleteLike(cardId)
    .then(result => {
      countOfLikes.innerHTML = result.likes.length;
    })
    .catch(err => {
      console.log(err)
    })
}

function createCard(item) {
  const {_id} = user.getUserInfo()
  const card = new Card(item,
    '#card-template',
    () => popupWithImage.open(item),
    deletePopup,
    _id,
    putLikeHandler,
    deleteLikeHandler
  );
  return card.createCard();
}

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([userData, initialCards]) => {
    user.setUserInfo(userData);
    constData.profileName.textContent = userData.name;
    constData.profileDescription.textContent = userData.about;
    constData.profilePhoto.src = userData.avatar;
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

//экземпляры попапов
const popupWithImage = new PopupWithImage(constData.photo, constData.photoDescription, constData.popupPhoto)
const deletePopup = new PopupWithForm(constData.formInput, deleteCardFormSubmitHandler, constData.popupDelete)
const editPopup = new PopupWithForm(constData.formInput, editFormSubmitHandler, constData.popupProfileEdit)
const addPopup = new PopupWithForm(constData.formInput, addFormSubmitHandler, constData.popupAddCard)
const avatarEditPopup = new PopupWithForm(constData.formInput, avatarEditFormSubmitHandler, constData.popupAvatarEdit)

//слушатель клика по кнопке редактирования профиля
constData.editIcon.addEventListener('click', () => {
  editPopup.open()
  const {name, about} = user.getUserInfo()
  constData.nameInput.value = name;
  constData.jobInput.value = about;
});
//слушатель клика по кнопке добавления карточки
constData.addIcon.addEventListener('click', () => {
  validateAddForm.toggleButtonState()
  addPopup.open()
});
//лушатель клика по кнопке смены аватара
constData.editAvatar.addEventListener('click', () => {
  avatarEditPopup.open();
  const {avatar} = user.getUserInfo();
  constData.avatarUrl.value = avatar;
})

//валидация форм
validateEditForm.enableValidation();
validateAddForm.enableValidation();
validateAvatarEditForm.enableValidation();
