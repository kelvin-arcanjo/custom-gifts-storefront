import { cart ,  calculateTotal , getItemPrice } from './cart.js';
import { products , sizes } from './data.js';

/**
 * Constrói a mensagem de texto do pedido para envio via WhatsApp.
 * @returns {string} Texto formatado do pedido.
 */

export function buildOrderMessage() {
  if (cart.length === 0) return '';

  const itemsList = cart.map((item, index) => {
    const product = products.find(p => p.id === item.productId);
    const sizeObj = sizes.find(s => s.id === item.sizeId);

    // Guard clause: se não houver tamanho correspondente, pula o item
    const price = getItemPrice(item)
    if (!price) return '';

    // Nome dinâmico incluindo o tipo (Caneca / Copo)
    const productDisplay = item.productId === 'outra' && item.customProduct
    ? `${item.customProduct} (${itemType})`
    : product
        ? `${product.name} (${itemType})`
        : `${itemType} Personalizado(a)`;

    // Detalhes opcionais
    const flavorObj = product?.flavors?.find(f => f.id === item.flavorId);
    const flavorText = flavorObj ? `\n   • Sabor: ${flavorObj.label}` : '';
    const teamText = item.team ? `\n   • Equipa: ${item.team}` : '';
    const customTeamText = item.customTeam ? ` (${item.customTeam})` : '';
    const customText = item.customText ? `\n   • Texto: ${item.customText}` : '';

   const itemTotal = price * item.quantity;

    return `${index + 1}. *${productDisplay}*
   • Tamanho: ${sizeObj.label}${flavorText}${teamText}${customTeamText}${customText}
   • Qtd: ${item.quantity} x ${price.toLocaleString()} Kz = *${itemTotal.toLocaleString()} Kz*`;
  }).filter(Boolean).join('\n\n');

  const total = calculateTotal();

  return `*Novo Pedido - Osvaldo Brindes* 🛒\n\n${itemsList}\n\n*Total do Pedido:* ${total.toLocaleString()} Kz`;
}

const WHATSAPP_NUMBER = '244943567154'

export function getWhatsappLink() {
    const message =  buildOrderMessage()
    const encodedMessage = encodeURIComponent(message)

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}