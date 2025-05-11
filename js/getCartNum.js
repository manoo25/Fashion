import indexedDB from './indexedDb.js';

var userId;

if (sessionStorage.getItem('LogedUser')) {
  userId=JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}


async function GetasyncNum() {
      const cartData = await indexedDB.getItem('Cart');
      if (cartData) {
        let cartd=[]
        cartd = cartData;
        console.log(cartData);
      let  FilterCartArr=cartd.filter(item =>item.userId === userId );
      DisCartNum(FilterCartArr.length)
      }
  }
GetasyncNum();

export default function DisCartNum(num) {
  const cartNumElement = document.getElementById('CartNum');
  
  if (num < 1) {
    cartNumElement.classList.add('d-none');
  } else {
    cartNumElement.classList.remove('d-none');
    cartNumElement.innerText = num;
  }
}