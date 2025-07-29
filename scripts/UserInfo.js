export class UserInfo {
  constructor({ nameSelector, degreeSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._degreeElement = document.querySelector(degreeSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      degree: this._degreeElement.textContent,
    };
  }

  setUserInfo({ name, degree }) {
    if (name) this._nameElement.textContent = name;
    if (degree) this._degreeElement.textContent = degree;
  }
}
