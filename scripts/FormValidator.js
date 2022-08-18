export class FormValidator {
	constructor(data, templateSelector) {
		this._templateSelector = document.querySelector(templateSelector);
		this._form = data.form;
		this._input = data.input;
		this._errorShow = data.errorShow;
		this._inputErrorMessage = data.inputErrorMessage;
		this._button = data.button;
		this._buttonInactive = data.buttonInactive;
	}

	//повесить слушатели всем формам
	_setEventListenersForm(formElement) {
		const formList = Array.from(document.querySelectorAll(this._form));
		formList.forEach((formElement) => {
			this._setEventListeners(formElement);
		});
	}

	//устанавить все обработчики
	_setEventListeners(formElement) {
		const inputList = Array.from(formElement.querySelectorAll(this._input));
		const buttonElement = formElement.querySelector(this._button);
		this._toggleButtonState(inputList, buttonElement);

		inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._isValid(formElement, inputElement);
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
	_isValid(formElement, inputElement) {
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
	enableValidation() {
		const form = this._templateSelector.querySelector(this._form);
		this._setEventListenersForm(form);
	}
}