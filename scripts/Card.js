import {popupImage, figureImage, figureTitle} from './constants.js';
import {openPopup} from './utils.js';

export class Card {
  constructor(data, template) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = template;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
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
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._setEventListeners();
  
    // Добавим данные
    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._cardTitle.textContent = this._text;
  
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
    this._name = this._element.querySelector('.card__title');
    this._link = this._element.querySelector('.card__image');
    figureImage.src = this._link.src;
    figureTitle.textContent = this._name.textContent;
    figureImage.alt = this._link.alt;
  };
};