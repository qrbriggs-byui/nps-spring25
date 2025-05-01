let alice = {}

function parseAlice(mystring){
    alice = JSON.parse(mystring)    
}

document.getElementById("go-alice").addEventListener('click', ()=>{
    parseAlice(document.getElementById("og-alice").value)
    alert("Check the console to see the alice object.")
    console.log(alice.name);        // Output: Alice
    console.log(alice.age);         // Output: 30
    console.log(alice.courses[0]);  // Output: Math
    console.log(alice.address.city); // Output: Rexburg    
})

document.getElementById("stringify-alice").addEventListener('click', ()=>{
    alice.awesomenessIndex = parseInt(document.getElementById("awesomeness").value)
    document.getElementById("new-alice").value = JSON.stringify(alice)
    // document.getElementById("new-alice").value = JSON.stringify(alice, null, 2)
})
