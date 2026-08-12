import { addItem , removeItem , cart } from "./cart.js";
import { products } from './data.js';
import { buildOrderMessage, getWhatsappLink } from "./whatsapp.js";
import { 
    renderProducts, 
    renderProductOptions, 
    renderTeamOptions,
    renderVariantOptions,
    renderCartSummary,
    renderSizeOptions
 } from "./render.js";

// 1. Inicialização/Renderiza os produtos na página;
renderProducts()
renderProductOptions()
renderTeamOptions()
renderSizeOptions()
renderCartSummary()

//Seleciona o container dos produtos;
const productsContainer = document.getElementById('products-container')

//Event Delegation: Escuta cliques no container pai;
productsContainer
    .addEventListener('click' , (e) => {
        // Verifica se o elemento clicado (ou o mais próximo) tem a classe do botão;
        const button = e.target.closest('.btn-customize')

        if (button) {
            //Obtém o id guardado no atributo data-id;
            const productId = button.dataset.id
            selectProductAndScroll(productId)
        }
})

// 2. NOVO: Event Delegation no #cart-summary para remover itens;
const cartSummaryContainer = document.getElementById('cart-summary');

if (cartSummaryContainer) {
    cartSummaryContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.btn-remove-item');

        if (button) {
            const cartItemId = button.dataset.cartItemId;
            removeItem(cartItemId);
            renderCartSummary(); // Re-renderiza o resumo com o item removido e total atualizado
        }
    });
}

const teamSelect = document.getElementById('team-select')
const customTeamWrapper = document.getElementById('custom-team-field')
const customTeamInput = document.getElementById('custom-team')
const productSelect = document.getElementById('product-select')
const flavorWrapper = document.getElementById('flavor-field')

if (productSelect) {
    productSelect
        .addEventListener('change' , (e) => {
            const selectedProductId = e.target.value
            renderVariantOptions(selectedProductId)

            if (selectedProductId !== '') {
                teamSelect.value = ''
                teamSelect.disabled = true

                if (customTeamWrapper) customTeamWrapper.style.display = 'none'
                if (customTeamInput) customTeamInput.value = ''

            } else {
                teamSelect.disabled = false
            }
    })
}

if (teamSelect) {
    teamSelect.addEventListener('change' , (e) => {
        const selectedTeam = e.target.value

        if (selectedTeam !== '') {
            productSelect.value = ''
            productSelect.disabled = true

            if (flavorWrapper) flavorWrapper.style.display = 'none'
            renderVariantOptions('')

        } else {
            productSelect.disabled = false
        }
    })
}
    

//FormData no formulário pra ler os dados indseridos nele...
const form = document.getElementById('order-form')

form
    .addEventListener('submit' , (event) => {
        event.preventDefault()

        const dataForm = new FormData(event.target)
        const objectDataForm = Object.fromEntries(dataForm)

        addItem(objectDataForm)
        renderCartSummary()

        form.reset()
        resetFormState(); 
})

//Envio ao whatsapp;
const whatsappBtn = document.getElementById('whatsapp-btn')

whatsappBtn.addEventListener('click' , () => {
    if (cart.length === 0) {
        alert('Adicione pelo menos um item ao carrinho antes de enviar o pedido')

    } else {
        const link = getWhatsappLink()
        window.open(link, '_blank')
    }
})

// Função auxiliar para selecionar o produto no formulário e fazer scroll suave;
function selectProductAndScroll(productId) {
    const productSelectForScroll = document.getElementById('product-select')
    const customSection = document.getElementById('customization-section')

    if (productSelectForScroll) {
        productSelectForScroll.value = productId

        // Isso é essencial para acionar o listener existente que chama renderVariantOptions();
       productSelectForScroll.dispatchEvent(new Event('change'))
    }

    if (customSection) {
        //Scroll Behavior;
        customSection.scrollIntoView({ behavior: 'smooth' , block: 'center'})
    }
}

const categoryFilters = document.getElementById('category-filters')

if (categoryFilters) {
    categoryFilters.addEventListener('click' , (e) => {
        const buttonFilters = e.target.closest('[data-category]')
        if(!buttonFilters) return

        const category = buttonFilters.dataset.category

        if (category === 'Todos') {
            renderProducts(products)

        } else {
            const filtered = products
                .filter(product => product.occasions && product.occasions.includes(category))
                renderProducts(filtered)
        }
    })
}

function resetFormState() {
    if(teamSelect) teamSelect.disabled = false
    if (productSelect) productSelect.disabled = false

    if (customTeamWrapper) customTeamWrapper.style.display = 'none';
    if (flavorWrapper) flavorWrapper.style.display = 'none';

    renderVariantOptions('');
}


