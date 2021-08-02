export {obj, userForm, cardForm, avatarForm, editProfileButton, addCardButton, avatarOverlay, userName, userJob, userAvatar};

const obj = ({
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__avatar');

const userForm = document.querySelector('.form_type_user');
const cardForm = document.querySelector('.form_type_card');
const avatarForm = document.querySelector('.form_type_avatar');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const avatarOverlay = document.querySelector('.profile__avatar-overlay');