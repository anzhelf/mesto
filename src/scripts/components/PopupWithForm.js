import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
	constructor(popupSelector, submitForm) {
		super(popupSelector);
		this._submitForm = submitForm;
		this.blockForm = this.popup.querySelector(".popup__form");
		this._nameInput = this.blockForm.querySelector(".popup__input_type_name");
		this._jobInput = this.blockForm.querySelector(".popup__input_type_job");
		this._submitFormHandler = this._submitFormHandler.bind(this);
		this._inputList = Array.from(this.popup.querySelectorAll('.popup__input'));

		this._buttonText = this.popup.querySelector('.popup__save-button');
		this._textDefault = this._buttonText.textContent;
	}

	renderLoading(isLoading) {
		if (isLoading) {
			this._buttonText.textContent = 'Сохранение...';
		}
		else {
			this._buttonText.textContent = this._textDefault;
		}
	}

	//собирает данные с полей ввода формы и возвращат их в виде объекта
	_getInputValues() {
		this._data = {};
		this._inputList.forEach((inputElement) => (this._data[inputElement.name] = inputElement.value));
		return this._data;
	}

	close() {
		super.close();
		this.blockForm.reset();
	}

	_submitFormHandler(evt) {
		evt.preventDefault();
		const data = this._getInputValues();
		this._submitForm(data);
	}

	//добавлять обработчик иконке и сабмиту формы.
	setEventListeners() {
		super.setEventListeners();
		this.popup.addEventListener("submit", this._submitFormHandler);
	}

	removeEventListeners() {
		super.removeEventListeners();
		this.popup.removeEventListener("submit", this._submitFormHandler);
	}

	changeSubmitHandler(newSubmitHandler) {
		this._submitForm = newSubmitHandler;
	}
}