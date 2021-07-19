import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
import {initialCards, obj, userForm, cardForm, editButton, addCardButton, userName, userJob, newCardData} from './constants.js';

//---------------рендер карточек--------------------------------
const renderCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template-card', (() => {
      popupWithImage.openImage(item.name, item.link);
    }));
    renderCards.addItem(card.generateCard());
  },  
}, '.cards');

console.log(renderCards);

renderCards.renderItems();
//--------------добавление карточки-----------------------------
const popupAddCard = new PopupWithForm('.popup_type_new-card', () => {
  const aaaa = new Section({
    renderer: (item) => {
      const card = new Card(item, '.template-card', (() => {
        popupWithImage.openImage(item.name, item.link);
      }));
      aaaa.addItem(card.generateCard());
    },
  }, '.cards');
});

console.log(popupAddCard._handleSubmit());
// popupAddCard.setEventListeners('sub', (evt) => 
//popupAddCard.handleSubmit);
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
  userForm.user.value = userData.getUserInfo().user;
  userForm.about.value = userData.getUserInfo().about;
  userValidate.resetErrorText();
  popupUser.open();
});

addCardButton.addEventListener('click', () => {
  cardValidate.resetErrorText();
  popupAddCard.open();
})