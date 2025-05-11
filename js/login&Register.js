
import { SignUp as authSignUp, login as authLogin } from '../js/auth.js';


const Rusername = document.getElementById('username');
const emailRegister = document.getElementById('emailRegister');
const passwordRegister = document.getElementById('passwordRegister');
const confirmPasswordRegister = document.getElementById('confirmPasswordRegister');
const emailLogin = document.getElementById('emailLogin');
const passwordLogin = document.getElementById('passwordLogin');
const forms = document.querySelectorAll('.needs-validation');
Array.from(forms).forEach((form) => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        confirmPasswordRegister.setCustomValidity('');
        emailRegister.setCustomValidity('');
        
        if (passwordRegister.value !== confirmPasswordRegister.value) {
            confirmPasswordRegister.setCustomValidity('invalid pass');
            form.classList.add('was-validated');
            return;
        }
        
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        
      if (emailLogin.value==='') {
        $('#confirmRegister .fa-spinner').removeClass('d-none'); 
        const signUpSuccess = authSignUp(Rusername.value, emailRegister.value, passwordRegister.value);
        
        if (!signUpSuccess) {    
            $('#confirmRegister .fa-spinner').addClass('d-none');        
            emailRegister.setCustomValidity('vv');
            form.classList.add('was-validated');
        } 
      
      }
      else{

        $('#confirmLogin .fa-spinner').removeClass('d-none'); 
            const LoginSuccess = authLogin( emailLogin.value, passwordLogin.value);

        if (!LoginSuccess) {
            $('#confirmLogin .fa-spinner').addClass('d-none');
         passwordLogin.value='';
         
        }

      }
    });
});

let useradmin=[{
    userId: 1,
    name: "admin",
    img:'../imgs/user.png' ,
    phone:'' ,
    Email: "admin@gmail.com",
  address:'' ,
    role: "admin",
    Password: "3250894Mn"
}]
if(!localStorage.getItem('usersData')){
    localStorage.setItem('usersData',JSON.stringify(useradmin))
}

passwordRegister.addEventListener('input', validatePassword);
confirmPasswordRegister.addEventListener('input', validatePassword);

function validatePassword() {
    if (passwordRegister.value !== confirmPasswordRegister.value) {
        confirmPasswordRegister.setCustomValidity('');
    } else {
        confirmPasswordRegister.setCustomValidity('');
    }
}
  //TODO:toggle signup & loggin
  let signUp = document.querySelector(".signUp");
  let login = document.querySelector(".login");

  let signUupBtn = document.querySelector("#signUupBtn");
  signUupBtn.addEventListener("click", () => {
      signUp.classList.remove("d-none");
      login.classList.add("d-none");
  })
  let loginBtn = document.querySelector("#loginBtn");
  loginBtn.addEventListener("click", () => {
      login.classList.remove("d-none");
      signUp.classList.add("d-none");
  })



