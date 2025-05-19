const page = document.querySelector(".page");
const buttonEdit = page.querySelector(".profile-button-edit");
const popupEditorProfile = page.querySelector(".popup-editor-profile");
const popupEditorProfileBase = page.querySelector(
  ".popup-editor-profile__base"
);
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
  quitaNone();
  const nombre = profileId.querySelector(".profile__name").textContent;
  const grado = profileId.querySelector(".profile__degree").textContent;
  const inputs = document.querySelectorAll(
    ".popup-editor-profile__form .popup-editor-profile__input"
  );
  inputs[0].value = nombre;
  inputs[1].value = grado;
}

function cerrarEdicion() {
  poneNone();
}

buttonEdit.addEventListener("click", manipulaFormEdit);
popupEditorProfileCerrar.addEventListener("click", cerrarEdicion);
const form = document.querySelector(".popup-editor-profile__form");
const inputNombre = form.querySelector(
  '.popup-editor-profile__input[placeholder="name"]'
);
const inputGrado = form.querySelector(
  '.popup-editor-profile__input[placeholder="Degree"]'
);

form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevenir recarga de página

  // 3. Actualizar el contenido del perfil
  profileName.textContent = inputNombre.value;
  profileDegree.textContent = inputGrado.value;
  poneNone();
});

function quitaNone() {
  popupEditorProfile.classList.remove("popup-editor-profile_hidden");
}

function poneNone() {
  popupEditorProfile.classList.add("popup-editor-profile_hidden");
}
