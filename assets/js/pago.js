document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Pago realizado con éxito');
    localStorage.removeItem('cart');
    window.location.href = 'productos.html';
});
