document.addEventListener('DOMContentLoaded', (event) => {
    // Actualizar el conteo del carrito al cargar la página
    updateCartCount();
    renderCartItems();

    // Añadir evento de clic a los botones de "Añadir al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});

function addToCart(event) {
    const button = event.target;
    const product = button.getAttribute('data-product');
    const price = parseFloat(button.getAttribute('data-price'));
    const image = button.getAttribute('data-image');  // Agregar la URL de la imagen

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Buscar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.product === product);

    if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        cart[existingProductIndex].quantity += 1;
        cart[existingProductIndex].totalPrice = cart[existingProductIndex].quantity * cart[existingProductIndex].price;
    } else {
        // Si el producto no está en el carrito, agregarlo
        cart.push({ product, price, quantity: 1, totalPrice: price });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = `Carrito (${cartCount})`;
}

function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsElement = document.getElementById('carrito');

    if (!cartItemsElement) return;

    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.innerHTML = `
            <div class="d-flex">
                <img src="${item.image}" alt="${item.product}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                <span>${item.product} - ${formatCurrency(item.price)} x ${item.quantity} = ${formatCurrency(item.totalPrice)}</span>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.product}')">Eliminar</button>
        `;
        cartItemsElement.appendChild(listItem);
        total += item.totalPrice;
    });

    document.getElementById('total').textContent = formatCurrency(total);
}

function removeFromCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(item => item.product !== product);

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

document.getElementById('boton-vaciar').addEventListener('click', () => {
    localStorage.removeItem('cart');
    updateCartCount();
    renderCartItems();
});

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

