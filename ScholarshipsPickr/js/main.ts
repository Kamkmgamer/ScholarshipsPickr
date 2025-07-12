// main.ts
import { enableLazyLoading, enableSmoothScrolling, enableFadeInOnScroll, scholarshipsData, Scholarship } from './utils.js'; // Ensure .js extension

document.addEventListener('DOMContentLoaded', () => {
    // Enable core utilities
    enableLazyLoading();
    enableSmoothScrolling();
    enableFadeInOnScroll();

    // Navbar functionality
    const navbar = document.querySelector('.main-header') as HTMLElement;
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    const hamburgerMenu = document.querySelector('.hamburger-menu') as HTMLElement;

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('open'); // Optional: for animating hamburger icon
    });

    // Close nav menu when a link is clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('open');
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle') as HTMLButtonElement;
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    function setDarkMode(isDark: boolean) {
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    }

    // Check localStorage for preferred mode or system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        setDarkMode(true);
    } else if (savedDarkMode === null && prefersDarkMode.matches) {
        setDarkMode(true);
    }

    darkModeToggle.addEventListener('click', () => {
        setDarkMode(!document.body.classList.contains('dark-mode'));
    });

    prefersDarkMode.addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
            setDarkMode(e.matches);
        }
    });

    // Active Navbar Link (optional, for visual feedback)
    const currentPath = window.location.pathname.split('/').pop();
    if (currentPath) {
        navLinks.querySelectorAll('a').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }

    // Scholarships Page Logic
    const scholarshipsContainer = document.getElementById('scholarships-container');
    const searchInput = document.getElementById('search-scholarship') as HTMLInputElement;
    const countryFilter = document.getElementById('country-filter') as HTMLSelectElement;
    const majorFilter = document.getElementById('major-filter') as HTMLSelectElement;
    const noResultsDiv = document.getElementById('no-results');

    if (scholarshipsContainer && searchInput && countryFilter && majorFilter) {
        function displayScholarships(scholarships: Scholarship[]) {
            scholarshipsContainer.innerHTML = '';
            if (scholarships.length === 0) {
                if (noResultsDiv) noResultsDiv.style.display = 'block';
                return;
            } else {
                if (noResultsDiv) noResultsDiv.style.display = 'none';
            }

            scholarships.forEach(scholarship => {
                const card = document.createElement('div');
                card.classList.add('scholarship-card', 'fade-in'); // Add fade-in
                card.innerHTML = `
                    <h4>${scholarship.name}</h4>
                    <p><strong>الدولة:</strong> ${scholarship.country}</p>
                    <p><strong>آخر موعد للتقديم:</strong> ${scholarship.deadline}</p>
                    <p><strong>التخصصات:</strong> ${scholarship.majors.join(', ')}</p>
                    <a href="${scholarship.link}" class="details-button" target="_blank">تفاصيل</a>
                `;
                scholarshipsContainer.appendChild(card);
            });
            // Re-apply fade-in visibility for newly added cards
            enableFadeInOnScroll();
        }

        function filterScholarships() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCountry = countryFilter.value;
            const selectedMajor = majorFilter.value;

            const filtered = scholarshipsData.filter(scholarship => {
                const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm) ||
                                      scholarship.description.toLowerCase().includes(searchTerm) ||
                                      scholarship.country.toLowerCase().includes(searchTerm) ||
                                      scholarship.majors.some(major => major.toLowerCase().includes(searchTerm));

                const matchesCountry = selectedCountry === '' || scholarship.country === selectedCountry;
                const matchesMajor = selectedMajor === '' || scholarship.majors.includes(selectedMajor);

                return matchesSearch && matchesCountry && matchesMajor;
            });
            displayScholarships(filtered);
        }

        searchInput.addEventListener('input', filterScholarships);
        countryFilter.addEventListener('change', filterScholarships);
        majorFilter.addEventListener('change', filterScholarships);

        // Initial display of scholarships
        displayScholarships(scholarshipsData);
    }

    // Contact Form Submission (example - client-side validation only)
    const contactForm = document.querySelector('.contact-form') as HTMLFormElement;
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nameInput = contactForm.querySelector('#name') as HTMLInputElement;
            const emailInput = contactForm.querySelector('#email') as HTMLInputElement;
            const messageInput = contactForm.querySelector('#message') as HTMLTextAreaElement;

            if (nameInput.value && emailInput.value && messageInput.value) {
                alert('تم استلام رسالتك بنجاح! سنتواصل معك قريباً.');
                contactForm.reset();
            } else {
                alert('يرجى ملء جميع الحقول المطلوبة.');
            }
        });
    }
});