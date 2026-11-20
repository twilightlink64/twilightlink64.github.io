# Twilight Dusk Studios — GitHub Pages webshop

A responsive bilingual (Dutch-first, English optional) static storefront for physical and digital preorders. Built with plain HTML, CSS and JavaScript; no build step required.

## Website files

- `index.html` — Dutch-default storefront with NL/EN language toggle
- `about.html` — bilingual About Me page with portrait placeholder
- `styles.css` — responsive retro styling and dark/light themes
- `app.js` — product catalogue, cart, translations and preorder checkout
- `config.js` — store name, WhatsApp contact and public bank transfer details
- `store-logo.png` — supplied Twilight Dusk Studios logo

Keep all files in the repository root.

## Important: public bank details

The two bank account numbers and beneficiary configured in `config.js` are displayed to customers at checkout. GitHub Pages websites hosted from public repositories are publicly readable, and the configuration file is also publicly readable. Only keep these details in the website if you intend them to be public.

## Before accepting orders

1. Open `config.js`.
2. Replace `whatsappNumber` with your business WhatsApp number in international digits-only format (Suriname: 597...).
3. Replace `contactEmail` with your real business email.
4. Review the bank account details and beneficiary.
5. Edit the sample products and prices in `app.js`.
6. Replace placeholder story text in `about.html`.
7. Add your portrait later by replacing `.about-photo-placeholder` with an image in `about.html`.

## Bank transfer / proof workflow

Customers see VCB Bank and Finabank transfer details at checkout, select a JPG, PNG or PDF proof (maximum 8 MB), then continue to WhatsApp with a prewritten order message. They must manually attach the proof file in WhatsApp. GitHub Pages cannot receive or store the selected file, and WhatsApp click-to-chat cannot attach it automatically. Orders remain pending until the store manually verifies payment.

## GitHub Pages deployment

1. Upload all files to the root of a public GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then save.
5. Wait for GitHub Pages to publish.

## Notes

- Dutch (`nl`) is the default language. The NL / EN buttons switch languages and remember the visitor's choice in their browser.
- Dark/light theme preference is saved locally in the visitor's browser.
- GitHub Pages is static hosting; it does not process payments, verify transfers, store uploaded proof, manage inventory, or provide a private admin dashboard.
- The example product artwork and product data are placeholders. Replace them before launch.
