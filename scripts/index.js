const editButton = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-icon");
let nameProfile = document.querySelector(".profile__title");
let job = document.querySelector(".profile__subtitle");

function openСloseForm() {
  popup.classList.toggle("popup_opened");
}

editButton.addEventListener("click", openСloseForm);
closeButton.addEventListener("click", function () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = job.textContent;
  openСloseForm();
});

const formInput = popup.querySelector(".popup__form");
const saveButton = popup.querySelector(".popup__save-button");
const nameInput = popup.querySelector(".popup__input_type_name");
const jobInput = popup.querySelector(".popup__input_type_job");

formInput.addEventListener("submit", function () {
  console.log("Форма отправлена");
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  job.textContent = jobInput.value;
  openСloseForm();
}

saveButton.addEventListener("click", formSubmitHandler);
