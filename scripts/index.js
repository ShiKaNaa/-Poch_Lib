const newBookTitleSelector = document.querySelector(".h2");
const pochListSelector = document.getElementById("content");

const divConstructor = document.createElement("div");
const buttonConstructor = document.createElement("button");

// function to create button "Ajouter un livre"
const createButtonAddABook = () => {
    buttonConstructor.innerText = "Ajouter un livre";
    newBookTitleSelector.appendChild(divConstructor).appendChild(buttonConstructor).classList.add("button-add-book");
}

createButtonAddABook();

// function to create card at load
const cardForSavedBookmarks = () => {
    Object.keys(sessionStorage).forEach(key => {
        let sessionStorageBooks = JSON.parse(sessionStorage.getItem(key));
        const divForPochList = document.createElement("div");

        divForPochList.classList.add("card-container-bookmarked");
        divForPochList.id = sessionStorageBooks.id;

        let imgCover = sessionStorageBooks.image ? sessionStorageBooks.image : "./img/unavailable.png";
        divForPochList.innerHTML = '<div class="title-bookmark-container" id="'+ sessionStorageBooks.title + '" >' +
                                        '<div class="title-of-book"> Titre : ' + sessionStorageBooks.title +'</div>' +
                                        '<button type="button"><i class="fa-solid fa-trash"></i></button>' +    
                                    '</div>' + 
                                    '<div class="id-of-book"> Id : ' + sessionStorageBooks.id +'</div>' +
                                    '<div class="author-of-book" id="' + sessionStorageBooks.author + '"> Auteur : ' + sessionStorageBooks.author +'</div>' +
                                    '<div class="description-of-book"> Description : ' + sessionStorageBooks.description + '...' +'</div>' +
                                    '<div class="img-container">' + `<img class="img-of-book" src=${imgCover} alt="image cover of book"></img>` + '</div>';
        pochListSelector.append(divForPochList);
    })
    const trashCanSelectorAftersubmit = document.querySelectorAll(".fa-trash");
    addEventListenerToTrashCan(trashCanSelectorAftersubmit); 
}

// function to add event listener to each trash can icon
const addEventListenerToTrashCan = (trashCansIcons) => {
    trashCansIcons.forEach(icon => {
        icon.addEventListener("click", removeBookmark)
    })
}

// fuction to remove bookmark to poch liste
const removeBookmark = () => {
    let dataFromDiv = event.target.parentNode.parentNode.parentNode;
    sessionStorage.removeItem(dataFromDiv.id);
    dataFromDiv.remove()
}

if(sessionStorage.length > 0) {
    cardForSavedBookmarks();
}


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
    // penser à supprimer les value="harry" et "rowling"
    divForForm.innerHTML = '<form action="" method="get" class="form-example">' + 
                                '<div class="title-of-book">' +
                                    '<label for="title">Titre du livre </label>'+
                                    '<input type="text" name="title" id="title-book" value="" placeholder="Seigneur des Anneaux" required>' +
                                '</div>' +
                                '<div class="author-of-book">' +
                                    '<label for="author">Auteur </label>' +
                                    '<input type="text" name="author" id="author-book" value="" placeholder="Tolkien" required>' +
                                '</div>' +
                                '<div class="search-button">' +
                                    '<input id="submitFormId" type="submit" value="Rechercher">' +
                                '</div>' + 
                            '</form>';
    newBookTitleSelector.appendChild(divForForm).appendChild(cancelButton);
    submitFormHandler();
    removeForm();  
}

// function to go back to "Ajouter un livre"
const removeForm = () => {
    const formDivSelector = document.getElementById("formId");
    const cancelButtonSelector = document.querySelector(".button-cancel-search");
    cancelButtonSelector.addEventListener("click", () => {
        formDivSelector.remove();
        removeResultsCards();
        createButtonAddABook();
        // vérifier si fonctionne tjrs avec ligne du dessous commenté, sinon créer une fonctio qui va supprimer les cards bookmarké
        // cardForSavedBookmarks();
    });
 }

 // function to remove all 
 const removeResultsCards = () => {
    const cardResultsSelector = document.querySelectorAll(".card-container-result");
    cardResultsSelector.forEach(card => {
        card.remove();
    })
 }

