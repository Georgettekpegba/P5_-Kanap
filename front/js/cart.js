
const apiUrl = 'http://127.0.0.1:3000/api/products/';
const section = document.getElementById("cart__items");
let article = "";
let img ="";
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
// let produitSupprime = "";
let button = "";
let totalQuantite = document.getElementById("totalQuantity");
let totalPrix = document.getElementById("totalPrice");


function creationElementHtml(){
 article = document.createElement("article");
 img = document.createElement("img");
 produitImg = document.createElement("div");
 produitContenu = document.createElement("div");
 produitDescription = document.createElement("div") ;
 produitName = document.createElement("h2");
 produitColors = document.createElement("p");
 produitPrix = document.createElement("p");
 produitSettings = document.createElement("div");
 produitSettingsQuantite = document.createElement("div");
 quantite = document.createElement("p");
 produitQuantite = document.createElement("input");
 produitSettingsDelete = document.createElement("div");
//  produitSupprime = document.createElement("p");
button = document.createElement("p");




 

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

function ajouterClass(){
    article.classList.add("cart__item");
    produitImg.classList.add("cart__item__img");
    produitContenu.classList.add("cart__item__content");
    produitDescription.classList.add("cart__item__content__description");
    produitSettings.classList.add("cart__item__content__settings");
    produitSettingsQuantite.classList.add("cart__item__content__settings__quantity");
    produitSettingsDelete.classList.add("cart__item__content__settings__delete");
    // produitSupprime.classList.add("deleteItem");
    button.classList.add("deleteItem");
    produitQuantite.classList.add("itemQuantity");
}

  // fonction pour enregister data ds local storage
  function savePanier(cart){
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

function InsererInfoProduit(id, data, produit){
  article.setAttribute("data-id", id);
  article.setAttribute("data-color", produit.color); 
  produitQuantite.setAttribute("type", "number");
  produitQuantite.setAttribute("name", "itemQuantity");
  produitQuantite.setAttribute("min", "1");
  produitQuantite.setAttribute("max", "100");
  produitQuantite.setAttribute("value", produit.qte);
  img.setAttribute("src", data.imageUrl);
  img.setAttribute("alt",data.altText );
  produitName.textContent = data.name;
  produitColors.textContent = produit.color;
  produitPrix.textContent = data.price + ".00 €";
  quantite.textContent = "Qté: ";
  // produitSupprime.textContent = "supprimer";
  button.textContent = "supprimer";
  
  

  }

  function afficheTotalQuantitePrix (){
    let cart = getPanier();
    let prixTotal = 0;
    let quantite = 0;
    // for(let info of cart) {
    //   let id = info.id;
    //   fetch( apiUrl + id)
    //   .then(response => response.json())
    //   .then (data =>{
    //     quantite += info.qte;
    //     prixTotal += data.price * info.qte;
    //     totalQuantite.textContent = quantite;
    //     totalPrix.textContent = prixTotal;

    //   } );
    // }
    // boucle total pri
    // totalPrix
  }
  

function afficherProduit (){
    let infoPanier = getPanier();
    console.log(infoPanier);
    for (produit of infoPanier){
    
        let id = produit.id;
        fetch (apiUrl + id)
        .then (response => response.json ())
        .then ( data => {
          // const orderId = data.orderId
          // window.location.href = "/html/confirmation.html" + "?orderId" + orderId;
        console.log(data);
        

        creationElementHtml();  
        ajouterClass();
        InsererInfoProduit (id, data, produit);
        
        
        });
            
}}

afficherProduit();
afficheTotalQuantitePrix ();

//  Remove item from cart

    let obj = {};
    
    obj.removeItemFromCart = function (productId) {
      const panier = getPanier();
      const newCart = panier.filter(function (product) {
        return product.id !== productId;
      });
      savePanier(newCart);
    }
 
    
    obj.updateItemFromCart = function (productId, newQuantity, newColor) {
      const panier = getPanier();
      const index = panier.findIndex(function (product) {
        return product.id === productId;
      });
      // condition de l'index 
      if(index >-1){
        if (newQuantity) {
          panier[index].quantite = newQuantity;
        }
        if (newColor) {
          panier[index].color = newColor;
        }
        savePanier(panier);
      };
    }
    
     
//   button.addEventListener("click", function (event) {
//     let el = event.target;
//     // il faut trouver l'id du produit à supprimer
//     const productId = el.dataset.id;
//     // button.innerText = "vide"
//     // data-id="monId"
//     // il faut appeler obj.removeItemFromCart(productId);
//     obj.removeItemFromCart(productId);
//   });
// };
  


 //  suite

    let  removeItemFromCart = document.querySelectorAll(".deleteItem");
    console.log(removeItemFromCart.length);
    for(let i = 0; i < removeItemFromCart.length; i++){
      console.log("h");
      let bouttonSupprimer = removeItemFromCart[i];
      bouttonSupprimer.addEventListener('click', function(event){
      //  let buttonClicked = event.target
      //  buttonClicked.parentElemnt.remove()
      //  button.innerHTML = "C'est cliqué !";
      //  even.preventDefault(); 
      //  even.stopPropagation();
        alert("produit suprimé");
      });
    }

  
    
