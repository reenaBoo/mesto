export class Api {
  constructor(cohort, url, token) {
    this._cohort = cohort;
    this._url = url;
    this._token = token;
  }

  _checkStatus(res) {    
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

  getInitialCards() {
    return fetch(`${this._url}/${this._cohort}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkStatus)
  }

  postNewCard(name, link) {
    return fetch(`${this._url}/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkStatus)
  }

  getUserInfo() {
    return fetch(`${this._url}/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkStatus)
  }

  editUserInfo(name, about) {
    return fetch(`${this._url}/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkStatus)
  }

  editUserAvatar(avatar) {
    return fetch(`${this._url}/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkStatus)
  }

  likeCard(cardId) {
    return fetch(`${this._url}/${this._cohort}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkStatus)
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/${this._cohort}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkStatus)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/${this._cohort}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkStatus)
  }
}