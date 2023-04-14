// GENERATE SHOP ITEMS
let shop = document.getElementById("product-gallery");
let cartTotalAmountInfo = document.getElementById("cart-total-info");
let shoppingCartList = document.getElementById("cart-items");
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

let generateCartItems = () => {
    if (cartList.length !== 0) {
      return (shoppingCartList.innerHTML = cartList
        .map((x) => {
          let { id, item } = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
          return `
          <div id="product-id-${id}" class="cart-item">
          <div class="cart-item-thumbnail">
              <img src=${search.img} alt="">
          </div>
          <div class="cart-item-info">
              <h3 class="cart-item-title">${search.title} <span class="cart-item-price"><i class="fa-solid fa-tag"></i> $${search.price}</span></h3>
              <div class="cart-item-quantity">
                  <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                  <p id="item-id-${id}">${item}</p>
                  <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
              </div>
              <p class="cart-item-total-price">Subtotal: <span>$${item * search.price}</span></p>
          </div>

          <div onclick="removeItem(${id})" class="cart-item-delete"><i class="fa-solid fa-trash-can"></i></div>

      </div>
        `;
        })
        .join(""));
    } else {
      shoppingCartList.innerHTML = `
      <div class="empty-cart">
        <p>Your Cart is Empty</p>
        <button class="checkout-btn" onclick="closeCart()">Start Shopping</button>
      </div>
      `;
      cartTotalAmountInfo.innerHTML = ``;
    }
  };
  
generateCartItems();
  
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
    generateCartItems();
    update(selectedItem.id);
    updateCartItem(selectedItem.id);
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
    updateCartItem(selectedItem.id);
    cartList = cartList.filter((x) => x.item !== 0);
    localStorage.setItem("shopping-cart", JSON.stringify(cartList));
};

// UPDATE CART ITEMS QUANTITY
let update = (id) => {
    let search = cartList.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

// UPDATE ITEMS LIST

let updateCartItem = (id) => {
    let search = cartList.find((x) => x.id === id);
    document.getElementById("item-id-"+id).innerHTML = search.item;
    updateCartItem(document.getElementById("item-id-"+id));
    calculation();
    TotalAmount();
  };

// SIMPLE CALCULATION FUNCTION
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = cartList.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let removeItem = (id) => {
    let selectedItem = id;
    cartList = cartList.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    generateShop();
    TotalAmount();
    calculation();
    localStorage.setItem("shopping-cart", JSON.stringify(cartList));
};
  
let clearCart = () => {
    cartList = [];
    generateCartItems();
    generateShop();
    calculation();
    closeCart();
    localStorage.setItem("shopping-cart", JSON.stringify(cartList));
};

let TotalAmount = () => {
    if (cartList.length !== 0) {
      let amount = cartList
        .map((x) => {
          let { item, id } = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
  
          return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
      // console.log(amount);
      cartTotalAmountInfo.innerHTML = `
        <p>Total: <span>$${amount}</span></p>
        <button class="checkout-btn"><i class="fa-solid fa-credit-card"></i> Checkout</button>
      `;
    } else return;
  };
  
  TotalAmount();

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

let closeCart = ()=>{
    cartWindow.classList.toggle('cart-open');
    overlay.classList.toggle('cart-open');
}