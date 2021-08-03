export class Card {
  constructor(data, template, handleCardClick, handleCardLike, handleCardDelete, userId) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = template;
    this.likes = data.likes;
    this.cardId = data._id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._handleCardLike = handleCardLike.bind(this);
    this._handleCardDelete = handleCardDelete;
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
    this._cardButtonDelete = this._element.querySelector('.card__delete-button');
    this._cardButtonLike = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._setEventListeners();
    this._checkCardOwner();
  
    // Добавим данные
    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._cardTitle.textContent = this._text;
    this.handleToggleLike();
    this.setCounter(this.likes.length);
  
    // Вернём элемент наружу
    return this._element;
  };

  _checkCardOwner() {
      if(this._ownerId !== this._userId) {
      this._cardButtonDelete.remove();

    }
  };

  setCounter(likesLength) {
    this._likeCounter.textContent = likesLength;
  };

  _setEventListeners() {
    this._cardButtonLike.addEventListener('click', () => {
      this._handleCardLike(this);
    });
    this._cardButtonDelete.addEventListener('click', () => {
      this._handleCardDelete(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  };

  handleToggleLike() {    
    if(this.isLiked()) {
      this._cardButtonLike.classList.add('card__like-button_active');
    } else {
      this._cardButtonLike.classList.remove('card__like-button_active');
    }
  };

  removeElement() {
    this._element.remove();
  };

  isLiked() {
    return this.likes.some(like => {
      return like._id === this._userId;
    });
  };
};