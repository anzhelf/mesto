const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');

// Функция проверки полей
const hasInvalidInput = (inputList) => {

  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;

  })
}

// выкл вкл кнопка
const toggleButtonState = (inputList, buttonElement) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
		buttonElement.setAttribute('disabled', true);
  }

	else {
		buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__save-button_inactive');
  }
}

//добавить слушатели всем эл формы
const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__save-button');
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

  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {

    setEventListeners(formElement);
  });
}

enableValidation();


//показать элемент ошибки
const showInputError = (formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

  inputElement.classList.add('popup__input_type_error');
	errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error');
}
  
//скрыть элемент ошибки
const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

  inputElement.classList.remove('popup__input_type_error');
	errorElement.classList.remove('popup__input-error');
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