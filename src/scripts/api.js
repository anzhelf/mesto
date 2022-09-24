export class Api {
	constructor(config){
    this._url =config.url;
		this._headers = config.headers;
	}

	getDdataUser() {
		return fetch(`${this._url}/users/me`, {
			method: 'GET',
			headers: this._headers
		})
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log);
	}

	editAvatarUser(avatar) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar
			})
		})
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log);
	}

	editDdataUser(name, about) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name,
				about
			})
		})
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log);
	}

	getInicialCards(){
		return fetch(`${this._url}/cards `, {
			method: 'GET',
			headers: this._headers
		})
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log);
	}

	addNewCard(name, link) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name,
				link
			})
		})
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log);
	}

	deleteLikeCard(_id){
		return fetch(`${this._url}/cards/${_id}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		})
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log);
	}

	likeCard(_id){
		return fetch(`${this._url}/cards/${_id}/likes`, {
			method: 'PUT',
			headers: this._headers,
		})
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log);
	}

	deliteCard(_id){
		return fetch(`${this._url}/cards/${_id}`, {
			method: 'DELETE',
			headers: this._headers,
		})
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log);
	}
}