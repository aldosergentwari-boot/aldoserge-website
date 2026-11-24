(() => {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const scrollProgress = document.getElementById("scrollProgress");
  const typedText = document.getElementById("typedText");
  const year = document.getElementById("currentYear");

  // Mobile navigation
  const closeMenu = () => {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    mainNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      mainNav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) closeMenu();
    });
  }

  // Scroll progress indicator
  const updateProgress = () => {
    if (!scrollProgress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.width = progress + "%";
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Reveal content once it enters the viewport
  const revealTargets = document.querySelectorAll(
    ".section-label, .about-grid, .about-facts, .project-card, .skill-group, .skills-footnote, .contact-inner"
  );

  revealTargets.forEach((element) => element.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }

  // Lightweight typing effect
  if (typedText) {
    const phrases = [
      "technology.",
      "web development.",
      "artificial intelligence.",
      "cybersecurity."
    ];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      typedText.textContent = phrases[0];
    } else {
      let phraseIndex = 0;
      let characterIndex = 0;
      let deleting = false;

      const typeLoop = () => {
        const phrase = phrases[phraseIndex];

        if (!deleting) {
          characterIndex += 1;
          typedText.textContent = phrase.slice(0, characterIndex);

          if (characterIndex === phrase.length) {
            deleting = true;
            window.setTimeout(typeLoop, 1450);
            return;
          }
        } else {
          characterIndex -= 1;
          typedText.textContent = phrase.slice(0, characterIndex);

          if (characterIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
          }
        }

        window.setTimeout(typeLoop, deleting ? 38 : 78);
      };

      window.setTimeout(typeLoop, 500);
    }
  }

  if (year) year.textContent = new Date().getFullYear();
})();