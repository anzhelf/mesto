const buttonEdit = document.querySelector(".profile__edit");
const buttonAdd = document.querySelector(".profile__button-add");

const popupEdit = document.querySelector('.popup_profile_edit');
const popupAdd = document.querySelector('.popup_add_card');
const popupImage = document.querySelector('.popup_open_image');

const popupCardImage = popupImage.querySelector('.popup__card-image');
const popupCardText = popupImage.querySelector('.popup__card-title');

const cardsContainer = document.querySelector('.cards');
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
const buttonsClose = Array.from(document.querySelectorAll('.popup__close-icon'));
buttonsClose.forEach(function (item) {
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
		addCard(renderItem(item));
	});
}

function submitCard(evt) {
	evt.preventDefault();
	const nevCard = { name: nameCardInput.value, link: cardImageInput.value };
	addCard(renderItem(nevCard));
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
	cardImage.addEventListener('click', () => openPopapImage(cardText.textContent, cardImage.src, cardImage.alt));


	butttonDelete.addEventListener('click', deleteCard);
	buttonLike.addEventListener('click', likeCard);

	return card;
}

function addCard(element) {
	cardsContainer.prepend(element);
}

//самбит редактирования профиля
function editProfile(evt) {
	evt.preventDefault();

	nameProfile.textContent = nameInput.value;
	job.textContent = jobInput.value;

	closePopup(popupEdit);
}

//открыть попап с картинкой
function openPopapImage(name, link, alt) {
	popupCardImage.src = link;
	popupCardImage.alt = alt;
	popupCardText.textContent = name;

	openPopup(popupImage);
}

function closeTabOverlay(evt) {
	if (evt.target === evt.currentTarget) {
		const deleteElement = document.querySelector(".popup_opened");
		deleteElement.classList.remove("popup_opened");
	}
}

	function closeTabKeydown(evt) {
		if (evt.key === "Escape"){
			const deleteElement = document.querySelector(".popup_opened");
		  deleteElement.classList.remove("popup_opened");
		}
	}

//открыть попап
function openPopup(popup) {
	popup.classList.add("popup_opened");

	popup.addEventListener('click', closeTabOverlay);
	document.addEventListener('keydown', closeTabKeydown);
}
//закрыть попап
function closePopup(popup) {
	popup.classList.remove("popup_opened");

	popup.removeEventListener('click', closeTabOverlay);
	document.removeEventListener('keydown', closeTabKeydown);
	
}

//очищаем и заполняем поля
function clearFillForm(popup) {
	switch (popup) {
		case popupAdd:
			blockFormInputAdd.reset();
			break;

		case popupEdit:
			nameInput.value = nameProfile.textContent;
			jobInput.value = job.textContent;
			break;
	}
};

function openClearFillPopup(popup) {
	clearFillForm(popup);
	openPopup(popup);
}

renderList(initialCards);// добавить 6 карточек из массива
buttonEdit.addEventListener('click', () => openClearFillPopup(popupEdit));
buttonAdd.addEventListener('click', () => openClearFillPopup(popupAdd));
blockFormInputEdit.addEventListener("submit", editProfile);
blockFormInputAdd.addEventListener("submit", submitCard);
