var colorFilter
var sizeFilter
var minPrice
var maxPrice
var styleFilter
var brandFilter


function getFiltersValues(){
    colorFilter = document.getElementById("colorSelect").value;
    sizeFilter = document.getElementById("sizeSelect").value;
    minPrice = document.getElementById("priceFrom").value;
    maxPrice = document.getElementById("priceTo").value;
    styleFilter = document.getElementById("styleSelect").value;
    brandFilter = document.getElementById("brandSelect").value;
}

function filterShoes(shoesArr){
    const shoesContainer = document.getElementById("menShoesRow");
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
                                        shoe.brand==='NIKE'?`<img class="logo" src="./images/nike.jpg" alt="logo"></img>`:
                                        shoe.brand==="ADIDAS"?`<img class="logo" src="./images/adidas.jpg" alt="logo"></img>`:
                                        shoe.brand==="PUMA"&&`<img class="logo" src="./images/puma.png" alt="logo"></img>`
                                    }
                                    <h3 class="shoeName">${shoe.name}</h3>
                                </div>
                                <div class="imageDiv">
                                    <img class="shoe" src="./images/shoe${shoe.id}.jpg" alt="shoe image">
                                </div>
                                <div class="size">
                                    <p class="label">Size:</p>
                                    <ul class="sizes">
                                        ${shoe.sizes.map(size => `<li class="sizeNumber">${size}</li>`).join("")}
                                    </ul>
                                </div>
                                <div class="tags">
                                        <button class="cartButton">Add to Cart</button>
                                        <p class="price">${shoe.price}€</p>
                                </div>
                          </div>`
                        }
                    }
                }
            }
        }
    }
    if(nShoes<3){
        if(nShoes===0){
            shoesContainer.innerHTML=`<p>NO SHOES MATCHING THIS FILTER</p>`
        }
        else shoesContainer.style.justifyContent='flex-start'
    }
    else{
        shoesContainer.style.justifyContent='space-between'
    }
}

function menShoesLoad(){
    getFiltersValues()
    filterShoes(menShoes)
}

function clearFilters(){
    for(let element of document.getElementsByClassName("form-control")){
        element.value='';
    }
    getFiltersValues()
    filterShoes(menShoes)
}