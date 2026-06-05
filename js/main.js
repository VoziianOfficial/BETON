'use strict';

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn('SITE_CONFIG is missing. Make sure /js/config.js is loaded before /js/main.js');
        return;
    }

    const selectors = {
        configText: '[data-config]',
        phoneLink: '[data-phone-link]',
        emailLink: '[data-email-link]',
        phoneText: '[data-phone-text]',
        currentYear: '[data-current-year]',
        mobileToggle: '[data-mobile-toggle]',
        mobileMenu: '#mobile-menu',
        mobileClose: '[data-mobile-close]',
        menuClose: '[data-menu-close]',
        faqItem: '.faq-item',
        faqQuestion: '.faq-question',
        cookieBanner: '#cookie-banner',
        contactForm: '[data-contact-form]',
        formSuccess: '[data-form-success]',
        formError: '[data-form-error]',
        servicesList: '[data-render-services]',
        legalLinks: '[data-render-legal-links]'
    };

    function getNestedValue(source, path) {
        if (!source || !path) {
            return '';
        }

        return path.split('.').reduce((current, key) => {
            if (current && Object.prototype.hasOwnProperty.call(current, key)) {
                return current[key];
            }

            return '';
        }, source);
    }

    function setTextContent(element, value) {
        if (!element || value === undefined || value === null) {
            return;
        }

        element.textContent = String(value);
    }

    function applyConfigText() {
        document.querySelectorAll(selectors.configText).forEach((element) => {
            const path = element.getAttribute('data-config');
            const value = getNestedValue(config, path);

            if (value !== '') {
                setTextContent(element, value);
            }
        });
    }

    function applyContactLinks() {
        const phoneHref = `tel:${config.contact.phoneRaw}`;
        const emailHref = `mailto:${config.contact.email}`;

        document.querySelectorAll(selectors.phoneLink).forEach((element) => {
            element.setAttribute('href', phoneHref);

            const label = element.getAttribute('aria-label');

            if (!label || label.trim() === '') {
                element.setAttribute('aria-label', `Call ${config.company.name}`);
            }
        });

        document.querySelectorAll(selectors.emailLink).forEach((element) => {
            element.setAttribute('href', emailHref);

            const label = element.getAttribute('aria-label');

            if (!label || label.trim() === '') {
                element.setAttribute('aria-label', `Email ${config.company.name}`);
            }
        });

        document.querySelectorAll(selectors.phoneText).forEach((element) => {
            setTextContent(element, config.contact.phoneButtonText);
        });
    }

    function applyCurrentYear() {
        document.querySelectorAll(selectors.currentYear).forEach((element) => {
            setTextContent(element, new Date().getFullYear());
        });
    }

    function getCurrentPageName() {
        const pathname = window.location.pathname;
        const page = pathname.split('/').pop();

        return page || 'index.html';
    }

    function setActiveNavigation() {
        const currentPage = getCurrentPageName();

        document.querySelectorAll('a[href]').forEach((link) => {
            const href = link.getAttribute('href');

            if (!href) {
                return;
            }

            const hrefPage = href.split('#')[0];

            if (hrefPage === currentPage) {
                link.classList.add('is-active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    function iconMarkup(type) {
        const icons = {
            driveway: `
                <svg viewBox="0 0 64 64" aria-hidden="true">
                    <path d="M22 54L29 24H35L42 54" />
                    <path d="M18 54H46" />
                    <path d="M28 34H36" class="icon-accent" />
                    <path d="M26 43H38" class="icon-accent" />
                    <path d="M20 22L32 12L44 22" />
                    <path d="M24 22V16H40V22" />
                    <path d="M27 22H37" />
                </svg>
            `,
            patio: `
                <svg viewBox="0 0 64 64" aria-hidden="true">
                    <path d="M12 44H52" />
                    <path d="M16 34H48" />
                    <path d="M20 24H44" />
                    <path d="M18 24L12 44" />
                    <path d="M46 24L52 44" />
                    <path d="M24 24L22 44" class="icon-accent" />
                    <path d="M40 24L42 44" class="icon-accent" />
                    <path d="M23 18C23 14 26 11 32 11C38 11 41 14 41 18" />
                    <path d="M26 18V24" />
                    <path d="M38 18V24" />
                </svg>
            `,
            slab: `
                <svg viewBox="0 0 64 64" aria-hidden="true">
                    <path d="M10 38L32 25L54 38L32 51L10 38Z" />
                    <path d="M10 38V45L32 58L54 45V38" />
                    <path d="M20 38L32 31L44 38" class="icon-accent" />
                    <path d="M22 45L44 32" />
                    <path d="M32 51V58" />
                    <path d="M42 45L20 32" />
                </svg>
            `,
            stamped: `
                <svg viewBox="0 0 64 64" aria-hidden="true">
                    <rect x="13" y="13" width="38" height="38" rx="6" />
                    <path d="M13 28H51" />
                    <path d="M13 39H51" />
                    <path d="M26 13V28" />
                    <path d="M38 28V39" />
                    <path d="M25 39V51" />
                    <path d="M39 13V22" class="icon-accent" />
                    <path d="M22 22L30 14" class="icon-accent" />
                    <path d="M34 50L50 34" class="icon-accent" />
                </svg>
            `,
            arrow: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12H19" />
                    <path d="M13 6L19 12L13 18" />
                </svg>
            `,
            phone: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 16.92V20A2 2 0 0 1 19.82 22A19.79 19.79 0 0 1 11.19 18.93A19.5 19.5 0 0 1 5.07 12.81A19.79 19.79 0 0 1 2 4.18A2 2 0 0 1 4 2H7.09A2 2 0 0 1 9.09 3.72L9.7 7.2A2 2 0 0 1 9.13 8.95L7.91 10.17A16 16 0 0 0 13.83 16.09L15.05 14.87A2 2 0 0 1 16.8 14.3L20.28 14.91A2 2 0 0 1 22 16.92Z" />
                </svg>
            `,
            mail: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 5H20A2 2 0 0 1 22 7V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V7A2 2 0 0 1 4 5Z" />
                    <path d="M22 7L12 13.5L2 7" />
                </svg>
            `
        };

        return icons[type] || icons.arrow;
    }

    function getServiceIconType(index) {
        const types = ['driveway', 'patio', 'slab', 'stamped'];
        return types[index] || 'driveway';
    }

    function renderServiceLists() {
        document.querySelectorAll(selectors.servicesList).forEach((container) => {
            const variant = container.getAttribute('data-render-services');

            if (variant === 'footer') {
                container.innerHTML = config.services.map((service) => {
                    return `
                        <li>
                            <a href="${service.url}">${service.title}</a>
                        </li>
                    `;
                }).join('');

                return;
            }

            if (variant === 'mobile') {
                container.innerHTML = config.services.map((service, index) => {
                    return `
                        <a href="${service.url}" data-menu-close>
                            <span class="service-icon">${iconMarkup(getServiceIconType(index))}</span>
                            <span>${service.title}</span>
                        </a>
                    `;
                }).join('');

                return;
            }

            if (variant === 'dropdown') {
                container.innerHTML = config.services.map((service, index) => {
                    return `
                        <a class="dropdown-service" href="${service.url}">
                            <span class="service-icon">${iconMarkup(getServiceIconType(index))}</span>
                            <span>
                                <strong>${service.title}</strong>
                                <span>${service.description}</span>
                            </span>
                        </a>
                    `;
                }).join('');
            }
        });
    }

    function renderLegalLinks() {
        document.querySelectorAll(selectors.legalLinks).forEach((container) => {
            container.innerHTML = `
                <li><a href="${config.legal.privacy}">Privacy Policy</a></li>
                <li><a href="${config.legal.cookies}">Cookie Policy</a></li>
                <li><a href="${config.legal.terms}">Terms of Service</a></li>
            `;
        });
    }

    function createCookieBanner() {
        if (document.querySelector(selectors.cookieBanner)) {
            return;
        }

        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Cookie consent');

        banner.innerHTML = `
            <div class="cookie-banner__inner">
                <p>
                    ${config.company.name} uses essential cookies to keep the website working and to remember your policy choice.
                    Review our
                    <a href="${config.legal.privacy}">Privacy Policy</a>,
                    <a href="${config.legal.cookies}">Cookie Policy</a>, and
                    <a href="${config.legal.terms}">Terms of Service</a>.
                </p>

                <div class="cookie-banner__actions">
                    <button class="cookie-btn cookie-btn--decline" type="button" data-cookie-choice="decline">
                        Decline
                    </button>
                    <button class="cookie-btn cookie-btn--accept" type="button" data-cookie-choice="accept">
                        Accept
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
    }

    function initCookieBanner() {
        createCookieBanner();

        const banner = document.querySelector(selectors.cookieBanner);
        let savedChoice = null;

        try {
            savedChoice = localStorage.getItem('betonCookieConsent');
        } catch (error) {
            savedChoice = null;
        }

        if (!banner || savedChoice) {
            return;
        }

        banner.classList.add('is-visible');

        banner.querySelectorAll('[data-cookie-choice]').forEach((button) => {
            button.addEventListener('click', () => {
                const choice = button.getAttribute('data-cookie-choice');

                try {
                    localStorage.setItem('betonCookieConsent', choice || 'decline');
                } catch (error) {
                    // Ignore storage failures and still hide the banner.
                }

                banner.classList.remove('is-visible');
            });
        });
    }

    function openMobileMenu(toggle, menu) {
        toggle.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        menu.classList.add('is-open');
        document.body.classList.add('menu-open');

        const firstLink = menu.querySelector('a, button');

        if (firstLink) {
            setTimeout(() => firstLink.focus(), 120);
        }
    }

    function closeMobileMenu(toggle, menu) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        menu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        toggle.focus();
    }

    function initMobileMenu() {
        const toggle = document.querySelector(selectors.mobileToggle);
        const menu = document.querySelector(selectors.mobileMenu);

        if (!toggle || !menu) {
            return;
        }

        toggle.setAttribute('aria-controls', menu.id);
        toggle.setAttribute('aria-expanded', 'false');

        toggle.addEventListener('click', () => {
            const isOpen = toggle.getAttribute('aria-expanded') === 'true';

            if (isOpen) {
                closeMobileMenu(toggle, menu);
            } else {
                openMobileMenu(toggle, menu);
            }
        });

        menu.querySelectorAll(`${selectors.mobileClose}, ${selectors.menuClose}`).forEach((button) => {
            button.addEventListener('click', () => {
                closeMobileMenu(toggle, menu);
            });
        });

        menu.addEventListener('click', (event) => {
            const target = event.target;

            if (!(target instanceof Element)) {
                return;
            }

            const closeTarget = target.closest(selectors.menuClose);

            if (closeTarget) {
                closeMobileMenu(toggle, menu);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMobileMenu(toggle, menu);
            }
        });
    }

    function initDropdownKeyboardSupport() {
        document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
            const button = dropdown.querySelector('.nav-dropdown__button');
            const menu = dropdown.querySelector('.nav-dropdown__menu');

            if (!button || !menu) {
                return;
            }

            button.setAttribute('aria-haspopup', 'true');
            button.setAttribute('aria-expanded', 'false');

            dropdown.addEventListener('focusin', () => {
                button.setAttribute('aria-expanded', 'true');
            });

            dropdown.addEventListener('focusout', (event) => {
                if (!dropdown.contains(event.relatedTarget)) {
                    button.setAttribute('aria-expanded', 'false');
                }
            });

            dropdown.addEventListener('mouseenter', () => {
                button.setAttribute('aria-expanded', 'true');
            });

            dropdown.addEventListener('mouseleave', () => {
                button.setAttribute('aria-expanded', 'false');
            });
        });
    }

    function initFaqAccordions() {
        document.querySelectorAll(selectors.faqItem).forEach((item, index) => {
            const question = item.querySelector(selectors.faqQuestion);
            const answer = item.querySelector('.faq-answer');

            if (!question || !answer) {
                return;
            }

            const answerId = answer.id || `faq-answer-${index + 1}`;
            answer.id = answerId;

            question.setAttribute('aria-controls', answerId);
            question.setAttribute('aria-expanded', item.classList.contains('is-open') ? 'true' : 'false');

            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                item.classList.toggle('is-open', !isOpen);
                question.setAttribute('aria-expanded', String(!isOpen));
            });
        });
    }

    function initContactForm() {
        const form = document.querySelector(selectors.contactForm);

        if (!form) {
            return;
        }

        const successMessage = form.querySelector(selectors.formSuccess);
        const errorMessage = form.querySelector(selectors.formError);

        function showMessage(type, message) {
            if (successMessage) {
                successMessage.textContent = '';
                successMessage.hidden = true;
            }

            if (errorMessage) {
                errorMessage.textContent = '';
                errorMessage.hidden = true;
            }

            if (type === 'success' && successMessage) {
                successMessage.textContent = message;
                successMessage.hidden = false;
            }

            if (type === 'error' && errorMessage) {
                errorMessage.textContent = message;
                errorMessage.hidden = false;
            }
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach((field) => {
                if (!field.checkValidity()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    field.setAttribute('aria-invalid', 'true');
                } else {
                    field.classList.remove('is-invalid');
                    field.removeAttribute('aria-invalid');
                }
            });

            if (!isValid) {
                showMessage('error', 'Please complete the required fields before requesting provider options.');
                const firstInvalid = form.querySelector('.is-invalid');

                if (firstInvalid) {
                    firstInvalid.focus();
                }

                return;
            }

            showMessage(
                'success',
                'Thank you. Your request details are ready. A local provider comparison path can be reviewed from here.'
            );

            form.reset();
        });

        form.querySelectorAll('input, textarea, select').forEach((field) => {
            field.addEventListener('input', () => {
                field.classList.remove('is-invalid');
                field.removeAttribute('aria-invalid');

                if (successMessage) {
                    successMessage.hidden = true;
                    successMessage.textContent = '';
                }

                if (errorMessage) {
                    errorMessage.hidden = true;
                    errorMessage.textContent = '';
                }
            });
        });
    }

    function initScrollFillLines() {
        const fillLines = document.querySelectorAll('[data-scroll-fill]');

        if (!fillLines.length || !('IntersectionObserver' in window)) {
            fillLines.forEach((line) => line.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.35
        });

        fillLines.forEach((line) => observer.observe(line));
    }

    function initInternalAnchorOffset() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const href = anchor.getAttribute('href');

                if (!href || href === '#') {
                    return;
                }

                const target = document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight + 14 : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });
            });
        });
    }

    function initReducedMotionFallback() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            return;
        }

        document.querySelectorAll('[data-scroll-fill]').forEach((element) => {
            element.classList.add('is-visible');
        });
    }

    function init() {
        renderServiceLists();
        renderLegalLinks();
        applyConfigText();
        applyContactLinks();
        applyCurrentYear();
        setActiveNavigation();
        initMobileMenu();
        initDropdownKeyboardSupport();
        initFaqAccordions();
        initContactForm();
        initCookieBanner();
        initScrollFillLines();
        initInternalAnchorOffset();
        initReducedMotionFallback();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
