document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Search Bar Toggle
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.querySelector('.search-bar');
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                searchBar.querySelector('input').focus();
            }
        });
    }

    // Dynamic Search for Scholarships (Example - needs actual data)
    const scholarshipSearchInput = document.getElementById('scholarshipSearch');
    if (scholarshipSearchInput) {
        scholarshipSearchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const scholarshipCards = document.querySelectorAll('.scholarship-card');

            scholarshipCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 300) { // Check again in case of rapid scroll
                        backToTopBtn.style.display = 'none';
                    }
                }, 300); // Give time for transition
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll Reveal Effect
    const scrollRevealElements = document.querySelectorAll('section, .scholarship-card, .testimonial-card, .team-member, .info-block, .contact-form');

    const observerOptions = {
        threshold: 0.1 // When 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    scrollRevealElements.forEach(el => {
        el.classList.add('scroll-reveal'); // Add base class for styling
        observer.observe(el);
    });

    // Lazy Loading Images (Native browser lazy loading used in HTML, but here's a JS fallback/enhancement if needed)
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded'); // Add a class when image is loaded
            } else {
                img.addEventListener('load', () => img.classList.add('loaded'));
            }
        });
    };
    lazyLoadImages(); // Call on DOM load
});