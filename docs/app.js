/**
 * Drifty: Neon Highway Rush
 * Client-Side JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Navigation tabs mapping
    const sections = {
        'home': document.getElementById('section-home'),
        'how-to-play': document.getElementById('section-how-to-play'),
        'support': document.getElementById('section-support'),
        'privacy': document.getElementById('section-privacy')
    };

    const navTabs = document.querySelectorAll('.nav-tab');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksList = document.getElementById('nav-links-list');

    // Function to switch active tab/section
    function switchTab(sectionId) {
        if (!sections[sectionId]) return;

        // Deactivate all sections and tabs
        Object.keys(sections).forEach(key => {
            sections[key].classList.remove('active');
        });
        navTabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Activate target section and tab
        sections[sectionId].classList.add('active');
        const activeTab = document.querySelector(`.nav-tab[data-section="${sectionId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Close mobile menu if active
        navLinksList.classList.remove('active');

        // Scroll to top of section
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Tab click handlers
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSection = tab.getAttribute('data-section');
            window.location.hash = targetSection;
            switchTab(targetSection);
        });
    });

    // Mobile menu toggle
    if (mobileMenuBtn && navLinksList) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            
            // Toggle hamburger icon text
            if (navLinksList.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '&times;'; // Close symbol
            } else {
                mobileMenuBtn.innerHTML = '&#9776;'; // Hamburger symbol
            }
        });
    }

    // Hash routing for deep linking (e.g. index.html#privacy)
    function handleHashRoute() {
        const hash = window.location.hash.substring(1); // Remove '#'
        if (sections[hash]) {
            switchTab(hash);
        } else {
            switchTab('home'); // Default to home
        }
    }

    // Set initial route and listen for hash changes
    window.addEventListener('hashchange', handleHashRoute);
    handleHashRoute();

    // Footer links click handlers
    const footerLinks = document.querySelectorAll('.footer-link[data-section]');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-section');
            window.location.hash = target;
            switchTab(target);
        });
    });

    // Support Form Submission Handler
    const supportForm = document.getElementById('support-form');
    const successAlert = document.getElementById('success-alert');
    const submitBtn = document.getElementById('submit-btn');

    if (supportForm) {
        supportForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Read form values
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill out all transmission fields.');
                return;
            }

            // Lock submit button with retro loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'TRANSMITTING CODES...';
            submitBtn.style.opacity = '0.7';

            // Simulate server network latency
            setTimeout(() => {
                // Hide button, reset form
                submitBtn.disabled = false;
                submitBtn.textContent = 'TRANSMIT MESSAGE';
                submitBtn.style.opacity = '1';
                supportForm.reset();

                // Show retro hacker alert box
                if (successAlert) {
                    const date = new Date().toISOString().replace('T', ' ').substring(0, 19);
                    successAlert.innerHTML = `
                        &gt; [SYS_STATUS]: CONNECTED TO COGNITIVE RELAY FEEDBACK NETWORK...<br>
                        &gt; [SYS_TRANSMIT]: DATA PACKETS UPLOADED SUCCESSFULLY.<br>
                        &gt; [SYS_LOGS]: TIMESTAMP: ${date} UTC<br>
                        &gt; [SYS_MSG]: THANKS ${name.toUpperCase()}! OUR CYBER HIGHWAY TEAM WILL RESPOND TO ${email.toUpperCase()} ASAP.
                    `;
                    successAlert.style.display = 'block';

                    // Smooth scroll to alert
                    successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 1500);
        });
    }
});
