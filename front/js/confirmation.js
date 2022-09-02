const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);

let orderId = "";
if (urlParams.has("orderId")) {
  orderId = urlParams.get("orderId");
  console.log(orderId);
}

function afficherProduit(orderId) {
  const orderIdElement = document.getElementById("orderId");
  orderIdElement.textContent = orderId;
}


afficherProduit(orderId);
// clear cart

// function clearCart(){
//     const clearAllItems = window.localStoragecache.clear()
// }

// on peut faire un clear cart à la fin de confirmation mais cela marche mieux dans la page cart