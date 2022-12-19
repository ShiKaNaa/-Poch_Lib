console.log("JS Loaded");

const newBookTitleSelector = document.querySelector(".h2");
const divConstructor = document.createElement("div");
const buttonConstructor = document.createElement("button");

const createButtonAddABook = () => {
    buttonConstructor.innerText = "Ajouter un livre";
    newBookTitleSelector.appendChild(divConstructor).appendChild(buttonConstructor).classList.add("button-add-book");
}

createButtonAddABook();

const searchForm = () => {
    addABookDivSelector.addEventListener("click", newForm);
}

const newForm = () => {
    removeButtonAddABook();
    const formForGoogleAPI = document.appendChild();
}

const removeButtonAddABook = () => {
    addABookDivSelector.remove();
}

const addABookDivSelector = document.querySelector(".button-add-book");

searchForm();
