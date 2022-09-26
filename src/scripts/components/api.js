export class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		else {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
	}

	_request(url, options) {
		return fetch(url, options).then(this._checkResponse);
	}

	getDdataUser() {
		return this._request(`${this._url}/users/me`, {
			method: 'GET',
			headers: this._headers
		});
	}

	editAvatarUser(avatar) {
		return this._request(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar
			})
		});
	}

	editDdataUser(name, about) {
		return this._request(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name,
				about
			})
		});
	}

	getInicialCards() {
		return this._request(`${this._url}/cards `, {
			method: 'GET',
			headers: this._headers
		});
	}

	addNewCard(name, link) {
		return this._request(`${this._url}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name,
				link
			})
		});
	}

	deleteLikeCard(_id) {
		return this._request(`${this._url}/cards/${_id}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		});
	}

	likeCard(_id) {
		return this._request(`${this._url}/cards/${_id}/likes`, {
			method: 'PUT',
			headers: this._headers,
		});
	}

	deliteCard(_id) {
		return this._request(`${this._url}/cards/${_id}`, {
			method: 'DELETE',
			headers: this._headers,
		});
	}
}