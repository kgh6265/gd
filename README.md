<img src="frontend/public/logo.png" width="100" height="100">

If you're able to read this top-secret codebase, then congratulations! You've been given access to the most horrendous collaboration of code and microservices to ever exist in the history of open-soure software. Fear not, this README details everything there is to know about this project.

![Website Screenshot](https://donutslove.your-homi.es/NEP3t7bTKk.jpg?key=CxADDOTu9ydRy0)

## But why did we make this?

Long before time began, there was the cube. Back then, The GD Club consisted of a very small team running on limited time and budget, and so they decided to create a website using Site123. The website served its purpose, but it did not represent the club or its visual identity well. Additionally, the free plan came with huge "Made with Site123" banners and an indecipherably long URL. Other clubs were starting to have their own websites and establish independent identities, and so the GD Club decided to do the same.

![Old Site123 website](https://donutslove.your-homi.es/8TPhfM7zb2.jpg?key=2JZvZNaIMnpZUp)

## How does it work?

I'm glad you asked. This monorepo, which was painstakingly crafted over the course of months, consists of two main components: the **frontend** and the **backend**. While making a website is relatively easier and simpler, making a website that lets people edit its contents without having to modify the website's source code makes it significantly more complex. 

The `frontend` folder is a Nuxt.js application that serves as the website itself. By default, pages are statically generated at build time, except for certain SSR pages such as the event pages and user dashboards, which are generated dynamically. Since most data in the backend isn't refreshed often, the frontend fetches the data at build time to render static pages. This makes it efficient without having to make API calls every time a user visits the website.

The `backend` folder is a Strapi application that serves as the content management system for the website. Users can log in to the backend to create, edit, and delete content such as events, blog posts, and pages. The backend also provides an API for the frontend to fetch data from. **Any updates made here will trigger a webhook to rebuild the frontend.**

All of this is made possible because of our wonderful database host, Supabase. Supabase's free tier provides generous amounts of both database and bucket storage, which powers the backend, allowing users to upload images and other media to the website. Utilizing the Supabase SDK allows for the frontend to skip the middleman and directly fetch data from the database, which is faster and secure due to various RLS policies. Additionally, Supabase's authentication is used to allow only RIT users access via Google OAuth. 
Resend powers our automated emails from Supabase, which are triggered when users register for an event, sending them a confirmation email with their registration details. This is done through a webhook that triggers a Supabase Edge Function to send the email.



### Todo

- [X] Redirect cookies
- [ ] Save to calendar
- [X] Direct redirects to events, content, etc
- [X] Dashboard for organizers
- [X] Confirmation emails
- [X] Page animations
- [ ] Export to spreadsheet, copy participant emails etc etc
- [X] 404 pages
- [X] Analytics
- [X] Link to website submissions
- [ ] Switch to Google Map alternative
- [ ] Convert directly to UTC+4
- [ ] Configure primary colors

Security bugs

- [X] Prevent registering after event is over
- [X] Ensure redirection path is relative and not absolute
- [ ] Eventually switch to HTTP cookies - currently HTTP-only set to false
- [ ] CORS policies for the API