
    'use strict';
let fname=document.getElementById('firstName');
let lastName=document.getElementById('lastName');
let email=document.getElementById('email');
let phonenumber=document.getElementById('phonenumber');
let message=document.getElementById('message');
let Id;
let comentObj={}

    let CommentsArr=[];
    function pullDAta() {
        if (localStorage.getItem('Comments')) {
        CommentsArr=JSON.parse(localStorage.getItem('Comments')) 
    } 
    else{
        CommentsArr=[];
    }
    }
const SubBtn=document.getElementById('SubBtn');
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach((form) => {
        SubBtn.addEventListener('click', (event) => {
           
        if (form.checkValidity()) {   
            pullDAta();
             SendComment();
            clearTxt();
            form.classList.remove('was-validated');
        }
        else{
             form.classList.add('was-validated'); 
        }
    

 
      });
    });

    function SendComment() {
        if(sessionStorage.getItem('LogedUser')){
            Id=JSON.parse(sessionStorage.getItem('LogedUser')).userId;
            comentObj={
                userId:Id,
                commentId:Date.now(),
                fname:fname.value,
                lastName:lastName.value,
                email:email.value,
                phonenumber:phonenumber.value,
                message:message.value,
                reply:'',
            }
            CommentsArr.push(comentObj);
            localStorage.setItem('Comments',JSON.stringify(CommentsArr))
            Swal.fire({
        icon: 'success',
        title: "Send Message",
        text:"Your Message Send Successfully",
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
        }
        else{
 Swal.fire({
        icon: 'error',
        title: "User Login !",
        text: "You shold To be login !!",
        showConfirmButton: false,
        timer: 1600,
        toast: true,
        position: 'top-end',
        background: 'var(--card-color)',
        color: 'var(--error)', 
        iconColor: 'var(--error)',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content'
        }
      });
        }
    }

    function clearTxt() {
 fname.value="";
 lastName.value="";
 email.value="";
 phonenumber.value="";
 message.value="";
        
    }
    // Fname,Lname,Email,Phone,message,userId