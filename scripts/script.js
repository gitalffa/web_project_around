let page = document.querySelector(".page");
let button_edit = page.querySelector(".button-edit");
let fondo_negro = page.querySelector(".modo-edicion-none");
let page_popup_edit = page.querySelector(".edicion__popup");
let cerrar_edicion = page.querySelector(".edicion__close");
let input_item = page.querySelectorAll("input__item");
const profileId = document.querySelector(".profile__id");

// 1. Seleccionar elementos
const form = document.querySelector(".edicion__form");
const inputNombre = form.querySelector('.input__item[placeholder="name"]');
const inputGrado = form.querySelector('.input__item[placeholder="Degree"]');

const profileName = document.querySelector(".profile__name");
const profileDegree = document.querySelector(".profile__degree");

function manipulaFormEdit() {
  quitaNone();
  const nombre = profileId.querySelector(".profile__name").textContent;
  const grado = profileId.querySelector(".profile__degree").textContent;
  const inputs = document.querySelectorAll(".edicion__form .input__item");
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
  fondo_negro.classList.remove("modo-edicion-none");
  page_popup_edit.classList.remove("modo-edicion-none");
  cerrar_edicion.classList.remove("modo-edicion-none");
}

function poneNone() {
  fondo_negro.classList.add("modo-edicion-none");
  page_popup_edit.classList.add("modo-edicion-none");
  cerrar_edicion.classList.add("modo-edicion-none");
}
