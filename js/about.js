'use strict';

(function () {
  

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
        initClickableMarqueeAccessibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();