let nameInput = document.querySelector('.form__info_input_heading');
let jobInput = document.querySelector('.form__info_input_description');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let formElement = document.querySelector('.form');

let closeIcon = document.querySelector('.popup__icon-close');
let popup = document.querySelector('.popup');
let editIcon = document.querySelector('.profile__edit-button');

function closePopup(){
  popup.classList.remove('popup_opened');
}

function formOpener(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent

  popup.classList.add('popup_opened');
}
function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

closeIcon.addEventListener('click', () => {closePopup()});
editIcon.addEventListener('click', formOpener);

formElement.addEventListener('submit', formSubmitHandler);
