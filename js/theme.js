/*
 * CGR — Shared light/dark theme
 *
 * Load in <head> before style.css.
 * Initial default: light.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "cgr-theme-v1";
  const root = document.documentElement;

  function readTheme() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "dark"
        ? "dark"
        : "light";
    } catch (error) {
      return "light";
    }
  }

  function updateButtons() {
    const dark = root.dataset.theme === "dark";

    document.querySelectorAll("[data-theme-toggle]")
      .forEach(function (button) {
        button.setAttribute("aria-pressed", String(dark));

        button.setAttribute(
          "aria-label",
          dark ? "Switch to light theme" : "Switch to dark theme"
        );

        const label = button.querySelector("[data-theme-label]");

        if (label) {
          label.textContent = dark ? "Light" : "Dark";
        }
      });

    const themeMeta = document.querySelector('meta[name="theme-color"]');

    if (themeMeta) {
      themeMeta.setAttribute(
        "content",
        dark ? "#101416" : "#f7f8fa"
      );
    }
  }

  function applyTheme(theme, save) {
    const selected = theme === "dark" ? "dark" : "light";

    root.dataset.theme = selected;
    updateButtons();

    if (save) {
      try {
        window.localStorage.setItem(STORAGE_KEY, selected);
      } catch (error) {
        /*
         * Theme switching still works on this page
         * if browser storage is unavailable.
         */
      }
    }
  }

  applyTheme(readTheme(), false);

  document.addEventListener("click", function (event) {
    const button = event.target.closest("[data-theme-toggle]");

    if (!button) {
      return;
    }

    applyTheme(
      root.dataset.theme === "dark" ? "light" : "dark",
      true
    );
  });

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      updateButtons,
      { once: true }
    );
  } else {
    updateButtons();
  }

  window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY || event.key === null) {
      applyTheme(readTheme(), false);
    }
  });
})();
