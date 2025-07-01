import { getDentalProducts } from "./load-products.js"

async function showCart(cartList, cart){
    cartList.innerHTML = ""
    let products = await getDentalProducts()
    cart.forEach((item) => {
        let product = products.find((p) => p.id == item.id)
        let li = document.createElement("li")
        li.innerHTML = `<img class="product-image" src="${product.imageUrl}" alt="${product.name}"> <span>${product.name}</span><span>$${product.price} x ${item.qty}</span><span>$${product.price * item.qty}</span>`
        cartList.appendChild(li)
    })
}

function createCart(){
    return [
        {id: 101, qty: 2},
        {id: 103, qty: 1}
    ]
}

document.getElementById("dental-form").addEventListener("submit", (event) => {
    let valid = true;    
    let capitalTester = /^[A-Z]\w*$/
    
    let testValue = document.getElementById("first-name").value
    valid = (capitalTester.test(testValue)) && valid    

    testValue = document.getElementById("last-name").value
    valid = (capitalTester.test(testValue)) && valid

    if (!valid){
        event.preventDefault()
        alert("There were validation errors.")
    }
})

let cartList = document.getElementById("cart-list")
let cart = createCart(cartList)
showCart(cartList, cart)
