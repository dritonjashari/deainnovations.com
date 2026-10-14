# deainnovations.com

The company website for DEA Innovations: plain HTML, CSS and a little vanilla JavaScript. No framework, no build step, no dependencies.

```
index.html        Home: hero, the three services, products, how we work, why us, team preview
services.html     Software, Web, Mobile Apps, AI Automations, Social Media, SEO
products.html     Cleanup.photo, CreatePosts and the inpaint engine, in detail
team.html         the team (Behar, Driton, Edmond) and About us
contact.html      contact options and what happens next
privacy.html      privacy page
404.html          "page not found" (wired up in .htaccess)
.htaccess         compression, caching, security headers, optional HTTPS redirect
robots.txt, sitemap.xml
assets/css/styles.css   all styles; colours and sizes are tokens at the top
assets/js/main.js       mobile menu, before/after slider, copy-email button (the site works without it)
assets/fonts/           Inter, self-hosted (one font, no Google requests, GDPR-friendly)
assets/img/             logos, favicon, share image (og.png), apple-touch-icon.png
```

## Preview locally

With XAMPP's Apache running, open http://localhost/deainnovations/. Or just double-click `index.html`; everything uses relative paths.

## Before going live

- **Email address.** The site uses `info@deainnovations.com`. Create that mailbox under cPanel > **Email Accounts** before going live. (`hello@cleanup.photo` on the Contact page is Cleanup.photo's own support address.)
- **Privacy page.** It describes this static site accurately (no cookies, no analytics, no third-party requests). Check it against the rules where you operate; some countries also require an imprint or legal notice page.

## Deploy on Namecheap

`deainnovations.com` currently serves the CreatePosts panel from `public_html`. Move the panel to a subdomain first, then put the website in `public_html`.

### 1. Move CreatePosts to app.deainnovations.com

1. cPanel > **Domains** > **Create A New Domain**: enter `app.deainnovations.com` and note its document root (e.g. `/home/<user>/app.deainnovations.com`). AutoSSL issues its certificate automatically within a few minutes to hours.
2. In cPanel > **Terminal** (`<user>` is your cPanel username):
   ```
   cd ~/app.deainnovations.com
   git clone https://github.com/dritonjashari/createposts.git .
   cp ~/public_html/backend/config.local.php backend/
   cp -r ~/public_html/backend/uploads/. backend/uploads/
   [ -d ~/public_html/backend/lib/uploads ] && cp -r ~/public_html/backend/lib/uploads backend/lib/
   npm run build
   ```
   If `git clone` says the folder isn't empty, run `ls -A` to see what's in it, then remove those files.
3. Open https://app.deainnovations.com and log in. Everyone has to log in once on the new address, because logins are remembered per address.
4. If you set up the cron jobs, change their paths from `public_html/backend/...` to `app.deainnovations.com/backend/...`.
5. Move the old panel files out of `public_html`. This moves them rather than deleting them, so they can be restored:
   ```
   mkdir ~/createposts-old
   cd ~/public_html
   mv .git .gitignore .htaccess README.md backend frontend index.php package.json scripts ~/createposts-old/
   ```
   Leave `cgi-bin` and `.well-known` where they are. Delete `~/createposts-old` once the subdomain has worked for a while.

### 2. Upload the website

1. On your PC, zip the **contents** of this folder (not the folder itself), including `.htaccess`.
2. cPanel > **File Manager** > `public_html` > **Upload** the zip, then right-click it > **Extract**, and delete the zip. (Turn on *Settings > Show Hidden Files* to see `.htaccess`.)
3. Open https://deainnovations.com.
4. Once the padlock shows (cPanel > **SSL/TLS Status**), uncomment the HTTPS block at the top of `.htaccess`.

## Editing

- **Text:** each page's content is in its own HTML file, section by section (look for the `<!-- ===== -->` markers).
- **Header and footer** are repeated on every page. To change a menu item or footer link, make the same change in all six pages; search and replace in your editor does it in one go.
- **Team photos:** the team cards show initials. To use a photo, replace `<span class="avatar" aria-hidden="true">BL</span>` with `<img class="avatar" src="assets/img/behar.jpg" alt="">` (square images work best).
- **Colours:** the tokens at the top of `styles.css`. `.theme-cleanup` (aqua) and `.theme-posts` (orange) set each product's accent.
- **After changing CSS or JS,** change `?v=7` to `?v=8` in every page (and `404.html`). Browsers cache those files for a month, and the new number makes them fetch the update.
