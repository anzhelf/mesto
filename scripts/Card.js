
class Card {
	constructor(data, templateSelector) {
		this._image = data.image;
		this._text = data.text;
		this._templateSelector = templateSelector;
	}

	//достаем разметку
	_getTemplate() {
		const cardElement = document.querySelector(this._templateSelector)
			.content.querySelector('.card').cloneNode(true);
		return cardElement;
	}

	//создаем карты
	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners(); // добавим обработчики
		this._element.querySelector('.card__image').src = this._image;
		this._element.querySelector('.card__title').textContent = this._text;
		return this._element;
	}

	_setEventListeners() {
		this._element.querySelector('.card__like').addEventListener('click', () => this._handleLikeCard());
		this._element.querySelector('.card__delete').addEventListener('click', () => this._handleDeleteCard());
		this._element.querySelector('.card__image').addEventListener('click', () => this._handleOpenPopup());
	}

	_handleLikeCard() {
		this._element.querySelector('.card__like').classList.toggle('card__like_active');
	}

	_handleDeleteCard() {
		this._element.querySelector('.card__delete').closest('.card').remove();
	}

	_handleOpenPopup() {
		popupCardImage.src = this._image;
		popupCardImage.alt = this._text;
		popupCardText.textContent = this._text;
		openPopup(popupImage);
	}
}

initialCards.forEach((item) => {
	const card = new Card(item, '.card-template_type_default');
	const cardElement = card.generateCard();
	document.querySelector('.cards').append(cardElement);
});