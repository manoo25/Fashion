import { successAlert, FailAlert } from '../js/date.js';
let usersData=[] 
function PullData() {
    if (localStorage.getItem('usersData')) {
        usersData=JSON.parse(localStorage.getItem('usersData'))
     } 
}

export function SignUp(name, Email, Password) {
    PullData(); 

    const emailExists = usersData.some(user => user.Email === Email);
    
    if (emailExists) {
   
            FailAlert('Email checke',"This Email is Already Exist !!")
    
        return false; 
    }
    
    let Id = Date.now();
    
    let userObj = {
        userId: Id,
        name: name,
        img: '',
        phone: '',
        Email: Email,
        address: '',
        role: "customer",
        Password: Password
    };
    
    usersData.push(userObj);
    sessionStorage.setItem('userRole', userObj.role);
    localStorage.setItem('usersData', JSON.stringify(usersData));
    sessionStorage.setItem('LogedUser', JSON.stringify(userObj));
   successAlert("Success Sign Up","")
   setTimeout(() => {
    window.location.replace('./index.html'); 
   }, 1000);
    return true;
}



 export function login(email, password) {
    PullData();
    const user = usersData.find(user => user.Email === email && user.Password === password);
   
    if (user) {
        sessionStorage.setItem('userRole',(user.role))
        sessionStorage.setItem('LogedUser',(JSON.stringify(user)))
        successAlert('Login Success',"");
      setTimeout(() => {
        checkAuth(user); 
      }, 1000);
       return true;
    } 
    else {
        FailAlert('Login Failed',"");
        return false; 
    }
}

function checkAuth(data) {
    if(data.role=='customer'){
       
        window.location.replace ("./index.html");
       
    }
    else if(data.role=='seller'){
        window.location.replace ("./SellerControl.html");
        
    }
    else if(data.role=='admin'){
        window.location.replace ("./AdminControl.html");
        
    }
}

  export function accessPage(pageRole) {

    document.addEventListener("DOMContentLoaded", function() {
       let role=sessionStorage.getItem('userRole');
if(pageRole!=role){
   

 document.body.innerHTML=`
 <section class="">
    <div class=" d-flex justify-content-center">
        <img style="max-width:280px;" src="../imgs/padlock.png" class="w-50" alt="lock">
    </div>
   <div class="d-flex flex-column align-items-center">
    <h2 class="text-center text-danger">No access</h2>
    <p class="text-center text-danger">You do not have permission to access this page!!</p>
  <a href="./index.html" style="cursor:pointer ;" class="d-flex align-items-center gap-2 headBtn px-3 py-1 text-decoration-none fw-bold  "><span class="fa-solid fa-house"></span> GO to Home</a>
   </div>
 </section>
 `
 }
  document.body.classList.remove('d-none');
    });



 }