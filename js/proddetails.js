// swiper carousel
import { DeliveryDete ,DateDay } from './date.js'; 
import { addToCartDetails } from './cart.js'; 


// increment and decrement

document.getElementById('DeliveryDateinDetails').innerText=DeliveryDete();
let ProCart;
const icrementbtn = document.querySelector(".br");
const decrementbtn = document.querySelector(".bl");
const quantity = document.querySelector(".quantity");
 const colorPalette = document.getElementById('color-palette');
    const colorTextElement = document.querySelector('.maincolor span.secondcolor');
let counter = document.querySelector(".counter");
let counterval = parseInt(counter.textContent) || 1;
const circs = document.querySelectorAll('.circ');
function updatePrice() {
    const urlparams = new URLSearchParams(window.location.search);
    const id = urlparams.get("id");
    const productsData = localStorage.getItem("Products");
    
    if (id && productsData) {
      const storeddata = JSON.parse(productsData).find(item => item.id == id);
      if (storeddata) {
        document.getElementById('product-price').textContent = (storeddata.EndPrice * counterval) + " EGP";
      }
    }
  }
  icrementbtn.onclick = function () {
    counter.textContent = ++counterval;
    quantity.textContent = counterval;
    updatePrice();
    console.log(counterval);
  };
  decrementbtn.onclick = function () {
    if (counterval > 1) {
      counter.textContent = --counterval;
      quantity.textContent = counterval;
      updatePrice();
      console.log(counterval);
    }
  };
  

  const displayElement = document.querySelector(".sizeee");

      // size
      document.querySelectorAll(".sizee").forEach((element) => {
        element.addEventListener("click", function () {
          const spanElement = element.querySelector("span");

          document.querySelectorAll(".sizee span").forEach((span) => {
            span.classList.add("size");
            span.classList.remove("main");
          });

          spanElement.classList.remove("size");
          spanElement.classList.add("main");

        
          if (displayElement) {
            displayElement.textContent = spanElement.textContent;
            console.log(displayElement.textContent);
            
          }
        });
      });

      // color picking  by delegation
      document.querySelector('.colorpallet').addEventListener('click', function(e) {
  if (e.target.classList.contains('circ')) {
    document.querySelector('.circ.active')?.classList.remove('active');
    e.target.classList.add('active');
  }
});
    
// switch + for accordion to -


  document.querySelectorAll('.accordion-collapse').forEach(function(collapseEl) {
    
    collapseEl.addEventListener('show.bs.collapse', function () {
      const toggleIcon = collapseEl
        .previousElementSibling
        .querySelector('.toggle-icon');
      if (toggleIcon) toggleIcon.textContent = '-';
    });

    collapseEl.addEventListener('hide.bs.collapse', function () {
      const toggleIcon = collapseEl
        .previousElementSibling
        .querySelector('.toggle-icon');
      if (toggleIcon) toggleIcon.textContent = '+';
    });
  });




  // data details display
  document.addEventListener('DOMContentLoaded', function () {
    const urlparams = new URLSearchParams(window.location.search);
    const id = urlparams.get("id");
  
    const productsData = localStorage.getItem("Products");
    if (!id || !productsData) {
      document.getElementById('product-section').innerHTML = '<p class="text-danger">content is not available </p>';
      return;
    }
  
    const storeddata = JSON.parse(productsData).find(item => item.id == id);
ProCart=storeddata;
  
    if (!storeddata) {
      
      document.getElementById('product-section').innerHTML = '<p class="text-danger">element is not availabl in database</p>';
      return;
    }
  
    // right content
    document.getElementById('product-name').textContent = storeddata.name;
    document.getElementById('product-description').textContent = storeddata.description.split('\n')[0];
    document.getElementById('product-full-description').textContent = storeddata.description;
    document.getElementById('product-rating').textContent = storeddata.ratingsAverage;
 
    document.getElementById('product-price').textContent = (storeddata.EndPrice * counterval) + " EGP";

    document.getElementById('product-color').textContent = storeddata.Colors[0];
  
    // left content 
    const mainSliderWrapper = document.getElementById('main-slider-wrapper');
    const thumbnailsWrapper = document.getElementById('thumbnails-wrapper');
    mainSliderWrapper.innerHTML = '';
    thumbnailsWrapper.innerHTML = '';
  
    storeddata.images.forEach(image => {
      const mainSlide = document.createElement('div');
      mainSlide.className = 'swiper-slide';
      mainSlide.innerHTML = `<img src="${image}" class="img-fluid w-100 h-100 object-fit-contain" />`;
      mainSliderWrapper.appendChild(mainSlide);
  
      const thumbSlide = document.createElement('div');
      thumbSlide.className = 'swiper-slide';
      thumbSlide.innerHTML = `<img src="${image}" class="img-fluid" />`;
      thumbnailsWrapper.appendChild(thumbSlide);
    });
  
    // colors
   
    colorPalette.innerHTML = '';
  
    storeddata.Colors.forEach((color, index) => {
      const colorSpan = document.createElement('span');
      colorSpan.className = `circ ${index === 0 ? 'active' : ''}`;
      colorSpan.style.backgroundColor = storeddata.Colorscode[index];
      colorSpan.setAttribute('role', 'button');
      colorSpan.setAttribute('title', color);
  
      colorSpan.addEventListener('click', function () {
        document.querySelectorAll('#color-palette .circ').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        colorTextElement.textContent = color;
      });
  
      colorPalette.appendChild(colorSpan);
    });
  
    if (storeddata.Colors.length > 0) {
      colorTextElement.textContent = storeddata.Colors[0];
    }
  
    const thumbsSwiper = new Swiper(".thumbs-swiper", {
      direction: "vertical",
      slidesPerView: "auto",
      spaceBetween: 20,
      watchSlidesProgress: true,
      freeMode: true,
      mousewheel: true,
      slideToClickedSlide: true,
      breakpoints: {
        992: {
          direction: "vertical",
          slidesPerView: "auto",
          spaceBetween: 20,
        },
      },
    });
  
    const swiper = new Swiper(".main-swiper", {
      slidesPerView: 1.5,
      centeredSlides: false,
      spaceBetween: 1,
      loop: true,
      slideActiveClass: "active-slide",
      thumbs: {
        swiper: thumbsSwiper,
      },
      navigation: {
        nextEl: ".main-next",
        prevEl: ".main-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 1.5,
          spaceBetween: 20,
          centeredSlides: false,
        },
      },
    });
  
  });

  let addToCartBtnDetails=document.getElementById('addToCartBtnDetails');
addToCartBtnDetails.addEventListener('click',async function () {
// sizs displayElement.textContent
// pro ProCart 
// qty Number(counter.textContent)
//colorTextElement.textContent
// console.log(TextElement.textContent);

addToCartDetails(ProCart,colorTextElement.textContent,displayElement.textContent,Number(counter.textContent))



});