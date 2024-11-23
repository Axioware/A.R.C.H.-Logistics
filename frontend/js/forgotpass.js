document.getElementById('forgot-password-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the form from submitting the default way

    // Get the email value
    const email = document.getElementById('email').value.trim();
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.querySelector('.login-btn'); // Target the Continue button
    
    // Reset the error message display
    errorMessage.style.display = 'none';

    // Simple email format validation
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    
    if (!emailPattern.test(email)) {
        // Show custom error message if email format is invalid
        errorMessage.textContent = 'Invalid email format. Please try again.';
        errorMessage.style.display = 'block';
        return; // Stop form submission if invalid
    }

    // Change the button background color while waiting for a response
    submitButton.style.backgroundColor = '#9aadc5';
    submitButton.disabled = true; // Optionally disable the button to prevent further clicks

    const loginData = {
        email: email
    };

    // Make a POST request to the API
    try {
        const response = await fetch('https://prephosting1-41adbbff2731.herokuapp.com/api/genotp/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        // Handle the response
        if (response.ok) {
            // Reset button color to default when the response is successful
            submitButton.style.backgroundColor = '#2c5b97';
            submitButton.disabled = false;

            // Redirect to OTP page
            window.location.href = `otpverification.html?email=${encodeURIComponent(email)}`; // Change to your OTP page URL
        } else {
            // Try to parse the response as JSON
            const data = await response.json().catch(() => null); // Handle cases where the response isn't JSON

            // Reset button color to default on error
            submitButton.style.backgroundColor = '#2c5b97';
            submitButton.disabled = false;

            // Show the specific "Email does not exist" message or a generic error
            if (data && data.error === "User with this email does not exist.") {
                errorMessage.textContent = "Email does not exist. Please check and try again.";
            } else {
                errorMessage.textContent = data && data.error ? data.error : 'An error occurred. Please try again.';
            }
            
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        // Reset button color to default if there's a network error
        submitButton.style.backgroundColor = '#2c5b97';
        submitButton.disabled = false;

        // Show error message in case of network issues
        errorMessage.textContent = 'Failed to connect to the server. Please try again.';
        errorMessage.style.display = 'block';
    }
});
