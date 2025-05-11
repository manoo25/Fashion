import indexedDB from './indexedDb.js';

let CartArr = [];
let WhishListtArr = [];
async function initialize() {
  const cartData = await indexedDB.getItem('Cart');
  if (cartData) {
      CartArr = cartData;
  }
  const WhishListData = await indexedDB.getItem('WhishList');
  if (WhishListData) {
    WhishListtArr = WhishListData;
  }




}
var userId;

if (sessionStorage.getItem('LogedUser')) {
  userId=JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}


document.addEventListener('DOMContentLoaded', function() {
  new Splide('#main-carousel', {
    type: 'slide',
    perPage: 3, 
    perMove: 1,
    gap: '1.5rem',
    arrows: true,
    pagination: false,
    breakpoints: {
      992: { 
        perPage: 2
      },
      768: { 
        perPage: 1,
        arrows: false,
      }
    }
  }).mount();
});
document.addEventListener('DOMContentLoaded', function() {
  new Splide('#Cat-carousel', {
    type: 'slide',
    perPage: 8, 
    perMove: 1,
    gap: '1.5rem',
    arrows: true,
    pagination: false,
    breakpoints: {
      992: { 
        perPage: 5
      },
      768: { 
        perPage: 3,
        arrows: false,
      }
    }
  }).mount();




});


  // edit nav height
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > window.innerHeight) { 
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    });


