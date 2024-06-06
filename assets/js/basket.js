

// GET DOM ELEMENT WHERE DOM DATA TO COME
let cartItemsEle = document.getElementById("cart-items");


// BASKET COUNT
const basketCount = (items) => {
    let basketCount = document.getElementById("cart-item");
    basketCount.innerHTML = items;
}


// GET DATA FROM LOCAL STORAGE AND APPEND TO DOM 
const callData = () => {
    let getItems = JSON.parse(localStorage.getItem("cart"));

    // CART ITEMS
    const items = JSON.parse(localStorage.getItem("cart"));
    basketCount(items.length);

    // LOOP FOR CART DATA
    getItems.forEach((product) => {

        // CREATE A NEW ELEMENT 
        let div = document.createElement("div");
        div.className = "item";

        // ADD REQUIRED HTML TO NEW ELEMENT
        div.innerHTML = `<div class="img">
                        <img src=${product.image} width="100" alt="">
                    </div>
                    <h5>${product.title}</h5>
                    <div class="d-flex align-items-center qty-wrap">
                    <p>£ ${(product.price * product.qty).toFixed(2)}</p>

                    <div class="btns d-flex align-items-center">
                        <button id="dec">-</button>
                        <p id="item-count">${product.qty}</p>
                        <button id="inc">+</button>
                    </div>

                    <div class="remove-Item">
                        <button id="remove-item">Remove</button>
                    </div>
                </div> `;

        // APP DATA TO DOM
        cartItemsEle.appendChild(div)

        // HANDLE EVENTS
        div.addEventListener("click", (e) => {
            // REMOVE ITEM
            if (e.target.id == "remove-item") {
                removeFromBasket(product.id)
            }

            // INCREMENT QTY
            if (e.target.id == "inc") {
                incQty(product.id);
            }

            // DECREMENT QTY
            if (e.target.id == "dec") {
                decQty(product.id)
            }

        })

    })

}

// CALL DATA
callData();

// INCREMENT QTY
const incQty = (id) => {
    let getItems = JSON.parse(localStorage.getItem("cart"));
    let index = getItems.findIndex((product) => product.id == id);
    if (index >= 0) {
        getItems[index].qty += 1;

        localStorage.setItem("cart", JSON.stringify(getItems));
        callData();
        replaceData()

    }


}

// DECREMENT QTY
const decQty = (id) => {
    let getItems = JSON.parse(localStorage.getItem("cart"));
    let index = getItems.findIndex((product) => product.id == id);
    if (getItems[index].qty > 1) {
        getItems[index].qty -= 1;

        localStorage.setItem("cart", JSON.stringify(getItems));
        callData();
        replaceData()

    }


}


// REMOVE ITEM
const removeFromBasket = (id) => {
    let getItems = JSON.parse(localStorage.getItem("cart"));

    let removeItem = getItems.filter((item) => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(removeItem));

    replaceData()

    // CART ITEMS
    const items = JSON.parse(localStorage.getItem("cart"));
    basketCount(items.length);

}


// REPLACE DOM DATA
const replaceData = () => {
    let getItems = JSON.parse(localStorage.getItem("cart"));
    let cartItemsEle = document.getElementById("cart-items");
    let newDiv = document.createElement("div")
    newDiv.className = "basket-items";
    newDiv.id = "cart-items";

    getItems.forEach((product) => {
        let div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `<div class="img">
                        <img src=${product.image} width="100" alt="">
                    </div>
                    <h5>${product.title}</h5>
                    <div class="d-flex align-items-center qty-wrap">
                    <p>£ ${(product.price * product.qty).toFixed(2)}</p>

                    <div class="btns d-flex align-items-center">
                        <button id="dec">-</button>
                        <p id="item-count">${product.qty}</p>
                        <button id="inc">+</button>
                    </div>

                    <div class="remove-Item">
                        <button id="remove-item">Remove</button>
                    </div>
                </div>`;
        
        // APPEND REPLACE DATA TO DOM
        newDiv.appendChild(div)
        div.addEventListener("click", (e) => {
            if (e.target.id == "remove-item") {
                removeFromBasket(product.id)

            }
            if (e.target.id == "inc") {
                incQty(product.id);
            }

            if (e.target.id == "dec") {
                decQty(product.id)
            }

        })
    })

    // REPLACE DOM ELEMENT WITH NEW DATA
    cartItemsEle.replaceWith(newDiv)
    // CART ITEMS
    const items = JSON.parse(localStorage.getItem("cart"));
    basketCount(items.length);
}


