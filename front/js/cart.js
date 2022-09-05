const apiUrl = "http://127.0.0.1:3000/api/products/";
const section = document.getElementById("cart__items");
let article = "";
let img = "";
let produitImg = "";
let produitContenu = "";
let produitDescription = "";
let produitName = "";
let produitColors = "";
let produitPrix = "";
let produitSettings = "";
let produitSettingsQuantite = "";
let quantite = "";
let produitQuantite = "";
let produitSettingsDelete = "";
let button = "";
let totalQuantite = document.getElementById("totalQuantity");
let totalPrix = document.getElementById("totalPrice");
let orderId = document.querySelector("cartAndFormContainer");
let cartForm = "";
let submitForm = document.querySelector("order");
const form = document.querySelector("#formSubmit");

const productsByColor = {};

function creationElementHtml() {
  article = document.createElement("article");
  img = document.createElement("img");
  produitImg = document.createElement("div");
  produitContenu = document.createElement("div");
  produitDescription = document.createElement("div");
  produitName = document.createElement("h2");
  produitColors = document.createElement("select");
  produitPrix = document.createElement("p");
  produitSettings = document.createElement("div");
  produitSettingsQuantite = document.createElement("div");
  quantite = document.createElement("p");
  produitQuantite = document.createElement("input");
  produitSettingsDelete = document.createElement("div");
  //  produitSupprime = document.createElement("p");
  button = document.createElement("p");
  cartForm = document.createElement("form");

  section.appendChild(article);
  article.appendChild(produitImg);
  produitImg.appendChild(img);
  article.appendChild(produitContenu);
  produitContenu.appendChild(produitDescription);
  produitDescription.appendChild(produitName);
  produitDescription.appendChild(produitColors);
  produitDescription.appendChild(produitPrix);
  produitContenu.appendChild(produitSettings);
  produitSettings.appendChild(produitSettingsQuantite);
  produitSettingsQuantite.appendChild(quantite);
  produitSettingsQuantite.appendChild(produitQuantite);
  produitContenu.appendChild(produitSettingsDelete);
  // produitSettingsDelete.appendChild(produitSupprime);
  produitSettingsDelete.appendChild(button);
}

function ajouterClass() {
  article.classList.add("cart__item");
  produitImg.classList.add("cart__item__img");
  produitContenu.classList.add("cart__item__content");
  produitDescription.classList.add("cart__item__content__description");
  produitSettings.classList.add("cart__item__content__settings");
  produitSettingsQuantite.classList.add(
    "cart__item__content__settings__quantity"
  );
  produitSettingsDelete.classList.add("cart__item__content__settings__delete");
  // produitSupprime.classList.add("deleteItem");
  button.classList.add("deleteItem");
  produitQuantite.classList.add("itemQuantity");
}

// fonction pour enregister data ds local storage
function savePanier(cart) {
  localStorage.setItem("produitPanier", JSON.stringify(cart));
}

// fonctions local storage
function getPanier() {
  let infoPanier = localStorage.getItem("produitPanier");
  /*1er cas*/
  if (infoPanier == null) {
    return [];
  } else {
    return JSON.parse(infoPanier);
  }
}

function InsererInfoProduit(data) {
  const panier = getPanier();
  const indexProduit = panier.findIndex((product) => {
    let result = true;
    /**
     * c'est pour vérifier que on ne sélectionne pas une ligne qui a déjà été sélectionné avec une couleur différente
     */
    if (productsByColor[data._id]) {
      result = !productsByColor[data._id].includes(product.color);
    }
    return data._id === product.id && result;
  });
  if (indexProduit > -1) {
    const produit = panier[indexProduit];
    productsByColor[data._id] = productsByColor[data._id]
      ? [...productsByColor[data._id], produit.color]
      : [produit.color];
    article.setAttribute("data-color", produit.color);
    produitQuantite.setAttribute("value", produit.qte);
    for (i = 0; i < data.colors.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("name", data.colors[i]);
      option.textContent = data.colors[i];
      if (produit.color === data.colors[i]) {
        option.setAttribute("selected", "selected");
      }
      produitColors.append(option);
    }
  }
  article.setAttribute("data-id", data._id);
  produitQuantite.setAttribute("type", "number");
  produitQuantite.setAttribute("name", "itemQuantity");
  produitQuantite.setAttribute("min", "1");
  produitQuantite.setAttribute("max", "100");
  img.setAttribute("src", data.imageUrl);
  img.setAttribute("alt", data.altText);
  produitName.textContent = data.name;
  produitPrix.textContent = data.price + ".00 €";
  quantite.textContent = "Qté: ";
  // produitSupprime.textContent = "supprimer";
  button.textContent = "supprimer";
  cartForm.setAttribute("name", "formulaire");
  cartForm.setAttribute("id", "id_form");
}

