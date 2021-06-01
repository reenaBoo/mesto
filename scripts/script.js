const popupProfile = document.querySelector('.popup_type_edit');
let nameInput = popupProfile.querySelector('.form__input_type_name');
let jobInput = popupProfile.querySelector('.form__input_type_job');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
//-----------------------------------------------------------------------------
const profile = document.querySelector('.profile'); //секция с профилем
let userName = profile.querySelector('.profile__name'); //имя пользователя
let userJob = profile.querySelector('.profile__description'); //описание работы пользователя
const editButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования формы
const addCardButton = profile.querySelector('.profile__add-button');
//-----------------------------------------------------------------------------
const popupNewCard = document.querySelector('.popup_type_new-card');
let mestoName = popupNewCard.querySelector('.form__input_type_mesto');
let mestoLink = popupNewCard.querySelector('.form__input_type_url');
const formNewCard = popupNewCard.querySelector('.form');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close-button');
const cards = document.querySelector('.cards');
//-----------------------------------------------------------------------------
const popupImage = document.querySelector('.popup_type_image');
let figureImage = popupImage.querySelector('.figure__image');
let figureTitle = popupImage.querySelector('.figure__title');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function updateProfileData() {
  nameInput.value = userName.textContent; //данные берутся из профиля
  jobInput.value = userJob.textContent; //данные берутся из профиля
}

//функция для сохранения внесенных в форму изменений
function profileSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  updateProfileData();
});

popupProfileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupProfile.addEventListener('submit', profileSubmitHandler);

addCardButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

popupNewCardCloseButton.addEventListener('click', () => {
  formNewCard.reset();
  closePopup(popupNewCard);
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function getCard(elem) {
  const template = document.querySelector('.template-card').content;

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

  buttonLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  imageCard.addEventListener('click', function() {
    figureImage.src = imageCard.src;
    figureTitle.textContent = titleCard.textContent;
    figureImage.alt = imageCard.alt;
    openPopup(popupImage);
  });

  return card;
}

function addCard(card) {
  cards.prepend(card);
}

initialCards.forEach((item) => {
  const card = getCard(item);
  addCard(card);
});

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  
  let newCardName = mestoName.value;
  let newCardLink = mestoLink.value;
  
  const addCardMass = {
    name: newCardName,
    link: newCardLink
  };

  const card = getCard(addCardMass);
  addCard(card);
  formNewCard.reset();
  closePopup(popupNewCard);  
};

popupNewCard.addEventListener('submit', addCardSubmitHandler);

popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});