export async function getDentalProducts() {
  let response = await fetch("./dental.json")
  if (response.ok) {
    let myproducts = await response.json();
    if (myproducts) {
      return myproducts
    }
    else {
      console.error("Cannot get response: Server returned no data")
    }
  }
  else {
    console.error("Cannot get response: Server returned " + response.status)
  }
}
