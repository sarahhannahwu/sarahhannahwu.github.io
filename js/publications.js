/** Renders data/publications.json (array of published papers, newest first). */
Site.load("./data/publications.json", "publications-container", (container, papers) => {
  papers.forEach((paper) => container.appendChild(Site.paperCard(paper)));

  container.querySelectorAll(".paper").forEach((card) => {
    card.classList.add("publication-card");
    card.addEventListener("mouseenter", () => card.classList.add("is-hovered"));
    card.addEventListener("mouseleave", () => card.classList.remove("is-hovered"));
  });
});
