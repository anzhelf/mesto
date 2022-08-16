const buttonEdit = document.querySelector(".profile__edit");
const buttonAdd = document.querySelector(".profile__button-add");

const popupEdit = document.querySelector('.popup_profile_edit');
const popupAdd = document.querySelector('.popup_add_card');

const cardsContainer = document.querySelector('.cards');
const templateCard = document.querySelector('.card-template').content;

//popup img
const popupImage = document.querySelector('.popup_open_image');
const popupCardImage = popupImage.querySelector('.popup__card-image');
const popupCardText = popupImage.querySelector('.popup__card-title');
const buttonClose = popupImage.querySelector('.popup__close-icon');

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

const buttonElement = document.querySelector('.popup__save-button_add');

//кнопка закрыть
const buttonsClose = Array.from(document.querySelectorAll('.popup__close-icon'));
buttonsClose.forEach(function (item) {
	item.addEventListener('click', function () {
		const popup = item.closest('.popup');
		closePopup(popup);
	});
});

function submitCard(evt) {
	evt.preventDefault();
	const card = new Card({ text: nameCardInput.value, image: cardImageInput.value }, '.card-template_type_default');
	const cardElement = card.generateCard();

	addCard(cardElement);
	closePopup(popupAdd);
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

buttonEdit.addEventListener('click', function () {
	nameInput.value = nameProfile.textContent;
	jobInput.value = job.textContent;
	openPopup(popupEdit);

});

buttonAdd.addEventListener('click', function () {
	blockFormInputAdd.reset();
	openPopup(popupAdd);
	buttonElement.classList.add('popup__save-button_inactive');
	buttonElement.setAttribute('disabled', 'disabled');
});

function closeTabOverlay(evt) {
	if (evt.target === evt.currentTarget) {
		closePopup(evt.target);
	}
}

function closeTabKeydown(evt) {
	if (evt.key === "Escape") {
		const deleteElement = document.querySelector(".popup_opened");
		closePopup(deleteElement);
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

blockFormInputEdit.addEventListener("submit", editProfile);
blockFormInputAdd.addEventListener("submit", submitCard);