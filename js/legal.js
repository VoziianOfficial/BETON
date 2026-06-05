'use strict';

(function () {
    function initLegalReveal() {
        const items = document.querySelectorAll(
            '.legal-sidebar, .legal-document, .legal-block, .legal-nav-card'
        );

        if (!items.length) {
            return;
        }

        if (!('IntersectionObserver' in window)) {
            items.forEach((item) => item.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.12
        });

        items.forEach((item, index) => {
            item.classList.add('legal-reveal');
            item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
            observer.observe(item);
        });
    }

    function initLegalSidebarScroll() {
        const sidebarLinks = document.querySelectorAll('.legal-sidebar a[href^="#"]');

        sidebarLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');

                if (!targetId || targetId === '#') {
                    return;
                }

                const target = document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header = document.querySelector('.site-header');
                const headerOffset = header ? header.offsetHeight + 18 : 18;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            });
        });
    }

    function initActiveLegalSection() {
        const sections = document.querySelectorAll('.legal-block[id]');
        const links = document.querySelectorAll('.legal-sidebar a[href^="#"]');

        if (!sections.length || !links.length || !('IntersectionObserver' in window)) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const id = entry.target.id;

                links.forEach((link) => {
                    const isActive = link.getAttribute('href') === `#${id}`;
                    link.classList.toggle('is-active', isActive);

                    if (isActive) {
                        link.setAttribute('aria-current', 'true');
                    } else {
                        link.removeAttribute('aria-current');
                    }
                });
            });
        }, {
            rootMargin: '-35% 0px -55% 0px',
            threshold: 0.01
        });

        sections.forEach((section) => observer.observe(section));
    }

    function initLegalPrintButton() {
        const printButton = document.querySelector('[data-print-page]');

        if (!printButton) {
            return;
        }

        printButton.addEventListener('click', () => {
            window.print();
        });
    }

    function initLegalLastUpdated() {
        const updatedElements = document.querySelectorAll('[data-legal-updated]');

        updatedElements.forEach((element) => {
            if (element.textContent.trim() !== '') {
                return;
            }

            element.textContent = 'Last updated: January 2026';
        });
    }

    function init() {
        initLegalReveal();
        initLegalSidebarScroll();
        initActiveLegalSection();
        initLegalPrintButton();
        initLegalLastUpdated();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();