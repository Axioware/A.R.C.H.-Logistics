document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const otpInputs = document.querySelectorAll('.otp-input');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.querySelector('.otp-btn'); // Select the submit button
    
    // Hide error message on page load
    errorMessage.style.display = 'none';

    // Check if the email parameter is present in the URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

    // Redirect to Forgot Password if no email is found in the query string
    if (!email) {
        window.location.href = 'forgotpassword.html';
        return; // Stop further execution
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Collect OTP values
        const otpValues = Array.from(otpInputs).map(input => input.value).join('');
        const otp = otpValues.trim();

        const loginData = {
            email: email,
            otp: otp
        };

        if (otp.length !== otpInputs.length) {
            errorMessage.textContent = 'Please enter a complete OTP.';
            errorMessage.style.display = 'block';
            errorMessage.style.color = 'red'; // Ensure the color is set to red
            return;
        }

        // Change button color and disable it to indicate loading state
        submitButton.style.backgroundColor = '#9aadc5';
        submitButton.disabled = true;

        try {
            const response = await fetch('https://prephosting1-41adbbff2731.herokuapp.com/api/verotp/', { // Update this URL as needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const data = await response.json();
                errorMessage.textContent = data.error || 'Invalid OTP. Please try again.';
                errorMessage.style.display = 'block';
                errorMessage.style.color = 'red'; // Ensure the color is set to red
                
                // Re-enable the button and reset color after error
                submitButton.style.backgroundColor = '#2c5b97'; // Reset to original color
                submitButton.disabled = false;
                return;
            }

            // Redirect to dash.html upon successful OTP verification
            window.location.href = 'dash.html';
        } catch (error) {
            errorMessage.textContent = 'An error occurred. Please try again.';
            errorMessage.style.display = 'block';
            errorMessage.style.color = 'red'; // Ensure the color is set to red
            
            // Re-enable the button and reset color after error
            submitButton.style.backgroundColor = '#2c5b97'; // Reset to original color
            submitButton.disabled = false;
        }
    });

    // Autofocus on the first OTP input
    otpInputs[0].focus();

    // Automatically focus the next OTP input
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
    });
});
