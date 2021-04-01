import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup{
  constructor(photo, photoDescription ,popupSelector) {
    super(popupSelector);
    this._popupImg = photo;
    this._popupDescription = photoDescription;
  }
  open(data){
    super.open();
    this._popupImg.src = data.link;
    this._popupImg.alt = data.name;
    this._popupDescription.textContent = data.name;
  }
}
