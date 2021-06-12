const popupProfile = document.querySelector('.popup_type_edit');
const nameInput = popupProfile.querySelector('.form__input_type_name');
const jobInput = popupProfile.querySelector('.form__input_type_job');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
//-----------------------------------------------------------------------------
const profile = document.querySelector('.profile'); //секция с профилем
const userName = profile.querySelector('.profile__name'); //имя пользователя
const userJob = profile.querySelector('.profile__description'); //описание работы пользователя
const editButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования формы
const addCardButton = profile.querySelector('.profile__add-button');
//-----------------------------------------------------------------------------
const popupNewCard = document.querySelector('.popup_type_new-card');
const placeName = popupNewCard.querySelector('.form__input_type_mesto');
const placeLink = popupNewCard.querySelector('.form__input_type_url');
const formNewCard = popupNewCard.querySelector('.form');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close-button');
const cards = document.querySelector('.cards');
//-----------------------------------------------------------------------------
const popupImage = document.querySelector('.popup_type_image');
const figureImage = popupImage.querySelector('.figure__image');
const figureTitle = popupImage.querySelector('.figure__title');
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

function addCardSubmitHandler(evt) {
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
  closePopup(popupNewCard);  
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

popupNewCard.addEventListener('submit', addCardSubmitHandler);

popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});