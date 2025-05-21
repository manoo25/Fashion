//change image
const imageInput = document.getElementById('imageUpload');
const profileImage = document.getElementById('profileImage');
// Get users from localStorage
let users = JSON.parse(localStorage.getItem('usersData'));
var userId;

$('#userName').text(JSON.parse(sessionStorage.getItem('LogedUser')).name);

// Initialize all variables at the top
let productsArr =[] ;
let productsArr2=[];
if (localStorage.getItem('Products')) {
   productsArr = JSON.parse(localStorage.getItem('Products'));
}
let productColors = [];
let images = [];
let productImgSrc = '';
let currentEditIndex = -1;
let userName = sessionStorage.getItem('LogedUser')
  ? JSON.parse(sessionStorage.getItem('LogedUser')).name
  : '';
// Set user name               
$("#adminuserName").val(userName);

if (users) {
  // Get id from session storage
  userId = JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}

function displyProfileImg() {
  const user = users.find(user => user.userId === userId);
  if (user) {
   if (user.img) {
      profileImage.src = user.img;
   }
  
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
          console.log(users[userIndex].img);
          displyProfileImg();
      

      }


    });

    reader.readAsDataURL(file);
  }
});


// Apply styles to color swatches
$(document).ready(function () {
  $(".colored").css({
    border: "2px solid black",
    width: "30px",
    height: "30px",
    margin: "5px",
    cursor: "pointer",
    "border-radius": "50%"
  });

  // Set background colors
  $(".colored").each(function (index) {
    var colors = ["white", "red", "blue", "black"];
    $(this).css("background-color", colors[index]);
  });


  // Handle color selection
  $(".colored").click(function () {
    const value = $(this).css("background-color");
    let colorName = "";
    switch (value) {
      case "rgb(255, 255, 255)":
        colorName = "White";
        break;
      case "rgb(255, 0, 0)":
        colorName = "Red";
        break;
      case "rgb(0, 0, 255)":
        colorName = "Blue";
        break;
      case "rgb(0, 0, 0)":
        colorName = "Black";
        break;
      default:
        colorName = "";
    }
    const colorIndex = productColors.indexOf(colorName);

    if (colorIndex === -1) {
      productColors.push(colorName);
    } else {
      productColors.splice(colorIndex, 1);
    }

    $("#productColor").val(productColors.join(", "));

  });

  // Update the range value
  $('#ratingAverage').on('input', function () {
    $('#rangeValue').text(this.value);
  });

  // Read and display the main image
  $('#productImageCover').on('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        productImgSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Read multiple images
  $('#imageInput').on('change', function () {
    images = []; // Reset images array
    const files = this.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = function (e) {
        images.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  });

  // Add product event
  $('#addProductBtn').on('click', function () {
    if ($('#productName').val() && $('#realPrice').val() && $('#productCategory').val() && $('#productDescription').val() && $('#productSubCategory').val() && $('#ratingAverage').val() && $('#productQuantity').val()) {
      if (currentEditIndex === -1) {
        addProduct();
      } else {
        updateProduct();
      }
    } else {
       FailAlert("Requierd !",'Please fill out all required fields.')
        Swal.fire({
        icon: 'error',
        title: "Requierd !",
        text: 'Please fill out all required fields.',
        showConfirmButton: false,
        timer: 1600,
        toast: true,
        position: 'top-end',
        background: 'var(--card-color)',
        color: 'var(--error)', // أو خليه main-color لو حابب يكون نفس الثيم
        iconColor: 'var(--error)',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content'
        }
      });
     
    }
  });

  // Initialize display
  displayProduct();
});

function addProduct() {
  const product = {
    id: `${Date.now()}`,
    name: $('#productName').val(),
    real_price: Number($('#realPrice').val()),
    Discount: Number($('#productDiscount').val()),
    EndPrice: calculateEndPrice(),
    category: $('#productCategory').val(),
    description: $('#productDescription').val(),
    imageCover: productImgSrc,
    images: images,
    subcategory: $('#productSubCategory').val(),
    ratingsAverage: $('#ratingAverage').val(),
    seller_id:userId,
    sellerName: userName,
    quantity: Number($('#productQuantity').val()),
    Colors: productColors,
     size: 'oneSize',
    Colorscode: productColors,
  };
  productsArr.push(product);
  
localStorage.setItem("Products",JSON.stringify(productsArr));
  displayProduct();
  resetForm();
  $('#personalInfoModal').modal('hide');

Swal.fire({
        icon: 'success',
        title: "Add Product",
        text:"Product added Succesfully",
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

function updateProduct() {
 const Proid= productsArr2[currentEditIndex].id;
  const index=productsArr.findIndex(x=>x.id===Proid) 
  productsArr[index] = {
    id: productsArr[index].id,
    name: $('#productName').val(),
    real_price: Number($('#realPrice').val()),
    Discount: $('#productDiscount').val(),
    EndPrice: calculateEndPrice(),
    category: $('#productCategory').val(),
    description: $('#productDescription').val(),
    imageCover: productImgSrc || productsArr[index].imageCover,
    images: images.length > 0 ? images : productsArr[index].images,
    subcategory: $('#productSubCategory').val(),
    ratingsAverage: $('#ratingAverage').val(),
    sellerName: userName,
    seller_id: userId,
    quantity: $('#productQuantity').val(),
    Colors: productColors,
     size: 'oneSize',
    Colorscode: productColors,
  };

  saveToLocalStorage();
  displayProduct();
  resetForm();
  currentEditIndex = -1;
  $('#personalInfoModal').modal('hide');

Swal.fire({
        icon: 'success',
        title: "Update Product",
        text:"Product Updated Succesfully",
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

function displayProduct() {
  const tableBody = $("#ordersTable tbody");
  tableBody.empty();
 productsArr2=productsArr.filter(x=>x.seller_id==userId);
  productsArr2.forEach((product, i) => {
    tableBody.append(`
      <tr>
        <td><img src="${product.imageCover}" alt="product" style="width: 50px;" /></td>
        <td>${product.name.split(" ", 2).join(" ")}</td>
        <td>${product.category}</td>
        <td>${product.subcategory}</td>
        <td>${product.quantity}</td>
        <td>${product.EndPrice}</td>
        <td>
         <div class="d-flex gap-2 justify-content-center">
          <a href="./productdetails.html?id=${product.id}" class="btn btn-sm btn-new btn-new1 m-1"><i class="fas fa-eye" ></i></a>
          <button class="btn btn-sm btn-new btn-new3" onclick="editProduct(${i})"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-new btn-new2 " onclick="deleteProduct(${i})"><i class="fas fa-trash"></i></button>
         </div>
        </td>
      </tr>
    `);
  });
}

function editProduct(i) {

  currentEditIndex = i;
  const product = productsArr2[i];
  // Set form values
  $('#productName').val(product.name);
  $('#realPrice').val(product.real_price);
  $('#productDiscount').val(product.Discount);
  $('#productCategory').val(product.category);
  $('#productDescription').val(product.description);
  $('#productSubCategory').val(product.subcategory);
  $('#ratingAverage').val(product.ratingsAverage);
  $('#productQuantity').val(product.quantity);
  $('#productColor').val(product.Colors);
  // Set current images
  productImgSrc = product.imageCover;
  images = product.images;
  productColors = product.Colors;
  
  $('#addProductBtn').text('Update Product');
  $('#personalInfoModal').modal('show');
  
  $('#cancelProductBtn').on('click', () => {
    $('#addProductBtn').text('Add Product');
    resetForm();
  });

}

async function deleteProduct(i) {
   const Proid= productsArr2[i].id;
  const index=productsArr.findIndex(x=>x.id===Proid) 

  
  const { isConfirmed } = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to Delete this Product!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  });

  if (isConfirmed) {
    productsArr.splice(index, 1);
    saveToLocalStorage();
    displayProduct();

    // Show success message
    Swal.fire(
      'Deleted!',
      'Your product has been deleted.',
      'success'
    );
  }
}

// Helper functions
function generateProductId() {
  productsArr = JSON.parse(localStorage.getItem('Products'))
  let id = `${Date.now()}`

  return id;
}

function calculateEndPrice() {
  const price = Number($('#realPrice').val());
  const discount = Number($('#productDiscount').val()) || 0;
  return price - discount;
}

function saveToLocalStorage() {
  console.log(productsArr);
  console.log(JSON.parse(localStorage.getItem("Products")));
  
  localStorage.setItem('Products', JSON.stringify(productsArr));
}

function resetForm() {
  $('#productForm')[0].reset();
  productColors = [];
  images = [];
  productImgSrc = '';
  $('#addProductBtn').text('Add Product');
}


// ====================== logout ======================
$('#logoutBtn').on('click', function() {
   sessionStorage.removeItem('LogedUser');
   sessionStorage.removeItem('userRole');
  window.location = './login&register.html';
 });




// ====================== search in product table and order table ======================
$(document).ready(function () {

    $("#searchInput").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        let rowCount = 0;

        $("#ordersTable tbody tr").each(function () {
            let productName = $(this).find("td:eq(1)").text().toLowerCase();
            if (productName.indexOf(value) > -1) {
                $(this).show();
                rowCount++;
            } else {
                $(this).hide();
            }
        });

        if (rowCount === 0) {
            $(".no-results").show();
        } else {
            $(".no-results").hide();
        }
    });

        $('#searchRol').on('input', function () {
          let value = $(this).val().toLowerCase();
       $("#ordersTable2 tbody tr").each(function () {
            let roleName = $(this).find("td:eq(5)").text().toLowerCase();
            if (roleName.indexOf(value) > -1) {
                $(this).show();
              
            } else {
                $(this).hide();
            }
        });
        if ($(this).val() === '') {
            $('.no-results').hide();
        }
    });

});




 // ====================== sort in product table ======================
document.addEventListener('DOMContentLoaded', function() {
    const sortIcons = document.querySelectorAll('.sort-icon');
    let currentSort = {
        column: null,
        direction: 'asc' // 'asc' or 'desc'
    };
    
    // Add click event to each sort icon
    sortIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const column = this.getAttribute('data-column');
            
            // Toggle sort direction if clicking the same column
            if (currentSort.column === column) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.column = column;
                currentSort.direction = 'asc';
            }
            
            // Update UI to show current sort state
            updateSortIcons(column, currentSort.direction);
            
            // Sort the table
            sortTable(column, currentSort.direction);
        });
    });
    
    function updateSortIcons(activeColumn, direction) {
        sortIcons.forEach(icon => {
            const column = icon.getAttribute('data-column');
            if (column === activeColumn) {
                // Update active sort icon
                icon.classList.remove('fa-sort');
                icon.classList.add(direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down');
            } else {
                // Reset other icons
                icon.classList.remove('fa-sort-up', 'fa-sort-down');
                icon.classList.add('fa-sort');
            }
        });
    }
    
    function sortTable(column, direction) {
        const table = document.getElementById('ordersTable');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            const aValue = getCellValue(a, column);
            const bValue = getCellValue(b, column);
            
            // Handle numeric sorting for quantity and price
            if (column === 'quantity' || column === 'price') {
                const numA = parseFloat(aValue.replace(/[^0-9.-]/g, ''));
                const numB = parseFloat(bValue.replace(/[^0-9.-]/g, ''));
                return direction === 'asc' ? numA - numB : numB - numA;
            }
            
            // Default text sorting
            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        
        // Remove all existing rows
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        
        // Re-add the sorted rows
        rows.forEach(row => tbody.appendChild(row));
    }
    
    function getCellValue(row, column) {
        // This assumes your table cells are in a specific order
        // You may need to adjust the indexes based on your actual table structure
        const cells = row.querySelectorAll('td');
        switch (column) {
            case 'name': return cells[1].textContent.trim();
            case 'category': return cells[2].textContent.trim();
            case 'subcategory': return cells[3].textContent.trim();
            case 'quantity': return cells[4].textContent.trim();
            case 'price': return cells[5].textContent.trim();
            case 'process': return cells[6].textContent.trim();
            default: return '';
        }
    }
});
















