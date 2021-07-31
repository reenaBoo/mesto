export class UserInfo {
  constructor(userName, userAbout, userAvatar) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
  };

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    }
  }

  setUserInfo(nameUpdate, aboutUpdate, _id) {
    this._userName.textContent = nameUpdate;
    this._userAbout.textContent = aboutUpdate;
    this._userId = _id;
  }

  setUserAvatar(avatarUpdate) {
    this._userAvatar.src = avatarUpdate;
  }
}