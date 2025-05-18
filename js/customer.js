import indexedDB from './indexedDb.js';
import { successAlert, RemoveAlert } from './date.js'; 

let WhishListArr = [];
let FilterWhishListArr = [];
let CartArr = [];
let OrderstArr = [];
let FilterOrderstArr = [];
let OrdersProtArr = [];
var userId;

if (sessionStorage.getItem('LogedUser')) {
    userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}

async function initialize() {
    const WhishlistData = await indexedDB.getItem('WhishList');
    const OrdersData = await indexedDB.getItem('Orders');
    const OrdersProData = await indexedDB.getItem('OrdersProducts');
    const cartData = await indexedDB.getItem('Cart');
    
    if (cartData) {
        CartArr = cartData;
    }
    
    if (WhishlistData) {
        WhishListArr = WhishlistData;
        DisplayWhishlist();
    }
    
    if (OrdersData) {
        OrderstArr = OrdersData;
        DisplayOrders();
        
    }
    
    if (OrdersProData) {
        OrdersProtArr = OrdersProData;  
    }
}

const WhishlistContainer = document.getElementById('WhishlistContainer');
const TableOrdersDis = document.getElementById('TableOrdersDis');



function loadProductsFromLocalStorage() {
  const productsData = localStorage.getItem('Products');
  return productsData ? JSON.parse(productsData) : [];
}


function saveProductsToLocalStorage(products) {
  localStorage.setItem('Products', JSON.stringify(products));
}



// Display Whish list 
function DisplayWhishlist() {
  if (!WhishlistContainer) return;
  
  WhishlistContainer.innerHTML = '';
  FilterWhishListArr = WhishListArr.filter(item => item.userId === userId);

  if (FilterWhishListArr.length === 0) {
      WhishlistContainer.innerHTML = `
          <section class="mt-0 pt-0">
              <div class="d-flex justify-content-center">
                  <img style="max-width:280px;" src="../imgs/EmptyWhish.png" class="w-50" alt="lock">
              </div>
              <div class="d-flex flex-column align-items-center mt-0">
                 
              </div>
          </section>
      `;
      return;
  }

  FilterWhishListArr.forEach((product) => {
      let averageDis = Math.round((product.Discount / product.real_price) * 100);
      let existPro = CartArr.some(x => 
          x.userId.toString() === userId.toString() && 
          x.ProId.toString() === product.ProId.toString()
      );
      
      let existWhishlist = WhishListArr.some(x => 
          x.userId.toString() === userId.toString() && 
          x.ProId.toString() === product.ProId.toString()
      );
      
      let disc = averageDis > 0 ? 'd-block' : 'd-none';
      const buttonClass = existPro ? 'fa-check' : 'fa-plus';
      const WhishListClass = existWhishlist ? 'fa-solid' : 'fa-regular';
      
      WhishlistContainer.innerHTML += `
          <div class="contain-item col-lg-3 col-md-6 pb-2">
              <div class="Product" data-id="${product.ProId}">
                  <div class="pic position-relative">
                      <img class="w-100" src="${product.imageCover}" />
                      <span data-product='${JSON.stringify(product)}' 
                            class="${WhishListClass} fa-heart position-absolute heart-icon"
                            style="top: 10px; right: 10px; font-size: 1.5rem; cursor: pointer; z-index: 10;"></span>
                      <span class="discount ${disc}">-${averageDis}%</span>
                  </div>
                  <div class="disc">
                      <h3>${(product.name).split(' ', 2).join(' ')}</h3>
                      <div class="rate d-flex align-items-center gap-1">
                          <span>${product.ratingsAverage}</span>
                          <span class="simi">(+500)</span>
                      </div>
                      <div class="price d-flex justify-content-between align-items-center">
                          <div>
                              ${product.EndPrice} EGP
                              <span class="text-decoration-line-through afterSale">${product.real_price} EGP</span>
                          </div>
                          <button data-product='${JSON.stringify(product)}' 
                                  class="btnAddToCart fa-solid ${buttonClass}"
                                 
                      </div>
                  </div>
              </div>
          </div>
      `;
  });
}

const OrdersContainer = document.getElementById('tOrdersContainer');

