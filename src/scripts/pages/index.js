import '../../style/index.css';
import {
	buttonEdit, buttonAdd, nameProfile, job,
	settings, buttonAvatar, avatar, formEdit,
	formAdd, formAvatar
} from "../utils/constants.js";

import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from "../components/UserInfo.js";

let userId;

const formValidatorEdit = new FormValidator(settings, formEdit);
const formValidatorAdd = new FormValidator(settings, formAdd);
const formValidatorAvatar = new FormValidator(settings, formAvatar);

const popupOpenImage = new PopupWithImage('.popup_open_image');
const popupFormAdd = new PopupWithForm('.popup_add_card', submitCard);
const popupFormEdit = new PopupWithForm('.popup_profile_edit', editProfile);
const popupFormAvatar = new PopupWithForm('.popup_avatar', editAvatar);
const popupFormDelete = new PopupWithForm('.popup-delete');

const userInfo = new UserInfo(nameProfile, job, avatar);

const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-50',
	headers: {
		'Content-Type': 'application/json',
		authorization: '653fc287-1617-4fdf-ab2c-e8fd91183c7f'
	}
});

//добавить карты на стр
const defaultCardList = new Section({
	renderer: createCard
}, '.cards');

Promise.all([api.getDdataUser(), api.getInicialCards()])
	.then(([dataUser, dataCards]) => {
		// тут установка данных пользователя
		// и тут отрисовка карточек
		userInfo.setUserInfo(dataUser);
		userId = dataUser._id;
		dataCards.forEach(item => {
			defaultCardList.addItem(item);
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
			if (card.hasMyLike()) {
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

//сабмит карты
function submitCard(data) {
	popupFormAdd.renderLoading(true);
	api.addNewCard(data.name, data.link)
		.then(res => {
			defaultCardList.addItem(res);
			popupFormAdd.close();
		})
		.catch(console.log)
		.finally(() => {
			popupFormAdd.renderLoading(false);
		});
}

//самбит редактирования профиля
function editProfile(data) {
	popupFormEdit.renderLoading(true);
	api.editDdataUser(data.name, data.about)
		.then(res => {
			userInfo.setUserInfo(res);
			popupFormEdit.close();
		})
		.catch(console.log)
		.finally(() => {
			popupFormEdit.renderLoading(false);
		});
}

//самбит редактирования avatar
function editAvatar(data) {
	popupFormAvatar.renderLoading(true);
	api.editAvatarUser(data.avatar)
		.then(res => {
			userInfo.setUserInfo(res);
			popupFormAvatar.close();
		})
		.catch(console.log)
		.finally(() => {
			popupFormAvatar.renderLoading(false);
		});
}

buttonEdit.addEventListener('click', () => {
	const userData = userInfo.getUserInfo();
	popupFormEdit.setInputValues(userData);
	formValidatorEdit.resetValidation();
	popupFormEdit.open();
});

buttonAdd.addEventListener('click', function () {
	popupFormAdd.open();
	formValidatorAdd.resetValidation();
});

buttonAvatar.addEventListener('click', function () {
	popupFormAvatar.open();
	formValidatorAvatar.resetValidation();
});

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
formValidatorAvatar.enableValidation();