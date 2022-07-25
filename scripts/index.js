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

const buttonEdit = document.querySelector(".profile__edit");
const buttonAdd = document.querySelector(".profile__button-add");

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

const popupCardImage = popupImage.querySelector('.popup__card-image');
const popupCardText = popupImage.querySelector('.popup__card-title');

const cards = document.querySelector('.cards');
const templateCard = document.querySelector('.card-template').content;

const nameProfile = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");

const blockFormInputEdit = popupEdit.querySelector(".popup__form");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_job");
const buttonSaveEdit = popupEdit.querySelector(".popup__save-button");

const blockFormInputAdd = popupAdd.querySelector(".popup__form");
const nameCardInput = popupAdd.querySelector(".popup__input_type_name");
const cardImageInput = popupAdd.querySelector(".popup__input_type_job");
const buttonSaveAdd = popupAdd.querySelector(".popup__save-button");

const popupCardLink = popupImage.querySelector('.popup__card-image');
const popupCardImg = popupImage.querySelector('.popup__card-title');

//кнопка закрыть
const buttonClose = Array.from(document.querySelectorAll('.popup__close-icon'));
buttonClose.forEach( function(item) {
	item.addEventListener('click', function () {
		const popup = item.closest('.popup');
		closePopup(popup);
	});
});

//лайк
function likeCard(evt) {
	evt.target.classList.toggle('card__like_active');
}
//удалить
function deleteCard(evt) {
	const element = evt.target;
	const listItem = element.closest('.card');
	listItem.remove();
}

//перебирает массив с карточками
function renderList(data) {
	data.forEach(function (item) {
		renderItem(item);
	});
}

function addCard (evt) {
	evt.preventDefault();

	initialCards.push({
		name: nameCardInput.value,
		link: cardImageInput.value,
	});

	//при сабмите
	//создаем карту и вешаем последний объект массива
	const nevCard = initialCards[initialCards.length - 1];
	renderItem(nevCard);
	closePopup(popupAdd);
}

//ставит 6 на стр
function renderItem(content) {
	//клонируем шаблон карты
	const card = templateCard.querySelector('.card').cloneNode(true);
	const cardImage = card.querySelector('.card__image');
	const cardText = card.querySelector('.card__title');

	const butttonDelete = card.querySelector('.card__delete');
	const buttonLike = card.querySelector('.card__like');

	//наполняем содержимым
	cardImage.src = content.link;
	cardImage.alt = content.name;
	cardText.textContent = content.name;

	//вешаем слушатели
  cardImage.addEventListener('click', openPopapImage);
  butttonDelete.addEventListener('click', deleteCard);
	buttonLike.addEventListener('click', likeCard);

  //вставляем в начало
	cards.prepend(card);
}

//самбит редактирования профиля
function editProfile(evt) {
	evt.preventDefault();

	nameProfile.textContent = nameInput.value;
	job.textContent = jobInput.value;

	closePopup(popupEdit);
}

//открыть попап с картинкой
function openPopapImage(evt) {
	const cardImg = evt.target;
	const cardElement = cardImg.closest('.card');

	const cardImage = cardElement.querySelector('.card__image');
	const cardName = cardElement.querySelector('.card__title');

	popupCardImage.src = cardImage.getAttribute('src');
	popupCardText.textContent = cardName.textContent;

	openPopup(popupImage);
}

//открыть попап
function openPopup(popup) {
	popup.classList.add("popup_opened");
}
//закрыть попап
function closePopup(popup) {
	popup.classList.remove("popup_opened");
}

renderList(initialCards);// добавить 6 карточек из массива

buttonEdit.addEventListener('click', function(){
	nameInput.value = nameProfile.textContent;
	jobInput.value = job.textContent;
	openPopup(popupEdit);
});

buttonAdd.addEventListener('click', function(){
	nameCardInput.value = '';
	cardImageInput.value = '';
	openPopup(popupAdd);
});

blockFormInputEdit.addEventListener("submit", editProfile);
blockFormInputAdd.addEventListener("submit", addCard);