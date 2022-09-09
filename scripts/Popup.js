export class Popup {
	constructor(popupSelector){
    this._popupSelector = popupSelector;
		this.popup = document.querySelector(this._popupSelector);
	}

	popup () {
		return this.popup;
	}

	open() {
    this.popup.classList.add("popup_opened");
	  this._setEventListeners();
	}

	close() {
		this.popup.classList.remove("popup_opened");
		this._removeEventListeners();
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
	_setEventListeners() {
	  this.popup.addEventListener('click', this._handleButtonOverlayClose.bind(this));
	  document.addEventListener('keydown', this._handleEscClose.bind(this));
	}
	_removeEventListeners() {
		this.popup.removeEventListener('click', this._handleButtonOverlayClose);
		document.removeEventListener('keydown', this._handleEscClose);
	}
}