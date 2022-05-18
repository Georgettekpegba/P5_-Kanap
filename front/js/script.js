const items = document.getElementById('items');
fetch('http://127.0.0.1:3000/api/products/')
.then ((response) => response.json())
.then ((data)=> {
    for (let produit of data){
        console.log(produit.name)

    }
});

function Add (){
    compteur += compteur;
    console.log(compteur, "compteur àpres incrementation");
    title.innerText = compteur;
    image = document.getElementById
    
}

function attache(id){
    const attache = document.createElement("a")
    attache.href = id
    return attache
}

function createProductElement (data) {

    const { a, article, img, h3, p } = createElementFactory('a', 'article', 'img', 'h3', 'p')
    
   
