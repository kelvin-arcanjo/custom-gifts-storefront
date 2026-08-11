import { products , teams , sizes } from "./data.js";
import { cart , calculateTotal } from "./cart.js";

export function renderProducts(productsList = products) {
    const container = document.getElementById('products-container')

    if (!container) return

    if (productsList.length === 0) {
        container.innerHTML = '<p class="no-products">Nenhum Produto encontrado para esta ocasião'
        return
    }

    const prices = sizes.map(size => size.price)

    //Calcula o menor e o maior preço;
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    container.innerHTML = productsList
        .map(product => {
            //Formata as ocasiões para exibir como tags/badges;
            const occasionsBadges = product.occasions
                .map(occ => `<span class="badge">${occ}</span>`)
                .join(' ')

            // 4. Retorna o Template Literal do Card do Produto;
            return `
                <div class="product-card" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-occasions">
                            ${occasionsBadges}
                        </div>
                        <p class="product-price">
                            A partir de <strong>${minPrice.toLocaleString()} Kz</strong>
                            <small>(até ${maxPrice.toLocaleString()} Kz)</small>
                        </p>
                        <button class="btn-customize" data-id="${product.id}">
                            Personalizar
                        </button>
                    </div>
                </div>
            `    
        }).join('')
}

//Renderiza as opções do <select id="product-select">;

export function renderProductOptions() {
    const select = document.getElementById('product-select')

    if(!select) return;

    const productOptions = products
        .map(product => {
            return `<option value="${product.id}">${product.name}</option>`
    }).join('')

    select.innerHTML = `<option value="">-- Selecione um produto --</option>` + productOptions
}
    //Renderiza as opções do <select id="team-select"></select>;

    export function renderTeamOptions() {
        const select = document.getElementById('team-select')

        if (!select) return

        const teamOptions = teams
            .map(team => `<option value="${team}">${team}</option>`)
            .join('')

        select.innerHTML  = `<option value="">-- Selecione a Equipa / Clube --</option>` + teamOptions;
    }


export function renderVariantOptions(productId) {
  const flavorSelect = document.getElementById('flavor-select');
  const flavorContainer = document.getElementById('flavor-field'); // div/container do select de sabores

  if (!flavorSelect) return;

  const product = products.find(p => p.id === productId);

  // Se o produto existir e tiver sabores (ex: Booster)
  if (product && product.flavors) {
    const flavorOptions = product.flavors.map(f => {

        return `<option value="${f.id}">${f.label}</option>`;

    }).join('');

    flavorSelect.innerHTML = `<option value="">Selecione o Sabor</option>${flavorOptions}`;
    if (flavorContainer) flavorContainer.style.display = 'block';

  } else {
    // Esconde/reseta o campo de sabores para produtos sem sabor (ex: Lata Personalizada)
    flavorSelect.innerHTML = '<option value="">Não aplicável</option>';
    if (flavorContainer) flavorContainer.style.display = 'none';
  }
}

//Função renderCartSummary()...

export function renderCartSummary() {
  const summaryContainer = document.getElementById('cart-summary');
  const totalContainer = document.getElementById('cart-total');

  if (!summaryContainer) return;

  // Se o carrinho estiver vazio
  if (cart.length === 0) {
    summaryContainer.innerHTML = '<p>O teu carrinho está vazio.</p>';
    if (totalContainer) totalContainer.textContent = '0 Kz';
    return;
  }

  // Gera a lista de itens do carrinho
  const itemsHTML = cart.map(item => {
    // Busca o produto e o tamanho correspondentes
    const product = products.find(p => p.id === item.productId);
    const sizeObj = sizes.find(s => s.id === item.sizeId);

    // 1. CORREÇÃO: Guard clause - Salta se faltarem dados essenciais
    if (!product || !sizeObj) {
      return ''; 
    }

    // A partir daqui, product e sizeObj EXISTEM
    const teamDisplay = (item.team === 'Outra (Especifique)' && item.customTeam)
      ? item.customTeam 
      : item.team;

    const flavorObj = product.flavors?.find(f => f.id === item.flavorId);
    const flavorText = flavorObj ? ` | Sabor: ${flavorObj.label}` : '';

    // 2. CORREÇÃO: Typo corrigido (itemSubtotal com 't' minúsculo)
    const itemSubtotal = (sizeObj.price * item.quantity).toLocaleString();

    return `
      <div class="cart-item">
        <h4>${product.name} (${sizeObj.label})</h4>
        <p>
          Equipa: ${teamDisplay}${flavorText}
          ${item.customText ? ` | Texto: "${item.customText}"` : ''}
        </p>
        <p>Qtd: ${item.quantity} x ${sizeObj.price.toLocaleString()} Kz = <strong>${itemSubtotal} Kz</strong></p>
        <button class="btn-remove-item" data-cart-item-id="${item.cartItemId}">Remover</button>
      </div>
    `;
  }).join('');

  // Atualiza o DOM
  summaryContainer.innerHTML = itemsHTML;

  // Atualiza o total
  if (totalContainer) {
    const total = calculateTotal();
    totalContainer.textContent = `${total.toLocaleString()} Kz`;
  }
}

export function renderSizeOptions() {
    const sizeSelect = document.getElementById('size-select')
    if(!sizeSelect) return 

    const optionsHTML = sizes.map(size => {
        return `<option value="${size.id}">${size.label} - ${size.price.toLocaleString()} Kz</option>`
    }).join('')

    sizeSelect.innerHTML = `<option value="">Selecione o Tamanho</option>${optionsHTML}`;
}

