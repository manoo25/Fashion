
    // Initialize variables
    let currentRowToDelete = null;
    
//change image
const imageInput = document.getElementById('imageUpload');
const profileImage = document.getElementById('profileImage');
const Img2Pro = document.getElementById('Img2Pro');
const userName = document.getElementById('userName');
const userName2 = document.getElementById('userName2');
// Get users from localStorage
let users = JSON.parse(localStorage.getItem('usersData'));
var userId;

if (users) { 
    // Get id from session storage
    userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}
    
    // Delete button click handler
    $('.delete-btn').on('click', function() {
        currentRowToDelete = $(this).closest('tr');
        $('#deleteAlert').fadeIn();
        $('.alert-content').css({
            'left': '50%',
          });
    });
    
    // Confirm delete
    $('#confirmDelete').on('click', function() {
        if (currentRowToDelete) {
            currentRowToDelete.fadeOut(10, function() {
                $(this).remove();
            });
        }
        $('#deleteAlert').fadeOut();
        $('.alert-content').css({
            'left': '-50%',
          });
    });
    
    // Cancel delete
    $('#cancelDelete').on('click', function() {
        $('#deleteAlert').fadeOut();
        $('.alert-content').css({
            'left': '-50%',
          });
    });
    
    // Close alert 
    $(document).mouseup(function(e) {
        const alertModal = $("#deleteAlert");
      
            alertModal.fadeOut();
            $('.alert-content').css({
                'left': '-50%',
              });
      
    });
    
    // select target li 
    $('#offcanvasLeft ul li').click(function() {
    $('#offcanvasLeft ul li').removeClass('active');
    $(this).addClass('active');
    
}) 
   function setActive(i) {
    $('#offcanvasLeft ul li').removeClass('active');
    $(`#offcanvasLeft ul li:nth-child(${i})`).addClass('active');
    
} 


function showDataTbl(name) {
    $('.DataTable').addClass('d-none');  
 $(`#${name}`).removeClass('d-none');

}
$('#logoutBtn').click(
function() {
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('LogedUser');
    window.location.replace('./register&login.html')
}
)

// comments 
let adminComments=document.getElementById('adminComments')
let CustomerComments=document.getElementById('CustomerComments')
let CommentsContainerUser=document.getElementById('CommentsContainerUser')
let CommentsContainerAdmin=document.getElementById('CommentsContainerAdmin')
let CommentsArr=[];

let CustomerId
try{
    CustomerId =JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}
catch{};

function pullComments() {
    if (localStorage.getItem('Comments')) {
        CommentsArr=JSON.parse(localStorage.getItem('Comments')) 
      
        
    } 
    else{
        CommentsArr=[];
    }
}
pullComments();



// published Comments 
let PublishedCommentArr=[];

    if (localStorage.getItem('PublishComments')) {
        PublishedCommentArr=JSON.parse(localStorage.getItem('PublishComments'))  
    } 
    else{
        PublishedCommentArr=[];
    }



// display admin comments 
function displayComments() {
    pullComments();



    if (CommentsArr.length === 0) {

        CommentsContainerAdmin.innerHTML = `
              <section class="mt-0 pt-0">
                  <div class="d-flex justify-content-center">
                      <img style="max-width:280px;" src="../imgs/no-message.png" class="w-50" alt="lock">
                  </div>
                  <div class="d-flex flex-column align-items-center mt-0">
                      
                  </div>
              </section>
          `;
          return;
      }






    adminComments.innerHTML=''
    CommentsArr.forEach(comment => {

 let image='../imgs/user.png';

let user= JSON.parse(localStorage.getItem('usersData')).filter(x=>x.userId===comment.userId)[0]

if(user.img){
    image=user.img
}


var ispublish='';
if (PublishedCommentArr.some(x => x.commentId == comment.commentId)) {
    ispublish='checked';
}

        adminComments.innerHTML+=`
         <tr>
    <td>
                      <div class="d-flex align-items-center">
                        <img
                          src="${image}"
                          class="customer-img"
                          alt=""
                        />
                        ${comment.fname}
                      </div>
                    </td>
   <td>${comment.phonenumber}</td>
                                 
   <td>${comment.message}</td>
    <td>
          <label class="switch">
          <input onclick="PublishComment(${comment.commentId})" ${ispublish} type="checkbox" >
         <span class="slider"></span>
        </label></td>
     <td >
       <div class="d-flex  justify-content-center gap-2">
        <button onclick="ReplyComment(${comment.commentId})" class="btn btn-sm btn-new btn-new3 m-1" data-bs-toggle="modal" data-bs-target="#personalInfoModal" ><i class="fas fa-edit"></i></button>
        <button onclick="deleteComment(${comment.commentId},'admin')" class="btn btn-sm btn-new btn-new2 delete-btn m-1"><i class="fas fa-trash"></i></button>
       </div>
                                       
    </td>    </tr>
        
        `
    });
}
// display user admin comments 
function displayCustomerComments() {
    pullComments();
   
    CommentsArr=CommentsArr.filter(x=>x.userId==CustomerId);

    if (CommentsArr.length === 0) {

        CommentsContainerUser.innerHTML = `
              <section class="mt-0 pt-0">
                  <div class="d-flex justify-content-center">
                      <img style="max-width:280px;" src="../imgs/no-message.png" class="w-50" alt="lock">
                  </div>
                  <div class="d-flex flex-column align-items-center mt-0">
                      
                  </div>
              </section>
          `;
          return;
      }


    CustomerComments.innerHTML=''
    CommentsArr.forEach(comment => {
         let Reply=comment.reply;
    if (comment.reply=='') {
        Reply="No Reply"
    }
        CustomerComments.innerHTML+=`
         <tr>
  
                                 
   <td>${comment.message}</td>
   <td>${Reply}</td>

     <td >
      
      <div class="d-flex justify-content-center">
        <button onclick="deleteComment(${comment.commentId},'customer')" class="btn btn-sm btn-new btn-new2 delete-btn m-1"><i class="fas fa-trash"></i></button>
      </div>
                                       
    </td>    </tr>
        
        `
    });
}

