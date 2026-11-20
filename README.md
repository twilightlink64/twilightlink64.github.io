# Pixel Market — GitHub Pages starter store

A responsive, retro-inspired static storefront. It uses plain HTML, CSS and JavaScript, so there is no build step and no paid hosting requirement.

## Included

- Mobile-friendly storefront and product grid
- Product search and category filters
- Shopping cart with quantity controls
- Dark and light themes (theme choice is saved in the visitor's browser)
- Checkout form
- Order request sent to your WhatsApp number
- Bank transfer and physical POS-at-pickup payment choices

## Important payment and hosting limitations

GitHub Pages only hosts static files. This starter does **not** process card payments, verify bank transfers, securely store orders, reserve stock, calculate delivery or provide an admin dashboard.

The WhatsApp checkout sends an order request to your business WhatsApp. You must confirm the order and verify payment yourself. The bank transfer option displays the instructions you configure. The POS option means the customer pays in person using your physical terminal.

For online card payments, integrate a payment provider that supports merchants in Suriname. The safest pattern is a provider-hosted checkout page or payment link. Do not put secret API keys, bank login details or card data in this website's JavaScript.

## 1. Customize your store

### Store settings

Open `config.js` and update:

- `storeName`
- `whatsappNumber` — international digits only, e.g. `597XXXXXXXX`
- `currency` — currently `SRD`
- `bankInstructions` — your bank transfer instructions
- `contactEmail`

Do not publish until you replace the example WhatsApp number and email.

### Products

Open `app.js` and edit the `PRODUCTS` array. Each product has:

- `id` — unique number
- `name`
- `category` — Apparel, Accessories, Lifestyle, or your own category
- `price` — numeric price in SRD
- `tag` — optional label
- `symbol` — temporary graphic character
- `code` — small product reference

The current product artwork is illustrative. Replace it with your own product photos before launch if you want real product imagery.

## 2. Publish free with GitHub Pages

1. Sign in to GitHub and create a new **public** repository, for example `my-online-store`.
2. Upload `index.html`, `styles.css`, `app.js`, `config.js` and `README.md` to the repository root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish. Your site will be available at `https://YOUR-USERNAME.github.io/my-online-store/`.

You can connect a custom domain later in Settings → Pages if you own one.

## 3. Before launch checklist

- [ ] Replace the store name and branding
- [ ] Add your real WhatsApp number
- [ ] Add accurate bank transfer instructions
- [ ] Replace sample products, prices and graphics
- [ ] Add delivery areas, fees and pickup instructions
- [ ] Test checkout on a phone
- [ ] Test the WhatsApp order message
- [ ] Publish clear return, privacy and delivery policies
- [ ] Confirm your POS and bank transfer procedures with your bank/payment provider

## Notes

- The Google Fonts import is optional; the site falls back to system fonts if unavailable.
- Cart contents are currently held in memory and clear when the page is refreshed.
- GitHub Pages is suitable for the storefront, but not for private customer records or payment processing.
