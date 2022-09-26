import '../../style/index.css';
import {
	buttonEdit, buttonAdd, popupEdit, popupAdd, nameProfile, job,
	nameInput, jobInput, nameCardInput, cardImageInput, buttonElement,
	initialCards, settings, buttonAvatar, popupAvatar, avatar
} from "../utils/constants.js";

import { Api } from '../components/api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from "../components/UserInfo.js";
//import { ProvidePlugin } from "webpack";

const formValidatorEdit = new FormValidator(settings, popupEdit);
const formValidatorAdd = new FormValidator(settings, popupAdd);
const formValidatorAvatar = new FormValidator(settings, popupAvatar);

const popupOpenImage = new PopupWithImage('.popup_open_image');
const popupFormAdd = new PopupWithForm('.popup_add_card', submitCard);
const popupFormEdit = new PopupWithForm('.popup_profile_edit', editProfile);
const popupFormAvatar = new PopupWithForm('.popup_avatar', editAvatar);
const popupFormDelete = new PopupWithForm('.popup-delete');

const userInfo = new UserInfo(nameProfile, job, avatar);

let userId;

const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-50',
	headers: {
		'Content-Type': 'application/json',
		authorization: '653fc287-1617-4fdf-ab2c-e8fd91183c7f'
	}
});

Promise.all([api.getDdataUser(), api.getInicialCards()])
	.then(([dataUser, dataCards]) => {
		// тут установка данных пользователя
		// и тут отрисовка карточек
		userInfo.setUserInfo(dataUser);
		userId = dataUser._id;
		dataCards.forEach(item => {
			addCard(item);
		});
	})
	.catch(console.log);

function createCard(data) {
	const card = new Card(data, settings, '.card-template_type_default', userId, handleCardClick,
		(id) => {
			popupFormDelete.open();
			popupFormDelete.changeSubmitHandler(() => {
				api.deliteCard(id)
					.then(() => {
						popupFormDelete.close();
						card.deleteCard();
					})
					.catch(console.log);
			});
		},

		(id) => {
			if (card.isLikes()) {
				api.deleteLikeCard(id)
					.then((res) => {
						card.setLikes(res.likes);
					})
					.catch(console.log);
			}
			else {
				api.likeCard(id)
					.then((res) => {
						card.setLikes(res.likes);
					})
					.catch(console.log);
			}

		});
	return card.generateCard();
}

function handleCardClick(name, link) {
	popupOpenImage.open(link, name);
}

function addCard(data) {
	const cardElement = createCard(data);
	defaultCardList.addItem(cardElement);
}

//добавить карты на стр
const defaultCardList = new Section({
	items: initialCards.reverse(),
	renderer: (item) => {
		addCard(item);
	}
}, '.cards');

//сабмит карты
function submitCard(data) {
	popupFormAdd.renderLoading(true);
	api.addNewCard(data.name, data.link)
		.then(res => {
			addCard(res);
			popupFormAdd.close();
		})
		.finally(() => {
			popupFormAdd.renderLoading(false);
		})
		.catch(console.log);
}

//самбит редактирования профиля
function editProfile(data) {
	popupFormEdit.renderLoading(true);
	api.editDdataUser(data.name, data.about)
		.then(res => {
			userInfo.setUserInfo(res);
			popupFormEdit.close();
		})
		.finally(() => {
			popupFormEdit.renderLoading(false);
		})
		.catch(console.log);
}

//самбит редактирования avatar
function editAvatar(data) {
	popupFormAvatar.renderLoading(true);
	api.editAvatarUser(data.avatar)
		.then(res => {
			userInfo.setUserInfo(res);
			popupFormAvatar.close();
		})
		.finally(() => {
			popupFormAvatar.renderLoading(false);
		})
		.catch(console.log);
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