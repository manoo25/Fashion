import indexedDB from './indexedDb.js';
import { DeliveryDete ,DateDay } from './date.js'; 
import { successAlert ,RemoveAlert } from './date.js'; 

// Order Sammary 
const totalRealS=document.getElementById('totalReal');
const totalEndPriceS=document.getElementById('totalEndPrice');
const totalDiscountS=document.getElementById('totalDiscount');
const DeliveryDeteP=document.getElementById('DeliveryDete');

// Form Order 

let NotesOrder=document.getElementById('NotesOrder');
let customerPhone=document.getElementById('customerPhone');
let customerAddress=document.getElementById('customer-address');
let customerName=document.getElementById('customer-name');


let userId;
if (sessionStorage.getItem('LogedUser')) {
  userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}
let CartArr=[];
let FilterCartArr=[];
let OrderstArr=[];
let OrdersProtArr=[];
async function initialize() {
  const cartData = await indexedDB.getItem('Cart');
  const OrdersData = await indexedDB.getItem('Orders');
  const OrdersProData = await indexedDB.getItem('OrdersProducts');
  if (cartData) {
   
      CartArr = cartData;
      DisplayCart();


 if (FilterCartArr.length==0) {
        document.getElementById('BodyOfCartPage').classList.remove('d-none')
        document.getElementById('BodyOfCartPage').innerHTML=`
        <section class="">
           <div class=" d-flex justify-content-center">
               <img style="max-width:280px;" src="../imgs/emptyCart.png" class="w-50" alt="lock">
           </div>
          <div class="d-flex flex-column align-items-center">
          
          <a href="../category.html" id="checkout" class="btn w-25 mt-3 p-2 rounded-5" style="display: block; ">
              View Products
              </a>
          </div>
        </section>
       
        `
      }

      if(FilterCartArr.length>0){
        document.getElementById('BodyOfCartPage').classList.remove('d-none');
      }
  }
   if (OrdersData) {
      OrderstArr = OrdersData;
  }
 if (OrdersProData) {
      OrdersProtArr = OrdersProData;  
  }


}
initialize();

let OrderObj={
  name:'',
  address:'',
  phone:'',
  note:'',
  state:'Pending',
  orderId:0,
  seller_id:0,
  userId:userId,
  TotalPrice:0,
  Date:DateDay()
}

   console.log( DeliveryDete());
   console.log( DateDay());
     

