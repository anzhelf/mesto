import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
	constructor(popupSelector, submitForm) {
		super(popupSelector);
		this._submitForm = submitForm;
		this.blockForm = this.popup.querySelector(".popup__form");
		this._nameInput = this.blockForm.querySelector(".popup__input_type_name");
    this._jobInput = this.blockForm.querySelector(".popup__input_type_job");
	}
	//собирает данные с полей ввода формы и возвращат их в виде объекта
	getInputValues() {
		return {
			userName: this._nameInput.value,
			userJob: this._jobInput.value
		}

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