import indexedDB from './indexedDb.js';
import DisCartNum from './getCartNum.js';
import { successAlert ,RemoveAlert,FailAlert } from './date.js'; 




let userId;
if (sessionStorage.getItem('LogedUser')) {
   userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}
let FilterCartArr=[];
let CartArr = [];
let WhishListArr = [];

async function initialize() {
    const cartData = await indexedDB.getItem('Cart');
    if (cartData) {
        CartArr = cartData;
        
    }

 const WhishListDAta = await indexedDB.getItem('WhishList');
    if (WhishListDAta) {
        WhishListArr = WhishListDAta;
    }


    setupEventListeners();
}


function setupEventListeners() {
    document.addEventListener('click', async function(e) {

        // Handle heart buttons
        const heartBtn = e.target.closest('.fa-heart') ;                          
        // Handle add to cart buttons
        const cartBtn = e.target.closest('.btnAddToCart') ; 
                      
                                      
        if (heartBtn) {
            if (!sessionStorage.getItem('LogedUser') || !userId) {
               
                FailAlert("User Login !",'You should login or register first!')
                return;
            }
            await addToWhishList(heartBtn);
        } 
        else if (cartBtn) {
            if (!sessionStorage.getItem('LogedUser') || !userId) {
                FailAlert("User Login !",'You should login or register first!')
                return;
            }
            await addToCart(cartBtn);
        }
    });
 
}

export async function addToCartDetails(pro,color,size,qty) {
    try {


         if (!sessionStorage.getItem('LogedUser') || !userId) {
               
                FailAlert("User Login !",'You should login or register first!')
                return;
            }
       
        
        let productCartObj = {
            userId: userId,
            ProId: pro.id,
            OrderId: 0,
            id: Math.floor(Math.random() * 1000 * (userId) + 1),
            name: pro.name,
            real_price: pro.real_price,
            EndPrice:pro.EndPrice,
            imageCover: pro.imageCover,
            qty: qty,
            Color: color,
            size: size,
        };

        let existPro = CartArr.some(x => x.userId == userId && x.ProId == pro.id);

        if (!existPro) {
            CartArr.push(productCartObj);
            FilterCartArr=CartArr.filter(item =>item.userId === userId );
            GetNumOfCart(FilterCartArr.length)
          successAlert('added To Cart','Product added to cart successfully.')
        } 
        else {
            CartArr = CartArr.filter(item => !(item.userId === userId && item.ProId === pro.id));
            FilterCartArr=CartArr.filter(item =>item.userId === userId );
            GetNumOfCart(FilterCartArr.length);
           RemoveAlert('Remove From CArt',"Product Removed Successfully")
        }
        
        await indexedDB.setItem('Cart', CartArr);

    } 
    catch (error) {
        console.error('Error in addToCart:', error);
    }
}
export async function addToCart(btn) {
    try {
        let pro = JSON.parse(btn.dataset.product);
        
        let productCartObj = {
            userId: userId,
            ProId: pro.id,
            OrderId: 0,
            id: Math.floor(Math.random() * 1000 * (userId) + 1),
            name: pro.name,
            real_price: pro.real_price,
            EndPrice: pro.EndPrice,
            imageCover: pro.imageCover,
            qty: 1,
             size: '',
            Color: pro.Colors[0],
        };

        let existPro = CartArr.some(x => x.userId == userId && x.ProId == pro.id);

        if (!existPro) {
            CartArr.push(productCartObj);
            FilterCartArr=CartArr.filter(item =>item.userId === userId );
            GetNumOfCart(FilterCartArr.length)
          successAlert('added To Cart','Product added to cart successfully.')
        
        } else {
            CartArr = CartArr.filter(item => !(item.userId === userId && item.ProId === pro.id));
            FilterCartArr=CartArr.filter(item =>item.userId === userId );
            GetNumOfCart(FilterCartArr.length);
           RemoveAlert('Remove From CArt',"Product Removed Successfully")
        }
        
        await indexedDB.setItem('Cart', CartArr);
        btn.classList.toggle('fa-plus');
        btn.classList.toggle('fa-check');
    } 
    catch (error) {
        console.error('Error in addToCart:', error);
    }
}
export async function addToWhishList(btn) {
    try {
        let pro = JSON.parse(btn.dataset.product);
        
        let productArrObj = {
            userId: userId,
            ProId: pro.id,
            id: Math.floor(Math.random() * 1000 * (userId) + 1),
            name: pro.name,
            real_price: pro.real_price,
            EndPrice: pro.EndPrice,
            Discount: pro.Discount,
            imageCover: pro.imageCover,
            ratingsAverage: pro.ratingsAverage,
            Color: pro.Colors[0],
        };

        let existPro = WhishListArr.some(x => x.userId == userId && x.ProId == pro.id);

        if (!existPro) {
            WhishListArr.push(productArrObj);
            successAlert('added To WhishList','Product added to WhishList successfully.')
        } else {
            WhishListArr = WhishListArr.filter(item => !(item.userId === userId && item.ProId === pro.id));
            RemoveAlert('Remove From WhishList',"Product Removed From WhishList Successfully")
        }
        
        await indexedDB.setItem('WhishList', WhishListArr);

      btn.classList.toggle('fa-regular');
        btn.classList.toggle('fa-solid');
    } 
    catch (error) {
        console.error('Error in WhishList:', error);
    }
}

 

// Initialize the application
initialize();
 
function GetNumOfCart(num) {

  
    DisCartNum(num)

} 
