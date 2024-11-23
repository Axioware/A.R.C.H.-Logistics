document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("form");
    const errorMessage = document.getElementById("red"); // A <p> tag in your form for error messages
    const loginButton = document.querySelector(".login-btn"); // The login button

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Clear previous error message
        errorMessage.textContent = "";
        errorMessage.style.display = "none"; // Hide the error message initially

        // Collect user input
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validate user input
        if (username === "" || password === "") {
            showError("Please fill in both Username and password fields.");
            return;
        }

        // Change the button background color to indicate loading
        loginButton.style.backgroundColor = "#9aadc5";
        loginButton.disabled = true; // Disable the button to prevent multiple clicks

        // Create login data to send
        const loginData = {
            username: username,
            password: password
        };

        // Make the API call
        fetch("https://prephosting1-41adbbff2731.herokuapp.com/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Invalid username or password.");
                } else {
                    throw new Error("An error occurred during login. Please try again later.");
                }
            }
            return response.json(); // Assuming the response contains the JWT token in JSON format
        })
        .then(data => {
            // Assuming the JWT token is in the data.token field
            const token = data.token;

            // Store the token in localStorage (or sessionStorage)
            localStorage.setItem("jwtToken", token);

            // Redirect to the dashboard page or any other protected route
            window.location.href = "dash.html"; 
        })
        .catch(error => {
            // Handle errors (e.g., wrong credentials)
            console.error("Error during login:", error);
            showError(error.message); // Display the error message in the form

            // Reset the button state if there's an error
            loginButton.style.backgroundColor = "#2c5b97"; // Reset the color
            loginButton.disabled = false; // Re-enable the button
        });
    });

    // Function to display error messages
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = "red"; // Set the error message color to red
        errorMessage.style.display = "block"; // Show the error message
    }

    // Function to validate email format (optional, can be added if needed)
    // function validateEmail(email) {
    //     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return re.test(String(email).toLowerCase());
    // }
});
