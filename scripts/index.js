const editButton = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-icon");
const nameProfile = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const blockFormInput = popup.querySelector(".popup__form");
const saveButton = popup.querySelector(".popup__save-button");
const nameInput = popup.querySelector(".popup__input_type_name");
const jobInput = popup.querySelector(".popup__input_type_job");

function openСlosePopup() {
  popup.classList.toggle("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  job.textContent = jobInput.value;
  openСlosePopup();
}

closeButton.addEventListener("click", function () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = job.textContent;
  openСlosePopup();
});

editButton.addEventListener("click", openСlosePopup);
saveButton.addEventListener("click", handleFormSubmit);

blockFormInput.addEventListener("submit", function () {
  console.log("Форма отправлена");
});
