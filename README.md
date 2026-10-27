# My Store (static website)

## Run in VS Code
1. Open this folder in VS Code (File > Open Folder > my-store).
2. Install the "Live Server" extension (Ritwick Dey).
3. Right-click index.html > "Open with Live Server".
   (Or double-click index.html to open it directly in the browser.)

## Customise
- js/products.js : store name, WhatsApp number, slides, categories, products.
- images/        : put product photos here, then set image: "images/photo.jpg".
- css/style.css  : colours are variables at the top (:root).

## WhatsApp number format
Country code + number, digits only. Example India: 919876543210


## Store profile section under the slider
- Add your store logo as `images/store-logo.png` (or change `STORE.logo` in `js/products.js`).
- Update `STORE.name` and `STORE.tagline`.
- Update `STORE.phone`, `STORE.whatsapp`, `STORE.mapLink`, and `STORE.googleReview` in `js/products.js`.
- For Google reviews, paste your actual Google review link into `STORE.googleReview`.
