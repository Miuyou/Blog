(() => {
  const FILTER_PARAM = "category";

  const applyFilter = (category, root) => {
    const items = Array.from(document.querySelectorAll(".archive-article[data-post-category]"));
    const wraps = Array.from(document.querySelectorAll(".archives-wrap"));

    items.forEach((item) => {
      const current = item.getAttribute("data-post-category") || "";
      const show = category === "all" || current === category;
      item.classList.toggle("archive-article-hidden", !show);
    });

    wraps.forEach((wrap) => {
      const hasVisibleItem = wrap.querySelector(".archive-article:not(.archive-article-hidden)");
      wrap.classList.toggle("archives-wrap-hidden", !hasVisibleItem);
    });

    Array.from(root.querySelectorAll("[data-archive-filter]")).forEach((button) => {
      const selected = button.getAttribute("data-archive-filter") === category;
      button.classList.toggle("is-active", selected);
    });

    const url = new URL(window.location.href);
    if (category === "all") {
      url.searchParams.delete(FILTER_PARAM);
    } else {
      url.searchParams.set(FILTER_PARAM, category);
    }
    window.history.replaceState({}, "", url.toString());
  };

  const initArchiveFilter = () => {
    const root = document.querySelector("[data-archive-filter-menu]");
    if (!root) return;
    if (root.getAttribute("data-archive-filter-bound") === "1") return;
    root.setAttribute("data-archive-filter-bound", "1");

    const buttons = Array.from(root.querySelectorAll("[data-archive-filter]"));
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-archive-filter") || "all";
        applyFilter(category, root);
      });
    });

    const fromQuery = new URLSearchParams(window.location.search).get(FILTER_PARAM) || "all";
    const isValid = buttons.some((button) => button.getAttribute("data-archive-filter") === fromQuery);
    applyFilter(isValid ? fromQuery : "all", root);
  };

  window.addEventListener("DOMContentLoaded", initArchiveFilter);
  window.addEventListener("pjax:complete", initArchiveFilter);
})();
