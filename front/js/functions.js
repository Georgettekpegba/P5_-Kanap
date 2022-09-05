function checkQuantity(item, quantityToAdd) {
    const total = item.qte + quantityToAdd;
    if ( total > 100) {
        alert('Vous ne pouvez pas commander plus de 100 articles.');
        return false;
    }
    return total;
}

function checkGlobalQuantity(quantityToAdd) {
    const cart = getPanier();
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        total += item.qte;
    }
    if ( (total + quantityToAdd) > 100) {
        alert('Vous ne pouvez pas commander plus de 100 articles en tout.');
        return false;
    }
    return true;
}