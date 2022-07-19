
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
let produitSupprime = "";

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
produitSupprime = document.createElement("p");

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
produitSettingsDelete.appendChild(produitSupprime);





}



