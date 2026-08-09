import { products , teams } from "./data.js";

export function renderProducts() {
    const container = document.getElementById('products-container')

    container.innerHTML = products
        .map(product => {
            // 1. Extrai apenas os preços das variantes;
            const prices = product.sizes.map(size => size.price)

            // 2. Calcula o menor e o maior preço;
            const minPrice = Math.min(...prices)
            const maxPrice = Math.max(...prices)

            // 3. Formata as ocasiões para exibir como tags/badges;
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

