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
const img = document.createElement("img");
let ProduitColors = document.getElementById("colors");
let qteProduit = document.getElementById("quantity");
let ajouterProduit = document.getElementById("addToCart");
const btn = document.createElement("btn");

const cart = document.getElementById("quantity");

/*recuperer les data local storage avec la cle infoPanier*/

// fonctions local storage
function getPanier() {
  let infoPanier =z
    localStorage.getItem(
      "produitPanier"
    ); /*(fausse clef), info panier data local storage*/
  /*1er cas*/
  if (infoPanier == null) {
    return [];
  } else {
    return JSON.parse(infoPanier);
  }
}

// fonction pour enregister data ds local storage
function savePanier(produit){
localStorage.setItem("produitPanier", JSON.stringify(produit));
}

// fonction pour ajouter le pdt au panier
function ajouterPanier(){
  let infoPanier = getPanier();
  console.log(infoPanier);
  let produit = new Object();
  let produitIdentique = false;
  produit.id = id;
  produit.qte = parseInt(qteProduit.value);
  produit.color = ProduitColors.value;
  for (let data of infoPanier) {
    if (data.id == produit.id && data.color == produit.color){
      data.qte += produit.qte;
      produitIdentique == true;
      break;
    }
    
    
} 
if (produitIdentique == false) {
  infoPanier.push(produit);
}
savePanier(infoPanier);
console.log(infoPanier);
}

//Le panier est un tableau de produits
let panierInit = [];
localStorage.setItem("userPanier", JSON.stringify(panierInit));

/**afficher le produit selectioné */
fetch("http://127.0.0.1:3000/api/products/" + id)
  .then((response) => response.json())
  .then((produit) => {
    console.log(produit);
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
    ajouterProduit.addEventListener('click', function(){
     if (confirm('votre produit a bien été ajouté au panier. \r\n Pour consulter votre panier cliquez sur "ok". \r\n Pour continuer votre commande cliquez sur "annuler"')){
       window.location.href = "./cart.html";

     }

     
      

    })


  });
