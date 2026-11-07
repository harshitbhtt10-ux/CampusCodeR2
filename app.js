const app = document.querySelector("#app");
const toastNode = document.querySelector("#toast");

const iconPaths = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7.5 3v4m9-4v4M4 9h16m-12 4h2m3 0h2m-7 4h2"/>',
  users: '<path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20m7-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-7.6a4 4 0 0 1 0 7.7m2 3a4 4 0 0 1 3 3.9V20"/>',
  upload: '<path d="M12 15V3m-4 4 4-4 4 4M4 14v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6"/>',
  trophy: '<path d="M8 21h8m-4-4v4m-6-18h12v5a6 6 0 0 1-12 0V3Zm12 2h3v2a4 4 0 0 1-4 4M6 5H3v2a4 4 0 0 0 4 4"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 4v3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  eye: '<path d="M2.5 12s3.2-6 9.5-6 9.5 6 9.5 6-3.2 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/>',
  bell: '<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  certificate: '<circle cx="12" cy="8" r="5"/><path d="m8 12-1 9 5-3 5 3-1-9M10 8l1.3 1.3L14.5 6"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z"/>',
  logout: '<path d="m10 17 5-5-5-5m5 5H3m9-9h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/>'
};

const defaultEvents = [
  { id: "rebuild", name: "ReBuild '26", description: "Recreate & Rebuild Hackathon", date: "Nov 6 – Nov 7, 2026", status: "Ongoing", joined: true, action: "Submit" },
  { id: "innovate", name: "Campus Innovate", description: "UI/UX Design Challenge", date: "Nov 20, 2026", status: "Upcoming", joined: true, action: "View" },
  { id: "ai", name: "AI Hackathon", description: "Build AI-powered campus solutions", date: "Nov 15 – Nov 16, 2026", status: "Upcoming", joined: false, action: "Register" },
  { id: "web", name: "Web Revamp Challenge", description: "Redesign a real product's UI", date: "Nov 22 – Nov 23, 2026", status: "Upcoming", joined: false, action: "Register" }
];

