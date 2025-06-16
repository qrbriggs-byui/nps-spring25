import { getDentalProducts } from "./load-products.js"

async function showProducts() {
  let myproducts = await getDentalProducts()
  if (myproducts) {
    document.getElementById("product-list").innerHTML = ""
    myproducts.forEach((product) => {
      let productLink = document.createElement("li")
      productLink.innerHTML = `<a href="product-details.html?id=${product.id}">${product.name}</a>`
      document.getElementById("product-list").appendChild(productLink);
    })
    
  }
}

showProducts()
