import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {initialCards, obj, userForm, cardForm, editButton, addCardButton, userName, userJob, userAvatar} from '../utils/constants.js';
import './index.css';

const api = new Api('cohort-26', 'https://nomoreparties.co/v1/', '254abe0c-6cde-4d88-b5b9-683b939cbbc8');
console.log(api.getUserInfo())
console.log(api.getInitialCards())

const createCard = (item) => {
  return new Card(item, '.template-card', (() => {
    popupWithImage.openImage(item.name, item.link);
  }));  
};

const renderCard = (item) => {
  return createCard(item).generateCard();
};

const constuctorCard = (data) => {
  const renderCards = new Section({
  items: data,
  renderer: (item) => {      
    renderCards.addItem(renderCard(item));
  },
}, '.cards');
renderCards.renderItems();
}

//---------------рендер карточек--------------------------------
api.getInitialCards()
  .then((data) => {
    constuctorCard(data);
  })
  .catch((err) => console.log(err))

//--------------добавление карточки-----------------------------
const popupAddCard = new PopupWithForm('.popup_type_new-card', (dataCard) => {
  console.log(dataCard)
  api.postNewCard(dataCard.name, dataCard.link)
    .then(() => { 
      constuctorCard(dataCard);
    })
    .catch((err) => console.log(err))
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

const userData = new UserInfo(userName, userJob, userAvatar);

function handleUserInfo (data) {
  userData.setUserInfo(data.name, data.about);
}

api.getUserInfo().then((data) => {
  handleUserInfo(data);
})

const popupUser = new PopupWithForm('.popup_type_edit', (userInfo) => {
  api.editUserInfo(userInfo.name, userInfo.about)
    .then(() => {
      handleUserInfo(userInfo);
    })
    .catch((err) => console.log(err))
});
popupUser.setEventListeners();

editButton.addEventListener('click', () => {
  const currentUserInfo = userData.getUserInfo();
  userForm.name.value = currentUserInfo.name;
  userForm.about.value = currentUserInfo.about;
  userValidate.resetErrorText();
  popupUser.open();
});

addCardButton.addEventListener('click', () => {
  cardValidate.resetErrorText();
  popupAddCard.open();
})