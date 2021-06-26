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
const cards = document.querySelector('.cards');
//-------------------------попап просмотра фото-----------------------------------
const popupImage = document.querySelector('.popup_type_image');
const figureImage = popupImage.querySelector('.figure__image');
const figureTitle = popupImage.querySelector('.figure__title');
//-------------------------------шаблон-------------------------------------------
const template = document.querySelector('.template-card').content;

function openPopup(popup) {
  document.addEventListener('keydown', handleEscUp);  
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', handleEscUp);
  popup.classList.remove('popup_opened');
}

function updateProfileData() {
  nameInput.value = userName.textContent; //данные берутся из профиля
  jobInput.value = userJob.textContent; //данные берутся из профиля
}

//функция для сохранения внесенных в форму изменений
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

function getCard(elem) {
  const card = template.querySelector('.card').cloneNode(true);
  const buttonDeleteCard = card.querySelector('.card__delete-button');
  const imageCard = card.querySelector('.card__image');
  const titleCard = card.querySelector('.card__title');
  const buttonLike = card.querySelector('.card__like-button');

  titleCard.textContent = elem.name;
  imageCard.src = elem.link;
  imageCard.alt = elem.name;

  buttonDeleteCard.addEventListener('click', function() {
    const cardItem = buttonDeleteCard.closest('.card');
    cardItem.remove();
  });

  buttonLike.addEventListener('click', likeCard);

  imageCard.addEventListener('click', function() {
    figureImage.src = imageCard.src;
    figureTitle.textContent = titleCard.textContent;
    figureImage.alt = imageCard.alt;
    openPopup(popupImage);
  });

  return card;
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function addCard(card) {
  cards.prepend(card);
}

//рендер карточек
initialCards.forEach((item) => {
  const card = getCard(item);
  addCard(card);
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  
  const newCardName = placeName.value;
  const newCardLink = placeLink.value;
  
  const cardData = {
    name: newCardName,
    link: newCardLink
  };

  const card = getCard(cardData);
  addCard(card);
  formNewCard.reset();
  disableButton(popupNewCard);
  closePopup(popupNewCard);
};

//функция закрытия попапа по ESC
function handleEscUp(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
};

editButton.addEventListener('click', () => {
  resetErrorMessages(popupProfile);
  openPopup(popupProfile);
  updateProfileData();
});

popupProfile.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => {
  resetErrorMessages(popupNewCard);
  openPopup(popupNewCard);
});

popupNewCard.addEventListener('submit', handleAddCardFormSubmit);

//слушатели на закрытие попапов при нажатии на кнопку или оверлей
popupProfile.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupProfile)
  }
});

popupProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-button')) {
    closePopup(popupProfile)
  }
});

popupNewCard.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup')) {
    formNewCard.reset();
    closePopup(popupNewCard);
  }
});

popupNewCard.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-button')) {
    formNewCard.reset();
    closePopup(popupNewCard);
  }
});

popupImage.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupImage)
  }
});

popupImage.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-button')) {
    closePopup(popupImage)
  }
});