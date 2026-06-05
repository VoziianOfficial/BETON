'use strict';

(function () {
    function initAboutReveal() {
        const items = document.querySelectorAll(
            '.about-platform__content, .about-platform__panel article, .process-line__item, .local-matching__content, .matching-map, .about-story__photo, .about-story__content'
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
            threshold: 0.16
        });

        items.forEach((item, index) => {
            item.classList.add('about-reveal');
            item.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
            observer.observe(item);
        });
    }

    function initMatchingMapPulse() {
        const map = document.querySelector('.matching-map');

        if (!map) {
            return;
        }

        const dots = map.querySelectorAll('.matching-dot');

        dots.forEach((dot, index) => {
            dot.style.animationDelay = `${index * 240}ms`;
        });
    }

    function initClickableMarqueeAccessibility() {
        const marquee = document.querySelector('.about-service-marquee');

        if (!marquee) {
            return;
        }

        marquee.addEventListener('focusin', () => {
            marquee.classList.add('is-focused');
        });

        marquee.addEventListener('focusout', () => {
            marquee.classList.remove('is-focused');
        });
    }

    function init() {
        initAboutReveal();
        initMatchingMapPulse();
        initClickableMarqueeAccessibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();