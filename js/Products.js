import indexedDB from './indexedDb.js';
import { successAlert ,RemoveAlert,FailAlert } from './date.js'; 
initialize();
let CartArr = [];
let WhishListtArr = [];
let FilterCartArr=[];
var userId;


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

if (sessionStorage.getItem('LogedUser')) {
  userId=JSON.parse(sessionStorage.getItem('LogedUser')).userId;
}


async function initialize() {
  const cartData = await indexedDB.getItem('Cart');
  if (cartData) {
      CartArr = cartData;
      console.log(CartArr);
      
  }
  const WhishListData = await indexedDB.getItem('WhishList');
  if (WhishListData) {
    WhishListtArr = WhishListData;
  }

}

// set at local storage
// mostala7 maigration
if (localStorage.getItem('Products')) {
    ProductsArr=JSON.parse(localStorage.getItem('Products'))
     }
     else{
        localStorage.setItem('Products',JSON.stringify(ProductsArr));
    }


    // Gaafer section
// elements counter
document.getElementById(
  "elementscounter"
).innerHTML = `(${ProductsArr.length})`;

// to create one element

function createProductElement(product) {
  const discountPercentage =
    product.Discount > 0
      ? Math.round((product.Discount / product.real_price) * 100)
      : 0;
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
 
  return `
      <div class="contain-item col-lg-3 col-md-6 pb-2">
        <div class="Product" data-id="${product.id}">
          <div class="pic position-relative">
            <img class="w-100" src="${product.imageCover}" alt="${
    product.name
  }" />
            ${
              discountPercentage > 0
                ? `<span class="discount">-${discountPercentage}%</span>`
                : ""
            }
            <span   class="${WhishListClass} fa-heart position-absolute" data-id="${product.id}"></span>
          </div>
          <div class="disc">
            <h3>${
              product.name.split(" ").length > 3
                ? product.name.split(" ").slice(0, 2).join(" ")
                : product.name
            }</h3>
            <div class="rate d-flex align-items-center gap-1">
              <span class="fa-solid fa-star"></span>
              <span>${product.ratingsAverage}</span>
              <span class="simi">(+500)</span>
            </div>
            <div class="price d-flex justify-content-between align-items-center">
              <div>
                ${product.EndPrice}
                ${
                  product.Discount > 0
                    ? `<span class="text-decoration-line-through afterSale">${product.real_price} Egp</span>`
                    : ""
                }
              </div>
              <button class="btnAddToCart fa-solid fa-plus" data-id="${product.id}"></button>
            </div>
          </div>
        </div>
      </div>
    `;
}

// function of display as implement and make pagination
function displayProducts(products, tabId , currentPage = 1 , itemsPerPage = 8) {
  const tabContent = document.querySelector(`#${tabId} .row`);
  if (!tabContent) return;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  tabContent.innerHTML = paginatedProducts
  .map((product) => createProductElement(product))
  .join("");
  if (totalPages > 1) {
    createPagination(tabContent.parentElement, totalPages, currentPage, (page) => {
      displayProducts(products, tabId, page, itemsPerPage);
    });
  } else {
    const existingPagination = tabContent.parentElement.querySelector('.pagination');
    if (existingPagination) {
      existingPagination.remove();
    }
  }
  function createPagination(container, totalPages, currentPage, onPageChange) {
    // إزالة pagination السابق إذا كان موجوداً
    const existingPagination = container.querySelector('.pagination');
    if (existingPagination) {
      existingPagination.remove();
    }
  
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
  
    // زر الصفحة السابقة
    if (currentPage > 1) {
      const prevButton = document.createElement('button');
      prevButton.innerHTML = '&laquo;';
      prevButton.addEventListener('click', () => onPageChange(currentPage - 1));
      paginationContainer.appendChild(prevButton);
    }
  
    // أزرار الصفحات
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => onPageChange(i));
      paginationContainer.appendChild(pageButton);
    }
  
   
    if (currentPage < totalPages) {
      const nextButton = document.createElement('button');
      nextButton.innerHTML = '&raquo;';
      nextButton.addEventListener('click', () => onPageChange(currentPage + 1));
      paginationContainer.appendChild(nextButton);
    }
  
    container.appendChild(paginationContainer);
  }
  // tabContent.innerHTML = products
  //   .map((product) => createProductElement(product))
  //   .join("");
}




// displaying data in event onload and all next code in onload event cause of creation is in function at js .

