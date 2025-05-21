// list of search input
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// عند التركيز على حقل البحث
searchInput.addEventListener("focus", function() {
searchResults.style.display = "block";
});

// عند النقر خارج حقل البحث
document.addEventListener("click", function(event) {
// إذا كان النقر ليس داخل حقل البحث أو نتائج البحث
if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
searchResults.style.display = "none";
}
});

// لمنع إغلاق النتائج عند النقر عليها مباشرة
searchResults.addEventListener("mousedown", function(event) {
event.preventDefault();
});

//disply login&signUp or hide  if user in session storage
function checkLogedUser() {
  
  if (sessionStorage.getItem('LogedUser')) {
    // $('nav ul .authBtn').removeClass('d-none');
    // document.getElementById('logandRegBtn').classList.add('d-none')
    $('.log').addClass('d-none');
    $('.authBtn').removeClass('d-none');
    
  }
  else{
    // $('nav ul .authBtn').addClass('d-none');
    // document.getElementById('logandRegBtn').classList.replace('d-none','d-block')
    $('.log').removeClass('d-none');
    $('.authBtn').addClass('d-none');
  }
};
checkLogedUser();

//remove account
$(document).on('click', '#LogOutandClear, #mobileLogOutandClear', function() {
  sessionStorage.removeItem('LogedUser');
  checkLogedUser();
});

//open control pannel
$(document).on('click', '#ViewCPanelId, #mobileViewCPanelId', function() {
  const role=sessionStorage.getItem('userRole');
  console.log(role);
  
  switch (role) {

    case 'customer':window.location=('./UserControl.html')
      break;

    case 'seller':window.location=('./SellerControl.html')
      break;
    case 'admin':window.location=('./AdminControl.html')
      break;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const vh = window.innerHeight;

  function checkScroll() {
    // إظهار الزر إذا تم التمرير لأكثر من 100vh
    if (window.scrollY > vh) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.pointerEvents = 'auto'; // للسماح بالنقر عليه
    } else {
      scrollToTopBtn.style.opacity = '0.5';
      scrollToTopBtn.style.pointerEvents = 'none'; // منع النقر إذا مخفي
    }
  }

  // وظيفة الرجوع للأعلى
  scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // التحقق من التمرير عند التمرير
  window.addEventListener('scroll', checkScroll);

  // التحقق المبدئي
  checkScroll();
});



// Display Publish comments
const CommentsContainer=document.getElementById('CommentsContainer');
let  PublishCommentsArr=[];
function pullPublishComments() {
    if (localStorage.getItem('PublishComments')) {
        PublishCommentsArr=JSON.parse(localStorage.getItem('PublishComments'))   
    } 
}
pullPublishComments();

function displayPublishComments() {
 
    pullPublishComments();
    PublishCommentsArr.forEach(comment => {


 let image='../imgs/user.png';

let user= JSON.parse(localStorage.getItem('usersData')).filter(x=>x.userId===comment.userId)[0]

if(user.img){
    image=user.img
}

      
        CommentsContainer.innerHTML+=`
    <li class="splide__slide">
 <div class="card testimonial-card">
     <div class="card-body">
    <div class="quote mb-3">
         <i class="bi bi-quote"></i>
    </div>
     <p class="card-text testimonial-feedback">${comment.message}</p>
     <div class="d-flex align-items-center mt-4">
            <img style="width: 45px;height: 45px;" src="${image}" class="rounded-circle me-3" alt="Customer">
        <div>
         <h6 class="mb-0 fw-bold">${comment.fname} ${comment.lastName}</h6>
         <div class="d-flex align-items-center rate">
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
             <span class="simi ms-1">4.0</span>
         </div>
        </div>
     </div>
    </div>
</div>
 </li>
        
        `
    });
}

// mini search
let ProductsArr=JSON.parse(localStorage.getItem('Products'));
let subcategory = ["Dresses", "Jackets", "Tshirts","Shoeses", "Jeans"];
document.querySelector('.suggestedtopics .row').innerHTML=`   <div class="col-5 col-md-5 d-flex align-items-center col-lg-2 ">
                                <li class="bg-light p-2 mx-2">
                                <a href="#" class="text-muted"><span
                                    class="fa-solid fa-magnifying-glass"></span> ${subcategory[1]}</a>
                              </li>
                            </div>
                            <div class="col-5 col-md-5 d-flex align-items-center col-lg-2 ">
                              <li class="bg-light p-2 mx-2">
                                <a href="#" class="text-muted"><span
                                    class="fa-solid fa-magnifying-glass"></span> ${subcategory[2]}</a>
                              </li>
                            </div>
                            <div class="col-5 col-md-5 d-flex align-items-center col-lg-2 ">
                              <li class="bg-light p-2 mx-2">
                                <a href="#" class="text-muted"><span
                                    class="fa-solid fa-magnifying-glass"></span> ${subcategory[4]}</a>
                              </li>
                            </div>
                            <div class="col-5 col-md-5 d-flex align-items-center col-lg-2 ">
                              <li class="bg-light p-2 mx-2">
                                <a href="#" class="text-muted"><span
                                    class="fa-solid fa-magnifying-glass"></span> ${subcategory[0]}</a>
                              </li>
                            </div>
                            <div class="col-5 col-md-5 d-flex align-items-center col-lg-2 ">
                              <li class="bg-light p-2 mx-2">
                                <a href="#" class="text-muted"><span
                                    class="fa-solid fa-magnifying-glass"></span> ${subcategory[3]}</a>
                              </li>
                            </div>`;


        // for suggested topics
