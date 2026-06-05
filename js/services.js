'use strict';

(function () {
    function initServicesReveal() {
        const items = document.querySelectorAll(
            '.service-photo-card, .aggregator-row, .photo-belt-section .section-heading, .verification-line article'
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
            item.classList.add('services-reveal');
            item.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
            observer.observe(item);
        });
    }

    function initPhotoBeltTouchPause() {
        const belt = document.querySelector('.photo-belt');

        if (!belt) {
            return;
        }

        belt.addEventListener('touchstart', () => {
            belt.classList.add('is-paused');
        }, { passive: true });

        belt.addEventListener('touchend', () => {
            window.setTimeout(() => {
                belt.classList.remove('is-paused');
            }, 600);
        });
    }

    function initServiceCardPreload() {
        const cards = document.querySelectorAll('.service-photo-card');

        cards.forEach((card) => {
            const image = card.querySelector('img');

            if (!image) {
                return;
            }

            card.addEventListener('mouseenter', () => {
                image.decoding = 'async';
            });
        });
    }

    function init() {
        initServicesReveal();
        initPhotoBeltTouchPause();
        initServiceCardPreload();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();