export class FormValidator {
	constructor(data, popup) {
		this._popup = popup;
		this._form = data.form;
		this._input = data.input;
		this._errorShow = data.errorShow;
		this._inputErrorMessage = data.inputErrorMessage;
		this._button = data.button;
		this._buttonInactive = data.buttonInactive;
	}

	//устанавить все обработчики
	_setEventListeners(formElement) {
		const inputList = Array.from(formElement.querySelectorAll(this._input));
		const buttonElement = formElement.querySelector(this._button);
		this._toggleButtonState(inputList, buttonElement);

		inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._toggleInputError(formElement, inputElement);
				this._toggleButtonState(inputList, buttonElement);
			});
		});
	}

	// Функция, которая добавляет класс с ошибкой
	_showInputError(formElement, inputElement) {
		const formError = formElement.querySelector(`.${inputElement.id}-input-error`);
		inputElement.classList.add(this._errorShow);
		formError.classList.add(this._inputErrorMessage);
		formError.textContent = inputElement.validationMessage;
	}

	// Функция, которая удаляет класс с ошибкой
	_hideInputError(formElement, inputElement) {
		const formError = formElement.querySelector(`.${inputElement.id}-input-error`);
		inputElement.classList.remove(this._errorShow);
		formError.classList.remove(this._inputErrorMessage);
		formError.textContent = '';
	}

	// Функция, которая проверяет валидность поля
	_toggleInputError(formElement, inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(formElement, inputElement);
		} else {
			this._hideInputError(formElement, inputElement);
		}
	}

	//Проверить на валидность
	_hasInvalidInput(inputList) {
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}

	//изменить состояние кнопки сабмита
	_toggleButtonState(inputList, buttonElement) {

		if (this._hasInvalidInput(inputList)) {
			buttonElement.classList.add(this._buttonInactive);
			buttonElement.setAttribute('disabled', true);
		}
		else {
			buttonElement.removeAttribute('disabled');
			buttonElement.classList.remove(this._buttonInactive);
		}
	}

	//вкл валидацию
	enableValidation(formElement) {
		const form = this._popup.querySelector(this._form);
		const formsList = Array.from(document.querySelectorAll(this._form));
		formsList.forEach((formElement) => {
			this._setEventListeners(formElement);
		});
	}
}