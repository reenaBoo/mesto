import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {PopupWithSubmit} from '../components/PopupWithSubmit.js';
import {obj, userForm, cardForm, avatarForm, editProfileButton, addCardButton, avatarOverlay, userName, userJob, userAvatar} from '../utils/constants.js';
import './index.css';

const api = new Api('cohort-26', 'https://nomoreparties.co/v1/', '254abe0c-6cde-4d88-b5b9-683b939cbbc8');

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const userData = new UserInfo(userName, userJob, userAvatar);

function handleUserInfo (data) {
  userData.setUserInfo(data.name, data.about, data._id);
}

function handleUserAvatar(data) {
  userData.setUserAvatar(data.avatar)
}

function handleCardLike(card) {
  const cardArr = card.isLiked() ? api.deleteLike(card.cardId) : api.likeCard(card.cardId);
  cardArr.then((response) => {
    this.likes = response.likes;
    this.handleToggleLike();
    this.setCounter(response.likes.length);
  })
  .catch((err) => console.log(err))
}

function handleCardDelete(card) {
  popupDelete.open(card);
}

const popupDelete = new PopupWithSubmit('.popup_type_delete', (card) => {
  api.deleteCard(card.cardId)
  .then((res) => {
    if (res.message === "Пост удалён") {
      card.removeElement();
      popupDelete.close();
    }
  })  
  .catch((err) => console.log(err))
  });
popupDelete.setEventListeners();

//-----------------функции для сборки карточек-----------------------
const createCard = (item) => {
  const userId = userData.getUserId();
  return new Card(item, '.template-card', 
  function handleCardClick() {popupWithImage.openImage(item.name, item.link)}, 
  handleCardLike, 
  handleCardDelete, 
  userId);  
};

const renderCard = (item) => {
  return createCard(item).generateCard();
};

const renderCards = new Section(
  function renderer(item) {      
    renderCards.addItemAppend(renderCard(item));
  }, 
  '.cards');

//-------------------------API--------------------------------------
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([apiData, cardsData]) => {
    //--------------заполнение профиля------------------------------
    handleUserInfo(apiData);
    handleUserAvatar(apiData);
    //---------------рендер карточек--------------------------------
    renderCards.renderItems(cardsData);

    //---------добавление карточки на сервер------------------------
    const popupAddCard = new PopupWithForm('.popup_type_new-card', (dataCard) => {
      popupAddCard.changeButtonText('Создание...');
      api.postNewCard(dataCard.name, dataCard.link)
        .then((data) => { 
          renderCards.addItem(renderCard(data));
          popupAddCard.close();
          popupAddCard.changeButtonText('Создать');
        })
        .catch((err) => console.log(err))
    });
    popupAddCard.setEventListeners();

    //----------добавление данных профиля на сервер-----------------
    const popupUser = new PopupWithForm('.popup_type_edit', (userInfo) => {
      popupUser.changeButtonText('Сохранение...');
      api.editUserInfo(userInfo.name, userInfo.about)
        .then(() => {
          handleUserInfo(userInfo);
          popupUser.close();
          popupUser.changeButtonText('Сохранить');
        })
        .catch((err) => console.log(err))
    });
    popupUser.setEventListeners();

    //----------добавление аватарки профиля на сервер---------------
    const popupAvatar = new PopupWithForm('.popup_type_avatar', (userInfo) => {
      popupAvatar.changeButtonText('Сохранение...');
      api.editUserAvatar(userInfo.avatar)
        .then(() => {
          handleUserAvatar(userInfo);
          popupAvatar.close();
          popupAvatar.changeButtonText('Сохранить');
        })
        .catch((err) => console.log(err))
    });
    popupAvatar.setEventListeners();

    //-------------слушатели-----------------------------------------
    editProfileButton.addEventListener('click', () => { 
      const currentUserInfo = userData.getUserInfo();     
      userForm.name.value = currentUserInfo.name;
      userForm.about.value = currentUserInfo.about;
      userValidate.resetValidation();
      popupUser.open();
    });
    
    addCardButton.addEventListener('click', () => {
      cardValidate.resetValidation();
      popupAddCard.open();
    });
    
    avatarOverlay.addEventListener('click', () => {
      avatarValidate.resetValidation();
      popupAvatar.open();
    });

  })
  .catch((err) => {
    console.log(err);
  })

//-------------------валидация----------------------------------
const userValidate = new FormValidator(obj, userForm);
const cardValidate = new FormValidator(obj, cardForm);
const avatarValidate = new FormValidator(obj, avatarForm);

userValidate.enableValidation();
cardValidate.enableValidation();
avatarValidate.enableValidation();