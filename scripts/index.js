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

const cards = document.querySelector('.cards');//!!!!
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
	//console.log('карточкa добавлена');
}

//открыть попап
function openedPopup() {
	popup.cloneNode(true);
	console.log('открыть попап');
}

function closePopupAdd() {
	popupAddCard.remove();
	console.log('Закрыть форму');
}

function closePopup() {
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

	popupAdd.append(popupAddCard);

	console.log("Открыть форму добавить карточку");

	blockFormInputAdd.addEventListener("submit", handleFormSubmitAdd);
	closeButtonAdd.addEventListener("click", closePopupAdd);

}

//открыть попап редактирования
function openPopupEdit() {
	const nameInput = popup.querySelector(".popup__input_type_name");
	const jobInput = popup.querySelector(".popup__input_type_job");

	openedPopup();

	nameInput.value = nameProfile.textContent;
	jobInput.value = job.textContent;

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

	cards.prepend(card);
	openImage();
	
	console.log('карточкa добавлена');

	//идеально работает лайк
	const likeButton = card.querySelector('.card__like');
	likeButton.addEventListener('click', cardLike);
	function cardLike(evt) {
		evt.target.classList.toggle('card__like_active');
	}

	closePopupAdd();
	//Удаляем попап
	const deleteButtton = card.querySelector('.card__delete');
	deleteButtton.addEventListener('click', cardDelete);
	function cardDelete(evt) {
		evt.target;
		const listItem = deleteButtton.closest('.card');
		listItem.remove();
	}

}

renderList(initialCards);// добавить 6 карточек из массива
openImage();
addButton.addEventListener('click', openPopupAdd); // открыть попап
editButton.addEventListener('click', openPopupEdit); // открыть попап
closeButton.addEventListener("click", closePopup);

/////////



function openImage() {
const cardAll = cards.querySelectorAll('.card__image');//нашли все карты на стр
const postsAll = Array.from(cardAll);//превратили псевдомассив в массив

//console.log(postsAll);//вывели масив в консоль

//Повесили слушатель на каждую карточку
postsAll.forEach(function popupListener(item) {
    item.addEventListener('click', openPopapImage);
});


}

function openPopapImage(evt) {
	console.log('клик по карточке');
	const cardK = evt.target;
	const cardElement = cardK.parentElement
	//console.log(cardElement);
	const cardImage = cardElement.querySelector('.card__image');
	const cardText = cardElement.querySelector('.card__title');
	console.log(cardImage);
	console.log(cardText);

	const popupImageTemplate = document.querySelector(".image-template").content;
	const popupImage = popupImageTemplate.querySelector('.popup').cloneNode(true);

	//добавляем попап открытия картинки
	popupImageOpen = document.querySelector('.popup-image');
	popupImageOpen.append(popupImage);

		//идеально удаляет
		const deleteButtton = popupImage.querySelector('.popup__close-icon');
		deleteButtton.addEventListener('click', cardDelete);
		function cardDelete() {
			popupImage.remove();
		}	

		const popupImagePlace = popupImage.querySelector('.popup-card__image');
		const popupTextPlace = popupImage.querySelector('.popup-card__title');

		// заменяем содержимое
		popupImagePlace.src = cardImage.getAttribute('src');
		popupTextPlace.textContent = cardText.textContent;
}
