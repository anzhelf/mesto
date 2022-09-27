export class UserInfo {
	constructor(userName, userJob, userAvatar) {
		this._userName = userName;
		this._userJob = userJob;
		this._userAvatar = userAvatar;
	}

	//возвращает объект с данными пользователя
	getUserInfo() {
		return {
			name: this._userName.textContent,
			about: this._userJob.textContent,
			avatar: this._userAvatar.src
		}
	}
	//принимает новые данные пользователя и добавляет их на страницу
	setUserInfo(data) {
		this._userName.textContent = data.name;
		this._userJob.textContent = data.about;
		this._userAvatar.src = data.avatar;
	}
}