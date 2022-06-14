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

//

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const addButton = document.querySelector(".profile__button-add");//кнопка доавить карточку
//const deletButton = document.querySelector(".")
const likeButton = document.querySelector(".card__like");
const card = document.querySelector(".card");


function togglePopupAdd() {

  //const popupAdd = document.querySelector("#popup__add").content;//получаем содержимое
  //const popupElement = popupAdd.querySelector('.popup').cloneNode(true);//клонируем
  //
  //userElement.querySelector('.popup__input_type_name').value = "Название";//наполняем содержимым
  //userElement.querySelector('.popup__input_type_job').value="Ссылка на картинку";
  //
  //usersOnline.append(popupElement); //отображаем на стр

  console.log('Нажали на кнопку - функция запустилась');

}

addButton.addEventListener("click", togglePopupAdd);// при нажатии на кнопку открывается попап добавить карточку