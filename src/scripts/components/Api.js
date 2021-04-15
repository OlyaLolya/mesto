const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}
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
      .then(handleResponse)
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(handleResponse)
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
      .then(handleResponse)
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
      .then(handleResponse)
  }
  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(handleResponse)
  }
  putLike(cardId){
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(handleResponse)
  }
  deleteLike(cardId){
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(handleResponse)
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
      .then(handleResponse)
  }
}

