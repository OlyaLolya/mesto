import './index.css';
import {Card} from "../scripts/components/Card.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {Section} from "../scripts/components/Section.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage.js";
import {PopupWithForm} from "../scripts/components/PopupWithForm.js";
import {UserInfo} from "../scripts/components/UserInfo.js";
import * as constData from "../scripts/utils/constData.js"

//экземпляры валидации
export const validateEditForm = new FormValidator(constData.validationSettings, constData.editFormElement);
export const validateAddForm = new FormValidator(constData.validationSettings, constData.addFormElement);
//экземпляр юзера
const user = new UserInfo(constData.profileName, constData.profileDescription)
//функции
const addFormSubmitHandler = function (data){
  cardList.addItem(createCard(data));
}
const editFormSubmitHandler = function (data) {
  user.setUserInfo(data);
}
function createCard(item){
  const card = new Card(item, '#card-template', () => popupWithImage.open(item));
  return card.createCard();
}
//экземпляры попапов
const popupWithImage = new PopupWithImage(constData.photo, constData.photoDescription, constData.popupPhoto)
const editPopup = new PopupWithForm(constData.formInput, editFormSubmitHandler, constData.popupProfileEdit)
const addPopup = new PopupWithForm(constData.formInput, addFormSubmitHandler, constData.popupAddCard)
//заполение карточками секции
const cardList = new Section({
  items: constData.initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, constData.cardsContainer)
cardList.renderItems();

//слушатель клика по кнопке редактирования профиля
constData.editIcon.addEventListener('click', () => {
  editPopup.open()
  const {name, description} = user.getUserInfo()
  constData.nameInput.value = name;
  constData.jobInput.value = description;
});
//слушатель клика по кнопке добавления карточки
constData.addIcon.addEventListener('click', () => {
  validateAddForm.toggleButtonState()
  addPopup.open()
});

//валидация форм
validateEditForm.enableValidation();
validateAddForm.enableValidation();
