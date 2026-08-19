import { products, sizes, normalPrices, personalizedPrices } from "./data.js";

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
        customProduct: formData.customProduct || '',
        type: formData.type,
        quantity: Math.max(1 , Number(formData.quantity) || 1),
        mode: formData.mode
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

// Função auxiliar para descobrir o preço de um item individual
export function getItemPrice(item) {
  if (item.mode === 'Normal') {
    return normalPrices[item.sizeId] || 0
  }

  const typeKey = (item.type || '').toLowerCase()
  const dynamicKey = `${item.sizeId}-${typeKey}`

  return personalizedPrices[dynamicKey] || 0
}


// Atualização do calculateTotal para usar a getItemPrice...
export function calculateTotal() {
  return cart.reduce((total , item) => {
    const price = getItemPrice(item)
    
    return total + (price * item.quantity)
  },0)
}

