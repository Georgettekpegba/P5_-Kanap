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

// clear cart
// afficherProduit(orderId);
// function clearCart(){
//     const clearAllItems = window.localStoragecache.clear()
// }
