import indexedDB from './indexedDb.js';
import { successAlert, RemoveAlert,FailAlert } from './date.js';
import DisCartNum from './getCartNum.js';

// Initialize global variables
let CartArr = [];
let WhishListtArr = [];
let FilterCartArr = [];
let userId;
let ProductsArr = [];
let result = [];

// Load initial data
if (localStorage.getItem("Products")) {
    ProductsArr = JSON.parse(localStorage.getItem("Products"));
}

if (sessionStorage.getItem('LogedUser')) {
    userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}

// Initialize IndexedDB data
async function initialize() {
    try {
        const [cartData, whishListData] = await Promise.all([
            indexedDB.getItem('Cart'),
            indexedDB.getItem('WhishList')
        ]);
        
        CartArr = cartData || [];
        WhishListtArr = whishListData || [];
        console.log('Initialized Cart:', CartArr);
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// Create product element HTML
function createElement(product) {
    const discountPercentage = product.Discount > 0 
        ? Math.round((product.Discount / product.real_price) * 100) 
        : 0;

    let isInCart = false;
    let isInWishlist = false;
    
    if (userId) {
        isInCart = CartArr.some(x => 
            x.userId.toString() === userId.toString() && 
            x.ProId.toString() === product.id.toString()
        );
        isInWishlist = WhishListtArr.some(x => 
            x.userId.toString() === userId.toString() && 
            x.ProId.toString() === product.id.toString()
        );
    }

    const cartBtnClass = isInCart ? 'fa-check' : 'fa-plus';
    const wishlistBtnClass = isInWishlist ? 'fa-solid' : 'fa-regular';
    const shortName = product.name.split(" ").slice(0, 2).join(" ");

    return `

 

    <div class="contain-item col-lg-3 col-md-6 pb-2">
        <div class="Product" data-id="${product.id}">
            <div class="pic position-relative">
                <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
                ${discountPercentage > 0 ? `<span class="discount">-${discountPercentage}%</span>` : ''}
                <span class="${wishlistBtnClass} fa-heart position-absolute" data-id="${product.id}"></span>
            </div>
            <div class="disc">
                <h3>${shortName}</h3>
                <div class="rate d-flex align-items-center gap-1">
                    <span class="fa-solid fa-star"></span>
                    <span>${product.ratingsAverage}</span>
                    <span class="simi">(+500)</span>
                </div>
                <div class="price d-flex justify-content-between align-items-center">
                    <div>
                        ${product.EndPrice}
                        ${product.Discount > 0 ? `<span class="text-decoration-line-through afterSale">${product.real_price} Egp</span>` : ''}
                    </div>
                    <button class="btnAddToCart fa-solid ${cartBtnClass}" data-id="${product.id}"></button>
                </div>
            </div>
        </div>
    </div>`;
}

// Display paginated data
function displayData(products, currentPage = 1, itemsPerPage = 8) {
    const container = document.getElementById('filtereddata');
    if (!container) return;

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = products.slice(start, end);

    container.innerHTML = paginatedItems.map(createElement).join('');
}

// Setup pagination buttons
function setupPagination(products, itemsPerPage = 8) {
    const container = document.getElementById('paginationContainer');
    if (!container) return;

    const totalPages = Math.ceil(products.length / itemsPerPage);
    container.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.addEventListener('click', () => {
            displayData(products, i, itemsPerPage);
            setActiveButton(i);
        });
        container.appendChild(btn);
    }

    setActiveButton(1);
}

// Set active pagination button
function setActiveButton(pageNumber) {
    const buttons = document.querySelectorAll('#paginationContainer button');
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.textContent == pageNumber);
    });
}

