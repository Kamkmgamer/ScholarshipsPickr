document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateToggleIcon(savedTheme);
    } else {
        // Default to light mode if no preference is saved
        body.classList.add('light-mode');
        updateToggleIcon('light-mode');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light-mode');
                updateToggleIcon('light-mode');
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
                updateToggleIcon('dark-mode');
            }
        });
    }

    function updateToggleIcon(theme) {
        const icon = darkModeToggle.querySelector('img');
        if (theme === 'dark-mode') {
            icon.src = 'images/sun-icon.svg'; // Assuming you have a sun icon for light mode toggle
            icon.alt = 'Light Mode';
        } else {
            icon.src = 'images/moon-icon.svg'; // Moon icon for dark mode toggle
            icon.alt = 'Dark Mode';
        }
    }
});