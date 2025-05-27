document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const formStatus = document.getElementById('form-status');
    const requiredFields = form.querySelectorAll('[required]');

    // Function to display an error message
    function displayError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            // Add aria-invalid to the input for screen readers
            const inputElement = document.getElementById(fieldId);
            if (inputElement) {
                inputElement.setAttribute('aria-invalid', 'true');
                inputElement.setAttribute('aria-describedby', fieldId + '-error');
            }
        }
    }

    // Function to hide an error message
    function hideError(fieldId) {
        const errorElement = document.getElementById(fieldId + '-error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            // Remove aria-invalid from the input
            const inputElement = document.getElementById(fieldId);
            if (inputElement) {
                inputElement.removeAttribute('aria-invalid');
                inputElement.removeAttribute('aria-describedby'); // Remove if it was only for error
            }
        }
    }

    // Live validation (optional, but good for UX)
    requiredFields.forEach(field => {
        field.addEventListener('input', function () {
            if (field.validity.valid) {
                hideError(field.id);
            }
        });
        field.addEventListener('blur', function () { // Validate on blur for immediate feedback
            if (!field.validity.valid) {
                // More specific messages based on type/pattern
                if (field.id === 'studentId' && field.value && !field.validity.patternMismatch) {
                    displayError(field.id, 'Please enter a 9-digit Student ID.');
                } else if (field.id === 'email' && field.value && !field.validity.typeMismatch) {
                    displayError(field.id, 'Please enter a valid email address.');
                } else if (field.id === 'courseCode' && field.value && !field.validity.patternMismatch) {
                    displayError(field.id, 'Please enter a valid course code (e.g., CS124).');
                } else if (field.validity.valueMissing) {
                    displayError(field.id, 'This field is required.');
                }
            } else {
                hideError(field.id);
            }
        });
    });

    // Special handling for radio buttons (required)
    const csMajorRadios = document.querySelectorAll('input[name="csMajor"]');
    csMajorRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            hideError('csMajor'); // If one is selected, hide the error
        });
    });


    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        let formIsValid = true;
        let firstInvalidField = null;

        // Clear previous errors
        form.querySelectorAll('.error-message').forEach(errorDiv => {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        });
        form.querySelectorAll('[aria-invalid="true"]').forEach(invalidField => {
            invalidField.removeAttribute('aria-invalid');
        });

        // Validate all required fields
        requiredFields.forEach(field => {
            if (!field.validity.valid) {
                formIsValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
                // Provide specific error messages based on validation type
                if (field.validity.valueMissing) {
                    displayError(field.id, 'This field is required.');
                } else if (field.validity.patternMismatch) {
                    if (field.id === 'studentId') {
                        displayError(field.id, 'Student ID must be 9 digits.');
                    } else if (field.id === 'phoneNumber') {
                        displayError(field.id, 'Phone number format: XXX-XXX-XXXX.');
                    } else if (field.id === 'courseCode') {
                        displayError(field.id, 'Course code format: e.g., CS124.');
                    } else if (field.id === 'crn') {
                        displayError(field.id, 'CRN must be 5 digits.');
                    }
                } else if (field.validity.typeMismatch && field.type === 'email') {
                    displayError(field.id, 'Please enter a valid email address.');
                }
            }
        });

        // Custom validation for radio buttons (since validity.valueMissing might not work directly for a group)
        const majorSelected = Array.from(csMajorRadios).some(radio => radio.checked);
        if (!majorSelected) {
            formIsValid = false;
            displayError('csMajor', 'Please select whether you are a CS major.');
            if (!firstInvalidField) {
                firstInvalidField = csMajorRadios[0]; // Focus on the first radio button
            }
        }

        if (formIsValid) {
            // Form is valid, process submission
            formStatus.textContent = 'Registration successful! We have received your information.';
            formStatus.style.display = 'block';
            formStatus.focus(); // Move focus to the status message for screen readers
            form.reset(); // Clear the form

            // In a real application, you would send this data to a server:
            // const formData = new FormData(form);
            // fetch('/register', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => console.log(data))
            // .catch(error => console.error('Error:', error));

        } else {
            formStatus.textContent = 'Please correct the errors indicated below.';
            formStatus.style.backgroundColor = '#f8d7da'; /* Light red for error */
            formStatus.style.color = '#721c24'; /* Dark red text */
            formStatus.style.borderColor = '#f5c6cb';
            formStatus.style.display = 'block';
            formStatus.focus(); // Move focus to the error status message

            // Scroll to the first invalid field and focus it
            if (firstInvalidField) {
                firstInvalidField.focus();
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});
