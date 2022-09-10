import {
	buttonEdit, buttonAdd, popupEdit, popupAdd, nameProfile, job,
	nameInput, jobInput, nameCardInput, cardImageInput, buttonElement
} from "../utils/constants.js";

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from "../components/UserInfo.js";

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

const formValidatorEdit = new FormValidator(settings, popupEdit);
const formValidatorAdd = new FormValidator(settings, popupAdd);

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
	popupFormEdit.open();
});

buttonAdd.addEventListener('click', function () {
	popupFormAdd.open();
	buttonElement.classList.add(settings.buttonInactive);
	buttonElement.setAttribute('disabled', 'disabled');
});

function handleCardClick(text, image) {
	popupOpenImage.open(image, text);
}

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();