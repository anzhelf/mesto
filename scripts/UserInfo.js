export class UserInfo {
	constructor(userName, userJob) {
		this._userName = userName;
		this._userJob = userJob;
	}

	//возвращает объект с данными пользователя
	getUserInfo() {
		return {
			userName: this._userName.textContent,
			userJob: this._userJob.textContent
		}
	}
	//принимает новые данные пользователя и добавляет их на страницу
	setUserInfo({ userName, userJob }) {
		this._userName.textContent = userName;
		this._userJob.textContent = userJob;
	}
}