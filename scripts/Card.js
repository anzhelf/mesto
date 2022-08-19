export class Card {
	constructor(data, settings, templateSelector, handleOpenPopup) {
		this._image = data.image;
		this._text = data.text;
    this._card = settings.card;
		this._cardImage = settings.cardImage;
		this._cardLike = settings.cardLike;
		this._cardDelete = settings.cardDelete;
		this._cardTitle = settings.cardTitle;
	
		this._templateSelector = templateSelector;
		this._handleOpenPopup = handleOpenPopup;
	}

	//достаем разметку
	_getTemplate() {
		const cardElement = document.querySelector(this._templateSelector).content.querySelector(this._card).cloneNode(true);
		return cardElement;
	}

	//создаем карты
	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners(); // добавим обработчики
		this._element.querySelector(this._cardImage).src = this._image;
		this._element.querySelector(this._cardTitle).textContent = this._text;
		this._element.querySelector(this._cardImage).alt = this._text;
		return this._element;
	}

	_setEventListeners() {
		this._element.querySelector(this._cardLike).addEventListener('click', () => this._handleLikeCard());
		this._element.querySelector(this._cardDelete).addEventListener('click', () => this._handleDeleteCard());
		this._element.querySelector(this._cardImage).addEventListener('click', () => this._handleOpenPopup(this._text, this._image));
	}

	_handleLikeCard() {
		this._element.querySelector(this._cardLike).classList.toggle('card__like_active');
	}

	_handleDeleteCard() {
		this._element.querySelector(this._cardDelete).closest(this._card).remove();
	}
}