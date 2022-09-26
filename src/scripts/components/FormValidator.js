export class FormValidator {
	constructor(data, form) {
		this._form = form;
		this._input = data.input;
		this._errorShow = data.errorShow;
		this._inputErrorMessage = data.inputErrorMessage;
		this._button = data.button;
		this._buttonInactive = data.buttonInactive;
		this._inputList = Array.from(this._form.querySelectorAll(this._input));
		this._buttonElement = this._form.querySelector(this._button);
	}

	//устанавить все обработчики
	_setEventListeners() {
		this.toggleButtonState();
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._toggleInputError(inputElement);
				this.toggleButtonState();
			});
		});
	}

	// Функция, которая добавляет класс с ошибкой
	_showInputError(inputElement) {
		this._formError = this._form.querySelector(`.${inputElement.id}-input-error`);
		inputElement.classList.add(this._errorShow);
		this._formError.classList.add(this._inputErrorMessage);
		this._formError.textContent = inputElement.validationMessage;
	}

	// Функция, которая удаляет класс с ошибкой
	hideInputError() {
		this._inputList.forEach((inputElement) => {
			this._formError = this._form.querySelector(`.${inputElement.id}-input-error`);
			inputElement.classList.remove(this._errorShow);
			this._formError.classList.remove(this._inputErrorMessage);
			this._formError.textContent = '';
		});
	}

	// Функция, которая проверяет валидность поля
	_toggleInputError(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement);
		} else {
			this.hideInputError(inputElement);
		}
	}

	//Проверить на валидность
	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}

	//изменить состояние кнопки сабмита
	toggleButtonState() {

		if (this._hasInvalidInput()) {
			this._buttonElement.classList.add(this._buttonInactive);
			this._buttonElement.setAttribute('disabled', true);
		}
		else {
			this._buttonElement.removeAttribute('disabled');
			this._buttonElement.classList.remove(this._buttonInactive);
		}
	}

	//вкл валидацию 
	enableValidation() {
		this._setEventListeners();
	}

	disableSubmitButton() {
		this._buttonElement.classList.add(this._buttonInactive);
		this._buttonElement.setAttribute('disabled', 'disabled');
	}
}