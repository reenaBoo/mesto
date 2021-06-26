class Card {
  constructor(data) {
    this._text = data.name;
    this._image = data.link;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('.template-card')
    .content
    .querySelector('.card')
    .cloneNode(true);
    
  // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
  
    // Добавим данные
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._text;
    this._element.querySelector('.card__title').textContent = this._text;
  
    // Вернём элемент наружу
    return this._element;
  } 
}

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  document.querySelector('.cards').append(cardElement);
}); 