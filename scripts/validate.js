const settingsCheck = {
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
const toggleButtonState = (inputList, buttonElement) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsCheck.popupSaveButtonInactive);
		buttonElement.setAttribute('disabled', true);
  }

	else {
		buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(settingsCheck.popupSaveButtonInactive);
  }
}

//добавить слушатели всем эл формы
const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(settingsCheck.inputSelector));
	const buttonElement = formElement.querySelector(settingsCheck.popupSaveButton);
	toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {

      checkInputValidity(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
    });
  });
}

//повесить слушатели всем формам
const enableValidation = () => {
	const formElement = document.querySelector(settingsCheck.formSelector);
  const formList = Array.from(document.querySelectorAll(settingsCheck.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();


//показать элемент ошибки
const showInputError = (formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

  inputElement.classList.add(settingsCheck.inputTypeError);
	errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsCheck.inputError);
}
  
//скрыть элемент ошибки
const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

  inputElement.classList.remove(settingsCheck.inputTypeError);
	errorElement.classList.remove(settingsCheck.inputError);
	errorElement.textContent = '';
}

//проверить валидность и вызвать функцию ошибки или нет
const checkInputValidity = (formElement, inputElement) => {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);

  } else {
    hideInputError(formElement, inputElement);
  }
}