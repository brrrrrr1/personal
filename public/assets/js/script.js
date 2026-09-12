// -----------Login/Signup----------------//

const registrationButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registrationButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");  
});

// Handle the login form submission
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from submitting traditionally

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Verify the user credentials
    verifyUser(email, password);
});

// Function to verify user credentials
function verifyUser(email, password) {
    // Fetch the user data from the user.json file (simulated here)
    fetch('user.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Redirect to dashboard.html if login is successful
                window.location.href = 'dashboard.html';
            } else {
                alert("Invalid credentials. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert("An error occurred. Please try again.");
        });
}
