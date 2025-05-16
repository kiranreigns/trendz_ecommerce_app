import p1_img from "./product_1.png";
import p2_img1 from "./product_2.png";
import p2_img2 from "./product_2_2.jpg";
import p2_img3 from "./product_2_3.jpg";
import p2_img4 from "./product_2_4.jpeg";
import p3_img from "./product_3.png";
import p4_img from "./product_4.png";
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p15_img from "./product_15.png";
import p16_img from "./product_16.png";
import p17_img from "./product_17.png";
import p18_img from "./product_18.png";
import p19_img from "./product_19.png";
import p20_img from "./product_20.png";
import p21_img from "./product_21.png";
import p22_img from "./product_22.png";
import p23_img from "./product_23.png";
import p24_img from "./product_24.png";
import p25_img from "./product_25.png";
import p26_img from "./product_26.png";
import p27_img from "./product_27.png";
import p28_img from "./product_28.png";
import p29_img from "./product_29.png";
import p30_img from "./product_30.png";
import p31_img from "./product_31.png";
import p32_img from "./product_32.png";
import p33_img from "./product_33.png";
import p34_img from "./product_34.png";
import p35_img from "./product_35.png";
import p36_img from "./product_36.png";

let all_products = [
  {
    id: 1,
    name: "Zip Front Hooded Jacket for Women",
    category: "women",
    subCategory: "tops",
    image: [p1_img, p2_img1, p3_img, p4_img],
    new_price: 50.0,
    old_price: 80.5,
    description:
      "Stay cozy and stylish with this zip-front hooded jacket. Perfect for casual outings or layering in cooler weather. Made from premium materials for comfort and durability.",
    sizes: ["XS", "S", "M", "L", "XL"],
    bestSeller: true,
    rating: 4.7,
    reviews: 128,
  },
  {
    id: 2,
    name: "Women's Polyester Ribbed Square Neck Pink Top",
    description:
      "Elevate your casual wardrobe with this stylish square neck top. The ribbed texture adds dimension while the polyester blend ensures comfort and easy care. Perfect for pairing with jeans or skirts.",
    category: "women",
    subCategory: "tops",
    image: [p2_img1, p2_img2, p2_img3, p2_img4],
    new_price: 85.0,
    old_price: 120.5,
    sizes: ["S", "M", "L", "XL"],
    bestSeller: true,
    rating: 4.4,
    reviews: 96,
  },
  {
    id: 3,
    name: "Nike Yoga Dri-Fit Luxe Women's Cropped Top",
    category: "women",
    subCategory: "tops",
    image: [p3_img],
    new_price: 60.0,
    old_price: 100.5,
    description:
      "Designed for performance and style, this Nike cropped top features Dri-Fit technology to keep you dry during workouts. The luxe fabric provides a premium feel and comfortable fit.",
    sizes: ["XS", "S", "M", "L"],
    bestSeller: false,
    rating: 4.8,
    reviews: 215,
  },
  {
    id: 4,
    name: "Polka Dot Print V-Neck Full Sleeves Party Dress",
    category: "women",
    subCategory: "dresses",
    image: [p4_img],
    new_price: 100.0,
    old_price: 150.0,
    description:
      "Make a statement at your next event with this charming polka dot dress. The V-neck and full sleeves offer elegant coverage while the fitted silhouette flatters your figure.",
    sizes: ["S", "M", "L"],
    bestSeller: true,
    rating: 4.6,
    reviews: 78,
  },
  {
    id: 5,
    name: "Sera Micro Print Corp Top with V-neck",
    category: "women",
    subCategory: "tops",
    image: [p5_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This micro print V-neck top offers a professional yet feminine look. The lightweight fabric drapes beautifully for a polished office-ready appearance.",
    sizes: ["XS", "S", "M"],
    bestSeller: false,
    rating: 4.2,
    reviews: 42,
  },
  {
    id: 6,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    subCategory: "tops",
    image: [p6_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Flutter sleeves and a peplum hem give this striped blouse a playful, feminine touch. The overlap collar adds a sophisticated detail to this versatile top.",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: true,
    rating: 4.4,
    reviews: 63,
  },
  {
    id: 7,
    name: "Women Solid High Neck Cotton Blend White T-Shirt",
    category: "women",
    subCategory: "tops",
    image: [p7_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "A wardrobe essential, this high-neck white tee is made from a comfortable cotton blend. The minimalist design makes it perfect for layering or wearing alone.",
    sizes: ["XS", "S", "M", "L"],
    bestSeller: false,
    rating: 4.1,
    reviews: 37,
  },
  {
    id: 8,
    name: "Casual Regular Sleeves Printed Women Black Top",
    category: "women",
    subCategory: "tops",
    image: [p8_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This printed black top features a casual yet stylish design with regular sleeves. The comfortable fabric and relaxed fit make it ideal for everyday wear.",
    sizes: ["S", "M", "L"],
    bestSeller: false,
    rating: 3.9,
    reviews: 29,
  },
  {
    id: 9,
    name: "Women's Floral Print Long Sleeve Dress",
    category: "women",
    subCategory: "dresses",
    image: [p9_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Embrace feminine charm with this floral print long sleeve dress. The flowing silhouette and vibrant pattern make it perfect for brunches or garden parties.",
    sizes: ["XS", "S", "M", "L", "XL"],
    bestSeller: true,
    rating: 4.7,
    reviews: 112,
  },
  {
    id: 10,
    name: "DressBerry Burgundy Hooded Solid Blouson Crop Top",
    category: "women",
    subCategory: "tops",
    image: [p10_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Make a bold statement with this burgundy crop top featuring a hood and blouson silhouette. The trendy design is perfect for pairing with high-waisted bottoms.",
    sizes: ["XS", "S", "M"],
    bestSeller: false,
    rating: 4.0,
    reviews: 45,
  },
  {
    id: 11,
    name: "Medium Coverage Lightly Padded T-shirt Bra",
    category: "women",
    subCategory: "tops",
    image: [p11_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Experience all-day comfort with this medium coverage T-shirt bra. The lightly padded cups provide natural shaping while the seamless design stays invisible under clothing.",
    sizes: ["32B", "34B", "36B", "32C", "34C", "36C"],
    bestSeller: true,
    rating: 4.9,
    reviews: 328,
  },
  {
    id: 12,
    name: "Casual Regular Sleeves Solid Women Dark Blue Top",
    category: "women",
    subCategory: "tops",
    image: [p12_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This versatile dark blue top features a simple yet elegant design. The regular sleeves and solid color make it easy to pair with various bottoms.",
    sizes: ["S", "M", "L"],
    bestSeller: false,
    rating: 4.3,
    reviews: 51,
  },
  {
    id: 13,
    name: "Puma Full Sleeve Solid Men Jacket",
    category: "men",
    subCategory: "Jacket & Suits",
    image: [p13_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Stay warm and stylish with this Puma solid jacket. The full sleeves and sporty design make it perfect for casual outings or light outdoor activities.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestSeller: true,
    rating: 4.6,
    reviews: 187,
  },
  {
    id: 14,
    name: "HRX Men White and Navy Blue Colorblocked Jacket",
    category: "men",
    subCategory: "Jacket & Suits",
    image: [p14_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Make a bold statement with this colorblocked jacket from HRX. The white and navy blue combination offers a modern, athletic look.",
    sizes: ["M", "L", "XL"],
    bestSeller: false,
    rating: 4.2,
    reviews: 73,
  },
  {
    id: 15,
    name: "Jack & Jones Full Sleeve Printed Men Jacket",
    category: "men",
    subCategory: "Jacket & Suits",
    image: [p15_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This printed jacket from Jack & Jones features a stylish design with full sleeves. The comfortable fit and trendy pattern make it a great addition to your wardrobe.",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: true,
    rating: 4.5,
    reviews: 94,
  },
  {
    id: 16,
    name: "Beige Shirts for Men by John Players",
    category: "men",
    subCategory: "shirts",
    image: [p16_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This classic beige shirt from John Players offers a perfect blend of style and comfort. The versatile color makes it easy to pair with various outfits.",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false,
    rating: 4.4,
    reviews: 68,
  },
  {
    id: 17,
    name: "American Eagle Men Washed Jacket",
    category: "men",
    subCategory: "Jacket & Suits",
    image: [p17_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Achieve that perfect worn-in look with this washed jacket from American Eagle. The comfortable fabric and relaxed fit make it ideal for casual wear.",
    sizes: ["M", "L", "XL"],
    bestSeller: false,
    rating: 4.1,
    reviews: 56,
  },
  {
    id: 18,
    name: "Technosport Leightweight Antimicrobial Gym or Training Jacket",
    category: "men",
    subCategory: "Jacket & Suits",
    image: [p18_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Stay fresh during workouts with this antimicrobial training jacket. The lightweight design provides freedom of movement while the fabric technology prevents odor.",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: true,
    rating: 4.8,
    reviews: 142,
  },
  {
    id: 19,
    name: "HRX Full Sleeve Solid Men Jacket",
    category: "men",
    subCategory: "Jacket & Suits",
    image: [p19_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This solid jacket from HRX features a sleek design with full sleeves. The comfortable fit and minimalist style make it perfect for everyday wear.",
    sizes: ["S", "M", "L"],
    bestSeller: false,
    rating: 4.3,
    reviews: 47,
  },
  {
    id: 20,
    name: "The Souled Store Full Sleeve Solid Men Jacket",
    category: "men",
    subCategory: "Jacket & Suits",
    image: [p20_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Show off your unique style with this solid jacket from The Souled Store. The full sleeves and comfortable fit make it a great choice for casual occasions.",
    sizes: ["M", "L", "XL"],
    bestSeller: false,
    rating: 4.0,
    reviews: 39,
  },
  {
    id: 21,
    name: "Zeel Coloblocked Waterproof Rain Jacket for Men",
    category: "men",
    subCategory: "Jacket & Suits",
    image: [p21_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Stay dry in style with this colorblocked waterproof rain jacket. The functional design keeps you protected from the elements while maintaining a fashionable look.",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: true,
    rating: 4.7,
    reviews: 103,
  },
  {
    id: 22,
    name: "Locomotive Full Sleeve Solid Men Jacket",
    category: "men",
    subCategory: "Jacket & Suits",
    image: [p22_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This solid jacket from Locomotive features a classic design with full sleeves. The versatile style makes it easy to pair with various outfits.",
    sizes: ["S", "M", "L"],
    bestSeller: false,
    rating: 4.2,
    reviews: 52,
  },
  {
    id: 23,
    name: "Locomotive Full Sleeve Solid Men Jacket",
    category: "men",
    subCategory: "Jacket & Suits",
    image: [p23_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Another great option from Locomotive, this solid jacket offers comfort and style. The full sleeves provide coverage while the fabric ensures breathability.",
    sizes: ["M", "L", "XL"],
    bestSeller: false,
    rating: 4.1,
    reviews: 44,
  },
  {
    id: 24,
    name: "Leather Retail Men's Solid Biker Jacket",
    category: "men",
    subCategory: "Jacket & Suits",
    image: [p24_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Channel your inner rebel with this classic biker jacket. The genuine leather construction and rugged design make it a timeless addition to your wardrobe.",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: true,
    rating: 4.9,
    reviews: 178,
  },
  {
    id: 25,
    name: "Sky blue colored Zip Through Hoodie",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p25_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Keep your little one cozy with this sky blue zip-through hoodie. The comfortable fabric and easy zip design make it perfect for everyday wear.",
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
    bestSeller: false,
    rating: 4.3,
    reviews: 62,
  },
  {
    id: 26,
    name: "Printed hoodie Black/Football for boys",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p26_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Football fans will love this printed black hoodie. The sporty design and comfortable fit make it ideal for active kids.",
    sizes: ["6-7Y", "8-9Y", "10-11Y"],
    bestSeller: true,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 27,
    name: "Boys Navy Blue and white Colorblocked Hooded Sweatshirt",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p27_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This colorblocked sweatshirt combines navy blue and white for a stylish look. The hooded design adds extra warmth and comfort.",
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
    bestSeller: false,
    rating: 4.4,
    reviews: 57,
  },
  {
    id: 28,
    name: "Boys light-green colored Sweatshirt",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p28_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This light green sweatshirt offers a fresh, casual look for boys. The comfortable fabric and relaxed fit make it perfect for everyday wear.",
    sizes: ["6-7Y", "8-9Y"],
    bestSeller: false,
    rating: 4.2,
    reviews: 41,
  },
  {
    id: 29,
    name: "Dark Green Zip-Up Sweatshirt for boys",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p29_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This dark green zip-up sweatshirt combines style and functionality. The easy zip design makes it simple for kids to put on and take off.",
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
    bestSeller: true,
    rating: 4.6,
    reviews: 74,
  },
  {
    id: 30,
    name: "Boys Full Sleeves Padded and Hooded-Green Jacket",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p30_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Keep your child warm with this padded hooded jacket. The full sleeves and insulated padding provide extra protection against cold weather.",
    sizes: ["6-7Y", "8-9Y", "10-11Y"],
    bestSeller: false,
    rating: 4.5,
    reviews: 53,
  },
  {
    id: 31,
    name: "Denim Jacket with Zip-Front Closure",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p31_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This classic denim jacket features a zip-front closure for easy wear. The durable denim construction ensures long-lasting use.",
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
    bestSeller: true,
    rating: 4.8,
    reviews: 97,
  },
  {
    id: 32,
    name: "HRX Boys Blue Lifestyle Sweatshirt",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p32_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This blue lifestyle sweatshirt from HRX offers comfort and style. The relaxed fit and soft fabric make it perfect for active kids.",
    sizes: ["6-7Y", "8-9Y"],
    bestSeller: false,
    rating: 4.3,
    reviews: 48,
  },
  {
    id: 33,
    name: "HRX Boys Lifestyle Bio-Wash Brand Carrier Sustainable Shorts",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p33_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "These sustainable shorts from HRX feature a bio-wash treatment for softness. The comfortable fit and eco-friendly materials make them ideal for active kids.",
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
    bestSeller: false,
    rating: 4.1,
    reviews: 36,
  },
  {
    id: 34,
    name: "Full Sleeve Printed Boys Jacket",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p34_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This printed jacket features full sleeves and a fun design. The comfortable fit makes it perfect for layering during cooler weather.",
    sizes: ["6-7Y", "8-9Y", "10-11Y"],
    bestSeller: true,
    rating: 4.7,
    reviews: 82,
  },
  {
    id: 35,
    name: "Boys Black Red Colorblocked Sporty Jacket",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p35_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This sporty jacket combines black and red in a bold colorblocked design. The athletic style is perfect for active kids who want to look cool.",
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
    bestSeller: false,
    rating: 4.4,
    reviews: 59,
  },
  {
    id: 36,
    name: "Black and White Colourblocked Jacket",
    category: "kids",
    subCategory: "Boys Clothing",
    image: [p36_img],
    new_price: 85.0,
    old_price: 120.5,
    description:
      "This stylish jacket features a black and white colorblocked design. The versatile colors make it easy to pair with various outfits.",
    sizes: ["6-7Y", "8-9Y", "10-11Y"],
    bestSeller: false,
    rating: 4.2,
    reviews: 43,
  },
];

export default all_products;