function icon(name, className) {
  return '<svg class="' + (className || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (iconPaths[name] || "") + '</svg>';
}

function readSession() {
  try {
    return JSON.parse(sessionStorage.getItem("campuscode-demo-user") || "{}");
  } catch {
    return {};
  }
}

function readEvents() {
  try {
    const saved = JSON.parse(sessionStorage.getItem("campuscode-demo-events") || "null");
    return Array.isArray(saved) ? saved : defaultEvents.map((event) => ({ ...event }));
  } catch {
    return defaultEvents.map((event) => ({ ...event }));
  }
}

function escapeHTML(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

let events = readEvents();
let toastTimer;

function showToast(message) {
  toastNode.textContent = message;
  toastNode.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastNode.classList.remove("show"), 2800);
}

function brand() {
  return '<a class="brand" href="#/home" aria-label="CampusCode home"><span class="brand-crop" role="img" aria-label="CampusCode"></span></a>';
}

function header(route, section) {
  if (route === "login" || route === "register") {
    return '<header class="site-header auth-header">' + brand() + '<a class="back-home" href="#/home">← <span>Back to Home</span></a></header>';
  }
  if (route === "dashboard") {
    const active = section === "events" ? "hackathons" : "dashboard";
    return '<header class="dashboard-header">' + brand() +
      '<nav class="dash-top-nav" aria-label="Main navigation">' +
      '<a class="' + (active === "dashboard" ? "active" : "") + '" href="#/dashboard">' + icon("home") + 'Dashboard</a>' +
      '<a class="' + (active === "hackathons" ? "active" : "") + '" href="#/dashboard/events">' + icon("trophy") + 'Hackathons</a>' +
      '<a href="#/dashboard/ai-tools" data-demo-feature="AI Tools">' + icon("grid") + 'AI Tools</a>' +
      '<a href="#/dashboard/community" data-demo-feature="Community">' + icon("users") + 'Community</a></nav>' +
      '<div class="dash-tools"><button class="nav-icon" type="button" data-notifications aria-label="Notifications">' + icon("bell") + '<span class="notification-dot"></span></button>' +
      '<button class="avatar" type="button" data-profile aria-label="Profile menu">' + escapeHTML((readSession().name || "Harshit").slice(0, 1).toUpperCase()) + '</button></div></header>';
  }
  return '<header class="site-header">' + brand() +
    '<nav class="primary-nav" id="primary-nav" aria-label="Main navigation">' +
    '<a class="' + (section !== "events" ? "active" : "") + '" href="#/home">Home</a>' +
    '<a class="' + (section === "events" ? "active" : "") + '" href="#/home/events">Hackathons</a>' +
    '<a href="#/home/community" data-demo-feature="Community">Community</a>' +
    '<a href="#/home/about" data-demo-feature="About">About</a>' +
    '<a class="mobile-only" href="#/login">Login</a><a class="mobile-only" href="#/register">Register</a></nav>' +
    '<div class="header-actions"><a class="btn btn-outline btn-small" href="#/login">Login</a><a class="btn btn-primary btn-small" href="#/register">Register</a>' +
    '<button class="mobile-menu" type="button" aria-label="Toggle navigation" aria-expanded="false" data-menu>' + icon("grid") + '</button></div></header>';
}

function eventMark() {
  return '<span class="event-mark" aria-hidden="true"></span>';
}

function statusPill(status) {
  const className = status === "Ongoing" ? "status-live" : "status-next";
  return '<span class="status-pill ' + className + '">' + escapeHTML(status) + '</span>';
}

function eventCard(event) {
  return '<article class="event-card">' + eventMark() + '<div class="event-main"><div class="event-title-row"><strong>' + escapeHTML(event.name) + '</strong>' + statusPill(event.status) + '</div>' +
    '<div class="event-meta">' + icon("calendar") + escapeHTML(event.date) + '</div></div></article>';
}

function feature(iconName, title, copy) {
  return '<div class="feature"><span class="feature-icon">' + icon(iconName) + '</span><span><strong>' + title + '</strong><small>' + copy + '</small></span></div>';
}

function laptopArt() {
  return '<div class="hero-art" aria-label="CampusCode project workspace illustration">' +
    '<div class="hero-glow"></div><span class="hero-slash one"></span><span class="hero-slash two"></span>' +
    '<span class="float-chip code" aria-hidden="true">&lt;/&gt;</span><span class="float-chip calendar" aria-hidden="true">' + icon("calendar") + '</span>' +
    '<span class="float-chip trophy" aria-hidden="true">' + icon("trophy") + '</span>' +
    '<div class="laptop"><div class="laptop-screen"><div class="screen-content"><div class="screen-top"><span class="screen-dots"><i></i><i></i><i></i></span><span class="screen-line"></span></div>' +
    '<div class="screen-logo"><span class="screen-mark" aria-hidden="true"></span><b>CAMPUSCODE</b></div><div class="screen-cards"><span></span><span></span><span></span></div></div></div><div class="laptop-base"></div></div>' +
    '<span class="hero-caption">IDEAS · PEOPLE · PRODUCTS · INNOVATION</span></div>';
}

function renderHome(section) {
  const eventCards = defaultEvents.slice(0, 3).map(eventCard).join("");
  return '<div class="site-shell">' + header("home", section) +
    '<main><section class="hero-wrap"><div class="hero-copy"><span class="eyebrow"><span>ReBuild ’26</span><span class="dot"></span><span>Nov 6 – 7</span></span>' +
    '<h1>Discover Hackathons.<br>Build Projects.<br>Compete. <span class="highlight">Ship.</span></h1>' +
    '<p>The digital home for student innovation.<br>Run, join and manage hackathons — all in one place.</p>' +
    '<div class="hero-actions"><a class="btn btn-primary" href="#/home/events">Explore Hackathons ' + icon("arrow") + '</a><a class="btn btn-outline" href="#/register">Join CampusCode</a></div></div>' +
    laptopArt() + '</section><section class="feature-row" aria-label="CampusCode features">' +
    feature("calendar", "Find Hackathons", "Explore campus & national events") +
    feature("users", "Build & Submit", "Turn your ideas into projects") +
    feature("grid", "Compete", "Track rounds & results") +
    feature("certificate", "Get Certified", "Verifiable certificates & ID") +
    '</section><section class="section-block" id="upcoming-hackathons"><div class="section-head"><h2 class="section-title">Upcoming Hackathons</h2>' +
    '<a class="text-link" href="#/home/events">View All ' + icon("arrow") + '</a></div><div class="event-grid">' + eventCards + '</div></section></main>' +
    '<footer class="page-footer"><span>© 2026 CAMPUSCODE</span><span>BUILD · COMPETE · SHIP · CHENNAI, INDIA</span></footer></div>';
}

function campusIllustration() {
  return '<div class="campus-art" aria-hidden="true"><span class="cloud left"></span><span class="cloud right"></span><svg viewBox="0 0 500 230" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M45 203h410" stroke="#7665ff" stroke-width="2"/><path d="M115 203v-78h110v78M90 125l80-54 80 54M140 203v-45h55v45M260 203V98h105v105M241 99l72-53 72 53M286 124h18v23h-18zm36 0h19v23h-19zM285 166h52v37h-52z" stroke="#7665ff" stroke-width="2.4" stroke-linejoin="round"/>' +
    '<path d="M171 71v-31h20v44M312 46V25h18v35" stroke="#a8e62e" stroke-width="3"/><path d="M58 203v-35m0 0c-17-8-17-28 0-37 17 9 17 29 0 37Zm378 35v-36m0 0c-16-8-16-27 0-36 16 9 16 28 0 36Z" stroke="#82b91a" stroke-width="2.5"/>' +
    '<path d="M125 125h100m35-26h105" stroke="#d5ccff" stroke-width="1.5" stroke-dasharray="4 6"/></svg></div>';
}

function authStory(kind) {
  if (kind === "register") {
    return '<section class="auth-story"><span class="eyebrow">Create Account</span><h1>Join the<br>CampusCode <span class="highlight">Community.</span></h1>' +
      '<p>Be part of a student-first hackathon platform built for builders like you.</p>' + campusIllustration() + '</section>';
  }
  return '<section class="auth-story"><h1>Build.<br>Compete.<br>Ship. Together<br>on <span class="highlight">CampusCode.</span></h1>' +
    '<ul class="check-list"><li><span class="check">✓</span>Join hackathons</li><li><span class="check">✓</span>Submit your projects</li><li><span class="check">✓</span>Track results & get certified</li></ul>' +
    campusIllustration() + '</section>';
}

function field(name, label, placeholder, type, iconName, extra) {
  const isPassword = type === "password";
  return '<div class="form-field"><label for="' + name + '">' + label + '</label><div class="input-wrap">' + icon(iconName, "input-icon") +
    '<input id="' + name + '" name="' + name + '" type="' + type + '" placeholder="' + placeholder + '"' + (extra || "") + ' required>' +
    (isPassword ? '<button class="eye-toggle" type="button" aria-label="Show password" data-password="' + name + '">' + icon("eye") + '</button>' : '') + '</div></div>';
}

function renderLogin() {
  return '<div class="site-shell">' + header("login") + '<main class="auth-shell">' + authStory("login") +
    '<section class="auth-card"><h2>Login to your account</h2><p class="card-subtitle">Access your CampusCode dashboard</p>' +
    '<form id="login-form">' + field("login-id", "CampusCode ID / Email", "Enter your CampusCode ID or email", "text", "mail", ' autocomplete="username"') +
    field("login-password", "Password", "Enter your password", "password", "lock", ' minlength="8" autocomplete="current-password"') +
    '<div class="forgot-row"><button type="button" data-forgot>Forgot password?</button></div>' +
    '<button class="btn btn-primary form-submit" type="submit">Login ' + icon("arrow") + '</button>' +
    '<div class="divider">or continue with</div><div class="social-row"><button class="social-btn" type="button" data-social="Google">🌐 &nbsp; Continue with Google</button><button class="social-btn" type="button" data-social="GitHub">◉ &nbsp; Continue with GitHub</button></div>' +
    '<p class="form-foot">Don’t have an account? <a href="#/register">Register now</a></p></form></section></main>' +
    '<footer class="page-footer"><span>© 2026 CAMPUSCODE</span><span>BUILD · COMPETE · SHIP</span></footer></div>';
}

function renderRegister() {
  return '<div class="site-shell">' + header("register") + '<main class="auth-shell register">' + authStory("register") +
    '<section class="auth-card"><h2>Create your account</h2><p class="card-subtitle">Register and start building today.</p>' +
    '<form id="register-form">' + field("full-name", "Full Name", "Enter your full name", "text", "users", ' autocomplete="name"') +
    field("campus-id", "CampusCode ID (Unique)", "e.g. CC12345", "text", "grid", ' pattern="CC[0-9]{4,}" title="Use CC followed by at least four digits" autocomplete="username"') +
    field("register-email", "Email", "Enter your email", "email", "mail", ' autocomplete="email"') +
    field("register-password", "Password", "Create a strong password", "password", "lock", ' minlength="8" autocomplete="new-password"') +
    '<small class="password-hint">Use at least 8 characters.</small><label class="terms-row"><input name="terms" type="checkbox" required><span>I agree to the <a href="#/terms" data-demo-feature="Terms of Service">Terms of Service</a> and <a href="#/privacy" data-demo-feature="Privacy Policy">Privacy Policy</a></span></label>' +
    '<button class="btn btn-primary form-submit" type="submit">Register ' + icon("arrow") + '</button><p class="form-foot">Already have an account? <a href="#/login">Login</a></p></form></section></main>' +
    '<footer class="page-footer"><span>© 2026 CAMPUSCODE</span><span>BUILD · COMPETE · SHIP</span></footer></div>';
}

function dashboardUser() {
  const user = readSession();
  return {
    name: user.name || "Harshit",
    id: user.id || "CC12876",
    initials: (user.name || "Harshit").trim().slice(0, 1).toUpperCase()
  };
}

function sidebar(section, user) {
  const links = [
    ["dashboard", "home", "Dashboard"],
    ["my-events", "calendar", "My Events"],
    ["events", "trophy", "Events"],
    ["submissions", "upload", "Submissions"],
    ["certificates", "certificate", "Certificates"],
    ["settings", "settings", "Settings"]
  ];
  return '<aside class="sidebar"><div class="profile-row"><span class="profile-avatar">' + escapeHTML(user.initials) + '</span><span class="profile-copy"><strong>' + escapeHTML(user.name) + '</strong><small>' + escapeHTML(user.id) + '</small></span></div>' +
    '<nav class="side-nav" aria-label="Dashboard navigation">' + links.map(([key, iconName, label]) =>
      '<a class="' + (section === key ? "active" : "") + '" href="#/dashboard/' + key + '">' + icon(iconName) + label + '</a>'
    ).join("") + '</nav><div class="side-tagline">BUILD – COMPETE – SHIP</div></aside>';
}

function stats() {
  const joined = events.filter((event) => event.joined).length;
  return '<section class="stat-grid" aria-label="Your activity">' +
    '<article class="stat-card"><span class="stat-icon">' + icon("calendar") + '</span><span><strong>' + joined + '</strong><small>My Events</small></span></article>' +
    '<article class="stat-card"><span class="stat-icon">' + icon("trophy") + '</span><span><strong>' + events.filter((event) => !event.joined).length + '</strong><small>Upcoming Events</small></span></article>' +
    '<article class="stat-card"><span class="stat-icon">' + icon("grid") + '</span><span><strong>1</strong><small>Submissions</small></span></article>' +
    '<article class="stat-card"><span class="stat-icon lime">' + icon("certificate") + '</span><span><strong>3</strong><small>Certificates</small></span></article></section>';
}

function myEventItem(event) {
  return '<article class="my-event-card"><div class="my-event-top"><div>' + statusPill(event.status) + '<h3>' + escapeHTML(event.name) + '</h3><p>' + escapeHTML(event.description) + '</p></div>' +
    '<button class="btn ' + (event.action === "Submit" ? "btn-primary" : "btn-outline") + ' btn-small" type="button" data-event-action="' + event.id + '">' + escapeHTML(event.action === "Submit" ? "Submit" : "View") + '</button></div>' +
    '<div class="my-event-bottom"><span class="date-line">' + icon("calendar") + escapeHTML(event.date) + '</span><span class="status-pill status-joined">Registered</span></div></article>';
}

function eventListItem(event) {
  return '<article class="event-list-item"><div>' + statusPill(event.status) + '<h3>' + escapeHTML(event.name) + '</h3><p>' + escapeHTML(event.description) + '</p></div>' +
    '<button class="btn ' + (event.joined ? "btn-outline" : "btn-primary") + ' btn-small" type="button" data-toggle-event="' + event.id + '">' + (event.joined ? "View" : "Register") + '</button>' +
    '<span class="date-line">' + icon("calendar") + escapeHTML(event.date) + '</span></article>';
}

function homeDashboardContent() {
  const myEvents = events.filter((event) => event.joined);
  const otherEvents = events.filter((event) => !event.joined);
  return '<div class="dashboard-view visible"><div class="dash-panels"><section class="dash-panel"><div class="panel-heading"><h2>My Events</h2><a class="text-link" href="#/dashboard/my-events">View All ' + icon("arrow") + '</a></div>' +
    (myEvents.length ? myEvents.map(myEventItem).join("") : '<div class="dashboard-empty"><span class="empty-icon">＋</span><h2>No events yet</h2><p>Join an event to see it here.</p><a class="btn btn-primary btn-small" href="#/dashboard/events">Explore Events</a></div>') +
    '</section><section class="dash-panel"><div class="panel-heading"><h2>Events</h2><a class="text-link" href="#/dashboard/events">View All ' + icon("arrow") + '</a></div><div class="events-list">' +
    (otherEvents.length ? otherEvents.slice(0, 2).map(eventListItem).join("") : '<p class="card-subtitle">You’re all caught up. Check back for new events.</p>') + '</div></section></div></div>';
}

function dashboardSectionContent(section) {
  if (section === "dashboard" || section === "home") return homeDashboardContent();
  if (section === "my-events") {
    const joined = events.filter((event) => event.joined);
    return '<section class="dash-panel"><div class="panel-heading"><h2>My Events</h2><a class="text-link" href="#/dashboard/events">Explore Events ' + icon("arrow") + '</a></div>' +
      (joined.length ? joined.map(myEventItem).join("") : '<div class="dashboard-empty"><span class="empty-icon">＋</span><h2>No events yet</h2><p>Register for a hackathon to keep its schedule and submissions in one place.</p><a class="btn btn-primary btn-small" href="#/dashboard/events">Explore Events</a></div>') + '</section>';
  }
  if (section === "events") {
    return '<section class="dash-panel"><div class="panel-heading"><h2>Explore Events</h2><span class="status-pill status-next">Open for students</span></div><div class="events-list">' + events.map(eventListItem).join("") + '</div></section>';
  }
  if (section === "submissions") {
    return '<section class="dash-panel"><div class="panel-heading"><h2>Submissions</h2><span class="status-pill status-next">Demo data</span></div><article class="event-list-item"><div><span class="status-pill status-live">Submitted</span><h3>ReBuild ’26 — Round 1</h3><p>CampusCode four-page recreation</p></div><button class="btn btn-outline btn-small" type="button" data-demo-feature="Submission details">View</button><span class="date-line">' + icon("calendar") + 'Nov 6, 2026</span></article></section>';
  }
  if (section === "certificates") {
    return '<section class="dash-panel"><div class="panel-heading"><h2>Certificates</h2><span class="status-pill status-next">3 available</span></div><div class="dashboard-empty"><span class="empty-icon">✓</span><h2>Your achievements live here</h2><p>Downloadable certificates and your verification ID are shown in this demo view.</p><button class="btn btn-outline btn-small" type="button" data-demo-feature="Certificate download">View certificates</button></div></section>';
  }
  if (section === "settings") {
    return '<section class="dash-panel"><div class="panel-heading"><h2>Settings</h2></div><div class="form-field"><label for="profile-name">Display name</label><div class="input-wrap"><input id="profile-name" value="' + escapeHTML(dashboardUser().name) + '"></div></div><button class="btn btn-primary btn-small" type="button" data-save-profile>Save changes</button></section>';
  }
  return '<section class="dash-panel"><div class="dashboard-empty"><span class="empty-icon">✦</span><h2>' + escapeHTML(section.replace(/-/g, " ")) + '</h2><p>This preview keeps the core hackathon flow focused on your events, registrations, and submissions.</p><a class="btn btn-outline btn-small" href="#/dashboard">Back to Dashboard</a></div></section>';
}

function renderDashboard(section) {
  const user = dashboardUser();
  const title = section === "events" ? "Hackathons" : section === "my-events" ? "My Events" : section[0].toUpperCase() + section.slice(1);
  return '<div class="dashboard-shell">' + header("dashboard", section) + '<main class="dashboard-body">' + sidebar(section, user) +
    '<section class="dashboard-main"><div class="dash-title-row"><div><h1>' + (section === "dashboard" ? 'Welcome Back, ' + escapeHTML(user.name) + ' 👋' : escapeHTML(title)) +
    '</h1><p>' + (section === "dashboard" ? 'Track your hackathons, submissions and achievements.' : 'Keep your CampusCode activity moving.') + '</p></div><span class="dash-decoration" aria-hidden="true"><i></i><i></i><i></i></span></div>' +
    stats() + dashboardSectionContent(section) + '</section></main><footer class="page-footer"><span>© 2026 CAMPUSCODE</span><span>BUILD · COMPETE · SHIP</span></footer></div>';
}

function routeInfo() {
  const routeParts = (location.hash.replace(/^#\/?/, "") || "home").split("/");
  return { route: routeParts[0], section: routeParts[1] || "dashboard" };
}

function render() {
  const { route, section } = routeInfo();
  if (route === "login") app.innerHTML = renderLogin();
  else if (route === "register") app.innerHTML = renderRegister();
  else if (route === "dashboard") app.innerHTML = renderDashboard(section);
  else app.innerHTML = renderHome(section);
  bindInteractions();
  if (route === "home" && section === "events") {
    window.setTimeout(() => document.querySelector("#upcoming-hackathons")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }
}

function storeUser(name, id, email) {
  sessionStorage.setItem("campuscode-demo-user", JSON.stringify({ name, id, email }));
}

function saveEvents() {
  sessionStorage.setItem("campuscode-demo-events", JSON.stringify(events));
}

function bindInteractions() {
  const menu = document.querySelector("[data-menu]");
  if (menu) {
    menu.addEventListener("click", () => {
      const nav = document.querySelector("#primary-nav");
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-password]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.password);
      const reveal = input.type === "password";
      input.type = reveal ? "text" : "password";
      button.setAttribute("aria-label", reveal ? "Hide password" : "Show password");
    });
  });

  document.querySelectorAll("[data-demo-feature]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(button.dataset.demoFeature + " is a preview-only section.");
    });
  });

  document.querySelectorAll("[data-social]").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.social + " sign-in is a demo preview."));
  });

  const forgot = document.querySelector("[data-forgot]");
  if (forgot) {
    forgot.addEventListener("click", () => {
      const value = document.querySelector("#login-id").value.trim();
      showToast(value ? "Password reset flow is a demo for " + value + "." : "Enter your CampusCode ID or email first.");
    });
  }

  const login = document.querySelector("#login-form");
  if (login) {
    login.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!login.reportValidity()) return;
      const identifier = document.querySelector("#login-id").value.trim();
      const name = identifier.includes("@") ? identifier.split("@")[0].replace(/[._-]/g, " ") : "Harshit";
      storeUser(name.split(" ").map((part) => part ? part[0].toUpperCase() + part.slice(1) : "").join(" "), identifier.startsWith("CC") ? identifier : "CC12876", identifier);
      location.hash = "#/dashboard";
      showToast("Welcome back. You’re signed in to the demo.");
    });
  }

  const register = document.querySelector("#register-form");
  if (register) {
    register.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!register.reportValidity()) return;
      const name = document.querySelector("#full-name").value.trim();
      const id = document.querySelector("#campus-id").value.trim();
      const email = document.querySelector("#register-email").value.trim();
      storeUser(name, id, email);
      location.hash = "#/dashboard";
      showToast("Your demo account is ready, " + name.split(" ")[0] + ".");
    });
  }

  document.querySelectorAll("[data-toggle-event]").forEach((button) => {
    button.addEventListener("click", () => {
      const event = events.find((item) => item.id === button.dataset.toggleEvent);
      if (!event) return;
      if (event.joined) {
        showToast(event.name + " is in My Events.");
        return;
      }
      event.joined = true;
      event.action = "View";
      saveEvents();
      showToast("You’re registered for " + event.name + ".");
      render();
    });
  });

  document.querySelectorAll("[data-event-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const event = events.find((item) => item.id === button.dataset.eventAction);
      if (event && event.action === "Submit") showToast("Submission flow is a demo preview. No files are uploaded.");
      else showToast((event?.name || "Event") + " details are shown in this demo.");
    });
  });

  const notifications = document.querySelector("[data-notifications]");
  if (notifications) notifications.addEventListener("click", () => showToast("You’re all caught up."));
  const profile = document.querySelector("[data-profile]");
  if (profile) profile.addEventListener("click", () => {
    const user = readSession();
    if (user.name) {
      sessionStorage.removeItem("campuscode-demo-user");
      showToast("You’ve signed out of the demo.");
      location.hash = "#/home";
    } else showToast("Profile menu is a demo preview.");
  });

  const saveProfile = document.querySelector("[data-save-profile]");
  if (saveProfile) {
    saveProfile.addEventListener("click", () => {
      const user = readSession();
      const field = document.querySelector("#profile-name");
      if (!field.value.trim()) {
        showToast("Add a display name before saving.");
        return;
      }
      storeUser(field.value.trim(), user.id || "CC12876", user.email || "");
      showToast("Your demo profile was updated.");
      render();
    });
  }
}

window.addEventListener("hashchange", render);
if (!location.hash) location.hash = "#/home";
render();
