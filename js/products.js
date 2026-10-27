/* ==========================================================
   EDIT THIS FILE to change your store details and products.
   No database needed. Save the file and refresh the browser.
   ========================================================== */

const STORE = {
  name: "Your Store",                 // shown in header and footer
  tagline: "Where style begins",
  logo: "images/store-logo.png",       // add your logo image to the images folder
  phone: "+919999999999",              // phone number with country code, for example +971...
  googleReview: "https://g.page/r/",    // replace with your Google review link
  currency: "₹",
  whatsapp: "919999999999",           // country code + number, digits only (no + or spaces)
  phoneDisplay: "+91 99999 99999",
  email: "hello@yourstore.com",
  address: "Shop No. 1, Main Road, Your City",
  mapLink: "https://maps.google.com",
  instagram: "https://instagram.com/",
  slides: [
    { title: "New handbags are in", text: "Everyday totes, slings and satchels, ready to ship.", category: "Handbags", cta: "Shop handbags" },
    { title: "Jewellery that lasts", text: "Anti-tarnish pieces for daily wear and gifting.", category: "Jewellery", cta: "Shop jewellery" },
    { title: "Little ones, big smiles", text: "Kids kits, toys and school-time favourites.", category: "Kids", cta: "Shop kids" }
  ]
};

/* image: put your photos in the /images folder and write "images/yourfile.jpg".
   Leave image as "" and a coloured placeholder is shown instead. */
const CATEGORIES = ["Handbags", "Jewellery", "Wallets", "Kids", "Stationery", "Gifts"];

const PRODUCTS = [
  {
    id: 1, name: "Pureline Textured Bag", category: "Handbags", price: 405, mrp: 1299,
    colors: ["Grey", "Purple", "Black"], image: "",
    description: "A structured everyday bag with a ribbed flap and braided top handle.",
    features: ["Textured premium finish", "Metal front emblem", "Fits phone, wallet and cosmetics"]
  },
  {
    id: 2, name: "Classic Saddle Bag", category: "Handbags", price: 360, mrp: 1190,
    colors: ["Brown", "Maroon", "Blue"], image: "",
    description: "Curved saddle shape with a flap closure and a removable sling strap.",
    features: ["Smooth faux leather", "Gold-tone hardware", "Top handle and crossbody carry"]
  },
  {
    id: 3, name: "Scallop Quilted Bag", category: "Handbags", price: 410, mrp: 1310,
    colors: ["White", "Pink", "Black", "Beige"], image: "",
    description: "Scalloped quilting with a braided handle and adjustable sling strap.",
    features: ["Quilted exterior", "Braided top handle", "Adjustable sling strap"]
  },
  {
    id: 4, name: "Monogram Top Handle Bag", category: "Handbags", price: 445, mrp: 1349,
    colors: ["Beige", "Black", "Dark Brown", "Cream"], image: "",
    description: "Classic monogram print with a stripe detail and a comfortable handle.",
    features: ["Structured shape", "Lightweight", "Office and casual wear"]
  },
  {
    id: 5, name: "Anti-tarnish Butterfly Bangle", category: "Jewellery", price: 240, mrp: 499,
    colors: ["Gold"], image: "",
    description: "Slim gold-tone bangle with a butterfly motif and zircon stones.",
    features: ["Anti-tarnish finish", "Lightweight", "Good for gifting"]
  },
  {
    id: 6, name: "Teardrop Crystal Pendant", category: "Jewellery", price: 199, mrp: 699,
    colors: ["Gold"], image: "",
    description: "A clear teardrop crystal on a fine gold-tone chain.",
    features: ["Minimal design", "Polished chain", "Daily and party wear"]
  },
  {
    id: 7, name: "Cherry Drop Earrings", category: "Jewellery", price: 169, mrp: 399,
    colors: ["Red"], image: "",
    description: "Glossy red cherries with green enamel leaves.",
    features: ["Enamel finish", "Light on the ear", "Playful everyday look"]
  },
  {
    id: 8, name: "Studded Floral Wallet", category: "Wallets", price: 199, mrp: 699,
    colors: ["Brown", "Mint", "Lavender", "Peach"], image: "",
    description: "Scalloped flap wallet with metal studs, floral print and a pom-pom charm.",
    features: ["Durable finish", "Card and note slots", "Gift ready"]
  },
  {
    id: 9, name: "Cute Chick Kids Kit", category: "Kids", price: 190, mrp: 399,
    colors: ["Yellow", "Sky Blue", "Pink", "Green"], image: "",
    description: "Soft, lightweight kit bag for lunch, snacks or stationery.",
    features: ["Strong zip closure", "Easy for small hands", "School and picnic use"]
  },
  {
    id: 10, name: "Panda Glow Night Light", category: "Kids", price: 290, mrp: 599,
    colors: ["White"], image: "",
    description: "Soft silicone panda lamp. Tap to change colour.",
    features: ["BPA-free silicone", "Multiple LED colours", "Long battery life"]
  },
  {
    id: 11, name: "Notebook and Pen Set", category: "Stationery", price: 150, mrp: 299,
    colors: ["Pink", "Blue"], image: "",
    description: "A5 ruled notebook with a matching gel pen.",
    features: ["120 pages", "Smooth gel pen", "Gift box available"]
  },
  {
    id: 12, name: "Gift Box (Medium)", category: "Gifts", price: 280, mrp: 550,
    colors: ["Pink"], image: "",
    description: "Pastel gift box with a ribbon accent. Size: 28 x 9 x 21 cm.",
    features: ["Premium finish", "Ribbon accent", "Great for birthdays and anniversaries"]
  }
];
