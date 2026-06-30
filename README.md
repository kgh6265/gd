<img src="https://raw.githubusercontent.com/kgh6265/gd/refs/heads/main/frontend/public/logo.png" width="100" height="100">

This is the repo for the [RIT Dubai](https://rit.edu/dubai) [Graphic Design Club](https://gdclub.ritdubai.ae) website. You're looking at the most horrendous collaboration of code and microservices to ever exist in the history of open-soure software. Fear not, this README details everything there is to know about this project.


![Website Screenshot](https://donutslove.your-homi.es/NEP3t7bTKk.jpg?key=CxADDOTu9ydRy0)

## Table of contents

- [But why did we make this?](#but-why-did-we-make-this)
- [How does it work?](#how-does-it-work)
- [The cast of characters](#the-cast-of-characters)
- [How the repo is laid out](#how-the-repo-is-laid-out)
- [Getting it running locally](#getting-it-running-locally)
  - [What you'll need first](#what-youll-need-first)
  - [Clone and install](#clone-and-install)
  - [Environment variables](#environment-variables)
  - [Running everything](#running-everything)
- [The backend, in detail](#the-backend-in-detail)
  - [Content types](#content-types)
  - [API tokens](#api-tokens)
  - [Webhooks (the magic rebuild button)](#webhooks-the-magic-rebuild-button)
  - [File uploads and emails](#file-uploads-and-emails)
- [The frontend, in detail](#the-frontend-in-detail)
  - [Static vs. dynamic pages](#static-vs-dynamic-pages)
  - [Talking to the backend](#talking-to-the-backend)
  - [Talking to Supabase directly](#talking-to-supabase-directly)
  - [Certificate verification](#certificate-verification)
- [Supabase, in detail](#supabase-in-detail)
- [Where everything is hosted](#where-everything-is-hosted)
- [Common tasks](#common-tasks)
  - [Adding magazines for a new year](#adding-magazines-for-a-new-year)
  - [Adding an event](#adding-an-event)
  - [Adding or editing members](#adding-or-editing-members)
- [License](#license)

## But why did we make this?

Long before time began, there was the cube. Back then, the GD Club consisted of a very small team running on limited time and budget, and so they decided to create a website using Site123. The website served its purpose, but it did not represent the club or its visual identity well. Additionally, the free plan came with huge "Made with Site123" banners and an indecipherably long URL. Other clubs were starting to have their own websites and establish independent identities, and so the GD Club decided to do the same.

![Old Site123 website](https://donutslove.your-homi.es/8TPhfM7zb2.jpg?key=2JZvZNaIMnpZUp)

## How does it work?

I'm glad you asked. This monorepo, which was painstakingly crafted over the course of months, consists of two main components: the **frontend** and the **backend**. While making a website is relatively easier and simpler, making a website that lets people edit its contents without having to modify the website's source code makes it significantly more complex. 

The `frontend` folder is a [Nuxt.js](https://nuxt.com) application that serves as the website itself. By default, pages are statically generated at build time, except for certain SSR pages such as the event pages and user dashboards, which are generated dynamically. Since most data in the backend isn't refreshed often, the frontend fetches the data at build time to render static pages. This makes it efficient without having to make API calls every time a user visits the website.

The `backend` folder is a [Strapi](https://strapi.io) application that serves as the content management system for the website. Users can log in to the backend to create, edit, and delete content such as events, blog posts, and pages. The backend also provides an API for the frontend to fetch data from. **Any updates made here will trigger a webhook to rebuild the frontend.**

All of this is made possible because of our wonderful database host, Supabase. Supabase's free tier provides generous amounts of both database and bucket storage, which powers the backend, allowing users to upload images and other media to the website. Utilizing the Supabase SDK allows for the frontend to skip the middleman and directly fetch data from the database, which is faster and secure due to various RLS policies. Additionally, Supabase's authentication is used to allow only RIT users access via Google OAuth. 
Resend powers our automated emails from Supabase, which are triggered when users register for an event, sending them a confirmation email with their registration details. This is done through a webhook that triggers a Supabase Edge Function to send the email.

## The cast of characters

Here's everything holding this thing together, and why each one is here:

| Service | What it does |
| --- | --- |
| **Nuxt.js** | The frontend website. Statically generated for the most part, with a sprinkle of SSR where it's actually needed. |
| **Strapi** | The headless CMS / backend. This is where club members log in to edit content without touching a single line of code. |
| **Supabase** | The Postgres database, file/bucket storage, authentication (Google OAuth, RIT-only) and edge functions. The glue. |
| **Resend** | Sends the automated confirmation emails when someone registers for an event. |
| **Google APIs** | Used to export event registrations into a Google Sheet inside a shared Drive folder. |
| **Render** | Hosts the Strapi backend. |
| **Vercel** | Hosts the Nuxt frontend. |
| **Umami** | Privacy-friendly analytics. |

## How the repo is laid out

```
├── frontend/         # the Nuxt.js website
│   ├── components/   # Vue components (Nav, Footer, MagazineList, EventList, etc.)
│   ├── layouts/      # page layouts
│   ├── pages/        # routed pages (index, dashboard, events/[id], magazines/[magazine], verify/[id]...)
│   ├── server/       # Nitro server routes — the bits that hold secrets and talk to Strapi
│   ├── plugins/      # client plugins (charts, etc.)
│   └── public/       # static assets, fonts, security.txt, humans.txt, robots.txt
│
├── backend/          # the Strapi CMS
│   ├── config/       # database, server, middlewares, plugins (upload + email providers)
│   └── src/api/      # content types: about, credential, event, magazine, member
│
└── supabase/         # Supabase project config + edge functions
    └── functions/send-confirmation-email/   # the Deno function that fires the Resend email
```

The root `package.json` exists mostly so you can run both apps at once with one command (more on that below).

## Getting it running locally

### What you'll need first

- **Node.js** — the backend is picky and wants Node `>=18 <=20`, so do yourself a favour and stick to Node 20. Also has to do with the now outdated version of Nuxt that we're running
- A **Supabase** project (free tier is fine), if you want auth, the database and uploads to actually work.
- A **Strapi admin account** — you'll create this the first time you run the backend.

### Clone and install

This is a monorepo, but the two apps have their own dependencies, so you install in three places:

```bash
git clone https://github.com/<your-username>/gdclub-website.git
cd gdclub-website

# root (just the dev runner + a couple of shared deps)
npm install

# frontend
cd frontend && npm install && cd ..

# backend
cd backend && npm install && cd ..
```

### Environment variables

Neither app ships with a committed `.env` — they're gitignored on purpose, and you should keep it that way. Create a `.env` inside `frontend/` and another inside `backend/`. You can also find `.env.example` files in the folders that need `.env` files with the required variables already listed out.

**`frontend/.env`**

| Variable | What it's for |
| --- | --- |
| `STRAPI_URL` | The base URL of your Strapi backend (defaults to the production one if unset). |
| `STRAPI_TOKEN` | A read-only Strapi API token so the frontend can fetch content at build time. |
| `SUPABASE_URL` | Your Supabase project URL (used by `@nuxtjs/supabase`). |
| `SUPABASE_KEY` | The Supabase anon/public key. |
| `REDIRECT_URL` | Where Supabase auth sends users back after login. |
| `CLIENT_EMAIL` | Google service account email — used to export registrations to Sheets. |
| `PRIVATE_KEY` | Google service account private key (keep the `\n`s escaped). |

**`backend/.env`**

| Variable | What it's for |
| --- | --- |
| `HOST`, `PORT` | Where Strapi listens (defaults `0.0.0.0:1337`). |
| `APP_KEYS` | Strapi app keys (comma-separated). |
| `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `TRANSFER_TOKEN_SALT` | Strapi security secrets. Generate random ones. |
| `DATABASE_CLIENT` | `postgres` in production (Supabase), `sqlite` if you just want to poke around locally. |
| `DATABASE_URL` *or* `DATABASE_HOST` / `DATABASE_PORT` / `DATABASE_NAME` / `DATABASE_USERNAME` / `DATABASE_PASSWORD` | Connection details for the Supabase Postgres database. |
| `DATABASE_SSL` | Set to `true` for Supabase. |
| `SUPABASE_API_URL`, `SUPABASE_API_KEY`, `SUPABASE_BUCKET`, `SUPABASE_DIRECTORY` | Used by the Supabase upload provider so media goes into bucket storage. |
| `RESEND_API_KEY` | Lets the Resend email provider send mail. |

**Supabase edge function** (`send-confirmation-email`) — set these in the Supabase dashboard, not a local file: `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`.

> A quick word on secrets: everything sensitive is read from `process.env` / Strapi's `env()` — there are no hardcoded keys anywhere in here, and there shouldn't be. If you're adding something new, put it in `.env`, never inline.

### Running everything

From the root, this spins up both the frontend and backend together:

```bash
npm run dev
```

Or run them separately if you prefer:

```bash
# frontend → http://localhost:3000
cd frontend && npm run dev

# backend  → http://localhost:1337/admin
cd backend && npm run develop
```

First time you run the backend, Strapi will ask you to create an admin account. Do that, then log in to the admin panel to start editing content.

To build static output of the frontend the way production does it:

```bash
cd frontend && npm run generate
```

## The backend, in detail

The backend is a fairly standard Strapi install with a handful of custom content types. Club members log in at `/admin`, edit content, and that's it — they never need to see this repo.

### Content types

| Content type | Kind | Fields |
| --- | --- | --- |
| **About** | single type | `content` — the about-us text. |
| **Member** | collection | `name`, `position`, `description`, `avatar`. |
| **Event** | collection | `eventId`, `title`, `description`, `date`, `location`, `cover`, `allowRegistration`, `imageUrl`. |
| **Magazine** | collection | `title`, `issue`, `url`, `cover`, `season` (an enum of semesters — see [adding magazines](#adding-magazines-for-a-new-year)). |
| **Credential** | collection | `credential_id`, `recipient_name`, `award`, `event_name`, `issue_date`, `issued_by`, `verification_url` — these power the certificate verification pages. |

Credentials have a lifecycle hook: if you don't give one a `credential_id`, it auto-generates one like `DA25-AB12CD` and fills in the public `verification_url` for you.

### API tokens

The frontend fetches content from Strapi at build time using a **read-only API token** (`STRAPI_TOKEN`). Create one under **Settings → API Tokens** in the Strapi admin, give it read access, and drop it into `frontend/.env`.

### Webhooks (the magic rebuild button)

Because the frontend is statically generated, editing content in Strapi doesn't change the live site on its own — the static files need to be regenerated. To handle that, there's a **webhook** configured in Strapi (**Settings → Webhooks**) pointing at a Vercel deploy hook. So whenever content is created, updated or deleted, Strapi pings Vercel, Vercel rebuilds the frontend, and the new content goes live a minute or two later. No code, no manual deploys.

### File uploads and emails

Two provider plugins are wired up in `backend/config/plugins.js`:

- **Uploads** go to Supabase bucket storage instead of the local disk, so images survive restarts and redeploys (`strapi-provider-upload-supabase`).
- **Emails** go out through Resend (`strapi-provider-email-resend`).

## The frontend, in detail

### Static vs. dynamic pages

This is the crux of the whole thing. Look at `frontend/nuxt.config.ts` — the `routeRules` decide what's prerendered and what's server-rendered:

- **Prerendered (static):** the homepage and the designathon pages. These pull their data at build time and ship as plain HTML.
- **SSR (dynamic):** `/dashboard`, `/login`, `/confirm` — anything that depends on who's logged in.
- **Redirects:** `/events`, `/about`, `/magazines`, `/members` just bounce to the relevant homepage anchor, and a few vanity routes (`/analytics`, `/status`) redirect off-site.

### Talking to the backend

The frontend never calls Strapi straight from the browser — that would leak the API token. Instead, the Nitro server routes under `frontend/server/api/` (e.g. `about.ts`, `events.ts`, `magazines.ts`, `members.ts`) do the fetching server-side with the token tucked away in runtime config, and hand back clean JSON.

### Talking to Supabase directly

For anything user-specific and live — event registrations, the organizer dashboard, the latest magazine lookup — the frontend uses the Supabase SDK directly. RLS policies on the database keep this safe: users can only see and do what they're allowed to. This skips Strapi entirely and is both faster and simpler for live data.

## Supabase, in detail

Supabase is doing a lot of heavy lifting:

- **Auth:** Google OAuth, restricted to RIT accounts. This is what gates the dashboard and event registration.
- **Database:** Postgres. Both Strapi (as its main DB) and the frontend (via the SDK) read from it. Relevant tables include `magazines`, event registrations, and `staff_members` (used to check who's allowed to export registration data).
- **Storage:** the buckets that hold uploaded images and media.
- **Edge function:** `supabase/functions/send-confirmation-email` is a Deno function that, when triggered, sends a registration confirmation email via Resend. It's fired by a database webhook when someone registers for an event.
- **RLS:** row-level security policies are what make it safe to query the database straight from the browser.

## Where everything is hosted

- **Frontend → Vercel.** Rebuilt automatically via the Strapi webhook whenever content changes. Config lives in `frontend/vercel.json`.
- **Backend → Render.** Config lives in `backend/render.yaml`.
- **Database, storage, auth, edge functions → Supabase.**

## Common tasks

### Adding magazines for a new year

This is the one that trips people up, because it touches both the backend and the frontend. The `season` field is an **enumeration**, so a brand-new semester (say, Spring 2027) has to be added in code before anyone can select it in the admin. Here's the full ritual:

1. **Add the new season(s) to the Strapi enum.** Open `backend/src/api/magazine/content-types/magazine/schema.json` and add the new semesters to the `season` enum:

   ```json
   "season": {
     "type": "enumeration",
     "enum": [
       "Spring 2024",
       "Fall 2024",
       "Spring 2025",
       "Fall 2025",
       "Spring 2026",
       "Fall 2026",
       "Spring 2027",
       "Fall 2027"
     ]
   }
   ```

   Save and let the backend redeploy (or restart it locally). The new option will now show up in the admin.

    Alternatively, you can also run Strapi in dev mode locally and edit type via the Content Manager.

2. **Create the magazine entry in Strapi.** In the admin panel, go to **Magazine → Create new entry** and fill in:
   - `title` — the magazine name (it's *Palette Perspectives*).
   - `issue` — the issue number (e.g. `7`).
   - `season` — pick the season you just added.
   - `url` — the Google Drive link to the magazine. The frontend turns this into an embedded Drive preview, so any standard Drive file link works.
   - `cover` — upload the cover image (it'll land in Supabase storage).

   Then **publish** it. The frontend reads magazines straight from Supabase, so it has to be published, not left as a draft.

3. **Add the tab on the homepage.** The homepage groups magazines into tabs by season, and those tabs are hardcoded in `frontend/pages/index.vue`. Two edits:

   - Add an entry to the `magazineTabs` array. The `slot` is the season lowercased with the space removed:

     ```js
     const magazineTabs = [
       { slot: "spring2027", label: "Spring 2027" },
       { slot: "fall2026",  label: "Fall 2026"  },
       // ...the existing ones
     ];
     ```

   - Add the matching template that renders that season's magazines, right next to the others in the `<UTabs>` block:

     ```vue
     <template #spring2027="{ item }">
       <MagazineList :magazines="magazineData.spring2027" />
     </template>
     ```

   The `magazineData` key (`spring2027`) is the season lowercased with spaces stripped — the `/api/magazines` route does this grouping for you, so just make sure the slot name matches.

That's it. The Strapi webhook will rebuild the frontend, and the new magazine shows up under its season tab. Each magazine also gets its own page at `/magazines/<season><issue>` (e.g. `/magazines/spring2027-7`).

### Adding an event

Events live entirely in Strapi — no code changes needed. Create an **Event** entry with a `title`, `description`, `date`, `location`, a `cover` image and an `eventId`. Set `allowRegistration` if you want people to be able to sign up (registrations are handled through Supabase, and a confirmation email goes out automatically via the edge function). Publish it, and the webhook does the rest.

### Adding or editing members

Same deal — go to **Member** in the Strapi admin, add a `name`, `position`, `description` and `avatar`, publish, and it'll appear in the members section after the rebuild.

## License

MIT — See `LICENSE.md`.
