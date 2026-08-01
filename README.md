# Renewal Party

This project now includes a minimal Astro + TinaCMS setup for editing site content, along with a Cloudflare R2 presigned-upload endpoint for media.

## What is included
- Astro app for the event site
- TinaCMS content model for the homepage
- Cloudflare R2 presigned upload route at /api/r2-presign
- Cloudflare Workers deployment configuration support

## Local development
1. Install dependencies:
   npm install
2. Copy the example env file:
   cp .env.example .env
3. Fill in the TinaCMS and Cloudflare R2 values.
4. Start the app:
   npm run dev
5. Start TinaCMS:
   npm run tina
6. Start the Pages local runtime:
   npm run pages:dev

## Deployment
Use the Pages deploy command instead of a Workers-style deploy:
- npm run deploy
- or: npm run deploy:pages

## Cloudflare R2 setup
1. Create an R2 bucket.
2. Create an API token with Read/Write access.
3. Add the following environment variables to Cloudflare or your deployment env:
   - CLOUDFLARE_ACCOUNT_ID
   - R2_BUCKET
   - R2_ACCESS_KEY_ID
   - R2_SECRET_ACCESS_KEY
4. Use the /api/r2-presign route to generate upload URLs for your images.

## TinaCMS setup
1. Create a Tina Cloud project and obtain a client ID and token.
2. Add them to .env.
3. Start TinaCMS with npm run tina.
4. Open the local admin UI to edit the homepage content.
