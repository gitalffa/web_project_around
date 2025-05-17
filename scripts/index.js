let page = document.querySelector(".page");
let button_edit = page.querySelector(".button-edit");
let fondo_negro = page.querySelector(".profile-editor__overlay--hidden");
let page_popup_edit = page.querySelector(".profile-editor__popup");
let cerrar_edicion = page.querySelector(".profile-editor__close-button");
let input_item = page.querySelectorAll("profile-editor__input");
const profileId = document.querySelector(".profile__id");

// 1. Seleccionar elementos
const form = document.querySelector(".profile-editor__form");
const inputNombre = form.querySelector(
  '.profile-editor__input[placeholder="name"]'
);
const inputGrado = form.querySelector(
  '.profile-editor__input[placeholder="Degree"]'
);

const profileName = document.querySelector(".profile__name");
const profileDegree = document.querySelector(".profile__degree");

function manipulaFormEdit() {
  quitaNone();
  const nombre = profileId.querySelector(".profile__name").textContent;
  const grado = profileId.querySelector(".profile__degree").textContent;
  const inputs = document.querySelectorAll(
    ".profile-editor__form .profile-editor__input"
  );
  inputs[0].value = nombre;
  inputs[1].value = grado;
}
function cerrarEdicion() {
  poneNone();
}

button_edit.addEventListener("click", manipulaFormEdit);
cerrar_edicion.addEventListener("click", cerrarEdicion);
// 2. Escuchar el submit del formulario
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevenir recarga de página

  // 3. Actualizar el contenido del perfil
  profileName.textContent = inputNombre.value;
  profileDegree.textContent = inputGrado.value;
  poneNone();
});

function quitaNone() {
  fondo_negro.classList.remove("profile-editor__overlay--hidden");
  page_popup_edit.classList.remove("profile-editor__overlay--hidden");
  cerrar_edicion.classList.remove("profile-editor__overlay--hidden");
}

function poneNone() {
  fondo_negro.classList.add("profile-editor__overlay--hidden");
  page_popup_edit.classList.add("profile-editor__overlay--hidden");
  cerrar_edicion.classList.add("profile-editor__overlay--hidden");
}
