'use strict';

(function () {
    function initSurfaceSelector() {
        const selector = document.querySelector('.surface-selector');

        if (!selector) {
            return;
        }

        const image = selector.querySelector('[data-selector-image]');
        const label = selector.querySelector('[data-selector-label]');
        const title = selector.querySelector('[data-selector-title]');
        const options = selector.querySelectorAll('.surface-option');
        const visual = selector.querySelector('.surface-selector__visual');

        if (!image || !label || !title || !options.length || !visual) {
            return;
        }

        function updateSurface(option) {
            const nextImage = option.getAttribute('data-image');
            const nextTitle = option.getAttribute('data-title');
            const nextLabel = option.getAttribute('data-label');

            if (!nextImage || !nextTitle || !nextLabel) {
                return;
            }

            options.forEach((item) => {
                item.classList.remove('is-active');
                item.setAttribute('aria-pressed', 'false');
            });

            option.classList.add('is-active');
            option.setAttribute('aria-pressed', 'true');

            visual.classList.add('is-changing');

            window.setTimeout(() => {
                image.src = nextImage;
                title.textContent = nextTitle;
                label.textContent = nextLabel;
                visual.classList.remove('is-changing');
            }, 160);
        }

        options.forEach((option) => {
            option.setAttribute('aria-pressed', option.classList.contains('is-active') ? 'true' : 'false');

            option.addEventListener('mouseenter', () => {
                updateSurface(option);
            });

            option.addEventListener('focus', () => {
                updateSurface(option);
            });

            option.addEventListener('click', () => {
                updateSurface(option);
            });
        });
    }


    function init() {
        initSurfaceSelector();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();