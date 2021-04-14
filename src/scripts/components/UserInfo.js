export class UserInfo{
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._name = nameSelector;
    this._about = descriptionSelector;
    this._avatar = avatarSelector;
  }
  getUserInfo(){
    return {name: this._name.textContent,
      about: this._about.textContent,
      _id: this._userId,
      avatar: this._avatar}
  }
  setUserInfo({name, about, _id, avatar}){
    this._name.textContent = name;
    this._about.textContent = about;
    this._userId = _id;
    this._avatar = avatar;
  }

}
