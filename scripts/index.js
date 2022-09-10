import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Popup } from './Popup.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from "./UserInfo.js";

const initialCards = [
	{
		text: "Архыз",
		image: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
	},
	{
		text: "Челябинская область",
		image: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
	},
	{
		text: "Иваново",
		image: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
	},
	{
		text: "Камчатка",
		image: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
	},
	{
		text: "Холмогорский район",
		image: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
		text: "Байкал",
		image: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	},
];

const settings = {
	card: '.card',
	cardImage: '.card__image',
	cardLike: '.card__like',
	cardDelete: '.card__delete',
	cardTitle: '.card__title',

	form: '.popup__form',
	input: '.popup__input',
	buttonInactive: 'popup__save-button_inactive',
	button: '.popup__save-button',
	errorShow: 'popup__input_type_error',
	inputErrorMessage: 'popup__input-error',
}

const buttonEdit = document.querySelector(".profile__edit");
const buttonAdd = document.querySelector(".profile__button-add");

const popupEdit = document.querySelector('.popup_profile_edit');
const popupAdd = document.querySelector('.popup_add_card');

const popupImage = document.querySelector('.popup_open_image');
const popupCardImage = popupImage.querySelector('.popup__card-image');
const popupCardText = popupImage.querySelector('.popup__card-title');

const nameProfile = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");

const blockFormEdit = popupEdit.querySelector(".popup__form");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_job");

const blockFormAdd = popupAdd.querySelector(".popup__form");
const nameCardInput = popupAdd.querySelector(".popup__input_type_name");
const cardImageInput = popupAdd.querySelector(".popup__input_type_job");

const buttonElement = document.querySelector('.popup__save-button_add');

const formValidatorEdit = new FormValidator(settings, popupEdit);
const formValidatorAdd = new FormValidator(settings, popupAdd);

const popupOpenEdit = new Popup('.popup_profile_edit');
const popupOpenAdd = new Popup('.popup_add_card');

const popupOpenImage = new PopupWithImage('.popup_open_image');
const popupFormAdd = new PopupWithForm('.popup_add_card', submitCard);
const popupFormEdit = new PopupWithForm('.popup_profile_edit', editProfile);

const userInfo = new UserInfo(nameProfile, job);

//добавить 6 карт на стр
const defaultCardList = new Section({
	items: initialCards.reverse(),
	renderer: (item) => {
		const card = new Card(item, settings, '.card-template_type_default', handleCardClick);
		const cardElement = card.generateCard();
		defaultCardList.addItem(cardElement);
	}
}, '.cards');
defaultCardList.renderItems();

//сабмит карты
function submitCard(evt) {
	evt.preventDefault();
	const card = new Card({ text: nameCardInput.value, image: cardImageInput.value }, settings, '.card-template_type_default', handleCardClick);
	const cardElement = card.generateCard();
	defaultCardList.addItem(cardElement);
	popupFormAdd.close();
}

//самбит редактирования профиля
function editProfile(evt) {
	evt.preventDefault();
	userInfo.setUserInfo({
		userName: nameInput.value,
		userJob: jobInput.value
	});
	popupFormEdit.close();
}

buttonEdit.addEventListener('click', () => {
	const data = userInfo.getUserInfo();
	nameInput.value = data.userName;
	jobInput.value = data.userJob;
	popupOpenEdit.open();
});

buttonAdd.addEventListener('click', function () {
	//blockFormAdd.reset();
	popupOpenAdd.open();
	buttonElement.classList.add(settings.buttonInactive);
	buttonElement.setAttribute('disabled', 'disabled');
});

function handleCardClick(text, image) {
	popupOpenImage.open(image, text);
}

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
blockFormEdit.addEventListener("submit", editProfile);
blockFormAdd.addEventListener("submit", submitCard);