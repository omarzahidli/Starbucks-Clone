fetch("https://starbucks-data-nine.vercel.app/menus")
.then(res => res.json())
.then(data => {
    requestMenu(data)
    requestSideMenu(data)
    document.getElementById('loader').style.display = 'none'
    document.getElementById('content').style.display = 'block'
})

window.onload = function () {
    const enke = localStorage.getItem("filterEnke");
    const cat = localStorage.getItem("filterCat");
    if (enke && cat) {
        document.getElementById('content').style.display = 'none'
        document.getElementById('loader').style.display = 'block'
        filterSubCategory(enke, cat);
        localStorage.removeItem("filterEnke");
        localStorage.removeItem("filterCat");
    }
}

const main = document.querySelector('main')
const menuItems = document.getElementById('menuItems')
const subCategories = document.getElementById('subCategories')
const breadcrumb = document.getElementById('breadcrumb')



function requestMenu(data) {
    let kod = ''
    data.forEach(item => {        
        kod += `<div>
                    <h2 id="a${item.id}" class="pb-[1rem]">${item.name}</h2>
                    <hr class="mb-[2rem] w-full border-[1px] border-[rgba(0,0,0,0.1)]" />
                    <div id="${item.id}" class="md:grid md:grid-cols-2"></div>
                </div>`
        menuItems.innerHTML = kod
    })
    data.forEach(item => {
        item.children.forEach(elm => {
            let sod = ''
            sod +=  `<div onclick="filterSubCategory('${item.id}','${elm.id}')" class="flex flex-col justify-center pb-[1.5rem]">
                        <div class="flex items-center">
                            <div class="cursor-pointer mr-3 max-w-[72px] max-h-[72px] md:min-w-[112px] md:min-h-[112px] overflow-hidden rounded-[50%]">
                                <img class="scale-[2.2] w-[100%] h-[100%]" src="${elm.categoryImageURL}" alt="" />
                            </div>
                            <h3 class="text-wrap cursor-pointer">${elm.name}</h3>
                        </div>
                    </div>`
            let menuSub = document.getElementById(`${item.id}`) 
            menuSub.innerHTML += sod 
        })
    })
}

function requestSideMenu(data) {
    let mod = ''
    data.forEach(item => {        
        mod +=  `
                <ul>
                    <li class="mt-4">
                    <a href="#a${item.id}" class="text-[20px]">${item.name}</a>
                    <ul id="sub${item.id}">
                    </ul>
                    </li>
                </ul>
                `
        subCategories.innerHTML = mod
    })
    data.forEach(item => {
        item.children.forEach(elm => {
            let kod = ''
            kod +=  `
                    <li onclick="filterSubCategory('${item.id}','${elm.id}')" class="cursor-pointer text-[#00000094] my-3">${elm.name}</li>
                    `       
            let menuSubCat = document.getElementById(`sub${item.id}`) 
            menuSubCat.innerHTML += kod
        })
    })
}

function filterSubCategory(name, id) {
    console.log(name, id);
    
    document.getElementById('loader').style.display = 'flex'
    document.getElementById('content').style.display = 'none'
    let selectedSubCategory = ''
    fetch("https://starbucks-data-nine.vercel.app/menus")
    .then(res => res.json())
    .then(data => {
        selectedSubCategory = data.find(item => item.id == `${name}`).children.find(item => item.id == `${id}`)
        requestSubMenu(selectedSubCategory)
        requestSubSideMenu(selectedSubCategory)
        document.getElementById('loader').style.display = 'none'
        document.getElementById('content').style.display = 'block'
    })
    .catch(() => {
        console.log(selectedSubCategory);
        document.getElementById('loader').style.display = 'none'
        document.getElementById('content').style.display = 'block'
        alert('No Such A Product!')
    })
    let kod = ''
    kod = `<a class="text-[#00000094]" href="/menu.htm">Menu</a> / <span class="text-[#00000094] capitalize">${id}</span>`
    breadcrumb.nextElementSibling.classList.toggle('hidden')
    breadcrumb.classList.toggle('hidden')
    breadcrumb.innerHTML = kod
}

