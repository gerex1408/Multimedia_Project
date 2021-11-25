let cart= [] //global variable for the shopping cart
let total = 0 //global variable for the total amount of money that cost the cart

//adds to the cart the shoe with the size selected
function addToCart(shoe,size){
    const cartElement = {
        shoe:shoe,
        size:size,
        n:1
    }
    cart.push(cartElement)

    calculateTotal()
    keepInLocalStorage();
    setAmountToNavBar() 

}

//removes an item from the cart
function removeFromCart(id,size){ 

    let elementToRemove = cart.find(e=>e.shoe.id===id && e.size===size)
    let index = cart.indexOf(elementToRemove);
    console.log(index)
    if (index > -1) {
        cart.splice(index, 1);
    }
    calculateTotal();
    keepInLocalStorage();
    setAmountToNavBar();
    renderCart();
}

//Fills the content of the modal alert that pop's up when the clear button is clicked
function fillModalToClear(){
    document.getElementById("confirmModalTitle").innerHTML=`Are you sure you want to clear the cart ?`
    document.getElementById("confirmModalBody").innerHTML=`${cart.length} item/s will be removed...`
    let button = document.getElementById("confirmationButton")
    button.innerHTML=`CLEAR`
    if(button.classList.replace("btn-success","btn-danger")===false)button.classList.add("btn-danger")
}
//Fills the content of the modal alert that pop's up when the Buy button is clicked
function fillModalToBuy(){
    document.getElementById("confirmModalTitle").innerHTML=`Do you want to complete your purchase ?`
    document.getElementById("confirmModalBody").innerHTML=`You will buy ${cart.length} item/s for ${total.toFixed(2)}€`
    let button = document.getElementById("confirmationButton")
    button.innerHTML=`BUY`
    if(button.classList.replace("btn-danger","btn-success")===false)button.classList.add("btn-success")
}
//Deletes all the cart items
function clearCart(){ 
    cart=[];
    window.localStorage.clear();
    calculateTotal();
    setAmountToNavBar();
    renderCart();
}
//it calculates the total amount to pay
function calculateTotal(){
    total = 0;
    for(let i of cart){
        total+=i.shoe.price;
    }
}
//it keeps the cart in the local storage so you can refresh the page and still have your shoes in the cart
function keepInLocalStorage(){
    window.localStorage.setItem('cart',JSON.stringify(cart));
}
//it loads the cart from the local storage
function loadCartFromLocalStorage(){
    if(window.localStorage.getItem('cart')!==null){
        cart = JSON.parse(window.localStorage.getItem('cart'))
    }
}
//it sets the amount of items in the cart and renders it in the navBar
function setAmountToNavBar(){
    let amount = cart.length;
    const DomBadges = document.getElementsByClassName("badge")
    for(let badge of DomBadges){
        badge.innerHTML=amount
    }
}
//it renders the cart items at the cart html page
function renderCart(){
    const cartContent = document.getElementById("cartContainer");
    cartContent.innerHTML=''
    let cartWithoutDuplicateds = []
    for(let element of cart){
        if(cartWithoutDuplicateds.find(e=>e.shoe.id===element.shoe.id && e.size==element.size)===undefined){
            cartWithoutDuplicateds.push(element)
        }
    }
    for(let element of cartWithoutDuplicateds){
        let n=cart.filter(e=>e.shoe.id===element.shoe.id && e.size==element.size).length
        cartContent.innerHTML+=`
        <div class="card">
            <img class="productImage" src="../images/shoes/shoe${element.shoe.id}.jpg" alt="Card image cap">
            <div class="card-body">
                <h3 class="shoeName">${element.shoe.name}</h3>
                <h5><span class="label">Size: </span>${element.size} <span class="label">Amount: </span>${n}  <span class="label">Price: </span>${element.shoe.price}€ ${n>1?`x ${n}`:''}</h5>
            </div>
            <svg id="trash" onclick="removeFromCart(${element.shoe.id},${element.size})" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ff4040" style="margin-right:10px" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <title>Remove Item</title>
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
        </div>
        `
    }
    if(cart.length>0){
        document.getElementById("nItems").innerHTML=`Items: ${cart.length}`
        document.getElementById("totalPrice").innerHTML=`Total: ${total.toFixed(2)}€`
    }
    else{
        document.getElementById('actions').innerHTML=''
        document.getElementById('container').getElementsByTagName("h2")[0].innerHTML=`YOUR CART IS EMPTY`
    }
    
}

//it gets all the info needed to initialize the cart element.
function initializeCart(){
    loadCartFromLocalStorage();
    setAmountToNavBar()
    calculateTotal();
}
