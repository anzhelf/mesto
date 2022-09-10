import {Popup} from "./Popup.js";

//колбэк сабмита формы
export class PopupWithForm extends Popup {
	constructor(popupSelector, submitForm){
    super(popupSelector);
		this._submitForm = submitForm;
	}

	close() {
		
	}
	//собирает данные всех полей формы
	_getInputValues() {

	}

	//должен не только добавлять обработчик 
	//клика иконке закрытия, но и добавлять обработчик сабмита формы.
	setEventListeners() {
    super.setEventListeners();
		//blockFormEdit.addEventListener("submit", editProfile);
		super.popup.addEventListener("submit", this.submitForm);
	}

	removeEventListeners() {
		super.removeEventListeners();
		super.popup.removeEventListener("submit", this.submitForm);
	}
}