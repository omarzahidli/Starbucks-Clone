fetch("https://starbucks-data-nine.vercel.app/menus")
.then(res => res.json())
.then(data => {
    findFilteredProduct(data)
    document.getElementById('loader').style.display = 'none'
    document.getElementById('content').style.display = 'block'
})
const params = new URLSearchParams(location.search)
const cat = params.get('cat')
const id = params.get('id')

const subCat = params.get('subCat')

function findFilteredProduct(data) { 
    if (subCat) {
        let filteredProduct = ''
        for (const category of data) {
            for (const subcategory of category.children ) {
                if (subcategory.id == cat) {
                    for (const subSubcategory of subcategory.children) {
                        if(subSubcategory.id == subCat) {
                            for (const product of subSubcategory.products) {
                                if(product.productNumber == id) {
                                    filteredProduct = product
                                }
                                
                            }
                            
                        }
                        
                    }
                    
                }
            }                   
        }
        requestProduct(filteredProduct)
        const addCart = document.getElementById('addCart')
        addCart.onclick = () => addToCart(filteredProduct)
    }
    else  {
        let filteredProduct = ''
        for (const category of data) {
            for (const subcategory of category.children ) {
                if (subcategory.id == cat) {
                    console.log(subcategory);
                    for (const subSubcategory of subcategory.products) {
                        console.log(subSubcategory);
                        if(subSubcategory.productNumber == id) {
                            filteredProduct = subSubcategory
                        }
                    }
                }
            }                   
        }
        requestProduct(filteredProduct)
        const addCart = document.getElementById('addCart')
        addCart.onclick = () => addToCart(filteredProduct)
    }
}
const counter = document.getElementById('counter')
if (localStorage.getItem('cart')) {
    counter.innerHTML = JSON.parse(localStorage.getItem('cart')).length
}
function addToCart(filteredProduct) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...filteredProduct, count: 1, selectedSize: sizes.value });
    localStorage.setItem("cart", JSON.stringify(cart));
    counter.innerHTML = JSON.parse(localStorage.getItem('cart')).length
}


const breadcrumb = document.getElementById('breadcrumb')
const productName = document.getElementById('productName')
const productImg = document.getElementById('prodImg')
const calory = document.getElementById('calory')
const about = document.getElementById('about')
const fat = document.getElementById('fat')
const productDetails = document.getElementById('productDetails')
const stars = document.getElementById('stars')
const sizes = document.getElementById('sizes')


function requestProduct(filteredProduct) {    
    let name = `${filteredProduct.name}`
    let photo = filteredProduct.imageURL
    let enke = filteredProduct.productType == 'Beverage' ? 'drinks' :  filteredProduct.productType == 'Food' ? 'food' : 'at-home-coffee'
    breadcrumb.innerHTML = `<a href="menu.htm">Menu</a> / <span onclick="goToFilterPage('${enke}', '${cat}')" class="cursor-pointer capitalize">${cat}</span> / <span class="text-black">${name}</span>`
    productName.innerHTML = name
    productDetails.innerHTML = name
    productImg.src = photo
    productImg.alt = name
    if (filteredProduct.productType == 'Beverage' || filteredProduct.productType == 'Food') { 
        calory.innerHTML = `${rnd(0, 201)} calories 🛈`
        fat.innerHTML = `${rnd(0,201)} calories, ${rnd(0,10)}g sugar, ${rnd(0,10)}g fat`
    }
    let searchQuery = 'Starbucks full nutrition and ingredients of ' + name
    let googleSearchLink = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchQuery)}`;
    about.href = googleSearchLink
    about.target = '_blank'
    stars.innerHTML = `${rnd(0,100)% 100 * 10} ★ item`
    if (filteredProduct.sizes) {
        let kod = ''
        filteredProduct.sizes.forEach(elm => {
            kod += `<option value="${elm.sizeCode}">${elm.sizeCode}</option>`   
        })
        sizes.innerHTML = kod
    }
}


function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function goToFilterPage(enke, cat) {
    localStorage.setItem("filterEnke", enke);
    localStorage.setItem("filterCat", cat);
    window.location.href = "menu.htm";
}

