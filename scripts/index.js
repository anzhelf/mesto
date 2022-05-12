const editButton = document.querySelector(".kusto__edit");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-icon");

function openForm() {
  popup.classList.remove("popup_opened");
}
editButton.addEventListener("click", openForm);

function closeForm() {
  popup.classList.add("popup_opened");
}
closeButton.addEventListener("click", closeForm);

const formInput = popup.querySelector(".popup__form");
const saveButton = popup.querySelector(".popup__button");
const nameInput = popup.querySelector(".popup__input_type_name");
const jobInput = popup.querySelector(".popup__input_type_job");

formInput.addEventListener("submit", function () {
  console.log("Форма отправлена");
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  const name = document.querySelector(".kusto__title");
  const job = document.querySelector(".kusto__subtitle");
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closeForm();
}

saveButton.addEventListener("click", formSubmitHandler);
