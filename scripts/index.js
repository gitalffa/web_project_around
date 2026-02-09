import { Popup } from "./Popup.js";
import { Section } from "./Section.js";
import { Card } from "./Card.js";

import { FormValidator } from "./FromValidator.js";
import {
  quitaNoneEditor,
  poneNoneEditor,
  quitaNoneAddCard,
  poneNoneAddCard,
  manipulaFormAddCard,
  manipulaFormEdit,
} from "./utils.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { api } from "./api.js";

//==============UserInfo ============
// creo las instancia de userInfo donde le doy los selectores html para insertar la informacion

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  degreeSelector: ".profile__degree",
  avatarSelector: ".profile__avatar",
});

// de api.js uso el metodo getUser que me da el objeto que llego del fetch
// user ya trae {name, about, avatar, _id}
// en la instancia userInfo exite un metodo que te setea la info

api.getUser().then((user) => {
  userInfo.setUserInfo(user);
});

// ========== Variables principales ==========
const page = document.querySelector(".page");

const buttonEdit = page.querySelector(".profile-button-edit");

const popupButtonAdd = page.querySelector(".profile-button-add");
const popupAddCard = page.querySelector(".popup-add-card");
const popupAddCardCerrar = page.querySelector(".popup-add-card__close-button");

// ========== Listeners popups ==========

popupButtonAdd.addEventListener("click", () =>
  manipulaFormAddCard(popupAddCard),
);
popupAddCardCerrar.addEventListener("click", () =>
  poneNoneAddCard(popupAddCard),
);

// ========== Editar perfil ==========
/* const popupEditProfile = new PopupWithForm(
  ".popup-editor-profile",
  (formData) => {
    //  console.log("FORM DATA:", formData);
    userInfo.setUserInfo({
      name: formData.name,
      degree: formData.degree,
    });
  },
); */

const popupEditProfile = new PopupWithForm(
  ".popup-editor-profile",
  (formData) => {
    api
      .updateUser({
        name: formData.name,
        about: formData.degree,
      })
      .then((user) => {
        userInfo.setUserInfo(user);
      })
      .catch((err) => console.error("updateUser error:", err));
  },
);
popupEditProfile.setEventListeners();

const formEditProfile = document.querySelector(".popup-editor-profile__form");
const inputNombre = formEditProfile.querySelector(
  '.popup-editor-profile__input[placeholder="name"]',
);
const inputGrado = formEditProfile.querySelector(
  '.popup-editor-profile__input[placeholder="Degree"]',
);

buttonEdit.addEventListener("click", () => {
  const { name, degree } = userInfo.getUserInfo();
  inputNombre.value = name;
  inputGrado.value = degree;
  popupEditProfile.open();
});

// ========== Galería de cards ==========
const gallery = document.querySelector(".gallery");
const popupImage = new PopupWithImage(".popup"); //<--- aqui
popupImage.setEventListeners();

// Generar las cards iniciales

//declaro cardSection para tenerlo golbal en todo el archivo
let cardSection;

// en la instacia de api uso el metodo getCards para traerme del servidor las cards existentes en el
api
  .getCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(
            item,
            "#plantilla",
            popupImage.open.bind(popupImage), // ←  el método open ya “bindeado”
          );
          const cardElement = card.generateCard();
          cardSection.addItem(cardElement);
        },
      },
      ".gallery",
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error("getCards error:", err));

// ========== Agregar nueva card ==========
const formAddCard = document.querySelector(".popup-add-card__form");

const popupAddCardForm = new PopupWithForm(".popup-add-card", (formData) => {
  console.log("Form data (card):", formData); // <-- aquí
  const newCard = new Card(
    { name: formData.titulo, link: formData.enlace },
    "#plantilla",
    popupImage.open.bind(popupImage),
  );
  cardSection.addItem(newCard.generateCard());
});
popupAddCardForm.setEventListeners();

popupButtonAdd.addEventListener("click", () => {
  popupAddCardForm.open();
});

// ========== Zoom de imagen (popup global) ==========

/* const imagenPopup = document.querySelector(".popup__imagen");

const popupFooter = document.querySelector(".popup__footer"); */

//========== instancia del popup ============

// Abrir popup al hacer click en una imagen

gallery.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    popupImage.open({
      src: event.target.src,
      alt: event.target.alt,
    });
  }
});

// ========== Validación de formularios ==========
const config = {
  inputSelector: "input",
  submitButtonSelector: 'button[type="submit"]',
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup-form__input_type_error",
  errorClass: "popup-form__input-error_active",
};

const validadorPerfil = new FormValidator(config, formEditProfile);
validadorPerfil.enableValidation();

const validadorCard = new FormValidator(config, formAddCard);
validadorCard.enableValidation();
