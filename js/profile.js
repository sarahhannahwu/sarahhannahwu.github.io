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
      li.appendChild(Site.link(url, label));
      list.appendChild(li);
    });
    body.appendChild(list);
  }

  wrapper.appendChild(body);
  container.appendChild(wrapper);
});
