'use strict';

(function () {
    function initServicePageReveal() {
        const items = document.querySelectorAll(
            '.service-intro__content, .service-intro__image, .compare-row, .provider-fit__visual, .provider-fit__content, .provider-fit__item, .service-photo-belt, .service-faq .faq-item'
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
            threshold: 0.14
        });

        items.forEach((item, index) => {
            item.classList.add('service-reveal');
            item.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
            observer.observe(item);
        });
    }

    function initServicePhotoBeltTouchPause() {
        const belts = document.querySelectorAll('.service-photo-belt');

        belts.forEach((belt) => {
            belt.addEventListener('touchstart', () => {
                belt.classList.add('is-paused');
            }, { passive: true });

            belt.addEventListener('touchend', () => {
                window.setTimeout(() => {
                    belt.classList.remove('is-paused');
                }, 600);
            });
        });
    }

    function initProviderRouteRestart() {
        const visuals = document.querySelectorAll('.provider-fit__visual');

        visuals.forEach((visual) => {
            const route = visual.querySelector('.provider-fit__route path');

            if (!route) {
                return;
            }

            visual.addEventListener('mouseenter', () => {
                route.style.animation = 'none';

                window.requestAnimationFrame(() => {
                    route.style.animation = '';
                });
            });
        });
    }

    function initServiceHeroChips() {
        const chips = document.querySelectorAll('.service-hero-chip');

        chips.forEach((chip, index) => {
            chip.style.transitionDelay = `${index * 70}ms`;
            chip.classList.add('is-visible');
        });
    }

    function initCompareRowsKeyboard() {
        const rows = document.querySelectorAll('.compare-row');

        rows.forEach((row) => {
            row.setAttribute('tabindex', '0');

            row.addEventListener('keydown', (event) => {
                if (event.key !== 'Enter' && event.key !== ' ') {
                    return;
                }

                event.preventDefault();
                row.classList.toggle('is-active');
            });
        });
    }

    function initMiniBeltImageLoading() {
        const images = document.querySelectorAll('.service-photo-belt img');

        images.forEach((image) => {
            image.loading = 'lazy';
            image.decoding = 'async';
        });
    }

    function init() {
        initServicePageReveal();
        initServicePhotoBeltTouchPause();
        initProviderRouteRestart();
        initServiceHeroChips();
        initCompareRowsKeyboard();
        initMiniBeltImageLoading();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();