const ProductinCarts=document.getElementById('ProductinCarts');

      function DisplayCart() {
      


        ProductinCarts.innerHTML='';
 FilterCartArr=CartArr.filter(item =>item.userId === userId );


document.getElementById('CountIteminCart').innerText=FilterCartArr.length;
// sum total price 
const totalReal = FilterCartArr.reduce((sum, price) => sum + (price.real_price*price.qty), 0);
const totalEndPrice = FilterCartArr.reduce((sum, price) => sum + (price.EndPrice*price.qty), 0);
const totalDiscount = Number(totalReal)-Number(totalEndPrice);
totalRealS.innerText=totalReal;
totalEndPriceS.innerText=totalEndPrice;
totalDiscountS.innerText=totalDiscount;
DeliveryDeteP.innerText=DeliveryDete();
OrderObj.TotalPrice=totalEndPrice;
FilterCartArr.forEach((product,index) => {
   

  ProductinCarts.innerHTML+=`
  <div class="  w-100 pb-3 item  d-flex justify-content-center align-items-center " >

      <div class=" d-flex card-body  border rounded-4 justify-content-between align-items-center w-100 "
        >
        <div class=" d-flex align-items-center ">
          <img src="${product.imageCover}" class="card-img rounded-4  "
            style="height:120px;width:30%;min-width:120px" alt="item1">
          <div class=" container ">
            <div class="flex-column px-2 pt-4 justify-content-center align-items-center position-relative">
              <h3 style="top: -8px;" class="darkBlueText px-2 position-absolute fw-semibold">
              ${product.name.split(" ",2).join(" ")}
              </h3>
              <div class="d-flex mt-1 bg-gradient align-items-center">
                <div class="container gx-0 ">
                    <div class=" d-flex justify-content-between px-2 align-items-center "
                      style="min-width:5rem">

                      <button  type="button"  data-bs-target="#countitem${index}"  data-proId='${product.ProId}' class=" decrement btn bg-light shadow-sm  rounded-3"> <i
                          class="fa-solid fa-minus" style="color: var(--main-color);"></i>
                        </button>

                      <h3 id="countitem${index}" class=" mt-2 px-4">${product.qty}</h3>
                      <button type="button" data-bs-target="#countitem${index}" data-proId='${product.ProId}' class=" increment btn bg-light shadow-sm  rounded-3"> <i
                        class="fa-solid fa-plus"  style="color: var(--main-color);"></i></button>
                    </div>
                </div>
                <div class="px-4  ">
                  <i id="${product.ProId}"  role="button" class="fa-solid fa-trash fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" PosPrice darkBlueText  mt-2">
          <h4 >${product.EndPrice*product.qty}Egp</h4>
        </div>
      </div> <hr>
    </div>
  `
});

 // Increment & Decrement
 $(".increment, .decrement").click(function () {
  const targetId = $(this).data("bs-target");
  const $counter = $(targetId);
  let count = parseInt($counter.text());

  if ($(this).hasClass("increment")) {
    const proId = $(this).attr("data-proId");   
    count++;     
    CartArr.forEach(pro => {
      if (pro.ProId === proId&&pro.userId===userId) {
        pro.qty = count;
        UpdatePro();
      }
    });
 
  } 
  else {
    const proId = $(this).attr("data-proId");   
    count = Math.max(1, count - 1);
    CartArr.forEach(pro => {
      if (pro.ProId === proId&&pro.userId===userId) {
        pro.qty = count;
        UpdatePro();
      }
    });
    
  }


  async function UpdatePro() {
    await indexedDB.setItem('Cart',CartArr);
    
initialize();
   }

  $counter.text(count);
});


  // Delete item (FromCart)
  $(".fa-trash").click(function () {
    initialize(); 
    // console.log(this.id);
    const index = CartArr.findIndex(item => item.userId === userId && item.ProId === this.id);

    if (index !== -1) {
        CartArr.splice(index, 1);
    remove();
      
    }
   async function remove() {
    await indexedDB.setItem('Cart',CartArr);
   initialize();
    RemoveAlert('Remove From CArt',"Product Removed Successfully")
   }
  });


}
DisplayCart();


   // Checkout click
   $("#checkout").click(function () {
    $(".customer-details").removeClass("d-none");
    $(".order-details").addClass("d-none");
    $("#checkout").hide();
    $("#order").show();
  });

  // Review click
  $("#reviwe").click(function () {
    $(".customer-details").addClass("d-none");
    $(".order-details").removeClass("d-none");
    $("#checkout").show();
    $("#order").hide();
  });



function loadProductsFromLocalStorage() {
  const productsData = localStorage.getItem('Products');
  return productsData ? JSON.parse(productsData) : [];
}


function saveProductsToLocalStorage(products) {
  localStorage.setItem('Products', JSON.stringify(products));
}

// Form validation
$('.needs-validation').each(function () {
  $(this).on('submit', function (e) {
    if (!this.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      initialize();
      e.preventDefault();

      const form = $(this); // Store as jQuery object

      $("#congratMsg").removeClass("d-none");
      $("#reviwe").hide();

 
      OrderObj.orderId = Date.now();
      OrderObj.name = customerName.value;
      OrderObj.address = customerAddress.value;
      OrderObj.phone = customerPhone.value;
      OrderObj.note = NotesOrder.value;
      OrderstArr.push(OrderObj);
      FilterCartArr.forEach(pro => {
        pro.OrderId = OrderObj.orderId;
        OrdersProtArr.push(pro);
      });


      const products = loadProductsFromLocalStorage();

      FilterCartArr.forEach(orderedItem => {
        const productIndex = products.findIndex(prod => prod.id === orderedItem.ProId);
        if (productIndex !== -1) {
          products[productIndex].quantity -= orderedItem.qty;
          if (products[productIndex].quantity < 0) {
            products[productIndex].quantity = 0; 
          }
        }
      });
      saveProductsToLocalStorage(products); 

      async function AddOrderDb() {
        const done1 = await indexedDB.setItem('Orders', OrderstArr);
        const done2 = await indexedDB.setItem('OrdersProducts', OrdersProtArr);
        CartArr = CartArr.filter(item => item.userId !== userId);
        const done3 = await indexedDB.setItem('Cart', CartArr);

        if (done1 && done2 && done3) {
          initialize();
        }
      }

      AddOrderDb();


      $('.fa-spinner').removeClass('d-none');
      setTimeout(() => {
        $('.fa-spinner').addClass('d-none');
        successAlert('Conferm Order', 'Order Added Successfully.');
      }, 600);

      setTimeout(() => {
        window.location.replace('../index.html');
      }, 2000);
    }

    $(this).addClass('was-validated');
  });
});



 




    
     
     