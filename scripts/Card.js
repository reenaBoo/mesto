import {popupImage, figureImage, figureTitle} from './constants.js';
import {openPopup} from './utils.js';

export class Card {
  constructor(data) {
    this._text = data.name;
    this._image = data.link;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector('.template-card')
    .content
    .querySelector('.card')
    .cloneNode(true);
    
  // вернём DOM-элемент карточки
    return cardElement;
  };

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();
  
    // Добавим данные
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._text;
    this._element.querySelector('.card__title').textContent = this._text;
  
    // Вернём элемент наружу
    return this._element;
  };

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleCardLike();
    });
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleCardDelete();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._hadleCardOpen();
      openPopup(popupImage);
    });
  };

  _handleCardLike() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  };

  _handleCardDelete() {
    this._element.remove();
  };

  _hadleCardOpen() {
    figureImage.src = this._element.querySelector('.card__image').src;
    figureTitle.textContent = this._element.querySelector('.card__title').textContent;
    figureImage.alt = this._element.querySelector('.card__image').alt;
  };
};