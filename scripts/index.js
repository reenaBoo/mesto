import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
import {initialCards, obj, userForm, cardForm, popupImage, figureImage, figureTitle} from './constants.js';
import {openPopup, closePopup} from './utils.js';

const popupProfile = document.querySelector('.popup_type_edit');
const nameInput = popupProfile.querySelector('.form__input_type_name');
const jobInput = popupProfile.querySelector('.form__input_type_job');
//---------------------------попап с профилем-------------------------------------
const profile = document.querySelector('.profile'); //секция с профилем
const userName = profile.querySelector('.profile__name'); //имя пользователя
const userJob = profile.querySelector('.profile__description'); //описание работы пользователя
const editButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования формы
const addCardButton = profile.querySelector('.profile__add-button');
//----------------------попап добавления карточки---------------------------------
const popupNewCard = document.querySelector('.popup_type_new-card');
const placeName = popupNewCard.querySelector('.form__input_type_place');
const placeLink = popupNewCard.querySelector('.form__input_type_url');
const formNewCard = popupNewCard.querySelector('.form');

function updateProfileData() {
  // nameInput.value = userName.textContent; //данные берутся из профиля
  // jobInput.value = userJob.textContent; //данные берутся из профиля
  // setUserInfo(nameUpdate, aboutUpdate) {
  //   this.getUserInfo();
  //   this._userName.textContent = nameUpdate;
  //   this._userAbout.textContent = aboutUpdate;

  
}

//функция для сохранения внесенных в форму изменений
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  
  const cardData = {
    name: placeName.value,
    link: placeLink.value
  };

  const card = new Card(cardData, '.template-card', handleCardClick);
  const cardElement = card.generateCard();
  document.querySelector('.cards').prepend(cardElement);
  formNewCard.reset();
  closePopup(popupNewCard);
};

function handleCardClick(name, link) {
  figureImage.src = link;
  figureImage.alt = name;
  figureTitle.textContent = name;
  openPopup(popupImage);
};

//---------------рендер карточек--------------------------------
const renderCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template-card', handleCardClick);
    renderCards.addItem(card.generateCard());
  },  
}, '.cards');

renderCards.renderItems();

//-------------------валидация----------------------------------
const userValidate = new FormValidator(obj, userForm);
const cardValidate = new FormValidator(obj, cardForm);

userValidate.enableValidation();
cardValidate.enableValidation();
//--------------------слушатели----------------------------------
function handleUserInfo (data) {
  userData.setUserInfo(data.user, data.about);
}

const userData = new UserInfo(userName, userJob);

const popupUser = new PopupWithForm('.popup_type_edit', handleUserInfo);
popupUser.setEventListeners();

editButton.addEventListener('click', () => {
  userForm.user.value = userData.getUserInfo().user;
  userForm.about.value = userData.getUserInfo().about;
  popupUser.open();
  userValidate.resetErrorText();
});

// popupProfile.addEventListener('submit', handleProfileFormSubmit);

// addCardButton.addEventListener('click', () => {
//   cardValidate.resetErrorText();
//   openPopup(popupNewCard);
// });

// popupNewCard.addEventListener('submit', handleAddCardFormSubmit);