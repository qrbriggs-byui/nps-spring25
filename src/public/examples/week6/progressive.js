document.getElementById("contact-form").addEventListener("submit", (event) => {
    
    const myform = event.target;
    const name = myform.name.value;
    const email = myform.email.value;
    const message = myform.message.value;
    const emailValidator = /^[\S]+@[\S]+\.[\S]+$/

    let errorMessage = ""

    if (!name){
        errorMessage += "<p>The name is empty</p>"
    }
    if (!email){
        errorMessage += "<p>The email is empty</p>"
    }
    else if (!emailValidator.test(email)){
        errorMessage += "<p>The email format is wrong.</p>"
    }
    if (!message){
        errorMessage += "<p>The message is empty</p>"
    }
    if (errorMessage){
        event.preventDefault();
        document.getElementById("form-error").innerHTML = errorMessage;
    }
})