// Add to cart function
async function addToCart(product, btn) {
    if (!userId) {
      FailAlert("User Login !",'You should login or register first!')
        return;
    }

    try {
        const productCartObj = {
            userId: userId,
            ProId: product.id,
            OrderId: 0,
            id: Math.floor(Math.random() * 1000 * userId + 1),
            name: product.name,
            real_price: product.real_price,
            EndPrice: product.EndPrice,
            imageCover: product.imageCover,
            qty: 1,
            Color: product.Colors[0],
        };

        const exists = CartArr.some(x => x.userId == userId && x.ProId == product.id);

        if (!exists) {
            CartArr.push(productCartObj);
               FilterCartArr=CartArr.filter(item =>item.userId === userId );
           GetNumOfCart(FilterCartArr.length)
            successAlert('Added To Cart', 'Product added to cart successfully.');
        } else {
            CartArr = CartArr.filter(item => !(item.userId === userId && item.ProId === product.id));
              FilterCartArr=CartArr.filter(item =>item.userId === userId );
           GetNumOfCart(FilterCartArr.length)
            RemoveAlert('Removed From Cart', "Product removed successfully");
        }

        FilterCartArr = CartArr.filter(item => item.userId === userId);
        await indexedDB.setItem('Cart', CartArr);
        
        btn.classList.toggle('fa-plus');
        btn.classList.toggle('fa-check');
    } catch (error) {
        console.error('Error in addToCart:', error);
    }
}

// Add to wishlist function
async function addToWhishList(product, btn) {
    if (!userId) {
      FailAlert("User Login !",'You should login or register first!')
        return;
    }

    try {
        const productArrObj = {
            userId: userId,
            ProId: product.id,
            id: Math.floor(Math.random() * 1000 * userId + 1),
            name: product.name,
            real_price: product.real_price,
            EndPrice: product.EndPrice,
            imageCover: product.imageCover,
            Color: product.Colors[0],
        };

        const exists = WhishListtArr.some(x => x.userId == userId && x.ProId == product.id);

        if (!exists) {
            WhishListtArr.push(productArrObj);
            successAlert('Added To Wishlist', 'Product added to wishlist successfully.');
        } else {
            WhishListtArr = WhishListtArr.filter(item => !(item.userId === userId && item.ProId === product.id));
            RemoveAlert('Removed From Wishlist', "Product removed from wishlist successfully");
        }

        await indexedDB.setItem('WhishList', WhishListtArr);
        btn.classList.toggle('fa-regular');
        btn.classList.toggle('fa-solid');
    } catch (error) {
        console.error('Error in addToWhishList:', error);
    }
}






// Event delegation 
document.addEventListener('click', function(e) {
    const productElement = e.target.closest('.Product');
    const heartBtn = e.target.closest('.fa-heart');
    const cartBtn = e.target.closest('.btnAddToCart');

    // Handle cart and wishlist buttons
    if (cartBtn || heartBtn) {
        e.preventDefault();
        e.stopPropagation();

        // Check login status FIRST before anything else
        if (!sessionStorage.getItem('LogedUser') || !userId) {
          FailAlert("User Login !",'You should login or register first!')
            return; // Exit early if not logged in
        }

        const productId = (cartBtn || heartBtn).dataset.id;
        const product = ProductsArr.find(p => p.id === productId);

        if (!product) {
            console.error('Product not found with ID:', productId);
            return;
        }

        if (heartBtn) {
            addToWhishList(product, heartBtn);
        } else if (cartBtn) {
            addToCart(product, cartBtn);
        }
        return;
    }

    // Handle product click for details page
    if (productElement) {
        const id = productElement.dataset.id;
        window.location.href = `./productdetails.html?id=${id}`;
    }
});



(async () => {
    await initialize();
    
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('searchterm')?.toLowerCase() || '';
    
    console.log('Search term:', searchTerm);
    console.log('Products:', ProductsArr);
    
    result = ProductsArr.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm) || 
        product.subcategory.toLowerCase().includes(searchTerm)
    );
    
 if(result.length>0){
   console.log('Filtered results:', result);
    displayData(result, 1, 8);
    setupPagination(result, 8);
 } else {
   let div= document.createElement('div');
   div.innerHTML=`<img src="../imgs/Noorders.png" alt="soldout pic" class="text-center m-auto w-50" />`;
document.getElementById('filtereddata').classList.add('text-center', 'm-auto','w-50' , 'p-5');
document.getElementById('filtereddata').appendChild(div);
 }
 
})();

document.querySelector('.see-all-btn').addEventListener('click', function(){
    window.location.href=`/category.html`;
})
 function GetNumOfCart(num) {
  console.log(num);
  
    DisCartNum(num)

}