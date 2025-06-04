// Declaracion de variables
//variables generales
const page = document.querySelector(".page");
const popupEditorProfileBase = page.querySelector(".popup__base");

//seccion profile
const buttonEdit = page.querySelector(".profile-button-edit");
const popupEditorProfile = page.querySelector(".popup-editor-profile");
const popupEditorProfileCerrar = page.querySelector(
  ".popup-editor-profile__close-button"
);
const popupEditorProfileInput = page.querySelectorAll(
  ".popup-editor-profile__input"
);
const profileId = document.querySelector(".profile__id");
const profileName = profileId.querySelector(".profile__name");
const profileDegree = profileId.querySelector(".profile__degree");

function manipulaFormEdit() {
  quitaNoneEditor();
  const nombre = profileId.querySelector(".profile__name").textContent;
  const grado = profileId.querySelector(".profile__degree").textContent;
  const inputs = document.querySelectorAll(
    ".popup-editor-profile__form .popup-editor-profile__input"
  );
  inputs[0].value = nombre;
  inputs[1].value = grado;
}

popupEditorProfileCerrar.addEventListener("click", cerrarEdicion);
function cerrarEdicion() {
  poneNoneEditor();
}

buttonEdit.addEventListener("click", manipulaFormEdit);

const formEditProfile = document.querySelector(".popup-editor-profile__form");
const inputNombre = formEditProfile.querySelector(
  '.popup-editor-profile__input[placeholder="name"]'
);
const inputGrado = formEditProfile.querySelector(
  '.popup-editor-profile__input[placeholder="Degree"]'
);

formEditProfile.addEventListener("submit", (event) => {
  event.preventDefault(); // prevenir recarga de página

  // 3. Actualizar el contenido del perfil
  profileName.textContent = inputNombre.value;
  profileDegree.textContent = inputGrado.value;
  poneNoneEditor();
});

function quitaNoneEditor() {
  popupEditorProfile.classList.remove("popup_hidden");
}
function poneNoneEditor() {
  popupEditorProfile.classList.add("popup_hidden");
}

//seccion gallery
const popupButtonAdd = page.querySelector(".profile-button-add");
const popupAddCard = page.querySelector(".popup-add-card");
const popupAddCardCerrar = page.querySelector(".popup-add-card__close-button");
popupAddCardCerrar.addEventListener("click", cerrarAddCard);
function cerrarAddCard() {
  poneNoneAddCard();
}

function quitaNoneAddCard() {
  popupAddCard.classList.remove("popup_hidden");
}

function poneNoneAddCard() {
  popupAddCard.classList.add("popup_hidden");
}

const initialCards = [
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

function inicializaGallery(cards) {
  const contenedor = document.querySelector(".gallery");
  const plantilla = document.querySelector("#plantilla").content;
  contenedor.innerHTML = ""; // Limpiar por si acaso
  initialCards.forEach((item) => {
    const clon = plantilla.cloneNode(true);
    clon.querySelector(".card__image").src = item.link;
    clon.querySelector(".card__title").textContent = item.name;
    contenedor.appendChild(clon);
  });
}

function renderSingleCard(item) {
  const contenedor = document.querySelector(".gallery");
  const platilla = document.querySelector("#plantilla").content;

  const clon = platilla.cloneNode(true);
  clon.querySelector(".card__image").src = item.link;
  clon.querySelector(".card__title").textContent = item.name;
  contenedor.prepend(clon);
}

function addItemArray(name, link) {
  const newItem = { name, link };
  initialCards.unshift(newItem);
  renderSingleCard(newItem);
}

inicializaGallery(initialCards);

function manipulaFormAddCard() {
  quitaNoneAddCard();
  const inputs = document.querySelectorAll(
    ".popup-add-card__form .popup-add-card__input"
  );
  inputs[0].value = "";
  inputs[1].value = "";
}

popupButtonAdd.addEventListener("click", manipulaFormAddCard);

const formAddCard = document.querySelector(".popup-add-card__form");
const inputTitle = formAddCard.querySelector(
  '.popup-add-card__input[placeholder="Titulo"]'
);
const inputLink = formAddCard.querySelector(
  '.popup-add-card__input[placeholder="Enlace a la imagen"]'
);
inputTitle.value = "";
inputLink.value = "";

formAddCard.addEventListener("submit", (event) => {
  event.preventDefault(); // prevenir recarga de página
  addItemArray(inputTitle.value, inputLink.value);
  poneNoneAddCard();
});

//favorito
const favorito = document.querySelector(".gallery");
favorito.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__favorite")) {
    event.target.classList.toggle("card__favorite-red");
  }
});

//borrar card
document.querySelector(".gallery").addEventListener("click", (event) => {
  if (event.target.classList.contains("card__delete")) {
    const card = event.target.closest(".card");
    const index = parseInt(card.dataset.index, 10);
    card.remove();
    if (!isNaN(index)) {
      initialCards.splice(index, 1);
    }

    document
      .querySelectorAll(".gallery .card")
      .forEach((cardElement, newIndex) => {
        cardElement.dataset.index = newIndex;
      });
    //renderAllCards(initialCards);
  }
});

// zoom imagen
