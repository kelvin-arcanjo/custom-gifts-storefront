import { products } from "./data.js";

export const cart = [];

const exampleItem = {
    productId: 'caneca-nocal',
    team: 'Outra (Especifique)',
    customTeam: 'Sporting Clube da Huíla',
    customText: 'Osvaldo Jr.',
    quantity: 2,
}

export function addItem (formData) {
    const newItem = {
        cartItemId: crypto.randomUUID(),
        productId: formData.productId,
        team: formData.team,
        customTeam: formData.customTeam || '',
        customText: formData.customText || '',
        quantity: Math.max(1 , Number(formData.quantity) || 1)
    }

    cart.push(newItem)

    return newItem
}

export function removeItem(cartItemId) {
  const index = cart.findIndex(item => item.cartItemId === cartItemId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
}


export function calculateTotal() {
  return cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    const price = product ? product.price : 0;
    return total + (price * item.quantity);
  }, 0);
}