document.querySelectorAll('.suggestedtopics a').forEach((a)=>{
a.addEventListener('click', function(e){
e.preventDefault();
let srchterm=encodeURIComponent(this.textContent.trim());
window.location.href=`/srchprod.html?searchterm=${srchterm}`
});
})
        // for carousel
 document.querySelectorAll('.imgcont a').forEach((i)=>{
i.addEventListener('click', function(e){
e.preventDefault();
let type =i.dataset.type;
window.location.href=`/srchprod.html?searchterm=${type}`;
})
 })
        // for real search
        let srchbar = document.querySelector('.search ');
        srchbar.addEventListener('input', function() {
          let query = this.value.trim();
           const containeer = document.getElementById('searchProductsContainer');
          if (query ===""){
            containeer.innerHTML=`
            <div class="col-6 col-md-4 col-lg-3">
                          <div class="card" role="button" data-id="1">
                            <div class="pic">
                              <img src="./imgs/products/MT1.jpg" class="w-100" alt="productpic">
                            </div>
                            <h6 class="prodname">Oversize TShirt</h6>
                            <div class="product-price d-flex">
                              <div class="price">
                                <del class="oldprice"> 800 </del>
                                <p class="newprice d-inline"> 560L.E</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                          <div class="card" role="button" data-id="28">
                            <div class="pic">
                              <img src="./imgs/products/MC12.jpg" class="w-100" alt="productpic">
                            </div>
                            <h6 class="prodname">LIGHTWEIGHT WATER</h6>
                            <div class="product-price d-flex">
                              <div class="price">
                                <del class="oldprice"></del>
                                <p class="newprice d-inline"> 5690 L.E</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                          <div class="card" role="button" data-id="16">
                            <div class="pic">
                              <img src="./imgs/products/KT14.jpg" class="w-100" alt="productpic">
                            </div>
                            <h6 class="prodname">TOWELLING  SWEATSHIRT</h6>
                            <div class="product-price d-flex">
                              <div class="price">
                                <del class="oldprice"> 1190 </del>
                                <p class="newprice d-inline"> 790L.E</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                          <div class="card" role="button" data-id="15">
                            <div class="pic">
                              <img src="./imgs/products/WS12.jpg" class="w-100" alt="productpic">
                            </div>
                            <h6 class="prodname">HIGH HEEL SLINGBACK</h6>
                            <div class="product-price d-flex">
                              <div class="price">
                                <del class="oldprice"></del>
                                <p class="newprice d-inline"> 3890L.E</p>
                              </div>
                            </div>
                          </div>
                        </div>
            `;
            return;
          }
        if(localStorage.getItem('Products'))   {
          let ProductsArr = JSON.parse(localStorage.getItem('Products'));
             }
             const normalize = (str)=>{  return str.toLowerCase().trim();}
            
         let filtereddata= ProductsArr.filter((element)=>{
return normalize(element.name).includes(normalize(query)) || normalize(element.category)===normalize(query) || normalize(element.subcategory)===normalize(query);
          })
         
          if (filtereddata.length>0){
          console.log(filtereddata);
        containeer.innerHTML=``;
        filtereddata.slice(0,8).forEach((obj)=>{
containeer.innerHTML+=`
 <div class="col-6 col-md-4 col-lg-3">
                          <div class="card" role="button" data-id="${obj.id}">
                            <div class="pic border-1">
                              <img src="${obj.imageCover}" class="w-100" alt="${obj.name}">
                            </div>
                            <h6 class="prodname">${obj.name.split(" ").slice(0,2).join(" ")}</h6>
                            <div class="product-price d-flex">
                              <div class="price">
                                <del class="oldprice"> ${obj.real_price} </del>
                                <p class="newprice d-inline"> ${obj.EndPrice}L.E</p>
                              </div>
                            </div>
                          </div>
                        </div>
`
        })
          }else {
 containeer.innerHTML = `
    <div class="w-100 text-center py-4">
      <i class="fa fa-search fa-2x text-muted mb-2"></i>
      <p class="text-muted">No results found for "<strong>${query}</strong>"</p>
    </div>
  `;
          }
      

     
        })

        //  for go to prod details for product from real search

    const container = document.getElementById('searchProductsContainer');
    const StartCollection = document.getElementById('StartCollection');

container.addEventListener('click', function (e) {
  const card = e.target.closest('.card');
 

  if (card && card.dataset.id) {
    let prodid = card.dataset.id;
    window.location.href = `/productdetails.html?id=${prodid}`;
  };
 


});

// StartCollection.addEventListener('click', function (e) {
//   const cardIndex = e.target.closest('.cardHomeTodetais');
//   if (cardIndex && cardIndex.dataset.id) {
//     let prodid = cardIndex.dataset.id;
//     window.location.href = `/srchprod.html?searchterm=${prodid}`;
//   };


// });

$('#StartCollection').click(function (e) {
  const cardIndex = e.target.closest('.cardHomeTodetais');
  if (cardIndex && cardIndex.dataset.id) {
    let prodid = cardIndex.dataset.id;
    window.location.href = `/srchprod.html?searchterm=${prodid}`;
  };


})





// see all product handling 

// document.querySelector('.seeallprod a').addEventListener('click', function(){
//   let query = document.querySelector('.search ').value.trim();
// if(query==="") {
//    window.location.href = '/category.html';
// } else {
  
//   window.location.href =`/srchprod.html?searchterm=${encodeURIComponent(query)}`;
// }
// })


$('.seeallprod a').click(function(){
  let query = document.querySelector('.search ').value.trim();
if(query==="") {
   window.location.href = '/category.html';
} else {
  
  window.location.href =`/srchprod.html?searchterm=${encodeURIComponent(query)}`;
}
})

 