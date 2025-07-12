document.addEventListener('DOMContentLoaded', () => {
    // Testimonials Slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.slider-nav .prev');
    const nextBtn = document.querySelector('.slider-nav .next');

    if (testimonialsSlider && prevBtn && nextBtn) {
        let scrollAmount = 0;
        const scrollStep = testimonialsSlider.clientWidth / 2; // Scroll half the width of the slider

        nextBtn.addEventListener('click', () => {
            scrollAmount += scrollStep;
            if (scrollAmount > testimonialsSlider.scrollWidth - testimonialsSlider.clientWidth) {
                scrollAmount = testimonialsSlider.scrollWidth - testimonialsSlider.clientWidth;
            }
            testimonialsSlider.scrollTo({
                right: scrollAmount, // Scroll right for RTL
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            scrollAmount -= scrollStep;
            if (scrollAmount < 0) {
                scrollAmount = 0;
            }
            testimonialsSlider.scrollTo({
                right: scrollAmount, // Scroll right for RTL
                behavior: 'smooth'
            });
        });

        // Optional: Auto-slide testimonials
        // setInterval(() => {
        //     if (scrollAmount >= testimonialsSlider.scrollWidth - testimonialsSlider.clientWidth) {
        //         scrollAmount = 0;
        //     } else {
        //         scrollAmount += scrollStep;
        //     }
        //     testimonialsSlider.scrollTo({
        //         right: scrollAmount,
        //         behavior: 'smooth'
        //     });
        // }, 5000); // Change slide every 5 seconds
    }

    // Partner Carousel (CSS animated, but if JS control is needed for more complex behavior)
    // The CSS animation for partners-carousel is usually sufficient for a continuous scroll.
    // If you need pause on hover or click control, you'd add JS here.
    // For now, the CSS `animation: scrollLogos` handles it.
});