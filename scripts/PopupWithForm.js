import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
	constructor(popupSelector){
    super(popupSelector);
	}

	close() {
		
	}
	//собирает данные всех полей формы
	_getInputValues() {

	}

	//должен не только добавлять обработчик 
	//клика иконке закрытия, но и добавлять обработчик сабмита формы.
	_setEventListeners() {

	}
}