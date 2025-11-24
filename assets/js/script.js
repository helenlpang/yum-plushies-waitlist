// Yum Plushies Waitlist Form Handler

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waitlist-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const successMessage = document.getElementById('success-message');
    const submitButton = form.querySelector('.cta-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Add interactive hover effects to plushie cards
    const plushieCards = document.querySelectorAll('.plushie-card');
    const checkboxes = document.querySelectorAll('.plushie-checkbox');

    plushieCards.forEach(card => {
        card.addEventListener('click', function() {
            const plushieId = this.dataset.plushie;
            
            // Find corresponding checkbox and toggle it
            const checkbox = Array.from(checkboxes).find(cb => cb.dataset.value === plushieId);
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
            }
            
            // Visual feedback
            plushieCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Smooth scroll to form
            document.querySelector('.waitlist-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Highlight the checkbox briefly
            if (checkbox) {
                const checkboxLabel = checkbox.closest('.checkbox-label');
                checkboxLabel.style.transform = 'translateX(8px) scale(1.02)';
                setTimeout(() => {
                    checkboxLabel.style.transform = '';
                }, 500);
            }
        });
    });

    // Real-time email validation
    emailInput.addEventListener('blur', function() {
        validateEmail();
    });

    emailInput.addEventListener('input', function() {
        if (emailError.classList.contains('show')) {
            validateEmail();
        }
    });

    function validateEmail() {
        const email = emailInput.value.trim();
        
        if (!email) {
            showError('Email address is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return false;
        }
        
        hideError();
        return true;
    }

    function showError(message) {
        emailError.textContent = message;
        emailError.classList.add('show');
        emailInput.classList.add('error');
    }

    function hideError() {
        emailError.textContent = '';
        emailError.classList.remove('show');
        emailInput.classList.remove('error');
    }

    // Form submission handler for Netlify Forms
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate email
        if (!validateEmail()) {
            emailInput.focus();
            return;
        }

        // Disable submit button and show loader
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline';

        // Submit form to Netlify
        try {
            // Get all checked plushies
            const selectedPlushies = Array.from(document.querySelectorAll('.plushie-checkbox:checked'))
                .map(cb => cb.dataset.value)
                .join(', ');
            
            // Update the hidden field with selected plushies
            document.querySelector('input[name="favorite-plushies"]').value = selectedPlushies || 'none';
            
            // Build form data manually to handle checkboxes properly
            const formData = new URLSearchParams();
            formData.append('form-name', 'waitlist');
            formData.append('email', emailInput.value.trim());
            formData.append('favorite-plushies', selectedPlushies || 'none');
            
            const response = await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData.toString()
            });

            if (response.ok) {
                // Show success message
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                console.log('Successfully submitted to Netlify Forms!');
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Submission error:', error);
            alert('Oops! Something went wrong. Please try again.');
            
            // Re-enable button
            submitButton.disabled = false;
            buttonText.style.display = 'inline';
            buttonLoader.style.display = 'none';
        }
    });

    // Add subtle animation to form elements on load
    const formElements = document.querySelectorAll('.form-group');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add visual feedback for form interactions
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Optional: Add confetti or celebration effect on successful submission
// Uncomment and add a confetti library like canvas-confetti if desired