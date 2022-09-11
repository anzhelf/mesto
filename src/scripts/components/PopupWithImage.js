import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImage = super.popup();
		this._popupCardImage = this._popupImage.querySelector('.popup__card-image');
		this._popupCardText = this._popupImage.querySelector('.popup__card-title');
	}
	//вставлять в попап картинку c данными нажатой карточки
	open(image, text) {
		this._popupCardImage.src = image;
		this._popupCardImage.alt = text;
		this._popupCardText.textContent = text;
		super.open();
	}
}