// Display Orders 
function DisplayOrders() {
  if (!OrdersContainer) return;
  
  OrdersContainer.innerHTML = '';
  FilterOrderstArr = OrderstArr.filter(item => item.userId === userId);
  

  if (FilterOrderstArr.length === 0) {

    TableOrdersDis.innerHTML = `
          <section class="mt-0 pt-0">
              <div class="d-flex justify-content-center">
                  <img style="max-width:280px;" src="../imgs/Noorders.png" class="w-50" alt="lock">
              </div>
              <div class="d-flex flex-column align-items-center mt-0">
                  
              </div>
          </section>
      `;
      return;
  }

  FilterOrderstArr.forEach((order) => {
let color;
      switch (order.state) {
        case 'Pending':
             color='bg-warning'
           
            break;
        case 'inProgress':
            color='bg-secondary'
            break;
        case 'Done':
             color='bg-success'
           
            break;
        case 'Cancel':
             color='bg-danger'
           
            break;
     
        
     }
      
    OrdersContainer.innerHTML += `
         <tr>
                            <td>${order.orderId}</td>
                            <td>${order.TotalPrice}</td>
                         
                            <td><span class="badge ${color}">${order.state}</span></td>
                            <td >
                                <div class="d-flex  align-items-center justify-content-center gap-2">
                                  
                                       <button   data-orderId="${order.orderId}"  class="btn btn-sm btn-new btn-new1 ShowDetailsBtn"><i class="fas fa-eye"  ></i></button>
    
                                    <button class="btn btn-sm btn-new btn-new2 delete-btn DEleteOrder" data-orderId="${order.orderId}"><i class="fas fa-trash"></i></button>
                                  </div>
                               
                            </td>
                        </tr>
      `;
  });


}


async function deleteOrder(orderId) {
    try {
        orderId = parseInt(orderId);
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to Delete this Order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            
        });


        if (result.isConfirmed) {

            OrderstArr = OrderstArr.filter(order => parseInt(order.orderId) !== orderId);
            
            if (OrdersProtArr && OrdersProtArr.length) {
                  let  OrdersPlusProtArr = OrdersProtArr.filter(item => parseInt(item.OrderId)== orderId);
             
                OrdersProtArr = OrdersProtArr.filter(item => parseInt(item.OrderId) !== orderId);
          
                
    const products = loadProductsFromLocalStorage();

      OrdersPlusProtArr.forEach(orderedItem => {
        const productIndex = products.findIndex(prod => prod.id === orderedItem.ProId);
        if (productIndex !== -1) {
          products[productIndex].quantity += orderedItem.qty;
          if (products[productIndex].quantity < 0) {
            products[productIndex].quantity = 0; 
          }
        }
      });
      saveProductsToLocalStorage(products);
            }


            await indexedDB.setItem('Orders', OrderstArr);
            if (OrdersProtArr) {
                await indexedDB.setItem('OrdersProducts', OrdersProtArr);
            }


            await initialize();

            await Swal.fire({
                title: "Deleted!",
                text: "Your order has been deleted.",
                icon: "success"
            });
        }
    } catch (error) {
       
        await Swal.fire({
            title: "Error!",
            text: "Failed to delete the order.",
            icon: "error"
        });
    }
}



async function showOrderProducts(orderId) {
    try {
        const orderProducts = OrdersProtArr.filter(item => item.OrderId == orderId);
        
        if (!orderProducts || orderProducts.length === 0) {
         
            return;
        }
        
        const modalBody = document.getElementById('modalProductsBody');
        modalBody.innerHTML = '';
        
        let totalOrderPrice = 0;
        
        orderProducts.forEach((product, index) => {
            const productTotal = product.EndPrice * product.qty;
            totalOrderPrice += productTotal;
            
            modalBody.innerHTML += `
                <tr>
                    <td>
                        <div class="d-flex justify-content-start">
                            <img src="${product.imageCover}" width="60" height="60" class="me-2 rounded">
                        </div>
                    </td>
                    <td>${product.name.split(" ", 2).join(" ")}</td>
                     <td>${product.size}</td>
                    <td>${product.Color}</td>
                    <td>${product.EndPrice} EGP</td>
                    <td>${product.qty}</td>
                    <td>${productTotal.toFixed(2)} EGP</td>
                </tr>`;
        });
        
  
        modalBody.innerHTML += `
            <tr class="table-active">
                <td colspan="6" class="text-end fw-bold">Total:</td>
                <td class="fw-bold">${totalOrderPrice.toFixed(2)} EGP</td>
            </tr>`;
        
        const modal = new bootstrap.Modal(document.getElementById('orderProductsModal'));
        modal.show();
        
    } catch (error) {
       
    }
}












