export class Popup {
	constructor(popupSelector) {
		this.popupSelector = popupSelector;
		this.popup = document.querySelector(this.popupSelector);
		this._handleButtonOverlayClose = this._handleButtonOverlayClose.bind(this);
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	open() {
		this.popup.classList.add("popup_opened");
		this.setEventListeners();
	}

	close() {
		this.popup.classList.remove("popup_opened");
		this.removeEventListeners();
	}

	//содержит логику закрытия попапа клавишей Esc.
	_handleEscClose(evt) {
		if (evt.key === "Escape") {
			this.close();
		}
	}

	//закрыть по кнопке и оверлею
	_handleButtonOverlayClose(evt) {
		if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-icon')) {
			this.close();
		}
	}

	//добавляют и удаляютслушатели клика иконке и кнопке закрытия попапа
	setEventListeners() {
		this.popup.addEventListener('click', this._handleButtonOverlayClose);
		document.addEventListener('keydown', this._handleEscClose);
	}
	removeEventListeners() {
		this.popup.removeEventListener('click', this._handleButtonOverlayClose);
		document.removeEventListener('keydown', this._handleEscClose);
	}
}