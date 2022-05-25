const section = document.getElementById('items');
fetch('http://127.0.0.1:3000/api/products/')
.then ((response) => response.json())
.then ((data)=> {
    for (let produit of data){
        const productId = produit._id;
        const ahref = document.createElement("a");
        ahref.setAttribute("href", "./product.html?id=" +productId);
        const article = document.createElement("article");
        const img = document.createElement("img");
        img.setAttribute("src", produit.imageUrl); 
        img.setAttribute("alt", produit.altTxt);
        const h3 = document.createElement("h3");
        h3.classList.add("productName");
        const p = document.createElement("p");
        p.classList.add("productDescription");
        const productName = produit.name;
        const productDescription = produit.description;
        h3.textContent = productName;
        p.textContent = productDescription;

    section.appendChild(ahref);
    ahref.appendChild(article);
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);
    }
});





    
   