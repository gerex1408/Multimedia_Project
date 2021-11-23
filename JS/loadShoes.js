var colorFilter
var sizeFilter
var minPrice
var maxPrice
var styleFilter
var brandFilter
var shoesArr


function getFiltersValues(){
    colorFilter = document.getElementById("colorSelect").value;
    sizeFilter = document.getElementById("sizeSelect").value;
    minPrice = document.getElementById("priceFrom").value;
    maxPrice = document.getElementById("priceTo").value;
    styleFilter = document.getElementById("styleSelect").value;
    brandFilter = document.getElementById("brandSelect").value;
}

function addToCart(id){
    let size = document.getElementsByClassName("chosen");
    let shoe = shoesArr.find(s=>s.id===id);
    if(size.length===0){
        console.log("error")
        //s'avisa i no s'afegeix al carro
    }
    else{
        size=size[0].value;
        console.log(shoe,size)
        //s'afegira a la bossa la sabata amb aquesta mida
    }
    //afegir al local storage i al carrito.
}

function selectSize(id,size){
    let lis = document.getElementById("sizeList").children
    for(let i of lis){
        i.classList.remove("chosen")
        i.classList.add("selected")
    }
    let li = document.getElementById("id"+id+"size"+size)
    li.classList.remove("selected")
    li.classList.add("chosen")
}

function showModal(id){
    
    let shoe = shoesArr.find(s=>s.id===id);
    document.getElementById("uniqueContent").innerHTML=`
    <div class="center">
        <section class="card" id="cardOne">
            <img id="shoe-target" class="shoes" src="../images/shoes/unique${shoe.id}.png" alt="shoe img" />
        </section>
        <section class="cardTwo">
            <h1 class="shoe-title">${shoe.name}</h1>
            <div class="price-listing">
                <span class="price">${shoe.price}€</span>
            </div>
            <p class="shoe-detail">
                ${shoe.description}
            </p>
            <div class="size">
                <p class="label">Size:</p>
                <ul id="sizeList">
                ${shoe.sizes.map(size => `<li value=${size} class="selected" id="id${shoe.id}size${size}" onclick="selectSize(${shoe.id},${size})">${size}</li>`).join("")}
                </ul>
            </div>
            <div class="size">
                <p class="label">Color:</p>
                <ul>
                    <li>${shoe.color}</li>
                </ul>
            </div>
            <div class="size">
                <p class="label">Style:</p>
                <ul>
                    <li>${shoe.style}</li>
                </ul>
            </div>
            <div class="button-container">
                <button class="primary" data-toggle="modal" data-target=".bd-example-modal-lg" onclick="addToCart(${shoe.id})">Add to Cart</button>
            </div>
        </section>
        </div>
    </div>
    `
    var bouncingShoes = anime({
        targets: '#shoe-target',
        translateY: '15',
        duration: 2000,
        loop: true,
        direction: 'alternate',
        easing: 'linear'
    });
    document.getElementById("shoeModal").style.display="block"
}

function filterShoes(){
    const shoesContainer = document.getElementById("shoesRow");
    shoesContainer.innerHTML=''

    let sizeArr=[]
    if(sizeFilter!==''){
        const minSize = sizeFilter.split('-')[0];
        const maxSize = sizeFilter.split('-')[1];
    
        let diffBetweenSizes = maxSize-minSize;
    
        for(let i=0;i<=diffBetweenSizes;i++){
            sizeArr.push(parseInt(minSize)+i)
        }
    }
    
    let nShoes = 0;
    for(let shoe of shoesArr){
        if(colorFilter===shoe.color || colorFilter===''){
            let hasTheSize=false;
            for(let s of sizeArr){
                if(shoe.sizes.includes(s)){
                    hasTheSize=true;
                    break
                }
            }
            if(hasTheSize||sizeFilter===''){
                if((shoe.price>=minPrice && shoe.price<=maxPrice)||(minPrice==='' && maxPrice==='')){
                    if(styleFilter===shoe.style || styleFilter===''){
                        if(brandFilter===shoe.brand || brandFilter===''){
                            nShoes++;
                            shoesContainer.innerHTML+=`
                            <div class="shoeCard">
                                <div class="mainInfo">
                                    ${
                                        shoe.brand==='NIKE'?`<img class="logo" src="../images/logos/nike.jpg" alt="logo"></img>`:
                                        shoe.brand==="ADIDAS"?`<img class="logo" src="../images/logos/adidas.jpg" alt="logo"></img>`:
                                        shoe.brand==="PUMA"?`<img class="logo" src="../images/logos/puma.png" alt="logo"></img>`:
                                        shoe.brand==="JORDAN"?`<img class="logo" src="../images/logos/jordan.jpg" alt="logo"></img>`:
                                        shoe.brand==="MUNICH"?`<img class="logo" src="../images/logos/munich.jpg" alt="logo"></img>`:
                                        shoe.brand==="CONVERSE"&&`<img class="logo" src="../images/logos/converse.jpg" alt="logo"></img>`
                                    }
                                    <h4 class="shoeName">${shoe.name}</h4>
                                </div>
                                <div class="imageDiv">
                                    <img class="shoe" src="../images/shoes/shoe${shoe.id}.jpg" alt="shoe image" data-toggle="modal" data-target=".bd-example-modal-lg" onclick="showModal(${shoe.id})">
                                </div>
                                <div class="size">
                                    <p class="label">Size:</p>
                                    <ul class="sizes">
                                        ${shoe.sizes.map(size => `<li class="sizeNumber">${size}</li>`).join("")}
                                    </ul>
                                </div>
                                <div class="tags">
                                        <button class="cartButton" data-toggle="modal" data-target=".bd-example-modal-lg" onclick="showModal(${shoe.id})">Add to Cart</button>
                                        <p class="price">${shoe.price}€</p>
                                </div>
                          </div>`
                        }
                    }
                }
            }
        }
    }
    
    if(nShoes===0){
        shoesContainer.innerHTML=`<p>NO SHOES MATCHING THIS FILTER</p>`
    }
}

function menShoesLoad(){
    getFiltersValues()
    shoesArr=menShoes
    filterShoes()
}
function womenShoesLoad(){
    getFiltersValues()
    shoesArr=womenShoes
    filterShoes()
}
function kidsShoesLoad(){
    getFiltersValues()
    shoesArr=kidsShoes
    filterShoes()
}

function clearFilters(shoes){
    for(let element of document.getElementsByClassName("form-control")){
        element.value='';
    }
    getFiltersValues()
    shoesArr=shoes
    filterShoes()
}