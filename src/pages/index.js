import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {obj, userForm, cardForm, avatarForm, editProfileButton, addCardButton, editAvatarButton, userName, userJob, userAvatar} from '../utils/constants.js';
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

const renderCards = new Section(
  function renderer(item) {      
    renderCards.addItem(renderCard(item));
  }, 
  '.cards');

const constuctorCard = (data) => {
  renderCards.renderItems(data);
}

//---------------рендер карточек--------------------------------
api.getInitialCards()
  .then((data) => {
    constuctorCard(data);
  })
  .catch((err) => console.log(err))

//--------------добавление карточки-----------------------------
const popupAddCard = new PopupWithForm('.popup_type_new-card', (dataCard) => {
  api.postNewCard(dataCard.name, dataCard.link)
    .then((data) => { 
      renderCards.addItem(renderCard(data));
    })
    .catch((err) => console.log(err))
});

popupAddCard.setEventListeners();
//-------------------валидация----------------------------------
const userValidate = new FormValidator(obj, userForm);
const cardValidate = new FormValidator(obj, cardForm);
const avatarValidate = new FormValidator(obj, avatarForm);

userValidate.enableValidation();
cardValidate.enableValidation();
avatarValidate.enableValidation();
//--------------------------------------------------------------
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const userData = new UserInfo(userName, userJob, userAvatar);

function handleUserInfo (data) {
  userData.setUserInfo(data.name, data.about);
}

function handleUserAvatar(data) {
  userData.setUserAvatar(data.avatar)
}

api.getUserInfo().then((data) => {
  handleUserInfo(data);
})

api.getUserInfo().then((data) => {
  handleUserAvatar(data)
})

const popupUser = new PopupWithForm('.popup_type_edit', (userInfo) => {
  api.editUserInfo(userInfo.name, userInfo.about)
    .then(() => {
      handleUserInfo(userInfo);
    })
    .catch((err) => console.log(err))
});
popupUser.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_type_avatar', (userInfo) => {
  api.editUserAvatar(userInfo.avatar)
    .then(() => {
      handleUserAvatar(userInfo);
    })
    .catch((err) => console.log(err))
});
popupAvatar.setEventListeners();

editProfileButton.addEventListener('click', () => {
  const currentUserInfo = userData.getUserInfo();
  userForm.name.value = currentUserInfo.name;
  userForm.about.value = currentUserInfo.about;
  userValidate.resetErrorText();
  popupUser.open();
});

addCardButton.addEventListener('click', () => {
  cardValidate.resetErrorText();
  popupAddCard.open();
});

editAvatarButton.addEventListener('click', () => {
  avatarValidate.resetErrorText();
  popupAvatar.open();
});