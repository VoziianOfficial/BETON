'use strict';

(function () {
  

    function initConsentCheckboxState() {
        const checkbox = document.querySelector('.custom-checkbox input');

        if (!checkbox) {
            return;
        }

        const wrapper = checkbox.closest('.custom-checkbox');

        function updateState() {
            if (!wrapper) {
                return;
            }

            wrapper.classList.toggle('is-checked', checkbox.checked);
            wrapper.classList.toggle('is-invalid', !checkbox.checked && checkbox.classList.contains('is-invalid'));
        }

        checkbox.addEventListener('change', updateState);
        checkbox.addEventListener('input', updateState);

        updateState();
    }

    function initZipInputCleanup() {
        const zipInput = document.querySelector('#zip');

        if (!zipInput) {
            return;
        }

        zipInput.addEventListener('input', () => {
            zipInput.value = zipInput.value
                .replace(/[^\d-]/g, '')
                .slice(0, 10);
        });
    }

    function initProjectTypeHint() {
        const select = document.querySelector('#project-type');
        const message = document.querySelector('#message');

        if (!select || !message) {
            return;
        }

        const hints = {
            'Concrete Driveways': 'Driveway project notes: approximate length and width, garage access, slope, drainage, and desired timing.',
            'Concrete Patios': 'Patio project notes: backyard access, approximate surface size, finish preference, and outdoor living goals.',
            'Slabs & Foundations': 'Slab or foundation notes: intended use, approximate size, thickness needs, reinforcement, and site preparation.',
            'Stamped Concrete': 'Stamped concrete notes: pattern style, color preference, surface area, patio or walkway location, and finish goals.'
        };

        select.addEventListener('change', () => {
            const hint = hints[select.value];

            if (!hint || message.value.trim() !== '') {
                return;
            }

            message.placeholder = hint;
        });
    }

    function initContactRouteRestart() {
        const card = document.querySelector('.abstract-location-card');

        if (!card) {
            return;
        }

        const route = card.querySelector('svg path');

        if (!route) {
            return;
        }

        card.addEventListener('mouseenter', () => {
            route.style.animation = 'none';

            window.requestAnimationFrame(() => {
                route.style.animation = '';
            });
        });
    }

    function init() {
        initConsentCheckboxState();
        initZipInputCleanup();
        initProjectTypeHint();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();