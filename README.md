# Pixel Market — GitHub Pages starter store

A responsive, retro-inspired static storefront. It uses plain HTML, CSS and JavaScript, so there is no build step and no paid hosting requirement.

## Included

- Mobile-friendly storefront and product grid
- Product search and category filters
- Shopping cart with quantity controls
- Dark and light themes (theme choice is saved in the visitor's browser)
- Preorder checkout for physical and digital products
- Bank transfer instructions displayed at checkout
- Required JPG, PNG or PDF proof-of-transfer file selection (max 8 MB)
- Order request sent to your WhatsApp number with the selected filename
- Customer is reminded to attach the proof manually in WhatsApp

## Important payment and hosting limitations

GitHub Pages only hosts static files. This starter does **not** process card payments, verify bank transfers, securely store orders, reserve stock, calculate delivery or provide an admin dashboard.

The WhatsApp checkout sends a preorder request to your business WhatsApp. The customer selects a JPG, PNG or PDF proof file on the checkout page, then must attach that file manually in WhatsApp after the chat opens. WhatsApp click-to-chat cannot pre-attach files.

GitHub Pages cannot receive or store the selected proof file. The file picker validates the type and size in the customer's browser only; it does not upload the file to your website. You must verify the transfer yourself before confirming the preorder.

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
- `category` — the shop category/filter
- `type` — `Physical` or `Digital`
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


## Proof-of-transfer workflow limitation

The proof upload control is a **local file selection**, not a server upload. It accepts JPG, PNG and PDF files up to 8 MB, displays the selected filename and then opens WhatsApp with the order details. The customer must attach the selected file manually in WhatsApp and send it.

If you need the proof to be uploaded automatically and retained for admin review, you will need a separate secure upload service/backend (which may have usage limits or costs). Do not put private API keys in GitHub Pages code.


## Logo and About Me page

- The supplied logo is saved as `store-logo.png` and appears in the header, footer and browser tab icon. Keep this file in the repository root.
- The About page is `about.html`; the ABOUT navigation link opens it.
- Edit the introduction and story text directly in `about.html`.
- To add your portrait later, replace the `.about-photo-placeholder` block in `about.html` with an image element such as `<img class="about-photo" src="about-photo.jpg" alt="Portrait of the store owner">`, add `about-photo.jpg` to the repository root, and style `.about-photo` in `styles.css`.
