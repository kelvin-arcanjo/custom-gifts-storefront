import { 

    renderProducts, 
    renderProductOptions, 
    renderTeamOptions,
    renderVariantOptions

 } from "./render.js";

// 1. Inicialização/Renderiza os produtos na página;
renderProducts()
renderProductOptions()
renderTeamOptions()
renderVariantOptions('')

// 2. Seleciona o container dos produtos;
const productsContainer = document.getElementById('products-container')

//3. Event Delegation: Escuta cliques no container pai;
productsContainer
    .addEventListener('click' , (e) => {
        // Verifica se o elemento clicado (ou o mais próximo) tem a classe do botão;
        const button = e.target.closest('.btn-customize')

        if (button) {
            //Obtém o id guardado no atributo data-id;
            const productId = button.dataset.id
            console.log(`Botão Personalizar clicado para o produto: ${productId}`)
        }
})

const productSelect = document.getElementById('product-select')

if (productSelect) {
    productSelect
        .addEventListener('change' , (e) => {
            const selectedProductId = e.target.value
            renderVariantOptions(selectedProductId)
    })
}

//Toogle no select das Equipas, caso o cliente queira outra equipa...
const teamSelect = document.getElementById('team-select')
const customTeamField = document.getElementById('custom-team-field')

teamSelect.addEventListener('change' , (e) => {
    if (e.target.value === 'Outra (Especifique)') {
        customTeamField.style.display = 'block'

    } else {
        customTeamField.style.display = 'none'
    }
})

//FormData no formulário pra ler os dados indseridos nele...
const form = document.getElementById('order-form')

form
    .addEventListener('submit' , (event) => {
        event.preventDefault()

        const dataForm = new FormData(event.target)

        const objectDataForm = Object.fromEntries(dataForm)
        console.log(objectDataForm)
})