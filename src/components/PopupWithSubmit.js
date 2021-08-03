import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);
    this._form = this._popup.querySelector('.form');
    this._handleSubmit = handleSubmit;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this.card);
    });
  };

  open(card) {
    super.open();
    this.card = card;
  };
}