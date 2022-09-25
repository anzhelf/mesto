export class Card {
	constructor(data, settings, templateSelector, userId, handleCardClick, handleDeleteClik, handlelikeClik) {
		this._image = data.link;
		this._text = data.name;
		this._likes = data.likes;
		this._id = data._id;
		this._ovnerId = data.owner._id;

		this._card = settings.card;
		this._cardImg = settings.cardImage;
		this._cardLikeSelector = settings.cardLike;
		this._cardDelete = settings.cardDelete;
		this._cardTitle = settings.cardTitle;
		this._handleCardClick = handleCardClick;
		this._handleDeleteClik = handleDeleteClik;
		this._handlelikeClik = handlelikeClik;

		this._userId = userId;

		this._templateSelector = templateSelector;
	}

	//достаем разметку
	_getTemplate() {
		const cardElement = document.querySelector(this._templateSelector).content.querySelector(this._card).cloneNode(true);
		return cardElement;
	}
	//слушатели
	_setEventListeners() {
		this._cardLike = this._element.querySelector(this._cardLikeSelector);
		this._cardLike.addEventListener('click', () => this._handlelikeClik(this._id));
		this._element.querySelector(this._cardDelete).addEventListener('click', () => this._handleDeleteClik(this._id));
		this._cardImage.addEventListener('click', () => this._handleCardClick(this._text, this._image));
	}

	//я лайкал?
	isLikes() {
		let Ilike = this._likes.find(user => user._id === this._userId);
		return Ilike;
	}

	//Счетчик лайков
	setLikes(newLikes) {
		this._likes = newLikes;
		this._num.textContent = this._likes.length;
		this.handleLikeCard();
	}

	//если лайкнула я - меняем цвет кнопки
	handleLikeCard() {
		if (this.isLikes()) {
			this._cardLike.classList.add('card__like-icon_active');
		}
		else {
			this._cardLike.classList.remove('card__like-icon_active');
		}
	}

	//удалить карту
	deleteCard() {
		this._element.remove();
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

		if (this._ovnerId !== this._userId) {
			const del = this._element.querySelector(this._cardDelete);
			del.remove();
		}

		this.setLikes(this._likes);

		return this._element;
	}
}