(() => {
  const FILTER_PARAM = "category";

  const syncButtons = (root, attrName, selected) => {
    Array.from(root.querySelectorAll(`[${attrName}]`)).forEach((button) => {
      const active = button.getAttribute(attrName) === selected;
      button.classList.toggle("is-active", active);
    });
  };

  const initArchiveFilter = () => {
    const root = document.querySelector("[data-archive-filter-menu]");
    if (!root || root.getAttribute("data-filter-bound") === "1") return;
    root.setAttribute("data-filter-bound", "1");

    const buttons = Array.from(root.querySelectorAll("[data-archive-filter]"));
    const items = Array.from(document.querySelectorAll(".archive-article[data-post-category]"));
    const wraps = Array.from(document.querySelectorAll(".archives-wrap"));
    if (!buttons.length || !items.length) return;

    const apply = (category) => {
      items.forEach((item) => {
        const current = item.getAttribute("data-post-category") || "";
        const show = category === "all" || current === category;
        item.classList.toggle("archive-article-hidden", !show);
      });

      wraps.forEach((wrap) => {
        const hasVisibleItem = wrap.querySelector(".archive-article:not(.archive-article-hidden)");
        wrap.classList.toggle("archives-wrap-hidden", !hasVisibleItem);
      });

      syncButtons(root, "data-archive-filter", category);
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-archive-filter") || "all";
        apply(category);
      });
    });

    const fromQuery = new URLSearchParams(window.location.search).get(FILTER_PARAM) || "all";
    const valid = buttons.some((b) => b.getAttribute("data-archive-filter") === fromQuery);
    apply(valid ? fromQuery : "all");
  };

  const initHomeFilter = () => {
    const root = document.querySelector("[data-home-filter-menu]");
    if (!root || root.getAttribute("data-filter-bound") === "1") return;
    root.setAttribute("data-filter-bound", "1");

    const buttons = Array.from(root.querySelectorAll("[data-home-filter]"));
    const items = Array.from(document.querySelectorAll(".home-post-item[data-post-category]"));
    if (!buttons.length || !items.length) return;

    const apply = (category) => {
      items.forEach((item) => {
        const current = item.getAttribute("data-post-category") || "";
        const show = category === "all" || current === category;
        item.classList.toggle("home-post-item-hidden", !show);
      });

      syncButtons(root, "data-home-filter", category);

      const url = new URL(window.location.href);
      if (category === "all") {
        url.searchParams.delete(FILTER_PARAM);
      } else {
        url.searchParams.set(FILTER_PARAM, category);
      }
      window.history.replaceState({}, "", url.toString());
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-home-filter") || "all";
        apply(category);
      });
    });

    const fromQuery = new URLSearchParams(window.location.search).get(FILTER_PARAM) || "all";
    const valid = buttons.some((b) => b.getAttribute("data-home-filter") === fromQuery);
    apply(valid ? fromQuery : "all");
  };

  const boot = () => {
    initArchiveFilter();
    initHomeFilter();
  };

  window.addEventListener("DOMContentLoaded", boot);
  window.addEventListener("pjax:complete", boot);
})();
