export const buttonEdit = document.querySelector(".profile__edit");
export const buttonAdd = document.querySelector(".profile__button-add");

export const popupEdit = document.querySelector('.popup_profile_edit');
export const popupAdd = document.querySelector('.popup_add_card');

export const nameProfile = document.querySelector(".profile__title");
export const job = document.querySelector(".profile__subtitle");

export const nameInput = popupEdit.querySelector(".popup__input_type_name");
export const jobInput = popupEdit.querySelector(".popup__input_type_job");

export const nameCardInput = popupAdd.querySelector(".popup__input_type_name");
export const cardImageInput = popupAdd.querySelector(".popup__input_type_job");

export const buttonElement = document.querySelector('.popup__save-button_add');

export const buttonAvatar = document.querySelector('.profile__avatar-container');
export const popupAvatar = document.querySelector('.popup_avatar');
export const avatar = document.querySelector('.profile__photo');

export const initialCards = [
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

export const settings = {
	card: '.card',
	cardImage: '.card__image',
	cardLike: '.card__like-icon',
	cardDelete: '.card__delete',
	cardTitle: '.card__title',

	form: '.popup__form',
	input: '.popup__input',
	buttonInactive: 'popup__save-button_inactive',
	button: '.popup__save-button',
	errorShow: 'popup__input_type_error',
	inputErrorMessage: 'popup__input-error',
}