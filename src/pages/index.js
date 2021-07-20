import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {initialCards, obj, userForm, cardForm, editButton, addCardButton, userName, userJob} from '../utils/constants.js';
import './index.css';

const createCard = (item) => {
  return new Card(item, '.template-card', (() => {
    popupWithImage.openImage(item.name, item.link);
  }));  
};

const renderCard = (item) => {
  renderCards.addItem(createCard(item).generateCard());
};
//---------------рендер карточек--------------------------------
const renderCards = new Section({
  items: initialCards,
  renderer: (item) => {
    renderCard(item);
  },
}, '.cards');

renderCards.renderItems();
//--------------добавление карточки-----------------------------
const popupAddCard = new PopupWithForm('.popup_type_new-card', (data) => {
  renderCard(data);
});

popupAddCard.setEventListeners();
//-------------------валидация----------------------------------
const userValidate = new FormValidator(obj, userForm);
const cardValidate = new FormValidator(obj, cardForm);

userValidate.enableValidation();
cardValidate.enableValidation();
//--------------------------------------------------------------
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const userData = new UserInfo(userName, userJob);

function handleUserInfo (data) {
  userData.setUserInfo(data.user, data.about);
}

const popupUser = new PopupWithForm('.popup_type_edit', handleUserInfo);
popupUser.setEventListeners();

editButton.addEventListener('click', () => {
  const currentUserInfo = userData.getUserInfo();
  userForm.user.value = currentUserInfo.user;
  userForm.about.value = currentUserInfo.about;
  userValidate.resetErrorText();
  popupUser.open();
});

addCardButton.addEventListener('click', () => {
  cardValidate.resetErrorText();
  popupAddCard.open();
})