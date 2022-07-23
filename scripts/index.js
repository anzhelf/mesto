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

const popup = document.querySelector('.popup');
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('.card-template').content;

const editButton = document.querySelector(".profile__edit"); //кнопки
//const closeButton = popup.querySelector(".popup__close-icon");// найти все и повесить слушатель 1

const addButton = document.querySelector(".profile__button-add");

const nameProfile = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");

const popupEdit = popup.querySelector('.popup__container_edit');//формы
const blockFormInputEdit = popupEdit.querySelector(".popup__form");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_job");
const saveButtonEdit = popupEdit.querySelector(".popup__save-button");
const closeButton = popupEdit.querySelector(".popup__close-icon");

const popupAdd = popup.querySelector('.popup__container_add');
const blockFormInputAdd = popupAdd.querySelector(".popup__form");
const nameCardInput = popupAdd.querySelector(".popup__input_type_name");
const cardImageInput = popupAdd.querySelector(".popup__input_type_job");
const saveButtonAdd = popupAdd.querySelector(".popup__save-button");
const closeButtonAdd = popupAdd.querySelector(".popup__close-icon");

//перебирает массив с карточками
function renderList(data) {
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
	function cardDelete(evt) {
		evt.target;
		const listItem = deleteButtton.closest('.card');
		listItem.remove();
	}

	//идеально работает лайк
	const likeButton = card.querySelector('.card__like');
	likeButton.addEventListener('click', cardLike);
	function cardLike(evt) {
		evt.target.classList.toggle('card__like_active');
	}

	cards.append(card);
}

//Вешаем слушатели и ищщем карты
function openImage() {
	const cardAll = cards.querySelectorAll('.card__image');
	const postsAll = Array.from(cardAll);

	//Повесили слушатель на каждую карточку
	postsAll.forEach(function popupListener(item) {
		item.addEventListener('click', openPopapImage);
	});
}

//открыть попап редактирования 1
function togglePopup() {
	popupEdit.classList.toggle("popup__container_open");
	popup.classList.toggle("popup_opened");

	if (popup.classList.contains("popup_opened") === false) {
		nameInput.value = nameProfile.textContent;
		jobInput.value = job.textContent;
	}
}

//открыть попап добавить карту 2
function togglePopupAdd() {
	popupAdd.classList.toggle("popup__container_open");
	popup.classList.toggle("popup_opened");

	nameCardInput.value = '';
	cardImageInput.value = '';
	blockFormInputAdd.addEventListener("submit", handleFormSubmitAdd);
}

//самбит редактирования профиля
function handleFormSubmit(evt) {
	evt.preventDefault();

	nameProfile.textContent = nameInput.value;
	job.textContent = jobInput.value;

	togglePopup();
}

//сабмит попап добавить карту
function handleFormSubmitAdd(evt) {
	evt.preventDefault();

	const card = templateCard.querySelector('.card').cloneNode(true);
	const cardImage = card.querySelector('.card__image');
	const cardName = card.querySelector('.card__title');

	cardImage.src = cardImageInput.value;
	cardName.textContent = nameCardInput.value;

	cards.prepend(card);
	openImage();

	console.log('карточкa добавлена');
	togglePopupAdd();

	//идеально работает лайк
	const likeButton = card.querySelector('.card__like');
	likeButton.addEventListener('click', cardLike);
	function cardLike(evt) {
		evt.target.classList.toggle('card__like_active');
	}

	//идеально удаляет
	const deleteButtton = card.querySelector('.card__delete');
	deleteButtton.addEventListener('click', cardDelete);
	function cardDelete(evt) {
		evt.target;
		const listItem = deleteButtton.closest('.card');
		listItem.remove();
	}
}
//открыть попап с картинкой
function openPopapImage(evt) {
	const cardK = evt.target;
	const cardElement = cardK.parentElement;

	const cardImage = cardElement.querySelector('.card__image');
	const cardName = cardElement.querySelector('.card__title');

	const popupImage = document.querySelector(".popup__card-container");

	console.log(cardName);

	function togglePopupImage() {
		popup.classList.toggle("popup_opened");
		popupImage.classList.toggle("popup__container_open");
	}
	togglePopupImage();

	const popupImagePlace = popupImage.querySelector('.popup__card-image');
	const popupTextPlace = popupImage.querySelector('.popup__card-title');

	// заменяем содержимое
	popupImagePlace.src = cardImage.getAttribute('src');
	popupTextPlace.textContent = cardName.textContent;

	// удаляет
	const closeButtonImg = popupImage.querySelector('.popup__close-icon');
	closeButtonImg.addEventListener('click', togglePopupImage);

}

renderList(initialCards);// добавить 6 карточек из массива
openImage();
editButton.addEventListener('click', togglePopup);
closeButton.addEventListener("click", togglePopup);
blockFormInputEdit.addEventListener("submit", handleFormSubmit);

addButton.addEventListener('click', togglePopupAdd);
closeButtonAdd.addEventListener("click", togglePopupAdd);