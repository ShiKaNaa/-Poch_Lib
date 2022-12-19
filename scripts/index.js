console.log("JS Loaded");

const newBookTitleSelector = document.querySelector(".h2");
const divConstructor = document.createElement("div");
const buttonConstructor = document.createElement("button");

// function to create button "Ajouter un livre"
const createButtonAddABook = () => {
    buttonConstructor.innerText = "Ajouter un livre";
    newBookTitleSelector.appendChild(divConstructor).appendChild(buttonConstructor).classList.add("button-add-book");
}

createButtonAddABook();

const searchForm = () => {
    addABookDivSelector.addEventListener("click", newForm);
}

// function to create a form for the Google Books API
const newForm = () => {
    removeButtonAddABook();
    const cancelButton = document.createElement("button");
    const divForForm = document.createElement("div");
    cancelButton.innerText = "Annuler";
    cancelButton.classList.add("button-cancel-search");
    divForForm.id = "formId";
    divForForm.innerHTML = '<form action="" method="get" class="form-example">' + 
                                '<div class="title-of-book">' +
                                '<label for="title">Titre du livre</label>'+
                                '<input type="text" name="title" id="title-book" required>' +
                                '</div>' +
                                '<div class="author-of-book">' +
                                '<label for="author">Auteur</label>' +
                                '<input type="text" name="author" id="author-book" required>' +
                                '</div>' +
                                '<div class="search-button">' +
                                '<input type="submit" value="Rechercher">' +
                                '</div>' + 
                                '</form>';
    
    newBookTitleSelector.appendChild(divForForm).appendChild(cancelButton);
    removeForm();  
}

// function to go back to "Ajouter un livre"


const removeForm = () => {
    const formDivSelector = document.getElementById("formId");
    const cancelButtonSelector = document.querySelector(".button-cancel-search");
    cancelButtonSelector.addEventListener("click", () => {
        formDivSelector.remove();
        createButtonAddABook();
    });
 }

// function to remove button "Ajouter un livre"
const removeButtonAddABook = () => {
    addABookDivSelector.remove();
}

const addABookDivSelector = document.querySelector(".button-add-book");

searchForm();

