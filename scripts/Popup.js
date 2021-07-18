export class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
  };

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  };

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  };

  _handleEscClose(evt) {
    this._activePopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
      this.close(this._activePopup);
    };
  };

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close(this._popup);
      };
    });

    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-button')) {
        this.close(this._popup);
      };
    });
  };
}