//popup img
const popupImage = document.querySelector('.popup_open_image');
const popupCardImage = popupImage.querySelector('.popup__card-image');
const popupCardText = popupImage.querySelector('.popup__card-title');
const buttonClose = popupImage.querySelector('.popup__close-icon');


function closeTabOverlay(evt) {
	if (evt.target === evt.currentTarget) {
		closePopup(evt.target);
	}
}

function closeTabKeydown(evt) {
	if (evt.key === "Escape") {
		const deleteElement = document.querySelector(".popup_opened");
		closePopup(deleteElement);
	}
}

//открыть попап
function openPopup(popup) {

	popup.classList.add("popup_opened");

	popup.addEventListener('click', closeTabOverlay);
	document.addEventListener('keydown', closeTabKeydown);
}

//закрыть попап
function closePopup(popup) {
	popup.classList.remove("popup_opened");

	popup.removeEventListener('click', closeTabOverlay);
	document.removeEventListener('keydown', closeTabKeydown);

}