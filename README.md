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

The header wordmark and decorative slash marks use a pixel crop from the supplied four-screen reference image, stored as assets/brand-crop.png. The attached PDF did not contain an embedded logo file and no separate campuscode-logo.png was present in the workspace. The crop preserves the logo pixels shown in the user's reference; replace it with the original logo asset if the organizer supplies it.

## Design direction

The layout follows the Round 2 reference: warm off-white canvas, white cards, thin neutral borders, bold Inter headings, small DM Mono labels, purple primary actions, lime accents, and a compact student dashboard with both My Events and Events.