// fuction to call Google Books API
const submitFormHandler = () => {
    const submitFormSelector = document.getElementById("submitFormId");
    submitFormSelector.addEventListener("click", () => {
        event.preventDefault();    

        const searchTitle = document.getElementById("title-book").value;
        const searchAuthor = document.getElementById("author-book").value;

        if (searchTitle && searchAuthor ) {
            removeResultsCards();
            fetch("https://www.googleapis.com/books/v1/volumes?q="+searchTitle + "+inauthor:" + searchAuthor + "&key=AIzaSyDzdYQ_1JzwMurPc64t9N65-aGIQQiaGSw")
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    handleResults(data);
                });
        } else {
            alert("Veuillez entrer un titre et un auteur");
        }
    })
}

// function to handle response from Google Books API and create according div
const handleResults = (bookResultsAPI) => {
    if (bookResultsAPI.totalItems === 0) {
        alert("Aucun livre n'a été trouvé");
    } else {
        bookResultsAPI.items.forEach(bookResult => {
            const bookCover = bookResult.volumeInfo.imageLinks ? bookResult.volumeInfo.imageLinks.smallThumbnail : "./img/unavailable.png";
            const bookDescription = bookResult.volumeInfo.description ? bookResult.volumeInfo.description.slice(0,200) : "Information manquante";
            const bookAuthour = bookResult.volumeInfo.authors ? bookResult.volumeInfo.authors[0] : "Auteur inconnu";
            const divForCard = document.createElement("div");
            divForCard.classList.add("card-container-result");
            divForCard.id = bookResult.id;
            divForCard.innerHTML = '<div class="title-bookmark-container" id="'+ bookResult.volumeInfo.title + '" >' +
                                        '<div class="title-of-book"> Titre : ' + bookResult.volumeInfo.title +'</div>' +
                                        '<button type="button"><i class="fa-solid fa-bookmark"></i></i></button>' +    
                                    '</div>' + 
                                    '<div class="id-of-book"> Id : ' + bookResult.id +'</div>' +
                                    '<div class="author-of-book" id="' + bookAuthour + '"> Auteur : ' + bookAuthour +'</div>' +
                                    '<div class="description-of-book"> Description : ' + bookDescription + '...' +'</div>' +
                                    '<div class="img-container">' + `<img class="img-of-book" src=${bookCover} alt="image cover of book"></img>` + '</div>';
            pochListSelector.prepend(divForCard); 
            const bookmarksSelectorAftersubmit = document.querySelectorAll(".fa-bookmark");
            addEventListenerToBookmark(bookmarksSelectorAftersubmit);
        })
    }

}

// function to remove button "Ajouter un livre"
const removeButtonAddABook = () => {
    addABookDivSelector.remove();
}

const addABookDivSelector = document.querySelector(".button-add-book");

// function to add bookmark event listnener to all bookmarks
const addEventListenerToBookmark = (bookmarksSelector) => {
    bookmarksSelector.forEach(bookmark => {
        bookmark.addEventListener("click", handleClickFromBookmarkIcon);
    })
}

// function to handle click from BookmarkIcon
const handleClickFromBookmarkIcon = () => {
    let dataFromDiv = event.target.parentNode.parentNode.parentNode;
    let dataForPochListCard = dataFromDiv.cloneNode(true);
    dataForPochListCard.classList.remove("card-container-result");
    dataForPochListCard.classList.add("card-container-bookmarked");
    if(sessionStorage.getItem(dataFromDiv.id)) {
        alert("Vous ne pouvez ajouter deux fois le même livre");
    } else {
        let book = {
            title : dataFromDiv.children[0].id,
            id : dataFromDiv.id,
            author : dataFromDiv.children[2].id,
            description : dataFromDiv.children[3].innerText,
            image : dataFromDiv.children[4].children[0].currentSrc
        }
        sessionStorage.setItem(dataFromDiv.id, JSON.stringify(book));
        dataForPochListCard.firstChild.children[1].innerHTML = '<i class="fa-solid fa-trash"></i>';
        pochListSelector.append(dataForPochListCard);
        addEventListenerToTrashCan([dataForPochListCard]);
    }
}

searchForm();
