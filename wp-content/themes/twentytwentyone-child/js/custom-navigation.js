document.addEventListener("DOMContentLoaded", function () {
  const menuWidget = document.querySelector(
    ".elementor-widget-wp-widget-nav_menu"
  );
  if (!menuWidget) {
    console.error("Menu widget not found");
    return;
  }

  const menuContainer = menuWidget.querySelector(".menu-main-menu-container");
  const menu = menuWidget.querySelector("#menu-main-menu");

  if (!menuContainer || !menu) {
    console.error("Menu elements not found");
    return;
  }

  // Create toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "mobile-menu-toggle";
  toggleBtn.innerHTML = `
        <span class="menu-icon">☰</span>
    `;
  toggleBtn.setAttribute("aria-expanded", "false");

  // Insert toggle button
  menuContainer.insertBefore(toggleBtn, menu);

  // Toggle function
  const toggleMenu = () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", !isExpanded);
    menu.classList.toggle("mobile-menu-open");

    // Update icon and text
    const icon = toggleBtn.querySelector(".menu-icon");
    const text = toggleBtn.querySelector(".menu-text");
    icon.textContent = isExpanded ? "☰" : "✕";
  };

  // Event listeners
  toggleBtn.addEventListener("click", toggleMenu);

  // Close when clicking menu items (mobile)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menu.classList.remove("mobile-menu-open");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.querySelector(".menu-icon").textContent = "☰";
    }
  });
});
