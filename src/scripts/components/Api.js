export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then((res) => {
        if(res.ok)
          return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then((res) => {
        if(res.ok)
          return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  editProfile({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => {
        if(res.ok)
          return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  addNewCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        if(res.ok)
          return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then((res) => {
        console.log(res)
        if(res.ok)
          return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  putLike(cardId){
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then((res) => {
        if(res.ok)
          return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  deleteLike(cardId){
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then((res) => {
        if(res.ok)
          return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  changeAvatar({avatar}){
    return fetch(`${this._baseUrl}/users/me/avatar`,{
      method: 'PATCH',
      headers: {
        authorization: `${this._authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => {
        if(res.ok)
          return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}
