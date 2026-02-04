import { Popup } from "./Popup.js";
import { Section } from "./Section.js";
import { Card } from "./Card.js";
import { getInitialCards } from "./Card.js";
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

//==============UserInfo ============

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  degreeSelector: ".profile__degree",
});

// ========== Variables principales ==========
const page = document.querySelector(".page");
//const popupEditorProfileBase = page.querySelector(  ".popup-editor-profile__base");
//const popupEditorProfile = page.querySelector(".popup-editor-profile");
//const profileId = document.querySelector(".profile__id");
//const profileName = profileId.querySelector(".profile__name");
//const profileDegree = profileId.querySelector(".profile__degree");
const buttonEdit = page.querySelector(".profile-button-edit");
/*const popupEditorProfileCerrar = page.querySelector(
  ".popup-editor-profile__close-button"
);*/

const popupButtonAdd = page.querySelector(".profile-button-add");
const popupAddCard = page.querySelector(".popup-add-card");
const popupAddCardCerrar = page.querySelector(".popup-add-card__close-button");

// ========== Listeners popups ==========
/* buttonEdit.addEventListener("click", () =>
  manipulaFormEdit(profileId, popupEditorProfile)
);
popupEditorProfileCerrar.addEventListener("click", () =>
  poneNoneEditor(popupEditorProfile)
); */

popupButtonAdd.addEventListener("click", () =>
  manipulaFormAddCard(popupAddCard),
);
popupAddCardCerrar.addEventListener("click", () =>
  poneNoneAddCard(popupAddCard),
);

// ========== Editar perfil ==========
const popupEditProfile = new PopupWithForm(
  ".popup-editor-profile",
  (formData) => {
    //  console.log("FORM DATA:", formData);
    userInfo.setUserInfo({
      name: formData.name,
      degree: formData.degree,
    });
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

/* formEditProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = inputNombre.value;
  profileDegree.textContent = inputGrado.value;
  poneNoneEditor(popupEditorProfile);
}); */

// ========== Galería de cards ==========
const gallery = document.querySelector(".gallery");
const popupImage = new PopupWithImage(".popup"); //<--- aqui
popupImage.setEventListeners();

// Generar las cards iniciales
/* initialCards.forEach((item) => {
  const card = new Card(item, "#plantilla");
  gallery.append(card.generateCard());
}); */

let cardSection;
getInitialCards().then((initialCards) => {
  cardSection = new Section(
    {
      items: initialCards,
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
});

// ========== Agregar nueva card ==========
const formAddCard = document.querySelector(".popup-add-card__form");
/*const inputTitle = formAddCard.querySelector(
  '.popup-add-card__input[placeholder="Titulo"]'
);
const inputLink = formAddCard.querySelector(
  '.popup-add-card__input[placeholder="Enlace a la imagen"]'
);

formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = new Card(
    { name: inputTitle.value, link: inputLink.value },
    "#plantilla",
    popupImage.open.bind(popupImage) // <-- ¡IMPORTANTE!
  );
  cardSection.addItem(newCard.generateCard());
  poneNoneAddCard(popupAddCard);
}); */

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
/* gallery.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    imagenPopup.src = event.target.src;
    popupFooter.textContent = event.target.alt;
    console.log(imagenPopup.src);
    imagePopup.open(); //<--- aqui
  }
}); */
gallery.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    popupImage.open({
      src: event.target.src,
      alt: event.target.alt,
    });
  }
});

/* // Cerrar popup de imagen con overlay
popup.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    popup.style.display = "none";
  }
});

// Cerrar popup de imagen con botón
cerrarPopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// Cerrar popups con Escape
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    popup.style.display = "none";
    poneNoneAddCard(popupAddCard);
    poneNoneEditor(popupEditorProfile);
  }
}); */

/* // Cerrar popup de editar perfil con overlay
const overEditor = document.querySelector(".popup-editor-profile__overlay");
overEditor.addEventListener("click", () => poneNoneEditor(popupEditorProfile));

// Cerrar popup de agregar card con overlay
const overCard = document.querySelector(".popup-add-card__overlay");
overCard.addEventListener("click", () => poneNoneAddCard(popupAddCard)); */

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
