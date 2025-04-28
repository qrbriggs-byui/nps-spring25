let alice = {}

function parseAlice(mystring){
    alice = JSON.parse(mystring)    
}

document.getElementById("go-alice").addEventListener('click', ()=>{
    parseAlice(document.getElementById("og-alice").value)
    alert("Check the console to see the alice object.")
    console.log(parsedObject.name);        // Output: Alice
    console.log(parsedObject.age);         // Output: 30
    console.log(parsedObject.courses[0]);  // Output: Math
    console.log(parsedObject.address.city); // Output: Rexburg    
})

document.getElementById("stringify-alice").addEventListener('click', ()=>{
    alice.awesomenessIndex = document.getElementById("awesomeness").value
    document.getElementById("new-alice").value = JSON.stringify(alice)
    document.getElementById("new-alice").value = JSON.stringify(alice, null, 2)
})
