import './pages/index.css';
import {Card} from "./scripts/components/Card.js";
import {FormValidator} from "./scripts/components/FormValidator.js";
import {Section} from "./scripts/components/Section.js";
import {PopupWithImage} from "./scripts/components/PopupWithImage.js";
import {PopupWithForm} from "./scripts/components/PopupWithForm.js";
import {UserInfo} from "./scripts/components/UserInfo.js";
import * as constData from "./scripts/utils/constData.js"

//экземпляры валидации
export const validateEditForm = new FormValidator(constData.validationSettings, constData.editFormElement);
export const validateAddForm = new FormValidator(constData.validationSettings, constData.addFormElement);
//экземпляр юзера
const user = new UserInfo(constData.profileName, constData.profileDescription)
//функции
const addFormSubmitHandler = function (data){
  const newCard = new Card(data, '#card-template', () => popupWithImage.open(data));
  cardList.addItem(newCard.createCard());
}
const editFormSubmitHandler = function (data) {
  user.setUserInfo(data);
}
//экземпляры попапов
const popupWithImage = new PopupWithImage(constData.popupPhoto)
const editPopup = new PopupWithForm(editFormSubmitHandler, constData.popupProfileEdit)
const addPopup = new PopupWithForm(addFormSubmitHandler, constData.popupAddCard)
//заполение карточками секции
const cardList = new Section({
  items: constData.initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', () => popupWithImage.open(item));
    cardList.addItem(card.createCard())
  }
}, constData.cardsContainer)
cardList.renderItems();

//слушатель клика по кнопке добавления карточки
constData.editIcon.addEventListener('click', () => {
  editPopup.open()
  const {name, description} = user.getUserInfo()
  constData.nameInput.value = name;
  constData.jobInput.value = description;
});
//слушатель клика по кнопке редактирования профиля
constData.addIcon.addEventListener('click', () => addPopup.open());

//валидация форм
validateEditForm.enableValidation();
validateAddForm.enableValidation();
