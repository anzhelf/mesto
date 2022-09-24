import { PopupWithForm } from "./PopupWithForm.js";

export class Card {
	constructor(data, settings, templateSelector, handleCardClick, handleDeleteClik) {
		this._image = data.link;
		this._text = data.name;
		this._likes = data.likes;
		this._id = data._id;

		this._card = settings.card;
		this._cardImg = settings.cardImage;
		this._cardLike = settings.cardLike;
		this._cardDelete = settings.cardDelete;
		this._cardTitle = settings.cardTitle;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
		this._handleDeleteClik = handleDeleteClik;
	}

	//достаем разметку
	_getTemplate() {
		const cardElement = document.querySelector(this._templateSelector).content.querySelector(this._card).cloneNode(true);
		return cardElement;
	}

	//создаем карты
	generateCard() {
		this._element = this._getTemplate();
		this._cardImage = this._element.querySelector(this._cardImg);
		this._setEventListeners(); // добавим обработчики
		this._cardImage.src = this._image;
		this._element.querySelector(this._cardTitle).textContent = this._text;
		this._cardImage.alt = this._text;
		this._num = this._element.querySelector('.card__like-num');
		this._num.textContent = this._likes.length;
		return this._element;
	}

	_setEventListeners() {
		const cardLike = this._element.querySelector(this._cardLike);
		cardLike.addEventListener('click', () => this._handleLikeCard(cardLike, this._num));
		this._element.querySelector(this._cardDelete).addEventListener('click', () => this._handleDeleteClik(this._id));
		this._cardImage.addEventListener('click', () => this._handleCardClick(this._text, this._image));
	}

	_handleLikeCard(cardLike, num) {
		cardLike.classList.toggle('card__like-icon_active');
		this._handleLikeCardNum(cardLike, num);
		console.log(this._likes);
	}

	_handleLikeCardNum(cardLike, num) {
		if (cardLike.classList.contains('card__like-icon_active')) {
			num.textContent = Number(num.textContent) + 1;
		}
		else {
			num.textContent = Number(num.textContent) - 1;
		}
	}

	deleteCard() {
		this._element.remove();
	}
}