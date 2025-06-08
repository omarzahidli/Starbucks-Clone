const bars = document.querySelector('.fa-bars')
const xmark = document.querySelector('.fa-xmark')
const overlay = document.getElementById('overlay')
const sideMenu = document.getElementById('sideMenu')
const accordions = document.querySelector('.accordions')
const date = document.getElementById('date')

getDate()

function getDate() {
    let kod = ''
    let dateYear = new Date()
    kod = `© ${dateYear.getFullYear()} Starbucks Coffee Company. All rights reserved`
    date.innerHTML = kod
}

bars.onclick = function() {    
    overlay.classList.remove('hidden')
    sideMenu.classList.remove('hidden')
    sideMenu.classList.add('flex')
    setTimeout(function(){
        overlay.classList.remove('opacity-0')
        overlay.classList.add('opacity-[100%]')
        sideMenu.classList.remove('translate-x-[100%]')
        sideMenu.classList.add('translate-x-initial')
    }, 0)
}
xmark.onclick = function() {
    overlay.classList.remove('opacity-[100%]')
    overlay.classList.add('opacity-0')
    sideMenu.classList.remove('translate-x-initial')
    sideMenu.classList.add('translate-x-[100%]')
    setTimeout(function() {
        overlay.classList.add('hidden')
        sideMenu.classList.remove('flex')
        sideMenu.classList.add('hidden')
    }, 1000)
}

const accordion = document.getElementsByClassName('accordion')

for (let element of accordion) {
    
    element.onclick = function() { 
        if (this.childNodes[3].classList.contains('rotate-180')) {
            this.nextElementSibling.childNodes[1].classList.toggle('translate-y-[-50px]')
            this.nextElementSibling.childNodes[1].classList.toggle('translate-y-0')
            this.nextElementSibling.childNodes[1].classList.toggle('opacity-0')
            this.nextElementSibling.childNodes[1].classList.toggle('opacity-[100%]')
            setTimeout(() => {
                this.childNodes[3].classList.toggle('rotate-180')
                this.nextElementSibling.classList.toggle('hidden')
            }, 150)
        }
        else {
            this.childNodes[3].classList.toggle('rotate-180')
            this.nextElementSibling.classList.toggle('hidden')
            
            setTimeout(() => {
                this.nextElementSibling.childNodes[1].classList.toggle('translate-y-[-50px]')
                this.nextElementSibling.childNodes[1].classList.toggle('translate-y-0')
                this.nextElementSibling.childNodes[1].classList.toggle('opacity-0')
                this.nextElementSibling.childNodes[1].classList.toggle('opacity-[100%]')
            }, 0)
        }
        
    }
}

let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}