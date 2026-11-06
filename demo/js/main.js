(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const savedTheme = localStorage.getItem("cgr-theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "◐" : "☼";
      themeToggle.setAttribute(
        "aria-label",
        `Switch to ${theme === "dark" ? "light" : "dark"} mode`
      );
    }
  };

  setTheme(savedTheme || systemTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    localStorage.setItem("cgr-theme", nextTheme);
  });

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector("[data-menu-toggle]");

  menuToggle?.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  const dropdowns = document.querySelectorAll("[data-dropdown]");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector("[data-dropdown-toggle]");

    toggle?.addEventListener("click", (event) => {
      event.preventDefault();

      dropdowns.forEach((item) => {
        if (item !== dropdown) {
          item.classList.remove("open");
          item
            .querySelector("[data-dropdown-toggle]")
            ?.setAttribute("aria-expanded", "false");
        }
      });

      const isOpen = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-dropdown]")) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        dropdown
          .querySelector("[data-dropdown-toggle]")
          ?.setAttribute("aria-expanded", "false");
      });
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      header?.classList.remove("menu-open");

      if (menuToggle) {
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add("show"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  document.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });
})();