function requestSubMenu(data) {
    console.log(data);
    
    let kod = ''
    if (data.children.length) {
        data.children.forEach(item => {        
            kod += `<div>
                        <h2 id="a${item.id}" class="pb-[1rem]">${item.name}</h2>
                        <hr class="mb-[2rem] border-[1px] border-[rgba(0,0,0,0.1)]" />
                        <div id="${item.id}" class="md:grid md:grid-cols-2"></div>
                    </div>`
            menuItems.innerHTML = kod
        })
    
        data.children.forEach(item => {
            item.products.forEach(elm => {
                let sod = ''
                sod +=  `<a href="product.htm?cat=${data.id}&subCat=${item.id}&id=${elm.productNumber}" class="flex flex-col justify-center pb-[1.5rem]">
                            <div class="flex items-center ">
                                <div class="cursor-pointer mr-3 max-w-[72px] max-h-[72px] md:min-w-[112px] md:min-h-[112px] overflow-hidden rounded-[50%]">
                                    <img class="scale-[2.2] w-[100%] h-[100%]" src="${elm.imageURL}" alt="" />
                                </div>
                                <h3 class="text-wrap cursor-pointer">${elm.name}</h3>
                            </div>
                        </a>`
                let menuSub = document.getElementById(`${item.id}`) 
                menuSub.innerHTML += sod 
            })
        })
    }
    else {
        data.products.forEach(item => {    
            kod += `<div>
                        <h2 id="a${item.name.replace(/\s+/g, '').toLowerCase()}" class="pb-[1rem]">${item.name}</h2>
                        <hr class="mb-[2rem] border-[1px] border-[rgba(0,0,0,0.1)]" />
                        <div id="${item.name.replace(/\s+/g, '').toLowerCase()}" class="md:grid md:grid-cols-2"></div>
                    </div>`
            menuItems.innerHTML = kod
        })        
        data.products.forEach(item => {
            console.log(item);
            
            let sod = ''
            sod +=  `<a href="product.htm?cat=${data.id}&id=${item.productNumber}" class="flex flex-col justify-center pb-[1.5rem]">
                        <div class="flex items-center">
                            <div class="cursor-pointer mr-3 max-w-[72px] max-h-[72px] md:min-w-[112px] md:min-h-[112px] overflow-hidden rounded-[50%]">
                                <img class="scale-[2.2] w-[100%] h-[100%]" src="${item.imageURL}" alt="" />
                            </div>
                            <h3 class="text-wrap cursor-pointer">${item.name}</h3>
                        </div>
                    </a>`
            let menuSub = document.getElementById(`${item.name.replace(/\s+/g, '').toLowerCase()}`) 
            menuSub.innerHTML += sod 
        })
    }
    topFunction()
}


function requestSubSideMenu(data) {
    if (data.children.length) {
        let mod = ''
        data.children.forEach(item => {        
            mod +=  `
                    <ul>
                        <li class="mt-4">
                        <a href="#a${item.id}" class="text-[20px]">${item.name}</a>
                        <ul id="sub${item.id}">
                        </ul>
                        </li>
                    </ul>
                    `
            subCategories.innerHTML = mod
        })
        data.children.forEach(item => {
            item.products.forEach(elm => {
                let kod = ''
                kod +=  `
                        <li><a class="cursor-pointer text-[#00000094] my-3" href="product.htm?cat=${data.id}&subCat=${item.id}&id=${elm.productNumber}">${elm.name}</a></li>
                        `       
                let menuSubCat = document.getElementById(`sub${item.id}`) 
                menuSubCat.innerHTML += kod
            })
        })
    }
    else {
        let mod = ''
        data.products.forEach(item => {        
            mod +=  `
                    <ul>
                        <li class="mt-4">
                        <a href="#a${item.name.replace(/\s+/g, '').toLowerCase()}" class="text-[20px]">${item.name}</a>
                        <ul id="sub${item.name.replace(/\s+/g, '').toLowerCase()}">
                        </ul>
                        </li>
                    </ul>
                    `
            subCategories.innerHTML = mod
        })
        data.products.forEach(item =>{
            let kod = ''
            kod +=  `
                    <li class="cursor-pointer text-[#00000094] my-3" href="product.htm?cat=${data.id}&id=${item.productNumber}">${item.name}</li>
                    `       
            let menuSubCat = document.getElementById(`sub${item.name.replace(/\s+/g, '').toLowerCase()}`) 
            menuSubCat.innerHTML += kod
        })
    }
}
const counter = document.getElementById('counter')
if (localStorage.getItem('cart')) {
    counter.innerHTML = JSON.parse(localStorage.getItem('cart')).length
}
