/** Renders data/ongoing_projects.json (array of ongoing projects). */
Site.load("./data/ongoing_projects.json", "projects-container", (container, projects) => {
  projects.forEach(({ title, description, url }) => {
    const item = Site.el("div", "item");
    const heading = Site.el("p", "item-title");
    if (url) heading.appendChild(Site.link(url, title));
    else heading.textContent = title;
    item.appendChild(heading);

    if (description) {
      item.appendChild(Site.el("p", "item-description", description));
    }
    container.appendChild(item);
  });
});
