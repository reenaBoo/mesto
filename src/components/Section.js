export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(itemsArray) {
    itemsArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}