document.addEventListener("DOMContentLoaded", function () {
        const registrationForm = document.getElementById("registrationForm");
        const firstNameInput = document.getElementById("first");
        const lastNameInput = document.getElementById("last");
        const emailInput = document.getElementById("mail");

        const firstNameError = document.getElementById("firstNameError");
        const lastNameError = document.getElementById("lastNameError");
        const emailError = document.getElementById("emailError");

        registrationForm.addEventListener("submit", function (event) {
                event.preventDefault();

                let valid = true;

                const namePattern = /^[A-Za-z'-\s]+$/;
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                const firstName = firstNameInput.value.trim();
                const lastName = lastNameInput.value.trim();
                const email = emailInput.value.trim();


                firstNameError.textContent = '';
                lastNameError.textContent = '';
                emailError.textContent = '';


                if (!namePattern.test(firstName)) {
                        firstNameError.textContent = "First name should contain only letters, spaces, hyphens, or apostrophes.";
                        valid = false;
                }


                if (!namePattern.test(lastName)) {
                        lastNameError.textContent = "Last name should contain only letters, spaces, hyphens, or apostrophes.";
                        valid = false;
                }


                if (!emailPattern.test(email)) {
                        emailError.textContent = "Please enter a valid email address.";
                        valid = false;
                }

                if (valid) {

                        sessionStorage.setItem("firstName", firstName);
                        sessionStorage.setItem("lastName", lastName);
                        sessionStorage.setItem("email", email);


                        window.location.href = "Page2.html";
                }
        });
});