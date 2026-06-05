'use strict';

(function () {
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
        const cards = document.querySelectorAll('.service-square-card');

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
        initPhotoBeltTouchPause();
        initServiceCardPreload();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();