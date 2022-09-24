//import '../../style/index.css';
import {
	buttonEdit, buttonAdd, popupEdit, popupAdd, nameProfile, job,
	nameInput, jobInput, nameCardInput, cardImageInput, buttonElement,
	initialCards, settings, buttonAvatar, popupAvatar, avatar
} from "../utils/constants.js";

import { Api } from '../api.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from "../components/UserInfo.js";
//import { electron } from "webpack";

const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-50',
	headers: {
		'Content-Type': 'application/json',
		authorization: '653fc287-1617-4fdf-ab2c-e8fd91183c7f'
	}
});

const tasksUser = api.getDdataUser();
tasksUser.then(data => {
	//console.log('ответ', data);
	userInfo.setUserInfo(data);
});

const tasksCards = api.getInicialCards();
tasksCards.then(data => {
	//console.log('ответ-cards', data);
	data.forEach(item => {
		//console.log(item);
		addCard(item);
	});
});

const formValidatorEdit = new FormValidator(settings, popupEdit);
const formValidatorAdd = new FormValidator(settings, popupAdd);
const formValidatorAvatar = new FormValidator(settings, popupAvatar);

const popupOpenImage = new PopupWithImage('.popup_open_image');
const popupFormAdd = new PopupWithForm('.popup_add_card', submitCard);
const popupFormEdit = new PopupWithForm('.popup_profile_edit', editProfile);
const popupFormAvatar = new PopupWithForm('.popup_avatar', editAvatar);

const popupFormDelete = new PopupWithForm('.popup-delete');

const userInfo = new UserInfo(nameProfile, job);

function createCard(data) {
	const card = new Card(data, settings, '.card-template_type_default', handleCardClick,
	(id) => {
		console.log(data);
		popupFormDelete.open();
		popupFormDelete.changeSubmitHandler(() => {
			console.log(id);
			api.deliteCard(id)
			.then(res => {
				popupFormDelete.close();
				console.log(res);
				card.deleteCard();

			});
		});
	});
	return card.generateCard();
}

function handleCardClick(name, link) {
	popupOpenImage.open(link, name);
}

function addCard(data) {
	console.log(data);
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
//defaultCardList.renderItems();

//сабмит карты
function submitCard(data) {
	api.addNewCard(data.name, data.link)
		.then(res => {
			addCard(res);
			popupFormAdd.close();
		});
}

//самбит редактирования профиля
function editProfile(data) {
	api.editDdataUser(data.name, data.about)
		.then(res => {
			userInfo.setUserInfo(res);
			popupFormEdit.close();
		});
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

buttonAvatar.addEventListener('click', function () {
	popupFormAvatar.open();
	formValidatorAvatar.disableSubmitButton();
	formValidatorAvatar.hideInputError();
});

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
formValidatorAvatar.enableValidation();