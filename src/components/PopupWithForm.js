import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);
    this._form = this._popup.querySelector('.form');
    this._confirmButton = this._form.querySelector('.form__save-button');
    this._handleSubmit = handleSubmit;
  };

  _getInputValues() {
    this._inputsList = this._form.querySelectorAll('.form__input');
    this._data = {};
    this._inputsList.forEach((input) => {
      this._data[input.name] = input.value;
    });
    return this._data;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._handleSubmit(data);
    });
  };

  close() {
    this._form.reset();
    super.close();
  };

  changeButtonText = (text) => {
    this._confirmButton.textContent = text;
  }
}