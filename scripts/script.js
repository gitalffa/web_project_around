let content = document.querySelector(".content");
let button_edit = content.querySelector(".button-edit");

function manipulaFormEdit() {
  let fondo_negro = document.querySelector(".modo-edicion-none");
  let page_popup_edit = document.querySelector(".edicion__popup");
  let cerrar_edicion = document.querySelector(".edicion__close");

  fondo_negro.classList.remove("modo-edicion-none");
  page_popup_edit.classList.remove("modo-edicion-none");
  cerrar_edicion.classList.remove("modo-edicion-none");
}

button_edit.addEventListener("click", manipulaFormEdit);
