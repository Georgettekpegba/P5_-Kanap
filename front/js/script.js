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


// on pouvait aussi y aller par la methodes des array pour un codage plus rapide mais on reccupère moins facilement les objets

// fetch('http://127.0.0.1:3000/api/products/')
// .then(response => response.json())
// .then(data=> {

//     console.log(data);
//     const first = data[0];
//     console.log(first);
//     const item =  document.getElementById("items");
// //    item.innerHTML +=`item`;
//     item.innerHTML += data;
//     // data.push(item); 
//     item.href = "./product.html?id=42";
//     item.push(data.image);
// });





    
   