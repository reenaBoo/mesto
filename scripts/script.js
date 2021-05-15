let popup = document.querySelector('.popup'); //секция с попапом
let nameInput = popup.querySelector('.form__input_type_name'); //поле формы с именем пользователя
let jobInput = popup.querySelector('.form__input_type_job'); //поле формы с описание работы пользователя
let closeButton = popup.querySelector('.popup__close-button'); //кнопка закрытия формы
let profile = document.querySelector('.profile'); //секция с профилем
let userName = profile.querySelector('.profile-info__name'); //имя пользователя
let userJob = profile.querySelector('.profile-info__description'); //описание работы пользователя
let editButton = profile.querySelector('.profile-info__edit-button'); //кнопка редактирования формы

//добавляем событие при клике на кнопку редактирования профиля
editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

//убираем класс при закрытии формы
function closePopup() {
  popup.classList.remove('popup_opened');
};

//сохраняем внесенные изменения в форму
function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup()
}

popup.addEventListener('submit', formSubmitHandler); 
closeButton.addEventListener('click', closePopup);