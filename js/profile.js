/** Renders data/profile.json into the About section, nav, title, and footer. */
Site.load("./data/profile.json", "profile-container", (container, profile) => {
  if (profile.name) {
    document.title = profile.name;
    const navName = document.getElementById("nav-name");
    if (navName) navName.textContent = profile.name;
    const navAvatar = document.getElementById("nav-avatar");
    if (navAvatar && profile.photoPath) {
      navAvatar.src = profile.photoPath;
      navAvatar.alt = `${profile.name} headshot`;
    }
    const footer = document.getElementById("footer-text");
    if (footer) {
      footer.textContent = `© ${new Date().getFullYear()} ${profile.name}`;
    }
  }

  const wrapper = Site.el("div", "profile");

  const body = Site.el("div", "profile-body");
  body.appendChild(Site.el("h1", null, profile.name || ""));

  const role = [profile.title, profile.affiliation].filter(Boolean).join(", ");
  if (role) body.appendChild(Site.el("p", "profile-role", role));

  (profile.bio || []).forEach((paragraph) => {
    body.appendChild(Site.el("p", "profile-bio", paragraph));
  });

  if (profile.links && profile.links.length) {
    const list = Site.el("ul", "profile-links");
    profile.links.forEach(({ label, url }) => {
      const li = document.createElement("li");
      li.appendChild(Site.profileLink(url, label));
      list.appendChild(li);
    });
    body.appendChild(list);
  }

  wrapper.appendChild(body);
  container.appendChild(wrapper);
});

Site.profileLink = (url, label) => {
  const iconMap = {
    "Google Scholar": `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3 2.5 8.5 12 14l7.5-4.3V15h1.5V8.5L12 3Zm-5.5 8.3V15c0 2.2 2.5 4 5.5 4s5.5-1.8 5.5-4v-3.7L12 15.6 6.5 11.3Z" />
      </svg>
    `,
    GitHub: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.4-1-.9-1.3-.9-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-2.4-.3-4.9-1.2-4.9-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .9a10.4 10.4 0 0 1 5.4 0c2.1-1.2 3-.9 3-.9.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.2-2.5 5.1-4.9 5.4.3.3.6.8.6 1.7v2.5c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
      </svg>
    `,
    Email: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.3l8 5.3 8-5.3V7H4Zm16 10V9.4l-7.4 4.9a1 1 0 0 1-1.2 0L4 9.4V17h16Z" />
      </svg>
    `,
    CV: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm7 1.5V8h3.5L14 4.5ZM8 11h8v1.5H8V11Zm0 3.5h8V16H8v-1.5Zm0 3.5h5v1.5H8V18Z" />
      </svg>
    `,
  };

  const link = Site.link(url, label);
  link.classList.add("profile-link");
  link.setAttribute("aria-label", label);
  link.title = label;

  const iconMarkup = iconMap[label];
  if (iconMarkup) {
    link.innerHTML = `${iconMarkup}<span class="sr-only">${label}</span>`;
  }

  return link;
};
