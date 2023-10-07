//cart open close
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//open cart
cartIcon.onclick = () => {
    cart.classList.add("active")
};
//close cart
closeCart.onclick = () => {
    cart.classList.remove("active")
};

//Makind Add to cart
//Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);

}else {
    ready();
}

//Making Function
function ready() {
    //Remove Item From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i< removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    //Quantity Change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i< quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    //Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i< addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

}

//Remove Cart Item
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
  updatetotal();
  saveCartToLocalStorage();
  updateCartIcon ();
}

//Quantity Changed
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <=0) {
        input.value = 1;
    }
   updatetotal();
   saveCartToLocalStorage();
   updateCartIcon ();
}
//Add Cart Function
function addCartClicked(event) {
    var button =event.target;
    var shopProducts=button.parentElement;
    var title =shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
    saveCartToLocalStorage();
    updateCartIcon ();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i=0; i< cartItemsNames.length; i++) {
        if (cartItemsNames[i].textContent.trim() === title.trim()) {
            alert("You already added this item to the cart");
            return;
        }
    }

    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" name="" id="" value="1" class="cart-quantity">
    </div>
    <i class='bx bxs-trash cart-remove'></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
saveCartToLocalStorage();
updateCartIcon ();
}

function addCartClicked(event) {
    const button = event.target;
    const shopProduct = button.parentElement;
    const title = shopProduct.querySelector(".product-title").innerText;
    const price = shopProduct.querySelector(".price").innerText;
    const productImg = shopProduct.querySelector(".product-img").src;
    addProductToCart(title, price, productImg);
   updatetotal();
   saveCartToLocalStorage();
   updateCartIcon ();
}


// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector(".cart-price"); // Using querySelector to find the first element with the class
        var quantityElement = cartBox.querySelector(".cart-quantity"); // Using querySelector to find the first element with the class
        
        // Check if the elements exist
        if (priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace("$", ""));
            var quantity = parseFloat(quantityElement.value);
            total += price * quantity;
        }
    }
    saveCartToLocalStorage();
    

    //If price contains some cents

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

//Keep Item in cart when page refresh with local torage

// Function to save cart items to local storage
function saveCartToLocalStorage() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.querySelector(".cart-product-title");
        var priceElement = cartBox.querySelector(".cart-price");
        var quantityElement = cartBox.querySelector(".cart-quantity");
        var imgElement = cartBox.querySelector(".cart-img"); // Add this line

        if (titleElement && priceElement && quantityElement && imgElement) {
            var title = titleElement.innerText;
            var price = priceElement.innerText;
            var quantity = quantityElement.value;
            var productImg = imgElement.src;

            cartItems.push({
                title: title,
                price: price,
                quantity: quantity,
                productImg: productImg // Add this line
            });
        }
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
// Function to load cart items from local storage
function loadCartFromLocalStorage() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (cartItems) {
        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg, item.quantity);
        }
    }
    updateCartIcon ();
}

// Call the load function when the page loads
window.onload = function() {
    loadCartFromLocalStorage();
    updatetotal(); 
}

function updateCartIcon () {
    var cartBoxes = document.getElementsByClassName("cart-box");
    var quantity = 0;

    for (var i=0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

        // Check if quantityElement is defined and has a value property
        if (quantityElement && quantityElement.value) {
            quantity += parseInt(quantityElement.value);
        }
    }
    var cartIcon = document.querySelector("#cart-icon");
    cartIcon.setAttribute("data-quantity", quantity);
}


//Clear cart items after successfull payment

function clearCart() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    cartContent.innerHTML = "";
    updatetotal();
    localStorage.removeItem("cartItems");
}
