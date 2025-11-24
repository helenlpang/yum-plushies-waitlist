// Yum Plushies Waitlist Form Handler - Two Step Process

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const emailForm = document.getElementById('email-form');
    const preferencesForm = document.getElementById('preferences-form');
    const emailInput = document.getElementById('email');
    const emailHidden = document.getElementById('email-hidden');
    const emailError = document.getElementById('email-error');
    const successMessage = document.getElementById('success-message');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let userEmail = '';

    // ========== STEP 1: EMAIL FORM ==========
    
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

    // Step 1: Email form submission
    emailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate email
        if (!validateEmail()) {
            emailInput.focus();
            return;
        }

        const submitButton = emailForm.querySelector('.cta-button');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoader = submitButton.querySelector('.button-loader');

        // Disable submit button and show loader
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline';

        // Submit email to Netlify
        try {
            userEmail = emailInput.value.trim();
            
            const formData = new URLSearchParams();
            formData.append('form-name', 'waitlist-email');
            formData.append('email', userEmail);
            
            const response = await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData.toString()
            });

            if (response.ok) {
                console.log('Step 1: Email submitted successfully!');
                
                // Move to step 2
                showStep2();
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

    // ========== STEP 2: PREFERENCES FORM ==========
    
    function showStep2() {
        // Hide step 1 form
        emailForm.style.display = 'none';
        
        // Show step 2 form
        preferencesForm.style.display = 'flex';
        
        // Store email in hidden field
        emailHidden.value = userEmail;
        
        // Scroll to form
        document.querySelector('.waitlist-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }

    // Step 2: Preferences form submission
    preferencesForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitButton = preferencesForm.querySelector('.cta-button');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoader = submitButton.querySelector('.button-loader');

        // Disable submit button and show loader
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline';

        // Submit preferences to Netlify
        try {
            const selectedPlushies = Array.from(document.querySelectorAll('.plushie-checkbox:checked'))
                .map(cb => cb.dataset.value)
                .join(', ');
            
            const formData = new URLSearchParams();
            formData.append('form-name', 'waitlist-preferences');
            formData.append('email', userEmail);
            formData.append('favorite-plushies', selectedPlushies || 'none');
            
            const response = await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData.toString()
            });

            if (response.ok) {
                console.log('Step 2: Preferences submitted successfully!');
                
                // Show final success message
                preferencesForm.style.display = 'none';
                successMessage.classList.remove('hidden');
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

    // Skip button handler
    const skipButton = document.querySelector('.skip-button');
    skipButton.addEventListener('click', function() {
        preferencesForm.style.display = 'none';
        successMessage.classList.remove('hidden');
    });

    // ========== PLUSHIE CARD INTERACTIONS ==========
    
    const plushieCards = document.querySelectorAll('.plushie-card');
    const checkboxes = document.querySelectorAll('.plushie-checkbox');

    plushieCards.forEach(card => {
        card.addEventListener('click', function() {
            const plushieId = this.dataset.plushie;
            
            // Find corresponding checkbox and toggle it (only if step 2 is visible)
            if (preferencesForm.style.display !== 'none') {
                const checkbox = Array.from(checkboxes).find(cb => cb.dataset.value === plushieId);
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    
                    // Highlight the checkbox briefly
                    const checkboxLabel = checkbox.closest('.checkbox-label');
                    checkboxLabel.style.transform = 'translateX(8px) scale(1.02)';
                    setTimeout(() => {
                        checkboxLabel.style.transform = '';
                    }, 500);
                }
            }
            
            // Visual feedback
            plushieCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Smooth scroll to form
            document.querySelector('.waitlist-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        });
    });

    // ========== VISUAL ENHANCEMENTS ==========
    
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

    // Add visual feedback for form interactions
    const inputs = document.querySelectorAll('input[type="email"]');
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