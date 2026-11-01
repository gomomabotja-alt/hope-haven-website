// 1. Lightbox Gallery
const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');

if (galleryImages.length > 0 && lightbox) {
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src;
        });
    });
    closeLightbox.addEventListener('click', () => lightbox.style.display = 'none');
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) lightbox.style.display = 'none';
    });
}

// 2. Accordion
const accordions = document.querySelectorAll('.accordion-btn');
if (accordions.length > 0) {
    accordions.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
        });
    });
}

// 3. Search Filter
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        let filter = this.value.toLowerCase();
        let sections = document.querySelectorAll('main section');
        sections.forEach(section => {
            section.style.display = section.textContent.toLowerCase().includes(filter) ? 'block' : 'none';
        });
    });
}

// 4. Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop page reload
        let isValid = true;
        
        // Clear old errors
        form.querySelectorAll('.error-msg').forEach(el => el.remove());
        form.querySelectorAll('input, textarea').forEach(el => el.style.borderColor = '#ccc');

        // Check required fields
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.style.borderColor = 'red';
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-msg';
                errorMsg.style.cssText = 'color:red; font-size:0.9em; display:block; margin-bottom:10px;';
                errorMsg.innerText = 'This field is required.';
                input.parentElement.insertBefore(errorMsg, input.nextSibling);
            }
        });

        // Check email format
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim() !== '') {
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!emailInput.value.match(emailPattern)) {
                isValid = false;
                emailInput.style.borderColor = 'red';
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-msg';
                errorMsg.style.cssText = 'color:red; display:block; margin-bottom:10px;';
                errorMsg.innerText = 'Please enter a valid email address.';
                emailInput.parentElement.insertBefore(errorMsg, emailInput.nextSibling);
            }
        }

        // Show Success Message
        if (isValid) {
            const successMsg = document.createElement('div');
            successMsg.style.cssText = 'background:#d4edda; color:#155724; padding:15px; border-radius:5px; margin-top:20px;';
            successMsg.innerHTML = '<strong>Success!</strong> Your message has been sent.';
            form.appendChild(successMsg);
            form.reset();
            setTimeout(() => successMsg.remove(), 5000);
        }
    });
}
validateForm('enquiryForm');
validateForm('contactForm');