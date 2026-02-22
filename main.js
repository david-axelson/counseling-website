// Main JS
console.log('Counseling Website Loaded');

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            formStatus.style.display = 'block';
            formStatus.textContent = 'Processing...';
            formStatus.style.color = 'var(--color-primary-dark)';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // IMPORTANT: Replace this URL with your deployed Google Apps Script Web App URL
                const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbym4Q4Va--GY58D2-Gl8NPkVzwlLT4iivZOiR-aH31gAmYjs7sjGxV9mEBywsvgDVtWRw/exec';

                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Google Apps Script requires no-cors for simple POST
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                // Since we use 'no-cors', we won't get a proper response object back,
                // but if the fetch doesn't throw, it likely succeeded.
                contactForm.reset();
                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.style.color = 'green';
            } catch (error) {
                console.error('Error:', error);
                formStatus.textContent = 'Oops! There was an error sending your message. Please try again.';
                formStatus.style.color = 'red';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            const answer = question.nextElementSibling;

            // Toggle current item
            question.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('active');
        });
    });
});
