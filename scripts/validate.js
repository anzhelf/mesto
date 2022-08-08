const settings = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	popupSaveButtonInactive: 'popup__save-button_inactive',
	popupSaveButton: '.popup__save-button',
	inputTypeError: 'popup__input_type_error',
	inputError: 'popup__input-error',
}

// Функция проверки полей
const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
}

// выкл вкл кнопка
const toggleButtonState = (inputList, buttonElement, settings) => {

	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(settings.popupSaveButtonInactive);
		buttonElement.setAttribute('disabled', true);
	}

	else {
		buttonElement.removeAttribute('disabled');
		buttonElement.classList.remove(settings.popupSaveButtonInactive);
	}
}

//добавить слушатели всем эл формы
const setEventListeners = (formElement, settings) => {

	const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
	const buttonElement = formElement.querySelector(settings.popupSaveButton);
	toggleButtonState(inputList, buttonElement, settings);

	inputList.forEach((inputElement) => {

		inputElement.addEventListener('input', () => {

			checkInputValidity(formElement, inputElement, settings);
			toggleButtonState(inputList, buttonElement, settings);
		});
	});
}

//повесить слушатели всем формам
function enableValidation(settings) {
	const formElement = document.querySelector(settings.formSelector);
	const formList = Array.from(document.querySelectorAll(settings.formSelector));
	formList.forEach((formElement) => {
		setEventListeners(formElement, settings);
	});
}

enableValidation(settings);


//показать элемент ошибки
const showInputError = (formElement, inputElement, errorMessage, settings) => {

	const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

	inputElement.classList.add(settings.inputTypeError);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(settings.inputError);
}

//скрыть элемент ошибки
const hideInputError = (formElement, inputElement, settings) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

	inputElement.classList.remove(settings.inputTypeError);
	errorElement.classList.remove(settings.inputError);
	errorElement.textContent = '';
}

//проверить валидность и вызвать функцию ошибки или нет
const checkInputValidity = (formElement, inputElement, settings) => {

	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, settings);

	} else {
		hideInputError(formElement, inputElement, settings);
	}
}