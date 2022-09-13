import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
	constructor(popupSelector, submitForm) {
		super(popupSelector);
		this._submitForm = submitForm;
		this.blockForm = this.popup.querySelector(".popup__form");
	}
	
	close() {
		super.close();
		this.blockForm.reset();
	}

	//добавлять обработчик иконке и сабмиту формы.
	setEventListeners() {
		super.setEventListeners();
		this.popup.addEventListener("submit", this._submitForm);
	}

	removeEventListeners() {
		super.removeEventListeners();
		this.popup.removeEventListener("submit", this._submitForm);
	}
}