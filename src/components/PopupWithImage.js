import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImage = this._popup.querySelector('.figure__image');
    this._popupTitle = this._popup.querySelector('.figure__title');
  }

  openImage(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}