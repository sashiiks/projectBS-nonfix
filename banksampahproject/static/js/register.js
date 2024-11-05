document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get values from input fields
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const terms = document.getElementById("terms").checked;

    // Check if terms are accepted
    if (!terms) {
        document.getElementById("message").textContent = "Please agree to the terms and conditions.";
        return;
    }

    // Prepare the payload
    const payload = {
        username: username,
        email: email,
        phone: phone,
        password: password
    };

    try {
        // Send a POST request to the API
        const response = await fetch("/admin/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // Handle the response
        const result = await response.json();
        const messageElement = document.getElementById("message");

        if (response.ok) {
            messageElement.classList.remove("text-danger");
            messageElement.classList.add("text-success");
            messageElement.textContent = "Registration successful!";

            // Redirect to login page or perform other actions after successful registration
            // window.location.href = "/login"; // Uncomment and set the correct URL if needed
        } else {
            messageElement.classList.add("text-danger");
            messageElement.textContent = result.detail || "Registration failed. Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").textContent = "An error occurred. Please try again later.";
    }
});
