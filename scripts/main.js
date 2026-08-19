import { addItem , removeItem , cart } from "./cart.js";
import { products } from './data.js';
import { buildOrderMessage, getWhatsappLink } from "./whatsapp.js";
import { 
    renderProducts, 
    renderProductOptions, 
    renderTeamOptions,
    renderVariantOptions,
    renderCartSummary,
    renderSizeOptions,
    renderTypeOptions
 } from "./render.js";

// 1. Inicialização/Renderiza os produtos na página;
renderProducts()
renderProductOptions()
renderTeamOptions()
renderSizeOptions()
renderCartSummary()
renderTypeOptions()

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

//NOVO: Event Delegation no #cart-summary para remover itens;
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

const modeRadios = document.querySelectorAll('input[name="mode"]')
const teamSelect = document.getElementById('team-select')
const customTeamWrapper = document.getElementById('custom-team-field')
const customTeamInput = document.getElementById('custom-team')
const productSelect = document.getElementById('product-select')
const flavorWrapper = document.getElementById('flavor-field')
const customTextWrapper = document.getElementById('custom-text-field')
const fieldTeam = document.getElementById('team-field')

modeRadios.forEach(radio => {
    radio.addEventListener('change' , (e) => {
        const mode = e.target.value

        if (mode === 'Normal') {
            // esconde equipa e texto personalizado;
            teamSelect.disabled = true
            teamSelect.value = ''
            fieldTeam.style.display = 'none'
        
            if (customTeamWrapper) customTeamWrapper.style.display = 'none'
            if (customTextWrapper) customTextWrapper.style.display = 'none'

            // reativa produto (caso estivesse desativado por causa da equipa)
            productSelect.disabled = false

        } else {
            //modo Personalizado: repõe tudo;
            teamSelect.disabled = false
            if (teamSelect.closest('div')) teamSelect.closest('div').style.display = 'block'

            if (customTextWrapper) customTextWrapper.style.display = 'block'
        }
    })
})

const customProductWrapper = document.getElementById('custom-product-field')

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

            if (customProductWrapper) {
                customProductWrapper.style.display = (selectedProductId === 'outra') ? 'block' : 'none'
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

        //caso o "Outra (Especifique)" for selecionado...
        if (customTeamWrapper) {
            if (selectedTeam === 'Outra (Especifique)') {
                customTeamWrapper.style.display = 'block'

            } else {
                customTeamWrapper.style.display = 'none'
            }
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

        console.log("Dados do formulário:", objectDataForm);

        const selectedType = objectDataForm.type;

        if (objectDataForm.type === 'Ambos') {
            const qtyCanecas = Number(objectDataForm.quantityCanecas) || 0
            const qtyCopos = Number(objectDataForm.quantityCopos) || 0

            if (qtyCanecas > 0) {
                addItem({
                    ...objectDataForm,
                    type: 'Caneca',
                    quantity: qtyCanecas
                })
            }

            if (qtyCopos > 0) {
                addItem({
                    ...objectDataForm,
                    type: 'Copo',
                    quantity: qtyCopos
                })
            }

        } else {
            if (!objectDataForm.type) {
                alert('Por favor, selecione o Tipo (Caneca ou Copo)!')
                return;
            }

            addItem({
                ...objectDataForm,
                quantity: Number(objectDataForm.quantity) || 1
            });
        }

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

const categoryFilters = document.getElementById('category-filters');

if (categoryFilters) {
  categoryFilters.addEventListener('click', (e) => {
    // 1. Identifica o botão clicado
    const buttonFilter = e.target.closest('[data-category]');
    if (!buttonFilter) return;

    // 2. Lê a categoria em minúsculas (ex: "casamento", "aniversario", "pessoal", "todos")
    const category = buttonFilter.dataset.category.toLowerCase();

    // 3. Remove a borda de destaque de TODOS os cartões antes de aplicar no novo
    const allCards = document.querySelectorAll('.product-card');
    allCards.forEach(card => card.classList.remove('clickOnFiltersButton'));

    // 4. Se for "Todos", sai sem aplicar borda
    if (category === 'todos') return;

    // 5. targetCard pega o elemento do cartão cujo id é igual à categoria
    const targetCard = document.getElementById(category);

    if (targetCard) {
      targetCard.classList.add('clickOnFiltersButton');
    }
  });
}

function resetFormState() {
    if(teamSelect) teamSelect.disabled = false
    if (productSelect) productSelect.disabled = false

    if (customTeamWrapper) customTeamWrapper.style.display = 'none';
    if (flavorWrapper) flavorWrapper.style.display = 'none';

    if (quantityNormalField) quantityNormalField.style.display = 'block';
    if (quantityBothField) quantityBothField.style.display = 'none';

    renderVariantOptions('');
    renderTypeOptions()
}

//Campo das Quantidades ...se for ambos...
const typeSelect = document.getElementById('type-select')
const quantityNormalField = document.getElementById('quantity-normal-field')
const quantityBothField = document.getElementById('quantity-both-field')

typeSelect.addEventListener('change' , (e) => {
    if (e.target.value === 'Ambos') {
        quantityNormalField.style.display = 'none'
        quantityBothField.style.display = 'block'

    } else {
        quantityNormalField.style.display = 'block'
        quantityBothField.style.display = 'none'
    }
})

//Toggle para abrir e fechar o painel do carrinho;
const cartToggleBtn = document.getElementById('cart-toggle-btn')
const checkoutArticle = document.getElementById('checkout-article')

if (cartToggleBtn && checkoutArticle) {
    cartToggleBtn.addEventListener('click' , () => {
        checkoutArticle.classList.toggle('cart-panel-open')
    })
}



