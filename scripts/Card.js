export class Card {
	constructor(data, settings, templateSelector, handleCardClick) {
		this._image = data.image;
		this._text = data.text;
    this._card = settings.card;
		this._cardImg = settings.cardImage;
		this._cardLike = settings.cardLike;
		this._cardDelete = settings.cardDelete;
		this._cardTitle = settings.cardTitle;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
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
		return this._element;
	}

	_setEventListeners() {
		const cardLike = this._element.querySelector(this._cardLike);
		cardLike.addEventListener('click', () => this._handleLikeCard(cardLike));
		this._element.querySelector(this._cardDelete).addEventListener('click', () => this._handleDeleteCard());
		this._cardImage.addEventListener('click', () => this._handleCardClick(this._text, this._image));
	}

	_handleLikeCard(cardLike) {
		cardLike.classList.toggle('card__like_active');
	}

	_handleDeleteCard() {
		this._element.remove();
	}
}