document.addEventListener('click', async function(e) {
    const productElement = e.target.closest('.Product');
    const heartBtn = e.target.closest('.heart-icon, .fa-heart');                          
    const cartBtn = e.target.closest('.btnAddToCart'); 
    
    // معالجة زر القلب (المفضلة)
    if (heartBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!sessionStorage.getItem('LogedUser') || !userId) {
            alert('يجب تسجيل الدخول أو التسجيل أولاً!');
            return;
        }
        await addToWhishList(heartBtn);
        return;
    } 
    

    if (cartBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!sessionStorage.getItem('LogedUser') || !userId) {
           FailAlert("User Login !",'You should login or register first!')
            return;
        }
        await addToCart(cartBtn);
        return;
    }
    

    if (productElement) {
        const id = productElement.dataset.id;
        if (id) {
            window.location.href = `./productdetails.html?id=${id}`;
        }
    }






    if (e.target.closest('.DEleteOrder')) {
        const btn = e.target.closest('.DEleteOrder');
      
        
        const orderId = btn.dataset.orderid;
        console.log(orderId);
        
        deleteOrder(orderId);
    }

    if (e.target.closest('.ShowDetailsBtn')) {
        const btn = e.target.closest('.ShowDetailsBtn');
        const orderId = btn.dataset.orderid;
        showOrderProducts(orderId);
    }







});

async function addToCart(btn) {
    try {
        let pro = JSON.parse(btn.dataset.product);

        let productCartObj = {
            userId: userId,
            ProId: pro.ProId,
            OrderId: 0,
            id: Date.now(),
            name: pro.name,
            real_price: pro.real_price,
            EndPrice: pro.EndPrice,
            imageCover: pro.imageCover,
            qty: 1,
            Color: pro.Color,
        };

        let existPro = CartArr.some(x => x.userId == userId && x.ProId == pro.ProId);

        if (!existPro) {
            CartArr.push(productCartObj);
            successAlert('added To Cart','Product added to cart successfully.')
        } 
        else {
            CartArr = CartArr.filter(item => !(item.userId === userId && item.ProId === pro.ProId));
            RemoveAlert('Remove From CArt',"Product Removed Successfully")
        }
        
        await indexedDB.setItem('Cart', CartArr);
        DisplayWhishlist(); // إعادة تحميل القائمة لتحديث الأيقونات
    } 
    catch (error) {
        console.error('Error in addToCart:', error);
    }
}

async function addToWhishList(btn) {
    try {
        let pro = JSON.parse(btn.dataset.product);
        
        let productArrObj = {
            userId: userId,
            ProId: pro.ProId,
            id: Date.now(),
            name: pro.name,
            real_price: pro.real_price,
            EndPrice: pro.EndPrice,
            Discount: pro.Discount,
            imageCover: pro.imageCover,
            ratingsAverage: pro.ratingsAverage,
            Color: pro.Color,
        };

        let existPro = WhishListArr.some(x => x.userId == userId && x.ProId == pro.ProId);

        if (!existPro) {
            WhishListArr.push(productArrObj);
            successAlert('added To WhishList','Product added to WhishList successfully.')
        } else {
            WhishListArr = WhishListArr.filter(item => !(item.userId === userId && item.ProId === pro.ProId));
            RemoveAlert('Remove From WhishList',"Product Removed From WhishList Successfully")
            
        }
        
        await indexedDB.setItem('WhishList', WhishListArr);
        DisplayWhishlist(); // إعادة تحميل القائمة لتحديث الأيقونات
    } 
    catch (error) {
        console.error('Error in WhishList:', error);
    }
}







// Initialize the application
initialize();