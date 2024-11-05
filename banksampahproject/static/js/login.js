document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get values from input fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Prepare the payload
    const payload = {
        username: username,
        password: password
    };

    try {
        // Send a POST request to the API
        const response = await fetch("/admin/login/", {
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
            messageElement.textContent = "Login successful. Welcome, " + result.username + "!";

            // Redirect to a different page or perform other actions after successful login
            // window.location.href = "/dashboard"; // Uncomment and set the correct URL if needed
        } else {
            messageElement.classList.add("text-danger");
            messageElement.textContent = result.detail || "Login failed. Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").textContent = "An error occurred. Please try again later.";
    }
});
