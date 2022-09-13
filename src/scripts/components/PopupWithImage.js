import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupCardImage = this.popup.querySelector('.popup__card-image');
		this._popupCardText = this.popup.querySelector('.popup__card-title');
	}
	//вставлять в попап картинку c данными нажатой карточки
	open(image, text) {
		this._popupCardImage.src = image;
		this._popupCardImage.alt = text;
		this._popupCardText.textContent = text;
		super.open();
	}
}