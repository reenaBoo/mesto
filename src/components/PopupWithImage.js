import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  openImage(name, link) {
    this._popupImage = this._popup.querySelector('.figure__image');
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popup.querySelector('.figure__title').textContent = name;
    super.open();
  }
}