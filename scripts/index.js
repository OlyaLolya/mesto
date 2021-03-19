import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import * as constData from "./constData.js"

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEcs);
  document.removeEventListener('click', closeByClickAtOverlay)
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEcs)
  document.addEventListener('mousedown', closeByClickAtOverlay)
}
function closeByClickAtOverlay(evt){
  const openedPopup = document.querySelector('.popup_opened');
  const formElem = openedPopup.querySelector('.popup__container')
  if(evt.target.contains(formElem))
    closePopup(openedPopup)
}
function closeByEcs(evt){
  const openedPopup = document.querySelector('.popup_opened')
  if(evt.key === constData.escKey){
    closePopup(openedPopup)
  }
}
function createNewCard(item){
  const card = new Card(item, '#card-template', () => openPopup(constData.popupPhoto));
  return card.createCard();
}
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  constData.profileName.textContent = constData.nameInput.value;
  constData.profileDescription.textContent = constData.jobInput.value;
  closePopup(constData.popupProfileEdit);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const item = {name: constData.newCardName.value, link: constData.newCardLink.value}
  constData.cardsContainer.prepend(createNewCard(item));
  constData.newCardName.value = "";
  constData.newCardLink.value = "";
  closePopup(constData.popupAddCard);
  constData.cardFormSubmitButton.classList.add(constData.validationSettings.inactiveButtonClass);
  constData.cardFormSubmitButton.disabled = true;
}

constData.initialCards.forEach(item => {
  constData.cardsContainer.prepend(createNewCard(item));
})

//обработчики закрытия
constData.closeEditFormIcon.addEventListener('click', () => closePopup(constData.popupProfileEdit));
constData.closeAddFormIcon.addEventListener('click', () => closePopup(constData.popupAddCard));
constData.closePhotoIcon.addEventListener('click', () => closePopup(constData.popupPhoto));

//обработка кнопок на странице
constData.editIcon.addEventListener('click', () => {
  constData.nameInput.value = constData.profileName.textContent;
  constData.jobInput.value = constData.profileDescription.textContent
  openPopup(constData.popupProfileEdit)
});
constData.addIcon.addEventListener('click', () => openPopup(constData.popupAddCard));

//обработчики сабмитов
constData.editFormElement.addEventListener('submit', editFormSubmitHandler);
constData.addFormElement.addEventListener('submit', addFormSubmitHandler);
//валидация форм
export const validateEditForm = new FormValidator(constData.validationSettings, constData.editFormElement);
export const validateAddForm = new FormValidator(constData.validationSettings, constData.addFormElement);
validateEditForm.enableValidation();
validateAddForm.enableValidation();

