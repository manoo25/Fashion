  let UsersArr = [];
  let userId;
 let userObj;
   const urlparams = new URLSearchParams(window.location.search);
  const  productId = urlparams.get("id");
  console.log(productId);
  
  if (sessionStorage.getItem('LogedUser')) {
    userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}
if (localStorage.getItem('usersData')) {
    UsersArr = JSON.parse(localStorage.getItem('usersData'));
    if (userId&&UsersArr) {
        userObj=UsersArr.filter(x=>x.userId===userId)[0];
        
    }
}



  
  document.addEventListener('DOMContentLoaded', function() {
            const stars = document.querySelectorAll('.star');
            const submitBtn = document.getElementById('submit-review');
            const reviewText = document.getElementById('review-text');
            const reviewsList = document.getElementById('reviews-list');
          
            
            let selectedRating = 0;
            
         
            stars.forEach(star => {
                star.addEventListener('click', function() {
                    selectedRating = parseInt(this.getAttribute('data-value'));
                    
                    stars.forEach(s => {
                        s.classList.remove('active');
                        if(parseInt(s.getAttribute('data-value')) <= selectedRating) {
                            s.classList.add('active');
                        }
                    });
                });
                
                star.addEventListener('mouseover', function() {
                    const value = parseInt(this.getAttribute('data-value'));
                    
                    stars.forEach(s => {
                        s.classList.remove('hover');
                        if(parseInt(s.getAttribute('data-value')) <= value) {
                            s.classList.add('hover');
                        }
                    });
                });
                
                star.addEventListener('mouseout', function() {
                    stars.forEach(s => s.classList.remove('hover'));
                });
            });
            
          
            function loadReviews() {
                const reviews = JSON.parse(localStorage.getItem(`product_${productId}_reviews`)) || [];
                reviewsList.innerHTML = '';
                
                if(reviews.length === 0) {
                    reviewsList.innerHTML = '<p>No Reviews Yet !!!!</p>';
                    return;
                }
                
                reviews.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.className = 'review-item';
                    
                    const starsHtml = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                    const date = new Date(review.timestamp).toLocaleString();
                    const username = (review.userName).toLocaleString();
                    const userImg = (review.userImg).toLocaleString();
                    const productId2 = (review.productId).toLocaleString();
                  
                    

                    
                  if(productId2===productId){
                      reviewElement.innerHTML = `

   <span class="text-muted">${date}</span> <br />
                          <span class="stars fs-3">${starsHtml}</span>
                          <div class="icon d-flex align-items-center gap-4">
                         <img  class="prof rounded-circle mb-3" src="${userImg}" alt="">
                          ${username} </span>
                          </div>
                          <p class="my-3">
                            "${review.text}"
                          </p>
                       




                        <div class="review-stars" style="color: gold; font-size: 20px;"></div>
                        <p></p>
                        <small></small>
                    `;
                  }
                  
                    
                    reviewsList.appendChild(reviewElement);
                });
            }
            
       
            submitBtn.addEventListener('click', function() {
       
                
                const review = {
                    rating: selectedRating,
                    text: reviewText.value.trim(),
                    timestamp: new Date().getTime(),
                    userName:userObj.name,
                    userImg:userObj.img,
                    productId:productId
                };
                
               
                const reviews = JSON.parse(localStorage.getItem(`product_${productId}_reviews`)) || [];
                reviews.push(review);
                
               
                localStorage.setItem(`product_${productId}_reviews`, JSON.stringify(reviews));
                
                
                loadReviews();
                
           
                reviewText.value = '';
                stars.forEach(s => s.classList.remove('active'));
                selectedRating = 0;
                
               Swal.fire({
        icon: 'success',
        title: "Customer Review",
        text:"Thanks For Your Review",
        showConfirmButton: false,
        timer: 1600,
        toast: true,
        position: 'top-end',
        position: 'top-end',
        background: 'var(--card-color)', 
        color: 'var(--main-color)',      
        iconColor: 'var(--main-color)',  
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content'
        }
      });
            });
            
       
            loadReviews();
        });