const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const editButton = document.querySelector(".profile__edit");

const addButton = document.querySelector(".profile__button-add");//
const templatePopupAdd = document.querySelector(".popup-template__add-card").content;//
const popupAddCard = templatePopupAdd.querySelector(".popup");//
const closeButtonAdd = popupAddCard.querySelector(".popup__close-icon");
const blockFormInputAdd = popupAddCard.querySelector(".popup__form");

const templatePopupEdit = document.querySelector(".popup-template__edit-profile").content;
const popup = templatePopupEdit.querySelector(".popup");

const cards = document.querySelector('.cards');
const templateCard = document.querySelector('.card-template').content;
//const card = templateCard.querySelector('.card');

const closeButton = popup.querySelector(".popup__close-icon");

const nameProfile = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const blockFormInput = popup.querySelector(".popup__form");
const saveButton = popup.querySelector(".popup__save-button");

const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");



//поставить 6 карт из массива
//перебирает массив с карточками
function renderList(data){
  data.forEach(function (item) {
  renderItem(item);
});
}
//ставит 6 на стр
 function renderItem(content) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardText = card.querySelector('.card__title');

  cardImage.src = content.link;
  cardText.textContent = content.name;

//идеально удаляет
  const deleteButtton = card.querySelector('.card__delete');
  deleteButtton.addEventListener('click', cardDelete);
  function cardDelete (evt){
    evt.target;
    const listItem = deleteButtton.closest('.card');
    listItem.remove();
  }

//идеально работает лайк
const likeButton = card.querySelector('.card__like');
likeButton.addEventListener('click', cardLike);
function cardLike (evt) {
  evt.target.classList.toggle('card__like_active');
}

  cards.append(card);
  //console.log('карточкa добавлена');
 }

 //открыть попап
 function openedPopup(){
  popup.cloneNode(true);
  console.log('открыть попап');
 }

 function closePopupAdd(){
	popupAddCard.remove();
	console.log('Закрыть форму');
 }

 function closePopup(){
  popup.remove();
  console.log('Закрыть форму');
 }

 ///попап добавить карточку
 function openPopupAdd() {

	const nameInput = popupAddCard.querySelector(".popup__input_type_name");
  const jobInput = popupAddCard.querySelector(".popup__input_type_job");

  popupAddCard.cloneNode(true);
	console.log('открыть попап добавить карточку');

	nameInput.value = '';
  jobInput.value = '';

  //popup.querySelector(".popup__title").textContent = "Новое место";
  //const nameCard = (popup.querySelector(".popup__input_type_name").placeholder = "Название");
  //const linkCard = (popup.querySelector(".popup__input_type_job").placeholder = "Ссылка на картинку");
  //nameCard.value = null;
  //linkCard.value = null;
  //popup.querySelector(".popup__save-button").textContent = "Создать";

  popupAdd.append(popupAddCard);

  console.log("Открыть форму добавить карточку");
	


  blockFormInputAdd.addEventListener("submit", handleFormSubmitAdd);
	closeButtonAdd.addEventListener("click", closePopupAdd);
 }

 //открыть попап редактирования
 function openPopupEdit(){
  const nameInput = popup.querySelector(".popup__input_type_name");
  const jobInput = popup.querySelector(".popup__input_type_job");
  openedPopup();

  //popup.querySelector(".popup__title").textContent = "Редактировать профиль";
  //nameInput.placeholder = "Имя";
  nameInput.value = nameProfile.textContent;
  //jobInput.placeholder = "Работа";
  jobInput.value = job.textContent;
  //popup.querySelector(".popup__save-button").textContent = "Сохранить";

  popupEdit.append(popup);

  console.log("Открыть форму редактирования");

  blockFormInput.addEventListener("submit", handleFormSubmitEdit);
 }

//сабмит попап редактирования
 function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  const nameInput = popup.querySelector(".popup__input_type_name");
  const jobInput = popup.querySelector(".popup__input_type_job");
  
  nameProfile.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup();
  console.log("Форма отправлена");
}

//сабмит попап добавить карту
function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardText = card.querySelector('.card__title');

  const nameInput = popupAddCard.querySelector(".popup__input_type_name");
  const jobInput = popupAddCard.querySelector(".popup__input_type_job");

  cardImage.src = jobInput.value;
  cardText.textContent = nameInput.value;

  cards.append(card);
  console.log('карточкa добавлена');

	closePopupAdd();
//Удаляем попап
	const deleteButtton = card.querySelector('.card__delete');
  deleteButtton.addEventListener('click', cardDelete);
  function cardDelete (evt){
    evt.target;
    const listItem = deleteButtton.closest('.card');
    listItem.remove();
  }

}

 renderList(initialCards);// добавить 6 карточек из массива
 addButton.addEventListener('click', openPopupAdd); // открыть попап
 editButton.addEventListener('click', openPopupEdit); // открыть попап
 closeButton.addEventListener("click", closePopup);

 const cardImage = card.querySelector('.card')

 

