export function calculatePrice(cart) {
  let total = 0;

  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      let price = cart[i].price;
      let quantity = cart[i].quantity;
      total = total + quantity * price;
    }
  }

  return total;
}
