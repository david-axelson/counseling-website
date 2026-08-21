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

            // Honeypot: real users leave this blank; bots fill it in
            if (contactForm.elements['website'].value) {
                contactForm.reset();
                formStatus.style.display = 'block';
                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.style.color = 'green';
                return;
            }

            const name = contactForm.elements['name'].value;
            const mobile = contactForm.elements['mobile'].value;
            const message = contactForm.elements['message'].value;

            if (name.length > 100 || mobile.length > 20 || message.length > 2000) {
                formStatus.style.display = 'block';
                formStatus.textContent = 'One or more fields is too long. Please shorten your entry and try again.';
                formStatus.style.color = 'red';
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formStatus.style.display = 'block';
            formStatus.textContent = 'Processing...';
            formStatus.style.color = 'var(--color-primary-dark)';

            try {
                const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbym4Q4Va--GY58D2-Gl8NPkVzwlLT4iivZOiR-aH31gAmYjs7sjGxV9mEBywsvgDVtWRw/exec';

                // text/plain avoids a CORS preflight that Apps Script can't handle,
                // while still letting us read the response (unlike no-cors)
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({ name, mobile, message, formSecret: 'doubleoak-2026-intake' }),
                });

                const text = await response.text();
                contactForm.reset();
                if (text.startsWith('Success')) {
                    formStatus.textContent = 'Thank you! Your message has been sent.';
                    formStatus.style.color = 'green';
                } else {
                    formStatus.textContent = 'Something went wrong. Please call or text (469) 708-9186 to reach Twyla directly.';
                    formStatus.style.color = 'red';
                }
            } catch (error) {
                console.error('Error:', error);
                formStatus.textContent = 'Something went wrong. Please call or text (469) 708-9186 to reach Twyla directly.';
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

// Services Auto-Cycling
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.service-tab');
    const details = document.querySelectorAll('.service-detail');
    let cycleInterval;
    let currentIndex = 0;

    const activateTab = (index) => {
        tabs.forEach(tab => tab.classList.remove('active'));
        details.forEach(detail => detail.classList.remove('active'));

        tabs[index].classList.add('active');
        details[index].classList.add('active');
        currentIndex = index;
    };

    const startCycle = () => {
        cycleInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % tabs.length;
            activateTab(nextIndex);
        }, 5000); // 5 seconds
    };

    const stopCycle = () => {
        clearInterval(cycleInterval);
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            stopCycle(); // Stop auto-cycle when manually clicked
            activateTab(index);
        });
    });

    if (tabs.length > 0 && window.innerWidth > 768) {
        startCycle();
    }
});


