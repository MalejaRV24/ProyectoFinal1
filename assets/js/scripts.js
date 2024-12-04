document.addEventListener('DOMContentLoaded', (event) => {
    // Actualizar el conteo del carrito al cargar la página
    updateCartCount();

    // Añadir evento de clic a los botones de "Añadir al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});

function addToCart(event) {
    const button = event.target;
    const product = button.getAttribute('data-product');
    const price = button.getAttribute('data-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({ product, price });
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
    document.getElementById('cart-count').textContent = `Carrito (${cartCount})`;
}

