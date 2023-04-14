// GENERATE SHOP ITEMS
let shop = document.getElementById("product-gallery");
let cartList = JSON.parse(localStorage.getItem("shopping-cart")) || [];


let generateShop = () => {
    return (shop.innerHTML = shopItemsData
      .map((x) => {
        let { id, title, price, desc, img } = x;
        let search = cartList.find((x) => x.id === id) || [];
        return `
        <div id="product-id-${id}" class="product-card">
            <div class="product-image"><img src=${img} alt=${title}></div>
            <h3 class="product-title">${title}</h3>
            <p class="product-price"><i class="fa-solid fa-tag"></i> ${price}</p>
            <div class="product-item-quantity">
                <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                <p id="${id}" >${search.item === undefined ? 0 : search.item}</p>
                <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
            </div>
            <button onclick="increment(${id})" class="btn" id="add-to-cart-btn-${id}"><i class="fa-solid fa-plus"></i> Add to Cart</button>
        </div>
        `;
      })
      .join(""));
  };
  
generateShop();
  
// FUNCTION TO INCREASE ITEM QUANTITY IN THE CART

let increment = (id) => {
    let selectedItem = id;
    let search = cartList.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) {
        cartList.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
  
    // UPDATE LOCAL STORAGE
    update(selectedItem.id);
    localStorage.setItem("shopping-cart", JSON.stringify(cartList));
};

// FUNCTION TO DECREASE ITEM QUANTITY IN THE CART
let decrement = (id) => {
    let selectedItem = id;
    let search = cartList.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }

    // UPDATE LOCAL STORAGE
    update(selectedItem.id);
    cartList = cartList.filter((x) => x.item !== 0);
    localStorage.setItem("shopping-cart", JSON.stringify(cartList));
};

// UPDATE CART ITEMS QUANTITY
let update = (id) => {
    let search = cartList.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

// SIMPLE CALCULATION FUNCTION
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = cartList.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

// OPEN & CLOSE CART WINDOW
const cartBtn = document.querySelector(".cart-btn");
const cartWindow = document.querySelector(".cart-window");
const closeCartBtn = document.querySelector(".close-cart-btn");
const overlay = document.querySelector(".overlay");

cartBtn.addEventListener('click', ()=>{
    cartWindow.classList.toggle('cart-open');
    overlay.classList.toggle('cart-open');
});

closeCartBtn.addEventListener('click', ()=>{
    cartWindow.classList.toggle('cart-open');
    overlay.classList.toggle('cart-open');
});

overlay.addEventListener('click', ()=>{
    cartWindow.classList.toggle('cart-open');
    overlay.classList.toggle('cart-open');
});