const popup = document.querySelector('.popup'); //секция с попапом
let nameInput = popup.querySelector('.form__input_type_name'); //поле формы с именем пользователя
let jobInput = popup.querySelector('.form__input_type_job'); //поле формы с описание работы пользователя
const closeButton = popup.querySelector('.popup__close-button'); //кнопка закрытия формы
const profile = document.querySelector('.profile'); //секция с профилем
let userName = profile.querySelector('.profile__name'); //имя пользователя
let userJob = profile.querySelector('.profile__description'); //описание работы пользователя
const editButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования формы
//5ый спринт-------------------------------------------------------------------------------------
const card = document.querySelector('.card');
const likeButton = card.querySelector('.card__like-button');

//функция для добавления класса для открытии формы
function openPopup() {
  nameInput.value = userName.textContent; //данные берутся из профиля
  jobInput.value = userJob.textContent; //данные берутся из профиля
  popup.classList.add('popup_opened');
};

//функция для удаления класса для закрытия формы
function closePopup() {
  popup.classList.remove('popup_opened');
};

//функция для закрытия формы при нажатии на оверлей
function overlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
};

//функция для добавления лайка
function addLike() {
  likeButton.classList.toggle('card__like-button_active');
}

//функция для сохранения внесенных в форму изменений
function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup();
};

popup.addEventListener('submit', formSubmitHandler); //сохраняем изменения в профиле
closeButton.addEventListener('click', closePopup); //закрываем форму при нажатии на крестик
popup.addEventListener('click', overlayClick); //закрываем форму при нажатии на оверлей
editButton.addEventListener('click', openPopup); //открываем форму при нажатии кнопку редактирования профиля
likeButton.addEventListener('click', addLike); //добавляем лайк