async function deleteComment(comId, role) {
    try {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to Delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                popup: 'small-swal', // إذا كنت تريد تصغير حجم الأليرت (اختياري)
            }
        });

        // إذا قام المستخدم بتأكيد الحذف
        if (result.isConfirmed) {
            // حذف التعليق من المصفوفات
            let UpdateComments = CommentsArr.filter(x => x.commentId !== comId);
            CommentsArr = UpdateComments;
            
            // حفظ التغييرات في localStorage
            localStorage.setItem('Comments', JSON.stringify(CommentsArr));
            if (CommentsArr.length === 0) {
                localStorage.removeItem('Comments');
            }

            // حذف التعليق من PublishedCommentArr إذا كان موجودًا
            PublishedCommentArr = PublishedCommentArr.filter(x => x.commentId !== comId);
            localStorage.setItem('PublishComments', JSON.stringify(PublishedCommentArr));

            // عرض التعليقات المحدثة حسب الدور (admin/customer)
            if (role === 'admin') {
                displayComments();
            } else if (role === 'customer') {
                displayCustomerComments();
            }

           
            await Swal.fire({
                title: "Deleted!",
                text: "Your order has been deleted.",
                icon: "success",
                timer:800, 
                showConfirmButton: false
            });
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
        await Swal.fire({
            title: "Error!",
            text: "Failed to delete the order.",
            icon: "error"
        });
    }
}




function PublishComment(comId){
    if (PublishedCommentArr.some(x => x.commentId == comId)) {
     PublishedCommentArr=PublishedCommentArr.filter(x=>x.commentId!=comId)
        localStorage.setItem('PublishComments',JSON.stringify(PublishedCommentArr));
      } 
      else {
        PublishedCommentArr.push(CommentsArr.find(x => x.commentId == comId));
        localStorage.setItem('PublishComments',JSON.stringify(PublishedCommentArr))
        
      }
}



// reply to comments 
let CommReplyID;
    let Reply=document.getElementById('Reply');
    let UserComment=document.getElementById('UserComment');
// Display data to modal 
function ReplyComment(comId) { 
     CommReplyID=comId;
    let index=CommentsArr.findIndex(x=>x.commentId==comId);

    UserComment.value=CommentsArr[index].message;
       Reply.value=CommentsArr[index].reply;   
}

// Save reply

function saveReply(btn) {
    let CommIndex=CommentsArr.findIndex(x=>x.commentId==CommReplyID);
    if (CommIndex !== -1) {
        CommentsArr[CommIndex].reply = Reply.value;
       
if(Reply.value!=''){
   localStorage.setItem('Comments',JSON.stringify(CommentsArr));     
      btn.setAttribute('data-bs-dismiss', 'modal');
        Reply.value="";
      btn.click();
      
}
else{
    btn.removeAttribute('data-bs-dismiss');
}

     displayComments();
      }
}


function displyProfileImg(){
    const user = users.find(user => user.userId === userId);
    if (user) {
       
      

if (user.img) {
      profileImage.src = user.img;
    Img2Pro.src = user.img;
}

        
        userName.innerText = user.name;
        userName2.innerText = user.name;
    }
}
displyProfileImg();
imageInput.addEventListener('change', function () {
    console.log(' updated');
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function () {
            console.log('reader updated');
            profileImage.src = reader.result;
            // Find index of current user in localStorage
            const userIndex = users.findIndex(user => user.userId === userId);
            if (userIndex !== -1) {
        Swal.fire({
        icon: 'success',
        title: "Change Profile Image",
        text:"Profile Image Changed Succesfully",
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
    users[userIndex].img = profileImage.src; // Update image in localStorage
                    localStorage.setItem('usersData', JSON.stringify(users)); // Save back to localStorage
                    console.log( users[userIndex].img);
                    displyProfileImg();


            }
            

        });

        reader.readAsDataURL(file);
    }
});
