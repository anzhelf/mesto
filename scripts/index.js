const editButton = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-icon");
const nameProfile = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const blockFormInput = popup.querySelector(".popup__form");
const saveButton = popup.querySelector(".popup__save-button");
const nameInput = popup.querySelector(".popup__input_type_name");
const jobInput = popup.querySelector(".popup__input_type_job");

function togglePopup() {
  popup.classList.toggle("popup_opened");

  if (popup.classList.contains("popup_opened") === false) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = job.textContent;
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  job.textContent = jobInput.value;
  togglePopup();
  console.log("Форма отправлена");
}

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);
blockFormInput.addEventListener("submit", handleFormSubmit);