document.addEventListener("DOMContentLoaded", function () {

  (async () => {
    await initialize();
  
 //display all products
  displayProducts(ProductsArr, "nav-All");

 
  //displaying men and women and kids all products
  displayProducts(
    ProductsArr.filter((p) => p.category === category[0]),
    "nav-men"
  );
  displayProducts(
    ProductsArr.filter((p) => p.category === category[1]),
    "nav-women"
  );
  displayProducts(
    ProductsArr.filter((p) => p.category === category[2]),
    "nav-kids"
  );

  
  for(let i=0 ; i<category.length ; i++) {
    for(let element of subcategory){
        displayProducts(
            ProductsArr.filter((p) =>  p.category.toLowerCase() === category[i].toLowerCase() && p.subcategory.toLowerCase()=== element.toLowerCase() ),
            `nav-${category[i]}-${element}`
          );
    }
  }
})();

// send filtered data to product details when clicked new

  document.addEventListener('click', function(e) {
    const productelement = e.target.closest('.Product');
    const heartBtn = e.target.closest('.fa-heart') ;   
    const cartBtn = e.target.closest('.btnAddToCart');
    if (cartBtn||heartBtn) {
      e.preventDefault();
      e.stopPropagation();
      const products = JSON.parse(localStorage.getItem('Products')) || [];
      let productId;
if (cartBtn) {
   productId = cartBtn.dataset.id;
}
else{
  productId = heartBtn.dataset.id;
}

      
      const product = products.find(p => p.id === productId);
      // let iid=addToCartBtn.dataset.id;
      if(product) {
                                     
              if (heartBtn) {
                  if (!sessionStorage.getItem('LogedUser') || !userId) {
                    FailAlert("User Login !",'You should login or register first!')
                      return;
                  }
                   addToWhishList(product,heartBtn);
              } 
              else if (cartBtn) {
                  if (!sessionStorage.getItem('LogedUser') || !userId) {
                     FailAlert("User Login !",'You should login or register first!')
                      return;
                  }
                 addToCart(product,cartBtn);
              }
    
    
      }
       else {
        console.error('Product not found with ID:', productId);
      }
      return ;
    }
    if(productelement) {
      let id = productelement.dataset.id;
      window.location.href=`./productdetails.html?id=${id}`;
      // return;
    
    }


  })
 





});
// end of filtering data




async function addToCart(product,btn) {
  try {
  
    
      let pro = product;
      let productCartObj = {
          userId: userId,
          ProId: pro.id,
          OrderId: 0,
          id: Math.floor(Math.random() * 1000 * (userId) + 1),
          name: pro.name,
          real_price: pro.real_price,
          EndPrice: pro.EndPrice,
          imageCover: pro.imageCover,
          qty: 1,
          Color: pro.Colors[0],
      };

      let existPro = CartArr.some(x => x.userId == userId && x.ProId == pro.id);

      if (!existPro) {
          CartArr.push(productCartObj);
          FilterCartArr=CartArr.filter(item =>item.userId === userId );
          successAlert('added To Cart','Product added to cart successfully.')
        
      } else {
          CartArr = CartArr.filter(item => !(item.userId === userId && item.ProId === pro.id));
          FilterCartArr=CartArr.filter(item =>item.userId === userId );
        
          RemoveAlert('Remove From CArt',"Product Removed Successfully")
      }
      
      await indexedDB.setItem('Cart', CartArr);
      btn.classList.toggle('fa-plus');
      btn.classList.toggle('fa-check');
  } 
  catch (error) {
      console.error('Error in addToCart:', error);
  }
}
 async function addToWhishList(product,btn) {
  try {
    let pro = product;
      
      let productArrObj = {
          userId: userId,
          ProId: pro.id,
          id: Math.floor(Math.random() * 1000 * (userId) + 1),
          name: pro.name,
          real_price: pro.real_price,
          EndPrice: pro.EndPrice,
          imageCover: pro.imageCover,
          Color: pro.Colors[0],
      };

      let existPro = WhishListtArr.some(x => x.userId == userId && x.ProId == pro.id);

      if (!existPro) {
        WhishListtArr.push(productArrObj);
        successAlert('added To WhishList','Product added to WhishList successfully.')
      } else {
        WhishListtArr = WhishListtArr.filter(item => !(item.userId === userId && item.ProId === pro.id));
        RemoveAlert('Remove From WhishList',"Product Removed From WhishList Successfully")
      }
      
      await indexedDB.setItem('WhishList', WhishListtArr);

    btn.classList.toggle('fa-regular');
      btn.classList.toggle('fa-solid');
  } 
  catch (error) {
      console.error('Error in WhishList:', error);
  }
}





// End of ahmed section


