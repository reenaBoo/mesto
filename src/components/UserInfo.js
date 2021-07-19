export class UserInfo {
  constructor(userName, userAbout) {
    this._userName = userName;
    this._userAbout = userAbout;
  };

  getUserInfo() {
    return {
      user: this._userName.textContent,
      about: this._userAbout.textContent
    }
  }

  setUserInfo(nameUpdate, aboutUpdate) {
    this._userName.textContent = nameUpdate;
    this._userAbout.textContent = aboutUpdate;
  }
}