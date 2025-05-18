(() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    const BtnReply = document.getElementById('BtnReply');
    Array.from(forms).forEach((form) => {
      BtnReply.addEventListener('click', (event) => {
        form.classList.add('was-validated'); 
      
      });
    });
  })();

// change image from icon
//   document.getElementById("imageUpload").addEventListener("change", function (event) {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       document.getElementById("profileImage").src = e.target.result;
//     };
//     reader.readAsDataURL(file);
//   }
// });
