// API CALL
// let apiUrl = "https://fakestoreapi.com/products";
// GET ELEMENT WHERE DATA TO BE COME
let main = document.getElementById("product-list");




// BASKET COUNT
const basketCount = (items) => {
    let basketCount = document.getElementById("cart-item");
    basketCount.innerHTML = items;
}



// CART ITEMS
const items = JSON.parse(localStorage.getItem("cart"));
if (items) {
    basketCount(items.length);
}else{
    localStorage.setItem("cart", JSON.stringify([]));
}



// APPEND DATA TO DOM
const addDataToHtml = (product) => {
    let div = document.createElement("div", null);
    div.className = "col-lg-3 col-md-4 col-sm-6 px-2 mb-4";
    div.innerHTML = `<div div class="product h-100" >
                            <div class="product-img">
                                <img src=${product.image} width="100%" alt="">
                            </div>
                            <div class="product-text">
                                <h5><a href="#">${(product.title).substr(0, 40)}</a> </h5>
                                <p>£${product.price}</p>
                                <button class="add-cart"  >Add to Cart</button>
                            </div>
                        </div >`
    // APPEND DATA TO HTML
    main.appendChild(div);

    // HANDLE EVENT 
    div.addEventListener("click", (e) => {

        // ADD TO CART EVENT
        if (e.target.className == "add-cart") {
            addToCart(product)
        }
    })

}

// GET DATA FROM JSON 
const getData = async () => {
    // const res = await fetch(apiUrl);


    const data = products; // PRODUCTS COMES ROM data.js FILE
    console.log(data)

    data.forEach((item) => {
        // CALL TO ADD DATA TO HTML
        addDataToHtml(item);
    })

}
// CALL DATA
getData()


// GET DATA FROM LOCAL STORAGE
let cartItem = JSON.parse(localStorage.getItem("cart"));
// SET DATA TO LOCAL STORAGE
const cart = localStorage.setItem("cart", JSON.stringify(cartItem))

// ADD TO CART HANDLE
const addToCart = (product) => {
    // FIND THE INDEX OF PRODUCT IF ITS EXIST
    let isInCart = cartItem.findIndex((value) => value.id == product.id);

    // IF ITEM NOT FOUND | ITS ADD TO CART
    if (cartItem.length <= 0) {
        cartItem = [{ ...product, qty: 1 }];

    } else if (isInCart < 0) { // IF IT NOT IN CART IT ALSO BE ADD
        cartItem.push({ ...product, qty: 1 });
    } else { // IF ITEM ALREADY ADDED TO CART | ITS WILL INCRESAE THE QUANTITY
        cartItem[isInCart].qty = cartItem[isInCart].qty + 1;
    }

    // ADD UPDATED DATA LOCAL STORAGE
    localStorage.setItem("cart", JSON.stringify(cartItem));

    // GET CART LENGTH 
    let iteCount = JSON.parse(localStorage.getItem("cart"));
    basketCount(iteCount.length)

}


