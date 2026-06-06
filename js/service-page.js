'use strict';

(function () {
  

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