import { products , sizes } from "./data.js";

//Estado  em memória do carrinho;
export const cart = [];

export function addItem (formData) {
    const newItem = {
        cartItemId: crypto.randomUUID(),
        productId: formData.productId,
        sizeId: formData.sizeId,
        flavorId: formData.flavorId || null,
        team: formData.team,
        customTeam: formData.customTeam || '',
        customText: formData.customText || '',
        type: formData.type,
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
    const sizeObj = sizes.find(s => s.id === item.sizeId);

    // Guard clause: se por algum motivo não houver tamanho selecionado, pula o item
    if (!sizeObj) return total 

    // Se encontrar o tamanho, usa o seu preço; caso contrário, 0;
    const price = sizeObj ? sizeObj.price : 0;

    return total + (price * item.quantity);
    
  }, 0);
}