function afficheTotalQuantitePrix() {
  let cart = getPanier();
  let prixTotal = 0;
  let quantite = 0;
  for (let info of cart) {
    let id = info.id;
    fetch(apiUrl + id)
      .then((response) => response.json())
      .then((data) => {
        quantite += info.qte;
        prixTotal += data.price * info.qte;
        totalQuantite.textContent = quantite;
        totalPrix.textContent = prixTotal;
        checkCommande(prixTotal);
      });
  }
  checkCommande(prixTotal);
}

function checkCommande(prixTotal) {
  if (parseInt(prixTotal) === 0) {
    form.style.display = "none";
  } else {
    form.style.display = "block";
  }
  
}

function bindEvents(id) {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    removeItemFromCart(id);
  });
  produitQuantite.addEventListener("change", function (e) {
    e.preventDefault();
    let el = e.target;
    updateItemFromCart(id, el.value, null);
  });
  produitColors.addEventListener("change", function (e) {
    e.preventDefault();
    let el = e.target;
    updateItemFromCart(id, null, el.value);
  });

  button.addEventListener("click", function (event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();
    // reglage du bug du update cart qui se met à jour quand on supprime les modèles de kanap!
    // afficheTotalQuantitePrix();

  });
// reglage bug cartprice: le panier se met à jour au rafraichissement de la page

// updateCartTotal();
afficheTotalQuantitePrix();


}


function afficherProduit() {
  let infoPanier = getPanier();
  console.log(infoPanier);
  for (produit of infoPanier) {
    let id = produit.id;
    fetch(apiUrl + id)
      .then((response) => response.json())
      .then((data) => {
        creationElementHtml();
        ajouterClass();
        InsererInfoProduit(data);
        bindEvents(data._id);
      });
  }
}

function removeItemFromCart(productId) {
  const panier = getPanier();
  const newCart = panier.filter(function (product) {
    return product.id !== productId;
  });
  savePanier(newCart);
}

function updateItemFromCart(productId, newQuantity, newColor) {
  const panier = getPanier();
  const index = panier.findIndex(function (product) {
    return product.id === productId;
  });
  // condition de l'index
  if (index > -1) {
    if (newQuantity && newQuantity <= 100) {
      alert('Vous ne pouvez pas commander plus de 100 articles.');
      return false;
    } else if (newQuantity ) {
      if (!checkGlobalQuantity(newQuantity)) {
        return false;
      }
      // eviter concatenation
      panier[index].qte = parseInt(newQuantity);
    }
    if (newColor) {
      panier[index].color = newColor;
    }
    savePanier(panier);
  }
}

// // correction bug cat total par rapport au contenu panier


function updateCartTotal() {
  let cartItemContainer = document.getElementById("cart")[0]
  console.log(cartItemContainer);
  let cartRows = cartItemContainer.getElementsById("cart__items")
  for (let i = 0; i < cartRows.length; i++) {
    let cartRows = cartRows[i]
    let priceElement = cartRows.getElementByClassName("cart__price")[0];
    let quantityElement = document.getElementsByClassName('totalQuantity')[0];
    let price = parseFloat(priceElement.innerText.replace('€', ""));
    let quantity = quantityElement.value;
    total = total + (price+ quantity)
  }
  checkCommande(total);
  document.getElementsById('totalPrice')[0].innerText = total;

}




form.addEventListener("submit", function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const address = formData.get("address");
  const city = formData.get("city");

  const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
  const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
  const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
  const regexAddress = /^(([a-zA-ZÀ-ÿ0-9']+[\s\-]{1}[a-zA-ZÀ-ÿ0-9']+)){1,10}$/;


  const contact = { firstName, lastName, address, city, email };
  
  const isValid = (regexMail.test(contact.email) == true) &&
  (regexName.test(contact.firstName) == true) &&
  (regexName.test(contact.lastName) == true) &&
  (regexCity.test(contact.city) == true) &&
  (regexAddress.test(contact.address) == true); 

  if (!isValid) {
    console.log('invalid');
    if (!regexMail.test(contact.email)) {
      console.log('email invalide');
    }
    if (!regexName.test(contact.firstName)) {
      console.log('first name invalide');
    }
    if (!regexName.test(contact.lastName)) {
      console.log('last name invalide');
    }
    if (!regexCity.test(contact.city)) {
      console.log('city invalide');
    }
    if (!regexAddress.test(contact.address)) {
      console.log('address invalide');
      const domElem = document.getElementById('addressErrorMsg');
      domElem.textContent = "Votre adresse n'est pas valide";
    }
    return false; 
  }

  const products = getPanier().map(function (product) {
    return product.id;
  });
  console.log("contacts", contact);
  console.log("products", products);
  fetch(apiUrl + "order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contact, products, test: "test" }),
  })
    .then((responseData) => responseData.json())
    .then(
      (response) =>
        (window.location.href =
          "./confirmation.html?orderId=" + response.orderId)
    );
});






afficherProduit();
afficheTotalQuantitePrix();


