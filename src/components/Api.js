export class Api {
  constructor(cohort, url, token) {
    this._cohort = cohort;
    this._url = url;
    this._token = token;
  }

  getInitialCards() {
    return fetch(`${this._url}/${this._cohort}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  getUserInfo() {
    return fetch(`${this._url}/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
