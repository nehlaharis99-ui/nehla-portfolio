const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const tabs = document.querySelectorAll(".tab");
const projectCards = document.querySelectorAll(".project-card");
const revealTargets = document.querySelectorAll(
  ".section-heading, .about-grid p, .about-stats div, .skill-card, .project-tabs, .project-card, .timeline-item, .contact > div, .contact-card"
);

if (year) {
  year.textContent = new Date().getFullYear();
}

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.add("filtering");

      window.setTimeout(() => {
        card.classList.toggle("hidden", !shouldShow);

        if (shouldShow) {
          window.requestAnimationFrame(() => {
            card.classList.remove("filtering");
          });
        }
      }, 140);
    });
  });
});

revealTargets.forEach((target, index) => {
  target.classList.add("reveal", `delay-${(index % 3) + 1}`);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("visible"));
}
