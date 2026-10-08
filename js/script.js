/* =========================================================
   CAFFEIINE
   Main JavaScript
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".nav-link");

    const searchToggle = document.querySelector(".search-toggle");
    const searchPanel = document.getElementById("searchPanel");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");

    const categoryButtons = document.querySelectorAll(".category-btn");
    const menuCards = document.querySelectorAll(".menu-card");

    const cartButtons = document.querySelectorAll(".add-cart");
    const wishlistButtons = document.querySelectorAll(".wishlist");

    const toast = document.getElementById("toast");
    const newsletterForm = document.getElementById("newsletterForm");

    const currentYear = document.getElementById("currentYear");


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    function toggleMobileMenu() {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMobileMenu);
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        });
    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll("main section[id]");

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const currentId = entry.target.getAttribute("id");

                navLinks.forEach((link) => {
                    const linkTarget = link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        linkTarget === `#${currentId}`
                    );
                });
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       SEARCH
       ===================================================== */

    function openSearch() {
        searchPanel.classList.add("open");

        setTimeout(() => {
            searchInput.focus();
        }, 250);
    }

    function closeSearchPanel() {
        searchPanel.classList.remove("open");
        searchInput.value = "";
    }

    if (searchToggle) {
        searchToggle.addEventListener("click", openSearch);
    }

    if (closeSearch) {
        closeSearch.addEventListener("click", closeSearchPanel);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSearchPanel();
        }
    });


    /* =====================================================
       MENU CATEGORY FILTER
       ===================================================== */

    categoryButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const selectedCategory = button.dataset.category;

            categoryButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            menuCards.forEach((card) => {

                const cardCategory = card.dataset.category;

                const shouldShow =
                    selectedCategory === "all" ||
                    selectedCategory === cardCategory;

                card.classList.toggle("hidden", !shouldShow);
            });

        });

    });


    /* =====================================================
       CART
       ===================================================== */

    let cartCount = 0;

    const cartCounter = document.querySelector(".cart-count");

    function showToast(message) {

        if (!toast) {
            return;
        }

        const toastText = toast.querySelector("span");

        if (toastText) {
            toastText.textContent = message;
        }

        toast.classList.add("show");

        clearTimeout(window.toastTimeout);

        window.toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }

    cartButtons.forEach((button) => {

        button.addEventListener("click", () => {

            cartCount++;

            if (cartCounter) {
                cartCounter.textContent = cartCount;
            }

            showToast("Added to your bag.");
        });

    });


    /* =====================================================
       WISHLIST
       ===================================================== */

    wishlistButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const icon = button.querySelector("i");

            button.classList.toggle("active");

            if (button.classList.contains("active")) {

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                showToast("Added to your favorites.");

            } else {

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

                showToast("Removed from your favorites.");
            }

        });

    });


    /* =====================================================
       NEWSLETTER
       ===================================================== */

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const emailInput = document.getElementById("email");

            if (!emailInput.value.trim()) {
                return;
            }

            showToast("You're on the Caffeiine list!");

            newsletterForm.reset();

        });

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       SEARCH INPUT
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const query = searchInput.value
                .toLowerCase()
                .trim();

            if (!query) {
                menuCards.forEach((card) => {
                    card.classList.remove("hidden");
                });

                return;
            }

            menuCards.forEach((card) => {

                const searchableText =
                    card.textContent.toLowerCase();

                card.classList.toggle(
                    "hidden",
                    !searchableText.includes(query)
                );

            });

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", (event) => {

        const clickedInsideNavigation =
            mainNav.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            mainNav.classList.contains("open") &&
            !clickedInsideNavigation &&
            !clickedMenuButton
        ) {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        }

    });


    /* =====================================================
       HEADER SHADOW ON SCROLL
       ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {
            header.style.boxShadow =
                "0 8px 30px rgba(69, 45, 29, 0.07)";
        } else {
            header.style.boxShadow = "none";
        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();

});