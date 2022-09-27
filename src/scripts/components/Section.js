export class Section {
	constructor({ renderer }, containerSelector) {
		this._container = document.querySelector(containerSelector);
		this._renderer = renderer;
	}

	//Вставка
	addItem(item) {
		const card = this._renderer(item)
		this._container.prepend(card);
	}

	renderItems(item) {
		this._renderer(item);
	}
}