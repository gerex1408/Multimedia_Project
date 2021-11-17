let colorFilter
let sizeFilter
let minPrice
let maxPrice
let styleFilter
let brandFilter


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
                              <img class="logo" src="https://wallpapercave.com/wp/CgjGnw0.jpg" alt="">
                              <h3 class="shoeName">Nike</h3>
                            </div>
                            <img class="shoe" src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F02%2Fnike-top-10-best-selling-sneakers-list-2019-0-tw.jpg?w=960&cbr=1&q=90&fit=max" alt="">
                              <div class="size">
                                <p class="label">Size:</p>
                                <ul class="sizes">
                                  <li class="sizeNumber">9</li>
                                  <li class="sizeNumber">10</li>
                                  <li class="sizeNumber">10.5</li>
                                  <li class="sizeNumber">11</li>
                                  <li class="sizeNumber">11.5</li>
                                </ul>
                              </div>
                              <div class="tags">
                                <button class="cartButton">Add to Cart</button>
                                <p class="price">200€</p>
                              </div>
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