let category = ["Men", "Women", "Kids"];
let subcategory = ["Dresses", "Jackets", "Tshirts","Shoeses", "Jeans"];
let ProductsArr = [
  {
   
    id: "1",
    ratingsAverage: 4.8,
    name: "Oversize Fit Crew Neck Printed T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Product Code: B5813AXER105
Model Measurements S Size - 1,88cm - 90/74/91
Sample size: S
Main Fabric Content : Cotton 100%
Product group: : MAN T-Shirt`,
    quantity: 150,
    real_price: 800,
    Discount: 80,
    EndPrice: 720,
    imageCover: "./imgs/products/MT13.jpg",
    images: [
      "./imgs/products/MT1.jpg",
      "./imgs/products/MT12.jpg",
      "./imgs/products/MT13.jpg",
      "./imgs/products/MT14.jpg",
    ],
    seller_id: 5,
    Colors: ["Ecru"],
    Colorscode: ["#F1E7E5"],
  },
  {
    id: "2",
    ratingsAverage: 4.8,
    name: "Oversize Fit Crew Neck T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Product Code: B5813AXER105
Model Measurements S Size - 1,88cm - 90/74/91
Sample size: S
Main Fabric Content : Cotton 100%
Product group: : MAN T-Shirt`,
    quantity: 150,
    real_price: 700,
    Discount: 20,
    EndPrice: 680,
    imageCover: "./imgs/products/MT2.jpg",
    images: [
      "./imgs/products/MT2.jpg",
      "./imgs/products/MT22.jpg",
      "./imgs/products/MT23.jpg",
      "./imgs/products/MT24.jpg",
    ],
    seller_id: 5,
    Colors: ["White", "Anthracite", "Mint", " Light Yellow"],
    Colorscode: ["#ECE7EE", "#3E3D44", "#C9C9C7", "#FDE2B6"],
  },
  {
    id: "3",
    ratingsAverage: 4.8,
    name: "DeFactoFit NBA Los Angeles Lakers Oversize Fit T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Model Measurements M Size - 1,87cm - 98/78/97
Sample size: M
Main Fabric Content : Cotton 100%`,
    quantity: 150,
    real_price: 1000,
    Discount: 100,
    EndPrice: 900,
    imageCover: "./imgs/products/MT34.jpg",
    images: [
      "./imgs/products/MT34.jpg",
      "./imgs/products/MT32.jpg",
      "./imgs/products/MT33.jpg",
      "./imgs/products/MT3.jpg",
    ],
    seller_id: 5,
    Colors: ["Dark Purple"],
    Colorscode: ["#231355"],
  },
  {
    id: "4",
    ratingsAverage: 4.2,
    name: "Boxy Fit Crew Neck Striped T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Model Measurements S Size - 1,88cm - 90/74/91
Sample size: S
Main Fabric Content : Cotton 59%,Viscose 13%,Polyester 28%`,
    quantity: 150,
    real_price: 1000,
    Discount: 100,
    EndPrice: 900,
    imageCover: "./imgs/products/MT43.jpg",
    images: [
      "./imgs/products/MT4.jpg",
      "./imgs/products/MT42.jpg",
      "./imgs/products/MT43.jpg",
      "./imgs/products/MT44.jpg",
    ],
    seller_id: 5,
    Colors: ["Light Brown", "Anthracite", " Dark Orange", "Brown"],
    Colorscode: ["#CFB6A1", "#3F424D", "#E1AD4B", "#964B00"],
  },
  {
    id: "5",
    ratingsAverage: 4.4,
    name: "Boxy Fit Crew Neck Printed T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Model Measurements M Size - 1,86cm - 95/76/92
Sample size: M
Main Fabric Content : Cotton 100%`,
    quantity: 150,
    real_price: 1000,
    Discount: 150,
    EndPrice: 850,
    imageCover: "./imgs/products/MT53.jpg",
    images: [
      "./imgs/products/MT52.jpg",
      "./imgs/products/MT53.jpg",
      "./imgs/products/MT5.jpg",
      "./imgs/products/MT54.jpg",
      "./imgs/products/MT55.jpg",
    ],
    seller_id: 5,
    Colors: ["Black"],
    Colorscode: ["#1A191E"],
  },
  {
    id: "6",
    ratingsAverage:4.8,
    name: "Boxy Fit Crew Neck Printed T-Shirt",
    category: category[0],
    subcategory: subcategory[2],
    description: `Model Measurements M Size - 1,86cm - 95/76/92
Sample size: M
Main Fabric Content : Cotton 100%`,
    quantity: 140,
    real_price: 1000,
    Discount: 150,
    EndPrice: 850,
    imageCover: "./imgs/products/MT6.jpg",
    images: [
      "./imgs/products/MT6.jpg",
      "./imgs/products/MT62.jpg",
      "./imgs/products/MT63.jpg",
      "./imgs/products/MT64.jpg",
    ],
    seller_id: 5,
    Colors: ["Stone"],
    Colorscode: ["#F9E9DA"],
  },
  //   man jeans
  {
    id: "7",
    ratingsAverage: 4.5,
    name: "Sergio Regular Fit Normal Waist Straight Leg Jeans",
    category: category[0],
    subcategory: subcategory[4],
    description: `Model Measurements 30 Size - 30 Length Size - 1,85cm - 98/79/96
Sample size: 30 Size - 30 Length
Main Fabric Content : Cotton 99%,Elastane 1%`,
    quantity: 170,
    real_price: 2000,
    Discount: 300,
    EndPrice: 1700,
    imageCover: "./imgs/products/MJ14.jpg",
    images: [
      "./imgs/products/MJ1.jpg",
      "./imgs/products/MJ12.jpg",
      "./imgs/products/MJ13.jpg",
      "./imgs/products/MJ14.jpg",
    ],
    seller_id: 7,
    Colors: ["Mid Blue"],
    Colorscode: ["#59DDD3"],
  },
  {
    id: "8",
    ratingsAverage: 4.6,
    name: "Relax Fit Straight Leg Jeans",
    category: category[0],
    subcategory: subcategory[4],
    description: `Model Measurements 32 Size - 1,88cm - 98/80/94
Sample size: 32
Main Fabric Content : Cotton 100%`,
    quantity: 170,
    real_price: 2000,
    Discount: 300,
    EndPrice: 1700,
    imageCover: "./imgs/products/MJ23.jpg",
    images: [
      "./imgs/products/MJ2.jpg",
      "./imgs/products/MJ22.jpg",
      "./imgs/products/MJ23.jpg",
      "./imgs/products/MJ24.jpg",
    ],
    seller_id: 7,
    Colors: ["Mid Blue"],
    Colorscode: ["#30D5C8"],
  },
  //   MAn Jacket
  {
    id: "9",
    ratingsAverage: 5,
    name: "Relax Fit Polo Collar Snap Zippered Thin Jacket",
    category: category[0],
    subcategory: subcategory[1],
    description: `Main Fabric Content : Elastane 4%,Polyester 96%`,
    quantity: 170,
    real_price: 3899,
    Discount: 0,
    EndPrice: 3899,
    imageCover: "./imgs/products/MJa14.jpg",
    images: [
      "./imgs/products/MJa14.jpg",
      "./imgs/products/MJa12.jpg",
      "./imgs/products/MJa13.jpg",
      "./imgs/products/MJa1.jpg",
    ],
    seller_id: 7,
    Colors: ["Khaki"],
    Colorscode: ["#f0e68c"],
  },
  {
    id: "10",
    ratingsAverage: 4.9,
    name: "White Shoose",
    category: category[0],
    subcategory: subcategory[3],
    description: `Shoes - SHO`,
    quantity: 170,
    real_price: 3599,
    Discount: 1800,
    EndPrice: 1799,
    imageCover: "./imgs/products/MS1.png",
    images: [
      "./imgs/products/MS1.png",
      "./imgs/products/MS12.png",
      "./imgs/products/MS13.png",
    ],
    seller_id: 8,
    Colors: ["White"],
    Colorscode: ["#ffffff"],
  },
  //   Women
  //   Women Dresses
  {
    id: "11",
    ratingsAverage:4.6,
    name: "Shirt Collar Patterned Long Sleeve Maxi Dress",
    category: category[1],
    subcategory: subcategory[0],
    description: `Model Measurements 36 Size - 1,74cm - 84/61/92
Sample size: 36
Main Fabric Content : Polyamide 12%,Viscose 88%`,
    quantity: 140,
    real_price: 1000,
    Discount: 150,
    EndPrice: 850,
    imageCover: "./imgs/products/WD13.jpg",
    images: [
      "./imgs/products/WD1.jpg",
      "./imgs/products/WD15.jpg",
      "./imgs/products/WD13.jpg",
      "./imgs/products/WD16.jpg",
    ],
    seller_id: 8,
    Colors: ["Ecru", "Ecru"],
    Colorscode: ["#FBF6ED", "#FFB733"],
  },

  {
    id: "12",
    ratingsAverage: 4.5,
    name: "Regular Fit Crew Neck Basic Belted Aerobin Long Sleeve Dress",
    category: category[1],
    subcategory: subcategory[0],
    description: `Model Measurements 36 Size - 1,74cm - 84/61/92
Sample size: 36
Main Fabric Content : Polyester 100%`,
    quantity: 150,
    real_price: 2000,
    Discount: 300,
    EndPrice: 1700,
    imageCover: "./imgs/products/WD2.jpg",
    images: [
      "./imgs/products/WD22.jpg",
      "./imgs/products/WD23.jpg",
      "./imgs/products/WD24.jpg",
    ],
    seller_id: 8,
    Colors: ["NAVY", "Green"],
    Colorscode: ["#333399", "#00C000"],
  },
  //   Woman jeans
  {
    id: "13",
    ratingsAverage:4.8,
    name: "Wide Leg High Waist Long Soft Jeans",
    category: category[1],
    subcategory: subcategory[4],
    description: `Main Fabric Content : Lyocell 100%`,
    quantity: 150,
    real_price: 1000,
    Discount: 150,
    EndPrice: 850,
    imageCover: "./imgs/products/WJ14.jpg",
    images: [
      "./imgs/products/WJ1.jpg",
      "./imgs/products/WJ12.jpg",
      "./imgs/products/WJ13.jpg",
    ],
    seller_id: 5,
    Colors: ["Mid Blue"],
    Colorscode: ["#30D5C8"],
  },
  //   Woman Jackets
  {
    id: "14",
    ratingsAverage: 4.5,
    name: "Regular Pattern Polo Collar Velvet Seasonal Thin Jacket",
    category: category[1],
    subcategory: subcategory[1],
    description: `Model Measurements M Size - 1,78cm - 85/60/89
Sample size: M
Main Fabric Content : Cotton 56%,Polyester 44%`,
    quantity: 150,
    real_price: 4000,
    Discount: 600,
    EndPrice: 3400,
    imageCover: "./imgs/products/WJa12.jpg",
    images: [
      "./imgs/products/WJa12.jpg",
      "./imgs/products/WJa1.jpg",
      "./imgs/products/WJa13.jpg",
      "./imgs/products/WJa14.jpg",
    ],
    seller_id: 5,
    Colors: ["Brown"],
    Colorscode: ["#AB6F33"],
  },
  //   Woman shoeses
  {
    id: "15",
    ratingsAverage: 4.7,
    name: "HIGH HEEL SLINGBACKS WITH BEAD DETAIL",
    category: category[1],
    subcategory: subcategory[3],
    description: `Slingback shoes with a mesh top. Beaded and sequined detail on the front. Ankle strap with buckle fastening. High stiletto heel. Pointed toe.

Heel height: 10.5 cm / 4.1`,
    quantity: 150,
    real_price: 3890,
    Discount: 0,
    EndPrice: 3890,
    imageCover: "./imgs/products/WS1.jpg",
    images: [
      "./imgs/products/WS12.jpg",
      "./imgs/products/WS1.jpg",
      "./imgs/products/WS13.jpg",
      "./imgs/products/WS14.jpg",
    ],
    seller_id: 5,
    Colors: ["gold"],
    Colorscode: ["#D8C9B3"],
  },
  //   Kids
  //   Kids T-shirt
  {
    id: "16",
    ratingsAverage: 4.9,
    name: "TOWELLING  SWEATSHIRT WITH LABEL",
    category: category[2],
    subcategory: subcategory[2],
    description: `Long sleeve sweatshirt with a round neck. Ribbed trims. Stripe print and label appliqué on the chest.`,
    quantity: 150,
    real_price: 1190,
    Discount: 400,
    EndPrice: 790,
    imageCover: "./imgs/products/KT1.jpg",
    images: [
      "./imgs/products/KT1.jpg",
      "./imgs/products/KT12.jpg",
      "./imgs/products/KT13.jpg",
      "./imgs/products/KT14.jpg",
    ],
    seller_id: 5,
    Colors: ["USAFA Blue"],
    Colorscode: ["#024997"],
  },
  {
    id: "17",
    ratingsAverage: 4.8,
    name: "Printed sweatshirt",
    category: category[2],
    subcategory: subcategory[2],
    description: ` Georgia Beaumont. Top in lightweight sweatshirt fabric made from cotton with a floral print front and back. Round, rib-trimmed neckline with press-studs on one side (except in sizes 2 To 4Y), dropped shoulders and ribbing at the cuffs and hem.`,
    quantity: 150,
    real_price: 1000,
    Discount: 150,
    EndPrice: 850,
    imageCover: "./imgs/products/KT24.jpeg",
    images: [
      "./imgs/products/KT24.jpeg",
      "./imgs/products/KT22.jpeg",
      "./imgs/products/KT23.jpeg",
      "./imgs/products/KT2.jpeg",
    ],
    seller_id: 5,
    Colors: ["Light yellow"],
    Colorscode: ["#D3CFBE"],
  },
  //   Kids Jeans
  {
    id: "18",
    ratingsAverage: 4.8,
    name: "Linen-blend joggers",
    category: category[2],
    subcategory: subcategory[4],
    description: ` Joggers in a soft weave made from a cotton and linen blend. Elasticated, drawstring waist and a fake fly.`,
    quantity: 150,
    real_price: 1000,
    Discount: 150,
    EndPrice: 850,
    imageCover: "./imgs/products/KJ13.jpeg",
    images: [
      "./imgs/products/KJ13.jpeg",
      "./imgs/products/KJ14.jpeg",
      "./imgs/products/KJ1.jpeg",
      "./imgs/products/KJ12.jpeg",
    ],
    seller_id: 5,
    Colors: ["Cream", "White/Grey striped"],
    Colorscode: ["#E9E8E0", "#AFAFBC"],
  },
  //   Kids Jacket
  {
    id: "19",
    ratingsAverage: 4.8,
    name: "Quilted Jacket Suit",
    category: category[2],
    subcategory: subcategory[1],
    description: ` Padded snowsuit in a quilted weave with a shiny finish featuring a detachable, fleece-lined hood with a fluffy trim. Zip down the front with an anti-chafe chin guard and an elasticated belt with a plastic buckle. Covered elastication at the cuffs and hems, and a detachable, reinforced strap under the feet. Fleece lining.`,
    quantity: 150,
    real_price: 4000,
    Discount: 600,
    EndPrice: 3400,
    imageCover: "./imgs/products/KJa1.jpeg",
    images: ["./imgs/products/KJa1.jpeg", "./imgs/products/KJa12.jpeg"],
    seller_id: 5,
    Colors: ["Dark Black"],
    Colorscode: ["#000000"],
  },
  //   Kids Shoeses
  {
    id: "20",
    ratingsAverage: 4.5,
    name: "Chukka boots",
    category: category[2],
    subcategory: subcategory[3],
    description: ` Chukka boots with open lacing, jersey linings and insoles in Cellfit™ technical foam for extra comfort. Heel 1.5 cm.`,
    quantity: 150,
    real_price: 2000,
    Discount: 300,
    EndPrice: 1700,
    imageCover: "./imgs/products/KS1.jpeg",
    images: [
      "./imgs/products/KS1.jpeg",
      "./imgs/products/KS12.jpeg",
      "./imgs/products/KS13.jpeg",
    ],
    seller_id: 5,
    Colors: ["Brown-Nose"],
    Colorscode: ["#744021"],
  },
  {
    id: "21",
    ratingsAverage: 5,
    name: "Woman Faux Leather Shoulder Bag",
    category: category[1],
    subcategory: "Bags",
    description: ` Product Code: E3355AXBK27
Main Fabric Content : Polyurethane 100%
Product group: : حريمي Bag
According to usage : Shoulder bag
Gender : Woman
Fabric Detail : Faux Leather
Product Dimensions : *11.5*8.5
Color : Black
Product Season Condition : All Seasons
Ürün Tipi : Bag`,
    quantity: 110,
    real_price: 999,
    Discount: 0,
    EndPrice: 999,
    imageCover: "./imgs/products/WB15.jpg",
    images: [
      "./imgs/products/WB1.jpg",
      "./imgs/products/WB12.jpg",
      "./imgs/products/WB13.jpg",
      "./imgs/products/WB14.jpg",
      "./imgs/products/WB15.jpg",
    ],
    seller_id: 5,
    Colors: ["Black"],
    Colorscode: ["#21130d"],
  },
  {
    id: "22",
    ratingsAverage: 4.8,
    name: "Women Faux Leather Handbag",
    category: category[1],
    subcategory: "Bags",
    description: ` Chukka boots with open lacing, jersey linings and insoles in Cellfit™ technical foam for extra comfort. Heel 1.5 cm.`,
    quantity: 110,
    real_price: 999,
    Discount: 100,
    EndPrice: 899,
    imageCover: "./imgs/products/WB2.jpg",
    images: [
      "./imgs/products/WB2.jpg",
      "./imgs/products/WB22.jpg",
      "./imgs/products/WB21.jpg",
    ],
    seller_id: 5,
    Colors: ["Black" ,"Dark Blue" , "MIXED" ],
    Colorscode: ["#21130d" , "#608BD9" , "#5B91D0"],
  },
  {
    id: "23",
    ratingsAverage: 4.6 ,
    name: "Long Fit Jean Skirt",
    category: category[1],
    subcategory: "Skirts",
    description: ` Model Measurements 36 Size - 1,74cm - 80/61/91
Sample size: 36
Main Fabric Content : Cotton 100%`,
    quantity: 120,
    real_price: 1499,
    Discount: 450,
    EndPrice: 1049,
    imageCover: "./imgs/products/WSk1.jpg",
    images: [
      "./imgs/products/WSk1.jpg",
      "./imgs/products/WSk12.jpg",
      "./imgs/products/WSk13.jpg",
      "./imgs/products/WSk14.jpg",
      "./imgs/products/WSk15.jpg",
    ],
    seller_id: 5,
    Colors: ["Mid Blue" ],
    Colorscode: ["#59DDD3"],
  },
  {
    id: "24",
    ratingsAverage: 4.6 ,
    name: "Woman 7 piece Short Socks",
    category: category[1],
    subcategory: "Socks",
    description: `Main Fabric Content : Cotton 75%,Polyamide 23%,Elastane 2%`,
    quantity: 125,
    real_price: 699,
    Discount: 0,
    EndPrice: 699,
    imageCover: "./imgs/products/WSo1.jpg",
    images: [
      "./imgs/products/WSo12.jpg",
      "./imgs/products/WSo13.jpg",
      "./imgs/products/WSo14.jpg",
      "./imgs/products/WSo15.jpg",
    ],
    seller_id: 5,
    Colors: ["Mixed" ],
    Colorscode: ["#5D8DD5"],
  },
  {
    id: "25",
    ratingsAverage: 4.6 ,
    name: "Woman Animal 3 piece Babet Socks",
    category: category[1],
    subcategory: "Socks",
    description: `Main Fabric Content : Metallised Fiber 1%,Cotton 74%,Polyamide 22%,Elastane 2%,Polyester 1%`,
    quantity: 135,
    real_price: 299,
    Discount: 0,
    EndPrice: 299,
    imageCover: "./imgs/products/WSo22.jpg",
    images: [
      "./imgs/products/WSo22.jpg",
      "./imgs/products/WSo23.jpg",
      "./imgs/products/WSo2.jpg",
      "./imgs/products/WSo24.jpg",
      "./imgs/products/WSo25.jpg",
    ],
    seller_id: 5,
    Colors: ["Mixed" ],
    Colorscode: ["#5D8DD5"],
  },
  {
    id: "26",
    ratingsAverage: 4.6 ,
    name: "Woman 2 piece Short Socks",
    category: category[0],
    subcategory: "Socks",
    description: `Main Fabric Content : Elastane 1%,Viscose 61%,Polyester 16%,Elastodiene 5%,Nylon 17%`,
    quantity: 135,
    real_price: 299,
    Discount: 100,
    EndPrice: 199,
    imageCover: "./imgs/products/MSo1.jpg",
    images: [
      "./imgs/products/MSo13.jpg",
      "./imgs/products/MSo12.jpg",
      "./imgs/products/MSo14.jpg",
    ],
    seller_id: 5,
    Colors: ["Mixed" ],
    Colorscode: ["#5D8DD5"],
  },
  {
    id: "27",
    ratingsAverage: 5 ,
    name: "Oversize Fit Folded Sleeve Waterproof Long Trench Coat",
    category: category[1],
    subcategory: "Coats",
    description: `Model Measurements M Size - 1,81cm - 88/67/94
Sample size: M
Main Fabric Content : Polyester 100%`,
    quantity: 145,
    real_price: 1999,
    Discount: 400,
    EndPrice: 1599,
    imageCover: "./imgs/products/WC15.jpg",
    images: [
      "./imgs/products/WC15.jpg",
      "./imgs/products/WC1.jpg",
      "./imgs/products/WC12.jpg",
      "./imgs/products/WC13.jpg",
      "./imgs/products/WC14.jpg",
    ],
    seller_id: 5,
    Colors: ["Beige" ],
    Colorscode: ["#FBEED6"],
  },
  {
    id: "28",
    ratingsAverage: 4.6 ,
    name: "LIGHTWEIGHT WATER-REPELLENT PARKA",
    category: category[0],
    subcategory: "Coats",
    description: `Lightweight relaxed-fit parka made of a technical fabric that repels water on contact and helps prevent you from getting wet when exposed to drizzle for short periods. Heat-sealed seams for improved waterproofing.`,
    quantity: 145,
    real_price: 5690,
    Discount: 0,
    EndPrice: 5690,
    imageCover: "./imgs/products/MC12.jpg",
    images: [
      "./imgs/products/MC14.jpg",
      "./imgs/products/MC15.jpg",
      "./imgs/products/MC1.jpg",
      "./imgs/products/MC13.jpg",
      "./imgs/products/MC12.jpg",
    ],
    seller_id: 5,
    Colors: ["Beige" ],
    Colorscode: ["#FBEED6"],
  },
  {
    id: "29",
    ratingsAverage: 5 ,
    name: "COAT WITH DETACHABLE COLLAR",
    category: category[0],
    subcategory: "Coats",
    description: `Coat with a double detachable high neck with zip. Long sleeves. Welt pockets at the hip and inside pocket. Central back vent. Concealed zip fastening on the front with a snap-button placket.`,
    quantity: 140,
    real_price: 8290,
    Discount: 0,
    EndPrice: 8290,
    imageCover: "./imgs/products/MC2.jpg",
    images: [
      "./imgs/products/MC23.jpg",
      "./imgs/products/MC2.jpg",
      "./imgs/products/MC22.jpg",
      "./imgs/products/MC24.jpg",
    ],
    seller_id: 5,
    Colors: ["black" ],
    Colorscode: ["#21130d"],
  },
];



// set at local storage
// mostala7 maigration
if (localStorage.getItem('Products')) {
    ProductsArr=JSON.parse(localStorage.getItem('Products'))
     }
     else{
        localStorage.setItem('Products',JSON.stringify(ProductsArr));
    }



    




//Mohamed SAlama JS
(initialize().then(  ()=>{

 
const FlashSale=document.getElementById('FlashSale');


 function displayFlashSale() { 
  
   const filteredProducts = ProductsArr.filter(product =>    
     Math.round((product.Discount / product.real_price) * 100) >= 30
   ).slice(0, 4);
   FlashSale.innerHTML=''
     filteredProducts.forEach(product => {
  let averageDis=Math.round((product.Discount/product.real_price)*100);
  let existPro;
  let existWhishlist;
if(userId){
  
   existPro = CartArr.some(x => 
    x.userId.toString() === userId.toString() && 
    x.ProId.toString() === product.id.toString()
 );
   existWhishlist = WhishListtArr.some(x => 
    x.userId.toString() === userId.toString() && 
    x.ProId.toString() === product.id.toString()
 );
   
}
  const buttonClass = existPro ? 'fa-check' : 'fa-plus';
  const WhishListClass = existWhishlist ? 'fa-solid' : 'fa-regular';
       FlashSale.innerHTML+=`
        <div class="contain-item col-lg-3 col-md-6  pb-2">
         <div class="Product" data-id="${product.id}">
           <div class="pic position-relative">
             <img class="w-100" src="${product.imageCover}" />
                <span   data-product='${JSON.stringify(product)}' class="${WhishListClass} fa-heart position-absolute"></span>
             <span class="discount">-${averageDis}%</span>
           </div>
           <div class="disc">
             <h3>${(product.name).split(' ',2).join(' ')}</h3>
             <div class="rate d-flex align-items-center gap-1">
               <span>${product.ratingsAverage}</span>
               <span class="simi">(+500)</span>
             </div>
             <div class="price d-flex justify-content-between align-items-center">
               <div>
                ${product.EndPrice}
                 <span class="text-decoration-line-through afterSale">${product.real_price} Egp</span>
               </div>
               <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
             </div>
           </div>
         </div>
       </div>
       
       `

     
   });
}
displayFlashSale();




const NavLinksBest = document.getElementById('NavLinksBest');
const navabContent = document.getElementById('nav-tabContent');



function refresh() {
  
  displayFlashSale();
  displayNavTabsLink();
  displayTopPiks();
}



//Best selling
function displayNavTabsLink() {
 category.forEach(cat => {
   NavLinksBest.innerHTML += `
     <button
       class="nav-link"
       id="nav-${cat}-tab"
       data-bs-toggle="tab"
       data-bs-target="#nav-${cat}"
       type="button"
       role="tab"
       aria-controls="nav-${cat}"
       aria-selected="false"
     >
       ${cat}
     </button>`;
 });

 const filteredProducts = ProductsArr.filter(product => 
  
   Math.round((product.Discount / product.real_price) * 100)==10
   
 ).slice(0, 4);
 filteredProducts.forEach(product => {
   let averageDis=Math.round((product.Discount/product.real_price)*100);
   let existPro;
   let existWhishlist;
 if(userId){
   
    existPro = CartArr.some(x => 
     x.userId.toString() === userId.toString() && 
     x.ProId.toString() === product.id.toString()
  );
    existWhishlist = WhishListtArr.some(x => 
     x.userId.toString() === userId.toString() && 
     x.ProId.toString() === product.id.toString()
  );
    
 }
   const buttonClass = existPro ? 'fa-check' : 'fa-plus';
   const WhishListClass = existWhishlist ? 'fa-solid' : 'fa-regular';
   if(averageDis==0){


  
  
  document.getElementById('allBestTab').innerHTML+=`
 
   <div class="contain-item col-lg-3 col-md-6 pb-2">
       <div class="Product" data-id="${product.id}">
         <div class="pic position-relative">
           <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
         
            <span   data-product='${JSON.stringify(product)}' class="${WhishListClass} fa-heart position-absolute"></span>
         </div>
         <div class="disc">
           <h3>${product.name.split(' ', 2).join(' ')}</h3>
           <div class="rate d-flex align-items-center gap-1">
             <span class="fa-solid fa-star"></span>
             <span>${product.ratingsAverage}</span>
             <span class="simi">(+500)</span>
           </div>
           <div class="price d-flex justify-content-between align-items-center">
             <div>
               ${product.EndPrice}
               
             </div>
             <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
           </div>
         </div>
       </div>
     </div>
 
 `
   }
   else{
     document.getElementById('allBestTab').innerHTML += `
     <div class="contain-item col-lg-3 col-md-6 pb-2">
       <div class="Product" data-id="${product.id}">
         <div class="pic position-relative">
           <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
           <span class="discount">-${averageDis}%</span>
           <span   data-product='${JSON.stringify(product)}' class="${WhishListClass} fa-heart position-absolute"></span>
         </div>
         <div class="disc">
           <h3>${product.name.split(' ', 2).join(' ')}</h3>
           <div class="rate d-flex align-items-center gap-1">
             <span class="fa-solid fa-star"></span>
             <span>${product.ratingsAverage}</span>
             <span class="simi">(+500)</span>
           </div>
           <div class="price d-flex justify-content-between align-items-center">
             <div>
               ${product.EndPrice}
               <span class="text-decoration-line-through afterSale">
                 ${product.real_price} Egp
               </span>
             </div>
             <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
           </div>
         </div>
       </div>
     </div>
   `;
   }
 
});

 category.forEach(cat => {

   const tabContent = document.createElement("div");
   tabContent.className = "tab-pane fade";
   tabContent.id = `nav-${cat}`;
   tabContent.setAttribute("role", "tabpanel");
   tabContent.setAttribute("aria-labelledby", `nav-${cat}-tab`);
   tabContent.setAttribute("tabindex", "0");


   const rowtabContent = document.createElement("div");
   rowtabContent.className = "row gy-4 px-5 px-md-2 px-lg-0 gx-4";

  
   const filteredProducts = ProductsArr.filter(product => 
     product.category === cat && 
     Math.round((product.Discount / product.real_price) * 100)==15
   ).slice(0, 4);

   filteredProducts.forEach(product => {
     let averageDis=Math.round((product.Discount/product.real_price)*100);
     let existPro;
  let existWhishlist;
if(userId){
  
   existPro = CartArr.some(x => 
    x.userId.toString() === userId.toString() && 
    x.ProId.toString() === product.id.toString()
 );
   existWhishlist = WhishListtArr.some(x => 
    x.userId.toString() === userId.toString() && 
    x.ProId.toString() === product.id.toString()
 );
   
}
  const buttonClass = existPro ? 'fa-check' : 'fa-plus';
  const WhishListClass = existWhishlist ? 'fa-solid' : 'fa-regular';
    if(averageDis==0){
     rowtabContent.innerHTML += `
     <div class="contain-item col-lg-3 col-md-6 pb-2">
       <div class="Product" data-id="${product.id}">
         <div class="pic position-relative">
           <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
         
            <span   data-product='${JSON.stringify(product)}' class="${WhishListClass} fa-heart position-absolute"></span>
         </div>
         <div class="disc">
           <h3>${product.name.split(' ', 2).join(' ')}</h3>
           <div class="rate d-flex align-items-center gap-1">
             <span class="fa-solid fa-star"></span>
             <span>${product.ratingsAverage}</span>
             <span class="simi">(+500)</span>
           </div>
           <div class="price d-flex justify-content-between align-items-center">
             <div>
               ${product.EndPrice}
               
             </div>
              <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
           </div>
         </div>
       </div>
     </div>
   `;
    }
else{
 rowtabContent.innerHTML += `
 <div class="contain-item col-lg-3 col-md-6 pb-2">
   <div class="Product" data-id="${product.id}">
     <div class="pic position-relative">
       <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
       <span class="discount">-${averageDis}%</span>
       <span   data-product='${JSON.stringify(product)}' class="${WhishListClass} fa-heart position-absolute"></span>
     </div>
     <div class="disc">
       <h3>${product.name.split(' ', 2).join(' ')}</h3>
       <div class="rate d-flex align-items-center gap-1">
         <span class="fa-solid fa-star"></span>
         <span>${product.ratingsAverage}</span>
         <span class="simi">(+500)</span>
       </div>
       <div class="price d-flex justify-content-between align-items-center">
         <div>
           ${product.EndPrice}
           <span class="text-decoration-line-through afterSale">
             ${product.real_price} Egp
           </span>
         </div>
          <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
       </div>
     </div>
   </div>
 </div>
`;
}


   });
   tabContent.appendChild(rowtabContent);   
   navabContent.appendChild(tabContent);
 });
}
displayNavTabsLink();



// Top Picks Display 
const TopPicksContainer = document.getElementById('TopPicksContainer');

function displayTopPiks() { 
 TopPicksContainer.innerHTML=''
 const filteredProducts = ProductsArr.filter(product =>    
   product.ratingsAverage==5
 );
 filteredProducts.forEach(product => {
let averageDis=Math.round((product.Discount/product.real_price)*100);
let existPro;
let existWhishlist;
if(userId){

 existPro = CartArr.some(x => 
  x.userId.toString() === userId.toString() && 
  x.ProId.toString() === product.id.toString()
);
 existWhishlist = WhishListtArr.some(x => 
  x.userId.toString() === userId.toString() && 
  x.ProId.toString() === product.id.toString()
);
 
}
const buttonClass = existPro ? 'fa-check' : 'fa-plus';
const WhishListClass = existWhishlist ? 'fa-solid' : 'fa-regular';
if(averageDis==0){

 TopPicksContainer.innerHTML+=`

<div class="contain-item col-lg-3 col-md-6 pb-2">
    <div class="Product" data-id="${product.id}">
      <div class="pic position-relative">
        <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
      
        <span   data-product='${JSON.stringify(product)}' class="${WhishListClass} fa-heart position-absolute"></span>
      </div>
      <div class="disc">
        <h3>${product.name.split(' ', 2).join(' ')}</h3>
        <div class="rate d-flex align-items-center gap-1">
          <span class="fa-solid fa-star"></span>
          <span>${product.ratingsAverage}</span>
          <span class="simi">(+500)</span>
        </div>
        <div class="price d-flex justify-content-between align-items-center">
          <div>
            ${product.EndPrice}
            
          </div>
          <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
        </div>
      </div>
    </div>
  </div>

`
}
else{
 TopPicksContainer.innerHTML += `
  <div class="contain-item col-lg-3 col-md-6 pb-2">
    <div class="Product" data-id="${product.id}">
      <div class="pic position-relative">
        <img class="w-100" src="${product.imageCover}" alt="${product.name}" />
        <span class="discount">-${averageDis}%</span>
         <span   data-product='${JSON.stringify(product)}' class="${WhishListClass} fa-heart position-absolute"></span>
      </div>
      <div class="disc">
        <h3>${product.name.split(' ', 2).join(' ')}</h3>
        <div class="rate d-flex align-items-center gap-1">
          <span class="fa-solid fa-star"></span>
          <span>${product.ratingsAverage}</span>
          <span class="simi">(+500)</span>
        </div>
        <div class="price d-flex justify-content-between align-items-center">
          <div>
            ${product.EndPrice}
            <span class="text-decoration-line-through afterSale">
              ${product.real_price} Egp
            </span>
          </div>
          <button  data-product='${JSON.stringify(product)}'  class="btnAddToCart fa-solid ${buttonClass}"></button>
        </div>
      </div>
    </div>
  </div>
`;
}  

 });
}
displayTopPiks();


//End Mohamed Salama JS




document.addEventListener('click', function(e) {
  // تحديد العناصر المهمة
  const productElement = e.target.closest('.Product');
  const heartBtn = e.target.closest('.fa-heart');
  const cartBtn = e.target.closest('.btnAddToCart');
  
  if (heartBtn || cartBtn) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  
  if (productElement && !heartBtn && !cartBtn) {
    const id = productElement.dataset.id;
    window.location.href = `./productdetails.html?id=${id}`;
  }




});











}));





