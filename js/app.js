
// OPEN - CLOSE CART WINDOW
const cartBtn = document.querySelector(".cart-btn");
const cartWindow = document.querySelector(".cart-window");
const closeCartBtn = document.querySelector(".close-cart-btn");

cartBtn.addEventListener('click', ()=>{
    cartWindow.classList.toggle('cart-open');
    document.querySelector(".overlay").classList.toggle('cart-open');
});

closeCartBtn.addEventListener('click', ()=>{
    cartWindow.classList.toggle('cart-open');
    document.querySelector(".overlay").classList.toggle('cart-open');
});