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
const produitName =  document.getElementById("title");
const produitPrice = document.getElementById("price");
const produitDescription = document.getElementById("description");
const img = document.createElement("img");
let ProduitColors = document.getElementById("colors");





/**afficher le produit selectioné */
fetch('http://127.0.0.1:3000/api/products/'+id)
.then ((response) => response.json())
.then ((produit)=> {
    console.log(produit);
    img.setAttribute("src", produit.imageUrl); 
    img.setAttribute("alt", produit.altTxt);
    produitName.textContent = produit.name;
    produitPrice.textContent = produit.price;
    produitDescription.textContent = produit.description;
    for (let color of produit.colors){
        let optionColor = document.createElement("option");
        optionColor.setAttribute("value", color );
        optionColor.textContent = color;
        ProduitColors.appendChild(optionColor)
    } 
   

  


    
});








    