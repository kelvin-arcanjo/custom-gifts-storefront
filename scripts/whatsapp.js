import { cart ,  calculateTotal } from './cart.js';
import { products } from './data.js';

/**
 * Constrói a mensagem de texto do pedido para envio via WhatsApp.
 * @returns {string} Texto formatado do pedido.
 */

export function buildOrderMessage() {
    if (cart.length === 0) {
        return 'Olá! O meu carrinho está vazio.'
    }

    let message = '🛒 *Novo Pedido*\n\n';

    cart.forEach((item , index) => {
        const product = products.find(p => p.id === item.productId)
        const sizeObj = product?.sizes?.find(s => s.id === item.sizeId)

    // Guard clause: salta se o produto ou tamanho não existirem;
    if (!product || !sizeObj) return;


    // Trata a equipa personalizada ou selecionada
    const teamDisplay = (item.team === 'Outra (Especifique)' && item.customTeam)
      ? item.customTeam 
      : item.team;

    // Trata o sabor (se aplicável)
    const flavorObj = product.flavors?.find(f => f.id === item.flavorId);
    const flavorText = flavorObj ? `\n- Sabor: ${flavorObj.label}` : '';

    // Trata o texto personalizado (se aplicável)
    const customTextDisplay = item.customText ? `\n- Texto: "${item.customText}"` : '';

    const itemSubtotal = (sizeObj.price * item.quantity).toLocaleString();

    message += `*Item ${index + 1}: ${product.name}*\n`;
    message += `- Tamanho: ${sizeObj.label}\n`;
    message += `- Equipa: ${teamDisplay}${flavorText}${customTextDisplay}\n`;
    message += `- Qtd: ${item.quantity} x ${sizeObj.price.toLocaleString()} Kz = *${itemSubtotal} Kz*\n\n`;     
})

    const total = calculateTotal().toLocaleString();
    message += `💰 *Total do Pedido: ${total} Kz*`;

    return message;
}

const WHATSAPP_NUMBER = '244943567154'

export function getWhatsappLink() {
    const message =  buildOrderMessage()
    const encodedMessage = encodeURIComponent(message)

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}