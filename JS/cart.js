let cart= []
let total = 0


async function addToCart(shoe,size){
    const cartElement = {
        shoe:shoe,
        size:size,
        n:1
    }
    cart.push(cartElement) //add the shoe element to the cart.

    calculateTotal() //Calculate the total amount of money
    keepInLocalStorage(); //update LocalStorage
    setAmountToNavBar() //update navBar

}

function calculateTotal(){
    total = 0;
    for(let i of cart){
        total+=i.shoe.price;
    }
    console.log(total);
}

function keepInLocalStorage(){
    window.localStorage.setItem('cart',JSON.stringify(cart));
}

function loadCartFromLocalStorage(){
    if(window.localStorage.getItem('cart')!==null){
        cart = JSON.parse(window.localStorage.getItem('cart'))
    }
}

function setAmountToNavBar(){
    let amount = cart.length;
    const DomBadges = document.getElementsByClassName("badge")
    for(let badge of DomBadges){
        badge.innerHTML=amount
    }
}

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
        element.n=cart.filter(e=>e.shoe.id===element.shoe.id && e.size==element.size).length
        cartContent.innerHTML+=`
        <div class="card">
            <img class="productImage" src="../images/shoes/unique${element.shoe.id}.png" alt="Card image cap">
            <div class="card-body">
                <h3 class="shoeName">${element.shoe.name}</h3>
                <h5><span class="label">Size: </span>${element.size} <span class="label">Amount: </span>${element.n}  <span class="label">Price: </span>${element.shoe.price}€ ${element.n>1?`x ${element.n}`:''}</h5>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ff4040" style="margin-right:10px" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
        </div>
        `
    }
    if(cart.length>0){
        document.getElementById("nItems").innerHTML=`Items: ${cart.length}`
        document.getElementById("totalPrice").innerHTML=`Total: ${total}€`
    }
    else{
        document.getElementById('actions').innerHTML=''
        document.getElementById('container').getElementsByTagName("h2")[0].innerHTML=`YOUR CART IS EMPTY`
    }
    
}

function initializeCart(){
    loadCartFromLocalStorage();
    setAmountToNavBar()
    calculateTotal();
}
