const editButton = document.querySelector(".profile__edit"); // Кнопка редактировать
const popup = document.querySelector(".popup"); //попап
const closeButton = popup.querySelector(".popup__close-icon"); // крестик закрыть попап
const nameProfile = document.querySelector(".profile__title"); //Имя на странице
const job = document.querySelector(".profile__subtitle"); //Работа на странице
const blockFormInput = popup.querySelector(".popup__form"); //поля и кнопка формы для ввода
const saveButton = popup.querySelector(".popup__save-button"); //кнопка сохранить
const nameInput = popup.querySelector(".popup__input_type_name"); //поле имя
const jobInput = popup.querySelector(".popup__input_type_job"); //поле работа

function togglePopup() {
  //открыть закрыть попап
  popup.classList.toggle("popup_opened"); //закрыть попап

  nameInput.value = nameProfile.textContent; //очистить поля ввода
  jobInput.value = job.textContent;
}

function handleFormSubmit(evt) {
  //отправить форму
  evt.preventDefault(); // не перезагружаем стр.

  nameProfile.textContent = nameInput.value; //инфомация профиля = заполненым полям
  job.textContent = jobInput.value;
  togglePopup(); //закрываем и обновляем поля
  console.log("Форма отправлена");
}

editButton.addEventListener("click", togglePopup); //редактировать - открываем форму и обновляем поля из профиля
closeButton.addEventListener("click", togglePopup); //закрыть - закрываем форму и стираем поля
blockFormInput.addEventListener("submit", handleFormSubmit); //сохраняем информацию
