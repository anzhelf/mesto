import '../../style/index.css';
import {
	buttonEdit, buttonAdd, popupEdit, popupAdd, nameProfile, job,
	nameInput, jobInput, nameCardInput, cardImageInput, buttonElement,
	initialCards, settings, buttonAvatar, popupAvatar, avatar
} from "../utils/constants.js";

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from "../components/UserInfo.js";

const formValidatorEdit = new FormValidator(settings, popupEdit);
const formValidatorAdd = new FormValidator(settings, popupAdd);
const formValidatorAvatar = new FormValidator(settings, popupAvatar);

const popupOpenImage = new PopupWithImage('.popup_open_image');
const popupFormAdd = new PopupWithForm('.popup_add_card', submitCard);
const popupFormEdit = new PopupWithForm('.popup_profile_edit', editProfile);
const popupFormAvatar = new PopupWithForm('.popup_avatar', editAvatar);

const userInfo = new UserInfo(nameProfile, job);

function createCard(data) {
	const card = new Card(data, settings, '.card-template_type_default', handleCardClick);
	return card.generateCard();
}

function addCard(data) {
	const cardElement = createCard(data);
	defaultCardList.addItem(cardElement);
}

//добавить 6 карт на стр
const defaultCardList = new Section({
	items: initialCards.reverse(),
	renderer: (item) => {
		addCard(item);
	}
}, '.cards');
defaultCardList.renderItems();

//сабмит карты
function submitCard(data) {
	addCard(data);
	popupFormAdd.close();
}

//самбит редактирования профиля
function editProfile(data) {
	userInfo.setUserInfo(data);
	popupFormEdit.close();
}

//самбит редактирования avatar
function editAvatar(data) {
	avatar.src = data.image;
	popupFormAvatar.close();
}

buttonEdit.addEventListener('click', () => {
	const userData = userInfo.getUserInfo();
	nameInput.value = userData.userName;
	jobInput.value = userData.userJob;
	formValidatorEdit.hideInputError();
	formValidatorEdit.toggleButtonState();
	popupFormEdit.open();
});

buttonAdd.addEventListener('click', function () {
	popupFormAdd.open();
	formValidatorAdd.disableSubmitButton();
	formValidatorAdd.hideInputError();
});

function handleCardClick(text, image) {
	popupOpenImage.open(image, text);
}

buttonAvatar.addEventListener('click', function () {
	popupFormAvatar.open();
	formValidatorAvatar.disableSubmitButton();
	formValidatorAvatar.hideInputError();
});

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
formValidatorAvatar.enableValidation();