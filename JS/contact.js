const alert = document.getElementById('sentAlert')
const emailInput = document.getElementById("emailInput")
const messageInput = document.getElementById("floatingTextarea2")

//Simulates a form that sends a message in the contact us page and validates the fields
function sendMessage(){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value) && messageInput.value!==''){
        showCorrectAlert()
    }
    else{
        showIncorrectAlert()
    }
    
}
//displays a correct alert on contact us page
function showCorrectAlert(){
    alert.classList.add("alert-success")
    alert.innerHTML=`Your message has been sent successfuly !`
    alert.style.display='block';
    setTimeout(function(){
        alert.classList.remove("alert-success")
        location.reload()
    },2000) 
}
//displays an incorrect alert on contact us page
function showIncorrectAlert(){
    alert.classList.add("alert-danger")
    alert.innerHTML=`There are some fields that are wrong. Check if the email has the correct format and the message is not empty.`
    alert.style.display='block';
    setTimeout(function(){
        alert.classList.remove("alert-danger")
        location.reload()
    },2000) 
}