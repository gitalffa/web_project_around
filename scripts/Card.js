export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

export class Card {
  constructor({ name, link }, templateSelector) {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
  }

  // privados

  _handlerDelete = (evt) => {
    evt.target.closest(".card").remove();
  };

  _handlerFavorite = (evt) => {
    evt.target.classList.toggle("card__favorite-red");
  };

  _setEventListeners(cardElement) {
    cardElement
      .querySelector(".card__delete")
      .addEventListener("click", this._handlerDelete);

    cardElement
      .querySelector(".card__favorite")
      .addEventListener("click", this._handlerFavorite);
  }

  //publicos
  generateCard() {
    const cardElement = document
      .querySelector(this.templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    cardElement.querySelector(".card__image").src = this.link;
    cardElement.querySelector(".card__image").alt = this.name;
    cardElement.querySelector(".card__title").texContent = this.name;

    this._setEventListeners(cardElement);
    return cardElement;
  }
}
