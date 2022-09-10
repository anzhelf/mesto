import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
	constructor(popupSelector, submitForm) {
		super(popupSelector);
		this._submitForm = submitForm;
		this._popup = super.popup();
		this.blockForm = this._popup.querySelector(".popup__form");
	}

	open() {
		super.open();
	}

	close() {
		super.close();
		this.blockForm.reset();
	}

	//добавлять обработчик иконке и сабмиту формы.
	setEventListeners() {
		super.setEventListeners();
		this._popup.addEventListener("submit", this._submitForm);
	}

	removeEventListeners() {
		super.removeEventListeners();
		this._popup.removeEventListener("submit", this._submitForm);
	}
}
