//import '../../style/index.css';
import {
	buttonEdit, buttonAdd, popupEdit, popupAdd, nameProfile, job,
	nameInput, jobInput, nameCardInput, cardImageInput, buttonElement,
	initialCards, settings
} from "../utils/constants.js";

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from "../components/UserInfo.js";

const formValidatorEdit = new FormValidator(settings, popupEdit);
const formValidatorAdd = new FormValidator(settings, popupAdd);

const popupOpenImage = new PopupWithImage('.popup_open_image');
const popupFormAdd = new PopupWithForm('.popup_add_card', submitCard);
const popupFormEdit = new PopupWithForm('.popup_profile_edit', editProfile);

const userInfo = new UserInfo(nameProfile, job);

function createCard(data) {
	const card = new Card(data, settings, '.card-template_type_default', handleCardClick);
	const cardElement = card.generateCard();
	defaultCardList.addItem(cardElement);
}

//добавить 6 карт на стр
const defaultCardList = new Section({
	items: initialCards.reverse(),
	renderer: (item) => {
		createCard(item);
	}
}, '.cards');
defaultCardList.renderItems();

//сабмит карты
function submitCard(evt) {
	evt.preventDefault();
	const dataAdd = popupFormEdit.getInputValues();
	createCard({ text: nameCardInput.value, image: cardImageInput.value });
	popupFormAdd.close();
}

//самбит редактирования профиля
function editProfile(evt) {
	evt.preventDefault();
	const dataEdit = popupFormEdit.getInputValues();
	userInfo.setUserInfo(dataEdit);
	popupFormEdit.close();
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

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();