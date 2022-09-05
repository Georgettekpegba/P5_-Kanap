const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
console.log(urlParams);

let id = "";
if (urlParams.has("id")) {
  id = urlParams.get("id");
  console.log(id);
}

/*recuperation des elements existants*/

const produitImage = document.querySelector(".item__img");
const produitName = document.getElementById("title");
const produitPrice = document.getElementById("price");
const produitDescription = document.getElementById("description");
const img = document.getElementById("productImg");
let ProduitColors = document.getElementById("colors");
let qteProduit = document.getElementById("quantity");
let ajouterProduit = document.getElementById("addToCart");
const btn = document.createElement("btn");

const cart = document.getElementById("quantity");

/*recuperer les data local storage avec la cle infoPanier*/

// fonctions local storage
function getPanier() {
  let infoPanier = localStorage.getItem("produitPanier");
  if (infoPanier == null) {
    return [];
  } else {
    return JSON.parse(infoPanier);
  }
}

// fonction pour enregister data ds local storage
function savePanier(produit) {
  localStorage.setItem("produitPanier", JSON.stringify(produit));
}

// fonction pour ajouter le pdt au panier
function ajouterPanier() {
  let infoPanier = getPanier();
  let produit = new Object();
  produit.id = id;
  produit.qte = Math.abs(parseInt(qteProduit.value));
  // pour nb positif
  produit.color = ProduitColors.value;
  // on signale une erreur si qte < 1 ou > 100
  if (produit.qte < 1 || produit.qte > 100) {
    alert("la quantité souhaité est incorrecte: " + produit.qte);
    // on arrete tout
    return false;
  }
  // on signale une erreur si color vide
  if (produit.color === "") {
    alert("Veuillez choisir une couleur");
    // on arrete tout
    return false;
  }

  if (infoPanier.length > 0) {
    // on cherche si le même produit avec la même couleur existe dejà dans le panier
    const index = infoPanier.findIndex(function (item) {
      return item.id == produit.id && item.color == produit.color;
    });

    if (index > -1) {
      const total = checkQuantity(infoPanier[index], produit.qte);
      const canAdd = checkGlobalQuantity(produit.qte);
      if (total === false || !canAdd ) {
        return false;
      }
      // on a trouvé
      infoPanier[index].qte = total;
    } else {
      // on a rien trouvé
      infoPanier.push(produit);
    }
  } else {
    infoPanier.push(produit);
  }

  if (!checkGlobalQuantity(produit.qte)) {
    return false;
  }
  savePanier(infoPanier);
  // confirmation
  alert("votre produit a bien été rajouté au panier");
}

//Le panier est un tableau de produits - cette entrée ne sert à rien - à effacer
// let panierInit = [];
// localStorage.setItem("userPanier", JSON.stringify(panierInit));

/**afficher le produit selectioné */
fetch("http://127.0.0.1:3000/api/products/" + id)
  .then((response) => response.json())
  .then((produit) => {
    img.setAttribute("src", produit.imageUrl);
    img.setAttribute("alt", produit.altTxt);
    produitName.textContent = produit.name;
    produitPrice.textContent = produit.price;
    produitDescription.textContent = produit.description;
    for (let color of produit.colors) {
      let optionColor = document.createElement("option");
      optionColor.setAttribute("value", color);
      optionColor.textContent = color;
      ProduitColors.appendChild(optionColor);
    }

    ajouterProduit.addEventListener("click", function () {
      return ajouterPanier();
    });
  });

  // On utile le chemin de search parameters et un appel à l'API fetch pour afficher les produits en détails