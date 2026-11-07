# CampusCode — ReBuild '26 Round 2

A desktop-first, front-end-only redesign of the four CampusCode views in the ReBuild '26 brief: landing page, login, register, and student dashboard.

This is an independent prototype made with AI assistance. It is not an official CampusCode service.

## Run locally

Open index.html in a browser, or serve this folder with any static file server. There are no build steps or package dependencies.

## Demo interactions

- Home links move between the landing page, sign-in, registration, and hackathon list.
- Login and registration validate the form fields and open the dashboard with demo profile data.
- Dashboard navigation switches between Dashboard, My Events, Events, Submissions, Certificates, and Settings.
- Event registration, password visibility, notification feedback, and profile updates are local demo interactions.

The project uses mock data only. It does not connect to a backend, create real accounts, authenticate with Google or GitHub, or upload submissions. Demo profile and event state are stored in the current browser tab's session storage.

## Brand asset

The supplied four-screen reference image is kept in assets/design-reference.png. The header wordmark is displayed from the exact logo pixels visible in that reference image. Replace it with the original campuscode-logo.png asset if the organizer supplies it separately.

## Design direction

The layout follows the Round 2 reference: warm off-white canvas, white cards, thin neutral borders, bold Inter headings, small DM Mono labels, purple primary actions, lime accents, and a compact student dashboard with both My Events and Events.
