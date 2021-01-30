function toLike(icon){
    icon.classList.toggle('card__icon-like_disabled');
    icon.classList.toggle('card__icon-like_active');
}
function formOpener(){
  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description')
  let formHeading = document.querySelector('.form__input_heading');
  let formDescription = document.querySelector('.form__input_description');

  formHeading.value = profileName.innerHTML;
  formDescription.value = profileDescription.innerHTML;

  popUp.classList.add('popup__opened');
}
function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.form__input_heading');
  let jobInput = document.querySelector('.form__input_description');

  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popUp.classList.remove('popup__opened');
}

let formElement = document.querySelector('.popup__form');

let closeIcon = document.querySelector('.popup__icon-close');
let popUp = document.querySelector('.popup');
let editIcon = document.querySelector('.profile__edit-button');

let likeIcon = document.querySelectorAll('.card__icon-like');

closeIcon.addEventListener('click', () => {popUp.classList.remove('popup__opened')});
editIcon.addEventListener('click', formOpener);

for (let i = 0; i < likeIcon.length; i++){
  likeIcon[i].addEventListener('click', () => {toLike(likeIcon[i])});
}

formElement.addEventListener('submit', formSubmitHandler);
