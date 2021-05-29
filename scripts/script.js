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
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close-button');

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
function formSubmitHandler (evt) {
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

addCardButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

popupNewCardCloseButton.addEventListener('click', () => {
  closePopup(popupNewCard);
});
