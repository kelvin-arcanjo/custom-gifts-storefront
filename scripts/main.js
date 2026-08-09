import { renderProducts } from "./render.js";

// 1. Renderiza os produtos na página;
renderProducts()

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