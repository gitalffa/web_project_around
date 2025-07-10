import { initialCards, Card } from "./Card.js";
import { FormValidator } from "./FromValidator.js";
import {
  quitaNoneEditor,
  poneNoneEditor,
  quitaNoneAddCard,
  poneNoneAddCard,
  manipulaFormAddCard,
  manipulaFormEdit,
} from "./utils.js";

// ========== Variables principales ==========
const page = document.querySelector(".page");
const popupEditorProfileBase = page.querySelector(
  ".popup-editor-profile__base"
);
const popupEditorProfile = page.querySelector(".popup-editor-profile");
const profileId = document.querySelector(".profile__id");
const profileName = profileId.querySelector(".profile__name");
const profileDegree = profileId.querySelector(".profile__degree");
const buttonEdit = page.querySelector(".profile-button-edit");
const popupEditorProfileCerrar = page.querySelector(
  ".popup-editor-profile__close-button"
);

const popupButtonAdd = page.querySelector(".profile-button-add");
const popupAddCard = page.querySelector(".popup-add-card");
const popupAddCardCerrar = page.querySelector(".popup-add-card__close-button");

// ========== Listeners popups ==========
buttonEdit.addEventListener("click", () =>
  manipulaFormEdit(profileId, popupEditorProfile)
);
popupEditorProfileCerrar.addEventListener("click", () =>
  poneNoneEditor(popupEditorProfile)
);

popupButtonAdd.addEventListener("click", () =>
  manipulaFormAddCard(popupAddCard)
);
popupAddCardCerrar.addEventListener("click", () =>
  poneNoneAddCard(popupAddCard)
);

// ========== Editar perfil ==========
const formEditProfile = document.querySelector(".popup-editor-profile__form");
const inputNombre = formEditProfile.querySelector(
  '.popup-editor-profile__input[placeholder="name"]'
);
const inputGrado = formEditProfile.querySelector(
  '.popup-editor-profile__input[placeholder="Degree"]'
);

formEditProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = inputNombre.value;
  profileDegree.textContent = inputGrado.value;
  poneNoneEditor(popupEditorProfile);
});

// ========== Galería de cards ==========
const gallery = document.querySelector(".gallery");

// Generar las cards iniciales
initialCards.forEach((item) => {
  const card = new Card(item, "#plantilla");
  gallery.append(card.generateCard());
});

// ========== Agregar nueva card ==========
const formAddCard = document.querySelector(".popup-add-card__form");
const inputTitle = formAddCard.querySelector(
  '.popup-add-card__input[placeholder="Titulo"]'
);
const inputLink = formAddCard.querySelector(
  '.popup-add-card__input[placeholder="Enlace a la imagen"]'
);

formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = new Card(
    { name: inputTitle.value, link: inputLink.value },
    "#plantilla"
  );
  gallery.prepend(newCard.generateCard());
  poneNoneAddCard(popupAddCard);
});

// ========== Zoom de imagen (popup global) ==========
const popup = document.querySelector(".popup");
const imagenPopup = popup.querySelector(".popup__imagen");
const cerrarPopup = popup.querySelector(".popup__cerrar");
const popupFooter = popup.querySelector(".popup__footer");

// Abrir popup al hacer click en una imagen
gallery.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    imagenPopup.src = event.target.src;
    popupFooter.textContent = event.target.alt;
    popup.style.display = "flex";
  }
});

// Cerrar popup de imagen con overlay
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
});

// Cerrar popup de editar perfil con overlay
const overEditor = document.querySelector(".popup-editor-profile__overlay");
overEditor.addEventListener("click", () => poneNoneEditor(popupEditorProfile));

// Cerrar popup de agregar card con overlay
const overCard = document.querySelector(".popup-add-card__overlay");
overCard.addEventListener("click", () => poneNoneAddCard(popupAddCard));

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
