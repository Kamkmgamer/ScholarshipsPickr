document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => el.classList.remove('invalid'));

            // Validate Name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                displayError(nameInput, 'الاسم مطلوب.');
                isValid = false;
            }

            // Validate Email
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                displayError(emailInput, 'البريد الإلكتروني مطلوب.');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                displayError(emailInput, 'صيغة البريد الإلكتروني غير صحيحة.');
                isValid = false;
            }

            // Validate Phone (Optional but good practice)
            const phoneInput = document.getElementById('phone');
            // Basic phone number pattern (can be more complex based on requirements)
            const phonePattern = /^\+?[0-9\s-]{7,20}$/; // Allows +, digits, spaces, hyphens
            if (phoneInput.value.trim() !== '' && !phonePattern.test(phoneInput.value.trim())) {
                displayError(phoneInput, 'صيغة رقم الهاتف غير صحيحة.');
                isValid = false;
            }

            // Validate Message
            const messageTextarea = document.getElementById('message');
            if (messageTextarea.value.trim() === '') {
                displayError(messageTextarea, 'الرسالة مطلوبة.');
                isValid = false;
            } else if (messageTextarea.value.trim().length < 10) {
                displayError(messageTextarea, 'الرسالة قصيرة جدًا (الحد الأدنى 10 أحرف).');
                isValid = false;
            }

            if (isValid) {
                // If all validations pass, you can submit the form via AJAX or
                // uncomment the line below to allow normal form submission.
                // For a real website, you'd typically send this to a backend.
                alert('تم إرسال رسالتك بنجاح!');
                this.reset(); // Clear the form
            }
        });

        function displayError(inputElement, message) {
            const formGroup = inputElement.closest('.form-group');
            const errorMessageDiv = formGroup.querySelector('.error-message');
            inputElement.classList.add('invalid');
            errorMessageDiv.textContent = message;
        }
    }
});